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
