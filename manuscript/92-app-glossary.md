# 术语表

英文标识符（技能名、剧本名、命令、路径）在正文里保持原文。下表只收不能一对一换成单个英文词的中文说法。

## 不能一对一对应的术语 {#terms-not-one-to-one}

形式是中文词紧接半角括号，中间没有空格，例如 `原则(principle)`。每一对在“首次”那一章的正文里出现一次。代码、标题、流程图和示例标签里不使用这种形式。

| 中文 | 英文 | 首次 |
| --- | --- | --- |
| 原则 | principle | principles |
| 规则 | rule | poteto-mode |
| 技能 | skill | what-is-pstack |
| 剧本 | playbook | poteto-mode |
| 验证 | verification | verification |
| 委托 | delegation | poteto-mode |

## pstack 的组成

| 说法 | 含义 |
| --- | --- |
| skill | `skills/<name>/SKILL.md`。在 Cursor 里通常以 `/name` 调用。 |
| playbook | `poteto-mode` 的 `playbooks/*.md`。模式按任务选一个，并把其中的步骤抄进待办列表。 |
| agent | `agents/*.md` 描述的子代理。本书涉及 `poteto-agent` 与 `Comment Sicko`。 |
| principle | 23 个短技能，每个只表达一条原则。模式在任务开始时读内嵌索引，需要细节时再打开对应的 `SKILL.md`。 |
| automation | `automations/benny/`。README 写明它默认休眠，且不注册为斜杠技能。 |

## 工作流

| 说法 | 含义 |
| --- | --- |
| sticky mode | README 对 `/poteto-mode` 的说法：进入之后会跨回合保持，匹配剧本或需要严格性时继续适用，你也可以明确退出。 |
| subagent | 父代理用 Task 派出的工作者。剧本步骤里的代码委托默认使用 `subagent_type: "poteto-agent"`。路由技能若指定了自己的 `subagent_type`，不要改成 `poteto-agent`。 |
| fan-out | 把工作并行分给多个工作者。覆盖矩阵、竞速和分区探索用 `swarm`。设计或代码的对比选拔用 `arena`。 |
| worktree | Git 工作树。`worktree-cleanup` 剧本在安全条件满足时清理已合并或放弃的工作树。 |
| stack | 叠在一起的一串 PR。`shipping` 与 `autopilot-stack` 对“谁来合并”的约定不同。 |

## 质量与验证

| 说法 | 含义 |
| --- | --- |
| repro | 在与缺陷相同的界面上复现。Bug fix 要求先复现，再修复。 |
| root cause | 症状背后的机制。`fix-root-causes` 要求追到这里，而不是用空值检查把崩溃捂住。 |
| evidence | 运行中得到的观察。Bug fix 要求每一行将要提交的改动都能追溯到运行时证据。 |
| prove it works | 对着真实产物检查，而不是对着“能编译”或代理的自我报告。 |
| unslop | 去掉生成文本的套话和习气。你的回复本身也是文字表面，要按这个技能来写。 |

## 设计

| 说法 | 含义 |
| --- | --- |
| data shape | 功能剧本要求在写逻辑之前先命名数据形状，并按 `principle-model-the-domain` 选择组织方式。 |
| boundary | 系统边界，例如命令行、配置、网络和外部 API。守卫集中在边界，边界内部信任类型。 |
| illegal state | 类型系统应当让不合法的状态无法被表示出来。 |
| idempotent | 操作在部分执行、崩溃或重试之后，仍收敛到同一终态。 |
