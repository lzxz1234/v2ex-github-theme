# V2EX GitHub Theme — PostCSS 构建设计

日期：2026-07-02

## 目标

1. 将 2000+ 行单文件 CSS 拆分为可维护的模块（`src/`）
2. 自动构建标准版与压缩版，根目录双产物向后兼容

## 方案

PostCSS + `postcss-import` + `autoprefixer` + `cssnano`

- 开发：编辑 `src/` 多文件
- 构建：`npm run build` → `v2ex-github-theme.css` + `v2ex-github-theme.min.css`
- 分发：jsDelivr 读取仓库根目录产物，用户 `@import` 不变

## CDN 策略（选项 C）

| 文件 | 用途 |
|------|------|
| `v2ex-github-theme.css` | 向后兼容，可读/debug |
| `v2ex-github-theme.min.css` | 推荐，体积约减 19% |

## 模块拆分

按原文件 18 个注释区块映射到 `tokens/`、`base/`、`layout/`、`components/`、`themes/`。

## 不包含

- JavaScript（V2EX 自定义 CSS 不支持注入脚本）
- SCSS（现有 CSS 变量体系已足够）
