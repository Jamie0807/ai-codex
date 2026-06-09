# ai-codex

用于学习、验证和沉淀 Codex 工作流的实验仓库。

当前仓库不是单一产品仓库，而是一个小型练习场：包含 React to-do 示例应用、设计稿/设计规范到代码的还原练习、技术方案调研文档，以及可复用的 Codex skills。

## 快速开始

```bash
pnpm install
pnpm run dev
```

常用验证命令：

```bash
pnpm run lint
pnpm run test
pnpm run build
```

本仓库也提供了 `quality-gate` skill 脚本，可按项目已有脚本自动执行质量检查：

```bash
python3 .codex/skills/quality-gate/scripts/run_quality_gate.py
```

当前检查顺序为：

- `pnpm run lint`
- `pnpm run test`
- `pnpm run build`

## 当前内容

- React 19 + Vite + TypeScript 实现的 to-do 示例应用。
- 根据 [DESIGN.md](./DESIGN.md) 进行页面结构、视觉样式和响应式实现的练习。
- 使用 Pencil MCP 读取 [todo-list.pen](./todo-list.pen) 设计稿并还原为前端代码的实验路径。
- 面向 Codex Agent 的项目约束：[AGENTS.md](./AGENTS.md)。
- to-do 应用开发计划：[PLAN.md](./PLAN.md)。
- 大文件上传技术方案调研：[docs/research/2026-06-08-large-file-upload-options.md](./docs/research/2026-06-08-large-file-upload-options.md)。
- 项目内沉淀的 Codex skills：
  - [research-options](./.codex/skills/research-options/SKILL.md)
  - [quality-gate](./.codex/skills/quality-gate/SKILL.md)

## To-do 示例应用

当前示例应用覆盖一组基础完整的任务管理能力：

- 新增任务。
- 编辑任务标题。
- 标记完成或未完成。
- 删除任务。
- 按 `All` / `Focus` / `Done` 筛选任务。
- 使用 `localStorage` 做本地持久化。
- 提供桌面优先、兼容移动端的响应式布局。

主实现文件：

- [src/App.tsx](./src/App.tsx)：应用状态、交互和页面结构。
- [src/styles.css](./src/styles.css)：视觉样式、布局和响应式规则。
- [src/App.test.tsx](./src/App.test.tsx)：公开行为测试。

## 技术栈

当前实际工程依赖以 [package.json](./package.json) 为准：

- React 19
- Vite 6
- TypeScript
- Vitest
- Testing Library
- ESLint
- lucide-react
- pnpm

项目约束中提到的 `shadcn-ui` 是后续 UI 工程化方向之一；当前代码尚未接入 shadcn-ui 和 Tailwind CSS。

## 目录结构

```text
.
├── .codex/skills/        # 本项目沉淀的 Codex skills
├── docs/research/        # 技术方案调研文档
├── src/                  # React 示例应用源码
│   ├── App.tsx           # 主应用组件
│   ├── App.test.tsx      # 组件行为测试
│   ├── main.tsx          # 应用入口
│   └── styles.css        # 全局样式
├── AGENTS.md             # Agent 工作约束
├── DESIGN.md             # 设计分析和视觉约束
├── PLAN.md               # 开发计划
├── package.json          # 脚本和依赖
├── todo-list.pen         # Pencil 生成的 to-do list UI 设计稿
└── README.md             # 项目说明
```

## Codex Skills

### research-options

用于开放式技术方案调研、架构选型、库选型和社区资料调查。

约定：

- 默认联网调研最新资料。
- 对比 3-5 个候选方案。
- 给出推荐结论、风险和验证清单。
- 将完整方案生成到 `docs/research/YYYY-MM-DD-topic-options.md`。

示例：

```text
使用 research-options skill 调研大文件上传
```

### quality-gate

用于在代码修改完成前运行项目已有质量检查。

约定：

- 优先读取 `package.json` 和 lockfile。
- 使用仓库已有脚本，不临时发明新命令。
- 按 `lint -> typecheck -> test -> build` 的顺序执行可用检查。
- 默认在第一个失败处停止，并摘要失败原因。

示例：

```text
使用 quality-gate skill 做验证
```

## 设计到代码工作流

这个仓库主要验证两条 UI 实现路径：

1. 文字化规范：先用 [DESIGN.md](./DESIGN.md) 固化颜色、排版、间距、状态和响应式约束，再由 Codex 实现页面。
2. 设计稿结构化读取：使用 Pencil MCP 获取 [todo-list.pen](./todo-list.pen) 中的节点、布局和样式信息，再由 Codex 转换为 React/Vite 前端代码。

[todo-list.pen](./todo-list.pen) 当前包含 4 个 1360px 宽的顶层页面：

- `Todo List App - Today`
- `Todo List App - Projects`
- `Todo List App - Calendar`
- `Todo List App - Settings`

当前设计变量包括：

- 主强调色：`#FF5C00` / `#FF8533`
- 基础前景色：`#1A1A1A`、`#666666`、`#888888`
- 基础表面色：`#FFFFFF`、`#0A0A0A`
- 字体：`Funnel Sans`、`Inter`、`Geist`、`IBM Plex Mono`
- 圆角：`0`、`8`、`12`、`24`、`9999`

这条路径用于观察和改进：

- Codex 是否能从文字化设计说明写出接近预期的 CSS。
- Codex 是否能理解设计稿结构、层级和视觉 token。
- Codex 是否能把设计稿还原为可运行的前端实现。
- Codex 是否能在实现后通过 lint、test、build 完成验证闭环。
- Pencil MCP + Codex 是否适合沉淀为稳定的设计稿转代码流程。

## 维护约定

- 新增示例、调研文档、skill 或工程脚本后，同步更新 README。
- 应用行为变更时，同步补充或调整测试。
- 与任务无关的改动保持独立，避免在一次提交中混入不相关重构。
- 生成产物默认不提交，除非发布或复现所必需。

## 当前状态

项目已经具备一个可运行、可测试、可构建的 React 示例应用。

最近一次记录的质量验证结果：

- `pnpm run lint`：通过
- `pnpm run test`：通过
- `pnpm run build`：通过
