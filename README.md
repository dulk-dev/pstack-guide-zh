# pstack 指南（简体中文解说）

这是 Lauren Tan 的 Cursor 插件 [pstack](https://github.com/cursor/plugins/tree/main/pstack) 的简体中文技术解说。内容依据 pstack 0.15.5（提交 `adf3218ca2f5b9971eedc07a76bef22df7701539`）。

> **这是非官方解说。** 本书在 AI 协助下写成，并与固定提交的英文原文对照，但仍可能有错误。英文原文始终是权威来源。本书与原文不一致时，以原文为准。原作者 Lauren Tan（X: @poteto）于 2026-09-28 回复称，可以免费分发那份韩文指南（[X 回复](https://x.com/poteto/status/2104671461827055941)，所回复的请求是 [这条帖子](https://x.com/jayparkcanada/status/2104664228561141848)）。原作者没有审阅本书，Lauren Tan 与 Cursor 均不背书、也不保证本书。

章节布局、示例/解说标签、NOTICE 与 SOURCE 的写法，以及 Bun 构建流程，参考 Jay Park 的非官方韩文指南 [pstack-guide-ko](https://github.com/jayjongcheolpark/pstack-guide-ko)（MIT）。韩文措辞不是英文原文。两边不一致时，以固定的英文提交为准。本书是按英文原文重写的简体中文解说，不是韩文的翻译。

## 版本

基准是 pstack 0.15.5（提交 `adf3218ca2f5b9971eedc07a76bef22df7701539`）。本书当前版本是 `0.15.5-zh.1`。pstack 版本不变、只修订本书时，版本后缀变为 `0.15.5-zh.2` 这样的形式。

本书作者自拟的例子不在原文里，引用块首行标明“示例（本书作者所写，原文中没有）”。原文没有写出的解释标明“解说（本书的解释，原文中没有）”。

## 文件

构建成功后，`dist/` 里会有：

- `pstack-guide-0.15.5-zh.1.epub`：电子书阅读器
- `pstack-guide-0.15.5-zh.1.pdf`：152 mm × 225 mm，供打印和屏幕阅读

若当前环境没有 Chrome，可以只构建 EPUB：`bun tools/build.mjs epub`。稿件 Markdown 在 `manuscript/`，不依赖构建也能阅读。

## 目录

- 关于本书
- 怎样读这本书
- 第 1 部 开始
  - 第 1 章 pstack 是什么
  - 第 2 章 安装与第一次使用
- 第 2 部 入口
  - 第 3 章 poteto-mode
  - 第 4 章 工作剧本
  - 第 5 章 PR 剧本
  - 第 6 章 长时间与大规模剧本
- 第 3 部 理解
  - 第 7 章 how：代码如何运作
  - 第 8 章 why：为什么是这个形状
  - 第 9 章 teach 与 recall：讲清楚与恢复上下文
- 第 4 部 设计
  - 第 10 章 architect：写代码之前先定形状
  - 第 11 章 arena、swarm 与 figure-it-out
  - 第 12 章 23 个原则技能
- 第 5 部 修复与验证
  - 第 13 章 tdd 与 blast-radius
  - 第 14 章 interrogate：多个模型尝试拆掉 diff
  - 第 15 章 验证技能
- 第 6 部 文字与代码整理
  - 第 16 章 写作：unslop 与 technical-writing
  - 第 17 章 代码整理：no-comments 与 typescript-best-practices
- 第 7 部 自己的方式与实用技能
  - 第 18 章 automate-me、reflect 与 show-me-your-work
  - 第 19 章 bro：用平实的话再听一遍
- 第 8 部 自动化
  - 第 20 章 make-bot-ui 与 benny 自动化包
- 第 9 部 实战
  - 第 21 章 过夜运行
  - 第 22 章 配方与陷阱
- 附录 A 技能速查表
- 附录 B 术语表
- 附录 C 技能选择流程
- 附录 D 署名与许可证

## 范围

- 技能 47 个（一般技能 24 个，`principle-*` 原则技能 23 个）
- `poteto-mode` 的剧本 23 个，以及相关 references 与 scripts
- 代理 2 个（`poteto-agent`、`Comment Sicko`）
- 自动化包 `benny` 与 `make-bot-ui`
- 原文使用说明（`docs/guide`）、README 和插件清单

同一仓库里的独立插件 `cursor-team-kit` 不展开。pstack 调用它的地方会标明出处。每个技能节标题下有固定提交的原文链接。

## 怎样构建

需要 [Bun](https://bun.sh)。PDF 和封面截图还需要 Google Chrome（可用 `CHROME_PATH` 指定可执行文件）。依赖都装在仓库里，不必全局安装。

先在仓库外克隆原文，供检查使用：

```shell
git clone https://github.com/cursor/plugins.git ../cursor-plugins
git -C ../cursor-plugins checkout adf3218ca2f5b9971eedc07a76bef22df7701539
```

然后：

```shell
bun install
bun tools/build.mjs
PSTACK_SRC=../cursor-plugins/pstack bun tools/check.mjs
bun tools/check-layout.mjs
```

`bun tools/build.mjs epub` 只产 EPUB。`bun tools/build.mjs pdf` 只产 PDF。

## 仓库

`gh` 命令行未登录，本环境也不能用 Git 凭据推送到 GitHub。私有仓库在 [dulk-dev/pstack-guide-zh](https://github.com/dulk-dev/pstack-guide-zh)。稿件、`tools/` 和样式表的 blob 已经与 Origin `main` 上的对应文件一致，包括 `manuscript/22-ch-playbooks-work.md`（75606 字节）、`manuscript/23-ch-playbooks-pr.md`（47595 字节）和 `manuscript/24-ch-playbooks-long.md`（94019 字节）。GitHub 上没有 `dist/`，也没有 `manuscript/images/`。那边的提交是 API 逐文件写入的，不是 Origin 的同一串提交。要让 GitHub `main` 的历史和二进制文件与 Origin 相同，在已登录 `gh` 的机器上执行 `git remote add github https://github.com/dulk-dev/pstack-guide-zh.git`，然后 `git push -u github main --force`。

署名与插图来源见 [NOTICE.md](NOTICE.md)、[SOURCE.md](SOURCE.md) 和 [manuscript/94-app-attribution.md](manuscript/94-app-attribution.md)。

六张插图在 `manuscript/images/`，来自固定提交的 `pstack/docs/guide/images/`。若某一副本缺少这些二进制文件或 `dist/`，把那六张图复制到 `manuscript/images/` 后执行下面的构建即可重新得到 EPUB 和 PDF。

## 许可证

MIT。原作 pstack 为 Copyright (c) 2026 Lauren Tan。构建工具改编自 Copyright (c) 2026 Jay Park 的韩文指南。本简体中文解说为 Copyright (c) 2026 Chaochun。全文见 [LICENSE](LICENSE)。六幅插图来自 pstack 的 `docs/guide/images/`。

---

# pstack Guide (Simplified Chinese)

An unofficial Simplified Chinese explanation of [pstack](https://github.com/cursor/plugins/tree/main/pstack), Lauren Tan's Cursor plugin (0.15.5, commit `adf3218ca2f5b9971eedc07a76bef22df7701539`). It covers all 47 skills, the 23 `poteto-mode` playbooks, both agents, the `benny` automation pack, and the guide docs. Each skill section links to the pinned English source.

The current book version is `0.15.5-zh.1`. Build outputs are `pstack-guide-0.15.5-zh.1.epub` and `pstack-guide-0.15.5-zh.1.pdf`.

Chapter layout, the example/commentary labels, and the Bun EPUB+PDF pipeline follow Jay Park's unofficial Korean guide (MIT). This book is rewritten from the pinned English commit. It is not a translation of the Korean prose.

**Unofficial, written with AI assistance, and it may contain errors. The English original is authoritative.** Lauren Tan and Cursor do not endorse it. On 2026-09-28 Lauren Tan allowed the Korean guide to be distributed for free ([reply](https://x.com/poteto/status/2104671461827055941)).

Build: `bun install`, then `bun tools/build.mjs` (Bun, and Chrome for PDF). See `STYLE.md`, `SOURCE.md`, `NOTICE.md`, and `PROGRESS.md`.

License: MIT. Copyright (c) 2026 Lauren Tan (original pstack), Copyright (c) 2026 Jay Park (build tooling), Copyright (c) 2026 Chaochun (this explanation).
