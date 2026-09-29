# 技能速查表

这一份对照目录核对过。`skills/` 里没有 `principle-` 前缀的目录是 24 个。`principle-` 目录是 23 个。`skills/poteto-mode/playbooks/` 是 23 个文件。`agents/` 是 2 个文件。`automations/benny/skills/` 另有 3 个 `SKILL.md`，README 写明它们不注册为斜杠技能，所以不计入上面的 24。

“何时用”摘自 README 的技能表、原则表或剧本表，每格只留一句。

## 一般技能 24 个 {#quickref-skills}

| 名称 | 何时用 | 链接 |
| --- | --- | --- |
| `/poteto-mode` | 非平凡任务的默认入口 | [poteto-mode](poteto-mode.md#skill-poteto-mode) |
| `/how` | 要一份子系统如何运作的讲解 | [how](how.md#skill-how) |
| `/why` | 要知道某事为何做成这样 | [why](why.md#skill-why) |
| `/recall` | 开工或续上时收回近期上下文 | [recall](teach-recall.md#skill-recall) |
| `/blast-radius` | 小改动还可能弄坏什么 | [blast-radius](tdd-blast.md#skill-blast-radius) |
| `/architect` | 代码要越过函数边界，先定形状 | [architect](architect.md#skill-architect) |
| `/arena` | 同一件事做多次，再取各次长处 | [arena](arena-swarm.md#skill-arena) |
| `/swarm` | 不同切片或竞速，再合成一份报告 | [swarm](arena-swarm.md#skill-swarm) |
| `/interrogate` | 让几个模型试图拆掉一份 diff | [interrogate](interrogate.md#skill-interrogate) |
| `/automate-me` | 按你实际的做法起草自己的模式 | [automate-me](personal.md#skill-automate-me) |
| `/make-bot-ui` | 做一页用 webhook 唤醒机器人的界面 | [make-bot-ui](benny.md#skill-make-bot-ui) |
| `/setup-pstack` | 按角色选定 pstack 用的模型 | [setup-pstack](setup.md#skill-setup-pstack) |
| `/reflect` | 长任务落地后收成技能修改 | [reflect](personal.md#skill-reflect) |
| `/teach` | 要真正弄懂一处改动或子系统 | [teach](teach-recall.md#skill-teach) |
| `/tdd` | 有便宜的本地测试时先写失败测试 | [tdd](tdd-blast.md#skill-tdd) |
| `/no-comments` | 评审前去掉注释 | [no-comments](code-hygiene.md#skill-no-comments) |
| `/typescript-best-practices` | 正在读或改 TypeScript | [typescript](code-hygiene.md#skill-typescript-best-practices) |
| `/figure-it-out` | 没有现成剧本合用 | [figure-it-out](arena-swarm.md#skill-figure-it-out) |
| `/show-me-your-work` | 要一份可复查的决策记录 | [show-me-your-work](personal.md#skill-show-me-your-work) |
| `/create-verification-skill` | 项目还没有脚本化的取证办法 | [create](verification.md#skill-create-verification-skill) |
| `/maintain-verification-skill` | 功能地图已经和应用程序漂移 | [maintain](verification.md#skill-maintain-verification-skill) |
| `/unslop` | 清理文字里的生成腔 | [unslop](writing.md#skill-unslop) |
| `/bro` | 把上一则回复改成平实的话 | [bro](utility.md#skill-bro) |
| `/technical-writing` | 文档、说明、PR 和提交文字 | [technical-writing](writing.md#skill-technical-writing) |

## 原则技能 23 个 {#quickref-principles}

指南写明你不调用这些原则。你用名字把进行中的工作拧回来。`/poteto-mode` 在任务开始时读内嵌索引。下表的“何时用”是 README 里那一列 rule 的压缩。链接用目录全名。

| 名称 | 何时用 | 链接 |
| --- | --- | --- |
| `laziness-protocol` | 偏向删除和最小改动 | [laziness-protocol](principles.md#skill-principle-laziness-protocol) |
| `foundational-thinking` | 写逻辑前先定数据结构 | [foundational-thinking](principles.md#skill-principle-foundational-thinking) |
| `redesign-from-first-principles` | 把新需求当成从第一天就有 | [redesign-from-first-principles](principles.md#skill-principle-redesign-from-first-principles) |
| `attack-the-premise` | 同一前提多次失败后先质疑它 | [attack-the-premise](principles.md#skill-principle-attack-the-premise) |
| `subtract-before-you-add` | 先去掉死重再往上建 | [subtract-before-you-add](principles.md#skill-principle-subtract-before-you-add) |
| `minimize-reader-load` | 减少读者要记住的层次 | [minimize-reader-load](principles.md#skill-principle-minimize-reader-load) |
| `outcome-oriented-execution` | 重写收敛到目标架构 | [outcome-oriented-execution](principles.md#skill-principle-outcome-oriented-execution) |
| `experience-first` | 选用户结果，少而精 | [experience-first](principles.md#skill-principle-experience-first) |
| `exhaust-the-design-space` | 先做两到三个原型再比较 | [exhaust-the-design-space](principles.md#skill-principle-exhaust-the-design-space) |
| `build-the-lever` | 做可重跑的工具来完成或证明 | [build-the-lever](principles.md#skill-principle-build-the-lever) |
| `model-the-domain` | 把领域放进结构 | [model-the-domain](principles.md#skill-principle-model-the-domain) |
| `boundary-discipline` | 守卫集中在系统边界 | [boundary-discipline](principles.md#skill-principle-boundary-discipline) |
| `type-system-discipline` | 让不合法状态无法表示 | [type-system-discipline](principles.md#skill-principle-type-system-discipline) |
| `make-operations-idempotent` | 重试之后仍到同一终态 | [make-operations-idempotent](principles.md#skill-principle-make-operations-idempotent) |
| `migrate-callers-then-delete-legacy-apis` | 同一波迁移并删除旧接口 | [migrate-callers-then-delete-legacy-apis](principles.md#skill-principle-migrate-callers-then-delete-legacy-apis) |
| `separate-before-serializing-shared-state` | 先消除共享 | [separate-before-serializing-shared-state](principles.md#skill-principle-separate-before-serializing-shared-state) |
| `prove-it-works` | 对照真实产物再宣布完成 | [prove-it-works](principles.md#skill-principle-prove-it-works) |
| `fix-root-causes` | 先复现，追到根因再改 | [fix-root-causes](principles.md#skill-principle-fix-root-causes) |
| `sequence-verifiable-units` | 拆成每步可检查的小单位 | [sequence-verifiable-units](principles.md#skill-principle-sequence-verifiable-units) |
| `test-behavior-not-implementation` | 按使用者的方式断言结果 | [test-behavior-not-implementation](principles.md#skill-principle-test-behavior-not-implementation) |
| `guard-the-context-window` | 大块阅读交给子代理 | [guard-the-context-window](principles.md#skill-principle-guard-the-context-window) |
| `never-block-on-the-human` | 可逆工作先做，再给人看 | [never-block-on-the-human](principles.md#skill-principle-never-block-on-the-human) |
| `encode-lessons-in-structure` | 把重复过的指示做成检查或脚本 | [encode-lessons-in-structure](principles.md#skill-principle-encode-lessons-in-structure) |

## poteto-mode 剧本 23 个 {#quickref-playbooks}

模式先匹配，再打开文件，把步骤原文抄进待办。下表按 `SKILL.md` 的清单排列。链接指向各章里的 `#playbook-` 加文件名。

| 名称 | 何时用 | 链接 |
| --- | --- | --- |
| Investigation | 只读问题 | [investigation](playbooks-work.md#playbook-investigation) |
| Bug fix | 复现缺陷并用运行时证据修 | [bug-fix](playbooks-work.md#playbook-bug-fix) |
| Perf issue | 对照基线改进一次测到的变慢 | [perf-issue](playbooks-work.md#playbook-perf-issue) |
| Hillclimb | 对一个指标持续、科学地改进 | [hillclimb](playbooks-work.md#playbook-hillclimb) |
| Runtime forensics | 用现场插桩做诊断 | [runtime-forensics](playbooks-work.md#playbook-runtime-forensics) |
| Trace forensics | 诊断事后交给你的分析产物 | [trace-forensics](playbooks-work.md#playbook-trace-forensics) |
| Feature | 从已命名的数据形状做新行为 | [feature](playbooks-work.md#playbook-feature) |
| Refactoring | 保持行为，只改结构 | [refactoring](playbooks-work.md#playbook-refactoring) |
| Prototype | 用一次性草图做决定 | [prototype](playbooks-work.md#playbook-prototype) |
| Visual parity | 两种实现要像素级一致 | [visual-parity](playbooks-work.md#playbook-visual-parity) |
| Authoring a skill | 编写或修改一份 `SKILL.md` | [authoring-a-skill](playbooks-work.md#playbook-authoring-a-skill) |
| Eval | 推广前盲测技能或提示的改动 | [eval](playbooks-work.md#playbook-eval) |
| Babysit | 把 PR 或一叠 PR 赶到可合并 | [babysit](playbooks-pr.md#playbook-babysit) |
| Shipping | 独立核对变绿的栈再落地 | [shipping](playbooks-pr.md#playbook-shipping) |
| Autonomous run | 把一句长任务做到完 | [autonomous-run](playbooks-long.md#playbook-autonomous-run) |
| Orchestrate | 一个协调对话管多日项目 | [orchestrate](playbooks-long.md#playbook-orchestrate) |
| Autopilot-full | 独立 PR 队列做到合并 | [autopilot-full](playbooks-long.md#playbook-autopilot-full) |
| Autopilot-stack | 建成一条栈，由操作者落地 | [autopilot-stack](playbooks-long.md#playbook-autopilot-stack) |
| Session pickup | 接上先前代理未做完的工作 | [session-pickup](playbooks-long.md#playbook-session-pickup) |
| Pause safely | 干净挂起，以便以后续上 | [pause-safely](playbooks-long.md#playbook-pause-safely) |
| Multi-phase plan | 跨阶段或跨叠放的 PR | [multi-phase-plan](playbooks-long.md#playbook-multi-phase-plan) |
| Worktree cleanup | 收回已合并或已放弃的工作树 | [worktree-cleanup](playbooks-long.md#playbook-worktree-cleanup) |
| Opening a PR | 其他剧本结束时打开 PR | [opening-a-pr](playbooks-pr.md#playbook-opening-a-pr) |

## 代理与自动化

| 名称 | 何时用 | 链接 |
| --- | --- | --- |
| `poteto-agent` | 父代理要按 poteto 风格做完工作 | [poteto-agent](poteto-mode.md#agent-poteto-agent) |
| `Comment Sicko` | 只读审阅注释，通常经 no-comments | [Comment Sicko](code-hygiene.md#agent-comment-sicko) |
| `benny` | 分拣 Slack 报告再复现。默认休眠 | [benny](benny.md#automation-benny) |
| `setup-benny` | 安装或更改 Benny 的配置。非斜杠 | [setup-benny](benny.md#skill-setup-benny) |
| `triage-issue-reports` | 只从来源线程发一条裁决。非斜杠 | [triage](benny.md#skill-triage-issue-reports) |
| `reproduce-and-fix-issues` | 确认后经真实界面复现。非斜杠 | [reproduce](benny.md#skill-reproduce-and-fix-issues) |

`cursor-team-kit` 里的 `deslop`、`control-cli`、`control-ui` 不在 pstack 的目录里，这里不单列成节。

## 斜杠命令摘要

上一节的 24 个名称就是 pstack 的斜杠命令，前面加 `/`。23 个原则技能也是技能文件。指南要求用名字拧回，而不是把它们当成另一套要枚举的命令。

下面这些不是 pstack 的 `skills/` 目录项。

| 名称 | 何时用 | 链接 |
| --- | --- | --- |
| `/add-plugin` | 安装 pstack | [安装](setup.md) |
| `/loop` | Cursor 内建唤醒。过夜循环用它 | [autonomous-run](playbooks-long.md#playbook-autonomous-run) |
| `/create-skill` | Cursor 内建。用来写技能 | [authoring-a-skill](playbooks-work.md#playbook-authoring-a-skill) |
| `/automate` | Cursor 内建。Benny 首次创建各用一次 | [setup-benny](benny.md#skill-setup-benny) |
| `/babysit` | Cursor 内建。pstack 里由剧本取代 | [babysit](playbooks-pr.md#playbook-babysit) |
| `/deslop` | 属于 `cursor-team-kit`。提交前扫 diff | [opening-a-pr](playbooks-pr.md#playbook-opening-a-pr) |

选哪一条，看 [技能选择流程](decision-flow.md)。
