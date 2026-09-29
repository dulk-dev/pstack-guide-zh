# 技能选择流程

这一页只使用三处原文，不另加路由。一是 `poteto-mode` 的剧本选择。二是指南索引 “If you only remember one thing”。三是 `docs/guide/08-principles.md`。

原文：{{src:skills/poteto-mode/SKILL.md}} {{src:docs/guide/README.md}} {{src:docs/guide/08-principles.md}}

## 第一步：是否可以直接用 poteto-mode

可以。索引要记住的一件事是：用你自己的话给代理一个目标，以及你怎样知道它做完了。你不必点名剧本，也不必列出技能。

```text
/poteto-mode the export writes duplicate rows when a retry lands mid-run. repro first, then fix and verify.
```

上面来自原文指南索引。“repro first” 和一个查得了的结果就是路由信号。它匹配 Bug fix，把步骤抄进待办，并在每一步调用对应的技能。

模式的提醒是：新任务、剧本匹配或需要严格性，就应用 `/poteto-mode`。随意的一轮，或你说了退出，就不要应用。README 还把它写成 sticky mode：进入之后跨回合保持，匹配上了或需要严格性就继续，否则让路。

非平凡的任务从这里进。其余技能多半会在步骤里被调用。直接点名某一个，是你想要那一份本身的时候，名单在 [技能速查表](quickref.md)。

## 第二步：你要做什么

先匹配，打开该文件，把步骤原文逐字抄进待办，放在这次任务自己的待办之前。你决定不做的步骤仍留下，并写一行 `skip:` 和理由。

指南 `docs/guide/02-poteto-mode.md` 的常见路由是：只读问题到 Investigation，缺陷到 Bug fix，新行为到 Feature，只改结构到 Refactoring，测到的变慢到 Perf issue，大规模或没有匹配到 `figure-it-out`。模式正文把同一张清单写全，并加上这些区分。

- 跨许多调用点的迁移、分成许多部分的大改动，或你走开之后才信任的工作，即使 Feature 套得上，也走 [figure-it-out](arena-swarm.md#skill-figure-it-out)。没有任何现成剧本合用时，同样走它。它为这一次设计专门而严格的做法。
- 跨多日、许多叠放 PR、一个协调者带一队子代理的常设项目，走 [Orchestrate](playbooks-long.md#playbook-orchestrate)。`figure-it-out` 设计一次运行。Orchestrate 运行整个项目。一个代理在本次会话预算里能做完的，即使听起来像项目，也走 [Autonomous run](playbooks-long.md#playbook-autonomous-run)，不走 Orchestrate。
- Hillclimb 是对着一个指标持续改进。Perf issue 是一次性修复。
- Runtime forensics 和 Trace forensics 交付的是诊断，不是修复。前者看活的插桩。后者看事后交给你的分析产物。
- Prototype 用一次性草图做设计或行为决定，或用观察解决经验性分叉，而不是问人。
- Opening a PR 在其他每一个剧本结束时调用，不是起手的匹配。

其余名称和一句用途见 [剧本速查](quickref.md#quickref-playbooks)。

## 第三步：需要多少设计

索引不要求你写规格。目标加上一种检查就够。

原则那一页把 `core` 的十个写成决定建多少、以及何时重想设计的一组。你不调用它们。你说名字。每个名字指向一条已经读过的完整规则，所以一句比一段指示更精确。代理仍要在回复里说出，这条规则改变了哪个决定。

这十个是 Laziness Protocol、Foundational Thinking、Redesign from First Principles、Attack the Premise、Subtract Before You Add、Minimize Reader Load、Outcome-Oriented Execution、Experience First、Exhaust the Design Space、Build the Lever。其中和范围直接相关的句子是：偏向删除和能解决问题的最小改动。写逻辑之前先定核心数据结构。先去掉死重。没有先例时先做两到三个互相竞争的原型。把新需求当成从第一天就在那里。重写收敛到目标设计。选择使用者的结果。去做那件能完成或证明工作的脚本。全部二十三个名字在 [原则技能](quickref.md#quickref-principles)，全文在 [原则](principles.md)。

## 第四步：不要做的事

- 不要在提示里点名剧本，也不要列出一串技能。索引写明，那不是 `/poteto-mode` 需要的信号。
- 不要把原则当成要调用的命令。用名字拧回。只点名字、回复里没有被改变的决定，就是在点名而不是在用。
- 不要背那 23 个名字。先扫一遍，等你看见代理正在做某件某个名字本可以拦住的事，再回来。
- 不要把会话预算里一个代理能做完的工作送进 Orchestrate。
- 不要把一次测到的变慢送进 Hillclimb，也不要把持续改进一个指标送进 Perf issue。
- 不要让两份取证剧本交修复。它们交诊断。
- 不要把 Opening a PR 当成起手式。它挂在其他剧本的结尾。

```flow 选择技能
start 开始
step 说目标与检查 | 用自己的话
  alt 需要严格性 | 用 /poteto-mode
  alt 随意或已退出 | 不套用
step 匹配一份剧本 | 不必点名
  alt 只读问题 | Investigation
  alt 缺陷 | Bug fix
  alt 新行为 | Feature
  alt 只改结构 | Refactoring
  alt 测到的变慢 | Perf issue
  alt 大改或无匹配 | figure-it-out
step 用名字拧回 | 不调用原则
end 结束
```
