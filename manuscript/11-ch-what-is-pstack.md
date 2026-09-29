# pstack 是什么

原文：{{src:README.md}} {{src:.cursor-plugin/plugin.json}} {{src:docs/guide/README.md}}

## 一段话

pstack 是 poteto 放进 Cursor 的一套工程工作流。作者把每天交付代码时实际在用的做法写成技能(skill)，在对话里用斜杠命令调用。主张可以收成几句。要快，先要深。少写代码，但质量更高。一个代理能把事情做深，并且你信任它写出可核验的代码之后，就可以同时开多个，作者把这叫做 `fearless parallelism`。你可以使用任何模型。许多技能把多个模型接在同一次工作里，用上每个模型自己的长处。作者也把这套东西交出去：fork it, make it yours。

## 为什么写它

作者自述：不是总裁，也不是首席执行官。作者在 Meta、Netflix 和 Cursor 处理过数百万行代码，并在 React 核心团队参与构建和维护 React Compiler。

作者同意一种越来越常见的判断：人工智能写出了太多 slop 代码。作者不想以一支二十人的 slop 团队的方式交付。没有质量的吞吐量不是作者要的目标。pstack 是作者给出的回答。这些技能就是作者每天在 Cursor 用来交付高质量代码的那一套。作者要用它把 Cursor 变成一支真正的工程团队。

## 它由什么组成

README 的技能表有 24 行，原则另有 23 个短技能，一共 47 个技能。除此之外，插件还带着这些部分。

- 23 个剧本，都在 `/poteto-mode` 里。模式按任务选一个，待办列表的开头是原样抄入的步骤。
- 2 个代理：`poteto-agent` 和 `Comment Sicko`。
- 一份默认休眠的 `benny` 自动化。它的文件不注册为斜杠技能。
- 使用指南 `docs/guide`。

> **解说（本书的解释，原文中没有）**
>
> README 没有把前 24 个技能叫做“一般技能”。这个叫法用来把技能表里的 24 行和后面 23 个原则技能分开。47 是这两张表的行数之和。

插件清单 `.cursor-plugin/plugin.json` 把 `version` 写成 `0.15.5`，`license` 写成 MIT，`author.name` 写成 Lauren Tan。`description` 复述同一主张：要快，先要深；帮助你少写代码，但质量更高；这些是可以有信心并行的严格代理工作流。

`/poteto-mode` 会在步骤需要时替你运行其中大部分技能。README 点名的有 `how`、`why`、`architect`、`arena`、`swarm`、`interrogate`、`unslop`、`no-comments`、`technical-writing`、`tdd`，以及那些原则。你也可以直接点名某一个。23 个原则技能各写一条原则。模式在任务开始时读内嵌索引。单独的文件留给其他技能按名字引用，索引也可以指向每条的完整规则。README 把它们分成五组：`core`、`architecture`、`verification`、`delegation`、`meta`。

父代理用 `subagent_type: "poteto-agent"` 派出 `poteto-agent`。它在做任何工作之前，会读完 `poteto-mode`，包括内嵌的原则索引。换成 `generalPurpose` 会跳过这次阅读，然后风格就会漂。`/poteto-mode` 和 `subagent_type: "poteto-agent"` 走同一层包装。`Comment Sicko` 在 README 里是只读的注释审阅者，`subagent_type` 写成 `"Comment Sicko"`。通常经 `/no-comments` 调用，而不是直接派它。`poteto-agent` 与模式写在一起，见 [poteto-mode](poteto-mode.md#skill-poteto-mode)。

`benny` 分拣 Slack 上的问题报告，再用真实界面上的证据复现并修复已确认的缺陷。要启用，把 Cursor 指向 `automations/benny/FOR_AGENTS.md`。安装会把包复制到目标仓库的 `.cursor/automations/benny/`，在那里启用 pstack 以共用技能，并把用户自己的配置留在复制出来的包之外。本书把它放在 [benny](benny.md)。

`docs/guide` 第一次按页读，之后每一页可以单独看。它从安装和 `/poteto-mode` 写起，经过理解、设计、构建与清理、验证与交付、过夜、原则和做成自己的方式，直到配方和陷阱。

## 怎样使用

在 Cursor 对话里用 `/add-plugin pstack` 安装。安装之后，README 只要求两步。先运行 `/setup-pstack`，选定推理预算，并选出你要用的模型。再在任何需要严格性的事情上使用 `/poteto-mode`。其余技能按情境出现，模式会在需要时调用它们。安装之后的对话、模型问题和第一次任务见[安装与第一次使用](setup.md#skill-setup-pstack)。模式本身见 [poteto-mode](poteto-mode.md#skill-poteto-mode)。

开箱的默认面板是 `opus 5.5` / `sol` / `grok`。模式按模型的长处拆开工作。代码委托，也就是 feature、refactoring、bug fix、perf、hillclimb，默认走 `grok`。最难的改动、文字和判断默认走 `opus 5.5`。`/setup-pstack` 可以改其中任何一项。每个技能都会读那条模型规则。规则不存在时，技能退回自己的默认，所以你只覆盖想改的角色。

任务开头使用 `/poteto-mode`。它阅读请求，从剧本里挑一个，并按步骤调用其他技能。被调用时它做三件事。第一，把任务匹配到一个剧本，并打开待办列表，列表开头是原样抄进去的剧本步骤。第二，步骤触发时路由到其他技能。第三，写出去掉 slop 的回复，同时写给使用者和维护者看。

它也是 README 所说的 sticky mode。一旦进入，就跨回合保持。剧本对上了，或者任务需要严格性，它就继续适用。其余时候不插手。你随时可以说一句来退出。它和 Cursor 的 `/loop` 一起用时效果很好，可以连续工作很多小时，同时把严格性留住。

下面是原文 README 的例子。

```text
/poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even when idle. repro
first, then fix and verify.
```

下面是原文指南的例子。指南说，你不必点名剧本，也不必列出技能。`repro first` 加上一个可以核验的结果，就是 `/poteto-mode` 需要的路由信号。对这条提示，它会匹配 Bug fix 剧本，把步骤抄进待办列表，并在每一步调用对应的技能。

```text
/poteto-mode the export writes duplicate rows when a retry lands mid-run. repro first, then fix and verify.
```

## 设计想法

`/poteto-mode` 是作者自己的风格，你未必想要完全一样。输入 `/automate-me`，它挖掘你最近的对话记录，按你实际怎么工作，起草一个 `<your-name>-mode` 技能，底下仍然穿过 pstack 来路由。你保留 pstack 作为底座，并在 `poteto-mode` 旁边得到自己的路由技能。欢迎提交 PR。

模型也可以改。`/setup-pstack` 检测你能用的模型，并写一条始终生效的小规则，把代码、判断和审阅面板映射到模型。指南要求的用法是：用你自己的话说出要什么，以及你怎样知道它做完了。

## 为什么没有计划技能

Cursor 已经有 plan mode，而且它和 pstack 一起用时效果很好。作者个人不相信计划。最好的规格是代码。如果你确实要做一份计划，`/poteto-mode` 能覆盖，但那不是默认。

## pstack 里没有的东西

`poteto-mode` 会提到一些自己没有附带的东西。

- `/deslop` 和 `deslop` 在独立插件 `cursor-team-kit` 里。
- `control-cli` 面向命令行和 TUI，`control-ui` 面向浏览器、Electron 和网页。二者也在 `cursor-team-kit` 里。
- `/create-skill` 是 Cursor 内建命令。Cursor 另有内建的 `/babysit`。在 `poteto-mode` 里面，遇到 PR 状态请求时，由 babysit 剧本取代这个内建命令。

要凑齐这些引用，就和 pstack 一起安装 `cursor-team-kit`。

## 技能地图

本章不把每个技能展开成一节。下表按后面的阅读入口分组。拿不准点哪一个时，看[技能选择流程](decision-flow.md)。全部名字见[技能速查表](quickref.md)。

| 分组 | 里面有什么 | 接着读 |
| --- | --- | --- |
| 配置 | `/setup-pstack` | [安装与第一次使用](setup.md#skill-setup-pstack) |
| 入口 | `/poteto-mode` | [poteto-mode](poteto-mode.md#skill-poteto-mode) |
| 剧本 | 23 个，工作向的从这里读起 | [剧本](playbooks-work.md) |
| 原则 | 23 个短技能，五组见上文 | [原则](principles.md) |
| 自动化 | `benny`，不注册为斜杠技能 | [benny](benny.md) |
| 过夜 | 长时间运行，可与 `/loop` 同用 | [过夜运行](overnight.md) |

和 PR 有关的剧本有 babysit、shipping、opening a pr。长时间或大规模的有 autonomous run、orchestrate、autopilot-full、autopilot-stack，以及 session pickup、pause safely、multi-phase plan。

直接点名时，理解用 `/how`、`/why`、`/teach`、`/recall`。越过函数边界之前用 `/architect`。同一件事做多次并行尝试、再取其长处，用 `/arena`。不同切片或竞速用 `/swarm`。让几个模型试图打破一份 diff，用 `/interrogate`。小改动还会碰坏什么，用 `/blast-radius`。没有现成剧本时用 `/figure-it-out`。`/tdd`、`/unslop`、`/technical-writing`、`/no-comments`、`/typescript-best-practices`、`/create-verification-skill`、`/maintain-verification-skill`、`/reflect`、`/show-me-your-work`、`/bro`、`/make-bot-ui` 的触发条件见[技能速查表](quickref.md)。
