# 代码整理：no-comments 与 typescript-best-practices

评审前，`no-comments` 派出 `Comment Sicko`，处理它接受的发现，并为声称的约束提供编码。读或改任何 `.ts`、`.tsx` 文件时，`typescript-best-practices` 把类型纪律落到 TypeScript 语法上。

## no-comments {#skill-no-comments}

原文：{{src:skills/no-comments/SKILL.md}} {{src:docs/guide/05-build-and-clean.md}} {{src:skills/poteto-mode/SKILL.md}}

> 派出 Comment Sicko，按接受的发现行事，并为声称的约束提供编码。

### 何时使用

description 写的就是：派出 Comment Sicko，修复接受的发现，并为声称的约束提供编码。

`name` 是 `no-comments`。前置信息含 `disable-model-invocation: true`。正文没有定义这项。

[poteto-mode](poteto-mode.md#skill-poteto-mode) 的不可协商项写明，评审前走 `/no-comments`。指南 {{src:docs/guide/05-build-and-clean.md}} 写明，注释需要单独一趟，而且不能由写下它们的那个代理来做。作者会为自己的注释辩护，就像你会为自己的辩护。评审前把它们交给新的眼睛：

```text
/no-comments the diff
```

服从 Comment Sicko 的新鲜视角。不要复述它的规则。

### 运作方式

范围用调用者的文件或 diff。否则用相对基线分支的当前 diff，基线默认 `main`，并包含工作区。

1. 用 Task 派出，`subagent_type: "Comment Sicko"`。把范围传过去。不要复述它的规则。
2. 检查它的报告和 diff。驳回这些：对应用代码的编辑、范围逃逸、受例外保护的删除、说错的 `MUST KILL` 理由，以及把有意保留的代码当成有问题的旗标。对我们自己代码里的意外，重塑旗标仍然可行动。不要把那些注释恢复回去。一条保留只有在证明它关乎我们改不了的东西时才活下来。审计漏掉的、限定范围的 lint 和 TypeScript 抑制。正确性或安全类抑制仍然是可行动的 `MUST KILL`。只有带着确切例外和范围内的证明，才恢复删除。在接受单薄的 `IMPORTANT` 或 `do not remove` 删除或保留之前，对它们的符号跑 `/how` 或 `/why`。一条删除若含糊，不要恢复。一条保留若被推翻或仍然含糊，删掉它。把一份被驳回的报告回退，并点名失败后重跑一次。第二次再被驳回，就报告它仍开放，并使 `/no-comments` 失败。
3. 直接修掉接受了的、琐碎的旗标：删掉一条死路径，丢掉一个参数，或改用真实 API。任何修复需要一个形状时，对接受的那一组及周围代码跑一次 `/architect`。停在草图。Architect 定形状。第 4 步实现。
4. 在范围内实现最小的根因修复。去掉每一个被点名的权宜做法。根因在范围外时，落地范围内最小的修复，并将其余报告为开放。[principle-fix-root-causes](principles.md#skill-principle-fix-root-causes) 和 [principle-redesign-from-first-principles](principles.md#skill-principle-redesign-from-first-principles) 只引导意图。两者都不授权放宽围栏，也不授权去修围栏外的实例。从不把症状守卫栓上去。
5. 约束注释会说 `do not remove`、`do not change wording`，或 `talk to X before changing`。把关于我们改不了的东西的保留留下。提供范围内最便宜的类型、运行时、测试或 CI lint。等待交互式批准。无人值守和 eval 需要调用者事先批准。批准了就先编码再删除。否则删除，把约束报告为开放，并草拟范围外的工作。
6. 报告删除条数、恢复的注释、重跑、architect 草图、修复、编码提议、已做的编码、未强制的约束，以及其他开放工作。

### 使用例

指南的调用见上。README 的技能表写明：评审前剥掉注释。它会派出 Comment Sicko，修复接受的发现，并为声称的约束提供编码。通常经 `/no-comments` 调用，而不是直接派 Comment Sicko。

按第 2 步到第 6 步，父代理检查报告，修接受的旗标，对需要形状的那一组只取一次 architect 草图，在范围内做最小根因修复，对约束注释提供编码并等待批准，然后报告删除、恢复、重跑和仍开放的工作。

### 陷阱与注意

- 不要复述 Comment Sicko 的规则。服从它的新鲜视角。
- 驳回应用代码编辑。它的定义文件写明它不写应用代码。父代理仍要检查 diff，并驳回这类编辑。
- 对我们自己代码的意外，重塑旗标保持可行动。不要把那些注释恢复回去。
- 含糊的删除不要恢复。被推翻或仍然含糊的保留要删掉。
- 同一份报告第二次被驳回，就失败，不要无限重跑。
- 两条原则只引导意图。它们不授权扩大范围，也不授权去修范围外的实例。
- 不要栓上症状守卫。
- 约束的编码在交互式场景里要等批准。无人值守和 eval 要事先批准。不批准也要删掉注释，并把约束报告为开放。
- 正确性或安全类抑制保持为可行动的 `MUST KILL`。

指南写明分工：`/deslop` 清的是代码里的马虎，它属于 `cursor-team-kit`。`/unslop` 清的是散文。`/no-comments` 把注释交给一个没写过它们的审阅者。同一页的陷阱是：清理不是可选的抛光。带叙述注释和防御性死重的 diff，在审阅者看来像没做完，额外的代码也是下一个缺陷藏身处。

模式的 Comments 一节是写的时候就写干净。只保留代码看不出来的、不明显的为什么。验证或测试脚本不要写分阶段旁白，例如 `// Phase 1: add cards`。用断言或日志字符串记下这一步，例如 `assert(ok, 'persisted across restart')`。这适用于你产出的每个文件，包括被委托者的 diff。[Feature](playbooks-work.md#playbook-feature) 第 4 步把注释规则指回这一节。

### 相关技能

- [comment-sicko](#agent-comment-sicko)。第 1 步派出它。
- [how](how.md#skill-how)、[why](why.md#skill-why)。接受单薄的 `IMPORTANT` 或 `do not remove` 之前，对符号跑其中一个。
- [architect](architect.md#skill-architect)。需要形状时跑一次，停在草图。
- [principle-fix-root-causes](principles.md#skill-principle-fix-root-causes)、[principle-redesign-from-first-principles](principles.md#skill-principle-redesign-from-first-principles)。第 4 步写明它们只引导意图。
- [unslop](writing.md#skill-unslop)。指南把散文清理和注释清理分开。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。评审前走本技能。Comments 一节管写作时留下什么。

## comment-sicko {#agent-comment-sicko}

原文：{{src:agents/comment-sicko.md}} {{src:README.md}} {{src:docs/guide/05-build-and-clean.md}}

> 一个以删除为快、谴责权宜代码、并且仇视注释的审阅者。

### 何时使用

`name` 是 `Comment Sicko`。description 写的是：一个仇视注释的人，品尝删除，并谴责权宜代码。文件没有 `disable-model-invocation` 这一项。

被派出时使用。父代理经 `/no-comments` 用 Task 派出，`subagent_type: "Comment Sicko"`。README 写明，通常经 `/no-comments` 调用，而不是直接派。

交给它的是父级划定的文件或 diff。没有时，用相对 `main` 的当前 diff。叙述、横幅、被注释掉的废弃代码，以及为权宜做法写的长篇说明，都在清理之列。

### 运作方式

被派出时的第一段输出必须恰好是：

```text
Yes... Ha ha ha... Yes!
```

只有这些例外可以留下。

- 法律或许可证头。
- 由外部依赖、平台、厂商或协议强迫的、不明显的行为，而且我们重塑不了它。我们自己代码里的意外要删除。删掉注释，并把确切的符号标成 `MUST KILL`，以便重命名、抽出、改类型或重新架构，让行为不用散文也明显。
- `// prettier-ignore`。lint 抑制只有在规则本身有错、迂腐或只关风格时才活下来。
- 定义公开 API 契约的文档注释。
- 解释代码无法表达的约束的 issue 或 RFC 链接。

这张清单是唯一的界限。拿不准一条保留条款是否适用时，注释删除。其余一律删除。

`eslint-disable`、`@ts-ignore`、`@ts-expect-error` 以及类似的抑制都要先查规则。它若抓住真实缺陷，或保护正确性或安全，就删除抑制，并把确切的有问题符号标成 `MUST KILL`。

`IMPORTANT`、`do not remove`、`too risky`、`fine for now` 和长篇辩解只是气味，还不是已经成立的理由。判断之前先读附近的代码。说法在那里不明显时，对点名的符号或调用跑 `/how`、`/why`，或两者都跑，技能是 **how** 和 **why**。只有今天在一条活路径上被证明为真的、外来保留清单上的陷阱，才可以留下。我们自己代码的意外，按上面的重塑旗标删除。追查之后仍有怀疑，就删除。

没有被证明的保留清单例外的长篇辩解，等于承认这条注释不该留。删除它。从不把该删的注释润色成更短的托词。把确切的有问题符号标成 `MUST KILL`。删除到此为止。它不动代码。

每条旗标都点名范围内的代码，并说真话。它什么都不发明。它处理注释，并认出重构目标。它从不写应用代码。

只交报告。点名碰过的文件、删除条数、`MUST KILL` 旗标且每条一行，以及跳过的项。

README 称它为 read-only comment reviewer，并写明可以作为 `subagent_type: "Comment Sicko"` 使用，通常经 `/no-comments` 调用，而不是直接派。指南同样用 read-only reviewer 称呼它，并给出一份较短的保留清单：许可证头、公开 API 上的文档注释、解释代码做不到的事的链接，以及你重塑不了的外部依赖所强迫的行为。指南写其余的都去掉。我们自己代码里的意外没有这种豁免。注释作为重构旗标回来，`/no-comments` 在根因上修复它接受的旗标。

> **解说（本书的解释，原文中没有）**
>
> README 与指南用 read-only 称呼它。定义文件写它会处理注释、标出 `MUST KILL`、不写应用代码，并且只交报告。两处说法都在原文里。本书叙述它会做什么时，采用 `agents/comment-sicko.md`。指南的保留清单比定义文件短，没有单独写出 `// prettier-ignore` 和 lint 抑制的存活条件。清单以定义文件为准。

> **解说（本书的解释，原文中没有）**
>
> `no-comments` 在调用者没有给范围时，用相对基线分支的当前 diff，基线默认 `main`，并包含工作区。定义文件写的是父级划定的文件或 diff，没有时用相对 `main` 的当前 diff。两份文件没有再把工作区写进后者。本书按各自正文叙述。

### 使用例

README 给出的类型字段是：

```text
subagent_type: "Comment Sicko"
```

使用者通常不直接写这行，而运行 `/no-comments`。被派出后，第一段输出是上面那句固定的话，然后按保留清单处理范围内的注释并交报告。

### 陷阱与注意

- 拿不准保留条款是否适用，注释就死。
- 我们自己代码里的意外不是例外。标 `MUST KILL`，不要留散文。
- 正确性或安全类抑制要删除，并标出有问题的符号。
- 长篇辩解没有证明过的保留例外时，是供认。不要把它改写成更短的托词。
- 删除停在注释和旗标。定义文件写明它不动代码，也从不写应用代码。
- 每面旗标必须点名范围内的代码，并且不发明事实。
- 只交报告：碰过的文件、删除条数、每条一行的 `MUST KILL`、跳过的项。

### 相关技能

- [no-comments](#skill-no-comments)。通常由它派出。父代理检查报告，并实现接受的修复。
- [how](how.md#skill-how)、[why](why.md#skill-why)。附近代码看不出说法时，对符号跑它们。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。评审前的路由是 `/no-comments`，不是直接派本代理。

## typescript-best-practices {#skill-typescript-best-practices}

原文：{{src:skills/typescript-best-practices/SKILL.md}} {{src:skills/typescript-best-practices/references/patterns.md}}

> 读或编辑任何 TypeScript 时使用的实践。先应用 type-system-discipline 那条原则，再用下面的语法把它落地。

### 何时使用

正在读或编辑任何 `.ts` 或 `.tsx` 文件时使用。

`name` 是 `typescript-best-practices`。前置信息含 `paths: ["**/*.ts", "**/*.tsx"]` 和 `disable-model-invocation: true`。正文没有定义 `disable-model-invocation`。

指南 {{src:docs/guide/05-build-and-clean.md}} 写明，它在工作流里没有斜杠命令。代理碰到 `.ts` 或 `.tsx` 文件时它就加载，并把类型系统那条原则变成具体规则：可区分联合、边界上的 `unknown`、穷尽的变体、从 schema 派生的类型。

先应用 [principle-type-system-discipline](principles.md#skill-principle-type-system-discipline)。例子在 {{src:skills/typescript-best-practices/references/patterns.md}}。该文件写明，底下的原则与语言无关，并指向 type-system-discipline 与 boundary-discipline。

### 运作方式

下面每条都按技能正文的表，再用 `patterns.md` 补上形状。不把例子文件整篇抄进来。

**Discriminated unions。** 用 `kind` 字面量判别式为变体建模，使不可能的状态无法表示。不要用一袋可选字段。`patterns.md` 的反例是 `{ loading: boolean; diff?: GitDiff; error?: string }`，它允许互相矛盾的状态同时存在。正例是 `{ kind: "loading" } | { kind: "ready"; diff: GitDiff } | { kind: "error"; error: string }`。每个变体共享字段名，每个变体的值唯一。判别式的名字选一个并坚持，`kind`、`type` 或 `tag`。

**Branded types。** 用 `& { readonly __brand: "X" }` 给原始值打上标记，使它们不能混用。在边界校验一次。下游信任这个类型。`patterns.md` 要求匹配 `readonly __brand: 'X'` 这个形状，不要另发明一套约定。`durationMs` 保持普通数字。只有原始数字可能被传到需要时长的地方时才给它打标记，不要反射性地打。

**Constructive modeling。** 把形状建成非法值无法被构造出来。非空用 `[T, ...T[]]`。偶数长度用 `[T, T][]`。范围用 `start` 加 `duration`。这不是运行时守卫，也不是对 refinement type 的愿望。`patterns.md` 写明，从全是合法的零件把类型搭起来，而不是用运行时检查去限制一个松散类型。普通的 `T[]` 到来时，用守卫收窄一次，事实随后在类型里旅行：`const isNonEmpty = <T>(arr: T[]): arr is NonEmpty<T> => arr.length > 0`。时间范围的反例是 `{ start: Date; end: Date }` 再靠注释维持 `start <= end`。正例是 `{ start: Date; durationMs: number }`，负的范围写不出来，需要时再派生终点。选好无法构造坏状态的表示，再在上面暴露你需要的读法，例如 `pairs.flat()` 或 `rangeEnd()`。

**Simplest total type。** 只要对它的每个操作都保持全函数，就留着 `T[]`。只有松散类型迫使出现 `!`、一次转换，或一次 “should never happen” 的抛出时，才加强成 `NonEmpty<T>`。`patterns.md` 的全函数例子是对 `number[]` 求和，空数组得 0。加强的例子是 `newestSession`：输入从 `Session[]` 改成 `NonEmpty<Session>` 之后，`sessions.at(0)!` 消失。把结果放宽成 `Session | undefined` 是另一种全函数签名。不要把一切都加强。

**`unknown` over `any`。** 外部数据是 `unknown`。使用前收窄。外部来源在 `patterns.md` 里包括 RPC 载荷、`JSON.parse`、`postMessage`、IPC、文件内容、环境变量、数据库结果。

**Schemas before guards。** 在手写逐属性的类型守卫之前，使用仓库的运行时 schema 库，并从 schema 推断类型，例如 `z.infer`。让一个 schema 拥有校验，并从它派生 TypeScript 类型。不要同时维护一份 schema、一份重复的接口，和一份会互相漂移的守卫。失败是预期分支时用 `safeParse`。仓库用别的 schema 库时，用它对应的推断辅助。不要为了一个守卫去加新的 schema 依赖。这条规则偏好代码库已经信任的 schema 系统。

**No `as` casts。** 每一次 `as` 都是一次等着发生的运行时崩溃。只在校验之后转换。`patterns.md` 写明，重构掉已有的 `as` 时，先认出 TypeScript 为什么推不出来：缺判别式，就加一个并改成可区分联合。源类型太宽，例如 `Record<string, unknown>`，就收窄它。边界没有类型，就加解析函数或 schema。确实表达不了，就用带标记的类型或 `satisfies`。在边界把转换挣出来：全部字段校验之后，`return data as User` 才可以。

**Narrowing hierarchy。** 从最好到最后手段：判别式的 switch，然后 `in` 运算符，然后 `typeof` 或 `instanceof`，然后用户定义的类型守卫，然后 `as`。`patterns.md` 把它们编号为 1 到 5，并给出 `"radius" in s` 收窄到圆、否则收到矩形的例子。能用判别式收窄时，优先用它。

**Type guards。** 必须核实它声称的事。撒谎的守卫比 `as` 更糟，因为缺陷藏在一个说自己安全的名字后面。命名为 `isX` 或 `hasX`。`patterns.md` 的例子是 `isCircle`，返回 `s.kind === "circle"`，谓词类型是 `s is Shape & { kind: "circle" }`。

**Exhaustiveness。** 在 default 分支里内联 `const _exhaustive: never = x;`，这样新增变体时编译器会报错。`patterns.md` 区分两种写法。返回值的 switch 在 default 里 `return _exhaustive`。语句型的 switch 在 default 里 `void _exhaustive`。

**`satisfies` over `as`。** 校验值，同时不放宽字面量类型。`{ theme: "dark", cols: 3 } as Config` 会放宽，丢掉字面量。`satisfies Config` 既校验，又让 `config.theme` 保持为 `"dark"` 而不是 `string`。

**Boundary validation。** 在数据跨入的地方解析成一个有名字的领域类型。`Record<string, unknown>` 无论怎么拼写，都停在那次解析。内部信任类型。见 [principle-boundary-discipline](principles.md#skill-principle-boundary-discipline)。`patterns.md` 补充：线上格式（proto、JSON-RPC）解析时用 `ignoreUnknownFields`，这样向前兼容的变化不会弄坏旧客户端。持久化的 JSON 用带版本的 blob，解析包在 try/catch 里。不要在调用链深处重新校验。

**Schema-derived types。** 在声明新接口之前，先用 `Pick`、`Omit`、`Parameters`、`ReturnType`、`Awaited`、`typeof`。`.proto`、OpenAPI、GraphQL schema 或数据库迁移已经定义了形状时，从生成的类型派生，不要复制一份。`patterns.md` 的反例是手写 `CheckSummary`。正例是 `Pick<ChecksMessage, "totalCount" | "checks">`。

**Object args。** 传对象，不传位置参数，这样参数顺序自己就说明了自己。热路径上跳过：每帧渲染、分词器、解析器，以及分配成本要紧的紧循环。`patterns.md` 的反例是 `openFile(uri, { startLineNumber, ... })`，两个参数对调仍然能编译。正例把 `uri` 和 `selection` 放进一个对象。

**Real tests。** 能跑的就不要 mock。优先用框架真实的测试原语，并做泄漏和 disposable 检查。在运行中的构建里检查界面。只 mock 你在本地跑不了的东西。

**Structured telemetry。** 优先用带足够上下文的结构化日志诊断，以便凭一个 id 排错。交付的代码里不要 `console.log`。

### 使用例

指南写明工作流里没有斜杠命令。代理碰到 `.ts` 或 `.tsx` 时，先应用 type-system-discipline，再按上表检查正在读或改的语法。例如外部 JSON 在边界解析成带标记或可区分的领域类型，内部不再用 `as`，default 分支用 `never` 守住穷尽。

> **示例（本书作者所写，原文中没有）**
>
> 代理打开 `src/sessions.ts`，看见 `sessions.at(0)!` 和一袋可选字段。按本技能，它先把变体改成带 `kind` 的联合，只在空数组不可能的调用点把输入加强成 `NonEmpty`，并删掉那次 `!`。热路径上的解析器仍传位置参数。

这是本书为了把表用在一个文件上而写的示意。原文没有这个文件，也没有规定这次编辑的具体 diff。

### 陷阱与注意

- 不要用一袋可选字段表示变体。互相矛盾的组合不应当能编译。
- 不要发明新的 brand 约定。形状是 `readonly __brand`。
- 不要为了更精确而加强仍然全函数的 `T[]`。加强只发生在出现 `!`、转换或 “should never happen” 的地方。
- 撒谎的类型守卫比 `as` 更糟。
- 每一次 `as` 都要在校验之后挣到。
- 不要为了一个守卫去加新的 schema 依赖。用仓库已经信任的库。
- 不要在调用链深处重新校验已经在边界解析过的数据。
- 热路径不要为了对象参数去付分配。每帧渲染、分词器、解析器跳过。
- 能跑的不要 mock。交付代码里不要 `console.log`。
- 原则与语言无关。本技能只把它们落到 TypeScript 语法。别的语言用 type-system-discipline 自己的说法，例如 Rust 的带载荷枚举、`never` 以外的穷尽写法。

### 相关技能

- [principle-type-system-discipline](principles.md#skill-principle-type-system-discipline)。本技能要求先应用它。
- [principle-boundary-discipline](principles.md#skill-principle-boundary-discipline)。边界校验一节指向它。守卫集中在系统边界，内部信任类型。
- [no-comments](#skill-no-comments)。TypeScript 抑制若保护正确性或安全，Comment Sicko 把它们标成 `MUST KILL`。本技能要求用类型把非法状态变得无法表示，而不是留下抑制。两份文件没有互相点名。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。模式在设计类型或签名时索引 type-system-discipline。本技能是它在 `.ts` 与 `.tsx` 上的语法落地。
- [principle-encode-lessons-in-structure](principles.md#skill-principle-encode-lessons-in-structure)。type-system-discipline 在“从权威 schema 派生”时指向它。本技能的表写了 `Pick` 与 `z.infer`，没有点名这份原则。
