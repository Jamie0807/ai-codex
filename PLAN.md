# To-do 应用开发计划

## Summary

开发一个 React 19 + Vite + TypeScript + pnpm + shadcn-ui 的基础完整 to-do 应用。流程先建立 `DESIGN.md` 作为设计系统和视觉约束，再实现应用页面，最后根据提供的设计稿或参考图做高精度截图校准。

## Key Changes

- 初始化前端工程：
  - 使用 Vite React TypeScript 模板。
  - 使用 `pnpm` 管理依赖。
  - 接入 shadcn-ui、Tailwind CSS、lucide-react。
  - 建立 `src/`、`tests/`、`docs/` 或根级设计文档结构。
- 新增 `DESIGN.md`：
  - 固化颜色、字体层级、间距、圆角、阴影、边框、密度、交互状态。
  - 明确 to-do 应用关键页面：主列表页、空状态、筛选状态、编辑状态。
  - 明确组件规范：输入框、按钮、复选框、任务项、筛选控件、删除/编辑操作。
  - 加入视觉还原流程：先按规范实现，再用设计稿截图对比校准。
- 实现 v1 功能：
  - 新增任务。
  - 编辑任务标题。
  - 标记完成/未完成。
  - 删除任务。
  - 按 `全部 / 进行中 / 已完成` 筛选。
  - 使用 `localStorage` 做本地持久化。
- UI 实现要求：
  - 第一屏直接是可用应用，不做营销落地页。
  - 使用 shadcn-ui 组件作为基础，但样式以 `DESIGN.md` 和设计稿为准。
  - 操作按钮优先使用 lucide 图标，并提供可访问名称或 tooltip。
  - 移动端和桌面端均需保证文本不溢出、控件不重叠。

## Visual Fidelity Plan

- 提供设计稿、截图或参考图后，将其作为关键页面视觉基准。
- 先根据 `DESIGN.md` 实现基础视觉，再用 Playwright 截图检查桌面与移动端。
- 高精度还原重点：
  - 页面布局比例。
  - 间距和对齐。
  - 字体大小、字重、行高。
  - 颜色、边框、圆角、阴影。
  - 空状态、hover、focus、completed、editing 等状态。
- 不把 shadcn 默认样式视为最终标准；它只作为组件和可访问性基础。

## Test Plan

- 单元/组件测试：
  - 新增任务后出现在列表中。
  - 完成状态可切换。
  - 任务可编辑并保存。
  - 任务可删除。
  - 筛选器正确显示全部、进行中、已完成任务。
  - localStorage 能保存并恢复任务。
- 端到端/视觉检查：
  - Playwright 打开本地 dev server。
  - 检查桌面和移动端关键页面截图。
  - 与设计稿进行人工或截图差异校准。
- 构建验证：
  - `pnpm install`
  - `pnpm dev`
  - `pnpm test`
  - `pnpm build`

## Assumptions

- 首版功能范围采用“基础完整”：新增、编辑、完成、删除、筛选、本地持久化。
- 工程模式采用 `React 19 + Vite + TypeScript + pnpm`。
- 视觉策略采用“先 `DESIGN.md` 固化规范，再按设计稿做高精度校准”。
- 在设计稿提供前，可以先完成 `DESIGN.md` 和基础实现；最终视觉验收以设计稿或参考图为准。
