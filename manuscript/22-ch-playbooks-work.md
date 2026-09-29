# 工作剧本

这些是 [`/poteto-mode`](poteto-mode.md#skill-poteto-mode) 按任务选中的做法。步骤会被原文抄进待办：模式先打开待办列表，把命中剧本的步骤按原文逐字抄在这项任务自己的待办之前。你决定不做的步骤仍留在列表里，一行写成 `skip: <reason>`。本章是工作类剧本。PR 与长时间剧本在另两章：[PR 剧本](playbooks-pr.md) 与 [长时间剧本](playbooks-long.md)。

剧本清单在 {{src:skills/poteto-mode/SKILL.md}}。跨很多调用点的迁移、分成许多部分的大改动，或者人离开后才回来看的工作，即使较窄的 Feature 也能套上，仍走 [`figure-it-out`](arena-swarm.md#skill-figure-it-out)。没有任何现成剧本合用时也走它。它为这一次运行设计专属步骤。跨天、许多叠放的 PR、一个协调者下面有一大批子代理的常设项目，走 [Orchestrate](playbooks-long.md#playbook-orchestrate)。一个代理在本次会话预算里能做完的，即使措辞像整个项目，也走 [Autonomous run](playbooks-long.md#playbook-autonomous-run)，不走 Orchestrate。

剧本步骤里派出的子代理，`subagent_type` 用 "poteto-agent"，见 [`poteto-agent`](poteto-mode.md#agent-poteto-agent)。`how`、`why`、`interrogate`、`reflect`、`swarm` 若规定了自己的 `subagent_type`，不要改成 `poteto-agent`。每次 Task 默认 `run_in_background: true`。子代理的结果仍由你负责。自己评审 diff，自己写总结，不要把子代理的话原样转交。被打断后续跑会悄悄丢掉指示，把范围收拢后重新派一个。代码类剧本写明的默认模型保持英文 `grok-4.7-xhigh-fast`，可由 [`/setup-pstack`](setup.md#skill-setup-pstack) 的角色行覆盖。没有该行时用这个默认。最难的改动（横切设计、难缠的并发、微妙的算法）改读 `hardest tasks`，默认 `claude-opus-5-5-max`。界面、IDE 或命令行上的操作走匹配的 control 技能。它们属于另一个插件 `cursor-team-kit`：命令行和 TUI 是 `control-cli`，浏览器、Electron 和 Web 界面是 `control-ui`。

每个剧本的回复都按模式里的 Writing the reply 来写。句子短，一句一件事。回复本身是文字表面，要经过 [`unslop`](writing.md#skill-unslop)。注释只保留代码看不出来的原因。这条写在模式的 Comments 里，适用于本章会改代码的剧本，包括子代理的 diff。有 PR 时，链接形如 `https://github.com/<owner>/<repo>/pull/<number>`。各节“回应”只补该剧本点名的内容。凡写“运行 Opening a PR”的，步骤在 [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)。那份剧本要求提交前对 diff 运行 `/deslop`，它属于另一个插件 `cursor-team-kit`。

原文 {{src:docs/guide/02-poteto-mode.md}} 禁止在提示里逐个点名技能来重排剧本已经排好的步骤。说出目标和约束。只有在你想覆盖某个默认选择时才点名技能。
