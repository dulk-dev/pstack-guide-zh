# architect：写代码之前先定形状

一次艰难设计若只试一回，就会把模型最先想到的形状锁死。`/architect` 在实现之前定下类型和边界。它先用 [`how`](how.md#skill-how) 落地，归属或分层要改时再用 [`why`](why.md#skill-why)。然后用 [`arena`](arena-swarm.md#skill-arena) 做出互相竞争的设计草图。每份草图都先写调用方怎样使用，再写类型、签名和模块地图。默认从综合后的设计直接进入实现。你要先看见设计，就明说。{{src:docs/guide/04-design.md}}

![三台机器人各自画桥，评委拿着记录板](images/design.jpg)

这张原文插图同时点到 `architect`、`arena` 与 `interrogate`。三台机器人在各自的桌子上画互相竞争的桥，桌前的牌子是 `/architect`、`/arena` 与 `/interrogate`，拿记录板的评委在一旁审视。图来自 {{src:docs/guide/images/design.jpg}}，图注在 {{src:docs/guide/04-design.md}}。`swarm` 与 `figure-it-out` 不在这张图里。它们在 [arena、swarm 与 figure-it-out](arena-swarm.md)。

## architect {#skill-architect}

原文：{{src:skills/architect/SKILL.md}} {{src:skills/architect/references/runner-prompt.md}} {{src:skills/architect/references/rationale-template.md}} {{src:skills/architect/references/design-red-flags.md}} {{src:docs/guide/04-design.md}} {{src:README.md}}

> 实现之前先勾出类型、签名、类的形状和模块边界，综合多种模型的视角，草图被证明是错的就丢掉再设计。

### 何时使用

触发说法是 `/architect`、 “architect this”、 “design this”，以及非平凡的工作。这种工作若直接跳到代码，会把错误的形状锁死。README 写的是：你即将写越过函数边界的代码，希望先定下调用方的用法、类型和模块形状。

指南的例子把调用方怎样使用放在最关心的位置。要在实现前停下来看设计，就说带检查点。{{src:docs/guide/04-design.md}}

```text
/architect design the import pipeline before writing any code. i care most about how callers use it.
```

```text
/architect with checkpoint. stop and show me before implementing.
```

前置信息写着 `name: architect` 与 `disable-model-invocation: true`。技能正文没有解释后一项。

### 运作方式

设计先于实现。用 `not implemented` 的函数体和伪代码，勾出类型、函数签名、类的形状和模块边界。综合多种模型的视角，再按选定的草图填代码。实现若证明草图是错的，丢掉它，重新设计。

开始前打开待办，每个阶段一条。条目是 `Ground`、`Sketch`、`Agree`、`Implement`、`Scrap`。

#### Phase A. 把问题落地

为新代码会碰到的每一个系统建立真实的心智模型。对相关子系统运行 `how`。

点出一个文件名不算落地。要交出 `how` 所要求的、追踪过的模型。设计若重定归属或分层，再对现有形状运行 `why`，让理由变成约束，而不是猜测。

只有真正的绿地、周围没有要接入的系统时，才跳过 Phase A。

#### Phase B. 画草图

用 `arena` 跑设计草图这项任务，并带上 Phase A 的落地产物。每个跑者的提示用 `references/runner-prompt.md`。每个候选交出一份设计包，形状按 `references/rationale-template.md`。

跑者取 `pstack-models.mdc` 里的 `architect runners` 那一行，用来代替 `arena runners`。规则或那一行缺失时，用 `claude-opus-5-5-max`、`gpt-5.6-sol-max`、`grok-4.7-xhigh-fast`。别名和被拒绝的条目，遵循 `arena` 的 Phase A。`auto` 或 `inherit-parent` 表示父级模型，这条上省略 `model`。Task 拒绝某个配置好的条目时，那个席位改用它所属模型族的默认，并说明。模型族按前缀：`claude-*`、`gpt-*`、`grok-*`。没有对上的族，用 `claude-opus-5-5-max`。默认也被拒绝时，从错误信息里取同一族里最接近的有效 slug。

设计做两次。综合之前至少要有两个结构上不同的候选，即使第一份看起来已经够用。这是把 [`principle-exhaust-the-design-space`](principles.md#skill-principle-exhaust-the-design-space) 做成具体步骤。要的是整体形状的替代，不是在一个形状里做点状修补。

综合之前，用 `references/design-red-flags.md` 筛每一个候选。浅模块、信息泄漏、按时间分解、直通方法，要拒绝或修订。

在还能用的候选之间比较接口的深度。优先选把更多复杂性藏在更小、更简单的公开表面后面的设计。丰富的接口可以把调用链保持得短，办法是把能力集中起来，而不是撒在多层上。

`arena` 交回一份综合后的设计包。综合决定填进理由里的 Synthesis decision。

跑者是并行探索里的一个候选。动手前先读完 `architect`。输出是一份候选设计包：类型草图、函数签名、模块地图，以及按理由模板写成的散文。编排者在这些轴上比较候选，以选出底稿。工作目录能用 Git 工作树就用工作树，否则用草图目录下每个跑者自己的子目录。要紧的是候选之间互相独立。编排者在这份提示周围填上任务、Phase A 的落地产物、隔离的工作目录，以及写出输出的路径。

跑者遵守这些纪律。

- 调用方的用法在先。先写 README 风格的用法，和两三处真实调用点，再写类型。然后从用法推导类型草图。用法是规格。两者必须一致。不一致时，把草图改到和用法一致，不要反过来。
- 数据结构在先。核心类型对了，代码就变得明显。把每一种主导的访问模式在提出的结构里走一遍。若答案是 “以后再加一张映射、索引或缓存”，结构就是错的。
- 接口深度。比较公开表面后面藏着的能力，和这个表面的大小。优先要简单的接口，把复杂性拉进被调用的一方，即使实现因此不那么简单。不要把传输或线路类型放在公开 API 上。在接口后面解析成领域类型。
- 共享状态。若两个参与者可能都写，就问 “会发生什么”。答案若不是 “什么都不会”，就默认每人自己的状态，在读的边界上合并。这是 [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state)。
- 把边界写可见。函数体用 `not implemented` 错误。难的逻辑用 `// TODO` 伪代码。文档注释写明意图和不变量。读者应能只读类型和签名，就把数据从输入追到输出。
- 把不变量编码进类型。难以误用的类型，优先于运行时检查，再优先于散文注释。这是 [`principle-encode-lessons-in-structure`](principles.md#skill-principle-encode-lessons-in-structure)。
- 在边界校验，边界内部信任类型。这是 [`principle-boundary-discipline`](principles.md#skill-principle-boundary-discipline)。业务逻辑是纯函数。外壳保持薄。
- 每个不变量一个事实来源。能推导的不要同步。
- 适用的地方，状态转换是幂等的。这是 [`principle-make-operations-idempotent`](principles.md#skill-principle-make-operations-idempotent)。问操作跑两次或中途崩溃会发生什么。
- 短调用链。跟踪流程若需要超过三个文件，就压平层次。这是 [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol) 和 [`principle-minimize-reader-load`](principles.md#skill-principle-minimize-reader-load)。

你是几个跑者之一，各自在不同的模型上。做出你这个模型能做的最好设计。不要为了迁就别人而退让。候选之间的差异，是选底稿和嫁接时用的信号。收敛到一个看起来安全的中间，就败掉了这次探索。

综合之前的红旗是修订或拒绝一个形状的理由。

浅模块暴露很大的接口，却藏住很少的复杂性。深度按公开表面后面藏着的能力和策略来判断，相对的是这个表面的大小。优先要简单接口，背后是充实的行为。不要把深模块和深调用链混为一谈。深调用链把理解撒在多层。深模块把能力集中在一个接口后面。迹象是这些。调用方要协调好几个方法才能完成一次操作。公开选项暴露了内部阶段或实现选择。学会接口并不能让调用方免于学习实现。

信息泄漏让多个模块依赖同一个内部决定。一种表示、策略或协议细节出现在不止一处，改它就要协调着改。把传输或线路类型公开再导出，就是泄漏。在接口后面把外部数据解析成领域类型。存储模式、框架对象和协议细节保持私有。

按时间分解，是按执行顺序组织模块，而不是按它们拥有的知识。分开的加载、校验、变换和保存阶段，常常把同一种表示和它的不变量在好几道边界上重复。代码围绕领域知识和归属来分组。在不同时间运行的方法，只要保护的是同一批决定，仍然可以属于一个模块。

直通方法把同样的参数转发到另一个形状相同的方法。它加了一层，却没有藏住复杂性。删掉它，或把责任移到能完成这次操作的模块。只有在它加上策略、适配或一种不同的抽象时，才保留这道转发边界。

理由模板是和类型草图一起交出去的散文。一页。标题用句式大小写，不要套话。斜体提示换成真实内容。各节如下。

- Problem。一段。我们要做什么。现有系统或约束里的什么，使形状并不明显。Phase A 若露出设计必须遵守的约束，就写在这里。例如必须互通的现有类型、不能弄坏的调用方、越过我们边界的不变量。让读者看见你看见的同一批约束。
- Usage。调用方的视角。这一节在类型草图之前写。给出消费者读的 README 或快速开始，加上他们自己代码里两三处现实的调用点。他们导入什么，调用什么，返回什么。Shape 里的类型草图从这里推导。两者必须一致。分歧时，把草图改到和用法一致，不要反过来。调用方的体验是规格。类型为它服务。
- Shape。推荐的架构。先是数据结构。然后数据怎样流过签名。点名承重的决定。写明哪些不变量编码在类型里，校验在哪里，系统有意不做的是什么。明确判断接口深度。公开表面藏住什么复杂性，什么仍暴露给调用方，为什么接口不需要更大。每个决定背后的原则点名，例如 `per boundary-discipline`。不要把原则再复述一遍。
- Synthesis decision。由 `arena` 填写。记下哪个候选成了底稿、为什么，从其他每个候选改编了什么，拒绝了什么、为什么。
- Tradeoffs accepted。选定形状所做的每个取舍一条。形式是 “we accept X in exchange for Y.” 点名未来的读者可能当成疏忽的东西，包括看起来像过早优化或过早简化的东西。
- Alternatives considered。必填。至少点名一个具体的替代形状，用一行说明它为什么输。按接口深度判断每个替代，不要只按实现简单。点名它暴露给调用方的复杂性，以及它藏住的复杂性。设计空间里真有竞争者时，这里放两三个替代。约束迫使答案时，一个就够，结论写成 “this was the only viable shape because...”。不要列出同一形状的几种口味。这一节是选定形状考虑过并拒绝的设计替代，不是其他跑者候选。
- Open questions and risks。画草图时注意到的、需要人来权衡的事，以及实现开始前值得标出的风险。写成问题，不要写成断言。人的回答就是解决，而不是一条评论。
- Next implementation step。对着草图要建的第一件事。一句话。综合之后你会立刻开始写的东西。若选择了检查点，则是 Phase D 签字之后。

#### Phase C. 同意，可选

默认直接按综合后的设计进入实现。没有人的检查点。

调用者明确要求时才选择检查点。说法是 “/architect with checkpoint”、 “stop and show me before implementing”，或类似的话。然后把综合后的设计摆出来，停下来等签字。

无论哪一种，综合都可以作为自己的一次提交交出去。这是 [`principle-foundational-thinking`](principles.md#skill-principle-foundational-thinking) 的 “scaffold first” 方式。填入期间有计划、有范围的破损是可以的。这是 [`principle-outcome-oriented-execution`](principles.md#skill-principle-outcome-oriented-execution)。实现之前若要对设计施加对抗性压力，对综合后的草图运行 [`interrogate`](interrogate.md#skill-interrogate)。

人若推回这个形状，无论是在检查点上还是事后，都把它当成 Phase A 的证据。重新落地，并在写更多代码之前重跑 Phase B。

#### Phase D. 按草图实现

把 `not implemented` 的函数体换成代码，把伪代码换成逻辑。综合后的草图是契约。

偏离草图是值得摆出来的信号，不是默默吸收的摩擦。一个函数若需要草图没预料到的参数，就问草图是错的、需求被漏了，还是实现做得过头了。

#### Phase E. 架构错了就丢掉

实现若不断产生草图吸收不了的摩擦，就把草图丢掉。不要把修补栓到一个错误的设计上。这是 [`principle-redesign-from-first-principles`](principles.md#skill-principle-redesign-from-first-principles) 和 [`principle-fix-root-causes`](principles.md#skill-principle-fix-root-causes)。

信号是一种模式，不是单次实例。迹象是这些。

- 同一种变通在互不相关的代码里反复出现。
- 多个互不相关的边界情况都需要专门分支。
- 类型需要逃生口才能编译。`any`、强制转换、实际上总会被设置的可选字段，都在此列。
- 草图说状态不共享，却出现 “我们需要一把锁” 的反射。
- 调用方必须知道抽象的内部规则才能使用它。
- 实现过程中出现两处或更多互相独立、形状相同的 Phase D 偏离。

用判断。几个边界情况不能否定一套架构。有的问题本身就复杂。数据里的复杂性不是设计里的复杂性。

丢掉时按这四步。

1. 对已经建成的东西重跑 `how`。
2. 把新约束当成第一天就有的假设来重做。这是 redesign-from-first-principles。
3. 添加之前先减去。这是 [`principle-subtract-before-you-add`](principles.md#skill-principle-subtract-before-you-add)。新草图在长大之前，应比旧的更小。
4. 回到 Phase B，重跑 `arena`。

#### 产出

调用方的用法先写，类型草图从它推导。小改动用一个文件，放新类型和签名。较大的工作用模块地图加上类型定义。理由一起交，形状按 `references/rationale-template.md`，包括用法草图和综合决定。

### 使用例

上面 Phase 之前的两条来自指南。下面这条来自 README，也不是本书自拟。它把 `/architect` 放在写检测之前，并点明要高信号、没有误报。

```text
design this instrumentation to be high signal with no false positives. /architect this first.
```

默认路径没有人的检查点。综合后的设计直接进入 Phase D。要先看设计，用带 checkpoint 的那一条。人若推回形状，回到 Phase A 和 Phase B，不在错误的形状上继续填代码。

> **示例（本书作者所写，原文中没有）**
>
> `/architect` 先设计导入管道，先不要写实现。我最在意调用方怎么用。做完把草图给我看，再写代码。

后一句是在选择检查点。代理应在综合之后停下来，而不是直接进入 Phase D。

### 陷阱与注意

点出文件名不算 Phase A。要有 `how` 所要求的追踪过的模型。重定归属或分层时，现有理由来自 `why`，不是猜测。真正没有周围系统的绿地才跳过 Phase A。

第一份草图看起来够用，仍然要第二个结构上不同的候选。点状修补不算穷尽设计空间。综合前用红旗筛。浅模块、信息泄漏、按时间分解、直通方法，要修订或拒绝。

默认没有检查点。只有明确要求才停。综合仍可以作为自己的提交交出去。填入时有计划的破损可以。实现前的对抗性压力用 `interrogate`，它不会自动改代码。人推回形状，就重新落地并重跑 Phase B。

Phase D 的偏离要摆出来。问的是草图错了、需求漏了，还是实现过头了。

Phase E 看的是反复出现的模式。几个边界情况，或数据本身的复杂，不能否定架构。丢掉之后新草图先变小，再长大，然后重跑 `arena`。

跑者不要收敛到一个看起来安全的中间。用法和类型草图不一致时，改草图去迎合用法。

### 相关技能

- [`how`](how.md#skill-how)。Phase A 对相关子系统运行它。丢掉草图后也对已经建成的东西重跑。
- [`why`](why.md#skill-why)。重定归属或分层时，把现有理由变成约束。
- [`arena`](arena-swarm.md#skill-arena)。Phase B 用它产生并综合候选。跑者规则的别名和拒绝处理在它的 Phase A。
- [`interrogate`](interrogate.md#skill-interrogate)。实现前要对设计施加对抗性压力时运行它。指南里，有争议、反悔代价高的设计，在交付前再跑一次。{{src:docs/guide/04-design.md}}
- [`poteto-mode`](poteto-mode.md#skill-poteto-mode)。越过函数边界的工作会自己触发 `/architect`。直接点名，主要是你想要比默认更多或更少的审视。{{src:docs/guide/04-design.md}}
- [二十三条原则](principles.md)。本技能点名的有 exhaust-the-design-space、foundational-thinking、outcome-oriented-execution、separate-before-serializing-shared-state、encode-lessons-in-structure、boundary-discipline、make-operations-idempotent、laziness-protocol、minimize-reader-load、redesign-from-first-principles、fix-root-causes、subtract-before-you-add。
- [`/setup-pstack`](setup.md#skill-setup-pstack)。`architect runners` 覆盖默认的三个模型。
