---
name: quality-gate
description: 使用仓库已有规范验证代码改动。适用于 Codex 需要在结束前运行 ESLint、TypeScript/typecheck、测试、构建或 package.json 脚本；用户要求运行 lint/test/build；或前端/Node 项目需要按既有质量命令做验证的场景。
---

# 质量门禁

## 目的

使用这个 skill 按仓库已有检查验证代码改动，不临时发明新命令。优先使用项目定义的脚本、配置和测试体系，而不是套用通用假设。

## 工作流

1. 运行检查前先查看项目根目录：
   - `package.json` scripts 和包管理器 lockfile。
   - ESLint、TypeScript、Vite、Vitest、Jest、Playwright 或框架配置文件。
   - 现有测试目录和本次变更涉及的文件。
2. 先运行最快且最相关的检查，再运行覆盖更广的检查：
   - ESLint 或 lint 脚本。
   - TypeScript/typecheck 脚本，如果它没有被 build 覆盖。
   - 单元测试。
   - 生产构建。
3. 在 Node/JavaScript/TypeScript 仓库中，优先使用内置脚本：
   - `python3 .codex/skills/quality-gate/scripts/run_quality_gate.py`
   - 需要机器可读摘要时传 `--json`。
4. 如果命令失败，默认在第一个失败处停止，除非用户明确要求继续跑完所有检查。修复失败后，重新运行失败命令，以及所有可能受影响的后续检查。
5. 最终回复必须说明：
   - 实际运行了哪些命令。
   - 每个命令通过还是失败。
   - 如果失败，列出第一个可操作的失败原因。
   - 如果某个检查无法运行，说明原因。

## 命令选择规则

- 根据 lockfile 选择包管理器：
  - `pnpm-lock.yaml` -> `pnpm`
  - `yarn.lock` -> `yarn`
  - `package-lock.json` 或 `npm-shrinkwrap.json` -> `npm`
  - 都不存在时默认用 `npm`
- 对 package scripts，使用 `包管理器 run <script>`。npm 的 `test` 可使用 `npm test`，但 `npm run test` 也可以。
- 如果脚本存在，按以下优先级选择：
  - lint：`lint`、`eslint`
  - typecheck：`typecheck`、`type-check`、`check-types`、`tsc`
  - test：`test`、`unit`、`test:unit`、`vitest`、`jest`
  - build：`build`
- 不要为了验证一次改动而新增 lint/test/build 工具。除非用户明确要求引入工具链，否则只使用现有项目工具。
- 不要把长时间运行的 watch 或服务命令当作验证命令，例如 `test:watch`、`dev`、`start`、`preview`。

## 失败处理

- 把 lint/type/test/build 失败视为实现反馈，而不是提前结束工作的理由。
- 编辑前先认真读取第一个可操作错误。
- 如果失败输出过长，只摘要命令、失败文件、行号和核心错误信息。
- 如果缺少依赖或必须安装 package，先请求用户批准或按环境要求申请提权。
- 如果检查因为沙箱限制、网络访问或写入工作区外路径失败，在确认确实需要后按环境要求重新请求批准运行。

## 资源

- `scripts/run_quality_gate.py`：检测 Node 包管理器和 `package.json` scripts，并按稳定顺序运行已有的 lint/typecheck/test/build 检查。
