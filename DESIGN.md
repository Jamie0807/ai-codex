---
version: alpha
name: Apple-design-analysis
description: 这是一个以摄影为核心的界面，把营销页面塑造成博物馆画廊。通栏产品卡片在浅色与深色画布之间交替切换，以 SF Pro Display 标题和负字距为框架，整套系统只使用一种交互色 Action Blue (#0066cc)。UI 外壳尽量退场，让产品自己说话：没有装饰性渐变、没有界面阴影，只有产品图像落在承托表面上时那一道标志性的柔和投影。

colors:
  primary: "#0066cc"
  primary-focus: "#0071e3"
  primary-on-dark: "#2997ff"
  ink: "#1d1d1f"
  body: "#1d1d1f"
  body-on-dark: "#ffffff"
  body-muted: "#cccccc"
  ink-muted-80: "#333333"
  ink-muted-48: "#7a7a7a"
  divider-soft: "#f0f0f0"
  hairline: "#e0e0e0"
  canvas: "#ffffff"
  canvas-parchment: "#f5f5f7"
  surface-pearl: "#fafafc"
  surface-tile-1: "#272729"
  surface-tile-2: "#2a2a2c"
  surface-tile-3: "#252527"
  surface-black: "#000000"
  surface-chip-translucent: "#d2d2d7"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  hero-display:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: -0.28px
  display-lg:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0
  display-md:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.47
    letterSpacing: -0.374px
  lead:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: 0.196px
  lead-airy:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 24px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  tagline:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: 0.231px
  body-strong:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.374px
  body:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: -0.374px
  dense-link:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 2.41
    letterSpacing: 0
  caption:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: -0.224px
  caption-strong:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.29
    letterSpacing: -0.224px
  button-large:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: 0
  button-utility:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: -0.224px
  fine-print:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px
  micro-legal:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.08px
  nav-link:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px

rounded:
  none: 0px
  xs: 5px
  sm: 8px
  md: 11px
  lg: 18px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 17px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  button-primary-focus:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-primary-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-secondary-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  button-dark-utility:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-utility}"
    rounded: "{rounded.sm}"
    padding: 8px 15px
  button-pearl-capsule:
    backgroundColor: "{colors.surface-pearl}"
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-store-hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    padding: 14px 28px
  button-icon-circular:
    backgroundColor: "{colors.surface-chip-translucent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 44px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  text-link-on-dark:
    backgroundColor: transparent
    textColor: "{colors.primary-on-dark}"
    typography: "{typography.body}"
  global-nav:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 44px
  sub-nav-frosted:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.tagline}"
    height: 52px
  product-tile-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-parchment:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-dark:
    backgroundColor: "{colors.surface-tile-1}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-dark-2:
    backgroundColor: "{colors.surface-tile-2}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  product-tile-dark-3:
    backgroundColor: "{colors.surface-tile-3}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  store-utility-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.lg}"
    padding: 24px
  configurator-option-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 12px 16px
  configurator-option-chip-selected:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  search-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
    height: 44px
  floating-sticky-bar:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    height: 64px
    padding: 12px 32px
  environment-quote-card:
    backgroundColor: "{colors.surface-tile-1}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  footer:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.fine-print}"
    padding: 64px
---

## 概述

Apple 的网页体验可以说是 **以近乎隐形的界面来衬托产品摄影** 的范本。每个页面都是一叠通栏产品“卡片”，在浅色与深色画布之间交替切换；每一块都围绕一个主标题、一行副标语、两个小巧的蓝色胶囊 CTA，以及一张极度清晰的产品渲染图来组织。没有任何元素与产品争抢注意力。字体自信但克制；颜色不是纯白、偏暖的纸感白，就是接近黑色的深色卡片；所有交互元素都统一收束为一种安静的蓝色。

信息密度即便放在当代 SaaS 产品里也显得异常低。每个卡片大致占据一个视口，几乎没有任何装饰性 UI 外壳，没有边框、渐变、装饰框，也没有给标题加阴影。只有当产品图像落在承托表面上时，才会出现层次感，也只有这一种柔和的投影：`rgba(0, 0, 0, 0.22) 3px 5px 30px`。最终呈现出来的不是商品目录，而更像一间博物馆展厅：墙面消失，展品本身成为主角。

Store 和 Shop 类页面沿用同一套底盘，但切换了表达模式。产品配置器（iPhone 17 Pro、配件网格）引入了一组更紧凑的白色工具卡片网格，圆角为 `{rounded.lg}`（18px），配合细边框与持续存在的细窄次级导航条。环保页面则更偏深色、更具编辑感。虽然这五类页面的气质不同，但它们共享同一套排版系统、间距节奏和唯一的蓝色强调色，只是音量大小不同。

**关键特征：**
- 以摄影为先，UI 主动退场，让产品自行表达。
- 使用交替的通栏全宽卡片分区：白色/纸感白 ↔ 近黑色，颜色切换本身就是分区方式。
- 唯一的蓝色强调色（`{colors.primary}`，即 #0066cc）承担所有交互元素，不存在第二种品牌色。
- 两套按钮语法：小尺寸蓝色胶囊 CTA（`{rounded.pill}`）与紧凑工具矩形按钮（`{rounded.sm}`）。
- SF Pro Display 与 SF Pro Text 组合，在大字号下使用负字距，形成标志性的 “Apple 紧致感” 标题节奏。
- 极其轻柔的层次只在产品图像需要“呼吸感”时出现，整个系统里真正的投影只有这一种。
- 紧凑的双层导航：细窄的 `{component.global-nav}` 加上面向产品的 `{component.sub-nav-frosted}`，右侧始终保留主 CTA。
- 多页面共享统一节奏：浅色 hero → 深色产品卡片 → 浅色工具卡片 → 深色卡片 → 纸感白页脚，形成稳定而可预期的脉冲。

## 颜色

> **分析来源页面：** 首页、环保页面、Store、iPhone 17 Pro 购买页、配件索引页。五个页面使用同一套颜色系统，区别只在于表面模式的搭配比例。

### 品牌色与强调色
- **Action Blue**（`{colors.primary}`，#0066cc）：唯一的品牌级交互色。所有文字链接、所有蓝色胶囊 CTA（“Learn more”“Buy”）以及焦点描边的根色都来自这里。这是 Apple 安静但通用的“点我”信号。按下态更多通过 active 的缩放变化来体现，而不是改动 hex 值。
- **Focus Blue**（`{colors.primary-focus}`，#0071e3）：比 Action Blue 略亮，只用于按钮的键盘焦点描边（`outline: 2px solid`）。
- **Sky Link Blue**（`{colors.primary-on-dark}`，#2997ff）：用于深色表面上的正文链接和行内强调。因为 Action Blue 放在深色卡片背景上会失去可见度，所以需要更亮的蓝色版本。

### 表面色
- **Pure White**（`{colors.canvas}`，#ffffff）：主画布色。正文区域、工具卡片、Store 卡片、配置器网格都以它为基础。
- **Parchment**（`{colors.canvas-parchment}`，#f5f5f7）：Apple 标志性的偏暖浅白。用于浅色交替卡片、页脚区域，以及 Store 工具区默认页面背景。它和纯白只差一点点，但足以形成节奏。
- **Pearl Button**（`{colors.surface-pearl}`，#fafafc）：近白色，用作次级 “ghost” 按钮填充。它比纸感白略亮，因此按钮放在 `{colors.canvas-parchment}` 上依旧能被识别为按钮。
- **Near-Black Tile 1**（`{colors.surface-tile-1}`，#272729）：首页产品网格中主要的深色卡片背景。
- **Near-Black Tile 2**（`{colors.surface-tile-2}`，#2a2a2c）：比上者略亮一档，用于两个深色卡片相邻时制造极轻微的分离感。
- **Near-Black Tile 3**（`{colors.surface-tile-3}`，#252527）：比主深色卡片更深一档，用于堆叠底部以及嵌入式视频/播放器框架。
- **Pure Black**（`{colors.surface-black}`，#000000）：只留给真正的“黑洞”场景，例如视频播放器背景、通栏摄影叠层，以及全局导航栏底色。
- **Translucent Chip Gray**（`{colors.surface-chip-translucent}`，#d2d2d7）：覆盖在摄影图像上的半透明灰色控制芯片的基础 hex。正式实现里通常以约 64% alpha 使用，即 `rgba(210, 210, 215, 0.64)`。

### 文本颜色
- **Near-Black Ink**（`{colors.ink}`，#1d1d1f）：所有标题、正文段落以及深色工具按钮底色都使用这个近黑色，而非纯黑，以保留页面的摄影感而非印刷感。
- **Body**（`{colors.body}`，#1d1d1f）：与 ink 相同。Apple 在浅色表面上基本只用这一种近黑文本色。
- **Body On Dark**（`{colors.body-on-dark}`，#ffffff）：所有深色卡片和全局导航栏上的文字。
- **Body Muted**（`{colors.body-muted}`，#cccccc）：用于深色卡片中的次级文本，避免纯白显得过于刺眼。
- **Ink Muted 80**（`{colors.ink-muted-80}`，#333333）：白色 Pearl Button 上的文本色，比纯黑更柔和。
- **Ink Muted 48**（`{colors.ink-muted-48}`，#7a7a7a）：用于禁用按钮文本和法律细则小字。

### 细线与边框
- **Divider Soft**（`{colors.divider-soft}`，#f0f0f0）：次级按钮上的“边框”色，更像一圈柔和的 ring shadow，而不是硬边线。正式实现里常以 `rgba(0, 0, 0, 0.04)` 使用。
- **Hairline**（`{colors.hairline}`，#e0e0e0）：Store 工具卡片和配置芯片上的 1px 发丝线边框。

### 品牌渐变
**没有装饰性渐变。** 产品摄影中的氛围深度（例如 iPhone 17 Pro 的镜头板、Apple Watch 表带、AirPods 反光）来自图像本身，而不是 CSS 渐变覆盖。环保页面 hero 的氛围同样来自摄影内容（清晨山景），而非渐变 token。Apple 是少数完全不依赖渐变设计 token 的奢侈品牌网站之一。

## 字体排版

### 字体族
- **Display**：`SF Pro Display, system-ui, -apple-system, sans-serif`，Apple 的展示字体系，针对 19px 及以上字号优化，定义了所有标题的声音。
- **Body / UI**：`SF Pro Text, system-ui, -apple-system, sans-serif`，针对正文优化的版本，用于 20px 以下的正文、说明、按钮和链接。
- **OpenType 特性**：在数字链接（价格表、规格表）中启用 `font-variant-numeric: numerator`。大字号展示更多依赖紧字距，而不是上下文连字。

### 层级

| Token | 尺寸 | 字重 | 行高 | 字距 | 用途 |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 56px | 600 | 1.07 | -0.28px | Hero 主标题；标志性的 “Apple 紧致感” 字距 |
| `{typography.display-lg}` | 40px | 600 | 1.10 | 0 | 各产品卡片顶部标题 |
| `{typography.display-md}` | 34px | 600 | 1.47 | -0.374px | 分区标题（以 SF Pro Text 呈现展示级比例） |
| `{typography.lead}` | 28px | 400 | 1.14 | 0.196px | 产品卡片副文案 |
| `{typography.lead-airy}` | 24px | 300 | 1.5 | 0 | 环保页面导语段落（少见的 300 字重） |
| `{typography.tagline}` | 21px | 600 | 1.19 | 0.231px | 子卡片标语；次级导航分类名 |
| `{typography.body-strong}` | 17px | 600 | 1.24 | -0.374px | 行内强调文本 |
| `{typography.body}` | 17px | 400 | 1.47 | -0.374px | 默认正文 |
| `{typography.dense-link}` | 17px | 400 | 2.41 | 0 | 页脚 / Store 工具链接列表（更松的行距） |
| `{typography.caption}` | 14px | 400 | 1.43 | -0.224px | 次级说明、按钮文字 |
| `{typography.caption-strong}` | 14px | 600 | 1.29 | -0.224px | 加重说明文本 |
| `{typography.button-large}` | 18px | 300 | 1.0 | 0 | Store Hero CTA（少见的 300 字重） |
| `{typography.button-utility}` | 14px | 400 | 1.29 | -0.224px | 工具 / 导航按钮标签 |
| `{typography.fine-print}` | 12px | 400 | 1.0 | -0.12px | 细则文字、页脚正文 |
| `{typography.micro-legal}` | 10px | 400 | 1.3 | -0.08px | 极小号法律声明 |
| `{typography.nav-link}` | 12px | 400 | 1.0 | -0.12px | 全局导航菜单项 |

### 原则

- **展示字号使用负字距。** 几乎所有 17px 及以上的标题都会略微收紧字距（`-0.12 → -0.374px`），形成标志性的 “Apple 紧致感” 节奏。在 12px 及以下不会这样做。
- **正文使用 17px，而不是 16px。** Apple 打破 SaaS 常见惯例，把段落正文设为 17px。多出来的 1px 会让页面节奏更像“阅读”，而不是“扫读”。
- **300 字重是真实存在且很少使用的。** 只刻意出现在少数大字号场景中，如 `{typography.button-large}`（18px / 300）和 `{typography.lead-airy}`（24px / 300）。这不是偶然，而是一种“空气感”信号，只在需要内容显得更轻盈时使用。
- **标题用 600，而不是 700。** Apple 的标题通常停在 600。只有在需要更强断言时，才会少量使用 700，比如 `{typography.tagline}`（21px）。
- **行高严格依场景而定。** 展示字号使用 1.07-1.19 的紧行高；正文是 1.47；页脚与 Store 的工具链接列表则使用非常松的 2.41（`{typography.dense-link}`）。这个 2.41 不是错误，它正是让密集页脚链接栏仍能呼吸的原因。
- **系统里刻意没有 500 字重。** 字重阶梯是 300 / 400 / 600 / 700，中间层一律直接用 600。

### 替代字体说明
SF Pro 是 Apple 的专有系统字体。若在非 Apple 系统环境中实现：

- 将 `system-ui, -apple-system, BlinkMacSystemFont` 放在字体栈前部；在 macOS/iOS/Safari 中会解析到真实的 SF Pro。
- 对于非 Apple 平台，**Inter**（Google Fonts，可变字体）是最接近的开源替代。Inter 的 600 字重配合 `font-feature-settings: "ss03"`，能较好模拟 SF Pro 更圆润的 “a” 字形。
- 在展示字号上把 `letter-spacing` 再向负方向微调 `-0.01em`，以重建 Apple 紧致感；Inter 默认字距比 SF Pro 略宽。
- 若正文改用 Inter，建议把行高收紧 `0.03`（从 1.47 调到 1.44），因为 Inter 的 x-height 更高，不需要那么多 leading。

## 布局

### 间距系统
- **基础单位：** 8px。更小的子级数值（2、4、5、6、7）用于细致的排版校正；结构布局通常吸附到 8/12/16/20/24。
- **Tokens：** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 17px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px。
- **分区纵向内边距：** 产品卡片内部使用 `{spacing.section}`（80px）；卡片之间 0 间隙直接拼接，由颜色变化承担分割作用。
- **卡片内边距：** 工具网格卡片内部使用 `{spacing.lg}`（24px）。
- **按钮内边距：** 纵向 8-11px，横向 15-22px。
- **通用节奏常量：** 17px 正文及其行高（约 25px 行距），以及 21px 的 tagline 尺寸，几乎出现在所有分析页面中。

### 网格与容器
- **内容最大宽度：** 文本偏重区域（环保页面）约为 980px；产品网格（Store、配件）约为 1440px；首页产品卡片则通栏铺满。
- **列布局模式：** Store / 配件页常见 3 至 5 列工具卡片网格；首页个别区块使用双列并排卡片；产品卡片 hero 多为单列居中堆叠。
- **沟槽：** 工具网格卡片之间通常保持 20-24px 间距。

### 留白哲学
Apple 的留白就是产品的底座。每张卡片的标题上方通常至少保留 64px 空气感，下方再留 48-64px。产品渲染图从不拥挤，离它最近的其他内容通常也至少相隔 40px。唯一例外是页脚，那里 Apple 有意提高密度，以便用户一眼看到完整的信息架构。

## 层次与深度

| 层级 | 处理方式 | 用途 |
|---|---|---|
| Flat | 无阴影、无边框 | 通栏卡片、全局导航、页脚、正文分区 |
| Soft hairline | 1px `rgba(0, 0, 0, 0.08)` 边框 | 工具卡片、次级导航的毛玻璃分隔线 |
| Backdrop blur | Parchment 80% 透明度 + `backdrop-filter: blur(N)` | 次级导航和 iPhone 购买页底部浮动条 |
| Product shadow | `rgba(0, 0, 0, 0.22) 3px 5px 30px 0` | 落在承托表面上的产品渲染图（系统内唯一真正的“阴影”） |

**阴影哲学。** Apple 只使用 **一种** 投影，而且只施加在摄影式产品图像上，绝不用于卡片、按钮或文本。UI 的层次感主要来自两个来源：（a）表面颜色切换（浅色卡片 ↔ 深色卡片），以及（b）粘性工具条上的背景模糊。唯一的阴影是为了让产品有重量，而不是建立 UI 层级。

### 装饰性深度
- 环保页面用 **氛围摄影**（风景照片）建立情绪，而不是依赖 CSS 渐变。
- **通栏卡片的明暗交替** 在没有边框和阴影的情况下构建节奏，颜色变化本身就是分隔器。
- `{component.sub-nav-frosted}` 与 `{component.floating-sticky-bar}` 上的 **backdrop-filter 模糊** 创造出“悬浮在内容之上”的感觉，但它是功能性的，不是装饰性的。

## 形状

### 圆角尺度

| Token | 数值 | 用途 |
|---|---|---|
| `{rounded.none}` | 0px | 通栏产品卡片（不做圆角） |
| `{rounded.xs}` | 5px | 极少数被做成轻微芯片样式的行内链接 |
| `{rounded.sm}` | 8px | 深色工具按钮、卡片内嵌图片 |
| `{rounded.md}` | 11px | 白色 Pearl Button 胶囊 |
| `{rounded.lg}` | 18px | Store 工具卡片、配件网格卡片 |
| `{rounded.pill}` | 9999px | 主蓝色胶囊 CTA、次级导航购买按钮、配置芯片、搜索输入框，是标志性的 Apple 胶囊形 |
| `{rounded.full}` | 9999px / 50% | 浮在摄影图像上的圆形控制芯片 |

### 摄影几何
- **Hero 图像**：首页通常为通栏满宽、21:9 或更高比例；环保和购物页面多为 16:9。产品渲染图具有写实摄影感，常常拍摄在一块带色调的表面上，而这块表面本身就成为卡片背景。
- **产品渲染图**：常用带透明背景的 PNG/WebP，落在一个表面卡片上，并继承系统级阴影。
- **配件网格**：使用 1:1 方形裁切，圆角为 `{rounded.lg}`（18px），背景为浅中性色，产品居中放置，内部留白约 20-40px。
- **Hero 卡片里的图片不做圆角**，它们是满宽矩形。只有卡片内嵌图片才使用 `{rounded.sm}` 或 `{rounded.lg}`。
- 所有断点都使用响应式 `srcset` 与 `sizes`；图片通过 CDN 优化为 WebP，并支持懒加载。

## 组件

### 顶部导航

**`global-nav`**：固定在所有页面顶部的超薄黑色导航条。背景为 `{colors.surface-black}`，高度 44px，文字为 `{colors.on-dark}`，使用 `{typography.nav-link}`（12px / 400 / -0.12px 字距）。链接非常克制，彼此约隔 20px，横向铺满顶部。右侧常驻 Search、Bag 图标。移动端在约 834px 时折叠为汉堡菜单，Apple logo 居中。

**`sub-nav-frosted`**：位于全局导航下方、与当前页面主题相关的次级导航。背景是 80% 透明度的 `{colors.canvas-parchment}`，叠加 backdrop-filter blur，呈现毛玻璃效果。高度 52px。左侧内容为产品分类名称（如 “iPhone”“Store”“Accessories”），使用 `{typography.tagline}`（21px / 600）。右侧为 `{typography.button-utility}`（14px）的行内导航链接，结尾通常放一个持续可见的 `{component.button-primary}`（“Buy”）或工具链接。

### 按钮

**`button-primary`**：最具代表性的 Apple 行为按钮。背景 `{colors.primary}`（Action Blue #0066cc），文字 `{colors.on-primary}`，使用 `{typography.body}`（SF Pro Text 17px / 400），圆角 `{rounded.pill}`（完整胶囊形），内边距 11px × 22px。这个完整胶囊半径本身就是品牌动作信号。
- Active 状态：`{component.button-primary-active}`，通过 `transform: scale(0.95)` 反馈按压感（这是系统级微交互）。
- Focus 状态：`{component.button-primary-focus}`，使用 2px 实线 `{colors.primary-focus}` 外描边。

**`button-secondary-pill`**：当两个 CTA 并排出现时，作为第二按钮使用（如 “Learn more” / “Buy”）。背景透明，文字 `{colors.primary}`，1px 实线 `{colors.primary}` 边框，圆角 `{rounded.pill}`，内边距 11px × 22px。它读起来像一个 “ghost pill”。

**`button-dark-utility`**：全局导航中的操作按钮（Sign In、Bag、语言选择器）。背景 `{colors.ink}`（#1d1d1f），文字 `{colors.on-dark}`，使用 `{typography.button-utility}`（14px / 400 / -0.224px 字距），圆角 `{rounded.sm}`（8px），内边距 8px × 15px。按下态同样使用 `transform: scale(0.95)` 缩放。

**`button-pearl-capsule`**：产品卡片中的次级按钮。背景 `{colors.surface-pearl}`（#fafafc），文字 `{colors.ink-muted-80}`，使用 `{typography.caption}`（14px），边框为 3px 实线 `{colors.divider-soft}`，更像柔和 ring 而不是可见边线，圆角 `{rounded.md}`（11px），内边距 8px × 14px。

**`button-store-hero`**：用于 Store hero 区域的加大主 CTA。颜色仍与 `{component.button-primary}` 一致，使用同样的 Action Blue + 白字，但排版切换为 `{typography.button-large}`（18px / 300，注意少见的 300 字重），内边距也稍大，为 14px × 28px。仅少量使用在 Store 首页。

**`button-icon-circular`**：浮在摄影图像之上的圆形图标按钮。尺寸 44 × 44px，背景是约 64% alpha 的 `{colors.surface-chip-translucent}`，图标颜色为 `{colors.ink}`，圆角 `{rounded.full}`。常用于轮播控制、关闭按钮，以及 iPhone 购买页产品图缩略控制。

**`text-link`**：正文中的行内链接，颜色为 `{colors.primary}`（Action Blue），根据上下文决定是否带下划线。

**`text-link-on-dark`**：深色卡片上的行内链接，颜色为 `{colors.primary-on-dark}`（Sky Link Blue #2997ff），因为 Action Blue 放在 `{colors.surface-tile-1}` 上会失去可见性。

### 卡片与容器

**`product-tile-light`**：浅色通栏卡片。背景 `{colors.canvas}`（白色），文字 `{colors.ink}`，圆角 `{rounded.none}`（0，卡片与边缘直接相接），纵向内边距 `{spacing.section}`（80px）。内容居中堆叠：产品名使用 `{typography.display-lg}`（40px / 600）→ 一行标语使用 `{typography.lead}`（28px / 400）→ 两个 `{component.button-primary}` CTA（“Learn more” / “Buy”）→ 落在承托表面上的产品渲染图，并带系统阴影。

**`product-tile-parchment`**：与 `{component.product-tile-light}` 相同，但背景改为 `{colors.canvas-parchment}`（#f5f5f7），用于打断两个连续白色卡片。

**`product-tile-dark`**：深色通栏卡片。背景 `{colors.surface-tile-1}`（#272729），文字 `{colors.on-dark}`，圆角 `{rounded.none}`，纵向内边距 `{spacing.section}`（80px）。内容结构与浅色卡片一致，但行内链接切换为 `{component.text-link-on-dark}`，CTA 仍使用 `{component.button-primary}`，因为 Action Blue 在深色表面上依然有效。它是首页产品网格中交替出现的深色带。

**`product-tile-dark-2`**：变体，背景为 `{colors.surface-tile-2}`（#2a2a2c）。当深色卡片直接贴着 `{component.product-tile-dark}` 上下排列时，用这一层更亮一档的深色做极轻微的区分。

**`product-tile-dark-3`**：变体，背景为 `{colors.surface-tile-3}`（#252527）。用于堆叠底部以及嵌入式视频/播放器框架。

**`store-utility-card`**：用于 Store 网格和配件网格。背景 `{colors.canvas}`（白色），1px 实线 `{colors.hairline}` 边框，圆角 `{rounded.lg}`（18px），内边距 `{spacing.lg}`（24px）。顶部是产品图（1:1 裁切，内部图片圆角 `{rounded.sm}` 即 8px）；下方是产品名 `{typography.body-strong}`（17px / 600）、价格 `{typography.body}`（17px / 400），以及一个 `{component.text-link}`（“Buy” 或 “Learn more”）。默认不加阴影；真正的层次来自产品图自身的系统级阴影。

**`configurator-option-chip`**：iPhone 17 Pro 购买页里使用的胶囊形可点选单元。背景 `{colors.canvas}`，文字 `{colors.ink}`，使用 `{typography.caption}`，圆角 `{rounded.pill}`，内边距 12px × 16px。内部包含小产品缩略图、标签与价格变化信息，通常每行排 4-5 个。

**`configurator-option-chip-selected`**：选中态。边框升级为 2px 实线 `{colors.primary-focus}`，其余形态与内容保持不变。

**`environment-quote-card`**：环保页面特有的摄影画布 hero。背景是深色摄影景观（清晨山景），以 `{colors.surface-tile-1}` 作为兜底色，中央放置白色标题，使用 `{typography.display-lg}`（40px），标题上方有小型绿色 “Apple 2030” 图形标识，下方只有一个 `{component.button-primary}`。内边距 `{spacing.section}`（80px）。

**`floating-sticky-bar`**：在 iPhone 17 Pro 购买页滚动过程中固定浮在视口底部的条状区域。背景为 80% 透明度的 `{colors.canvas-parchment}`，叠加 `backdrop-filter: blur(N)`，高度 64px，内边距 12px × 32px。左侧显示当前总价，使用 `{typography.body}`；右侧放一个 `{component.button-primary}`（“Add to Bag”）。

### 输入与表单

**`search-input`**：配件页搜索输入框。背景 `{colors.canvas}`，文字 `{colors.ink}`，使用 `{typography.body}`（17px），边框为 1px 实线 `rgba(0, 0, 0, 0.08)`，圆角 `{rounded.pill}`（完整胶囊形，意味着搜索也遵循 CTA 的胶囊语法），内边距 12px × 20px，高度 44px。前置图标为 14px 的搜索 glyph，颜色较弱。

在分析页面中没有暴露错误态或校验态。

### 页脚

**`footer`**：背景 `{colors.canvas-parchment}`（#f5f5f7），文字 `{colors.ink-muted-80}`。链接列使用 `{typography.dense-link}`（17px / 400 / 2.41 行高，这种宽松 leading 正是让密集列仍然可扫读的关键）；列标题使用 `{typography.caption-strong}`（14px / 600）；最底部法律信息行使用 `{typography.fine-print}`（12px / 400），文字颜色为 `{colors.ink-muted-48}`。纵向内边距 64px。

## 应做与避免

### 应做
- 所有交互元素都使用 `{colors.primary}`（Action Blue #0066cc），包括链接、胶囊 CTA、焦点提示，而且只能用这一种强调色，这条规则不可谈判。
- 标题使用 `{typography.hero-display}` 或 `{typography.display-lg}`，并配合负字距（`-0.28 → -0.374px`），才能获得标志性的 “Apple 紧致感” 节奏。
- 正文使用 `{typography.body}`（17px / 400 / 1.47 / -0.374px），不要用 16px。多出来的 1px 正是品牌阅读节奏的一部分。
- 通栏分区应交替使用 `{component.product-tile-light}`（或 parchment）和 `{component.product-tile-dark}`。颜色切换本身就是分割线。
- 将 `{rounded.pill}` 保留给主蓝色 CTA，以及任何应该被识别为“动作”的元素（配置芯片、搜索框、粘性条 CTA）。
- 唯一的产品阴影（`rgba(0, 0, 0, 0.22) 3px 5px 30px`）只给落在承托表面上的产品渲染图使用，绝不要用在卡片、按钮或文本上。
- 所有按钮的按下态都使用 `transform: scale(0.95)`，这是系统级统一微交互。
- 全局导航保持 `{colors.surface-black}`（纯黑），因为在大多数页面里这里是唯一真正出现纯黑的区域。

### 避免
- 不要引入第二种强调色；所有“点我”的信号都应该是 `{colors.primary}`（Action Blue）。
- 不要给卡片、按钮或文本加阴影；阴影只属于产品图像。
- 不要用渐变做装饰性背景；氛围应来自摄影内容。
- 不要把正文设为 500 字重；Apple 的字重阶梯是 300 / 400 / 600 / 700，刻意没有 500。正文始终为 400，行内强调为 600，展示标题也是 600。
- 不要给通栏卡片做圆角；它们应始终是从边到边的矩形，颜色变化才是分隔方式。
- 不要把正文字号行高压到 1.47 以下；这种偏编辑式的 leading 本身就是品牌的一部分。
- 不要混用圆角语法；紧凑工具元素用 `{rounded.sm}`，工具卡片用 `{rounded.lg}`，胶囊元素用 `{rounded.pill}`，中间值只留给极少见的 `{rounded.md}` Pearl Button。
- 不要在浅色表面上使用 `{colors.primary-on-dark}`（Sky Link Blue）；它只属于深色卡片。浅色表面应始终使用 Action Blue。

## 响应式行为

### 断点

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| Small phone | ≤ 419px | 单列卡片；次级导航折叠为仅分类名 + 主 CTA；hero 标题降到 28px |
| Phone | 420-640px | 单列堆叠；产品渲染图缩到卡片宽度的 80%；hero h1 降到 34px |
| Large phone | 641-735px | 卡片纵向内边距收紧为 48px，而不是 80px；细则文字开始换行 |
| Tablet portrait | 736-833px | 全局导航折叠为汉堡菜单；次级导航隐藏分类 chips，仅保留主 CTA |
| Tablet landscape | 834-1023px | 全局导航恢复完整展开；3 列工具网格变为 2 列 |
| Small desktop | 1024-1068px | 产品卡片采用 2/3 宽度并保留外侧边距；hero h1 保持 40px |
| Desktop | 1069-1440px | 完整布局；Store 网格为 4-5 列；内容最大宽度 1440px |
| Wide desktop | ≥ 1441px | 内容锁定在 1440px，额外宽度由左右边距吸收 |

对 agent 来说最重要的结构断点是：1440px（内容锁定）、1068px（小桌面）、833px（横屏平板切换）、734px（竖屏平板）、640px（手机）、480px（小屏手机）。

### 触控目标
- 最小尺寸 44 × 44px。`{component.button-primary}` 通常约为 44 × 100px，而完整胶囊半径会让可感知点击区域看起来比标签本身更宽松。
- `{component.button-icon-circular}` 精确为 44 × 44px。
- 全局导航工具链接更小（约 32 × 80px），因为它们本来就是桌面端的精确操作；在 ≤ 833px 时会由移动端汉堡菜单替代。

### 折叠策略
- **Global nav**：桌面端是完整横向链接行；在 834px 及以下折叠为 Apple logo + 汉堡菜单 + bag 图标。
- **Sub-nav**：原本是分类名 + 行内链接 + 主 CTA；到移动端只保留分类名 + 主 CTA，行内链接进入抽屉菜单。
- **Product tiles**：在 834px 时从双列变为单列；在小屏手机上纵向内边距从 80px 收紧到 48px。
- **Utility grids**（Store、配件）：5 列 → 4 列（1440px）→ 3 列（1068px）→ 2 列（834px）→ 1 列（640px）。
- **Hero typography**：`{typography.hero-display}`（56px）→ 在 1068px 变为 `{typography.display-lg}`（40px）→ 在 640px 变为 34px → 在 419px 变为 28px。

### 图片行为
- 所有产品图片都使用响应式 `srcset`，并为不同断点提供对应裁切。
- Hero 摄影图在移动端可能切换构图方向，例如环保页面的山景在手机上会裁成更高的纵向比例，以重新聚焦主体。
- 产品渲染图在各断点维持其 1:1 或 4:3 的宽高比，只改变缩放大小。
- 默认启用懒加载；首屏 hero 图片会提前加载。

## 迭代指南

1. 一次只聚焦 **一个组件**。直接引用它的 YAML key（如 `{component.product-tile-dark}`、`{component.search-input}`）。
2. 现有组件的变体（`-active`、`-focus`、`-2`、`-3`）应在 `components:` 中作为独立条目存在。
3. 所有地方都使用 `{token.refs}`，不要内联 hex 值。
4. 不要记录 hover，只记录默认态与 Active/Pressed 态。
5. 展示标题始终是 SF Pro Display 600，并带负字距；正文始终是 SF Pro Text 400、17px。这条边界不可打破。
6. 唯一的投影（`rgba(0, 0, 0, 0.22) 3px 5px 30px`）只保留给产品摄影。
7. 当你不确定如何增强强调时，优先切换表面（浅色 → 深色卡片），而不是增加 UI 外壳。

## 已知缺口

- 在分析页面中没有出现表单校验与错误态，目前只记录了中性的搜索输入框。
- 首页中的嵌入式视频/播放器框架使用 `{colors.surface-black}`；播放器内部控件未记录，因为它们属于平台小部件，而非网页设计 token。
- 某些组件图像是动态的（如轮换产品 hero），具体文案会随页面不同而变化；组件规格描述的是结构，而不是轮播内容本身。
- 在分析页面中没有出现 Store 和配件工具卡片的深色模式变体；当前记录的是 Apple 默认发布的日间 / 浅色主导版本。
- 氛围摄影（环保页面的山景）属于内容资产，而不是设计 token；文中 `{component.environment-quote-card}` 只描述其结构性表面。
- `{component.sub-nav-frosted}` 与 `{component.floating-sticky-bar}` 的确切 backdrop-filter blur 半径依平台而异；生产环境 CSS 常见基线是 `saturate(180%) blur(20px)`，但它并未被正式定义为 token。
