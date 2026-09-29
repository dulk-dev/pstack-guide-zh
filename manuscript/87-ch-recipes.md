# 配方与陷阱

原文：{{src:docs/guide/10-recipes-and-pitfalls.md}} {{src:docs/guide/images/recipes.jpg}} {{src:README.md}}

值得照抄的提示在前，人人都会犯一次的错误在后。换成你自己的路径和完成条件。配方故意写得很随意。实际打字就是这样，技能读得出意图。

![她品尝做好的菜，机器人按配方卡片烹调](images/recipes.jpg)

{{src:docs/guide/images/recipes.jpg}} {{src:docs/guide/10-recipes-and-pitfalls.md}}

这一章里的提示都来自原文指南或原文 README。本书没有另拟提示，所以不用示例标签。

## 配方

下面每一则都来自原文指南 `docs/guide/10-recipes-and-pitfalls.md`。

### 先弄清不熟悉的子系统

先看机制，再看历史。每份技能的报告会告诉你它搜过哪些来源，于是你知道答案立在什么上面。

```text
use /how first to understand how this initialization works. then use /why to figure out why it broke recently.
```

### 给设计再听一个意见

你当前的设计变成若干候选之一。综合会告诉你，评审团是找到了更好的东西，还是确认了你已有的。在昂贵的承诺之前，这是便宜的保险。

```text
ask /arena for a second opinion on this thread and our approach
```

### 并行检查互不依赖的切片

每个工作者拥有一个包。父代理等每一个切片，交回一份 `PASS`、`ISSUES` 或 `BLOCKED` 报告，而不是工作者的原始倾倒。

```text
/swarm check every package under packages/ against its check.sh. one worker per package. one report.
```

### 怀疑地看一条分支

限定语在做实事。“don't change anything yet” 让它保持只读。挑剔规则预先滤掉噪声，于是 `Act on` 的发现值得你花时间。

```text
/interrogate the whole branch, but skeptically. don't change anything yet. no nitpicks unless it's an actual bug or regression in behavior.
```

### 用失败测试修缺陷

“if there's a cheap test path” 要紧。逼着测试穿过脆弱的模拟，比运行真实命令证明得更少。剧本允许这样说。

```text
/poteto-mode repro the duplicate write first. if there's a cheap test path, /tdd it. then fix and rerun.
```

### 人离开时仍让运行保持诚实

完整约定在 [过夜运行](overnight.md)。任务和完成条件已经在对话里时，短形式就够。

```text
im going to bed, keep going autonomously until every fixture passes. do not stop. keep a decision log i can audit in the morning.
```

### 把漂走的运行拧回来

拧回用一行。你很少需要更多的词。你需要的是对的名字。词汇在原则那一页，见 [原则](principles.md)。

```text
i said the goal is to repro. i did not ask for a fix yet.
```

```text
apply prove it works. show me the real output, not the build log.
```

```text
/unslop that, no emdashes
```

### 用平实的话听回复

这就是整句提示。[bro](utility.md#skill-bro) 把上一则消息重述成一个人在跟另一个人说话，没有行话，更短。回复在技术上已经很全、你仍然不知道它说了什么的时候用它。

```text
/bro
```

## 分步提示长什么样

指南说，你不必写规格。你说什么是错的或你要什么，再加上你已经知道、能给代理省时间的事实。索引页把要记住的一件事收成目标和一种检查方式，用你自己的话。你不必点名剧本，也不必列出技能。“repro first” 和一个查得了的结果，就是 `/poteto-mode` 需要的全部路由信号。它会匹配 Bug fix 剧本，把步骤抄进待办，并在每一步调用对应的技能。

下面来自原文指南 `docs/guide/README.md`。

```text
/poteto-mode the export writes duplicate rows when a retry lands mid-run. repro first, then fix and verify.
```

对话里已经有上下文时，提示可以缩到几乎没有。下面三则来自原文指南 `docs/guide/02-poteto-mode.md`。

```text
/poteto-mode do it
```

```text
continue
```

```text
keep going until done
```

换话题要说 new task，否则模式会沿着上一个剧本往下做。下面来自同一页。

```text
/poteto-mode new task. figure out why the cache entry survives logout. don't change any code yet.
```

```text
/poteto-mode new task. branch off <base> in a fresh worktree, then port the parser change there.
```

```text
/poteto-mode what's eating my disk? prune the worktrees that are safe to prune.
```

```text
/poteto-mode im stepping away. keep going until the migration check reports zero old callers. log your decisions.
```

`<base>` 保持为原文里的占位符。

原文 README 的 examples 是作者直接打出来的一组。和上一节文字相同的 `/swarm` 那条不再贴。其余来自原文 README。

```text
bug fix:           /poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even
                   when idle. repro first, then fix and verify.
perf:              /poteto-mode a big list takes a second or two to load even though we virtualize.
                   run a cpu trace and tell me why.
feature:           /poteto-mode build a small feature behind a feature flag. verify it really works.
prototype:         /poteto-mode build two prototypes of the markdown renderer so we can compare.
                   spawn an agent for each.
multi-phase:       /poteto-mode open source these skills as a plugin. nothing internal leaks, work
                   in a temp dir, show me the dependency graph first.
overnight run:     /poteto-mode i'm going to bed. land the stack even if ci flakes. i want
                   everything merged by morning.
babysit:           /poteto-mode check on pr 123. anything outstanding?
visual parity:     /poteto-mode the row spacing is too tall when this flag is on. the second image
                   is correct. repro and fix until it matches.
figure it out:     /poteto-mode i'm stepping away. migrate every caller from the synchronous store
                   to the new async one, keeping behavior identical. i want to trust it was done
                   right when i'm back.
how:               /how do we cancel runs? do we have an n+1 when we look up every run to cancel?
why:               /why is this feature flag not on yet?
architect:         design this instrumentation to be high signal with no false positives. /architect
                   this first.
arena:             /arena take my prompt to the arena verbatim. i want to compare their proposals
                   with yours.
interrogate:       /interrogate review this pr.
tdd:               /tdd implement
unslop:            can we unslop and tighten the new changes?
reflect:           /reflect that took too long. capture what we learned so the next run doesn't
                   repeat it.
show-me-your-work: /show-me-your-work keep a decision trail i can review when i'm back.
automate-me:       /automate-me
```

指南其他页还有可复制的提示。与上面重复的句子不再贴。下面都来自原文指南。

安装之后的第一次小任务，来自 `docs/guide/01-setup.md`。指南说这条会匹配 Feature。

```text
/poteto-mode add a --json flag to this command. text output stays byte-identical. verify both.
```

同一页还有安装和选模型。

```text
/add-plugin pstack
```

```text
/setup-pstack
```

理解代码，来自 `docs/guide/03-understand.md`。

```text
/how do we dedupe notifications? is there an n+1 when we look up subscribers?
```

```text
/why was the retry limit set to five? does the reason still hold?
```

```text
/teach me how this PR changes retries. convince me it fixes the cause and not the symptom.
```

```text
/recall catch me up on the export work from last week
```

```text
/poteto-mode take over this branch. read the decision log, figure out what's done, and continue from there. don't redo finished work.
```

定形状，来自 `docs/guide/04-design.md`。`/arena` 的 verbatim 那条已在 README examples 里。

```text
/architect design the import pipeline before writing any code. i care most about how callers use it.
```

```text
/architect with checkpoint. stop and show me before implementing.
```

```text
/arena this, 5 candidates. the cache key format is expensive to change later.
```

```text
/interrogate the whole branch, but skeptically. no nitpicks unless it's an actual bug or regression.
```

构建和清理，来自 `docs/guide/05-build-and-clean.md`。

```text
/poteto-mode this command emits two records after a retry. repro first, then fix and verify.
```

```text
/poteto-mode add a --json flag. text output stays byte-identical. verify both forms.
```

```text
/poteto-mode move parsing into one module, zero behavior change. record the current output first and prove it's unchanged after.
```

```text
/poteto-mode startup takes 1.8s on this fixture. trace it, fix the measured cause, show me before and after.
```

```text
/tdd implement
```

```text
/unslop the readme changes, no emdashes
```

```text
/no-comments the diff
```

核验和交付，来自 `docs/guide/06-verify-and-ship.md`。

```text
/poteto-mode add json output to this command. text output stays byte-identical, the json parses, both run against the sample project. show me the evidence.
```

```text
/create-verification-skill
```

```text
/maintain-verification-skill
```

```text
/poteto-mode open the pr. small ordered commits, evidence in the description.
```

```text
/poteto-mode babysit this pr. get it green.
```

```text
/poteto-mode check on pr 123. anything outstanding?
```

```text
/poteto-mode land the stack.
```

用原则的名字拧回去，来自 `docs/guide/08-principles.md`。你不调用原则。每个名字指向代理已经读过的完整规则，所以一句比一段指示更精确。回复里仍然要说出这条规则改变了哪个决定。只点名字、背后没有决定，就是在点名而不是在用。

```text
use subtract before you add. delete the obsolete adapters first, then design what's left.
```

```text
apply prove it works. run the real import flow and show me the written records.
```

```text
separate before serializing shared state. give each attempt its own worktree, no locks.
```

做成自己的，来自 `docs/guide/09-make-it-yours.md`。`/automate-me` 和 `/reflect` 的句子已在 README examples 里。下面是该页其余的提示。

```text
/automate-me update my mode skill with everything since its last edit
```

```text
/poteto-mode write a skill for verifying database migrations in this repo
```

```text
/technical-writing review the readme changes
```

```text
/poteto-mode run the eval playbook on this skill change. same task for both variants, candidates stay blind.
```

过夜约定、早上审计，以及队列、栈和协调的三句提示，在 [过夜运行](overnight.md)，来源是 `docs/guide/07-overnight.md`。这里不重复粘贴。

这些提示的共同形状是：一个目标，加上你怎样知道它做完了。点名技能只在你要改掉某个默认选择的时候。完成条件是一条命令或一件产物，能通过，也能失败。

## 陷阱

下面每一条都来自原文指南 `docs/guide/10-recipes-and-pitfalls.md` 的 The pitfalls。

- 在提示里枚举技能。“use /how then /architect then /arena” 会重排剧本已经排好的步骤。说出目标和约束。只有在要覆盖某个默认时才点名技能。
- 含糊的完成条件。“make it better” 没有给 `/loop` 任何可检查的东西。给出一条能通过或失败的命令，或一件这样的产物。
- 多个代理挤在同一棵工作树里。它们互相覆盖，diff 变成考古。说 “own worktree per attempt”，隔离就有了。
- 用 `/arena` 做覆盖。`/arena` 把同一份设计或代码简报做多次，然后选一个基底，嫁接最好的部分。`/swarm` 划分切片或声明好的竞速臂，再聚成一份报告。
- 接受每一条审阅评论。机器和人都会在同一张清单里既提交真抓到的问题，也提交噪声。`/interrogate` 把发现分成动手做和已打发两类，并给出理由。你仍可以反过来改其中任何一条。
- 把 `auto` 当成模型 slug。`auto` 和 `inherit-parent` 的意思是省略模型字段，让子代理继承父对话的模型。角色见 [安装与第一次使用](setup.md)。
- 凭一次绿色的构建报告成功。构建证明它能编译。要真实的命令、流程、存下来的值或性能分析，并期望证据出现在回复里。
- 徒手写一份 `SKILL.md`。把它路由到 [Authoring or modifying a skill](playbooks-work.md#playbook-authoring-a-skill)，这样才会有校验和审阅。

指南的最后一句是：若你跳着读到了这里，回到安装，并跑一项真实的任务。习惯来自使用，不来自阅读。
