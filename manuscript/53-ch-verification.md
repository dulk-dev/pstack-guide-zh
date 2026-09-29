# 验证技能：create-verification-skill 与 maintain-verification-skill

项目若没有写好的办法去驱动真实应用，代理就无法按用户的方式走一遍功能并留下证据。本章的两份技能负责生成并维护这条项目本地的路径。这里的验证(verification)是可重复地检查真实行为，并留下事后仍能查看的证据。

![样机沿真实航线飞行，她用秒表计时](images/verification.jpg)

原文插图：{{src:docs/guide/images/verification.jpg}} {{src:docs/guide/06-verify-and-ship.md}}

那一页讲的是在真实界面上证明行为，然后交付。页首写明，能编译不是证据。[principle-prove-it-works](principles.md#skill-principle-prove-it-works) 让代理在报告成功之前检查真实产物。你的工作是让“真实产物”变得可以检查。该页覆盖：先写明完成条件，为应用生成本章的技能，打开 PR，再把它开到可合并。原文图片的替代文字还写着，终端上是 `verify: pass, evidence: captured`。

该页要求把检查配上改动。命令行改动跑真实命令。界面改动在运行中的应用里走被改过的流程。解析器或迁移重放一份保存的输入。性能改动比较前后的剖面。存储改动读回写进去的值。回复应当带上确切的命令和输出。某项检查跑不了时，好的回复说 “inconclusive”。没有证据却很有把握的回复，应当当成危险信号。

## create-verification-skill {#skill-create-verification-skill}

原文：{{src:skills/create-verification-skill/SKILL.md}} {{src:skills/create-verification-skill/references/feature-map-example/README.md}} {{src:skills/create-verification-skill/references/feature-map-example/create-note.md}} {{src:skills/create-verification-skill/references/feature-map-example/search.md}} {{src:docs/guide/06-verify-and-ship.md}} {{src:skills/setup-pstack/SKILL.md}}

> 为仓库生成一份项目本地的技能，让代理像用户那样驱动真实应用并证明行为。任何语言、框架或平台都可以。

### 何时使用

用于 `/create-verification-skill`，或 “make a control skill for this repo”，或项目还没有脚本化的办法来证明界面、命令行或服务的行为。

`name` 是 `create-verification-skill`。前置信息含 `disable-model-invocation: true`。正文没有定义这项。

每个认真的项目都需要一条写好的路径：启动真实应用，像用户那样走一项功能，并捕获证据。本技能把这生成成项目本地技能 `.cursor/skills/verify-<app>/`，按仓库定制。你写的是给下一个代理看的生成结果，不是给人看的说明书。它会在任务中途被一个从没见过这个应用的代理冷读。

[setup-pstack](setup.md#skill-setup-pstack) 第 7 步是可选项。它检查项目有没有办法驱动真实应用来取证：一个 `verify-*` 技能，或一份已有的 harness。两个都没有，就提议一次，原句是：

```text
want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /create-verification-skill.
```

同意就调用 `/create-verification-skill`。这个命令按 pstack 的安装位置解析，可以在工作区、用户目录或插件里。拒绝就继续，不再追问。

### 运作方式

#### 1. 问仓库，不问用户

能从代码库回答的问题就从代码库回答。只有观察不到的才问用户。

- **Surface。** 用户实际碰到的是什么。Web 界面、命令行或 TUI、桌面应用、API、移动应用，还是库。一个仓库可以有好几样。选主要的那一个，并记下其余的。
- **Run。** 应用在本地怎么启动。优先用仓库自己写明的开发命令，例如包脚本、Makefile、README 的快速开始。记下端口、环境变量、种子数据和认证。
- **Drive。** 代理怎样用程序与它交互。先找已有的 harness：Playwright 或 Cypress 规格、expect 脚本、PTY 辅助、可 curl 的端点、调试端口。然后才选通用做法：Web 和 Electron 用浏览器与 CDP，命令行和 TUI 用 tmux 或 PTY，服务用普通 HTTP。
- **Observe。** 能捕获什么证据。截图、终端记录、响应体、日志、退出码、数据库状态。
- **Isolate。** 两个实例能否并排跑（端口、数据目录、配置档）。不能的话，写进生成的技能：拒绝同时驱动一个共享实例，好过弄坏用户的会话。

检出的代码若按现状构建不了或启动不了，先修，或精确报告，然后再生成。对着一个坏掉的底座写技能，会教出错的步骤。无关的缺失资产挡住启动时（API 从不提供的静态目录、一份样例配置），生成的技能可以创建它，明确标成验证用的脚手架，并在清理时删掉。

#### 2. 生成技能

写下 `.cursor/skills/verify-<app>/SKILL.md`。YAML 前置信息含 `name: verify-<app>`，以及一份 `description`。description 点明应用、表面，以及何时该用它。没有前置信息，技能不会注册。下面各节都扎在访谈实际发现的东西上，不留占位符。

- **Launch。** 为这次检查启动应用的确切命令，以及怎样判断它已就绪（一行日志、一个有响应的端口、一个提示）。包含拆除。短命的命令行或 TUI 没有要保持活着的服务器。Launch 的意思是把二进制构建一次（或装好依赖），然后每次驱动都在自己隔离的 PTY 或 tmux 会话里启动。
- **Doctor。** 一次只读检查，回答“这个实例值不值得驱动”。进程在、版本或构建对、端口归我们、认证有效。任何东西看起来不对时，代理先跑这个。
- **Drive。** harness 的做法，用这个仓库里的真实选择器或命令，不用例子。优先稳定的把手（ARIA 标签、数据属性、提示字符串、路由路径），不用坐标和 Tab 顺序。
- **Evidence。** 一次证明要捕获什么、放到哪里。证明标准是：走真实的用户路径，不走内部 setter 或仅供测试的端点。捕获动作和随之而来的状态，不只捕获最终画面。副作用（写下的文件、插入的行、发出的消息）和看得见的东西一起核对。mock 只用在生产边界已经把外部系统隔开的地方。安全路径若是 dry-run 或测试模式，就用观察来核对它实际跳过了什么（文件、网络、git 引用），不要信任这个名字。有些 dry-run 仍然会碰网络或打开浏览器。
- **Cleanup。** 怎样拆掉这次运行创建的实例。不要按进程名杀。杀你启动的那些。清理去掉实例和临时状态，从不去掉证据。证明产物在拆除之后仍然留着，位置由技能写明。
- **Helpers。** 技能带上的任何脚本都是可执行的，并且调用方式写在技能正文里。读者还得反向工程的辅助，就不算辅助。

#### 3. 种下功能地图

创建 `.cursor/skills/verify-<app>/features/README.md`，以及你能认出的每个面向用户的功能各一份文件。起步时对准最重要的 3 到 5 个，来自路由、命令、菜单或文档。形状跟随 {{src:skills/create-verification-skill/references/feature-map-example/README.md}}：一份 README 索引，每个功能一份文件。每份文件从用户的角度看：功能是什么，怎么到达，怎样用 harness 驱动，什么样的可观察终态证明它能工作。四个二级标题是 `Sub-features`、`How to get to it (user POV)`、`Driving it with <harness>`、`Gotchas`。地图是仓库里被维护的检查来源。地图列出了其他入口时，只驱动一个方便入口的证明是不完整的。

例子摘要如下，不把两篇功能文件整篇抄进来。

索引 {{src:skills/create-verification-skill/references/feature-map-example/README.md}} 演示一个叫 Notes 的应用。它是这份用户可见行为的维护来源。驱动之前先读索引，再用对应的功能文件当步骤。基线前提包括：在 `http://127.0.0.1:4173` 启动，数据目录一次性使用，`NOTES_DATA_DIR=/tmp/notes-verify-$RUN_ID`，以免并发运行共享状态。种子笔记的标题是 `Quarterly plan` 和 `Grocery list`。`control-notes` 和 `notes` 命令行在 `PATH` 上。跑 `control-notes doctor`，并要求预期的 URL、数据目录和构建修订。不要驱动不是这次运行启动的实例。

驱动约定：除非某份步骤自己的前提另有说明，每份步骤都从基线状态开始。优先 ARIA role 和可访问名称，不用 CSS 选择器或 DOM 位置。每条命令按字面执行，引号里的名字和标志保持不变。浏览器动作走 `control-notes browser`。终端动作走 `control-notes cli -- <command>`。变更之后恢复种子数据。清理时不要删掉证明产物。

证明与跳过：捕获用户动作和结果状态，不只捕获最终画面。界面证明包括一份 ARIA 快照，以及一张能看出应用身份的截图。命令行证明包括命令、stdout、stderr 和退出码。变更证明包括对存下来的值的只读第二视角。每份产物记下功能 ID 和使用的入口。走不到的路径要报告尝试过的命令和未满足的前提。不要把跳过的入口说成已从另一条路径验证过。

每个功能文件以一级标题和一段用户可见行为开头，然后恰好四个二级标题，顺序固定。`Sub-features` 用短 ID，每个行为一行。`How to get to it (user POV)` 列出每个用户入口。`Driving it with <harness>` 以 `Preconditions:` 开头，带标签的项目把每个用户动作、精确命令和可观察结果配在一起。`Gotchas` 列出会浪费或作废一次运行的陷阱。地图里不写实现细节。只写用户路径、稳定把手、所需状态、命令和可观察的证明。

{{src:skills/create-verification-skill/references/feature-map-example/create-note.md}} 是创建笔记。用户可以从浏览器或命令行保存一条带标题的笔记，取消未完成的草稿，并从第二个面向用户的视图确认已保存的笔记。子功能覆盖打开空白编辑器、保存标题和正文、丢弃未完成草稿、从终端创建同一形状。入口是工具栏的 `New note`、焦点不在可编辑字段时按 `n`，以及 `notes create --title <title> --body <body>`。陷阱包括：文本框有焦点时按 `n` 会打出字符。保存时标题会被修剪，断言渲染后的标题，不要断言草稿输入值。只有保存状态不够，要从列表重新打开笔记。清理夹具时去掉 `Release checklist` 和 `CLI note`，但保留它们的证明产物。

{{src:skills/create-verification-skill/references/feature-map-example/search.md}} 是搜索。用户按标题或正文找笔记，查看一条命中，并区分没有命中和搜索不可用。子功能覆盖各浏览器入口、标题与正文命中且不改笔记数据、在编辑器里打开结果、完整的空状态、清除查询并恢复最近笔记、终端返回同样的命中。入口是工具栏的 `Search`、焦点不在可编辑字段时按 `/`，以及 `notes search <query>`。陷阱包括：编辑器或搜索框有焦点时按 `/` 会插入文字。结果在短暂防抖之后更新，要等结果列表或空状态，不要固定睡眠。除非用户打开 `Include archived`，归档笔记被排除。命令行默认人类可读输出，稳定断言要用 `--format json`。打开一条结果会改变浏览器状态，证明另一条查询之前要重新打开搜索。

#### 4. 交出之前先证明生成的技能

把它自己的指示端到端跑一遍：启动、doctor、驱动地图上的一项功能（一项就够，地图的存在是为了以后的运行覆盖其余的）、捕获证据、清理。清理之后，确认证据仍在它写明的位置。把证明吃掉的清理，这一步失败。修掉失败的地方。每次失败的迭代之后也要跑生成出来的清理，以免坏掉的尝试留下进程和端口。从未执行过的生成技能是草稿，不是交付物。

#### 5. 指出维护循环

把用户指向 `/maintain-verification-skill`，以便应用变化时地图仍然诚实。只有他们问了，才建议节奏。

### 使用例

下面来自指南 {{src:docs/guide/06-verify-and-ship.md}}，不是本书自拟。

```text
/create-verification-skill
```

该页写明，它问的是仓库而不是你。它弄清用户碰到什么、应用在本地怎么启动、什么能驱动它（先是已有 harness，否则是浏览器与 CDP、PTY 或普通 HTTP）、什么证据能证明行为，以及两个实例能否并排跑。只有代码回答不了的才问你。它写下 `.cursor/skills/verify-<app>/`，给代理看的指示含确切的 Launch、Doctor、Drive、Evidence 和 Cleanup，加上 `features/` 下的功能地图。交出之前，生成器把技能端到端证明一次。那次证明失败，就不要使用输出。从此以后，“在应用里验证”是这个仓库里任何代理都能执行的一步，不需要一次安装对话。

验证技能能工作之后，该页写明 [`/swarm`](arena-swarm.md#skill-swarm) 可以按功能地图的条目拆开一整遍，再汇总结果。

### 陷阱与注意

- 不要把生成结果写给人读。下一个代理会冷读它。
- 不要留下占位符。选择器和命令来自这个仓库。
- 底座构建不了或启动不了时，不要对着它生成技能。
- 不要按进程名杀进程。不要让清理吃掉证据。
- 只驱动一个方便入口，而地图还列着其他入口，证明就不完整。
- 从未跑过的生成技能是草稿。
- dry-run 或测试模式的名字不能代替观察。有的仍会碰网络或打开浏览器。
- 两个实例不能并排时，写明拒绝双驱动，不要去弄坏用户的会话。
- 节奏不要主动建议，除非用户问。

### 相关技能

- [maintain-verification-skill](#skill-maintain-verification-skill)。第 5 步把用户指向它。
- [principle-prove-it-works](principles.md#skill-principle-prove-it-works)。指南页用它要求检查真实产物。该原则把可重跑的脚本当作最强证明。大型或复杂的工作才提交证据，并指向 [show-me-your-work](personal.md#skill-show-me-your-work)。
- [setup-pstack](setup.md#skill-setup-pstack)。没有现成驱动方式时，第 7 步提议一次本技能。
- [swarm](arena-swarm.md#skill-swarm)。指南写明，技能能工作之后可以用它按地图条目拆开一整遍。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。模式的“替你运行”清单没有列入本技能。需要时直接调用，或由设置末尾提议。

## maintain-verification-skill {#skill-maintain-verification-skill}

原文：{{src:skills/maintain-verification-skill/SKILL.md}} {{src:docs/guide/06-verify-and-ship.md}}

> 定期把项目的验证技能和功能地图保持诚实：每个功能一名并行的源码读者，一次实机会话驱动每一项功能，最多一个 PR 的已证明修正。

### 何时使用

用于 `/maintain-verification-skill`，或 “audit the verify skill”。

`name` 是 `maintain-verification-skill`。前置信息含 `disable-model-invocation: true`。正文没有定义这项。

功能地图在应用一变时就开始腐烂。本技能是 `/create-verification-skill` 所生成技能的维护循环，也适用于任何带功能地图的项目本地验证技能。严格性的单位是功能，不是每一句话。每个功能文件都要从源码覆盖，每项功能都要实机走一遍。

> **解说（本书的解释，原文中没有）**
>
> 原文 without terminalising every bullet 没有另给定义。本书把它理解成：实机覆盖以功能为单位，不必把功能文件里的每一条都单独做成一次终态证明。

### 运作方式

先选定一个结果，并说明是哪一个。

- **clean。** 每项功能都有源码覆盖和实机覆盖。没有值得交付的东西。不开分支，不提 PR。
- **changed。** 一个 PR 交付已证明的文档、harness 或地图修正。
- **blocked。** 覆盖做不完，或已证明的修复不能安全交付。写明挡住的是什么。

编辑范围只限验证技能自己的目录：它的 `SKILL.md`、`features/`，以及它拥有的任何 harness 脚本。一次运行里从不编辑产品代码。地图描述的行为若是应用已经不再做的，要么是文档漂移（改地图），要么是产品回归（报告它，不要在文档里把它盖住）。

#### 0. 定位目标

找到要维护的验证技能：正文里有 launch 与 drive 两节、并且有功能地图的项目本地技能，通常是 `.cursor/skills/verify-*/`。有几个候选就问是哪一个。一个都没有，就停，并指向 `/create-verification-skill`，不要发明一个目标。

#### 1. 索引卫生

读功能地图的 README，并 glob 它的兄弟文件。补上缺失项，去掉多余、重复或已死的条目。这一步轻。不要生成一份清单。

#### 2. 源码波

每个功能文件一名只读子代理，同时派出。每个说明“这个面向用户的功能怎样工作”，从源码出发，用引用标出可能的文档漂移，并返回一份简短的实机检查步骤。子代理从不驱动应用，也从不改文件。返回形状是：功能摘要、源码入口、可能的漂移或没有、一份步骤。

#### 3. 对齐

每个功能文件都有一份返回的摘要。把重叠的步骤合并成尽可能少的应用状态。抽查被引用的漂移。已经干净的说法不要重新证明。扫最近的变动，找地图里缺的、面向用户的表面。称一项为缺失之前，要有一条具体的源码路径。

#### 4. 实机

即使源码看起来干净，这一步也是必需的。协调者拥有全部驱动。跟随验证技能自己的启动模型。服务器和界面用一个长寿命实例串行驱动。短命命令行则每次驱动一个新的隔离会话。由那份技能的 Launch 节决定，不由本技能决定。每项功能至少走一遍。整遍过程保持三条不变量，无论失败与否。

1. 不要驱动一个自上次做出意外之事以后还没做过健康检查的实例。第一次驱动之前做 doctor。会话是单位时，每个新会话做 doctor。任何一次失败的驱动之后再做 doctor。doctor 看不到失败时（进程健康，但界面卡住），重置到已知状态或重新启动，不要指望它自己好。
2. 到目前为止捕获的证据挺过每一次清理。在它写明的位置检查，不要假定。
3. 一次驱动启动的东西，不要活过这次驱动还有用的时间。失败迭代的残留要清掉，无论会话是卡住、已退出，还是共享的。共享实例只清残留，不清掉实例本身。

由技能漂移引起的 doctor 失败就是漂移。在编辑范围内修它，并重试一次。重启被这次修复作废的东西，不要多重启。然后才可以把这一遍叫成 `blocked`。一项功能走不到时，只有写下具体前提（认证、权益、操作系统、外部状态）和尝试过的路由，才标成 `verified-unreachable`。地图若漏了这个前提，那就是漂移。分诊里任何 harness 修复，在交付前都要重新实机驱动。最后一次拆除发生在这次运行的最后一次驱动之后，包括那些重新证明。这样没有任何东西活过这次运行。证据按技能的规定留下。

#### 5. 分诊

用户视角的描述错了或缺了，就是文档漂移，修它。行为是好的，但 harness 驱动不了，就是 harness 缺口，修它。harness 修复遵循生成时同一条辅助规则：脚本可执行，调用方式写在技能正文里。应用行为确实坏了，就是产品缺口。记给用户，不要放进这个 PR。

#### 6. 交付或停止

`changed`：一个 PR，里面是已证明的修正。先重读每一个改过的文件。`clean` 或 `blocked`：不提 PR。诚实报告结果和覆盖。

把简短的运行笔记留在临时位置，不要提交。笔记包括覆盖了哪些功能、走不到的前提、确认的漂移，以及结果。

### 使用例

下面来自指南 {{src:docs/guide/06-verify-and-ship.md}}，不是本书自拟。

```text
/maintain-verification-skill
```

该页写明，应用会变，功能地图会腐烂。漂移时运行上面的命令。它审计生成的技能：每个功能一名并行的只读源码读者，然后一次实机走遍地图上的每项功能。结束时恰好是三种结果之一。`clean` 是覆盖完整且没有要交付的。`changed` 是一个 PR 的已证明修正，限制在验证技能自己的目录里。`blocked` 点名挡住的东西。它从不编辑产品代码。实机若抓住产品回归，就报告回归，而不是在文档里盖住。

### 陷阱与注意

- 没有目标时不要发明一个。指向 `/create-verification-skill`。
- 多个候选时问是哪一个。
- 不要编辑产品代码。产品回归记给用户，不要写进这个 PR。
- 源码看起来干净也不能跳过实机。
- 不要驱动没做过健康检查的实例。doctor 看不到的界面卡住，要重置或重启。
- 不要假定证据还在。到写明的位置去看。
- 共享实例只清残留，不要把实例杀掉。
- harness 修复在交付前要重新实机驱动。
- 技能漂移造成的 doctor 失败，修一次并重试一次。重启范围只限这次修复作废的东西。然后才可以叫 `blocked`。
- `verified-unreachable` 必须带具体前提和尝试过的路由。地图漏了前提，就是漂移。
- 运行笔记不要提交。
- `changed` 只有一个 PR。先重读每个改过的文件。

### 相关技能

- [create-verification-skill](#skill-create-verification-skill)。本技能维护它生成的技能，或任何带功能地图的项目本地验证技能。找不到目标时指向它。
- [principle-prove-it-works](principles.md#skill-principle-prove-it-works)。实机这一步即使源码干净也要做，和该原则“检查真实的东西”同向。本技能没有点名它。
- [poteto-mode](poteto-mode.md#skill-poteto-mode)。直接调用本技能，或在地图漂移时按指南运行。
- [show-me-your-work](personal.md#skill-show-me-your-work)。证明能工作那条原则在大型工作里才提交可审计证据。本技能要求运行笔记留在临时位置，不提交。两份文件没有互相点名。
