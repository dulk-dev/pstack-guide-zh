# 署名与许可证

## 本书的性质

本书是 pstack 的非官方简体中文解说，在 AI 协助下写成，可能有错误。英文原文是权威来源。Lauren Tan 与 Cursor 不背书本书，也不保证它。

章节布局、示例与解说的标签、NOTICE 与 SOURCE 的文件角色，以及 EPUB 和 PDF 的构建程序，参考 Jay Park 的非官方韩文指南。本书正文是对照固定英文提交重写的，不是那份韩文的译文。

## 本书的版权与许可证

本简体中文解说 Copyright (c) 2026 Chaochun，采用 MIT 许可证。构建工具改编自 Jay Park 的程序，该部分 Copyright (c) 2026 Jay Park，同样为 MIT。仓库根目录的 `LICENSE` 同时保留这几行版权声明。

## 原作

| 项目 | 值 |
| --- | --- |
| 名称 | pstack |
| 作者 | Lauren Tan |
| 版权 | Copyright (c) 2026 Lauren Tan |
| 许可证 | MIT |
| 版本 | 0.15.5 |
| 固定提交 | `adf3218ca2f5b9971eedc07a76bef22df7701539` |
| 位置 | https://github.com/cursor/plugins/tree/adf3218ca2f5b9971eedc07a76bef22df7701539/pstack |

2026-09-28，Lauren Tan 在 X 上回复，允许免费分发韩文指南：[回复](https://x.com/poteto/status/2104671461827055941)，所回复的请求是 [https://x.com/jayparkcanada/status/2104664228561141848](https://x.com/jayparkcanada/status/2104664228561141848)。原作者没有审阅本书。

结构参考：

| 项目 | 值 |
| --- | --- |
| 名称 | pstack 指南（韩文解说） |
| 作者 | Jay Park |
| 版权 | Copyright (c) 2026 Jay Park |
| 许可证 | MIT |
| 仓库 | https://github.com/jayjongcheolpark/pstack-guide-ko |

## MIT 许可证全文

下面是原作 `pstack/LICENSE` 的全文。本仓库的 `LICENSE` 在保留这段许可的同时，增加了 Jay Park 与 Chaochun 的版权行。

```text
MIT License

Copyright (c) 2026 Lauren Tan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 本书引用或改写的内容

- 技能、剧本、代理、自动化和 `docs/guide` 的步骤、表格和提示例。每个技能节用原稿里的 src 宏指向固定提交。
- `manuscript/images/` 的六幅图，来自 `docs/guide/images/`，宽度 1000 像素。
- 流程图语法和 EPUB、PDF 管线，改编自韩文指南的 `tools/`。

## 只提及、不展开的内容

`cursor-team-kit` 的 `deslop`、`fix-ci`、`fix-merge-conflicts`、`get-pr-comments`、`make-pr-easy-to-review`、`thermo-nuclear-code-quality-review`、`what-did-i-get-done`、`control-cli`、`control-ui`。Cursor 内建的 `/create-skill` 和内建 babysit 也只在 pstack 区分它们的地方提到。

## 构建用字体

PDF 使用 npm 包中的 Noto Serif SC、Noto Sans SC 和 JetBrains Mono，许可证为 SIL Open Font License。EPUB 不嵌入字体。
