# 关于本书

本书用简体中文解说 Cursor 插件 pstack。它说明每个技能做什么、在什么情况下用、步骤如何衔接。它不是官方文档，也不能代替英文原文。

## 基准版本

| 项目 | 值 |
| --- | --- |
| 插件 | pstack |
| 插件版本 | {{version}} |
| 本书版本 | {{bookVersion}} |
| 固定提交 | `adf3218ca2f5b9971eedc07a76bef22df7701539` |
| 原文 | https://github.com/cursor/plugins/tree/adf3218ca2f5b9971eedc07a76bef22df7701539/pstack |
| 版权 | MIT，Copyright (c) 2026 Lauren Tan |
| 结构参考 | Jay Park，[pstack-guide-ko](https://github.com/jayjongcheolpark/pstack-guide-ko) |

插件版本写在 `pstack/.cursor-plugin/plugin.json` 的 `version` 字段，这一固定提交上的值是 0.15.5。本书版本在它后面加上 `-zh.N`。当前是 {{bookVersion}}。

## 非官方解说

本书在 AI 协助下写成，并对照固定提交的英文原文，但仍可能有错误。英文原文是权威来源。本书与原文不一致时，以原文为准。

原作者 Lauren Tan（X: @poteto）在 2026-09-28 回复 Jay Park，表示可以免费分发那份韩文指南。[请求](https://x.com/jayparkcanada/status/2104664228561141848)与[回复](https://x.com/poteto/status/2104671461827055941)都在 X 上。该许可针对的是韩文指南。本书另行写成，引用这次公开回复，说明作者愿意让非官方指南免费流传。Lauren Tan 没有审阅本书。Lauren Tan 与 Cursor 不背书本书，也不保证它的正确性。

> **解说（本书的解释，原文中没有）**
>
> 把一次针对韩文指南的分发许可，理解为作者不反对免费的非官方解说继续存在。这不是 Cursor 的产品授权，也不是对本书句子的审定。

## 范围

本书覆盖固定提交里 `pstack/` 的这些部分：

- `skills/` 下 47 个技能：24 个一般技能，23 个 `principle-*` 原则技能。
- `poteto-mode` 的 23 个剧本，以及该技能引用的 references 与 scripts。
- 两个代理：`poteto-agent` 与 `Comment Sicko`。
- 自动化包 `benny`，以及技能 `make-bot-ui`。
- `docs/guide`、插件 README 和 `.cursor-plugin/plugin.json`。

同一上游仓库中的 `cursor-team-kit` 是另一个插件。pstack 调用其中的 `deslop`、`control-cli`、`control-ui` 等时，本书只标明归属，不把那些技能写成章节。

## 许可证

原作 pstack 为 MIT，Copyright (c) 2026 Lauren Tan。构建工具改编自 Jay Park 的 MIT 许可韩文指南，Copyright (c) 2026 Jay Park。本简体中文解说为 MIT，Copyright (c) 2026 Chaochun。许可证全文见附录 D，也见仓库的 `LICENSE` 与 `NOTICE.md`。

六幅插图来自原文 `docs/guide/images/`，宽度缩到 1000 像素，版权仍属于原作。

## 仓库与勘误

写作规则在 `STYLE.md`。原文固定方式在 `SOURCE.md`。进度在 `PROGRESS.md`。发现错误时，请注明章、节，并附上固定提交的原文 permalink。
