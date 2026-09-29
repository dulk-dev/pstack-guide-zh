# 写作：unslop 与 technical-writing

`unslop` 从任何文字里去掉生成文本的习气，description 写明必须始终适用。`technical-writing` 用四层标准写文档、RFC、readme、PR 描述和提交说明。目标是让疲倦的工程师第一遍就读懂。

## unslop {#skill-unslop}

原文：{{src:skills/unslop/SKILL.md}} {{src:docs/guide/05-build-and-clean.md}} {{src:docs/guide/10-recipes-and-pitfalls.md}} {{src:skills/poteto-mode/SKILL.md}}

> 编辑文字，去掉人工智能腔调。任何写作都要过这一遍。

### 何时使用

description 是：从任何写作里切掉人工智能的痕迹。必须始终适用。

`name` 是 `unslop`。前置信息含 `disable-model-invocation: true`。正文没有定义这项。description 仍然写着必须始终适用。

[poteto-mode](poteto-mode.md#skill-poteto-mode) 的不可协商项写明，任何文字表面都走本技能。回复也是文字表面，并按该模式的 Writing the reply 来写。给代理看的文字还遵循 Cursor 内建的 `create-skill`。

### 运作方式

1. 扫描下面这些模式。
2. 改写。保住意思，贴近本来要的语气。

规则编号是稳定 id，其他技能会引用。删掉一条规则就留下空号。现存编号是 3、5、7 到 20、22 到 33。正文没有给出空号里曾经写过什么。下面按原文的组说明，编号保持原文。

#### 内容

**规则 3. 表面的 -ing 短语。** “highlighting...”“ensuring...”“reflecting...”“showcasing...”“fostering...”。删掉，或补上真实来源后展开。

**规则 5. 含糊的归因。** “Experts believe”“Industry reports suggest”“Some critics argue”。点名来源，或删掉。

#### 语言

**规则 7. 人工智能词汇。** Additionally、crucial、delve、enduring、enhance、fostering、garner、interplay、intricate、抽象的 landscape、pivotal、showcase、抽象的 tapestry、testament、underscore、vibrant。换成普通词。

**规则 8. 花哨地说“是”。** “serves as”“stands as”“boasts”“features”。直接说 is 或 has。

**规则 9. “Not just X, but Y.”** 直接陈述要点。

**规则 10. 三件套。** 硬把想法编成三个一组。用自然的数量。

**规则 11. 同义词轮换。** 一段里同时用 protagonist、main character、central figure、hero。选一个，重复它。

**规则 12. 假的范围。** “from X to Y” 里的 X 和 Y 并不在有意义的尺度上。直接列出题目。

#### 风格

**规则 13. 长破折号用得太多。** 完全避免长破折号。只用句号或逗号。不用括号，不用短破折号，也不用连字符冒充破折号。一个想法需要分开时，结束句子，或用逗号。

**规则 14. 冒号用得太多。** 冒号可以用在列表或例子前面。不要用作句中的连接。原文的例子是，用冒号去比较传统自动化和描述条件，冒号本身什么也没加。改写成让要点自己站住，不靠比较的框。同一意思可以写成一句普通英语：描述调度器何时该触发，效果最好。模式的 Writing the reply 点名本条：句中用冒号连接也不行。列表前的冒号可以。

**规则 15. 粗体用得太多。** 不要把每个专有名词或缩写都加粗。

**规则 16. 行内小标题列表。** 痕迹是粗体标签加冒号，把这一行又说了一遍，例如 “**Performance:** Performance improved...”。把这种改成散文。粗体引导若以句号结束、点名这一项，后面跟着真正的新细节，例如 “**Schema in TypeScript.** Tables live in one file.”，这可以，不是痕迹。

**规则 17. 标题用词首大写。** 用句子式大小写。

**规则 18. 装饰性表情。** 从标题和项目符号里去掉。

**规则 19. 弯引号。** 换成直引号。

#### 交流痕迹

**规则 20. 聊天机器人套话。** “I hope this helps!”“Let me know if...”“Of course!”“Certainly!”“Found the smoking gun!” 去掉。

**规则 22. 奉承语气。** “Great question! You're absolutely right!” 直接回应。

#### 填充

**规则 23. 填充短语。** “In order to” 变成 “To”。“Due to the fact that” 变成 “Because”。“It is important to note that” 删掉。

**规则 24. 过度 hedging。** “could potentially possibly be argued that it might” 变成 “may”。

**规则 25. 空泛的结尾。** “The future looks bright.” 写下具体的计划或事实。

#### 行话

**规则 26. 抽象的隐喻名词。** Substrate、wedge、vector、locus、vantage、nexus、作名词的 primitive、作隐喻的 harness、作 “API surface” 那种 surface、bedrock、作隐喻的 scaffolding、modality、paradigm、gold-plating、作隐喻的 ratchet、用来表示搬代码的 evacuate、endgame、north star、flywheel。它们读起来像技术词，通常却有更普通的具体词。“Substrate” 变成 “base”。“Wedge in” 变成 “add”。“Vector” 变成 “way” 或 “method”。“Gold-plating” 变成 “more than the job needs”。“Ratchet” 变成这个机制的真名，或 “a limit that only tightens”。“Evacuate” 变成 “move out”。“Endgame” 变成 “the last phase”。选具体的词。

#### 明白话

**规则 27. 说它做什么，不说它感觉怎样。** “the database stays close at hand”“SQL you can read”“types that follow your schema” 说的是感觉。改法是点名机制或一个数字：“`.toSQL()` returns the exact string sent to the database”“a column rename fails the build”。问这句话让读者去做什么或知道什么，然后写那个。若你不能把它重述成具体的指示、事实或数字，就删掉。再检查一次：这句话若可以原样出现在另一个项目的文档里，它就没有说这个项目的任何事。删掉。

**规则 28. 缩短或拆开密句子。** 读者要倒回去才能读懂一句时，拆成两句，或丢掉从句。一句一个意思。

**规则 29. 主动语态。** 优先用它。抓住 “is/are/was/were + 过去分词”，并点名行动者。“queries are validated” 变成 “the compiler validates queries”。“the file is parsed by the loader” 变成 “the loader parses the file”。只有行动者未知，或确实无关时，被动才可以。

**规则 30. 删掉副词，或用更强的动词。** “runs quickly” 变成 “is fast” 或那个数字。“significantly improves” 变成测到的差值。副词撑着一个弱动词，说明动词错了。

**规则 31. 优先用普通词。** “utilize” 变成 “use”。“leverage” 变成 “use”。“facilitate” 变成 “help”。“numerous” 变成 “many”。“in the event that” 变成 “if”。更花哨的同义词很少更清楚。

**规则 32. 做作的散文。** 有字面说法时却用隐喻或花样。格言（“wire it or delete it”）、为了效果的修辞碎片、把代码拟人（“the plan holds it”）、比喻动词（“rides along”“stands on”）、现成的框定短语。“A dial worth turning” 变成 “a parameter worth varying”。说你的意思。隐喻名词归规则 26。

**规则 33. 压得太过。** 丢掉的冠词、没有动词的碎片、符号说话，以及让读者去解码而不是阅读的缩写。“Parser rejects bad date → exit 2, no write” 变成 “The parser rejects a bad date, exits with code 2, and writes nothing.” 用带冠词和动词的完整句子。把箭头和缩写写开。

### 使用例

下面来自原文，不是本书自拟。

指南 {{src:docs/guide/05-build-and-clean.md}}：

```text
/unslop the readme changes, no emdashes
```

同一页写明，简短提示也读得懂意图，例如 `unslop that, tighten it`。README 的例子是 `can we unslop and tighten the new changes?`。

配方页 {{src:docs/guide/10-recipes-and-pitfalls.md}}：

```text
/unslop that, no emdashes
```

该页把这种一句的转向提示当成足够。打开 PR 的剧本会把本技能用在 PR 描述和提交正文上。`/deslop` 扫的是 diff 里的代码，它属于另一个插件 `cursor-team-kit`，不在 pstack 里。

### 陷阱与注意

- 空号不要重新编号。其他技能按这些编号引用。
- 规则 13 禁止长破折号、短破折号，以及用连字符冒充破折号。用户可以在提示里再加 `no emdashes`，技能本身已经禁止。
- 规则 14 允许列表或例子前的冒号。句中连接不行。
- 规则 16 允许以句号结束、并带上新细节的粗体引导。禁止的是粗体标签加冒号、再把同一句说一遍。
- 改写保住意思和本来的语气。扫描之后才改写。
- 模式写明，回复在起草时就写干净。事后清理去不掉 Writing the reply 里的那些模式。本技能是文字表面的目录。两份文件都要满足。

### 相关技能

- [technical-writing](#skill-technical-writing)。它要求自己碰到的每份文档都应用本技能。本技能拥有腔调目录。新的隐喻冒犯词由那份技能写进回复里的 diff，不要直接改本技能。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。任何文字表面，包括回复，都走本技能。Writing the reply 点名规则 14。
- [工作类剧本](playbooks-work.md)。模式写明，每个剧本结束时的回复都按 Writing the reply 来写。
- [reflect](personal.md#skill-reflect)。README 写明，长任务落地后，用它把做法收成一次技能修改。本技能的规则目录本身不由 `technical-writing` 直接编辑。

## technical-writing {#skill-technical-writing}

原文：{{src:skills/technical-writing/SKILL.md}} {{src:skills/unslop/SKILL.md}} {{src:skills/poteto-mode/SKILL.md}}

> 分层的技术写作标准：文档种类用 Diátaxis，句子对读者用 Google 开发者风格，一句承载多少用 STE，句子能否两读用 Global English。

### 何时使用

用于 `/technical-writing`，或正在写、正在审文档、RFC、readme、PR 描述、提交说明。

`name` 是 `technical-writing`。前置信息含 `disable-model-invocation: true`。正文没有定义这项。

[poteto-mode](poteto-mode.md#skill-poteto-mode) 的不可协商项把文档、RFC、readme、PR 描述和提交说明交给本技能。

四层各问一个问题：这是哪种文档，句子怎样对读者说话，每句承载多少，有没有句子可以读成两样。四层都用。

### 运作方式

三条规定在各层之上。

- **删掉每一个不干活的词。** 句子没有某个词仍然成立，这个词就走。“In order to” 是 “to”。“It is important to note that” 什么都不是。
- **用短的、日常的词。** 用 use，不用 utilize。用 help，不用 facilitate。用 do，不用 perform。长词必须用精确性买下它的长度。
- **一条规则让句子变糟时，换一种办法修好，或留着不动。** 规则为读者服务。一句遵循了每一条规则、读起来却像机器写的，就是失败。

代码库就是词表。写真实的符号、文件、标志或命令名，不写同义词，也不写对它的描述。

不要发明行话。用开发者会说出口的词：“move”“delete”“a budget that only decreases”，不用 “evacuate”“ratchet”“endgame”。有名字的模式可以，只要文档在第一次说明它是什么意思。若要提议一个新的冒犯词和它的替换，把它作为对 `unslop` 抽象隐喻规则的增补写在回复里，并带上 diff。不要编辑那份技能。

#### 变换节奏

各层决定文档说什么，以及每句承载多少。一份文档可以全部遵守，却仍然读起来像机器写的：每句都裁得很短，哪里都没有看法，没有具体的东西。

- 有意混合句子长度。短句落地一个要点。长一点的句子带着条件或后果，把一个事实说完。
- 一句一个想法，并不是一句一个长度。拆开承载两个想法的句子。留住承载一个想法的长句。
- 在模式允许的地方有看法。解释要权衡取舍，所以说出你怎么看，不要只列优点和缺点。参考保持干。
- 具体，不要无菌。不要写 “schema changes can cause issues”，要写 “a column rename fails the build”。

#### 先选模式（Diátaxis）

一份文档，一种模式。两个问题决定它：内容是告知行动（做）还是告知理解（想），以及它服务学习还是服务工作。

- 行动加学习：**tutorial**。
- 行动加工作：**how-to**。
- 理解加工作：**reference**。
- 理解加学习：**explanation**。

这具罗盘可以用在整份文档上，也可以用在一句上。

**Tutorial：在做中学。** 你是老师。学习者的成功是你的工作，不是他们的。开头说学习者将做出什么，不说他们将 “learn” 什么。每一步都产生看得见的结果，早，而且常常。告诉他们应当看见什么：预期输出、提示的变化、那一行日志。解释收到一个从句加一个链接。教学停顿会打断课。保持具体。用 “we” 写，用命令写：“First, do x. Now, do y.”

**How-to：通向一个目标的步骤。** 解决一个人已有的问题，不是机器能做的一个操作。假定对方胜任。跳过教学。只有行动：不跑题，不讲背景，不为完整而完整。那些改成链接。允许分叉和判断：“If you want x, do y.” 用任务给指南起名：“How to calibrate the radar array”，不是 “Radar array calibration”。

**Reference：供查找的事实。** 描述。只描述。没有指示，没有劝说，没有意见。干、完整、确定。陈述事实、选项、限制和错误，不加 hedging。镜像被描述之物的结构，让代码和文档可以一起导航。把材料放在读者预期的地方。能从代码生成就生成，这样它保持为真。

**Explanation：理解和为什么。** 一个有边界的题目，离开产品也能读。每个标题都应当容得下一个隐含的 “About...”。锚在一个真实的为什么问题上。给出上下文：设计决定、历史、约束、替代方案。意见在这里允许，在别处不允许。

不要混合模式。教程里不要放参考表。参考里不要有教程式的手把手。how-to 里不要争论。拆开，然后链接。

来源：diataxis.fr，取于 2026-07-18。

#### 把句子写给读者（Google 开发者风格）

- 用 “you” 对读者说话，用现在时。“Will” 只用于确实发生在以后的事。
- 说谁做什么：“the compiler checks”，不是 “is checked”。只有行动者未知或无关时，被动才可以。
- 指示写成命令：“Click Submit.” 事实平直地陈述。从不写 “should be done”。
- 条件放在指示前面：“To delete the document, click Delete.” 读者跳过用不上的。
- 常见情况放前面。例外放后面。
- 听起来像一个懂行的朋友。没有流行词，没有比喻语言，指示里没有 “please”，步骤里从不写 “simply”“easy”“quickly”。若它简单，读者就不会在这里。
- 不要预告（“we will soon support...”）。不要让连续的句子以同一短语开头。
- 链接的文字说明链接通向哪里：页面标题或一句短描述。从不写 “click here”。优先在本页写一句上下文，而不是链到外面。
- 标题承载要点，不只承载题目（“Pick the mode first”，不是 “Modes”）。句子式大小写。任务标题是光秃的动词短语（“Create an instance”）。概念标题是名词短语。每页一个 h1，不跳级。
- 序列用编号列表，其余用项目符号。用一个完整句引出列表。各项保持平行。
- 代码用代码字体。界面元素用粗体。用连续逗号。丢掉 “etc.”，并事先说明列表是部分的。

来源：developers.google.com/style，取于 2026-07-18。

#### 一次只承载一件事（STE）

- 一句一个指示。其余地方一句一个想法。
- 长于大约 20 个词的指示，以及其他长于大约 25 个词的句子，拆开。
- 警告或条件放在它所守卫的步骤前面：“If hot oil touches your skin, injuries can occur.”
- 保留 “the” 和 “a”。“Remove backup file” 有两种读法。“Remove the backup file” 只有一种。
- 每个词一个意思、一件工作，然后保持。若 “check” 的意思是检查，就不要再用它表示约束。
- 每个动作选一个词并坚持：“start”，不要这里用 start、那里用 initiate。
- 步骤写成直接命令，从不写成叙述，也从不用被动：“Install the component”，不是 “the component must be installed”。
- 能避开 “-ing” 词就避开。它们承担太多语法职务，并滋生误读。

来源：asd-ste100.org（Issue 9，2025），取于 2026-07-18。编号规则和词典在规格 PDF 里。上面这些是可迁移的核心。本书不编号 PDF 里没有抄进技能正文的条款。

#### 不留两读的句子（Global English）

- 让 “only”“not” 这类词紧挨它们改变的那个词。“only fails on growth” 和 “fails only on growth” 说的是不同的事。
- 拆开长的名词串。“the proto import budget check script” 变成 “the script that checks the proto-import budget”。
- 让每个 “it”“they”“this” 指向一件明显的东西。拿不准就重复名词。从不让 “this” 或 “which” 指向整个从句。
- 不要丢掉动词。“Phase 1 moves the converters and Phase 2 the runtime” 让 Phase 2 没有动词。给它一个。
- 保留表示结构的小词。“Ensure that the switch is off” 保留 “that”，因为它让句子只有一种解析。从不为了词数牺牲清楚。
- 系列里重复冠词，若这样能防止误读。它们是两样东西时，写 “the client and the host”，不写 “the client and host”。
- 一句可以有两种分组时，说清 “and” 或 “or” 连接的是哪些部分。“Both...and”“either...or”“if...then” 是免费的消歧。
- 用句号，不用分号。长破折号换成新的一句。
- 括号里的文字是一个完整的语法单位，或自己成为一句。从不用 “(s)” 构成复数。
- 不用斜杠。写 “a, b, or both”，不写 “a/b” 或 “and/or”。
- 每样东西各处都用一个名字。一份文档对同一事物说 “the gate”“the ratchet”“the budget check”，就是在教三样东西。两次编辑之间把一句没变的话换个说法，代价相同。没变的不要来回改。
- 跳过习语、口语、拉丁缩写和隐喻。非母语读者、译者和代理，都最能解析普通结构。

来源：Kohl，*The Global English Style Guide*（SAS Press）。指南文字取自 Internet Archive 和 SAS 的样章，2026-07-18。

#### 声音与仓库

- 本技能碰到的每份文档都应用 **unslop**。那份技能拥有腔调目录：人工智能词汇、填充、hedging、格式痕迹。
- PR 描述和提交说明也是写作。除 Diátaxis 以外的每一层都用在它们上面。PR 正文是审阅者能在一分钟内读完的简报。不要粘贴 swarm 日志、SHA 列表或指标表。链接它们。
- 产品界面字符串不是文档。那些用产品自己的文案指南。
- 代码片段用制表符缩进。写真实路径和真实符号。每个计数或树的说法，在落地的那次提交上必须为真，并写上能重新生成它的命令。

#### 原文中的改写例

改写前：

> Configuration of the proto import ratchet budget script parameters is performed via budget.json. Note that it's important to remember that running with --write, which updates the committed budget to reflect the current count, should only be done when lowering it. If exceeded, CI fails.

改写后：

> `budget.mjs` reads the committed budget from `budget.json` and counts the files that import protos. If the count exceeds the budget, CI fails. Run `budget.mjs --write` only to lower the budget.

### 使用例

模式把调用名写成 `/technical-writing`，对象是文档、RFC、readme、PR 描述和提交说明。README 的技能表用同一组对象描述它：Diátaxis、Google 开发者风格、STE 和 Global English 叠在一起。

> **示例（本书作者所写，原文中没有）**
>
> `/technical-writing` 审这份 RFC。先定一种模式，句子写给读者，然后再过 `unslop`。

按原文，PR 正文不用 Diátaxis 这一层，其余三层以及层上的三条都用。不要粘贴 swarm 日志、SHA 列表或指标表。

### 陷阱与注意

- 一条规则让句子变糟时，换一种办法，或留着。读起来像机器写的，就是失败。
- 一份文档不要混合 Diátaxis 模式。拆开再链接。意见只属于 explanation。
- 不要编辑 `unslop`。新的隐喻词写进回复的 diff。
- 规格 PDF 里的 STE 编号条款没有抄进技能正文。不要把上面的核心假装成 PDF 的编号。
- 产品界面字符串不是这份标准的对象。
- 代码片段用制表符缩进。计数和树在落地提交上必须为真，并附上重新生成的命令。
- 标题用句子式大小写。每页一个 h1，不跳级。任务标题是动词短语，概念标题是名词短语。
- 不用分号。长破折号换成新句子。不用斜杠，不用 “(s)” 变复数。

### 相关技能

- [unslop](#skill-unslop)。本技能碰到的每份文档都应用它。腔调目录在那边。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。文档、RFC、readme、PR 描述和提交说明走本技能。回复本身走 `unslop`，并按 Writing the reply。
- [工作类剧本](playbooks-work.md)。每个剧本结束时的回复按模式来写。打开 PR 时，标题、描述和提交正文还要经过本技能。`/deslop` 属于 `cursor-team-kit`，在提交前扫 diff。
- [reflect](personal.md#skill-reflect)。README 写明它把落地后的做法收成技能修改。本技能禁止直接编辑 `unslop`。
- [principle-minimize-reader-load](principles.md#skill-principle-minimize-reader-load)。模式在代码难追踪时引用它，数层次和隐藏状态。本技能没有点名它。它管的是读者负担的代码一侧。文字表面由本节两份技能负责。
