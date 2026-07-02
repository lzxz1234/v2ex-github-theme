# V2EX GitHub Theme — 全站重写设计规格

**日期**：2026-07-02  
**目标**：打开页面第一眼以为是 GitHub，而不只是"像 GitHub 风格"。  
**范围**：全站（首页、帖子详情、节点页、个人主页、登录/注册）  
**技术约束**：纯 CSS，零 JS 依赖，通过 V2EX 自定义 CSS 注入

---

## 1. 设计原则

1. **像素级还原**：所有颜色、尺寸、间距直接取自 GitHub Primer 官方值，不做主观调整
2. **功能保留**：V2EX 特有元素不隐藏，重新映射为 GitHub 原生组件外观
3. **双主题**：Light / Dark 完整覆盖，通过 `#Wrapper.Night` 切换
4. **单文件交付**：`v2ex-github-theme.css`，内部按模块分 section

---

## 2. CSS 变量系统（Design Tokens）

### 2.1 Light 模式（`:root`）

| 变量名 | 值 | 来源 |
|---|---|---|
| `--gh-topbar-bg` | `#25292e` | Primer `--header-bgColor` |
| `--gh-topbar-text` | `#ffffffb3` | Primer `--header-fgColor-default` |
| `--gh-topbar-logo` | `#ffffff` | Primer `--header-fgColor-logo` |
| `--gh-topbar-hover` | `rgba(255,255,255,.1)` | Primer hover state |
| `--gh-topbar-search-bg` | `#25292e` | Primer `--headerSearch-bgColor` |
| `--gh-topbar-search-border` | `#818b98` | Primer `--headerSearch-borderColor` |
| `--gh-canvas` | `#ffffff` | Primer `--bgColor-default` |
| `--gh-canvas-subtle` | `#f6f8fa` | Primer `--bgColor-muted` |
| `--gh-canvas-inset` | `#f6f8fa` | Primer `--bgColor-inset` |
| `--gh-border` | `#d0d7de` | Primer `--borderColor-default` |
| `--gh-border-muted` | `#d8dee4` | Primer `--borderColor-muted` |
| `--gh-text-primary` | `#1f2328` | Primer `--fgColor-default` |
| `--gh-text-secondary` | `#656d76` | Primer `--fgColor-muted` |
| `--gh-text-muted` | `#818b98` | Primer `--fgColor-subtle` |
| `--gh-link` | `#0969da` | Primer `--fgColor-link` |
| `--gh-accent` | `#0969da` | Primer `--fgColor-accent` |
| `--gh-accent-emphasis` | `#0550ae` | Primer `--bgColor-accent-emphasis` |
| `--gh-success` | `#1a7f37` | Primer `--fgColor-success` |
| `--gh-success-bg` | `#dafbe1` | Primer `--bgColor-success-muted` |
| `--gh-danger` | `#d1242f` | Primer `--fgColor-danger` |
| `--gh-btn-bg` | `#f6f8fa` | Primer button default bg |
| `--gh-btn-border` | `#d0d7de` | Primer button default border |
| `--gh-btn-hover-bg` | `#f3f4f6` | Primer button hover |
| `--gh-btn-primary-bg` | `#1f883d` | Primer `--button-primary-bgColor-rest` |
| `--gh-btn-primary-hover` | `#1a7f37` | Primer `--button-primary-bgColor-hover` |
| `--gh-radius` | `6px` | Primer `--borderRadius-medium` |
| `--gh-radius-full` | `2em` | pill 形状 |
| `--gh-font` | `-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif` | Primer font stack |
| `--gh-font-mono` | `ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace` | Primer mono font stack |

### 2.2 Dark 模式（`#Wrapper.Night`）

| 变量名 | 值 |
|---|---|
| `--gh-topbar-bg` | `#161b22` |
| `--gh-topbar-search-border` | `#30363d` |
| `--gh-canvas` | `#0d1117` |
| `--gh-canvas-subtle` | `#161b22` |
| `--gh-canvas-inset` | `#010409` |
| `--gh-border` | `#30363d` |
| `--gh-border-muted` | `#21262d` |
| `--gh-text-primary` | `#e6edf3` |
| `--gh-text-secondary` | `#848d97` |
| `--gh-text-muted` | `#6e7681` |
| `--gh-link` | `#2f81f7` |
| `--gh-accent` | `#2f81f7` |
| `--gh-btn-bg` | `#21262d` |
| `--gh-btn-border` | `#30363d` |
| `--gh-btn-hover-bg` | `#30363d` |
| `--gh-btn-primary-bg` | `#238636` |
| `--gh-btn-primary-hover` | `#2ea043` |

### 2.3 SVG 图标（data URI Octicons）

所有图标通过 CSS 变量存储为 data URI，在 `:root` 中定义 Light 版本，`#Wrapper.Night` 中覆盖 Dark 版本（fill 色由 `#656d76` 改为 `#8b949e`）。

需要的图标集：
- `--gh-icon-github`：Octocat Logo（白色，32×32，顶栏专用）
- `--gh-icon-search`：搜索放大镜（16×16）
- `--gh-icon-issue-opened`：议题圆圈（16×16，绿色 `#1a7f37`）
- `--gh-icon-issue-closed`：已关闭议题（紫色 `#8250df`）
- `--gh-icon-comment`：评论气泡（16×16）
- `--gh-icon-bell`：通知铃铛（16×16，白色，顶栏专用）
- `--gh-icon-plus`：加号（16×16，白色，顶栏专用）
- `--gh-icon-chevron`：下拉箭头（16×16）
- `--gh-icon-star`：星标（16×16）
- `--gh-icon-tag`：标签（16×16）
- `--gh-icon-people`：用户组（16×16）
- `--gh-icon-flame`：火焰热门（16×16）
- `--gh-icon-home`：首页（16×16）
- `--gh-icon-history`：历史（16×16）
- `--gh-icon-book`：节点/文档（16×16）
- `--gh-icon-check`：绿色对勾（16×16）
- `--gh-icon-x`：关闭 X（16×16）

---

## 3. 全局 Reset

```
* { box-sizing: border-box; }
body { font-family: var(--gh-font); font-size: 14px; line-height: 1.5; color: var(--gh-text-primary); background: var(--gh-canvas); -webkit-font-smoothing: antialiased; }
#Wrapper { background: var(--gh-canvas); min-height: 100vh; }
a { color: var(--gh-link); text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; }
```

---

## 4. 顶部导航栏（`#Top`）

### 4.1 尺寸与颜色

- 高度：`54px`（上下 padding `16px` + 内容行高 `22px`）
- 背景：`#25292e`（`--gh-topbar-bg`）
- position: `sticky`，top: `0`，z-index: `32`（Primer 值）
- 内容区 max-width: `1280px`，左右 padding: `16px`

### 4.2 布局（从左到右）

```
[Logo 32px] [搜索框 272px→544px] [flex-grow spacer] [导航链接组] [分隔] [铃铛] [加号] [头像/登录按钮]
```

- Logo：隐藏原始图片，用 `--gh-icon-github` data URI 替换，`32×32`，`opacity: 1`，hover `opacity: .8`
- 导航链接：`color: #ffffffb3`，hover `color: #ffffff` + `background: rgba(255,255,255,.1)`，padding `6px 8px`，`border-radius: 6px`，`font-weight: 600`，`font-size: 14px`
  - V2EX 链接文字映射：保留原文字，只改样式
- 右侧图标（铃铛、加号）：用 `::before` 伪元素注入 16px Octicon SVG，白色，hover 透明背景

### 4.3 搜索框

- 默认宽度：`272px`
- 聚焦展开：`544px`，transition `width .3s`
- 高度：`30px`，border-radius: `6px`
- 背景：`var(--gh-topbar-search-bg)`（与顶栏同色，视觉融合）
- 边框：`1px solid var(--gh-topbar-search-border)`（`#818b98`）
- 聚焦：`border-color: var(--gh-accent)`，`box-shadow: 0 0 0 3px rgba(9,105,218,.3)`，`background: var(--gh-canvas)`
- 搜索图标：`::before` 伪元素，`top: 7px; left: 8px`，`16×16`，`opacity: .7`
- 输入文字颜色：默认 `rgba(255,255,255,.7)`，聚焦后 `var(--gh-text-primary)`

---

## 5. 三栏布局

```
#Wrapper > .content {
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px;
  gap: 24px;
}
```

| 区域 | 宽度 | 说明 |
|---|---|---|
| `#Leftbar` | `220px`，`flex-shrink: 0` | sticky，top: `70px` |
| `#Main` | `flex: 1`，`min-width: 0` | 主内容 |
| `#Rightbar` | `296px`，`flex-shrink: 0` | 右侧信息 |

---

## 6. 左侧栏（`#Leftbar`）→ GitHub Filter 面板

- 无背景色，无边框，无圆角（透明）
- 导航链接：`display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 6px; font-size: 14px; color: var(--gh-text-secondary)`
- hover：`background: var(--gh-canvas-subtle); color: var(--gh-text-primary)`
- active/当前节点：`color: var(--gh-text-primary); font-weight: 600`，左侧 `3px` 实色竖条（`border-left: 3px solid var(--gh-accent)`，`padding-left: 5px`）
- 每个链接前用 `::before` 注入对应 16px Octicon 图标
- 分组标题：`font-size: 12px; font-weight: 600; color: var(--gh-text-secondary); text-transform: uppercase; letter-spacing: .04em; margin: 16px 0 4px 8px`

---

## 7. 主内容区（`#Main`）

### 7.1 卡片容器（`.box`）

- `background: var(--gh-canvas)`
- `border: 1px solid var(--gh-border)`
- `border-radius: 6px`
- `margin-bottom: 16px`
- 无 `box-shadow`

### 7.2 Cell 分隔行（`.cell`）

- `padding: 16px`
- `border-bottom: 1px solid var(--gh-border-muted)`
- 最后一个子元素无底边框：`.cell:last-child { border-bottom: none }`

---

## 8. Tabs 标签栏

### 8.1 主 Tabs（`#Tabs`）→ GitHub Issues Open/Closed 切换

- 容器：`border-bottom: 1px solid var(--gh-border)`，`padding: 0`，`margin-bottom: 16px`
- tab 项：`padding: 8px 16px`，`font-size: 14px`，`color: var(--gh-text-secondary)`，`border-bottom: 2px solid transparent`，`margin-bottom: -1px`
- hover：`color: var(--gh-text-primary)`，`border-bottom-color: var(--gh-border)`
- 当前选中：`color: var(--gh-text-primary)`，`font-weight: 600`，`border-bottom: 2px solid #fd8c73`（GitHub 使用橙红色指示条）
- tab 内的计数 badge：`background: var(--gh-canvas-subtle)`，`border: 1px solid var(--gh-border)`，`border-radius: 2em`，`padding: 0 6px`，`font-size: 12px`

### 8.2 二级 Tabs（`#SecondaryTabs`）→ GitHub sub-nav

- 容器：`display: flex; gap: 4px; margin-bottom: 16px`
- 每项：`padding: 5px 16px`，`border-radius: 6px`，`font-size: 14px`，`color: var(--gh-text-secondary)`
- 当前选中：`background: var(--gh-canvas-subtle)`，`color: var(--gh-text-primary)`，`font-weight: 600`

---

## 9. 主题列表（`.cell.item`）→ GitHub Issues 列表行

- hover：`background: var(--gh-canvas-subtle)`
- 左侧图标：`::before` 伪元素，`--gh-icon-issue-opened`（绿色），`16×16`，`flex-shrink: 0`
- 标题链接 `.topic-link`：`font-size: 15px`，`font-weight: 600`，`color: var(--gh-text-primary)`，hover `color: var(--gh-link)`
- 元信息行：`font-size: 12px`，`color: var(--gh-text-secondary)`，`margin-top: 4px`
- 节点标签：`background: var(--gh-canvas-subtle)`，`border: 1px solid var(--gh-border)`，`border-radius: 2em`，`padding: 0 7px`，`font-size: 12px`，`color: var(--gh-text-secondary)`
- 回复数徽章（`.count_livid`）：右侧对齐，`display: flex; align-items: center; gap: 4px`，`::before` 注入 comment 图标，`font-size: 12px`，`color: var(--gh-text-secondary)`

---

## 10. 帖子详情页

### 10.1 标题区（`.header`）

- 背景：`var(--gh-canvas-subtle)`（`#f6f8fa`）
- 底部边框：`1px solid var(--gh-border)`
- padding：`24px 16px 16px`
- `h1`：`font-size: 28px`，`font-weight: 400`，`color: var(--gh-text-primary)`，`line-height: 1.3`
- Issue 编号：`font-size: 28px`，`color: var(--gh-text-secondary)`，`font-weight: 400`（附在标题后）
- 状态 badge（Open/Closed）：绿色 `#1a7f37` 背景，白色文字，`border-radius: 2em`，`padding: 4px 12px`，带图标前缀

### 10.2 正文（`.topic_content`）→ GitHub Markdown 渲染

- 字号：`16px`，行高：`1.7`
- `h1-h6`：字重 `600`，下方 `0.3em` border-bottom（h1/h2）
- `code`（行内）：`background: rgba(175,184,193,.2)`，`border-radius: 6px`，`padding: 2px 5px`，`font-size: 85%`，等宽字体
- `pre`：`background: var(--gh-canvas-subtle)`，`border: 1px solid var(--gh-border)`，`border-radius: 6px`，`padding: 16px`，横向滚动
- `blockquote`：左侧 `4px solid var(--gh-border)`，`color: var(--gh-text-secondary)`，`padding-left: 16px`，`margin: 0 0 16px`
- `table`：`border-collapse: collapse`，每格 `border: 1px solid var(--gh-border)`，`padding: 6px 13px`，奇数行背景 `var(--gh-canvas-subtle)`
- `img`：`max-width: 100%`，`border-radius: 6px`
- `hr`：`border: 1px solid var(--gh-border-muted)`

### 10.3 操作按钮栏（`.topic_buttons`）

- `background: var(--gh-canvas-subtle)`，`border-top: 1px solid var(--gh-border)`，`border-bottom: 1px solid var(--gh-border)`
- `padding: 8px 16px`，`display: flex; gap: 8px; align-items: center`

---

## 11. 回复区（`.reply`）→ GitHub Issue Comment block

每条回复完整模拟 GitHub comment 结构：

```
┌─────────────────────────────────────────────────┐
│ [头像 40px] │ 灰色 header bar: 用户名 · 时间 · OP徽章 │
│             ├─────────────────────────────────────┤
│             │  回复正文内容                        │
└─────────────────────────────────────────────────┘
```

- 整体：`border: 1px solid var(--gh-border)`，`border-radius: 6px`，`margin-bottom: 16px`
- header bar：`background: var(--gh-canvas-subtle)`，`border-bottom: 1px solid var(--gh-border)`，`padding: 8px 16px`，`font-size: 14px`
- 正文：`padding: 16px`，`background: var(--gh-canvas)`
- 头像：`40px`，`border-radius: 50%`，浮动在左侧，主体有 `margin-left: 56px`
- OP 徽章：`color: var(--gh-accent)`，`border: 1px solid var(--gh-accent)`，`border-radius: 2em`，`padding: 0 7px`，`font-size: 12px`，`font-weight: 500`
- 楼层号：右侧，`color: var(--gh-text-secondary)`，`font-size: 12px`

---

## 12. 按钮

| 类型 | 样式 |
|---|---|
| 默认（`.normal.button`） | `background: var(--gh-btn-bg)`，`border: 1px solid var(--gh-btn-border)`，`color: var(--gh-text-primary)`，`border-radius: 6px`，`padding: 5px 16px`，`font-size: 14px`，`font-weight: 500`，hover `background: var(--gh-btn-hover-bg)` |
| 主要（`.super.button`） | `background: var(--gh-btn-primary-bg)`，`color: #ffffff`，`border: 1px solid rgba(31,35,40,.15)`，hover `background: var(--gh-btn-primary-hover)` |
| 危险 | `color: var(--gh-danger)`，hover `background: var(--gh-danger)`，`color: #ffffff` |

---

## 13. 表单控件

- 输入框：`height: 32px`，`padding: 5px 12px`，`font-size: 14px`，`border: 1px solid var(--gh-border)`，`border-radius: 6px`，`background: var(--gh-canvas)`
- 聚焦：`border-color: var(--gh-accent)`，`outline: none`，`box-shadow: 0 0 0 3px rgba(9,105,218,.3)`
- textarea：同上，`min-height: 200px`，`resize: vertical`

---

## 14. 节点/标签页

- 节点标题：`font-size: 20px`，`font-weight: 600`，配节点图标（如有）
- 节点描述：`color: var(--gh-text-secondary)`，`font-size: 14px`
- 节点统计数：badge 样式

---

## 15. 个人主页

- 头像：`260px`，`border-radius: 50%`，`border: 1px solid var(--gh-border)`
- 用户名：`font-size: 24px`，`font-weight: 600`
- bio：`font-size: 16px`，`color: var(--gh-text-secondary)`
- 统计行：`display: flex; gap: 16px`，每项带 Octicon 图标前缀

---

## 16. 登录/注册页

- 页面背景：`var(--gh-canvas-subtle)`
- 表单卡片：`background: var(--gh-canvas)`，`border: 1px solid var(--gh-border)`，`border-radius: 6px`，`padding: 24px`，`width: 340px`，居中
- Logo：居中，顶部，`64×64`
- 标题：`font-size: 24px`，`font-weight: 300`，`text-align: center`
- Sign in 按钮：Primary green，全宽
- Sign up 链接区：`border: 1px solid var(--gh-border)`，`border-radius: 6px`，`padding: 16px`，居中文字

---

## 17. 底部（`#Bottom`）

- `border-top: 1px solid var(--gh-border)`
- `background: var(--gh-canvas)`
- `padding: 16px`
- `font-size: 12px`，`color: var(--gh-text-secondary)`
- `text-align: center`
- 链接颜色：`var(--gh-text-secondary)`，hover `var(--gh-link)`，`text-decoration: none`

---

## 18. 文件结构（单文件，按 section 组织）

```
/* === 1. CSS Variables (Light) === */
/* === 2. Global Reset === */
/* === 3. Top Navigation === */
/* === 4. Search Box === */
/* === 5. Three-Column Layout === */
/* === 6. Leftbar === */
/* === 7. Main / Box / Cell === */
/* === 8. Tabs === */
/* === 9. Topic List === */
/* === 10. Topic Detail === */
/* === 11. Reply / Comments === */
/* === 12. Buttons === */
/* === 13. Form Controls === */
/* === 14. Node / Tag Pages === */
/* === 15. Profile Page === */
/* === 16. Login / Register === */
/* === 17. Bottom === */
/* === 18. Dark Mode Overrides === */
```

---

## 19. 不在本次范围内

- JavaScript 交互增强（hover 下拉菜单等）
- 自定义字体加载（使用系统字体栈）
- 图片/媒体上传界面
- 邮件通知页面
