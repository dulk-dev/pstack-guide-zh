# bro：用平实的话再听一遍

`/bro` 只做一件事：把上一则回复再说一遍，去掉行话，说得更短、更连贯，像一个人在跟另一个人说话。

## bro {#skill-bro}

原文：{{src:skills/bro/SKILL.md}}

> 用平实的话重述上一则消息，不带行话。

### 何时使用

description 写明：把上一则消息重述成平常人的语言，不要行话。`name` 是 `bro`。前置信息有 `disable-model-invocation: true`。正文没有定义这项。同一字段在 [poteto-mode](poteto-mode.md#skill-poteto-mode) 里有本书的解说。

原文指南 `docs/guide/10-recipes-and-pitfalls.md` 把它放在 “Get the reply in plain words”。回复在技术上已经很全，你仍然不知道它说了什么的时候用它。

### 运作方式

技能正文只有一句指示，没有分步，没有参考文件，也没有脚本。重述你的上一则消息。停止使用行话，把话说连贯。说得更简单、更简短，像一个人在跟另一个人说话。

### 使用例

下面来自原文指南。指南写明，这就是整句提示。

```text
/bro
```

原文 README 的技能表用同一句话说明何时使用：你希望上一则消息被重述成平实的人话，不要行话。README 的 examples 清单没有单独再给一条 `/bro`。

### 陷阱与注意

它重述的是上一则消息，不是一项新任务。正文没有要求改代码、改技能或打开 PR。行话去掉之后，句子仍然要连贯，不能只剩一串更短的术语。

### 相关技能

正文没有点名其他技能。指南把它和一句就能拧回运行的提示放在同一页，见 [配方与陷阱](recipes.md)。清理生成腔的是 [unslop](writing.md#skill-unslop)，那是另一份技能，`/bro` 的正文没有调用它。
