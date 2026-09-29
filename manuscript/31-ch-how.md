# how：代码如何运作

改代码之前，先把子系统现在怎样运行读成一个能工作的心智模型。`/how` 回答代码做什么、运行时怎样走、关键类型是什么、不明显的地方在哪。动机和取舍交给 [`why`](why.md#skill-why)。指南把 `/how`、`/why`、`/teach`、`/recall` 放在动手之前。{{src:docs/guide/03-understand.md}}

![侦探用放大镜看机器图纸，机器人去取案卷](images/understanding.jpg)

插图来自原文 {{src:docs/guide/images/understanding.jpg}}。指南的图注还写到，她身后的证据板把线索标在 `/how` 与 `/why` 下面。{{src:docs/guide/03-understand.md}}

## how {#skill-how}

原文：{{src:skills/how/SKILL.md}} {{src:skills/how/references/explorer-prompt.md}} {{src:skills/how/references/explainer-prompt.md}} {{src:README.md}} {{src:docs/guide/03-understand.md}} {{src:skills/poteto-mode/SKILL.md}}

> 探索代码库来回答代码怎样运作，讲到资深工程师接手一个子系统时能带走一个可工作的心智模型。

### 何时使用

触发说法是 “how does X work”、改某样东西之前的代码走读，以及放置、归属和分层：东西该放在哪、哪个包拥有它、这是不是正确的一层。它也用来讲子系统架构、运行时流程，以及上手时的心智模型。动机用 `why`。

README 的技能表写的是：你想要一份子系统如何运作的走读。指南写明，问你真正想问的那一句。大的子系统会先派出两到四个只读探索者。窄问题就直接读并讲解。

前置信息写着 `name: how` 与 `disable-model-invocation: true`。技能正文没有解释后一项。

### 运作方式

下面每一次派出，都点名 `pstack-models.mdc` 里的一行角色，并带一个默认值。`model` 设成那一行的值。规则文件或那一行缺失时，用默认值。值是 `auto` 或 `inherit-parent` 时，不设 `model`。Task 拒绝某个 slug 时，改用默认值并说明。默认值也被拒绝时，从错误信息里取同一模型族里最接近的有效 slug。

角色行由 [`/setup-pstack`](setup.md#skill-setup-pstack) 写入。`how` 自己规定 `subagent_type` 为 `generalPurpose`。按 [`poteto-mode`](poteto-mode.md#skill-poteto-mode) 的约定，不要把它改成 `poteto-agent`。

**第 1 步，判断复杂度。** 范围含糊时，先说出你的理解，然后探索。用户可以改口。

- 简单。单个模块、一个小工具，或 “how does function X work” 这种窄问题。不派探索者。一个讲解者一次走完探索和讲解。进入第 2b 步。
- 复杂。跨多个文件或服务的子系统、横切功能，或完整的架构概览。先并行派出探索者，再交给讲解者。进入第 2a 步。

拿不准时走简单路径。

**第 2a 步，只用于复杂问题。** 把问题拆成 2 到 4 个探索角度。每个角度是这个子系统里彼此不同的一片。在同一条消息里派出全部探索者。

- `subagent_type` 为 `generalPurpose`
- `model` 读 `how explorer` 那一行，默认 `grok-4.7-xhigh-fast`
- `readonly` 为 `true`

每个探索者的提示来自 `references/explorer-prompt.md`，填上它的角度。然后进入第 3 步。

探索者收集事实。它跟踪调用路径，读实现，画出组件。面向人的讲解由另一个代理来写，所以它要彻底、要准确，不追求文笔。别的探索者在并行看同一子系统的其他切片。它只深挖分到的角度。

探索按这个顺序做。

1. 找到入口。什么触发了这个行为。用户动作、API 调用，还是定时任务。先找到它从哪开始。
2. 跟踪流程。从入口顺着调用链读每个函数。看什么数据流过，又怎样变形。
3. 标出关键抽象。中心的类型、接口、服务或类。读它们的定义。弄清它们代表什么，以及为什么存在。
4. 找到边界。这个子系统在哪里和其他部分接口。什么进去，什么出来。
5. 找不明显的地方。有没有意外。有没有像历史遗留的东西。有没有新人会误解的地方。

一直探索到能不靠含糊其辞讲出全貌。某段接不上时要明说。写得出 “I couldn't determine how X connects to Y”，就不要编一条连接。

交回的结构如下。要具体到文件路径、函数名、类型名和相关行号。

- Components Found。关键类型、服务、类和抽象。每一项写名字、文件路径，以及一句话它做什么。
- Flow。逐步的执行流程。每一步写哪个函数或方法在跑、在哪个文件、做什么、下一步调用谁。写上步骤之间流动的数据。
- Files Read。这次探索读过的每个文件，方便讲解者引用。
- Boundaries。子系统接到代码库其他部分的地方。输入和输出。
- Non-Obvious Things。意外的、有历史原因的、容易弄错的。看起来该这样工作、实际那样工作的地方。
- Open Questions。没有完全追完或没有弄懂的部分。缺口要诚实。

不要从名字猜测。用 Glob 找目录和文件，用 Grep 找关键符号，用 Read 读真正的实现。

**第 2b 步，只用于简单问题。** 派一个 Task 子代理，一次走完探索和讲解。

- `subagent_type` 为 `generalPurpose`
- `model` 读 `how explainer` 那一行，默认 `claude-opus-5-5-max`
- `readonly` 为 `true`

提示按 `references/explainer-prompt.md` 来建，不含探索者发现那一节。然后进入第 4 步。

**第 3 步，只用于复杂问题。** 全部探索者返回之后，派一个 Task 子代理，把发现综合成一份讲解。配置与第 2b 步的讲解者相同：`generalPurpose`，`how explainer`，默认 `claude-opus-5-5-max`，`readonly` 为 `true`。

提示按讲解模板来建，并把每个探索者的发现填进去。

讲解者面对的是资深工程师。多个探索者并行追踪了不同切片。发现会重叠，偶尔还会互相矛盾。要调和。合并重叠的描述。矛盾处自己读代码来解决。把各片合成一幅图。读者不熟悉这块，读完应能带着可用的心智模型开始工作。讲解者有只读权限，用 Read、Grep、Glob 核对细节或补缺口。探索者已经做了主要工作，不要从头再探一遍。

**第 4 步，呈现。** 把讲解者的输出交给用户。为了清楚，或为了补上对话里的上下文，可以轻改。不要大改重写。

**输出格式。** 用讲解模板里的分节。不适用的丢掉。分节名保持英文：Overview、Key Concepts、How It Works、Where Things Live、Gotchas。

- Overview。一两段。这是什么，做什么，为什么存在。只读这一节就能决定要不要往下读。
- Key Concepts。跟上后面内容所需的重要类型、服务或抽象。简短定义，不求穷尽。
- How It Works。最长的一节，也是讲解的核心。走过流程：什么触发，逐步发生什么，数据去哪，决策点在哪。用散文，不用伪代码。点名具体文件和函数，让读者知道去哪看。除非一小段对论点必不可少，不要倾倒大块代码。多个组件互相说话，或数据分阶段变形时，加一张图。结构化流程用 mermaid，例如时序图、流程图、组件图。更简单的关系、用 mermaid 会过重时，用 ASCII。图是为了说清，不是装饰。散文已经覆盖流程，就不要图。
- Where Things Live。简短的文件和目录地图。只列开始在这里工作会用到的。
- Gotchas。不明显的事、意外行为、历史背景、坑。没有值得说的就删掉这一节。

措辞要具体。写 “the `UserService` calls `AuthClient.refresh()`”，不要写成 “the service delegates to the client”。复杂时说明为什么复杂。简单时不要垫字。有贴切的类比再用。没有就不要硬凑。探索者标出的开放问题或缺口要承认，不要藏起来。

### 使用例

下面两条来自原文，不是本书自拟。第一条在 README 的例子里。第二条在指南里。

```text
/how do we cancel runs? do we have an n+1 when we look up every run to cancel?
```

```text
/how do we dedupe notifications? is there an n+1 when we look up subscribers?
```

两条都把一个具体问题和一个具体怀疑放在一起。取消运行、去重通知，属于 “怎样运作”。查每次取消或每个订阅者时有没有 n+1，属于要顺着调用链看的数据访问。范围若只落在一个模块，走第 2b 步。若横跨多个服务，走第 2a 步再综合。

> **示例（本书作者所写，原文中没有）**
>
> `/how` 结账超时之后，订单从支付中回到待支付，经过哪个函数？

这是一个函数上的窄问题。按第 1 步走简单路径。一个讲解者只读地读代码，按上面的分节交回。不适用的分节丢掉。

### 陷阱与注意

拿不准复杂度时走简单路径。一个函数用不上 2 到 4 个探索者。

探索者接不上的连接要写成缺口。编出来的连接会进讲解。

呈现时只做清晰上的轻改。不要把讲解重写成另一篇文章。

图只在流程需要时出现。散文已经说清，就不要加图。

代码本身怎样跑，和它为什么长成这样，是两件事。后者用 [`why`](why.md#skill-why)。指南写明，怀疑历史能解释眼前的混乱时，可以先 `why` 再 `how`。提示 `do why first then how` 是正当的。{{src:docs/guide/03-understand.md}}

指南的坑是：不要因为代理反正会读代码，就跳过这一页的技能。没有追踪过的模型，代理容易在第一个说得通的地方修症状。先跑 `/how`，比第二个缺陷便宜。{{src:docs/guide/03-understand.md}}

### 相关技能

- [`why`](why.md#skill-why)。问的是形状从哪来。`how` 的 description 写明动机用它。
- [`teach`](teach-recall.md#skill-teach)。把 `how` 与 `why` 的发现织成一篇按人的节奏展开的说明。
- [`architect`](architect.md#skill-architect)。设计之前用 `how` 把要碰到的子系统落地。
- [工作剧本](playbooks-work.md)。README 写明，`/poteto-mode` 在步骤需要时会调用 `how`。{{src:README.md}}
- [`poteto-mode`](poteto-mode.md#skill-poteto-mode)。直接点名 `/how`，或由模式在步骤里调用。
- [`/setup-pstack`](setup.md#skill-setup-pstack)。`how explorer` 与 `how explainer` 两行覆盖默认模型。
