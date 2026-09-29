# 安装与第一次使用

原文：{{src:docs/guide/01-setup.md}} {{src:README.md}} {{src:skills/setup-pstack/SKILL.md}}

这一章做三件事：安装插件，为 pstack 的技能(skill)选定模型和推理预算，然后跑一个小而真实的第一次任务。指南把安装说成一条命令加上一段短对话。

## 安装插件

在 Cursor 的对话里运行安装命令。Cursor 会确认插件已经安装。

下面是原文 README 的例子。安装指南使用同一条命令。

```text
/add-plugin pstack
```

## 选模型

安装之后运行 `/setup-pstack`。步骤全文在 [setup-pstack](#skill-setup-pstack)。

下面是原文指南的例子。

```text
/setup-pstack
```

它检测你有权使用的模型，询问推理预算，展示每个角色，并问你要什么。指南点名的角色是代码委托、判断和审阅面板。你回答这些问题。它写入 `~/.cursor/rules/pstack-models.mdc`。这是一条小规则，每个技能都会读它。

你只覆盖在意的部分。规则里没有某一行时，该角色保持技能自己的默认。要恢复某个默认，删掉那一行。

再次运行时究竟保留哪些角色，技能正文和 README、安装指南的说法不完全一样。步骤按技能正文写，差异见 [陷阱与注意](#setup-pitfalls)。

README 和安装指南都写明：0.15.3 之前写下的规则会钉住旧的默认模型。删掉那些角色行，或者删掉整个文件，再运行 `/setup-pstack`。

若你使用 Auto，把角色设成 `inherit-parent` 或 `auto`。pstack 会省略子代理的 `model` 字段，于是子代理继承父对话的模型。两个值是同一件事，也都不是模型 slug。面板角色的值是一个列表，列表里每一项跑一个子代理，所以列表长度就是面板大小。设置还会配置 `swarm workers`。这是每个 `/swarm` 工作者的默认模型，除非某次竞速为每一支指定了模型。

### 默认模型配置 {#setup-default-models}

技能正文把默认的角色映射写成一份规则文件。角色名与 `poteto-mode` 使用的标签相同。预算行写在角色行上面。示例里的预算是 `unlimited`，目标 effort 是 `max`。删掉某一行，该角色就退回技能自己的默认。`inherit-parent` 或 `auto` 表示这个角色跑在父对话的模型上，并省略 Task 的 `model`。面板列表里的别名条目仍然计入 `fan-out`。

下面是原文 `SKILL.md` 的规则形状。这里只引用这份形状，不贴整份技能。

```text
---
description: pstack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model`). Alias entries in a panel list still count toward its fan-out.
# budget: unlimited (max)
feature, refactoring: grok-4.7-xhigh-fast
bug-fix: grok-4.7-xhigh-fast
perf-issue: grok-4.7-xhigh-fast
hillclimb: grok-4.7-xhigh-fast
judgment and prose: claude-opus-5-5-max
hardest tasks: claude-opus-5-5-max
how explorer: grok-4.7-xhigh-fast
how explainer: claude-opus-5-5-max
why investigators: grok-4.7-xhigh-fast
why synthesizer: claude-opus-5-5-max
reflect tooling: gpt-5.6-sol-max
reflect judgment, divergent, synthesizer: claude-opus-5-5-max
arena runners: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
arena cross-judge pool: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
swarm workers: grok-4.7-xhigh-fast
architect runners: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
interrogate reviewers: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
```

> **解说（本书的解释，原文中没有）**
>
> README 把开箱面板写成 `opus 5.5` / `sol` / `grok`，并把代码委托（feature、refactoring、bug fix、perf、hillclimb）默认交给 `grok`，把最难的改动、文字和判断默认交给 `opus 5.5`。规则形状里的 slug 是 `claude-opus-5-5-max`、`gpt-5.6-sol-max`、`grok-4.7-xhigh-fast`。README 没有把这两个说法逐字对成同一串 slug。这份形状里，代码类角色的默认 slug 属于 grok 这一族，`judgment and prose` 与 `hardest tasks` 属于 opus 这一族，三个面板列表同时包含这三族。

## 是否接受验证技能提议

设置的末尾，`/setup-pstack` 检查项目里有没有办法驱动真实应用来取证：一个 `verify-*` 技能，或一份已有的 harness。两个都没有，就提议一次，用 `/create-verification-skill` 生成。

下面是原文 `SKILL.md` 里的提议原句。

```text
want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /create-verification-skill.
```

同意，就调用 `/create-verification-skill`。这个命令按 pstack 的安装位置解析，可以在工作区、用户目录或插件里。拒绝，就继续往下走，不再追问。你以后随时可以自己运行 `/create-verification-skill`。

> **解说（本书的解释，原文中没有）**
>
> 安装指南还写了同意之后的结果：写下 `.cursor/skills/verify-<app>/`，这是项目本地的技能，教代理像用户那样驱动应用，并在交出之前先证明它能工作一次。技能正文本身只写到“调用 `/create-verification-skill`”。本章不把目录和“先证明一次”写成技能正文里的原句。

指南把“什么时候值得做”留在验证与交付那一页。本章停在设置当时这一次提议。

设置整段走完之后，新开一个对话。模型规则作用于新会话。

## 第一次任务

选一件真实但小的事，用你对同事说话的方式描述它。

下面是原文指南的例子。

```text
/poteto-mode add a --json flag to this command. text output stays byte-identical. verify both.
```

看待办列表。列表开头是匹配到的剧本步骤，原样抄入。对这条提示，匹配的是 Feature 剧本。如果 `/poteto-mode` 跳过某一步，这一步仍留在列表里，并带上 `skip: <reason>`，你可以看见它选择不做的理由。

此后可以照常追问。`/poteto-mode` 是 sticky 的。它在这次对话里保持打开，直到你明确说出要退出。模式怎样挑剧本，见 [poteto-mode](poteto-mode.md#skill-poteto-mode)。

## setup-pstack {#skill-setup-pstack}

原文：{{src:skills/setup-pstack/SKILL.md}}

> 按角色和推理预算配置 pstack 使用哪些模型。它检测当前可用的模型，并写入一条始终生效的规则，用来覆盖各技能的默认选择。

### 何时使用

技能说明里的触发说法是 `/setup-pstack`、`configure pstack models`、`pstack budget`，以及要改变 pstack 的模型选择时。安装之后的第一次选模型也走这里。

### 运作方式

要写的文件是 `~/.cursor/rules/pstack-models.mdc`。它是一条始终生效的规则，按角色设定 pstack 的模型。

**1. 检测可用模型。** 列出本会话里可以传给 `Task` 子代理的模型 slug。这是可靠来源。如果 Cursor 另外暴露了模型 API 或 CLI，能列出用户有权使用的模型，为了完整就优先用那个列表。一个都检测不到时，请用户把有权使用的 slug 贴出来。尚未确认可用的真实 slug 不写入。别名 `inherit-parent` 和 `auto` 始终有效，即使它们不是检测出来的 slug。

**2. 读取当前状态。** 默认的角色到模型映射，就是技能步骤 5 的规则形状，见[默认模型配置](#setup-default-models)。若 `~/.cursor/rules/pstack-models.mdc` 已经存在，读它，把 `# budget` 行和各角色的值当作当前选择。否则从那些默认值开始。某一行的角色不在该形状里，例如 `how critics`，就是退役角色，丢掉。

**3. 预算、映射、确认。**

（a）询问预算。优先用 `AskQuestion`，而不是自由文本。给出四个选项，标签必须与技能正文一致。规则里已经记下预算时，说出现在的预算。四个标签由档位名和说明组成：

- `unlimited`，说明为 `keep max`
- `large`，说明为 `xhigh reasoning`
- `medium`，说明为 `high reasoning`
- `small`，说明为 `medium reasoning`

> **解说（本书的解释，原文中没有）**
>
> 技能要求这些标签与正文完全一致。原文在档位名和说明之间是一个破折号。上面把标签拆开，是为了不把该字符写进本书。使用时以技能正文里的完整标签为准。

（b）应用预算。从技能默认值做出工作表。再次运行时，保留你按模型族、列表或别名改过的角色。别名就是 `inherit-parent` 和 `auto`。`unlimited` 让每个 effort 保持工作表里的原样。`large`、`medium`、`small` 把每个真实 slug 的 effort 记号设为 `xhigh`、`high` 或 `medium`，面板条目也包括在内。effort 记号是最后一个记号；末尾如果是 `fast`，则是 `fast` 前面的那个。梯子从高到低是 `max`、`xhigh`、`high`、`medium`、`low`。改完之后若不是已检测到的 slug，就改用同一模型族里、effort 不高于目标、并且已经检测到的最高一档。还是没有，就把该角色标成需要选择。`inherit-parent` 和 `auto` 不因预算而改变。因此 `small` 会把 `claude-opus-5-5-max` 变成 `claude-opus-5-5-medium`，把 `grok-4.7-xhigh-fast` 变成 `grok-4.7-medium-fast`。

（c）展示角色并确认。展示每个角色和它的模型。真实 slug 不在已检测集合里的，标成需要选择。步骤 2 丢掉的每一行也列出来。问用户是照单接受，还是改某几个角色。选项是已检测到的模型，加上 `inherit-parent` 和 `auto`。两者都表示：这个角色跑在父对话的模型上，Auto 用户就这样留在 Auto。这里同样优先用 `AskQuestion`，而不是自由文本。面板角色是 `arena runners`、`architect runners`、`interrogate reviewers`。它们的值是列表，每一项跑一个子代理，别名条目也算，所以列表长度就是数量。`arena cross-judge pool` 也是列表，但 Arena 会从中选一个值，并在可能时让它的模型族和父级不同。`swarm workers` 是每个工作者的默认模型，除非某次竞速或比较为每一支另行指定模型。

**4. 校验。** 写入的每个真实 slug 都必须在已检测集合里。`inherit-parent` 和 `auto` 始终通过。选中的真实 slug 不可用时，停下来，再问一次。

**5. 写入规则。** 写入 `~/.cursor/rules/pstack-models.mdc`，带上 `alwaysApply: true`，一行 `# budget`（所选标签和它的目标 effort），以及每个角色一行。角色标签与 `poteto-mode` 使用的相同。整份覆盖这个文件，使再次运行保持幂等。文件形状就是[默认模型配置](#setup-default-models)里引用的那一段。

**6. 向用户确认。** 告诉用户规则已经写好，并且作用于新会话。再次运行这个技能会更新它。

**7. 提议验证技能（可选）。** 检查项目有没有办法驱动真实应用来取证（`verify-*` 技能，或已有的 harness）。没有的话，提议一次，原句见上文。同意就调用 `/create-verification-skill`（按工作区、用户或插件的安装位置解析）。拒绝就继续，不再追问。

### 使用例

技能说明没有另写一段长提示。调用就是命令本身，触发说法见「何时使用」。

下面是原文指南的例子。

```text
/setup-pstack
```

> **示例（本书作者所写，原文中没有）**
>
> `/setup-pstack`
>
> 预算选 small 那一项，标签用技能正文里的完整写法。`judgment and prose` 改成 `inherit-parent`。其余角色接受它列出的表。

### 陷阱与注意 {#setup-pitfalls}

尚未确认可用的真实 slug 不能写进规则。一个都检测不到时，向用户索取 slug。`inherit-parent` 和 `auto` 不是模型 slug。它们让子代理省略 `model`，从而继承父对话。

面板列表的长度决定子代理个数，别名条目也计数。`arena cross-judge pool` 虽然也是列表，Arena 只从中选一个。`swarm workers` 只是工作者的默认模型，竞速或比较仍可以按支改掉。

`how critics` 这种不在步骤 5 里的行会被丢掉，并且在确认时列给你看。选中的真实 slug 若不在已检测集合里，技能应停下来再问，而不是照写。

规则作用于新会话。指南要求设置之后新开一个对话。拒绝验证技能之后，设置不再追问。以后仍可以自己运行 `/create-verification-skill`。

0.15.3 之前的旧默认模型：按 README 和安装指南，删掉那些角色行，或者删掉整个文件，再运行 `/setup-pstack`。技能正文没有再写这一句。

> **解说（本书的解释，原文中没有）**
>
> README 和 `docs/guide/01-setup.md` 写的是：再次运行会保留模型与默认值不同的任何角色。`SKILL.md` 步骤 3 写的是：从技能默认表做出工作表，再次运行时保留你按模型族、列表或别名（`inherit-parent`、`auto`）改过的角色，再按预算改写真实 slug 的 effort 记号。两处对“再次运行保留什么”不一致。本章的步骤以 `SKILL.md` 为准。

### 相关技能

模型规则供 `/poteto-mode` 和其他技能读取。角色标签与该模式相同，见 [poteto-mode](poteto-mode.md#skill-poteto-mode)。设置末尾的可选项会调用 `/create-verification-skill`。
