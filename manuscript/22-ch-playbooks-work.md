# 工作剧本

这些是 [`/poteto-mode`](poteto-mode.md#skill-poteto-mode) 按任务选中的做法。步骤会被原文抄进待办：模式先打开待办列表，把命中剧本的步骤按原文逐字抄在这项任务自己的待办之前。你决定不做的步骤仍留在列表里，一行写成 `skip: <reason>`。本章是工作类剧本。PR 与长时间剧本在另两章：[PR 剧本](playbooks-pr.md) 与 [长时间剧本](playbooks-long.md)。

剧本清单在 {{src:skills/poteto-mode/SKILL.md}}。跨很多调用点的迁移、分成许多部分的大改动，或者人离开后才回来看的工作，即使较窄的 Feature 也能套上，仍走 [`figure-it-out`](arena-swarm.md#skill-figure-it-out)。没有任何现成剧本合用时也走它。它为这一次运行设计专属步骤。跨天、许多叠放的 PR、一个协调者下面有一大批子代理的常设项目，走 [Orchestrate](playbooks-long.md#playbook-orchestrate)。一个代理在本次会话预算里能做完的，即使措辞像整个项目，也走 [Autonomous run](playbooks-long.md#playbook-autonomous-run)，不走 Orchestrate。
