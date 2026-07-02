# V2EX GitHub Theme 全面修复设计

> 日期：2026-07-02  
> 范围：首页、节点页、主题详情、登录页、侧栏、夜间模式  
> 基于浏览器实测（CDN `@a730f94`）与 V2EX 真实 DOM 结构

## 1. 问题诊断摘要

### 1.1 结构性问题（所有页面）

| 问题 | 实测证据 | 影响 |
|------|----------|------|
| `#Leftbar` 恒为空但仍占 220px | 首页/节点页/详情页/登录页 `leftbarLen = 0`，computed width = 220px | 主栏被压缩约 244px |
| V2EX combo.css 背景泄漏 | `#Tabs a.tab_current` 仍为 `rgb(51,51,68)` | Tab 出现 V2EX 深色块 |
| 页面底色全白 | `body` bg = `#ffffff` | 缺少 GitHub 灰底 + 白卡片层次 |
| `.sep20/.sep5/.sep10` 未重置 | 首页 15 处 sep20，各 20px | 垂直间距松散、不统一 |
| 登录页选择器不匹配 | `body.signin`、`#Wrapper.signin` 均为空 class | 第 16 节登录样式完全未生效 |

### 1.2 按页面分类

**首页 `/`**
- Tab 选中态背景泄漏（见上）
- `#SecondaryTabs` 用 `&nbsp;` 分隔，flex gap 无效
- 列表 table+头像布局偏论坛感（可接受，需弱化头像列）

**节点页 `/go/*`**
- 同样有空 Leftbar、Tab/列表问题
- 节点头部 `.box .header` 有内容但无 GitHub Issue 式 Open badge
- 分页器、RSS 链接无 GitHub 风格

**主题详情 `/t/*`**
- `h1` 在 `.box .header` 内，字号 28px 已生效
- 投票 `.votes .fa-chevron-*` 仍为 Font Awesome，未替换
- 标签 `a.tag` 含 `<li class="fa fa-tag">`，需隐藏 FA、用 Octicon
- 回复 `#r_*` 设为 `display:flex`，但内部仍是 `<table>`，布局冲突
- `.topic_buttons` 存在但操作链接未按钮化

**登录页 `/signin`**
- 仍走三栏布局：空 Leftbar + Main(表单) + Rightbar(OAuth)
- 表单在 `#Main .box`，非 `.signin-form`
- OAuth 在 `#Rightbar .box .header`「其他登录方式」
- 页面背景未变灰，表单未居中

**夜间模式 `#Wrapper.Night`**
- 仅有 CSS 变量 + 少量组件覆盖
- 缺少：tab 背景重置、回复卡片、侧栏、登录页、分页、FA 图标隐藏后的对比度

---

## 2. 设计原则

1. **以 V2EX 真实 DOM 为准**，不假设 Leftbar 有内容（当前版本恒为空）
2. **新增「V2EX 覆盖层」**（Section 2.5），集中对抗 combo.css
3. **保留 V2EX 功能元素**（投票、铜币、广告），只做视觉弱化，不 `display:none` 业务模块
4. **纯 CSS**，不引入 JS
5. **改动按 Phase 分批**，每批可在浏览器逐页验收

---

## 3. Phase 0 — 基础层（全局，优先）

### 3.1 画布与间距

```css
/* body / Wrapper 灰底 */
body, #Wrapper {
  background: var(--gh-canvas-subtle) !important;
}

/* V2EX 间距工具类重置 */
#Wrapper .sep20 { height: 0 !important; margin: 0 !important; overflow: hidden !important; }
#Wrapper .sep10 { height: 0 !important; margin: 0 !important; }
#Wrapper .sep5  { height: 0 !important; margin: 0 !important; }
/* 用 padding/gap 已在各组件定义 */
```

### 3.2 空 Leftbar 隐藏

```css
#Leftbar:empty {
  display: none !important;
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
```

> 注：实测所有页面 Leftbar 均为空；`:empty` 足够。若未来 V2EX 注入内容，自动恢复。

### 3.3 V2EX combo.css 覆盖层（新增 Section 2.5）

```css
/* Tab — 覆盖 a.tab_current:link 等 */
#Tabs a.tab,
#Tabs a.tab:link,
#Tabs a.tab:visited,
#Tabs a.tab:active,
#Tabs a.tab_current,
#Tabs a.tab_current:link,
#Tabs a.tab_current:visited,
#Tabs a.tab_current:active {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
}

/* 顶栏链接 */
#Top .tools a.top,
#Top .tools a.top:link,
#Top .tools a.top:visited,
#Top .tools a.top:active {
  /* 已有样式保留，确保 background 不泄漏 */
  background-color: transparent !important;
}

/* 隐藏 Font Awesome 图标，避免与 Octicon 重复 */
.fa::before, li.fa { /* 见 Phase 3/4 细化 */ }
```

### 3.4 布局微调

```css
#Wrapper > .content {
  /* Leftbar 隐藏后 Main 自动撑满 */
  padding-top: 16px !important; /* 原 24px + sep20 叠加过多 */
}
```

---

## 4. Phase 1 — 首页 & 列表页

### 4.1 Tabs

- 保持 GitHub 下划线选中态（`#fd8c73` 色条）
- `#Tabs` 在 `.box .inner` 内：确保 `.box` 顶部圆角与 tab 区融合
- Tab 计数 `sup` 样式已有，检查 combo.css 是否覆盖 padding

### 4.2 SecondaryTabs

```css
#SecondaryTabs {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}
#SecondaryTabs a {
  /* pill 标签 */
  padding: 4px 12px !important;
  border: 1px solid var(--gh-border) !important;
  border-radius: var(--gh-radius-full) !important;
  background: var(--gh-canvas) !important;
}
```

### 4.3 主题列表

- 保留 issue-opened 图标（已生效）
- 可选：缩小头像 `48px → 32px`，减弱论坛感
- `a.node` pill 样式已有
- `count_livid` 评论图标已有

### 4.4 右侧栏

- 用户统计 table → 通过 `#Rightbar .cell table` 设为 `border-collapse` + 去除 cellspacing 视觉
- 铜币/银币/金币行：缩小图标、`color: var(--gh-text-muted)`
- 广告 `.ads` / promoted 框：边框改为 `var(--gh-border)`，去高饱和蓝底（若 class 可定位）

---

## 5. Phase 2 — 主题详情页

### 5.1 标题区 `.box .header`

- 已有 `h1` 28px / `font-weight: 400`
- 新增：在 `h1` 前用 `::before` 或包装伪元素显示 **Open** 绿色 badge（模拟 GitHub Issue）
- 面包屑 `.chevron`：`color: var(--gh-text-muted)`
- 头像 `.header .fr img.avatar`：限制 `48px` 圆形，与 GitHub 右上角作者区对齐

### 5.2 投票 `.votes`

```css
.votes a.vote { /* 改为小方形 ghost 按钮 */ }
.votes .fa, .votes li.fa { display: none !important; }
.votes a.vote::before { /* chevron-up/down SVG */ }
```

### 5.3 标签 `a.tag`

- 隐藏 `li.fa`
- `::before` 使用 `--gh-icon-tag`
- pill 边框样式同 `a.node`

### 5.4 回复列表 `#r_*`

**问题**：`display:flex` 与内部 `<table>` 冲突。

**方案**：放弃对 `#r_*` 设 flex，改为：

```css
.cell[id^="r_"] {
  display: block !important; /* 回退 */
  padding: 0 !important;
  border-bottom: 1px solid var(--gh-border-muted) !important;
}
.cell[id^="r_"] table { width: 100% !important; }
.cell[id^="r_"] img.avatar { width: 40px !important; height: 40px !important; }
/* 回复正文区：对 td 内 .reply_content 加边框卡片 */
.cell[id^="r_"] .reply_content {
  border: 1px solid var(--gh-border) !important;
  border-radius: var(--gh-radius) !important;
}
```

### 5.5 操作栏 `.topic_buttons`

- `a` 链接改为 `.normal.button` 视觉（已有 button 样式可复用）
- 分隔符 `&nbsp;` 用 `gap` 替代（父级 flex）

### 5.6 回复框

- `#reply-box` textarea 已有 form 样式
- 「回复」submit 按钮应用 `.super.button`

---

## 6. Phase 3 — 节点页

### 6.1 节点头部

- 定位 `#Main .box .header` 或首 cell
- 标题 + 描述 + 「创建新主题」按钮：按钮已有 `.super`，头部背景 `--gh-canvas-subtle`

### 6.2 分页

```css
.page_normal a,
.page_current {
  display: inline-flex !important;
  min-width: 32px !important;
  height: 32px !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid var(--gh-border) !important;
  border-radius: var(--gh-radius) !important;
}
.page_current {
  background: var(--gh-accent) !important;
  color: #fff !important;
  border-color: var(--gh-accent) !important;
}
```

### 6.3 RSS / 订阅链接

- 字号 12px、`--gh-text-secondary`
- 图标链接去下划线

---

## 7. Phase 4 — 登录页

### 7.1 问题

现有选择器 `body.signin`、`#Wrapper.signin` **不匹配**真实 DOM。

### 7.2 布局方案

使用 URL 无关的结构性选择器：

```css
/* 检测：Main 内含登录表单 + 页面标题含「登录」*/
/* 实用方案：直接针对 /signin 常见结构 */

#Wrapper > .content:has(#Main form input[type="password"]) {
  flex-direction: column !important;
  align-items: center !important;
  background: var(--gh-canvas-subtle) !important;
  min-height: calc(100vh - 54px) !important;
  padding: 48px 16px !important;
}

/* 登录页隐藏 Rightbar 或移到表单下方 */
#Wrapper > .content:has(#Main form input[type="password"]) #Rightbar {
  order: 2 !important;
  width: 100% !important;
  max-width: 340px !important;
}

#Wrapper > .content:has(#Main form input[type="password"]) #Main {
  order: 1 !important;
  width: 100% !important;
  max-width: 340px !important;
}
```

> `:has()` 在现代浏览器可用；V2EX 用户群体可接受。

### 7.3 表单样式

```css
#Main .box:has(input[type="password"]) {
  width: 100% !important;
  max-width: 340px !important;
}
#Main .box .header {
  /* 「V2EX › 登录」条 */
  background: var(--gh-canvas-subtle) !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  padding: 12px 16px !important;
}
/* label 堆叠：table 布局改为 block */
#Main .cell table { display: block !important; }
#Main .cell table tr { display: block !important; margin-bottom: 16px !important; }
#Main .cell table td { display: block !important; width: 100% !important; }
```

### 7.4 OAuth 侧栏

```css
.sign_in_with {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 10px 16px !important;
  border: 1px solid var(--gh-border) !important;
  border-radius: var(--gh-radius) !important;
  margin-bottom: 8px !important;
  cursor: pointer !important;
}
.sign_in_with:hover {
  background: var(--gh-canvas-subtle) !important;
}
```

---

## 8. Phase 5 — 夜间模式

在现有 `#Wrapper.Night` 变量块基础上补充：

| 组件 | 需补充 |
|------|--------|
| `#Tabs a.tab_current` | `background: transparent`（同 Phase 0） |
| `.box` | 确认 border 色用 `--gh-border` |
| `.cell.item:hover` | `--gh-canvas-subtle` 已暗色化 |
| `.reply_content` 边框 | `--gh-border` |
| `#search-container` | 搜索框暗色背景 `--gh-canvas-inset` |
| `input/textarea` | 背景 `--gh-canvas-inset` |
| `.sign_in_with` | 暗色边框/悬停 |
| 侧栏广告 | 降低饱和度 |

验收：在 V2EX 设置开启 Night 后逐页截图对比。

---

## 9. CSS 文件组织

建议在 `v2ex-github-theme.css` 中插入新 Section：

```
1. CSS Variables
2. Global Reset
2.5 V2EX Overrides (NEW — combo.css 对抗)
3. Top Navigation
...
19. Sign In Layout (NEW — 替换原 16 节不匹配部分)
20. Font Awesome Suppress (NEW)
```

原 Section 16 保留但改为「增强」而非唯一依赖。

---

## 10. 验收清单

| 页面 | 检查项 |
|------|--------|
| `/` 首页 | 无空栏留白；Tab 无深色块；灰底白卡片；SecondaryTabs pill |
| `/go/programmer` | 节点头；分页；列表；RSS 区 |
| `/t/{id}` | 标题区；投票；标签；回复卡片；操作栏 |
| `/signin` | 居中单列；表单堆叠；OAuth 按钮；灰底 |
| `/settings` | 表单控件 focus 环 |
| `/member/{user}` | 头像、统计 |
| Night 模式 | 以上全部再测一遍 |

---

## 11. 实施顺序与工作量估计

| Phase | 内容 | 预估行数 | 优先级 |
|-------|------|----------|--------|
| 0 | 基础层 + 覆盖层 + Leftbar | ~80 行 | P0 |
| 1 | 首页/列表/侧栏 | ~120 行 | P0 |
| 2 | 主题详情 + 回复 | ~150 行 | P1 |
| 3 | 节点页 + 分页 | ~60 行 | P1 |
| 4 | 登录页 | ~80 行 | P1 |
| 5 | 夜间模式补全 | ~60 行 | P2 |

**总计约 550 行新增/修改**，单文件仍可维护。

---

## 12. 风险与限制

1. **`:has()` 兼容性**：Chrome/Firefox/Safari 近年版本支持；若需兼容极旧浏览器，可改用登录页 URL 特征 class（但 V2EX 不注入 class，`:has()` 是最佳纯 CSS 方案）
2. **combo.css 更新**：V2EX 官方样式变更可能引入新冲突，覆盖层需持续维护
3. **Font Awesome 隐藏**：需逐页测试，避免误隐藏必要图标
4. **无法 CSS 实现**：顶栏导航项结构（V2EX 固定）、侧栏广告内容

---

## 13. 下一步

设计确认后，按 Phase 0 → 5 顺序修改 `v2ex-github-theme.css`，每完成一个 Phase 在浏览器对应页面验收。
