# V2EX GitHub Theme

高仿 GitHub 视觉风格的 V2EX 自定义样式。

## 使用方式

打开 [V2EX 设置页面](https://www.v2ex.com/settings)，在「自定义 CSS」输入框中粘贴以下内容：

```css
@import "https://cdn.jsdelivr.net/gh/lzxz1234/v2ex-github-theme/v2ex-github-theme.min.css";
```

保存即可生效。

## 特性

- **高仿 GitHub 布局**：深色顶部通栏 + 三栏内容区（左侧导航 / 中间主题 / 右侧功能区）
- **GitHub Octicons 图标**：议题、评论、搜索等均采用 GitHub 原生 SVG 图标
- **右侧栏极简风格**：去除卡片边框，使用横线分割，还原 GitHub 侧边栏视觉
- **GitHub 配色方案**：Light / Dark 双主题，完整覆盖 GitHub 设计令牌
- **纯 CSS 实现**：无需任何脚本或浏览器扩展，通过 CSS 变量统一管理

## CDN 地址

| 通道 | CDN 地址 | 说明 |
|------|---------|------|
| 压缩版（推荐） | `https://cdn.jsdelivr.net/gh/lzxz1234/v2ex-github-theme@main/v2ex-github-theme.min.css` | 体积更小，加载更快 |
| 标准版（兼容） | `https://cdn.jsdelivr.net/gh/lzxz1234/v2ex-github-theme@main/v2ex-github-theme.css` | 可读格式，便于调试 |
| 锁定版本 | `https://cdn.jsdelivr.net/gh/lzxz1234/v2ex-github-theme@0.0.1/v2ex-github-theme.min.css` | 避免自动更新带来的样式变化 |

将 `@main` 替换为具体 tag（如 `@0.0.1`）可锁定版本。

## 开发

源码按模块拆放在 `src/` 目录，使用 PostCSS 构建：

```bash
npm install
npm run build      # 生成 v2ex-github-theme.css + v2ex-github-theme.min.css
npm run watch      # 监听 src/ 变更并重新构建标准版
```

**约定：**

- 只编辑 `src/` 下的文件，根目录的 `.css` 产物由构建生成
- 提交时请一并提交构建产物（jsDelivr 直接读取仓库文件，不跑 CI 构建）

### 目录结构

```
src/
├── index.css              # 入口
├── tokens/                # CSS 变量（亮色）
├── base/                  # 全局重置、V2EX 覆盖
├── layout/                # 三栏布局
├── components/            # 各页面组件样式
└── themes/                # 暗色模式
```

## 许可证

[MIT](LICENSE)
