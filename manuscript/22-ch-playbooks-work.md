# 工作剧本

这些是 [`/poteto-mode`](poteto-mode.md#skill-poteto-mode) 按任务选中的做法。步骤会被原文抄进待办：模式先打开待办列表，把命中剧本的步骤按原文逐字抄在这项任务自己的待办之前。你决定不做的步骤仍留在列表里，一行写成 `skip: <reason>`。本章是工作类剧本。PR 与长时间剧本在另两章：[PR 剧本](playbooks-pr.md) 与 [长时间剧本](playbooks-long.md)。

剧本清单在 {{src:skills/poteto-mode/SKILL.md}}。跨很多调用点的迁移、分成许多部分的大改动，或者人离开后才回来看的工作，即使较窄的 Feature 也能套上，仍走 [`figure-it-out`](arena-swarm.md#skill-figure-it-out)。没有任何现成剧本合用时也走它。它为这一次运行设计专属步骤。跨天、许多叠放的 PR、一个协调者下面有一大批子代理的常设项目，走 [Orchestrate](playbooks-long.md#playbook-orchestrate)。一个代理在本次会话预算里能做完的，即使措辞像整个项目，也走 [Autonomous run](playbooks-long.md#playbook-autonomous-run)，不走 Orchestrate。

剧本步骤里派出的子代理，`subagent_type` 用 "poteto-agent"，见 [`poteto-agent`](poteto-mode.md#agent-poteto-agent)。`how`、`why`、`interrogate`、`reflect`、`swarm` 若规定了自己的 `subagent_type`，不要改成 `poteto-agent`。每次 Task 默认 `run_in_background: true`。子代理的结果仍由你负责。自己评审 diff，自己写总结，不要把子代理的话原样转交。被打断后续跑会悄悄丢掉指示，把范围收拢后重新派一个。代码类剧本写明的默认模型保持英文 `grok-4.7-xhigh-fast`，可由 [`/setup-pstack`](setup.md#skill-setup-pstack) 的角色行覆盖。没有该行时用这个默认。最难的改动（横切设计、难缠的并发、微妙的算法）改读 `hardest tasks`，默认 `claude-opus-5-5-max`。界面、IDE 或命令行上的操作走匹配的 control 技能。它们属于另一个插件 `cursor-team-kit`：命令行和 TUI 是 `control-cli`，浏览器、Electron 和 Web 界面是 `control-ui`。

每个剧本的回复都按模式里的 Writing the reply 来写。句子短，一句一件事。回复本身是文字表面，要经过 [`unslop`](writing.md#skill-unslop)。注释只保留代码看不出来的原因。这条写在模式的 Comments 里，适用于本章会改代码的剧本，包括子代理的 diff。有 PR 时，链接形如 `https://github.com/<owner>/<repo>/pull/<number>`。各节“回应”只补该剧本点名的内容。凡写“运行 Opening a PR”的，步骤在 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。那份剧本要求提交前对 diff 运行 `/deslop`，它属于另一个插件 `cursor-team-kit`。

原文 {{src:docs/guide/02-poteto-mode.md}} 禁止在提示里逐个点名技能来重排剧本已经排好的步骤。说出目标和约束。只有在你想覆盖某个默认选择时才点名技能。

## Investigation {#playbook-investigation}

原文：{{src:skills/poteto-mode/playbooks/investigation.md}}

> 答案由你负责。这是只读调查，产出带引用的解释或建议，不改代码。

### 何时使用

只读问题。代码如何工作，某件事为什么做成这样，对某个判断有没有把握，或者应该做甲还是乙。模式清单里的说法是 how does X work、why was Y built this way、are we sure about Z、should we do X or Y。

换话题时，原文 {{src:docs/guide/02-poteto-mode.md}} 要求在提示里写 `new task`，让模式重新匹配，而不是沿着上一个剧本往下做。再写明先不要改代码，就会钉在本剧本上。没有这两句时，正停在 Feature 中的模式容易把这个问题当成功能的下一步。

### 运作方式

1. 把问题路由到 [`how`](how.md#skill-how)。动机、设计理由这一类问题，同时路由到 [`why`](why.md#skill-why)。`how` 回答代码做什么、怎么运转。`why` 回答哪些力量把它做成了现在的形状。这两个技能若规定了自己的 `subagent_type`，不要改成 `poteto-agent`。
2. 吞吐检查点保持一行。原文固定为 `throughput checkpoint: n/a, read-only investigation`。
3. 产出 `how` 形状的讲解。分节名保持英文：`Overview`、`Key Concepts`、`How It Works`、`Where Things Live`、`Gotchas`。不适用的分节去掉。若请求是在若干方案之间做决定，改为给出建议，并附一张权衡表。
4. 用 [`unslop`](writing.md#skill-unslop) 整理回复。

不打开 PR，不进入 Babysit，也不调用 `architect`，除非这次调查其实是改代码的前奏。若是前奏，把工作交回用户，再改路由到 [Bug fix](#playbook-bug-fix) 或 [Feature](#playbook-feature)。

### 回应

交出调查结果。对 are we sure 这一类问题，写上你的真实判断和理由。前提错了就推回去。模式的 Autonomy 写明可以拒绝、可以反对，也可以说这件事不值得占一个位置。建议是判断。同意不是默认。

### 陷阱与注意

本剧本只读，不改代码。不打开 PR。不走 [Babysit](playbooks-pr.md#playbook-babysit)。不调用 [`architect`](architect.md#skill-architect)，除非调查接着就要改代码。那时交回用户并改路由，不在本剧本里把改动做完。

### 流程图

```flow 调查只读
start 开始
step 路由到 how | 动机问题再加 why
  alt 动机问题 | 同时走 why
step 写检查点 | 只读调查一行
step 交出结果 | 讲解或权衡表
  alt 在选项间做决定 | 附上权衡表
  stop 接着要改代码 | 交回并改路由
step 整理回复 | 用 unslop
end 结束
```

### 分步产出

1. 这一步的产出就是该步的结果：问题已经路由到 `how`。动机问题同时路由到 `why`。原文没有为这一步规定文件名。
2. 产出是一行吞吐检查点，文字就是上节那句英文。
3. 产出是带上述分节的讲解，或一份带权衡表的建议。原文没有规定文件名。
4. 产出是经过 `unslop` 的回复。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` new task. 只读说明结账超时后，订单如何从支付中回到待支付。先不要改代码。

下面这条来自原文 {{src:docs/guide/02-poteto-mode.md}}，不是本书自拟。

```text
/poteto-mode new task. figure out why the cache entry survives logout. don't change any code yet.
```

### 失败、中止与含糊时

这份剧本没有把不能复现、结论不明或错误表面写成失败分支。若调查其实是改代码的前奏，就在本剧本里中止，交回用户，改走 Bug fix 或 Feature。

### 调用的技能与脚本

- [`how`](how.md#skill-how)
- [`why`](why.md#skill-why)，只在动机类问题上同时使用
- [`unslop`](writing.md#skill-unslop)
- [`architect`](architect.md#skill-architect) 只在“接着要改代码”时被点名，点名是为了改路由，不在本剧本内执行
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Bug fix {#playbook-bug-fix}

原文：{{src:skills/poteto-mode/playbooks/bug-fix.md}}

> 任务由你负责。每一行将要提交的改动都要追溯到运行时证据，证据不支持的改动不提交。

### 何时使用

已报告的缺陷。要自己复现，找到根因，并用运行时证据修复。根因是症状背后的机制。一次性的性能修复走 [Perf issue](#playbook-perf-issue)，不走本剧本。持续对着一个指标改进走 [Hillclimb](#playbook-hillclimb)。

### 运作方式

你留在主导位置，负责计划、评审和验证。调查和修复委托给子代理。第 1 步的复现仍要你自己做。

要科学。双保险，原文写作 belt-and-suspenders，指再加一层也许有用的防护。那是假设，不是修复，不能提交。证据推翻某条假设时，回退这条假设所推动的改动。证据能证明的最小改动才提交，不多做。

1. 在匹配的表面上自己复现，即使某份调试或加仪器的规程让你去请用户复现，也仍由你自己做。操作通过 control 技能。这个技能属于另一个插件 `cursor-team-kit`。命令行和 TUI 用 `control-cli`，浏览器、Electron 和 Web 界面用 `control-ui`。只有在说清一个具体理由、说明这个 control 表面够不到目标，并且你已经把它驱动到所能及的最远处之后，才去问用户。不能直接复现时，不要停。合成触发条件，收紧条件，或加上仪器，直到它发生。
2. 用二分查找原因。先形成候选假设，再逐个排除，直到只剩一个。用 [`how`](how.md#skill-how) 看受影响的子系统，用 [`why`](why.md#skill-why) 看回归历史，以此给假设做种子。每一轮都取能切掉最多剩余问题空间的那一刀，拿到运行时证据，然后排除。程序状态不清楚时，加仪器或日志，在代码运行时读它。原文禁止猜测。漫长或顽固的追查用 Cursor 的 `/loop`。在进入第 3 步之前，用运行时证据确认幸存的机制。原文把第 3 步称为 `architect` 与 `interrogate` 的扇出。扇出是把工作并行分出去。
3. 计划修复。改动越过函数边界时，先走 [`architect`](architect.md#skill-architect)。把实现委托给子代理，使用你配置的 bug-fix 模型，默认 `grok-4.7-xhigh-fast`。`subagent_type` 用 "poteto-agent"。范围要具体。最难的改动改读 `hardest tasks`，默认 `claude-opus-5-5-max`。
4. 在同一表面上验证。原来的复现现在要通过。结论不明，原文写作 `Inconclusive`，或者错误表面，原文写作 wrong-surface，都不是通过，要标出来。单元测试展示的是分支行为，不是缺陷已经不存在。
5. 安排提交，使失败的复现先进入 git 历史，修复叠在上面。缺陷有廉价的本地测试路径时，按 [`tdd`](tdd-blast.md#skill-tdd) 的先失败后修复来做。这就是 [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units) 在本剧本里的典型顺序：失败测试在下，修复在上。测试昂贵、偏集成或路径不清楚时，跳过这套节奏。原文 {{src:docs/guide/10-recipes-and-pitfalls.md}} 写明，用脆弱的 mock 硬凑测试，比跑真实命令证明得更少，剧本允许跳过。`tdd` 的节奏是：弄清预期行为、当前行为、受影响路径和最小可观察复现。选最窄的可执行检查。先写会抓住这个缺陷的最小测试，编码的是预期行为。改产品代码之前先跑它，确认它因这个原因失败。再做满足预期的最小产品改动。最后重跑，确认通过。
6. 运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。

> **解说（本书的解释，原文中没有）**
>
> 开篇要求把调查和修复委托给子代理，第 1 步又要求你自己复现，第 3 步写明把实现委托出去。第 2 步没有写“交给子代理”。本书按第 2 步的句子，把形成假设、取证和排除写成主导者要完成的事。`how` 与 `why` 会再派它们自己的子代理。
>
> 第 2 步把第 3 步叫做 `architect` 与 `interrogate` 的扇出。第 3 步正文只写了越过函数边界时先走 `architect`，再委托实现。原文没有另写本剧本里何时必须跑 [`interrogate`](interrogate.md#skill-interrogate) 的句子。模式总则里，有争议的设计在交付前才走 `interrogate`。

### 回应

写清什么坏了、根因、修复、你如何验证。把先失败、后通过的复现输出按原样贴上。

### 陷阱与注意

可能有用的双保险不能当修复提交。证据推翻假设时，回退它推动的改动。不要猜测。不要在 control 表面还能往前驱动时就把复现推给用户。调试规程即使写着请用户复现，仍要你自己先做。单元测试通过不等于缺陷已经消失。`Inconclusive` 和 wrong-surface 不能算通过。

### 流程图

```flow 缺陷修复
start 开始
step 自己复现 | 匹配表面用 control
  alt 不能直接复现 | 合成触发或加仪器
  stop 表面够不到 | 说清理由再问人
step 二分找原因 | 用证据淘汰假设
step 计划并委托 | 越界先 architect
  alt 越过函数边界 | 先走 architect
step 同表面验证 | 原复现必须通过
  stop 结论不明 | 错误表面不算过
step 先失败后修复 | 昂贵测试可跳过
  alt 测试昂贵 | 跳过 tdd
step 打开 PR | 见 Opening a PR
end 结束
```

### 分步产出

1. 这一步的产出就是该步的结果：你在匹配表面上看到缺陷发生，或已经把触发条件收到它发生为止。原文没有规定复现记录的文件名。
2. 产出是被运行时证据留下的那一个机制，以及被排除的假设。原文没有规定文件名。
3. 产出是修复计划。越过函数边界时，先有 `architect` 的设计探索，再有子代理按具体范围写出的改动。
4. 产出是同一次复现在同一表面上变为通过的结果。不通过的要标成 `Inconclusive` 或 wrong-surface。
5. 产出是 git 历史里先失败复现、后修复的提交。走 `tdd` 时，还有先失败后通过的测试。跳过时，没有这套测试提交。
6. 产出是按 Opening a PR 打开的 PR。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 设置页会把空的显示名存成字符串 `null`。请先在同一界面复现，再用运行时证据修，并贴出先失败后通过的输出。

下面这条来自原文 {{src:README.md}} 的例子。

```text
/poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even
when idle. repro first, then fix and verify.
```

### 失败、中止与含糊时

不能直接复现时不要停，合成触发、收紧条件或加仪器，直到发生。control 表面够不到目标时，先驱动到尽头，再带着具体理由问用户。`Inconclusive` 或 wrong-surface 不是通过，要标出。测试昂贵、偏集成或路径不清楚时，跳过 `tdd` 的先失败节奏。证据推翻假设时，回退该假设推动的改动。

### 调用的技能与脚本

- [`how`](how.md#skill-how)，用来给假设做种子
- [`why`](why.md#skill-why)，用来看回归历史
- [`architect`](architect.md#skill-architect)，改动越过函数边界时先走
- [`interrogate`](interrogate.md#skill-interrogate)，只出现在第 2 步对第 3 步的称呼里，见解说
- [`tdd`](tdd-blast.md#skill-tdd)，廉价本地测试路径才走
- [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- control 技能属于另一个插件 `cursor-team-kit`
- 漫长追查用 Cursor 内建的 `/loop`，它不是 pstack 的脚本
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Perf issue {#playbook-perf-issue}

原文：{{src:skills/poteto-mode/playbooks/perf-issue.md}}

> 测量由你负责。每一处修复都要绑在一次测量上，不要用读源码代替测量。

### 何时使用

已经测到的变慢。对照基线追踪并改进。这是一次性修复。要对着一个指标持续、反复地改进时，改走 [Hillclimb](#playbook-hillclimb)，文件是 `playbooks/hillclimb.md`。

### 运作方式

1. 通过匹配的 control 技能抓一份基线轨迹。这个技能属于另一个插件 `cursor-team-kit`。命令行和 TUI 用 `control-cli`，浏览器、Electron 和 Web 界面用 `control-ui`。
2. 用 [`how`](how.md#skill-how) 给假设落地。没有先跑起来，就不要声称性能上限。大多数修复来自下面八个策略族。它们是假设发生器，不是清单。只有轨迹出现了该族所点名的信号，这一族才配试一次。
   - `Elimination`。优化热路径之前，先问它是否必须存在。没人消费的计算、对这个用户永远关闭的功能门、重复镜像状态的同步、以防万一留着的旧路径，都在此列。轨迹只显示什么慢，从不显示它可以删。这一族要靠 `how`，不靠分析器。
   - `Divide and conquer`。主导成本随输入规模增长。把工作拆开，让每一块碰更少的数据，例如分块、分片、剪枝搜索空间，或让彼此独立的块并行。
   - `Caching`。同一计算或同一获取在相同输入上重复。存下结果再复用。声称赢了之前，先写出什么情况会使它失效。
   - `Indirection`。热路径上的贵工作，可以由更便宜的中间层吸收。索引用来代替扫描，队列把工作移出交互线程，句柄让更便宜的实现换进来。只有这一跳从关键路径上拿掉的比它自己加上的更多时，才加这一跳。
   - `Batching`。许多小操作各自支付固定开销，例如 RPC、查询、系统调用、绘制调用。把它们合并，让每一批只付一次开销。
   - `Redundancy`。等待卡在一个慢实例或一次慢尝试上。把工作复制出去，例如副本、对冲请求、推测执行，取最快的结果。轨迹必须显示等待占主导，并且系统还有余量。
   - `Lazy evaluation`。成本落在从未使用或尚未需要的结果上，例如启动路径上的急切初始化、渲染屏幕外的项。把工作推迟到第一次使用。
   - `Scheduling`。工作必须发生，但不必发生在交互的那一刻。把它挪到没人等待的地方：空闲回调、启动后的后台预热、用户到达前的预计算、帧提交后的清理。赢的是感受到的延迟，所以测量交互路径，不测量做完的总工作量。
3. 按轨迹计划修复。越过函数边界时，先走 [`architect`](architect.md#skill-architect)。把实现委托给子代理，使用你配置的 perf-issue 模型，默认 `grok-4.7-xhigh-fast`，`subagent_type` 用 "poteto-agent"。最难的改动改读 `hardest tasks`，默认 `claude-opus-5-5-max`。评审 diff。再抓一份修复后的轨迹。按 [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)，每一次尝试都先验证，再试下一次。
4. 解析并对比产物。JSON 进 sqlite，再做 diff。`Inconclusive` 或 wrong-surface 不是通过，要标出来。
5. 在 PR 里引用这次测量。
6. 运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。

### 回应

写基线数字、修复后数字、差值，以及产物路径。

### 陷阱与注意

不要用读源码代替测量。没有先跑，就不要声称性能上限。八个策略族不是清单。某一族只有在轨迹点名了它的信号时才试。`Elimination` 不能只靠分析器。`Caching` 在写出失效条件之前，不能声称已经赢了。`Indirection` 只有净减少关键路径时才加。`Redundancy` 要求等待占主导且系统有余量。`Scheduling` 测量的是交互路径，不是总工作量。`Inconclusive` 和 wrong-surface 不能算通过。

### 流程图

```flow 性能问题
start 开始
  stop 持续改进指标 | 改走 Hillclimb
step 采集基线 | control 技能取轨迹
step 用 how 接地 | 八族只作假设
step 按轨迹修改 | 改后再采轨迹
  alt 越过函数边界 | 先走 architect
step 解析并对比 | JSON 进 sqlite
  stop 结论不明 | 错误表面不算过
step 在 PR 引用 | 写出测量数字
step 打开 PR | 见 Opening a PR
end 结束
```

### 分步产出

1. 产出是一份基线轨迹。原文没有规定轨迹文件名。
2. 产出是落在轨迹信号上的假设。八个族本身不是八份交付物。原文没有规定文件名。
3. 产出是修复 diff，以及一份修复后的轨迹。越过函数边界时，先有 `architect` 的结果。
4. 产出是可查询的对比。原文写明把 JSON 放进 sqlite 再 diff。没有规定 sqlite 文件名。
5. 产出是 PR 正文里的测量引用。
6. 产出是按 Opening a PR 打开的 PR。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 打开通知抽屉要两秒以上。先在同一界面抓基线轨迹，再按测量改。不要只读源码。

下面这条来自原文 {{src:README.md}} 的例子。

```text
/poteto-mode a big list takes a second or two to load even though we virtualize.
run a cpu trace and tell me why.
```

### 失败、中止与含糊时

`Inconclusive` 或 wrong-surface 不是通过，要标出。这份剧本没有另写“不能复现”的分支。要对着一个指标持续改进时，不要在本剧本里循环，改走 Hillclimb。

### 调用的技能与脚本

- [`how`](how.md#skill-how)
- [`architect`](architect.md#skill-architect)，越过函数边界时先走
- [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- [Hillclimb](#playbook-hillclimb)，持续改进时改走
- control 技能属于另一个插件 `cursor-team-kit`
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本。对比用 sqlite，原文没有指定数据库文件名

## Hillclimb {#playbook-hillclimb}

原文：{{src:skills/poteto-mode/playbooks/hillclimb.md}}

> 指标和实验的完整性由你负责。一次只改一处并测量一次，然后保留或回退。

### 何时使用

对着一个目标，持续、科学地改进一件可测量的事。这是一个循环。一次性修复是 [Bug fix](#playbook-bug-fix) 或 [Perf issue](#playbook-perf-issue)。

核心纪律：一次一改，一次一测，保留或回退。不要把没测过的改动叠在一起。不要凭读代码声称胜利。这是 [`principle-prove-it-works`](principles.md#skill-principle-prove-it-works)。

### 运作方式

你监督并评审，把每一次尝试委托出去。

1. 选定指标之前，先把工作负载和结构落地。对目标运行 [`how`](how.md#skill-how)。写出确实能推动结果的工作负载维度：数据规模、历史、状态、并发。选一个能复现用户抱怨的用例。没有用例能复现时，先修复现，不要开始爬坡。然后固定一个指标、怎样算更好，以及一条可检查的停止谓词。谓词要把目标和尝试次数的下限配在一起，这样早到的幸运胜利不能结束本轮。原文给出的形状是 at least 50% better than baseline and at least 10 iterations，也就是至少比基线好 50%，并且至少迭代 10 次。用户给了数字就用用户的，否则先把数字说定。
2. 建立测量装置，证明它灵敏，然后冻结。这是 [`principle-build-the-lever`](principles.md#skill-principle-build-the-lever)。跑互相对照的真实工作负载，确认目标用例复现症状，较易的用例则按预期分开。装置分不出它们时，修改工作负载或指标。冻结之后，一条可重复的命令吐出指标，采样要足以压过噪声，用 N 次的中位数，不用单次运行。任何改动之前，记下基线指标，并记下回归门的一次绿色运行。回归门是必须继续通过的那些测试。
3. 通过 [`show-me-your-work`](personal.md#skill-show-me-your-work) 打开决策日志。本剧本规定的文件是 `decision.tsv`，每次尝试一行，列是 `id`、`hypothesis`、`change`、`before`、`after`、`delta`、`tests`、`verdict`（`kept` 或 `reverted`）、`note`。每次尝试前先读它。放在树外，并加入 gitignore。
4. 每条假设都落在第 1 步的结构模型上，点名一个具体机制。原文的例子是 defer X off the boot path because it blocks first paint，也就是把 X 挪出启动路径，因为它挡住了第一次绘制。不要写成“试试给什么加记忆化”。
5. 循环。每次迭代一条假设。
   - 把改动交给子代理，使用你配置的 hillclimb 模型，默认 `grok-4.7-xhigh-fast`，范围收紧。`subagent_type` 用 "poteto-agent"。最难的改动改读 `hardest tasks`，默认 `claude-opus-5-5-max`。你监督并评审 diff，而不是自己把 diff 打出来。这是 [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window)。有多条彼此独立的假设同时活着时，把它们并行派给子代理，每个占用自己的工作树。这是 [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)。
   - 用冻结的装置测改前和改后，并跑回归门。
   - 只有指标的移动超过噪声，并且回归门仍是绿的，才接受。否则把改动全部回退。可能有用的微调不保留。
   - 每个被接受的修复一次提交，只暂存你改过的文件，用 `git add <files>`，不要用 `-A`。无论保留还是回退，都写一行日志。
   - 每一次迭代都在下一次开始前有一次检查。这是 [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)。无人值守时，只从 [Autonomous run](playbooks-long.md#playbook-autonomous-run) 借用唤醒办法，不借用它的停止规则。唤醒用 Cursor 内建的 `/loop`。有事件可等时，派一个观察者子代理在事件发生时叫醒你，并用较长的按时间心跳作后备。没有事件时，用固定间隔心跳，间隔按结果值得再查一次来定。
6. 推过第一个平台期。停滞时，连续几次被拒之后，换一类假设，把接近成功的合在一起，重读源码，或在认定山已经爬完之前试更激进的做法。正确和简单优先于数字。破坏行为的胜利要回退。守住数字的简化要留下。这是 [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol)。
7. 谓词满足时停止，或者剩下的主意很边际、不值得其成本时停止。不要为了够到谓词而放宽它。便宜且还没试过的假设还在时，不要退出。卡住了就说出来，不要空转。
8. 运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。被接受的提交按落地顺序叠放。

> **解说（本书的解释，原文中没有）**
>
> 本剧本点名用 `show-me-your-work` 打开日志，同时又规定了文件名 `decision.tsv` 和上面这一套列，并且要求 gitignore。该技能自己的默认文件是 `decisions.tsv` 或 `.audit/<task-slug>.tsv`，列是 `ts`、`phase`、`decision`、`why`、`evidence`、`result`。原文没有写两套格式如何合并。执行本剧本时，每一次尝试按 Hillclimb 列出的文件名和列来记。技能还要求日志只追加、不改旧行。本剧本没有取消这一点。该技能的辅助脚本是 `skills/show-me-your-work/scripts/log.sh`，列与本剧本不同，不要拿它的默认表头替换 `decision.tsv`。

### 回应

写指标和目标，从基线到最终值以及百分比差值，跑了多少次迭代（保留几次、回退几次），每个被接受的修复各写一行，`decision.tsv` 的路径，以及若再推进一步你会试的最好主意。

### 陷阱与注意

不要叠没测过的改动。不要凭读代码声称胜利。可能有用的微调不保留。破坏行为的胜利要回退。不要为了够到谓词而放宽它。便宜的未试假设还在时不要退出。不要用 `-A` 暂存。无人值守时不要借用 Autonomous run 的停止规则。没有复现用例时不要开始爬坡。

### 流程图

```flow 指标爬坡
start 开始
step 定工作负载 | 再定指标和停止
  stop 复现不了 | 先修复现再爬坡
step 冻结测量具 | 中位数不是单次
step 打开决策日志 | 树外的 tsv
step 假设写明机制 | 禁止空泛尝试
step 一次一假设 | 过噪声才保留
  alt 多个独立假设 | 各占一个工作树
step 推过平台期 | 正确性高于数字
  back 6 | 再试一假设
step 谓词满足即停 | 不放宽谓词
  stop 已经卡住 | 说出来别空转
step 按序打开 PR | 只叠被接受的提交
end 结束
```

### 分步产出

1. 产出是一个指标、更好的方向、一条带尝试次数下限的停止谓词，以及一个能复现抱怨的用例。原文没有规定文件名。
2. 产出是冻结后的测量命令、基线数字，以及回归门的一次绿色运行。原文没有规定命令的文件名。
3. 产出是树外的 `decision.tsv`，列如上。它在 gitignore 里。
4. 产出是点名具体机制的假设。原文没有规定文件名。
5. 每一次迭代的产出是一次改前改后的测量、回归门结果，以及日志里的一行。接受时还有一次只含所改文件的提交。回退时改动全部撤销，仍然有日志行。
6. 产出是平台期之后的下一次尝试，或一次回退。破坏行为的胜利被回退。守住数字的简化被留下。
7. 产出是停止，或你说出来的卡住。原文没有规定文件名。
8. 产出是按落地顺序叠放的、只含被接受提交的 PR。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 把通知列表的首屏时间相对基线至少再降 30%，并且至少迭代 8 次。一次改一处。保留或回退都写入决策日志。

原文 {{src:docs/guide/05-build-and-clean.md}} 没有给一条完整提示。它要求你给出指标、目标和尝试次数的下限。剧本里的形状例子是至少比基线好 50%，并且至少 10 次迭代。

### 失败、中止与含糊时

没有用例能复现抱怨时，先修复现，不要爬坡。测量装置分不出目标用例和较易用例时，修改工作负载或指标，不要开始改产品代码。指标没有超过噪声，或回归门不是绿的，就把这次改动全部回退。卡住了就说出来，不要空转。不要放宽谓词来宣布达到。连续拒绝之后仍要换类、合并接近成功的尝试、重读源码或试更激进的做法，然后才能认定山已经爬完。

### 调用的技能与脚本

- [`how`](how.md#skill-how)
- [`show-me-your-work`](personal.md#skill-show-me-your-work)
- [`principle-prove-it-works`](principles.md#skill-principle-prove-it-works)
- [`principle-build-the-lever`](principles.md#skill-principle-build-the-lever)
- [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window)
- [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)
- [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)
- [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol)
- [Autonomous run](playbooks-long.md#playbook-autonomous-run)，只借唤醒
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本。`show-me-your-work` 自带的 `scripts/log.sh` 见解说，不要用它替换本剧本的列

## Runtime forensics {#playbook-runtime-forensics}

原文：{{src:skills/poteto-mode/playbooks/runtime-forensics.md}}

> 诊断由你负责。给活进程加仪器，不凭源码空谈。交付的是带引用的诊断，不是修复。

### 何时使用

诊断运行时症状：泄漏、空闲时 CPU 空转、画面故障。依据是活的仪器，不是事后才递来的文件。交付诊断，不交付修复。采集已经在手里时，走 [Trace forensics](#playbook-trace-forensics)。

### 运作方式

1. 在匹配的表面上通过 control 技能抓活信号。空转的进程抓 CPU 剖面，泄漏抓堆快照，画面故障抓 `CDP` 轨迹。`CDP` 是 Chrome DevTools Protocol。要真实产物，不要猜测。control 技能属于另一个插件 `cursor-team-kit`。命令行和 TUI 用 `control-cli`，浏览器、Electron 和 Web 界面用 `control-ui`。
2. 把产物收到要害证据：热路径上的函数，从泄漏对象到 `GC root` 的保留链，或没有输入仍在触发的循环。大产物交给子代理解析。这是 [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window)。缩过的发现留在主线程。
3. 相信机制之前先证明它。在运行中的进程上用 `CDP` eval 注入仪器，或不重载就热修活代码，廉价地确认假设。
4. 把发现映射回源码：文件、符号，以及分配或调度的那一行。
5. 吞吐检查点保持一行。原文固定为 `throughput checkpoint: n/a, read-only forensics`。

没有人要求时不做修复。原因清楚之后，交回 [Bug fix](#playbook-bug-fix) 或 [Perf issue](#playbook-perf-issue)。

### 回应

写抓到的信号、缩过的发现、你如何证明机制、源码位置、产物路径。没有人要求就不写修复。

### 陷阱与注意

不要凭源码推测。不要用猜测代替真实产物。大产物不要堆在主线程里。没有人要求时不要顺手修复。

### 流程图

```flow 运行时取证
start 开始
step 采集活信号 | 要真实产物
step 缩到要害 | 热路径或保留链
step 先证明机制 | 活进程上确认
step 映射回源码 | 文件符号与行号
step 写检查点 | 只读取证一行
  stop 未要求就不修 | 交回修复或性能
end 结束
```

### 分步产出

1. 产出是一份活信号产物：CPU 剖面、堆快照或 `CDP` 轨迹。原文没有规定文件名。回应里要给出产物路径。
2. 产出是留在主线程里的那条缩过的发现。大产物的解析发生在子代理里。
3. 产出是在活进程上确认过的机制。原文没有规定仪器文件名。
4. 产出是文件、符号，以及分配或调度的行。
5. 产出是一行吞吐检查点，文字就是上节那句英文。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 页面闲置时 CPU 仍维持在高位。请对活进程采样并给出诊断。先不要改代码。

### 失败、中止与含糊时

这份剧本没有单独的失败分支。原因清楚之后把诊断交回，改走 Bug fix 或 Perf issue。没有人要求就不修复。

### 调用的技能与脚本

- [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window)
- control 技能属于另一个插件 `cursor-team-kit`
- 原因清楚后改走 [Bug fix](#playbook-bug-fix) 或 [Perf issue](#playbook-perf-issue)
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Trace forensics {#playbook-trace-forensics}

原文：{{src:skills/poteto-mode/playbooks/trace-forensics.md}}

> 诊断从已经拿到的产物里来。加载它，整理它，收窄到原因，再归因到源码。

### 何时使用

诊断事后交给你的性能分析产物，例如 `cpuprofile`、trace、`spindump`、堆快照。交付诊断，不交付修复。与 [Runtime forensics](#playbook-runtime-forensics) 不同：那里给活进程加仪器。这里采集已经存在。产物是固定数据集，读它，不要重跑它。

工具保持通用，好让剧本可以换项目使用。`cpuprofile` 和 `.json.gz` 用 DevTools 或轨迹解析器。`spindump` 用文本编辑器。堆快照用你的堆工具。

### 运作方式

1. 辨认格式，并用对的工具加载。大产物交给子代理解析，这是 [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window)。缩过的发现留在主线程。
2. 把原始产物变成可以查询的形式。把轨迹或堆快照倒进 sqlite，每个样本、栈帧或节点一行。先到达可查询的形状，再去读。
3. 收窄到原因。查询占用时间最多的帧，沿调用树走到热路径。泄漏则沿着保留链，从泄漏对象走到 `GC root`。`spindump` 则找到卡在 CPU 上或被阻塞的线程，以及它的等待原因。
4. 归因到源码。用产物自带的符号，把热帧映射到文件、符号和行。没有源码映射的帧还不是诊断。把符号解出来，或者明白说出产物里没有符号。
5. 手里有成对采集时，用它确认。对一份之前的产物和一份之后的产物做 diff。没有成对采集时，把发现标成这份产物所能支持的最强假设，不是已确认的原因。
6. 交回带引用的诊断。没有人要求就不修复。原因清楚之后，路由到 [Bug fix](#playbook-bug-fix) 或 [Perf issue](#playbook-perf-issue)。吞吐检查点保持一行，原文固定为 `throughput checkpoint: n/a, read-only forensics`。

### 回应

写产物和格式、缩过的发现、源码位置、产物路径，以及成对采集是否确认了它。

### 陷阱与注意

不要重跑这份固定产物。不要在还不能查询时就通读。没有源码映射的帧不能当成诊断。没有成对采集时，不能把假设写成已确认的原因。没有人要求时不要修复。

### 流程图

```flow 轨迹取证
start 开始
step 辨认格式并加载 | 不要重新采集
step 倒进 sqlite | 能查询再阅读
step 收窄到原因 | 热路径或等待
step 归因到源码 | 用产物自带符号
  stop 没有源码映射 | 还不能当诊断
step 有成对采集就对比 | 没有就标成假设
step 交出带引用的诊断 | 检查点写一行
  stop 原因已经清楚 | 改走修复或性能
end 结束
```

### 分步产出

1. 产出是已加载的产物，以及它的格式判断。大产物的解析在子代理里，缩过的发现在主线程。
2. 产出是 sqlite 里的可查询形状，每个样本、栈帧或节点一行。原文没有规定数据库文件名。
3. 产出是热路径、保留链，或卡住的线程及其等待原因。
4. 产出是文件、符号和行。没有符号时，产出是一句明白的话：产物不带符号。
5. 有成对采集时，产出是前后 diff。没有时，产出是标成最强假设的发现。
6. 产出是带引用的诊断，加上一行 `throughput checkpoint: n/a, read-only forensics`。没有人要求时不含修复。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 我已经放了一份 `CPU.cpuprofile`。请只读这份产物，找出热路径并对应到源码。不要重新跑采集。

### 失败、中止与含糊时

没有源码映射时，还不是诊断。解符号，或明白说产物不带符号。没有成对采集时，发现只是这份产物所能支持的最强假设，不是已确认原因。这份剧本没有把“不能复现”写成分支，因为采集已经在手里，而且禁止重跑。

### 调用的技能与脚本

- [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window)。原文在这里写成 `principle-guard-the-context-window`，与运行时取证点名的是同一个原则技能
- 原因清楚后改走 [Bug fix](#playbook-bug-fix) 或 [Perf issue](#playbook-perf-issue)
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本。sqlite 是步骤要求的形状，不是一份具名脚本

## Feature {#playbook-feature}

原文：{{src:skills/poteto-mode/playbooks/feature.md}}

> 设计由你负责。实现委托出去。你留在主导位置上计划、评审和验证。

### 何时使用

新的或改变了的行为，从已经命名的数据形状建起来。数据形状是逻辑动笔之前就要叫出名字的结构。大范围、横切，或人离开后才回来看的工作，即使本剧本也能套上，仍走 [`figure-it-out`](arena-swarm.md#skill-figure-it-out)。

### 运作方式

1. 对受影响的子系统走 [`how`](how.md#skill-how)。
2. 走 [`architect`](architect.md#skill-architect)，并行探索设计。
3. 把吞吐检查点写成四条待办。某一维确实不适用时，例如只有单文件、没有扇出，仍保留这条，写成 `n/a: <reason>`，不要删掉。
   - **Blocking first steps.** 门在扇出之前跑。
   - **Independent workstreams.** 互不相交的文件、服务或层可以并行。共享写入要串行。
   - **Shared mutable state.** 默认把目标拆开。这是 [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)。只有真的不变量才串行。
   - **Smallest safe decomposition.** 若一个工作者最好，写出为什么。
4. 把写代码委托给子代理，使用你配置的 feature 模型，默认 `grok-4.7-xhigh-fast`，`subagent_type` 用 "poteto-agent"。最难的改动改读 `hardest tasks`，默认 `claude-opus-5-5-max`。范围要具体：文件路径，已命名的数据形状及其组织方式，以及成功标准。组织方式按 [`principle-model-the-domain`](principles.md#skill-principle-model-the-domain)，在子代理写逻辑之前选定。用状态机，不用散落的布尔值。用表或注册表，不用分支。用有类型的模型，不用在多个文件里重复同一种形状假设。实现若有多种合法形状，例如错误处理、抽象层、测试结构，改走 [`arena`](arena-swarm.md#skill-arena)，让候选把替代方案摆出来，由交叉裁判守住挑选。这是强制的。不允许用 `skip:` 加理由逃掉。[`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol) 不能覆盖它。收益是评审分离，不是少写几行。被禁止再派生子代理的那个子代理，用同样的评审分离自己持有 diff，也算满足。不要回复一句“在等”，然后干等嵌套代理。注释按模式的 Comments：只保留代码看不出来的原因。验证或测试脚本不要写分阶段旁白，例如 `// Phase 1: add cards`。用断言或日志字符串记下这一步，例如 `assert(ok, 'persisted across restart')`。这适用于你产出的每个文件，包括被委托者的 diff。改动要像外科手术。从上游派生的文件，先重新对照源再改。共享原语的改进要移植到全部消费者，并逐个验证。勤提交。
5. 在匹配的表面上验证。`Inconclusive` 或 wrong-surface 不是通过，要标出来。若这一步落在界面、IDE 或命令行上，匹配的 control 技能属于另一个插件 `cursor-team-kit`。
6. 用 rebase 收成小而有序的提交。后续工作叠上去。按 [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)，每一小段都先构建、验证、提交，再做下一段。
7. 设计有争议时，交付前走 [`interrogate`](interrogate.md#skill-interrogate)。
8. 运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。

跟代码绑在一起的工作，例如一个功能、一次迁移，交给单一所有者，检查点写在它的任务里。阻塞阶段结束之后，由这个所有者在内部再扇出。父级扇出只用于能产出独立产物的切片，例如审计、跨子系统的调查、相互竞争的实验。阶段边界上重写检查点。重新派一个新的所有者，不要把被打断的代理串成链。

`arena` 的候选模型不沿用 feature 的默认模型。按该技能的 Phase A，读取 `~/.cursor/rules/pstack-models.mdc` 的 `arena runners` 行。该行缺失时，默认各派一个 `claude-opus-5-5-max`、`gpt-5.6-sol-max`、`grok-4.7-xhigh-fast`。Phase B 在同一条消息里把全部候选派出去，`run_in_background: true`，各自交出产物和一段简短理由。Phase C 在候选都完成之后，派一个只读交叉裁判。不要在候选还在写的时候派裁判。

### 回应

写你建成了什么，你选了什么以及为什么，吞吐检查点，尚未关闭的决定。设计替代方案用表。

### 陷阱与注意

吞吐检查点的某一维不适用时，不要删掉那条，写成 `n/a: <reason>`。多种合法形状时，不允许用 `skip:` 加理由逃开 `arena`。Laziness Protocol 不能覆盖这次强制。不要回复“在等”然后干等嵌套代理。`Inconclusive` 和 wrong-surface 不能算通过。不要把被打断的代理串成链。父级扇出不用于跟代码绑在一起的单一功能或单次迁移。

### 流程图

```flow 功能实现
start 开始
step 走 how | 看受影响的子系统
step 走 architect | 并行探索设计
step 四项检查点 | 不适用也保留
step 委托实现 | 多种形状走 arena
  alt 多种合法形状 | 交给 arena
step 同表面验证 | 标出结论不明
  stop 错误表面 | 不算通过
step 收成小提交 | 每段先验证
step 设计若有争议 | 先走 interrogate
  alt 没有争议 | 接着打开 PR
step 打开 PR | 见 Opening a PR
end 结束
```

### 分步产出

1. 这一步的产出就是该步的结果：受影响子系统已经过 `how`。原文没有规定文件名。
2. 产出是 `architect` 的并行设计探索。原文没有在本剧本里规定设计文件名。
3. 产出是四条待办。不适用的那条仍在，文字含 `n/a:` 和理由。
4. 产出是按具体范围写成的代码，或 `arena` 选出的底稿。注释遵守 Comments。共享原语的改进已经移植到每个消费者并逐个验证。提交是勤做的。
5. 产出是匹配表面上的验证结果。不通过时标成 `Inconclusive` 或 wrong-surface。
6. 产出是小而有序的提交，以及叠上去的后续工作。每一段在下一段之前已经验证。
7. 设计有争议时，产出是 `interrogate` 的结果。没有争议时，这一步没有额外产物。
8. 产出是按 Opening a PR 打开的 PR。回应里还要有选择理由、吞吐检查点、未关闭的决定，以及替代方案的表。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 给发票增加“标记为已导出”。先命名数据形状再实现，并在同一界面验证。文本导出的字节保持不变。

下面这条来自原文 {{src:README.md}} 的例子。

```text
/poteto-mode build a small feature behind a feature flag. verify it really works.
```

### 失败、中止与含糊时

`Inconclusive` 或 wrong-surface 不是通过，要标出。检查点某一维不适用时，用 `n/a: <reason>` 保留该条，这不是失败。多种合法形状时，禁止用跳过理由逃开 `arena`。这份剧本没有把“不能复现”写成分支。

### 调用的技能与脚本

- [`how`](how.md#skill-how)
- [`architect`](architect.md#skill-architect)
- [`arena`](arena-swarm.md#skill-arena)，多种合法形状时改为走它
- [`interrogate`](interrogate.md#skill-interrogate)，设计有争议时，交付前走
- [`figure-it-out`](arena-swarm.md#skill-figure-it-out)，大范围或人离开后才看的工作改走
- [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)
- [`principle-model-the-domain`](principles.md#skill-principle-model-the-domain)
- [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol)，不能用来逃开 `arena`
- [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- 匹配表面上的 control 技能属于另一个插件 `cursor-team-kit`
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Refactoring {#playbook-refactoring}

原文：{{src:skills/poteto-mode/playbooks/refactoring.md}}

> 契约由你负责。结构可以变。行为不变。

### 何时使用

保持行为不变的结构或形状改动，例如重命名、提取、内联、去重、移动。Feature 增加行为。Bug fix 纠正行为。本剧本是聚焦到中等规模的改动。大的或横切的结构工作属于 [`figure-it-out`](arena-swarm.md#skill-figure-it-out)。

清理中若露出缺失的功能或真正的缺陷，把它拆出去，先对着钉住的契约交付结构改动。允许重设计，但要叫出名字，并改路由到 [Feature](#playbook-feature)。

### 运作方式

1. 先钉住行为契约。对受影响的子系统运行 [`how`](how.md#skill-how)，弄清契约，然后写刻画测试、快照，或等价性检查装置，在任何结构移动之前抓住当前行为。这块没有覆盖时，先写这根钉子，再碰结构。类型检查和 lint 不是钉子。
2. 按 [`principle-model-the-domain`](principles.md#skill-principle-model-the-domain) 点名代码缺的那种结构。形状已经清楚而且局部时，乏味的代码留着。重塑必须删掉分支或不合法状态，不是再加一层间接。
3. 点名目标形状。写出假如今天来建，模块布局、类型和调用图应该是什么样。这是 [`principle-foundational-thinking`](principles.md#skill-principle-foundational-thinking) 和 [`principle-redesign-from-first-principles`](principles.md#skill-principle-redesign-from-first-principles)。目标越过函数边界时，在搬动之前用 [`architect`](architect.md#skill-architect) 并行探索这个形状。
4. 先减再加。引入新形状之前，删掉死代码，折掉只有一个调用者的包装，去掉重复的校验器，移除孤儿引用。这是 [`principle-subtract-before-you-add`](principles.md#skill-principle-subtract-before-you-add)。到达目标形状的最小改动才提交。这是 [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol)。可能有用的推测性清理要回退。
5. 以保持行为的小步来搬，每一步都让钉子保持绿色。API 重塑时，在同一波里迁完全部调用者并删掉旧 API。这是 [`principle-migrate-callers-then-delete-legacy-apis`](principles.md#skill-principle-migrate-callers-then-delete-legacy-apis)。不要兼容垫片，不要新旧路径并行。每一个重命名都对照真实文件抽查。重命名会静默漏掉字符串、散文和反向引用里的用法。机械编辑委托给子代理，使用你配置的 refactoring 模型，默认 `grok-4.7-xhigh-fast`，`subagent_type` 用 "poteto-agent"。范围要具体：文件路径、被移动的名字、必须守住的行为。最难的改动改读 `hardest tasks`，默认 `claude-opus-5-5-max`。
6. 在真实产物上证明行为没变。能编译不算证明。这是 [`principle-prove-it-works`](principles.md#skill-principle-prove-it-works)。较大的重塑要做等价性检查：一段对比新旧输出的脚本，一段把录下的基线重放到新代码上的过程，或通过相关 control 技能在匹配表面上做一次冒烟运行。这段脚本的文件名原文没有规定。control 技能属于另一个插件 `cursor-team-kit`。命令行和 TUI 用 `control-cli`，浏览器、Electron 和 Web 界面用 `control-ui`。
7. 确认这次改动值得留。成功的度量是读者负担下降。这是 [`principle-minimize-reader-load`](principles.md#skill-principle-minimize-reader-load)。diff 若没有在某处降低读者负担，就回退。
8. 用 rebase 收成小而有序的提交。先是一次减法提交，然后是重塑，然后是后续清理。用 [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units) 来整形，使每一段保持行为的切片在下一段之前仍是绿的。运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。

### 回应

写改变了的结构、你拿它去对照的那根钉子、等价性证明、读者负担的变化、什么提交了、什么被回退了。没有新行为。

### 陷阱与注意

类型检查和 lint 不能当钉子。不要加间接来冒充重塑。重塑要删掉分支或不合法状态。不要兼容垫片，不要新旧路径并行。重命名会漏掉字符串、散文和反向引用。能编译不是行为未变的证明。可能有用的推测性清理要回退。读者负担没有下降就回退。清理中露出的功能或缺陷不要混进这次结构提交。重设计要改名并改走 Feature，不要假装仍是本剧本。

### 流程图

```flow 重构结构
start 开始
  stop 改动又大又横切 | 走 figure-it-out
  alt 这是重设计 | 命名后走 Feature
step 钉住行为 | 没有覆盖先钉住
step 点名缺失结构 | 按领域来建模
step 点名目标形状 | 越界先 architect
step 先减再加 | 推测清理要回退
step 小步保持行为 | 机械编辑可委托
step 在真实产物上证明 | 编译通过不够
step 读者负担下降 | 否则回退
  stop 负担没有下降 | 回退这次改动
step 小提交后开 PR | 先减再整形
end 结束
```

### 分步产出

1. 产出是一根钉子：刻画测试、快照，或等价性检查装置。原文没有规定文件名。
2. 产出是你点名的、代码所缺的那种结构。原文没有规定文件名。
3. 产出是目标形状：模块布局、类型和调用图。越过函数边界时，先有 `architect` 的探索。
4. 产出是删掉死代码、单调用者包装、重复校验和孤儿引用之后的树。推测性清理不留在树上。
5. 产出是保持钉子为绿的小步搬移。API 重塑时，同一波里调用者已迁完，旧 API 已删。机械编辑来自范围具体的子代理。
6. 产出是真实产物上的行为未变证明。较大重塑还有新旧输出对比、基线重放，或匹配表面上的冒烟运行。
7. 产出是读者负担下降的判断。没有下降则这次 diff 被回退。
8. 产出是有序的小提交：减法，然后重塑，然后后续清理，以及按 Opening a PR 打开的 PR。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 把三处价格分支收成一张表。行为必须保持不变。先录下现在的输出，再搬结构，并证明输出没变。

下面这条来自原文 {{src:docs/guide/05-build-and-clean.md}}，不是本书自拟。

```text
/poteto-mode move parsing into one module, zero behavior change. record the current output first and prove it's unchanged after.
```

### 失败、中止与含糊时

清理露出缺失功能或真正缺陷时，拆出去，先对着钉子交付结构改动。重设计要命名并改走 Feature。推测性清理回退。读者负担没有下降就回退。这份剧本没有把 `Inconclusive` 或 wrong-surface 写成验证失败时的用词。证明落在真实产物上。能编译不算通过。

### 调用的技能与脚本

- [`how`](how.md#skill-how)
- [`architect`](architect.md#skill-architect)，目标越过函数边界时，搬动前走
- [`figure-it-out`](arena-swarm.md#skill-figure-it-out)，大的或横切的结构工作改走
- [`principle-model-the-domain`](principles.md#skill-principle-model-the-domain)
- [`principle-foundational-thinking`](principles.md#skill-principle-foundational-thinking)
- [`principle-redesign-from-first-principles`](principles.md#skill-principle-redesign-from-first-principles)
- [`principle-subtract-before-you-add`](principles.md#skill-principle-subtract-before-you-add)
- [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol)
- [`principle-migrate-callers-then-delete-legacy-apis`](principles.md#skill-principle-migrate-callers-then-delete-legacy-apis)
- [`principle-prove-it-works`](principles.md#skill-principle-prove-it-works)
- [`principle-minimize-reader-load`](principles.md#skill-principle-minimize-reader-load)
- [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units)
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- [Feature](#playbook-feature)，重设计时改走
- 冒烟运行用的 control 技能属于另一个插件 `cursor-team-kit`
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本。等价性对比脚本的文件名原文没有规定

## Prototype {#playbook-prototype}

原文：{{src:skills/poteto-mode/playbooks/prototype.md}}

> 设计决定由你负责，代码不由你负责。原型是用完即弃的仪器。真正的构建走 Feature。

### 何时使用

用完即弃的草图，用来廉价地做一个设计决定或行为决定，或用观察来了结一个经验性的分叉，而不是去问人。模式清单里的触发说法包括 prototype、mock it up、try this layout、sketch it to decide。

这是唯一一份把 Laziness Protocol 的“最小改动”和验证门槛反过来的剧本。速度优先于打磨。代码质量不计。不做规划。严格性在于廉价地选对设计。提出用户没要的变体。扔掉一种做法，再试另一种。

### 运作方式

1. 框定这个原型要做的决定：哪种布局、哪种交互、哪种密度。若是经验性分叉，则是哪种行为、哪种时序或哪种做法。没有决定就没有原型，改走 [Feature](#playbook-feature)。
2. 设计空间还开放时，收集参照。搜索已有做法，把主题、配色和布局收成一份 `moodboard`，让用户在建造前选定方向。方向已经定了就跳过。
3. 在与生产源码分开的隔离草稿目录里做用完即弃的东西。视觉决定用普通的 `HTML`/`CSS`/`JS`，或能把想法渲染出来的最轻栈，依赖走 CDN，开发服务器带热重载。行为或时序决定用能把问题跑起来的最小脚本。不要生产框架，不要测试，不要抽象。
4. 比较替代方案时，把它们放在一个切换器后面，用按钮或按键，每个变体有标签。这是把 [`principle-exhaust-the-design-space`](principles.md#skill-principle-exhaust-the-design-space) 做得便宜。
5. 在匹配的表面上验证。视觉决定：通过 control 技能给每个变体截图，并驱动交互。行为或时序决定：用日志记下时间、打印输出，或看着渲染，观察你正在决定的那件事。这里的测试是观察，不是断言。control 技能属于另一个插件 `cursor-team-kit`。命令行和 TUI 用 `control-cli`，浏览器、Electron 和 Web 界面用 `control-ui`。
6. 摆出替代方案、权衡和你的建议。产出是决定加上用完即弃的产物，不是可提交的代码。把选定的方向交给 [Feature](#playbook-feature)。形状问题交给 [`architect`](architect.md#skill-architect)，再做真正的构建。

### 回应

写探索过的变体、证据（视觉决定用截图，行为决定用观察到的输出或时间）、权衡、你的建议，以及草稿路径。明白说出原型是用完即弃的。

### 陷阱与注意

没有要做的决定，就不要做原型。不要用生产框架、测试或抽象。不要把原型当可提交代码。方向已定时，跳过参照收集。代码质量不计，不做规划。这只在本剧本里把“最小改动”和验证门槛反过来。

> **解说（本书的解释，原文中没有）**
>
> 原文 README 的例子让两个代理各做一个原型。剧本步骤写的是在同一个切换器后面做多个变体。两处都在原文里。步骤没有要求必须派出子代理。

### 流程图

```flow 原型决策
start 开始
step 框定决定 | 没有决定不做
  stop 没有决定 | 改走 Feature
step 收集参照 | 方向已定则跳过
  alt 方向已定 | 跳过这一步
step 隔离目录建造 | 生产代码不放这里
step 一个切换器 | 变体都要有标签
step 在匹配表面观察 | 观察就是测试
step 交出决定 | 真构建走 Feature
end 结束
```

### 分步产出

1. 产出是这个原型要做的那一个决定。没有决定时，产出是改走 Feature。
2. 方向未定时，产出是一份 `moodboard`，以及用户选定的方向。方向已定时，这一步跳过，没有这份参照。
3. 产出是隔离草稿目录里的用完即弃代码。原文没有规定目录名。回应里要给出草稿路径。
4. 比较替代方案时，产出是一个切换器，每个变体有标签。
5. 视觉决定的产出是每个变体的截图，以及你驱动过的交互。行为或时序决定的产出是日志里的时间、打印出的输出，或你看到的渲染。原文没有规定截图文件名。
6. 产出是决定、权衡、建议，以及用完即弃的产物。真正的构建不在本剧本里完成。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 做两个用完即弃的结账摘要布局，放在隔离目录里，用切换器对比。先不要写进生产代码。

下面这条来自原文 {{src:README.md}} 的例子。

```text
/poteto-mode build two prototypes of the markdown renderer so we can compare.
spawn an agent for each.
```

### 失败、中止与含糊时

没有决定时，不做原型，改走 Feature。方向已定时，跳过收集参照。这份剧本没有把 `Inconclusive` 或 wrong-surface 写成失败用词。验证是在匹配表面上的观察。观察代替断言。

### 调用的技能与脚本

- [`principle-exhaust-the-design-space`](principles.md#skill-principle-exhaust-the-design-space)
- [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol)，本剧本把它的最小改动反过来
- [Feature](#playbook-feature)，没有决定时改走，选定方向后也把真构建交给它
- [`architect`](architect.md#skill-architect)，选定方向后若要定形状，交给它
- control 技能属于另一个插件 `cursor-team-kit`
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Visual parity {#playbook-visual-parity}

原文：{{src:skills/poteto-mode/playbooks/visual-parity.md}}

> 像素级等价由你负责。基线就是规格。你不去碰它。等价用图像 diff 核对，不靠肉眼。

### 何时使用

像素级精确的界面等价。匹配两种实现，或迁移一套样式系统。

### 运作方式

1. 任何迁移之前先建立基线。做一个视觉回归装置，为当前组件的各个状态截图。匹配两种实现时，把目标也放进去。没有基线，就不能声称对齐。这是阻塞性的前提，不是事后补做。
2. 反捷径条款要说出来并守住：不改装置，不篡改基线，不为了让 diff 通过而重组组件。基线看起来错了，就停下并询问，不要编辑它。
3. 一次迁移一个组件。跨工作树并行，一个组件一个所有者。这是 [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)。共享原语作为阻塞阶段先迁移。
4. 通过 control 技能，在匹配的表面上用图像 diff 对照该组件的基线。这个技能属于另一个插件 `cursor-team-kit`。命令行和 TUI 用 `control-cli`，浏览器、Electron 和 Web 界面用 `control-ui`。非零 diff 就是失败。追查像素差值。每个组件用 `/loop`，直到 diff 为零。
5. 按组件，或按安全的批次，运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。

### 回应

写迁了哪些组件、每个的 diff 结果、基线装置的位置，以及还剩什么。

### 陷阱与注意

没有基线就不能声称对齐。不改装置，不篡改基线，不为了通过 diff 而重组组件。基线看起来错了，不要编辑它。非零 diff 是失败。不要靠肉眼宣布等价。

> **解说（本书的解释，原文中没有）**
>
> 原文 README 的视觉对齐例子写的是复现并修到匹配。剧本步骤是先建基线、守住反捷径、一次迁一个组件、用图像 diff 验到零，再按组件或安全批次开 PR。执行时以步骤为准。

### 流程图

```flow 像素对齐
start 开始
step 先建基线 | 没有基线不声称
step 守住反捷径 | 基线错了就停下
  stop 基线看起来错 | 停下并询问
step 一次迁一个 | 共享原语先迁
step 图像 diff | 非零即失败
  alt 差分不为零 | 用 loop 直到为零
step 按批打开 PR | 组件或安全批次
end 结束
```

### 分步产出

1. 产出是视觉回归装置，以及当前组件各状态的基线截图。匹配两种实现时，还包括目标。原文没有规定装置的目录名。回应里要给出装置位置。
2. 产出是守住的反捷径。基线看起来错时，产出是一次停下并询问，基线未被编辑。
3. 产出是迁完的组件。共享原语已经作为阻塞阶段先迁完。并行时每个组件有自己的所有者和工作树。
4. 产出是每个组件的图像 diff。通过的标准是差分为零。
5. 产出是按组件或按安全批次打开的 PR，以及还没迁的部分。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 把旧按钮样式迁到新令牌。先为现有组件的各状态截基线，再用图像 diff 对齐。不要改基线。

下面这条来自原文 {{src:README.md}} 的例子。

```text
/poteto-mode the row spacing is too tall when this flag is on. the second image
is correct. repro and fix until it matches.
```

### 失败、中止与含糊时

基线看起来错时，停下并询问，不要改基线。非零 diff 是失败，追查像素差值，用 `/loop` 直到为零。没有基线时，不能声称对齐，先补基线，这不是事后跟进。这份剧本没有使用 `Inconclusive` 这个词。

### 调用的技能与脚本

- [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- control 技能属于另一个插件 `cursor-team-kit`
- 每个组件用 Cursor 内建的 `/loop`，直到 diff 为零
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Authoring or modifying a skill {#playbook-authoring-a-skill}

原文：{{src:skills/poteto-mode/playbooks/authoring-a-skill.md}}

> 技能的口气由你负责。

### 何时使用

编写或修改一份 `SKILL.md`。

### 运作方式

1. 使用 `create-skill`。它是 Cursor 内建的，用来编写 `SKILL.md`，不是 pstack 里的一章。
2. 校验技能：前置信息里有 `name` 和 `description`，引用的文件存在，跨技能链接能解析。
3. 内容是结构性的，才写测试用例。内容主观则跳过。
4. 运行 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。

拿不准就删。只保留会改变一个决定的散文。告诉它去做那件事，把理由省掉。只有少了理由这条就会让人困惑时，才解释。口气配得上范围。按 [`principle-encode-lessons-in-structure`](principles.md#skill-principle-encode-lessons-in-structure)，指向结构性来源，例如类型、README、配置。把工作委托给其他技能时写出路径，不要把它们的话再讲一遍。你反复撞上、但还没被记下来的工作流，就提议一个新技能。

原文 {{src:docs/guide/09-make-it-yours.md}} 写明，面向代理的散文比面向人的散文门槛更高，因为一句没有帮助的话会变成以后某个代理要遵守的指示。不要徒手写 `SKILL.md`，让本剧本守住这道门槛。任务做到一半发现技能坏了时，模式的不可协商项要求在它自己的 PR 里修，不要堵住当前任务，也不要静默绕过去。

### 回应

写技能摘要、关键设计决定、校验笔记。

### 陷阱与注意

拿不准就删。不要保留不改变决定的散文。不要先讲理由，除非少了理由这条就会让人困惑。不要把其他技能的内容再讲一遍，改为给出路径。主观内容不要写测试用例。不要徒手写 `SKILL.md`。不要把技能修理混进当前任务的同一份 PR。

### 流程图

```flow 编写技能
start 开始
step 用 create-skill | Cursor 的内建
step 校验前置信息 | 文件和链接都在
step 结构才写用例 | 主观内容跳过
  alt 内容主观 | 跳过测试用例
step 打开 PR | 见 Opening a PR
end 结束
```

### 分步产出

1. 产出是一份由 Cursor 内建 `create-skill` 协助写成的 `SKILL.md`。原文没有规定目录名以外的文件名。技能文件本身就是 `SKILL.md`。
2. 产出是校验笔记：`name` 和 `description` 都在，引用的文件存在，跨技能链接能解析。
3. 结构性内容的产出是测试用例。主观内容则这一步跳过，没有用例。
4. 产出是按 Opening a PR 打开的 PR。回应里还有技能摘要和关键设计决定。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 新增一个技能，要求改配置前先读 `config.schema.json`。只保留会改变决定的句子。

下面这条来自原文 {{src:docs/guide/09-make-it-yours.md}}，不是本书自拟。

```text
/poteto-mode write a skill for verifying database migrations in this repo
```

### 失败、中止与含糊时

测试用例只在内容结构性时才写。内容主观时跳过，这是原文写明的 skip。拿不准就删句子，不是删掉整个任务。这份剧本没有不能复现、结论不明或错误表面的分支。

### 调用的技能与脚本

- `create-skill`，Cursor 内建，本书不设章节
- [`principle-encode-lessons-in-structure`](principles.md#skill-principle-encode-lessons-in-structure)
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本

## Eval {#playbook-eval}

原文：{{src:skills/poteto-mode/playbooks/eval.md}}

> 实验设计由你负责。先计划，再蒙住，然后运行，最后综合。

### 何时使用

在推广之前，测试一份技能、一种结构或一处提示改动如何影响代理行为。原文 {{src:docs/guide/09-make-it-yours.md}} 把失败模式称为观察者效应：知道自己正在被评估的代理会表现得不一样。

### 运作方式

蒙住的不可协商项如下。步骤假定这些已经守住。

- 候选能看见的任何目录、文件或提示里，都不要出现这些词：`eval`、`test`、`judge`、`experiment`、`rubric`、`score`、`compare`、`benchmark`、`candidate`、`arena`。
- 候选提示看起来要像一条自然的用户请求。写出目标，不写元信息。
- 不要用会诱发它交代链路的提示。不要让候选列出它用了哪些技能、原则或文件。泛泛地要设计笔记，再从代码形状给“有没有跟着链路走”打分，不从自我报告打分。
- 消毒目录名和 slug。用用户可能起的、像项目的名字。
- 不要告诉候选还有别的候选。
- 裁判可以知道自己在裁判，但只能按消毒后的标签看输出，永远不看模型名。
- 比较两个变体时，一个裁判在同一次、同一把尺子上给两套输出打分，并且不知道每一套来自哪一个变体。

步骤：

1. **Frame.** 写出在测哪个变体，以及怎样的行为算成功。只给裁判写量规，3 到 6 条具体标准。不要把量规给候选。
2. **Set up sanitized environments.** 每个候选一个工作目录，变体已经就位。种下一条自然任务本就会有的上下文：项目骨架，以及候选自然会去读的技能。
3. **Author one organic prompt.** 写用户会打出来的那一条。不要泄漏正在测量的东西。
4. **Spawn N parallel candidates.** 按 [`arena`](arena-swarm.md#skill-arena) 的 Phase B，在不同模型上并行派出 N 个候选。每个在自己的消毒目录里工作。给每个的是同一条提示。派出方式：同一条消息，`run_in_background: true`。各自交出产物和一段简短理由，理由里写它考虑过并拒绝了的替代方案。某个候选没有产出时，用 N-1 继续，并在综合记录里记下这次退出。模型按 arena 的 Phase A 选取，使候选落在不同模型上。`arena runners` 那一行缺失时，默认这三种模型各派一个：`claude-opus-5-5-max`、`gpt-5.6-sol-max`、`grok-4.7-xhigh-fast`。这些模型名只留在父级，不要写进候选能看见的提示。
5. **Spawn one blinded judge.** 按 arena 的 Phase C，在另一个模型族上派一个被蒙住的裁判。候选都完成之前不要派裁判。裁判按消毒标签和量规看输出，永远不看模型名。Phase C 的裁判是只读的，并且可以和父级自己的阅读并行，但不要和仍在写的候选并行。
6. **Verify the chain from transcripts, not self-report.** 读每个候选在当前工作区 `agent-transcripts/` 目录下的本地转录。系统提示会写出这条路径。不要对 `~/.cursor/projects/*/` 做 glob。那会越过工作区边界，读到无关项目的私人聊天。看每个候选实际打开了哪些文件。链路是否遵循，只根据它真的读过的文件加上代码的形状来打分，永远不根据候选自己的声称。
7. **Read every candidate output yourself.** 你自己从头到尾读每个候选的输出。拿来和裁判的结论比。不一致意味着某个模型有偏见，或量规含糊。然后综合。原文指南还写：你和裁判不一致时，先怀疑量规，再怀疑你自己的判断。

### 回应

写在测的变体、量规、每个候选的笔记、裁判的结论、你的综合，以及是否建议推广这个变体。

### 陷阱与注意

候选能看见的目录、文件和提示里，禁止出现 `eval`、`test`、`judge`、`experiment`、`rubric`、`score`、`compare`、`benchmark`、`candidate`、`arena`。不要让候选列出它用了哪些技能、原则或文件。不要告诉它还有别的候选。裁判永远不看模型名。比较两个变体时，不要让两个裁判各看一套。不要对 `~/.cursor/projects/*/` 做 glob。不要根据候选的自我报告给链路打分。量规不要给候选看。

### 流程图

```flow 盲测评估
start 开始
step 框定量规 | 只给裁判看
step 消毒目录 | 种下自然上下文
step 写自然提示 | 不泄漏测量点
step 并行派出候选 | 按 arena 的 B
step 一个盲裁判 | 按 arena 的 C
step 用记录核链路 | 不看自我报告
step 自己读完再综合 | 不一致要解释
  alt 与裁判不一致 | 偏见或量规含糊
end 结束
```

### 分步产出

1. 产出是在测的变体、怎样算成功，以及只给裁判的量规，3 到 6 条。候选拿不到量规。
2. 产出是每个候选一份消毒过的工作目录，变体已就位，自然任务会有的上下文已种下。原文没有规定目录的具体名字，只要求像用户会起的项目名。
3. 产出是一条自然提示。它不泄漏测量点。
4. 产出是 N 份候选输出，各在自己的消毒目录里，外加各自的简短理由。没有产出的候选记为退出，其余继续。
5. 产出是一个裁判的结论。裁判只看见消毒标签和量规。
6. 产出是你根据转录和实际打开的文件做出的链路判断，不是候选的自我报告。
7. 产出是你通读之后的综合，以及和裁判结论的对照。回应里还要有是否推广的建议。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 比较两份技能草稿会不会改变代理完成同一件用户请求的方式。两边任务相同。候选保持蒙住。

下面这条来自原文 {{src:docs/guide/09-make-it-yours.md}}，不是本书自拟。它出现在给操作者的指南里。按本剧本，同样的词不能出现在候选能看见的提示里。

```text
/poteto-mode run the eval playbook on this skill change. same task for both variants, candidates stay blind.
```

### 失败、中止与含糊时

某个候选没有产出时，按 arena 的 Phase B 用 N-1 继续，并在综合记录里记下退出。你和裁判不一致时，意味着某个模型有偏见，或量规含糊。指南要求先怀疑量规。这份剧本没有不能复现或错误表面的分支。含糊落在量规或偏见上，综合时写出来，而不是当成已确认的推广结论。

### 调用的技能与脚本

- [`arena`](arena-swarm.md#skill-arena)。本剧本点名 Phase B 与 Phase C。候选用的模型按该技能的 Phase A 选取
- 本剧本没有点名 `skills/poteto-mode/scripts/` 里的脚本
- 转录在当前工作区的 `agent-transcripts/` 下。原文说系统提示会给出这条路径，没有另给脚本名
