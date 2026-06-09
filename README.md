# ai-codex

这是一个学习和试用 Codex 的实验项目。

仓库里会放一些用 Codex 完成的示例：前端页面、设计稿还原、调研文档、项目规范，以及可以复用的自定义 skills。它不是单一产品仓库，更像是一个用于验证 Codex 工作流的练习场。

## 当前内容

- React 19 + Vite 的 to-do 示例应用
- 一次根据 [DESIGN.md](./DESIGN.md) 设计说明编写 CSS 的练习
- 一次通过 Pencil MCP 读取设计稿并还原到前端代码的练习
- 一份开发计划：[PLAN.md](./PLAN.md)
- 一份通过 Codex `/init` 生成的 Agent 项目约束：[AGENTS.md](./AGENTS.md)
- 大文件上传技术方案调研文档：[docs/research/2026-06-08-large-file-upload-options.md](./docs/research/2026-06-08-large-file-upload-options.md)
- 自定义 skills：
  - [research-options](./.codex/skills/research-options/SKILL.md)：用于调研技术方案，并把完整方案写入 Markdown 文件
  - [quality-gate](./.codex/skills/quality-gate/SKILL.md)：用于按项目已有 lint、test、build 命令做质量验证

## 技术栈

- React 19
- Vite
- TypeScript
- Vitest
- ESLint
- lucide-react
- pnpm

## 常用命令

```bash
pnpm install
pnpm run dev
pnpm run lint
pnpm run test
pnpm run build
```

也可以使用本仓库沉淀的 `quality-gate` skill 脚本一次性运行已有验证：

```bash
python3 .codex/skills/quality-gate/scripts/run_quality_gate.py
```

当前它会自动识别 `pnpm`，并按顺序运行：

- `pnpm run lint`
- `pnpm run test`
- `pnpm run build`

## 目录说明

```text
.
├── .codex/skills/        # 本项目沉淀的 Codex skills
├── docs/research/        # 技术方案调研文档
├── src/                  # React 示例应用源码
├── AGENTS.md             # 通过 Codex /init 生成的 Agent 工作约束
├── DESIGN.md             # 设计分析
├── PLAN.md               # 开发计划
└── README.md             # 项目说明
```

## Skills

### research-options

用于开放式技术方案调研、架构选型、库选型、社区资料调查等任务。

这个 skill 的当前约定是：

- 默认联网调研最新资料
- 对比 3-5 个候选方案
- 给出推荐结论和风险验证清单
- 将完整方案生成到 `docs/research/YYYY-MM-DD-topic-options.md`

示例：

```text
使用 research-options skill 调研大文件上传
```

### quality-gate

用于在完成代码修改前跑项目已有的质量检查。

这个 skill 的当前约定是：

- 优先读取 `package.json` 和 lockfile
- 使用项目已有脚本，不临时发明新命令
- 按 `lint -> typecheck -> test -> build` 的顺序执行可用检查
- 默认在第一个失败处停止，并摘要失败原因

示例：

```text
使用 quality-gate skill 做验证
```

## 设计稿与样式还原

这个项目里尝试过两种设计到代码的路径：

1. 先用 [DESIGN.md](./DESIGN.md) 作为测试输入，让 Codex 根据文字化的设计说明编写 CSS 和页面样式。
2. 后续再使用 Pencil MCP 读取设计稿信息，让 Codex 根据更结构化的设计数据还原 React/Vite 前端实现。

当前相关产物包括：

- [DESIGN.md](./DESIGN.md)：用于测试“根据设计说明写 CSS”的设计分析和视觉约束文档
- [src/App.tsx](./src/App.tsx)：to-do 示例应用的主要结构和交互
- [src/styles.css](./src/styles.css)：视觉样式、布局和响应式规则

这条路径主要用于验证：

- 只有文字化设计说明时，Codex 能否写出接近预期的 CSS
- Codex 能否理解设计稿结构、层级和视觉 token
- Codex 能否把设计稿转换为可运行的前端代码
- Codex 能否在实现后通过 lint、test、build 做闭环验证
- Pencil MCP + Codex 是否适合沉淀“设计稿转代码”的工作流

## 学习目标

这个仓库主要用于练习以下 Codex 使用方式：

- 让 Codex 阅读现有项目结构后再修改代码
- 通过 Pencil MCP 读取设计稿，并让 Codex 还原为前端实现
- 将一次性的工作流沉淀为可复用 skill
- 用 skill 固化调研、验证、文档生成等重复流程
- 通过 lint、test、build 验证 Codex 生成的代码
- 观察 Codex 在前端实现、文档整理、方案调研中的表现

## 当前状态

项目已经具备一个可运行的 React 示例应用，并配置了 lint、test 和 build。

最近一次 `quality-gate` 验证结果：

- `pnpm run lint`：通过
- `pnpm run test`：通过
- `pnpm run build`：通过

## 备注

这个仓库会随着学习过程持续变化。新增示例、调研文档或 skill 后，建议同步更新 README，让它始终反映当前仓库的真实用途和可运行命令。
