# 进度

中断后续写时先看这个文件。原文见 `SOURCE.md`，文体和节结构见 `STYLE.md`，术语见 `manuscript/92-app-glossary.md`。

## 原文

只使用 `cursor/plugins` 的 `pstack/`，提交 `adf3218ca2f5b9971eedc07a76bef22df7701539`（0.15.5）。不用其他版本或移植。韩文指南只作结构、体例和构建参考。

## 构建与检查

```shell
bun install
bun tools/build.mjs
PSTACK_SRC=<克隆路径>/pstack bun tools/check.mjs
bun tools/check-layout.mjs
```

## 起始说明

2026-09-29：按韩文指南的目录写成简体中文稿件，内容依据上述固定提交的英文原文重写。版本定为 `0.15.5-zh.1`。

同日机械检查通过：`PSTACK_SRC` 指向该提交时，47 个技能与 23 个剧本都有锚点；epubcheck 无错误无警告；390px 无横向溢出；PDF 407 页，抽文本无 Hangul、无 U+2014、无替换字符。正文由 AI 对照英文写成，未经人工逐句审校，仍可能有错误。

## 章列表

状态：todo、drafted（初稿）、checked（已通过上述机械检查。不表示人工逐句审校完成）。

| 文件 | 内容 | 状态 |
| --- | --- | --- |
| 01-front-colophon | 关于本书、基准版本 | checked |
| 02-front-howto | 怎样读这本书 | checked |
| 10-part-start | 第 1 部 开始 | checked |
| 11-ch-what-is-pstack | pstack 是什么 | checked |
| 12-ch-setup | 安装与第一次使用 | checked |
| 20-part-entry | 第 2 部 入口 | checked |
| 21-ch-poteto-mode | poteto-mode 与 poteto-agent | checked |
| 22-ch-playbooks-work | 工作剧本 12 个 | checked |
| 23-ch-playbooks-pr | PR 剧本 | checked |
| 24-ch-playbooks-long | 长时间与大规模剧本 8 个 | checked |
| 30-part-understand | 第 3 部 理解 | checked |
| 31-ch-how | how | checked |
| 32-ch-why | why | checked |
| 33-ch-teach-recall | teach、recall | checked |
| 40-part-design | 第 4 部 设计 | checked |
| 41-ch-architect | architect | checked |
| 42-ch-arena-swarm | arena、swarm、figure-it-out | checked |
| 43-ch-principles | principle-* 23 个 | checked |
| 50-part-fix | 第 5 部 修复与验证 | checked |
| 51-ch-tdd-blast | tdd、blast-radius | checked |
| 52-ch-interrogate | interrogate | checked |
| 53-ch-verification | create-verification-skill、maintain-verification-skill | checked |
| 60-part-clean | 第 6 部 文字与代码整理 | checked |
| 61-ch-writing | unslop、technical-writing | checked |
| 62-ch-code-hygiene | no-comments、typescript-best-practices、Comment Sicko | checked |
| 70-part-yours | 第 7 部 自己的方式与实用技能 | checked |
| 71-ch-personal | automate-me、reflect、show-me-your-work | checked |
| 72-ch-utility | bro | checked |
| 80-part-automation | 第 8 部 自动化 | checked |
| 81-ch-benny | make-bot-ui、automations/benny | checked |
| 85-part-practice | 第 9 部 实战 | checked |
| 86-ch-overnight | 过夜运行 | checked |
| 87-ch-recipes | 配方与陷阱 | checked |
| 91-app-quickref | 附录 A 技能速查表 | checked |
| 92-app-glossary | 附录 B 术语表 | checked |
| 93-app-decision-flow | 附录 C 技能选择流程 | checked |
| 94-app-attribution | 附录 D 署名与许可证 | checked |

## 结构安排

- 原文 `docs/guide` 是 10 页使用说明。本书按主题把技能分到各部，同时把指南的顺序放进对应的部。
- `poteto-mode` 单独作为“入口”部。
- `setup-pstack` 放在安装一章。
- `principle-*` 收成设计部里的一章。
- 验证技能放在修复与验证部的最后一章。
- `cursor-team-kit` 不成章。
- `automations/benny` 不是斜杠技能，单独作为自动化部。

## 解释过的地方

- `poteto-mode` 前置信息里的 `mode: true`、`disable-model-invocation: true` 和 `reminder`，技能正文没有逐项定义。若把 `disable-model-invocation` 说成“模型不会自动调用”，正文用解说标签标出。
- README 称 Comment Sicko 为 read-only comment reviewer，而 `agents/comment-sicko.md` 写它会处理注释。代码整理一章以定义文件为准，并用解说标签记下 README 的说法。
- README 与 `setup-pstack` 对再次运行时保留哪些角色的说法不完全一样。安装一章按 `SKILL.md` 写步骤，并指出差异。
- README 写明 `benny` 默认休眠，且不注册为斜杠技能。自动化一章按此处理。
- `cursor-team-kit` 不成章。`poteto-mode` 和剧本调用 `deslop`、`control-cli`、`control-ui` 的地方标明它是另一个插件。Cursor 内建的 `/create-skill` 和内建 babysit 也只在区分它们的地方提到。
- 流程图里停止节点的标签用中文“停止”，不用构建工具原先的韩文标签。
