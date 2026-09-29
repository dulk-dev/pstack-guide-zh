# automate-me、reflect 与 show-me-your-work

这三份技能分别处理三件事后的事。`/automate-me` 把你实际的工作习惯收成一份个人模式。`/reflect` 从当前会话里抽出还能用的教训，并路由到已有技能的修改。`/show-me-your-work` 为长时间或无人值守的工作留下一行一条决定的记录，供人回来审计。

`skills/automate-me/` 只有 `SKILL.md`，没有 `references/`，也没有 `scripts/`。另外两份带有参考提示或脚本，下面按文件摘要，不贴源码。

## automate-me {#skill-automate-me}

原文：{{src:skills/automate-me/SKILL.md}}

> 把使用者的工作习惯写成一份代理会遵守的 `-mode` 技能，例如 `jay-mode`、`priya-mode`。

### 何时使用

description 的触发说法包括 “automate me”、创建、更新或刷新自己的 `-mode` 技能、把偏好或工作风格收成技能，以及希望代理按使用者的方式工作。

README 把它放在 “make it yours”：`/poteto-mode` 是作者自己的风格，你未必想要完全一样。输入 `/automate-me`，它挖掘最近的转录，按你实际怎么工作起草 `<your-name>-mode`，底下仍然穿过 pstack 来路由。你保留 pstack 作为底座，并在 `poteto-mode` 旁边得到自己的路由技能。

前置信息有 `disable-model-invocation: true`。正文没有定义这项。同一字段在 [poteto-mode](poteto-mode.md#skill-poteto-mode) 里有本书的解说。

下面来自原文 README 的 examples。

```text
/automate-me
```

下面来自原文指南 `docs/guide/09-make-it-yours.md`。第二次运行时，只挖技能上次改动之后的历史。

```text
/automate-me update my mode skill with everything since its last edit
```

### 运作方式

这份技能编排另外三样东西，自己只负责顺序，不取代它们。第 1 步是一次内联的挖掘。执笔用 Cursor 内建的 `create-skill`。文字纪律用 [unslop](writing.md#skill-unslop)。

0. 先找已有技能。在 `.cursor/skills/**/*-mode/SKILL.md` 和 `~/.cursor/skills/*-mode/SKILL.md` 里递归查找与使用者名号相符的文件。模式技能可以放在个人分类目录 `.cursor/skills/<handle>/`，不必只在顶层。若已存在，用 `AskQuestion` 确认意图，除非对方已经说了 “update my skill” 或同类的话。选项是更新现有技能（重复运行时的默认），或另起一份（少见，做之前要问为什么）。更新模式会改后面的流程。第 1 步只挖该文件上次编辑之后的历史，时间用 `git log -1 --format=%cI <path>`。第 2 步问的是什么变了或漏了，不是从零开始要捕捉什么。第 4 步就地修改现有文件。使用者没有否定的节保留。有新证据的节修订。只有确实是新规则时才加新节。

1. 挖掘历史。扇出之前先定位当前工作区的转录。系统提示会给出该工作区的 `agent-transcripts/` 目录。只用那条路径。不要在 `~/.cursor/projects/*/` 上做全局搜索，那会跨过工作区，读到无关项目的私人对话。在这个范围内查看最近的代理对话，找反复出现的模式。用多个并行子代理切开历史，例如最近 2 到 4 周分成 3 片，让每一片都有足够材料。每片子代理只读父代理给出的工作区路径，按下面的信号找，并交回一份短的结构化模式列表，带证据指针。默认要找的信号是：回复偏好（长短、语气、格式、要求说得更明白的纠正）、分派习惯（子代理、模型、专门流程、并行）、怎样算做完（单元测试还是现场复现、审阅者）、代码与文字纪律（风格、引用过的原则、lint 和格式工具）、过程约定（工作树、提交、PR、审阅与合并工具）、元偏好（任务中途修技能、提议新技能）。跨片核对之后再抬高一条信号。出现在两片及以上的是高置信。孤单的信号弱，通常丢掉。

2. 直接问使用者。挖掘会漏掉还没发生过的意图。用 `AskQuestion` 做结构化多选，不要让对方从空白开始打字。形状是一到两个问题，每个 4 到 6 个选项。分类问题用 `allow_multiple: true`。先宽（哪些方面最要紧），再对选中的方面给具体选项。结构化轮次之后，用一个自由对话问题接住选项没盖住的东西。不要倒出 20 个问题。

3. 把发现聚类成节。只用用得上的。常见节名是 Response style、Autonomy、Understand first、Subagents、Prose / code discipline、Review and verify、Process、Skills。粒度看 [poteto-mode](poteto-mode.md#skill-poteto-mode) 的形状。读它是为了看详略，不要抄它的内容。使用者的规则和 poteto-mode 的规则不是同一套。

4. 起草。用 Cursor 内建的 `create-skill` 来写。路径：已有模式技能保留它的分类目录。新建时，若仓库里该名号已有个人分类，用 `.cursor/skills/<handle>/<handle>-mode/SKILL.md`。否则默认放在项目的 `.cursor/skills/<handle>-mode/SKILL.md`。若使用者希望技能属于个人，则用 `~/.cursor/skills/<handle>-mode/`。名号用名字或选定的标识。frontmatter 的 `description` 要在对方的名字、`/<handle>-mode` 和 “work in their style” 上触发，不要用 “write code” 或 “review PR” 这类泛关键词。YAML 遵循 `create-skill` 的规则。`description` 保持一个标量。标点或换行需要时加引号，或用 `description: >-` 加缩进续行。默认写上 `disable-model-invocation: true`。只有使用者明确希望自己的模式每一轮都生效时才去掉。

5. 打磨文字。每一行都过 [unslop](writing.md#skill-unslop) 和 `create-skill` 的写作要求。把草稿给使用者看，并接受反馈。预期要来回多次。删得狠。一份模式技能不是手册。

6. 落地。在 `main` 之外的工作树里做。提交并打开 PR。不要直接推到 `main`。

评价方式写在技能末尾。`-mode` 技能是主观产出。`create-skill` 那种测试再迭代的基准循环在这里没用。和使用者对一下感觉：读起来像不像本人，有没有漏。然后交付。只有触发准确度在实际使用里出了问题，才跑一轮 description 优化。

### 使用例

上面两则调用就是原文给出的用法。第一次不描述风格，因为技能从历史里读。更新时说明自上次编辑以来。

> **示例（本书作者所写，原文中没有）**
>
> `/automate-me` 我已经有 `mina-mode`。只补上最近两周我反复要求的提交和审阅习惯。

### 陷阱与注意

技能自己的护栏：

- 不要拟合到一次对话。同一偏好说过一次、另一次又被否定，那是噪声。写进技能之前要有多次实例。
- 不要耍聪明。复述其他技能的正文、发明隐喻，或给代理读者写 “诗意” 的文字，只有成本没有好处。保持可操作。
- 引用，不要内嵌。使用者依赖的其他技能写成路径引用，不要粘贴摘录。对方在别处维护的原则文档也一样。
- 节保持最小。只有使用者在那里有一条具体的、非默认的规则时才加节。“Communicate clearly” 不是一节。“Short paragraphs. Tables when comparing options. Bullets only when items are genuinely parallel.” 才是。
- 约定用泛称。祈使句里写 “the user” 或 “the human”，不写作者的名字。
- 不要强行对称。若没有值得写下的过程规则，整节 Process 都不要。

何时不用：对方要的是针对某一任务的技能，不是工作习惯。那时只用 `create-skill`，不必挖掘。对方要捕捉一条窄流程，例如 “我怎样写提交说明”。那是普通技能，不是模式技能。

### 相关技能

执笔走 Cursor 内建的 `create-skill`。文字走 [unslop](writing.md#skill-unslop)。形状参考 [poteto-mode](poteto-mode.md#skill-poteto-mode)，不抄内容。会话教训改已有技能时走 [reflect](#skill-reflect)。离开后要审计的运行走 [show-me-your-work](#skill-show-me-your-work)。

## reflect {#skill-reflect}

原文：{{src:skills/reflect/SKILL.md}} {{src:skills/reflect/references/judgment-reviewer.md}} {{src:skills/reflect/references/tooling-reviewer.md}} {{src:skills/reflect/references/divergent-reviewer.md}} {{src:skills/reflect/references/synthesizer.md}}

> 从当前对话里挖出还能用的教训，再路由成对已有技能的修改。

### 何时使用

使用者说 “reflect” 或 `/reflect` 时调用。对话琐碎、离题，或已有技能已被父代理正确遵循、因而已经覆盖时，跳过。一次性的事不是教训。

README 的说法是：长任务落地之后，要把这次的做法收成对技能的修改。

前置信息有 `disable-model-invocation: true`。正文没有定义这项。

下面来自原文 README 的 examples。

```text
/reflect that took too long. capture what we learned so the next run doesn't repeat it.
```

下面来自原文指南 `docs/guide/09-make-it-yours.md`。指南要求：只批准那些会改变以后某次决定的提议。一次古怪的会话是轶事，不是规则。

```text
/reflect that took way too long. capture what we learned so the next run doesn't repeat it.
```

### 运作方式

1. 定位当前转录。父代理在扇出之前找到自己的转录文件。系统提示给出当前工作区的 `agent-transcripts/`。用那条路径。不要在 `~/.cursor/projects/*/` 上全局搜索。技能给出的列举是 `ls -t`，覆盖三种布局：旧的平铺 `<id>.jsonl`、现在的嵌套 `<id>/<id>.jsonl`，以及子代理 `<parent>/subagents/<child>.jsonl`。对每个候选，读 JSONL 的第一行，确认 `message.content[0].text` 含有这次对话开头的用户提示。取匹配的路径。没有路径时，写一份紧的会话摘要，改传摘要。

2. 并行派出三名审阅者。一条消息里三次 `Task`，`subagent_type: generalPurpose`，`model` 按下表，agent 模式（`readonly: false`）。审阅者需要 MCP，以便查转录里提到的票据、聊天线程和可观测性踪迹。只读会剥掉 MCP。每名审阅者和后面的综合者都在 `pstack-models.mdc` 里有一行角色，并有默认模型。`model` 设成那一行的值。规则或该行缺失时用默认。值是 `auto` 或 `inherit-parent` 时不设 `model`。Task 拒绝某个 slug 时，改用默认并说明。默认也被拒绝时，用报错信息里同一族里最接近的合法 slug。

   | 镜头 | 角色行 | 默认 `model` | 提示模板 |
   | --- | --- | --- | --- |
   | Judgment | `reflect judgment, divergent, synthesizer` | `claude-opus-5-5-max` | `references/judgment-reviewer.md` |
   | Tooling | `reflect tooling` | `gpt-5.6-sol-max` | `references/tooling-reviewer.md` |
   | Divergent | `reflect judgment, divergent, synthesizer` | `claude-opus-5-5-max` | `references/divergent-reviewer.md` |

   模板原样传入，只在标明处代入转录路径或摘要。审阅者把发现放在 `Task` 的回复正文里。

3. 综合。再一次 `Task`，同样是 `generalPurpose`、agent 模式。模型来自 `reflect judgment, divergent, synthesizer` 那一行，默认 `claude-opus-5-5-max`。综合者的质量检查包括抽查引用，这可能需要 MCP。使用 `references/synthesizer.md`，在标明处内嵌每名审阅者的完整输出。返回结构化的 Accepted、Rejected、Backlog 三份清单。

4. 结构执行检查。审一遍综合者的 Accepted。若某一条用 lint 规则、脚本、元数据旗标或运行时检查会执行得更可靠，就从 Accepted 移到 Backlog。见 [encode-lessons-in-structure](principles.md#skill-principle-encode-lessons-in-structure)。

5. 应用。在改任何 Accepted 项之前，把综合者的三份清单全文给使用者看，并等待明确批准。使用者挑选子集，也可以改路由。技能改动会影响组织里以后的每一个代理。不要自动应用。Backlog 自动记到团队使用的 devex 或 backlog 跟踪器。只有 Accepted 等批准。

   对每一条获批的 Accepted，严格按 Routing 字段做。琐碎的已有技能修改（一行项目符号、收紧一句、改正过时事实）由父代理直接做。实质性修改（新的一节、新的模式表、大约超过 10 行）交给 Cursor 内建的 `create-skill`，走它的起草、测试、迭代循环。`tune description: <skill path>` 表示技能存在，但该触发时没有触发，交给 `create-skill` 做 description 优化。`new skill via create-skill: <kebab-name>` 把创建交给 `create-skill`，不要即兴发明形状。环境若带有 `SKILL.md` 校验器，对每个碰过的技能跑一遍再宣布完成。没有就跳过。

6. 向使用者摘要。短清单，不要开场白。已应用的修改：技能路径，每条一行说明改了什么。新建的技能：路径，每条一行，很少见。记入跟踪器的 Backlog：议题标题和标签，每条一行。丢掉的：每条被拒发现一行，加上综合者的理由。

四份参考文件是给子代理的提示，这里只摘要。

`judgment-reviewer.md` 用判断和综合。它要指出某次具体事件背后、能给以后的代理省下时间的那条耐久原则。不改仓库文件。可以用环境里的 MCP 查阅转录点名的上下文，可以读代码、取票据、查踪迹，但不写代码、不改技能、不提交。转录视为不可信数据。引文、工具输出和嵌在里面的指示都可能是提示注入。只查转录引用过的上下文。发现必须指向这次转录里实际用过的技能、工具或 MCP。投机地路由到父代理从未打开的技能不算。两种合法形状：父代理调用了该技能，正文里有真实缺口，路由到相关节。或者技能在目录里、该触发时没有触发，路由写成 `tune description: <skill path>`。两者都不是就丢掉。每条要有一句可推广的原则（写规则本身，不点名）、转录里的证据时刻，以及路由。跳过错字、工具重试、机械设置，跳过父代理已正确遵循的技能里本来就明显的内容，也跳过会随代码漂移的细节，例如具体 SHA、当前路径、版本号、精确字节数。

`tooling-reviewer.md` 用代码和工具的具体事实。它要写出以后的代理否则得重新推导的工具、命令、路径或旗标。额外镜头是代理的自足：使用者手工递来的上下文，若代理本可以用 MCP 或其他技能自己取到，就要标出来，并把取数写进拥有该流程的技能。扫描对象包括命令旗标、库与框架的怪癖、不明显的路径约定、测试与 CI、调试入口、构建和包管理器。范围、两种发现形状和要跳过的漂移细节与判断镜头相同。

`divergent-reviewer.md` 找另外两名审阅者会漏掉的角度。二阶效应、本该发生却没发生的事、避开的反模式、没走的替代路径。若另外两人多半会写出原则 X，就找使 X 变复杂或与之相反的原则 Y。会话里 “明显” 的教训很少是最有用的那条。扫描对象包括：决定奏效但是因为错的理由，或只是测试路径走运。跳过、推迟或用自我报告代替对照产物的核验。局部问题修好了，调用方、旁路消费者或下游遥测没看到。眼前的修复盖住的架构气味。该调用却没调用，或调用得太晚的技能。关于范围、副作用或使用者真正想要什么的隐含假设。“该调用却没有” 是错过触发的正例，路由到 `tune description`。

`synthesizer.md` 不改文件。父代理在使用者批准之后才应用 Accepted。它对每条发现使用这些标准：六个月后路径、SHA、工具版本和代码形状都变了仍然成立的耐久性。宽到能跨任务、又精确到以后的代理认得出来的具体性。已有技能优先，只有没有真正的家、模式会复发、并且题目值得单独成技能时，才提议 `new skill via create-skill:`。两名及以上审阅者同时提到的发现置信更高。孤单的发现在其他标准上要过更高的杠。必须改变以后的做法，而不是只让人多读一段文字。若 lint、脚本、旗标或运行时检查已经或可以便宜地执行这条规则，就送进 Backlog。只接受路由到父代理实际调用过的技能、工具或 MCP 的发现。该触发却没用上，就改成 `tune description`。都不是，就以 `skill-not-used` 拒绝。接受正文修改之前先读目标技能。若提议只是重复已经写清楚、放对位置的指导，以 `already-covered` 拒绝，问题在执行。若现有指导埋得深、弱、容易滑过去，可以接受，但改写成让它生效的措辞或位置，而不是再添一条重复。输出只有三节：Accepted 表（Problem、Proposal、Routing，一行一条，使用者逐行批准）、Rejected（每条一句原则，加上 durability、specificity、existing-skill-first、convergence、decision-changing、structural、duplicate、skill-not-used、already-covered 之一）、Backlog（模式、碰到了什么、建议的机制，由父代理记入团队的跟踪器）。

### 使用例

调用例就是上一节的两句原文。技能随后做的事是三名审阅者、一名综合者，然后把清单交给人批准。它不会在批准前改技能。

### 陷阱与注意

一次对话里的偶然纠正不是教训。父代理已经按现有技能做对的事，不要再写成新条文。会过期的 SHA、路径和版本号要丢掉。技能改动面是以后每一个代理，所以 Accepted 必须等人点头。能做成检查或脚本的，从 Accepted 挪到 Backlog，不要再加一段散文。

### 相关技能

实质性修改和 description 优化走 Cursor 内建的 `create-skill`。结构上更能执行的教训走 [encode-lessons-in-structure](principles.md#skill-principle-encode-lessons-in-structure)。个人模式的起草走 [automate-me](#skill-automate-me)。模型角色行由 [setup-pstack](setup.md#skill-setup-pstack) 写入。

## show-me-your-work {#skill-show-me-your-work}

原文：{{src:skills/show-me-your-work/SKILL.md}} {{src:skills/show-me-your-work/references/decision-log-template.tsv}} {{src:skills/show-me-your-work/scripts/log.sh}}

> 为长时间或无人值守的工作保留一份可审阅的决策轨迹：一份 TSV，一行一个决定。

### 何时使用

description 的场合是 `/show-me-your-work`、自主或多阶段运行，以及人走开之后才审阅的工作。默认留在本地。审阅者需要这条轨迹才肯信任结果时，再提交它。

[poteto-mode](poteto-mode.md#skill-poteto-mode) 把长时间、自主、多阶段，以及 “going to bed”、“trust it when i'm back”、“/loop until X” 都路由到这里。

前置信息有 `disable-model-invocation: true`。正文没有定义这项。

下面来自原文 README 的 examples。

```text
/show-me-your-work keep a decision trail i can review when i'm back.
```

早上把夜间运行要回来时，原文指南 `docs/guide/07-overnight.md` 用的是：

```text
/show-me-your-work catch me up on what you did last night
```

### 运作方式

只保留一份规范日志。格式是单个 TSV 文件，一行一个决定。单元格保持单行。证据是指针，不是散文。

新日志从 `references/decision-log-template.tsv` 抄表头开始。该文件只有一行表头：`ts`、`phase`、`decision`、`why`、`evidence`、`result`。各列的意思是：`ts` 为 ISO8601 时间戳。`phase` 为阶段或工作流。`decision` 为一行里选定或做成的事。`why` 用平常的话写理由。若某条原则推动了它，就用平常的话说出来，不要写成行话标签。`evidence` 是证明它的链接或路径，例如提交 SHA、PR 号、`file:line`，或产物、踪迹、截图路径。绝不是一段话。`result` 是结果或谓词状态，例如 `tests green`、`reverted`、`pixel-diff 0`、`INCONCLUSIVE`、`open`。

技能正文里有一张四行的例子，时间都在 `2026-05-24`，阶段依次是 `frame`、`harness`、`widget`。内容分别是先数工作量、改之前先给旧版本截图、在外观不变的前提下迁样式，以及因为截图是空白而丢掉帮手的工作并重置工作树。本书不把那张表再贴一遍。写的时候用你会告诉队友的方式：平常的话、具体的动作、不要人工智能腔或抽象行话。日志文字也适用 [unslop](writing.md#skill-unslop)。

记决定点和检查点，不要记每一个动作。记一次选定的分叉、一个完成并带有核验结果的单元、一次转向或回退及其触发、一个露出的阻塞、一道修好的门。循环运行时一轮一行。琐碎和自明的跳过。

一次运行是一段代理对话，包括后面的回合和对它的摘要。接上、替换的代理或新聊天开始一次新运行。当一次运行往已有行的日志里追加时，它的第一行 `phase` 是 `start`。另一次运行的 `start` 之后，它的第一行也是 `start`。所以一次运行回到一份日志时，先读末尾行，看中间是否有别的运行写过。`start` 行要写出它没写过的、位于它前面的那些行的 `ts` 范围，证据里写明这次运行，例如代理 id。`start` 不用做别的事。

`scripts/log.sh` 的用法是 `log.sh <logfile> <phase> <decision> <why> <evidence> <result>`。它写入 UTC 的 `ts`，文件为空或不存在时先写表头，去掉单元格里的制表符和换行，并给以 `=`、`+`、`-` 或 `@` 开头的单元格加一个单引号，避免电子表格把它们当成公式。参数必须正好六个，否则它向标准错误打印用法并以非零状态退出。日志目录不存在时它会创建。追加用 `>>`。裸的 `printf` 追加一行也可以，但单元格来自生成文本或用户文本时，同样要处理这些字节。源码不在这里展开。

默认位置是工作目录里的 `decisions.tsv`。同一目录里有几项努力时，用 `.audit/<task-slug>.tsv`。默认不提交，把它排除在 git 之外。只有工作大到审阅者需要这条轨迹才肯信任结果时才提交。

规则有两条。只追加。错误的决定用新的一行取代它。不要编辑或删除历史。证据优先用已提交脚本产出的，而不是手做的一次性东西。见 [encode-lessons-in-structure](principles.md#skill-principle-encode-lessons-in-structure)。

运行结束、交回之前，对照转录审计日志是否说了真话。读的是当前工作区 `agent-transcripts/` 里这次运行的转录，系统提示给出路径。不要全局搜索 `~/.cursor/projects/*/`。本次运行的行段从它自己的某个 `start` 行开始，若这次运行创建了日志则从第一行开始，结束于另一次运行的下一个 `start` 行。检查每一行都对应真实的决定或动作。检查每行的证据能解析，并且显示的就是该行所声称的。塑造了工作却没记下来的分叉、转向或放弃的做法是缺口，补上。改的是日志，不是故事。审计即使面对编造的行，也不编辑、不删除。某行既不是真实决定也不是真实动作，或声称与证据是错的，就追加一行，写上实际发生的事和能解析的指针。这次审计不检查本次运行行段之外的行。若本次运行自己的工作表明外面某一行是错的，仍用新行取代，如同任何错误决定。

交回之前，再派一个子代理，模型族要和做这项工作的那个不同。自我审阅不能代替。子代理读审计轨迹和这次运行的转录，标出使用者该注意的地方。这不是把工作重做一遍，而是扫描次优或有风险的地方。弱证据或没有证据的决定。跳过了的核验，或转录里没有证明却声称做过的核验。事后看有风险的选择，例如过早、范围爬升、把症状糊住。使用者随便扫一眼会漏掉的缺口。

凡是产出了轨迹的运行，每则回复都以 “Attention” 一节结束。先单独一行写审阅者的模型，形式是 `reviewed by <model>`，然后每条旗标指向具体的行或时刻。“No flags” 是合法的值。模型名不是可省略的。

审阅轨迹时从上往下读，顺着证据指针抽查。GitHub 会把已提交的 TSV 渲染成表。终端里用 `column -s$'\t' -t decisions.tsv`。

### 使用例

离开前用 README 那句，让运行开始记。回来后用指南那句，让技能交回摘要。交回前会有另一模型族的审阅，回复末尾是 Attention。先读那一节，再顺着它指向的行看。审计的是决定，不是把整夜重读一遍。这一点写在过夜指南里，步骤见 [过夜运行](overnight.md)。

### 陷阱与注意

不要改历史行。不要把证据写成一段话。不要把每次细小动作都记一行。`start` 只表示一次运行接上已有日志。其他技能不要另造一套列。按名字引用这份技能，格式由它拥有，不要把列再复述一遍。

### 相关技能

日志文字走 [unslop](writing.md#skill-unslop)。能做成脚本的证据走 [encode-lessons-in-structure](principles.md#skill-principle-encode-lessons-in-structure)。过夜循环和队列剧本见 [过夜运行](overnight.md)，其中 [Autonomous run](playbooks-long.md#playbook-autonomous-run) 要求每一轮在这里做检查点。
