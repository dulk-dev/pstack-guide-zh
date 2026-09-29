# 过夜运行

原文：{{src:docs/guide/07-overnight.md}} {{src:docs/guide/images/overnight.jpg}}

能信任它自己核验工作的代理，才是可以单独留下、交给一项硬任务的代理。让这件事安全的，是一个查得了的完成条件、一棵隔离的工作树，以及一份你早上审计的决策日志。

![她在门口道晚安，机器人继续让工厂运转](images/overnight.jpg)

{{src:docs/guide/images/overnight.jpg}} {{src:docs/guide/07-overnight.md}}

这一页点名的剧本不在这里重写步骤。完整步骤在 [长时间与大规模剧本](playbooks-long.md)。决策日志的格式在 [show-me-your-work](personal.md#skill-show-me-your-work)。人离开之后才回来信任的工作，模式还会经 [figure-it-out](arena-swarm.md#skill-figure-it-out) 在写代码之前设计这次运行的阶段，并接上决策日志。

## 过夜时交给它的约定

一次好的交接有目标、完成条件、许可和一条退路。它不必很长。下面来自原文指南。

```text
/poteto-mode im going to bed. migrate every caller to the new parser in a fresh worktree off <base>.
done means zero old callers, all parser fixtures pass, old api deleted.
keep a decision log. don't ask me before committing.
/loop until done. if you're truly stuck after a few hours, stop and write up why.
```

`<base>` 在原文里就是占位符。指南逐行说明每一句买到什么。

- “im going to bed” 是会话级覆盖。代理停止追问，继续做。
- “done means...” 把目标变成每一轮都能跑的检查。
- “fresh worktree off `<base>`” 让这次运行不和你还开着的其他工作相撞。
- “don't ask me before committing” 预先回答了代理否则会停下来等的那项许可。
- `/loop` 是 Cursor 的内建唤醒，不是 pstack 技能。[Autonomous run](playbooks-long.md#playbook-autonomous-run) 用它在事件或心跳上重新检查完成条件。
- 退路让它在真正的死路上停下，并写明为什么。这好过八个小时创造性地改解释目标。

因为你走开之后才审阅这项工作，`/poteto-mode` 会把它路由到 [figure-it-out](arena-swarm.md#skill-figure-it-out)。那份技能在任何代码之前设计这次运行的阶段，并接上决策日志。

## 过夜循环做什么

指南用一张图描述整夜的循环。检查完成条件，做最小的正当改动，对照真实产物核验。有进展就提交。没有帮助就丢掉，不要留着一起走。然后记一行决定，再回到检查。

一轮一个改动，一轮一次检查，一轮一行日志。平台期意味着换做法，不是停。完成条件不会悄悄放宽来宣布胜利。

这些停止规则和唤醒方式的步骤在 [Autonomous run](playbooks-long.md#playbook-autonomous-run)。那份剧本要求把退出条件写成可检查的谓词，用 `/loop` 醒来，没有帮助的改动丢掉，每一轮经 [show-me-your-work](personal.md#skill-show-me-your-work) 做检查点，并且绝不要放宽谓词。

## 早上怎样审计

[show-me-your-work](personal.md#skill-show-me-your-work) 使这次运行可以审阅。每一行记下时间、阶段、决定、理由、一个证据指针和结果。TSV 在 `decisions.tsv`。同一目录里有几次运行时，用 `.audit/<task-slug>.tsv`。默认留在本地。工作大到审阅者需要这条轨迹才肯信任结果时，才提交它。

回来之后，用审阅的形式要这次运行。下面来自原文指南。

```text
/show-me-your-work catch me up on what you did last night
```

技能交回摘要之前，会派一个不同模型族的审阅者去读轨迹和转录。回复以 Attention 一节结束，列出值得你细看的地方。先读那一节，再读它指向的日志行。你审计的是决定，不是把整夜重读一遍。列的含义、只追加、以及 `reviewed by <model>` 那一行，见 [show-me-your-work](personal.md#skill-show-me-your-work)。

## 夜里队列里还有消息时

上面的约定把一个任务驱到一个完成条件。有的夜里装的更多，是一队列互相独立的改动，或一整项程序。三份剧本把同一种信任放大。步骤不在这里展开。

[Autopilot-full](playbooks-long.md#playbook-autopilot-full) 把一队列独立 PR 跑到合并。每个 PR 有一个所有者代理，从构建带到合并。没有所有者凭自己的裁决合并。一群新的核验者在所有者代码就绪的那个头上开始一轮，并且在之后每一次改变补丁的推送上再来一轮。只有对将要合并的那份补丁给出干净裁决，才授权合并。下面来自原文指南。

```text
/poteto-mode full autopilot on this queue. each item is independent. i want them merged by morning.
```

[Autopilot-stack](playbooks-long.md#playbook-autopilot-stack) 跑同样的所有者循环，但什么都不发出去。你醒来时看到一条线性的基线分支栈，每一环都有核验者的裁决，由你自己审阅并落地。改动互相耦合，或你希望在任何东西合并之前用自己的眼睛看过，就选它，而不是 Autopilot-full。下面来自原文指南。

```text
/poteto-mode autopilot these five changes but stack them, don't ship. i'll land the stack in the morning.
```

[Orchestrate](playbooks-long.md#playbook-orchestrate) 用于活得比任何一个代理更久的程序：多日、许多叠放的 PR、一个常设协调对话下面的一大批子代理。协调者写简报，收集子代理做完的东西，保持最低的那个未合并 PR 是绿的，自己从不写代码。它是故意很重的机器。若一个代理能在一次会话里做完这项工作，剧本自己会把你送回上面的过夜约定。下面来自原文指南。

```text
/poteto-mode orchestrate the store migration. own it until every package is converted and merged. i'll check in twice a day.
```

一个代理在本次会话预算里能做完的，即使措辞像整个项目，也走 [Autonomous run](playbooks-long.md#playbook-autonomous-run)，不走 Orchestrate。这句话同时写在模式的剧本选择里。

## 陷阱

指南在这一页末尾点名的陷阱是：一段时间不是完成条件。“work on this for 4 hours” 没有给代理任何可检查的东西。你会醒来看到四个小时的动作，而不是一个结果。给 `/loop` 一个能通过或失败的谓词。
