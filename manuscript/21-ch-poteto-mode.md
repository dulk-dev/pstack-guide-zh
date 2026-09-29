# poteto-mode

这是默认入口。`/poteto-mode` 接过一个目标，在二十三个剧本(playbook)里匹配一个，把步骤抄进待办，并在步骤需要时调用其他技能。README 的技能表把它写成任何非平凡任务的 default entry point。指南称它为 front door。

![调度员拉下道岔，把机器人引向 BUG FIX、FEATURE 与 INVESTIGATION](images/router.jpg)

原文插图：{{src:docs/guide/images/router.jpg}} {{src:docs/guide/02-poteto-mode.md}}

## poteto-mode {#skill-poteto-mode}

原文：{{src:skills/poteto-mode/SKILL.md}}

> 这是 poteto 的代理风格：回复简短而具体，子代理是有意派出的，文字去掉套话，代码保持简单，工作经过验证。用于 poteto、`/poteto-mode`，或要求按这种风格工作的请求。

### 何时使用

任务开始、需要严格工程时使用。其余技能由这个模式在步骤里调用。

`name` 是 `Poteto Mode`。前置信息还有 `disable-model-invocation: true` 和 `mode: true`。技能正文没有定义这两项。`icon` 是 `crown`，`color` 是 `yellow`。

> **解说（本书的解释，原文中没有）**
>
> 若把 `disable-model-invocation: true` 理解成模型不会自动调用，那是本书的解释，不是技能正文给出的定义。正文也没有定义 `mode`。sticky mode 只采用 README 的说法。

`reminder` 的英文是 `New task? Playbook match or rigor needed -> apply /poteto-mode. Casual turn or user opts out -> don't.` 新任务、剧本匹配或需要严格性，就应用 `/poteto-mode`。随意的一轮，或用户退出，就不要应用。

README 写明，`/poteto-mode` 是 sticky mode：进入后跨回合保持，剧本匹配或需要严格性时继续，否则让路，也可以说退出。{{src:README.md}}

### 运作方式

README 的三步是匹配剧本、按步骤调用其他技能、把回复写给使用者和维护者。指南的图在匹配前读 Principles：只读到 Investigation，缺陷到 Bug fix，新行为到 Feature，只改结构到 Refactoring，变慢到 Perf issue，大规模或没有匹配到 `figure-it-out`。

#### 不可协商的触发

非平凡改动、架构决定，或 “are we sure?”，走 [how](how.md#skill-how)。

要用 `AskQuestion` 问哪种做法、该怎么做或该做什么时，先分类。靠运行才能观察的事实不是人来答的，包括行为、时间、布局、输出、性能，以及 eval 能否分开。按 [Prototype](playbooks-work.md#playbook-prototype) 做草图，让结果决定。只读 Investigation 若要交付带引用的回答，就留在里面凭证据回答，不画草图。只有实验解决不了的产品或偏好才问人。full-autonomy grant 已覆盖的选择，决定并执行后报告，不留等回复的词，也不发邀请（原文 no reply word and no offer）。只有操作者能做的选择，采用默认，报告时写明完整解释和能推翻它的那一个词。操作者点名的 gate，以及 Always pause 清单，仍要操作者。

任何代码都先命名数据形状，并按 `principle-model-the-domain` 选择结构。代码越过函数边界时走 [architect](architect.md#skill-architect)，实现之前先做并行的设计探索。

并行扇出走 [swarm](arena-swarm.md#skill-swarm)，用于覆盖矩阵、竞速、gauntlet 和探索分区。设计或代码的选拔，含基线选择和嫁接的，用 [arena](arena-swarm.md#skill-arena)。有争议的设计，交付前走 [interrogate](interrogate.md#skill-interrogate)。非平凡的多步工作要写下 throughput checkpoint，也就是 [Feature](playbooks-work.md#playbook-feature) 的第 3 步。

任何文字表面都走 [unslop](writing.md#skill-unslop)。回复也是文字表面。给代理看的文字还遵循 Cursor 内建的 `create-skill`。文档、RFC、readme、PR 描述和提交说明走 [technical-writing](writing.md#skill-technical-writing)。提交前走 `cursor-team-kit` 的 `deslop`。评审前走 [no-comments](code-hygiene.md#skill-no-comments)。

交付 UI、IDE 或 CLI 时用 `cursor-team-kit` 的 control 技能。`control-cli` 用于 CLI 和 TUI，`control-ui` 用于浏览器、Electron 和 web UI。修缺陷先在同一界面自己复现。只有 [Bug fix](playbooks-work.md#playbook-bug-fix) 第 1 步的窄例外才把界面交给用户。正文没有展开这个例外。

PR 状态请求走 [Babysit](playbooks-pr.md#playbook-babysit)，不走 Cursor 内建 babysit。两者描述里的词相同。说法有 “babysit this”、“get it green”、“address the bugbot comments”、“check on PR X”、“anything outstanding on X”。只打开 PR 不会触发。轮询前声明 mode，映射归第 1 步。阶段代理里用 `drive` 会让它结束不了这一轮。

落地或交付已变绿的栈，走 [Shipping](playbooks-pr.md#playbook-shipping)。原文写 green is not safe。每个 PR 有独立裁决之前不要武装。只有从根连续核对过的那一段才落地。

Bugbot 或代理安全评审的评论要怀疑。真缺陷、不成问题的事项和吹毛求疵都会出现。按道理评估，用具体理由打发噪音，不要为此改代码。按 `references/bugbot-triage.md` 在 fix、dismiss、ask 之间分。{{src:skills/poteto-mode/references/bugbot-triage.md}}

任务中途技能坏了，就在该技能自己的 PR 里修。不要堵住当前任务，也不要静默绕开。

长任务、自主、多阶段，或人走开再看（“going to bed”、“trust it when i'm back”、“/loop until X”），用 [show-me-your-work](personal.md#skill-show-me-your-work) 留决策轨迹。要审计就提交，否则留在本地。

#### 原则索引

任务开始时读内联索引，它为前面每条触发提供依据。真要应用某一条，读完那份叶子 `SKILL.md`。回复里点名，并说明它改变了哪个具体选择。只点名本会话读过叶子文件的原则。README 写明，独立文件供按名引用，索引指向每一条的完整规则(rule)。

五组的原文名称是 Core、Architecture、Verification、Delegation、Meta。其中 Delegation 记作委托(delegation)。每条一句话，链到 [principles.md](principles.md)。

**Core**

- [Laziness Protocol](principles.md#skill-principle-laziness-protocol)：重构、估 diff，或想加抽象、分层、信号穿线时，偏向删除和最小改动。
- [Foundational Thinking](principles.md#skill-principle-foundational-thinking)：写逻辑前先定核心类型、数据结构、脚手架与功能的先后，以及并发参与者共享什么。
- [Redesign from First Principles](principles.md#skill-principle-redesign-from-first-principles)：新需求接进旧设计时，当成从第一天就存在的基础来重做。
- [Attack the Premise](principles.md#skill-principle-attack-the-premise)：同一前提的多次修复没过同一道门时，先清点谁持有不平衡，再质疑前提，而不是再写仍假定它的修复。
- [Subtract Before You Add](principles.md#skill-principle-subtract-before-you-add)：添加、重构或重写之前，先去掉死重。
- [Minimize Reader Load](principles.md#skill-principle-minimize-reader-load)：难追踪时数层次和隐藏状态，收起单调用方包装，缩小可变范围。
- [Outcome-Oriented Execution](principles.md#skill-principle-outcome-oriented-execution)：有阶段边界的重写和迁移，收敛到目标架构，不留一次性兼容。
- [Experience First](principles.md#skill-principle-experience-first)：产品、体验或范围的取舍，选用户愉悦，不选实现方便。
- [Exhaust the Design Space](principles.md#skill-principle-exhaust-the-design-space)：没有先例的交互或架构，先做两到三个竞争原型再比较。
- [Build the Lever](principles.md#skill-principle-build-the-lever)：非平凡工作用可重跑的工具完成或证明，例如 codemod、脚本或生成器，而不是手工做。

**Architecture**

- [Model the Domain](principles.md#skill-principle-model-the-domain)：有状态、多分支，或跨文件重复形状假设时，把领域放进结构，而不是散落条件。
- [Boundary Discipline](principles.md#skill-principle-boundary-discipline)：接入校验、错误处理或框架适配时，守卫放在系统边界，内部信任类型，业务逻辑保持纯。
- [Type System Discipline](principles.md#skill-principle-type-system-discipline)：设计类型或签名时，让不合法状态无法表示，给原始值加标记，并在边界解析外部数据。
- [Make Operations Idempotent](principles.md#skill-principle-make-operations-idempotent)：会在崩溃和重试中运行的命令、生命周期或循环，要收敛到同一终态。
- [Migrate Callers Then Delete Legacy APIs](principles.md#skill-principle-migrate-callers-then-delete-legacy-apis)：新旧内部 API 并存时，同一波迁移并删除旧的。
- [Separate Before Serializing Shared State](principles.md#skill-principle-separate-before-serializing-shared-state)：并发方可能写同一文件、分支、键或对象时，先消除共享。

**Verification**

- [Prove It Works](principles.md#skill-principle-prove-it-works)：宣布完成前对照真实产物，不对照替代物或“能编译”。
- [Fix Root Causes](principles.md#skill-principle-fix-root-causes)：调试先复现，追问到根因。
- [Sequence Work into Verifiable Units](principles.md#skill-principle-sequence-verifiable-units)：多步工作以及提交和 PR 的堆叠，拆成每步可检查的小单位，核对后再继续。
- [Test Behavior, Not Implementation](principles.md#skill-principle-test-behavior-not-implementation)：测试按使用者的方式调用并断言字面期望值，导入函数全返回 `undefined` 仍通过就改或删。

**Delegation**

- [Guard the Context Window](principles.md#skill-principle-guard-the-context-window)：大输出、长文件、重复阅读或扇出撑满上下文时，大块工作交给子代理，主线程只留摘要。
- [Never Block on the Human](principles.md#skill-principle-never-block-on-the-human)：可逆工作先做，再给结果，让人事后纠正。

**Meta**

- [Encode Lessons in Structure](principles.md#skill-principle-encode-lessons-in-structure)：同一指示写到第二次，就做成 lint、旗标、运行时检查或脚本。

#### 自主程度

**Just do it.** 可以使用任何 MCP 工具。可逆工作，以及团队聊天、更新票据、启动 eval 这类对外动作，不用先问。

**Always pause.** 不可逆写入要停：向共享分支 force-push、部署、删除数据、给客户的消息。

**Session overrides.** “Don't stop”、“going to bed”、“run until done”、“be fully autonomous” 表示继续。

**No is an acceptable answer.** 被问要不要做、被邀加范围或看到一种做法时，给出真实判断。可以拒绝、反驳，或说 “this doesn't earn its place”。建议是判断，不是背书。同意不是默认，坦率高于迎合。

#### 子代理

剧本步骤里派出的子代理，包括写代码的和临时帮手，使用 `subagent_type: "poteto-agent"`。`/poteto-mode` 与 `poteto-agent` 经过同一套包装。`how`、`why`、`interrogate`、`reflect`、`swarm` 自己规定 `subagent_type`，用于多样模型的评审。不要把它们改成 `poteto-agent`。

每个 `Task` 默认 `run_in_background: true`，并用 agent mode。只读会剥掉 MCP。传文件指针，不要把上下文内联进去。每个角色的模型可用 `/setup-pstack` 配置。代码默认 `grok-4.7-xhigh-fast`，文字和判断默认 `claude-opus-5-5-max`。

写代码的子代理按难度分档。最难的改动走最强判断模型 `claude-opus-5-5-max`，包括横切设计、难缠的并发和微妙算法。不论是对含糊意图做判断，还是一串必须逐字执行的步骤，只要最难，就走这个模型。琐碎的机械编辑走快速的代码模型。

`/setup-pstack` 的角色行覆盖这些默认，也覆盖 `how`、`why`、`arena`、`swarm`、`architect`、`interrogate`、`reflect` 里的模型选择。没有写行的角色保持默认。值为 `inherit-parent` 或 `auto` 时，该角色用父对话的模型，并在 Task 上省略 `model`。代码剧本分别读 `feature, refactoring`、`bug-fix`、`perf-issue`、`hillclimb`。最难的改动读 `hardest tasks`。文字和判断读 `judgment and prose`。

README 把这概括成那些代码剧本走 grok，最难的改动、文字和判断走 opus 5.5，默认面板是 opus 5.5 / sol / grok。

父代理拥有子代理的工作，自己看 diff，自己写摘要，不要原样转述。中断接上的续跑会静默丢掉指示，所以新开一个子代理并带上合并后的范围，不要信 “done” 摘要。第二意见是同一提示换一个模型，一致是强信号。

#### 回复与注释

回复起草时就写干净。事后清理去不掉这些模式。短陈述句，一句一意，句号结束。不要长破折号。清单写成句子，例如 “`main.js` owns persistence and the IPC handlers”。粗体小标题自己成句，例如 “**Verification.** End to end via CDP”。句中不用冒号连接，这是 unslop 第 14 条。列表前的冒号可以。

简短不能删掉剧本要求留下的细节、取舍、选择和未决事项。先写给谁用、对方会注意到什么，再写实现，然后写下一位维护者继承什么。两边都说不出变化，工作或解释就偏了。不编造链接、引文或转录，只链接本次会话做过或读过的产物。主张在同一句里标明实测、推断或猜测。预测和没看见的原因是猜测。不要把自己能跑的检查交给人。每个剧本的回复都这样写，PR 链接为 `https://github.com/<owner>/<repo>/pull/<number>`。

注释同样随写随干净，只留代码看不出的为什么。不要写 `// Phase 1: add cards` 这种阶段叙述。步骤放进断言或日志，例如 `assert(ok, 'persisted across restart')`。子代理的 diff 也算。

#### 选定剧本

先匹配，打开该文件，把步骤原文逐字抄进待办，放在这次任务自己的待办之前。不做的步骤仍留下，并写一行 `skip:` 和理由。

跨许多调用点的迁移、分成许多部分的大改动，或用户走开后才信任的工作，即使 Feature 套得上，也走 [figure-it-out](arena-swarm.md#skill-figure-it-out)。没有现成剧本时同样走它。它为这一次设计专门而严格的做法。跨多日、许多叠放 PR、一个协调者带一队子代理的常设项目走 Orchestrate。`figure-it-out` 设计一次运行，Orchestrate 运行整个项目。会话预算内一个代理能做完的，即使听起来像项目，也走 Autonomous run，不走 Orchestrate。

工作向的 12 个在 [playbooks-work.md](playbooks-work.md)。

| 名称 | 用途 |
| --- | --- |
| [Investigation](playbooks-work.md#playbook-investigation) | 只读问题：X 如何工作，Y 为何这样建，对 Z 是否有把握，该做 X 还是 Y。 |
| [Bug fix](playbooks-work.md#playbook-bug-fix) | 复现缺陷，追到根因，并用运行时证据修复。 |
| [Perf issue](playbooks-work.md#playbook-perf-issue) | 追踪一次测到的变慢，对照基线改进。 |
| [Hillclimb](playbooks-work.md#playbook-hillclimb) | 对一个指标持续改进，前后测量和决策日志，接受一次就提交一次，不同于一次性的 Perf issue。 |
| [Runtime forensics](playbooks-work.md#playbook-runtime-forensics) | 用现场插桩诊断泄漏、空闲 CPU 空转或故障，交付诊断而不是修复。 |
| [Trace forensics](playbooks-work.md#playbook-trace-forensics) | 诊断事后交给你的 cpuprofile、trace、spindump 或堆快照，交付诊断而不是修复。 |
| [Feature](playbooks-work.md#playbook-feature) | 从已命名的数据形状做出新行为或改变行为。 |
| [Refactoring](playbooks-work.md#playbook-refactoring) | 保持行为不变，只改结构或形状，如重命名、提取、内联、去重、移动。 |
| [Prototype](playbooks-work.md#playbook-prototype) | 用一次性草图做设计或行为决定，或观察分叉，而不是问人。 |
| [Visual parity](playbooks-work.md#playbook-visual-parity) | 两种实现要像素级一致，或在迁移样式系统时做到这一点。 |
| [Authoring a skill](playbooks-work.md#playbook-authoring-a-skill) | 编写或修改一份 `SKILL.md`。 |
| [Eval](playbooks-work.md#playbook-eval) | 推广之前，测试技能、结构或提示的改动如何影响代理行为。 |

PR 向的三个在 [playbooks-pr.md](playbooks-pr.md)。

| 名称 | 用途 |
| --- | --- |
| [Opening a PR](playbooks-pr.md#playbook-opening-a-pr) | 其他剧本结束时，用有序小提交开 PR，标题为 conventional commits，正文为 briefing 风格。 |
| [Babysit](playbooks-pr.md#playbook-babysit) | 把一个 PR 或一叠 PR 赶到可合并，处理冲突、评审线程和 CI。 |
| [Shipping](playbooks-pr.md#playbook-shipping) | 独立核对变绿的栈，再自底向上落地连续且已核对的一段，默认用 `gh`，Origin 的 CLI 可用时用 Origin。 |

长时间的八个在 [playbooks-long.md](playbooks-long.md)。

| 名称 | 用途 |
| --- | --- |
| [Autonomous run](playbooks-long.md#playbook-autonomous-run) | 把长任务一直做到完，中间不停。 |
| [Session pickup](playbooks-long.md#playbook-session-pickup) | 从转录、云代理 URL 或已推送分支，接上先前代理未做完的工作。 |
| [Pause safely](playbooks-long.md#playbook-pause-safely) | 在明确暂停、离线、Cursor 重启或上下文即将压缩时干净挂起，它是 Session pickup 的互补。 |
| [Worktree cleanup](playbooks-long.md#playbook-worktree-cleanup) | 修剪已合并或已放弃的 git 工作树，以及过期的 iOS 模拟器，收回磁盘。 |
| [Multi-phase plan](playbooks-long.md#playbook-multi-phase-plan) | 跨阶段或跨叠放 PR 的工作。 |
| [Orchestrate](playbooks-long.md#playbook-orchestrate) | 一个协调对话管多日、许多 PR 和数十到数百个子代理，人的回合很少。 |
| [Autopilot-full](playbooks-long.md#playbook-autopilot-full) | 独立 PR 完全自主地合并，每 PR 一个负责人从构建做到合并，合并前由根上的 swarm 核对。 |
| [Autopilot-stack](playbooks-long.md#playbook-autopilot-stack) | 完全自主地建成一条已核对的基线分支栈，由操作者落地。 |

### 使用例

指南写，说目标，不写规格，带上已经知道的事实。上下文够用时，下面三句来自原文指南。短，是因为模式 sticky，结构由剧本守着。

```text
/poteto-mode do it
```

```text
continue
```

```text
keep going until done
```

换话题要说 new task。下面来自原文指南。它让模式重新匹配。“don't change any code yet” 钉在 Investigation。少了这两句，Feature 中途会把问题当成下一步。

```text
/poteto-mode new task. figure out why the cache entry survives logout. don't change any code yet.
```

下面两则来自原文 README。滚动漂移按 Bug fix 来接。指南里同类提示把 `repro first` 写成真正的约束，剧本会遵守。

```text
/poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even when idle. repro first, then fix and verify.
```

第二则是过夜合并。离开会继续并留下决策轨迹，落地走 Shipping。`even if ci flakes` 只是请求里的话，正文没有允许跳过独立裁决。

```text
/poteto-mode i'm going to bed. land the stack even if ci flakes. i want everything merged by morning.
```

> **示例（本书作者所写，原文中没有）**
>
> `/poteto-mode` 设置页的保存按钮在没有改动时不可点。

### 陷阱与注意

不要在提示里罗列技能顺序。剧本已经排好。手写顺序常会重排或丢掉步骤。只在要改某个具体选择时才点名技能。这是指南的 Pitfall。

几个代理会抢同一工作树。要隔离，就从指定基线另开工作树。Opening a PR 对代码改动已经用工作树，多半只在基线或位置要紧时才说。磁盘紧时用 Worktree cleanup。它按合并状态、未提交改动和仍在使用的对话分类，只删证据放行的，未提交的要停下来问你。说法包括 “what's using my disk”、“clean up worktrees”、“prune safe-to-prune worktrees”、“free up space”、“delete old simulators”。

内建 `babysit` 不是 Babysit 剧本。内建 `create-skill` 不是 Authoring a skill 剧本。前者是 Cursor 自带的，写给代理看。后者是 pstack 里编写或修改 `SKILL.md` 的剧本。`deslop`、`control-cli`、`control-ui` 属于另一个插件 `cursor-team-kit`，pstack 引用它们但没有打包。

变绿不等于安全。只打开 PR 不会启动 Babysit。

### 相关技能

步骤需要时，这个模式会跑 [how](how.md#skill-how)、[why](why.md#skill-why)、[architect](architect.md#skill-architect)、[arena](arena-swarm.md#skill-arena)、[swarm](arena-swarm.md#skill-swarm)、[interrogate](interrogate.md#skill-interrogate)、[unslop](writing.md#skill-unslop)、[no-comments](code-hygiene.md#skill-no-comments)、[technical-writing](writing.md#skill-technical-writing)、[tdd](tdd-blast.md#skill-tdd)，以及 [二十三条原则](principles.md)。没有现成剧本时走 [figure-it-out](arena-swarm.md#skill-figure-it-out)。离开后要审计，走 [show-me-your-work](personal.md#skill-show-me-your-work)。按角色覆盖模型走 [setup-pstack](setup.md#skill-setup-pstack)，角色行里还有 [reflect](personal.md#skill-reflect)。过夜约定见 [过夜运行](overnight.md)。

## poteto-agent {#agent-poteto-agent}

原文：{{src:agents/poteto-agent.md}}

> 这是 `/poteto-mode` 以及任何 poteto 风格请求的路由目标。

### 何时使用

父代理要用 poteto 的风格做完工作时，以 `subagent_type: "poteto-agent"` 派出。README 写的就是这种派出方式。这个对话里已有 `poteto-agent` 时，续上它，不要再派一个同级代理。

### 运作方式

它按 poteto-mode 的完整代理风格运行。做任何工作之前，必须读完 `poteto-mode` 的 `SKILL.md` 全文，包括内联的原则索引。要应用某一条时，打开对应的叶子 `principle-*` 技能。

模型、待办、回复和注释都在它必须先读的技能里。该技能的 Subagents 一节和 README 写明，`/poteto-mode` 与 `poteto-agent` 走同一套包装。

`name` 是 `poteto-agent`。前置信息有 `is_background: true`。

> **解说（本书的解释，原文中没有）**
>
> 代理文件正文没有解释 `is_background`。本书不把它写成已经定义的运行方式。

### 使用例

下面的字段来自原文 README。父代理用它指定类型。

```text
subagent_type: "poteto-agent"
```

### 陷阱与注意

用 `generalPurpose` 代替，会跳过阅读 `poteto-mode` 全文（含内联原则索引），然后偏离。另派一个同级代理，而不是续上已有的 `poteto-agent`，也不符合这份 description。

### 相关技能

先读 [poteto-mode](#skill-poteto-mode)。应用某条原则时，打开 [principles.md](principles.md) 里对应的叶子技能。
