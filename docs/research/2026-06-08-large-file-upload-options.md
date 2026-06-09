# 大文件上传方案调研

> 生成日期：2026-06-08
> 状态：调研建议 / 待验证

**问题理解**

- 目标：为 React 19 + Vite + shadcn-ui 的 Web 应用选择大文件上传方案，覆盖 100MB 到多 GB 文件，并支持进度、重试、取消和断点恢复。
- 关键约束：浏览器端上传体验要稳定；应用服务器不应承载大文件流量；需要可控的安全边界、配额和成本；后续可能接入对象存储、扫描、转码或文件预览。
- 判断标准：可靠性、性能、实现复杂度、安全性、运维成本、云厂商锁定、前端集成体验、后续迁移成本。

**调研来源**

- 官方/标准：AWS S3 multipart upload、S3 presigned URL、S3 incomplete multipart lifecycle、Cloudflare R2 multipart/limits、Google Cloud Storage resumable uploads、Azure Blob block upload、OWASP File Upload Cheat Sheet、IETF HTTP Resumable Upload draft。
- GitHub/开源：Uppy `@uppy/aws-s3`、Uppy tus、tus protocol、tusd reference server。
- 托管服务：Cloudinary、Uploadcare、Filestack。
- 社区反馈：Reddit/AWS/Webdev 讨论主要用于识别隐藏成本、签名 URL 过期、应用服务器中转和未完成分片清理等风险。

**方案矩阵**

| 方案 | 核心思路 | 适用场景 | 优势 | 风险点 | 证据 |
|---|---|---|---|---|---|
| A. 对象存储直传 + Multipart + 预签名 URL | 后端只负责鉴权、创建 multipart upload、签名 part、complete/abort；浏览器将切片直接上传到 S3/R2/OSS/COS/MinIO 等对象存储 | 默认推荐；100MB 到多 GB 文件；需要成本、性能和控制力平衡的 SaaS/业务系统 | 应用服务器不走大流量；可并发上传和单 part 重试；对象存储能力成熟；Uppy 可直接对接 | 需要设计 upload 状态机、CORS、签名过期、part size、complete 幂等、未完成上传清理 | AWS 建议 100MB 起考虑 multipart；S3 part 5MiB-5GiB，最多 10,000 parts；Uppy 提供 create/list/sign/complete/abort 钩子 |
| B. tus 协议 + tusd/Uppy tus | 前端使用 tus 客户端，后端部署 tusd 或兼容 tus 的服务，服务端再落对象存储 | 网络不稳定、移动端、需要强断点续传语义、希望减少对象存储 API 差异 | 标准化断点续传协议；Uppy 支持好；服务端可统一接入 S3/GCS 等后端 | 多维护一个 upload server；仍需处理配额、扫描、清理、鉴权和存储策略 | tus 是基于 HTTP 的 resumable upload 协议；tusd 是官方参考实现 |
| C. 托管上传服务 | 使用 Cloudinary、Uploadcare、Filestack 等 SDK/Widget 处理上传、重试、分片、媒体处理和交付 | 快速上线；媒体文件为主；需要转码、缩略图、OCR、CDN、Picker 等能力 | 研发成本最低；SDK 成熟；很多处理能力开箱即用 | 成本和厂商锁定高；合规和数据驻留要确认；上传链路和用户数据进入第三方 | Cloudinary 大文件使用 chunked/upload_large；Uploadcare multipart 大文件流程；Filestack 支持 chunk/retry/pause-resume |
| D. 应用服务器中转/自定义分片 | 浏览器将分片上传到业务 API，服务端合并或再流式写入对象存储 | 小规模、内网、强同步业务校验、遗留系统约束 | 业务控制最强；鉴权、审计、校验可集中处理 | 大文件下最容易引发带宽、超时、内存、扩容、失败恢复问题；自研协议复杂 | OWASP 建议隔离文件存储、限制大小、校验内容；但中转会把所有压力集中到应用层 |
| E. 跟踪 HTTP Resumable Upload 标准 | 等待 IETF HTTP resumable upload 标准成熟，再采用原生或通用实现 | 中长期技术储备，不适合作为当前主路径 | 未来可能降低跨平台协议碎片化 | 截至 2026-06-08 仍是 Internet-Draft，不能作为生产依赖 | draft-ietf-httpbis-resumable-upload-11 是 active Internet-Draft，2026-03-02 更新，2026-09-03 过期 |

**推荐结论**

推荐：优先采用 **方案 A：对象存储直传 + Multipart + 预签名 URL + Uppy**。

原因：

- 它最符合 Web 应用的大文件上传主流架构：业务后端只签名和记录状态，文件流量直达对象存储，避免 API 服务被大文件吞吐拖垮。
- 对 100MB 以上文件，multipart 能把失败影响限制在单个 part，并支持并发上传和重试。
- Uppy 的 `@uppy/aws-s3` 已经覆盖 create/list/sign/complete/abort 等关键扩展点，适合 React 项目以自定义 UI 接入 shadcn-ui。
- 对象存储直传比托管上传服务更少锁定，比 tusd 少一个长期运维组件，比自研中转更可靠。

建议目标架构：

1. 前端：React 使用 Uppy Core + `@uppy/aws-s3`，shadcn-ui 实现文件列表、进度条、取消、重试、错误提示和上传完成状态。
2. 后端：提供 `initUpload`、`signPart`、`listParts`、`completeUpload`、`abortUpload` 接口；所有接口都绑定用户、业务对象、文件大小、MIME 白名单和配额。
3. 存储：私有 bucket；object key 使用不可预测 ID，例如 `tenantId/yyyy/mm/dd/uploadId/originalNameHash`，不直接信任用户文件名。
4. 状态：数据库维护 `created -> uploading -> completing -> pending_scan -> ready/failed/aborted` 状态机。
5. 安全：上传完成后先进入 `pending_scan`，由对象存储事件或异步任务做病毒扫描、类型识别、hash 校验、缩略图/转码，确认后再对用户可见。
6. 清理：配置对象存储 lifecycle 自动 abort incomplete multipart upload；业务库也定时清理过期 upload session。

不推荐默认选 D。应用服务器中转看起来实现直接，但大文件场景会把带宽、内存、超时和失败恢复问题全部压到业务服务上，后续扩容和故障处理成本更高。

可以改选 B 的情况：如果产品必须在移动端弱网中提供非常强的暂停/恢复语义，或需要跨多个存储后端隐藏差异，并且团队可以接受维护 tusd。

可以改选 C 的情况：如果主要上传图片/视频，并且更看重转码、缩略图、内容审核、CDN、Picker 和快速上线，而不是长期成本和数据链路控制。

**关键设计建议**

- 分片大小：默认 8MiB-64MiB 起步。文件越大，part size 应越大，避免超过 S3 10,000 parts 限制。最低不要低于 S3 5MiB 要求，最后一个 part 除外。
- 并发数：浏览器端初始 3-6 个并发 part。弱网或移动端可以降到 2-3；桌面宽带可测试 6-8，但不要默认过高。
- 签名策略：短 TTL；每个 part 单独签名或按批签名；签名前校验用户权限、剩余额度、声明大小、文件类型和业务对象状态。
- 断点恢复：前端持久化 `uploadId/key/file fingerprint`；恢复时调用 `listParts` 对齐已上传 part，再继续未完成部分。
- 完成幂等：`completeUpload` 要允许重复调用，后端通过状态机和对象存储返回结果处理竞态。
- 取消与失败：用户取消时调用 `abortUpload`；后端失败后也应可重试 abort；不要只依赖前端。
- 可观测性：记录 uploadId、用户、文件大小、part size、并发、失败原因、耗时、abort 数、scan 状态。

**风险与验证**

- 技术风险：签名 URL 过期导致长时间上传失败。验证策略：模拟 5GB 文件、低速网络、暂停超过 TTL 后续签。
- 技术风险：part size 过小导致超过 10,000 parts。验证策略：按最大允许文件大小计算最小 part size，并写入后端校验。
- 技术风险：浏览器刷新或重启后无法恢复。验证策略：刷新页面后用 `listParts` 恢复进度。
- 安全风险：用户绕过前端限制上传超大文件或伪造 MIME。验证策略：后端签名前做配额和声明大小校验，完成后校验对象真实大小、hash 和内容签名。
- 安全风险：恶意文件、压缩炸弹、图片解码炸弹。验证策略：异步扫描，限制解压/解析资源，原文件隔离存储，未扫描文件不可公开访问。
- 运维风险：未完成 multipart upload 产生隐藏存储成本。验证策略：配置 lifecycle `AbortIncompleteMultipartUpload`，并定期审计未完成上传。
- 产品风险：上传进度不稳定，用户重复提交。验证策略：UI 显示每个文件状态、可重试错误、上传完成后的扫描状态。
- 兼容风险：S3-compatible 服务对 multipart、ETag、CORS 或 presigned URL 的细节不完全一致。验证策略：在目标存储上做端到端 PoC，不只依赖 AWS 文档。

**后续行动**

- 确认目标对象存储：AWS S3、Cloudflare R2、MinIO、阿里 OSS、腾讯 COS 或 GCS。
- 定义业务上限：单文件最大大小、单用户日配额、允许 MIME/扩展名、是否需要秒传/hash 去重。
- 做一个最小 PoC：1GB 文件，8MiB/16MiB/32MiB part size，对比并发 3/6 的成功率和耗时。
- 设计后端上传表：`id`、`user_id`、`object_key`、`upload_id`、`size`、`mime`、`status`、`expires_at`、`etag`、`checksum`。
- 设计前端 UX：多文件队列、单文件进度、总进度、取消、重试、失败原因、扫描中状态。
- 增加测试：签名权限、超配额、过期 upload、重复 complete、abort、listParts 恢复、恶意 MIME。

**参考链接**

- [Amazon S3 multipart upload limits](https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html)
- [Amazon S3 presigned URL uploads](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
- [Amazon S3 lifecycle rule for incomplete multipart uploads](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpu-abort-incomplete-mpu-lifecycle-config.html)
- [Cloudflare R2 multipart objects](https://developers.cloudflare.com/r2/objects/multipart-objects/)
- [Cloudflare R2 limits](https://developers.cloudflare.com/r2/platform/limits/)
- [Google Cloud Storage resumable uploads](https://docs.cloud.google.com/storage/docs/resumable-uploads)
- [Google Cloud Storage perform resumable uploads](https://docs.cloud.google.com/storage/docs/performing-resumable-uploads)
- [Azure Blob Put Block limits](https://learn.microsoft.com/en-us/rest/api/storageservices/put-block)
- [Uppy AWS S3 plugin](https://uppy.io/docs/aws-s3/)
- [Uppy Tus plugin](https://uppy.io/docs/tus/)
- [tus resumable upload protocol](https://tus.io/protocols/resumable-upload)
- [tusd documentation](https://tus.github.io/tusd/)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [IETF HTTP Resumable Upload draft](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/)
- [Cloudinary upload docs](https://cloudinary.com/documentation/upload_images)
- [Cloudinary client-side uploading](https://cloudinary.com/documentation/client_side_uploading)
- [Uploadcare Upload API](https://uploadcare.com/docs/api/upload/upload)
- [Filestack uploading docs](https://www.filestack.com/docs/uploads/uploading/)
- [Reddit: S3 incomplete multipart hidden data discussion](https://www.reddit.com/r/aws/comments/1oosbhh)
- [Reddit: S3 video upload presigned vs multipart discussion](https://www.reddit.com/r/aws/comments/1lybi5r)
