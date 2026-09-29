# 长时间与大规模剧本

这一章收八个剧本。它们处理一次会话装不下的工作，或者人离开之后还要能续上的工作。

长时间、自主或多阶段的工作，以及用户离开后再回来审查的任务，例如 “going to bed”、“trust it when i'm back”、“/loop until X”，都要经 [show-me-your-work](personal.md#skill-show-me-your-work) 留下决策轨迹。利害需要可审计记录时提交它。否则留在本地。

大的或横切的努力，或者没有现成剧本能套上的任务，走 [figure-it-out](arena-swarm.md#skill-figure-it-out)。它为这一次任务设计专门的严格剧本。常设的项目级程序走 Orchestrate。figure-it-out 设计一次专门的运行。Orchestrate 运行这个程序。一个代理能在本次会话预算内做完的工作，即使说法像一个项目，也走 Autonomous run，不进 Orchestrate。

回复的共同写法与 PR 剧本相同。句子短，不用长破折号，冒号不连接句中分句。剧本点名的内容都留下。PR 链接写成 `https://github.com/<owner>/<repo>/pull/<number>`。

## Autonomous run {#playbook-autonomous-run}

原文：{{src:skills/poteto-mode/playbooks/autonomous-run.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责退出条件。先把完成定义成可检查的谓词，再不停地驱动到它成立。

### 何时使用

一句长任务要驱到完成、中途不停下时使用。模式目录里的说法是 “run until done” 和 “/loop until X”。一个任务对一个谓词。需要专门流程的一次雄心运行走 [figure-it-out](arena-swarm.md#skill-figure-it-out)。活得比任何一个代理更久的项目走 [Orchestrate](#playbook-orchestrate)。一个代理能在会话预算内做完的工作留在这里。

### 运作方式

1. 在第一次迭代之前，把退出条件写成可检查的谓词。例如测试全绿、复现已修好、全部 N 个 PR 已合并、像素差为零。

2. 用 Cursor 的 `/loop` 选定唤醒方式。它是内建命令，不是 pstack 技能。有事件可看时，例如 CI、一次合并、一个引用前进，派一个监视子代理，事件发生时唤醒你，并用一个长时间的心跳做后备。没有事件时，用固定间隔的心跳，间隔取到结果值得再查的时候。

3. 每一轮只做证据所支持的最小改动，对照谓词验证。推进了就提交。没有帮助的改动丢掉。那种“也许有用”的双保险要回退，不要留着一起走。工作的先后按 `principle-sequence-verifiable-units` 来排。每一单元先验证，再做下一单元。不要把检查攒到最后。

4. 运行中途的发现归你。坏掉的技能、相关缺陷、闪断的验证器、审查噪声、工具失败、没人接的后续，以及修得了的漂移，都由你经 poteto-mode 处理。带外的修复放进它们自己的 PR。不要把可逆的工作停给人类，也不要使用 `AskQuestion`。只把不可逆的行动、实验无法裁定的真实产品或偏好选择，或一条真的死路，摆到面上。谓词仍是主驱动。每次旁路修复之后回到它。

5. 每一轮都经 [show-me-your-work](personal.md#skill-show-me-your-work) 做检查点。一行记下变了什么，以及谓词有没有移动。

6. 谓词成立时停止。平台期不是停止。继续，并改换做法把它推过去。真的死路要摆出来，不要空转。绝不要放宽谓词来宣布胜利。

### 回应

写出退出条件、跑了多少轮、落地了什么、丢掉了什么，以及谓词的最终状态。

### 陷阱与注意

双保险的改动要回退。可逆的工作不要停下来问人。`AskQuestion` 不用于这条路径。

平台期要换做法，不要停，也不要改谓词。只有真死路才上报。

带外修复用自己的 PR。主谓词在每次旁路之后仍然是主线。

### 流程图

```flow 自主跑到退出
start 开始
step 写下退出条件 | 必须能够检查
step 选定唤醒方式 | 事件或固定心跳
step 最小改动并验证 | 无益的改动丢掉
step 途中问题自己处理 | 不可逆才上报
step 每轮留下检查点 | 记下条件有没有前进
  alt 遇到平台期 | 换做法继续推
  stop 遇到真死路 | 上报而不是空转
step 条件满足才停止 | 不放宽退出条件
end 结束
```

### 分步产出

1. 一个可检查的退出谓词。
2. 一种唤醒。有事件时是监视子代理加长时间心跳。没有事件时是固定间隔心跳。
3. 推进了谓词的提交，以及被丢掉的无益改动。每个单元在下一单元之前已经验证。
4. 旁路修复各自的 PR。上报只限于不可逆行动、实验解决不了的产品或偏好，或真死路。
5. 轨迹里的一行。它记下变化和谓词是否移动。
6. 谓词成立时的停止，或对真死路的上报。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你说：run until done，退出条件是这组回归测试全绿。
>
> 代理先把“这组测试退出码为 0”写成谓词。没有外部事件可看，于是用固定间隔的 `/loop`。每一轮只改证据指向的最小一处，测试推进了才提交，没有帮助的改动回退。每一轮在 [show-me-your-work](personal.md#skill-show-me-your-work) 的轨迹里加一行。测试全绿时停止。中途若连续几轮分数不动，它更换做法，不把谓词改成“差不多绿了”。

### 失败、中止与含糊时

没有帮助的改动丢掉，包括“也许有用”的双保险。

可逆工作、坏技能、相关缺陷、闪断验证器、审查噪声、工具失败、孤儿后续和修得了的漂移，都自己处理。不要把它们停成人的问题。

只上报不可逆行动、没有实验能裁定的产品或偏好，以及真死路。

平台期继续。放宽谓词不算完成。

### 调用的技能与脚本

- `/loop`：Cursor 内建命令，不是 pstack 技能。有事件时加长时间心跳做后备。
- `principle-sequence-verifiable-units`：按可验证单元排序，先验证再进入下一个。
- [show-me-your-work](personal.md#skill-show-me-your-work)：每一轮一行检查点。
- poteto-mode：途中发现经它处理。带外修复用单独的 PR。
- [figure-it-out](arena-swarm.md#skill-figure-it-out)：一次任务需要专门流程时改走它。
- [Orchestrate](#playbook-orchestrate)：工作活过任何一个代理、并且一个代理在会话预算内做不完时改走它。

## Session pickup {#playbook-session-pickup}

原文：{{src:skills/poteto-mode/playbooks/session-pickup.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责续上的位置。先读先前的轨迹，不要重做已经做过的事。

### 何时使用

从一份转录、一个云代理 URL 或一条已推送的分支，接过先前代理尚未做完的工作时使用。它和 [Pause safely](#playbook-pause-safely) 互补。暂停留下检查点，本剧本从检查点读起。

### 运作方式

1. 定位先前的轨迹。它可能是当前工作区 `agent-transcripts/` 下的本地转录。系统提示会给出路径。不要在 `~/.cursor/projects/*/` 上做全局搜索。那会越过工作区边界，读到无关项目的私人聊天。它也可以是一个云代理 URL，或一条已推送的分支。先读元数据概览和最后的消息，再往回扫决定点。长转录交给子代理解析，主线程只留压缩后的时间线。这是 `principle-guard-the-context-window`。

2. 重建运行状态。分支和工作树，已经落地的内容（用 `git log`，以及相对基线的 `git diff`），打开的待办，已经做出的决定。先前的轨迹是权威输入。抵制重新推导它的偏向。

3. 把已完成和待办分开。拿已经发布的对照原来的计划，点名续上的位置。不要重跑先前的复现，也不要重做已完成的工作。一句“让我从头核实”意味着你把权威轨迹当成了不可信。

4. 把剩余工作路由到匹配的剧本，并选定结论类型。可以继续执行，发布一条已经完成的建议，批准或推翻先前的结论，或对一次失败的运行做事后分析。本剧本到此结束。被路由到的剧本拥有后面的工作。

5. 对着原始目标和真实产物，核实继承来的说法。这是 `principle-prove-it-works`。先前一份自述通过，不是证明。

### 回应

写出先前代理停在哪里，你继承了什么、重做了什么。理想情况是没有重做。再写续上的位置和结果。

### 陷阱与注意

不要跨工作区搜索转录。长转录不要整份留在主线程。

轨迹是权威的。不要从头重跑复现，也不要把“从头核实”当成谨慎。

本剧本在路由之后结束。后面的步骤属于被选中的剧本。

自述通过不能代替对着真实产物的核实。

### 流程图

```flow 接上先前会话
start 开始
step 定位先前轨迹 | 先读末尾再回扫
step 重建运行状态 | 轨迹优先于重推
step 区分完成与待办 | 不重做已完成的
step 路由到匹配剧本 | 本剧本到此结束
step 核对继承的说法 | 对着真实产物查
end 结束
```

### 分步产出

1. 轨迹的位置，以及主线程里的压缩时间线。决定点已经回扫过。
2. 分支、工作树、已落地的 `git log` 与 `git diff`、待办和决定。
3. 点名的续上位置。已完成的工作没有重做。
4. 选定的结论类型，以及接手的那个剧本。本剧本不再往下拥有步骤。
5. 对着真实产物做出的核实。它不借用先前的自述。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你给出上一个云代理的 URL，说：从它停下的地方继续，不要从头做。
>
> 代理先读概览和最后几条消息，再回扫决定点。长转录交给子代理，主线程只留时间线。它用 `git log` 和相对基线的 `git diff` 看已经落地的提交，点名下一笔还没做的改动，把剩余工作路由到对应剧本。它不重跑上一份已经记录的复现。路由之后，本剧本结束。对着真实产物核实继承来的说法时，它不把上一份“测试通过”的自述当成证明。

### 失败、中止与含糊时

找不到当前工作区的转录时，改用云代理 URL 或已推送分支。不要为了找轨迹去扫其他项目的 `agent-transcripts`。

轨迹与仓库状态不一致时，仍以轨迹为权威输入来重建，再用第 5 步对着真实产物核实。不要先把轨迹推翻再重做。

本剧本不拥有路由之后的执行。结论类型选定后就交出。

### 调用的技能与脚本

- `principle-guard-the-context-window`：长转录由子代理解析。
- `principle-prove-it-works`：继承的说法对着真实产物核实。
- `git log`、`git diff`：看已经落地的内容。
- 被路由到的剧本：拥有第 4 步之后的工作。
- [Pause safely](#playbook-pause-safely)：本剧本要读的检查点由它留下。

## Pause safely {#playbook-pause-safely}

原文：{{src:skills/poteto-mode/playbooks/pause-safely.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责一次干净的停止。留下冷启动代理能够续上的检查点。

### 何时使用

只在明确要求暂停时使用。触发包括明确的暂停、离线、Cursor 即将重启，或上下文即将压缩。对方说 “keep going”、“going to bed, keep going” 或 “don't stop” 时，不要暂停。它是 [Session pickup](#playbook-session-pickup) 的互补。

### 运作方式

1. 停在安全边界。完成当前的原子步骤，或从中退出。不开始新的事情。取消嵌套的子代理。

2. 不为了暂停而采取不可逆行动。不要开 PR，也不要推送，除非你本来已经有一个在外面。

3. 让工作耐久。把未提交的编辑收成当前分支上一笔清楚的 `wip:` 提交，这样什么都不会丢。树是坏的时，在提交正文里用一行说清楚。

4. 把续跑笔记写到上下文之外。记下意图、当时在做什么、进度和已经验证的部分、当前状态、下一步、关键文件和陷阱。为压缩触发写到类似 `/tmp/<slug>-resume.md` 的文件。若已有 show-me-your-work 轨迹，指向它，不要再复制一份。

### 回应

写出你在循环的哪一处，什么已经在磁盘上、什么还在你脑子里。给路径，不要倾倒 diff。写上你做的提交，以及树是否干净。写上续跑时的第一个动作。这是暂停，不是最终报告。

### 陷阱与注意

“继续”“去睡觉但继续”“不要停”都不是暂停。

暂停本身不开 PR、不推送。未提交的编辑要收成 `wip:`。坏树用一行写进正文。

续跑笔记不留在即将被压缩的上下文里。已有轨迹时只给指针。

回复不是收工报告。

### 流程图

```flow 安全地暂停
start 开始
  stop 对方要求继续 | 本剧本不暂停
step 停在安全边界 | 收尾或退出当前步
step 暂停不做不可逆 | 不新开请求或推送
step 改动写成一笔提交 | 坏树在正文写明
step 写下续跑笔记 | 放在上下文之外
end 结束
```

### 分步产出

1. 一个已经收尾或已经退出的原子步骤。嵌套子代理已取消。没有新开的工作。
2. 没有为暂停而新开的 PR 或推送。
3. 当前分支上的一笔 `wip:` 提交。树坏时，正文里有一行说明。
4. 上下文之外的续跑笔记，或指向已有轨迹的指针。笔记含意图、正在做的事、进度与已验证部分、当前状态、下一步、关键文件和陷阱。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你说：暂停。我要关电脑。
>
> 代理做完当前这一小步，取消还在跑的子代理，不推送，也不开 PR。未提交的编辑收成 `wip: checkpoint checkout form`。树能编译，正文里就不写损坏。它把意图、已验证的测试、下一步和关键文件写到 `/tmp/checkout-resume.md`。已有决策轨迹时，笔记只指向那份轨迹。回复给出文件路径、这笔提交、树是干净的，以及续跑时的第一个动作。

### 失败、中止与含糊时

对方要求继续时，本剧本不开始。

当前步骤既不能做完也不能安全退出时，原文要求停在安全边界。做完或退出二者之一之后，才能写检查点。

树是坏的，仍然提交，并用一行说明。不要为了暂停去修一条新功能。

### 调用的技能与脚本

- [show-me-your-work](personal.md#skill-show-me-your-work)：轨迹已存在时，笔记指向它，不另抄一份。
- [Session pickup](#playbook-session-pickup)：冷启动代理用本剧本留下的笔记和 `wip:` 提交续上。

## Worktree and simulator cleanup {#playbook-worktree-cleanup}

原文：{{src:skills/poteto-mode/playbooks/worktree-cleanup.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责磁盘和安全门。清理已合并或已放弃的 Git 工作树，以及过期的 iOS 模拟器，把空间收回来。删除不可逆，所以每一步都防止删掉正在使用的东西，或带着未提交工作的东西。

### 何时使用

要回收本地磁盘时使用。模式目录里的说法包括 “what's using my disk”、“clean up worktrees”、“prune safe-to-prune worktrees”、“free up space”、“delete old simulators”。

这是唯一会删除用户状态、又没有代码审查来接住失误的剧本。上面的门就是审查。

### 运作方式

1. 快照并审计。先记录 `df -h /`，再运行 `scripts/worktree-audit.sh`。这是 `principle-build-the-lever`。脚本从 `git worktree list` 读路径，从不使用手打的路径。手打的 `myrepo-worktrees/x` 会漏掉实际位于 `.cursor/worktrees/myrepo/x` 的那一棵。这是 `principle-encode-lessons-in-structure`。脚本按体积、年龄、合并状态、未提交工作、PR 状态，以及最近碰过它的聊天来分类，然后建议一个桶。转录扫描很慢，放到后台。脚本的列和桶见 [worktree-audit.sh](#ref-worktree-audit)。

2. 桶是建议，不是许可。置顶的和仍活跃的聊天才是真实产物。这是 `principle-prove-it-works`。从用户或侧栏拿到这组聊天，并把每个候选交叉核对。杠杆曾经把用户置顶的工作树标成 `safe`，所以置顶集合优先。

3. 删除之前核实使用情况。对每一行 `verify-recent-chat`，以及任何你怀疑的行，派出子代理去读转录，报告聊天是否置顶或仍在进行，以及它碰到哪些工作树。这是 `principle-guard-the-context-window`，因为转录是大批量。置顶聊天会经后台子代理把 arena 和复现树生到同级工作树里。那些树正在使用，即使名字从未出现在侧栏。

4. 在不可逆损失前暂停。`wip:N` 是 N 处已跟踪的未提交编辑。先给 diff、先要决定。删掉一棵干净的工作树还可以从它的分支恢复，未提交的工作则没有了。`scratch:N` 是未跟踪的丢弃物，可以丢，但要报出文件名。按模式的 Autonomy 节，干净、已合并且不在使用中的，可以继续。`wip` 和正在使用的，暂停。

5. 修剪已确认的集合。对每条路径执行 `git worktree remove --force <path>`。目录若因为被忽略的构建产物还在，就 `rm -rf` 它，然后 `git worktree prune`。分支引用还在，所以提交不会丢。用 `df -h /` 确认，并重新列出工作树。

6. 模拟器和其他回收项。模拟器通常是下一块最大的空间。`xcrun simctl --set testing delete all` 删除 XCTestDevices 的克隆。`xcrun simctl delete unavailable` 删除不可用的设备。`xcrun simctl runtime list` 之后，对旧的运行时执行 `runtime delete <id>`。还需要时再看 Xcode 的 `DerivedData` 和 `iOS DeviceSupport`，`~/Library/Application Support/Cursor` 里的 `state.vscdb.backup`，以及 `snapshots/roots/<root>`。某个 `<root>` 若以你当作工作区打开过的文件夹命名，体积会胀起来。还有包缓存：pnpm、uv、brew、yarn。只清理用户没有说要保留的缓存。

### 回应

写出前后的 `df -h /` 和收回的空间，被修剪的工作树，以及每一棵留下来的树的一行理由。理由是被哪个聊天使用，或仍有未提交的工作。

### 陷阱与注意

脚本不删除任何东西。桶不是许可。置顶集合压过 `safe`。

侧栏里看不见的同级工作树，仍可能被置顶聊天的后台子代理使用。

`wip` 必须先看 diff。`scratch` 可以丢，但要报文件名。分支引用会留下，提交还在。

缓存只清用户没有要求保留的那些。

### 流程图

```flow 清理工作树
start 开始
step 快照并审计 | 脚本只给建议桶
step 桶不是删除许可 | 置顶聊天优先
step 删除前核对使用 | 近期聊天要读完
step 不可逆损失先停 | 未提交改动先决定
  stop 使用中或未提交 | 先停下等人决定
step 删除已确认的树 | 分支引用仍保留
step 再收模拟器缓存 | 只清未要求保留的
end 结束
```

### 分步产出

1. 清理前的 `df -h /`，以及脚本打出的表。转录扫描可以在后台。
2. 从用户或侧栏得到的置顶与活跃聊天集合，以及和候选行的交叉核对。
3. 子代理对 `verify-recent-chat` 和存疑行的报告。报告说明聊天是否置顶或仍在进行，以及碰到的工作树。
4. 对 `wip` 的 diff 和人的决定。`scratch` 的文件名清单。
5. 已执行的 `git worktree remove --force`、必要时的 `rm -rf` 和 `git worktree prune`。清理后的 `df -h /` 和新的工作树列表。分支引用仍在。
6. 已删除的测试模拟器克隆、不可用设备和旧运行时。以及用户没有要求保留的缓存清理结果。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你说：clean up worktrees，把安全的清掉。
>
> 代理先跑 `df -h /` 和 `scripts/worktree-audit.sh`。表里一棵树是 `safe`，但侧栏里你置顶了碰过它的聊天。这棵树留下。另一行是 `verify-recent-chat`，子代理读转录后报告聊天仍在进行，树也留下。第三棵是 `scratch:2`，代理报出那两个未跟踪文件名后删除。第四棵干净、已合并、不在使用中，代理执行 `git worktree remove --force`。最后再跑 `df -h /`，并对每棵留下的树给一行理由。

### 失败、中止与含糊时

置顶聊天优先于脚本的 `safe`。正在使用的树暂停。`wip` 在看到 diff 和决定之前暂停。

`scratch` 可以删，但必须先说出文件名。

模拟器和缓存不是默认全删。只动用户没有说要保留的缓存。旧运行时要先 `runtime list` 再按 id 删除。

删完之后目录还在，只说明还有被忽略的构建产物。那时才 `rm -rf`，然后 `git worktree prune`。

### 调用的技能与脚本

- `scripts/worktree-audit.sh`：只读审计。见 [worktree-audit.sh](#ref-worktree-audit)。
- `principle-build-the-lever`：用脚本分类，而不是手算。
- `principle-encode-lessons-in-structure`：路径来自 `git worktree list`。
- `principle-prove-it-works`：置顶和活跃聊天才是真实产物。
- `principle-guard-the-context-window`：转录由子代理读。
- 模式的 Autonomy 节：干净、已合并且不在使用中的可以继续。`wip` 和正在使用的暂停。
- `git worktree remove --force`、`git worktree prune`、`df -h /`。
- `xcrun simctl`：测试设备克隆、不可用设备、旧运行时。

### 辅助资料：worktree-audit.sh {#ref-worktree-audit}

原文：{{src:skills/poteto-mode/scripts/worktree-audit.sh}}

脚本开头写明它是只读的工作树修剪审计。它给每棵 Git 工作树分类，依据体积、合并状态、未提交工作、远程与 PR 状态，以及最近在其中操作过的聊天。它打出一张按体积排序的表，并给出建议的桶。它从不删除。删除留在剧本里由人把关的那一步。

用法是 `worktree-audit.sh [repo-path]`。不传路径时用当前仓库。不在 Git 仓库里、又没有路径时，它向标准错误写出 `not in a git repo; pass a repo path`，并以退出码 1 结束。

它用 `git worktree list --porcelain` 取路径。第一棵是主工作树，不进入表。其余都是候选。它会尝试 `git fetch origin main`。失败时向标准错误警告：合并列可能过期。PR 状态用一次 `gh pr list --author "@me" --state all --limit 1000`。`gh` 不可用时，PR 列按空列表处理。

转录目录是 `~/.cursor/projects/<slug>/agent-transcripts`。`slug` 由主工作树路径去掉开头的斜杠、再把斜杠换成连字符得到。

表头是 `SIZE`、`AGE`、`MERGED`、`DIRTY`、`REMOTE`、`PR`、`LAST_CHAT`、`BUCKET`、`WORKTREE`。行按体积从大到小排。

`AGE` 是 HEAD 提交距现在的天数。`MERGED` 在 HEAD 是 `origin/main` 的祖先时为 `YES`，否则为 `no`。脚本注明，squash 合并的分支不是主干的祖先，所以 PR 状态才是真正的信号。merge-base 只抓得到快进或变基式的合并。

`DIRTY` 有三种。工作区干净时是 `clean`。存在已跟踪的未提交编辑时是 `wip:` 再加这种编辑的个数。只有未跟踪文件时是 `scratch:` 再加未跟踪文件的个数。

`REMOTE` 在游离 HEAD 时是 `detached`。远程有同名分支且 SHA 与 HEAD 相同是 `pushed`。远程有分支但本地更前时是 `ahead` 加超前的提交数。没有远程分支时是 `no-remote`。

`PR` 是 `#号码/状态`。没有匹配时是 `-`。`LAST_CHAT` 是转录里最近一次操作这棵树的日期。匹配路径时要求后面跟着斜杠或引号，避免短名字误中更长的名字。最近四天内有这种聊天时，内部把近期标成 yes。

桶的顺序是：`wip:` 一律 `hold-wip`。PR 状态含 `OPEN` 时是 `hold-open-pr`。近期聊天是 `verify-recent-chat`。已合并，或 PR 列不是 `-`，则为 `safe`。其余是 `review`。

这些桶交给剧本第 2 步到第 4 步。`safe` 仍要和置顶聊天交叉核对。`verify-recent-chat` 要派子代理读转录。`hold-wip` 对应剧本里的 `wip:N`，先看 diff。

## Multi-phase or multi-PR plan {#playbook-multi-phase-plan}

原文：{{src:skills/poteto-mode/playbooks/multi-phase-plan.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责计划，不负责代码。计划是一份清单。执行者逐格运行，操作者按证据审计。计划就是交付物。不要实现。

### 何时使用

工作跨多个阶段，或要拆成多个 PR 时使用。改动只有一两个文件、做法明显时，不要写计划。说明这一点并停止。

执行剧本在计划的 How to read this 里点名。在 [Autopilot-full](#playbook-autopilot-full) 和 [Autopilot-stack](#playbook-autopilot-stack) 之间选择时，用 Autopilot-stack 末尾的规则。常设程序则改用 [Orchestrate](#playbook-orchestrate)。

### 运作方式

1. 改动是一两个文件、做法明显时，跳过计划。说明这一点并停止。

2. 动笔之前，用原型把开放问题定下来。每个问题跑 `playbooks/prototype.md`。留下分支、SHA 和截图，放进附录 A。只向操作者询问没有一次运行能裁定的产品或偏好。给出选项。这是 `principle-never-block-on-the-human`。

3. 用子代理探索。`subagent_type` 用 `"poteto-agent"`，并按模式的 Subagents 节为每个角色指定模型。这是 `principle-guard-the-context-window`。每个子代理返回文件指针、约定、测试命令和入口。不要把转储内联回来。

4. 把下面的骨架抄进计划文件，填满每一个占位。操作者没有指定路径时，写到当前代理存储的 `docs/` 下。每个标题和每个子块都保留，顺序不变。一个 PR 一节。一个 PR 是一处带自己证据的改动。这是 `principle-sequence-verifiable-units`。在 How to read this 里写明执行剧本。按 Autopilot-stack 末尾的规则，在 Autopilot-full 和 Autopilot-stack 之间选择。常设程序改用 Orchestrate。

5. 全文按 `/technical-writing` 来写，然后 `/unslop`。正文只用一种 Diátaxis 模式，就是 how-to。附录放解释和参考。每个标题写出任务或发现。不用长破折号。不用句中冒号。

6. 运行 `node pstack/skills/poteto-mode/scripts/check-plan.mjs <plan.md>`，并修掉它打印的每一行。这是 `principle-encode-lessons-in-structure`。脚本检查什么，见 [check-plan.mjs](#ref-check-plan)。

7. 交还。贴出计划路径和脚本输出，然后停止。执行要等操作者明确开工，并走计划点名的执行剧本。

验证规则在编号步骤之外，但是每一块验证都要遵守。只靠测试不够。一个 PR 只有在它的单元、实机和性能格子全部勾上时才算验证过。这是 `principle-prove-it-works`。这句话就是验证规则。每个验证块都以它开头。

实机块是强制的。十条分路在 PR 头上，经控制技能驱动真实界面，按 `swarm` 技能，模型用 `swarm workers` 的模型，默认 `grok-4.7-xhigh-fast`。每条分路是一格，写明具体场景、保存的截图和通过谓词。第一条是针对主干的回归分路。它在主干和头上跑同一个承重场景。主干没有这个功能时，分路记下这个事实，并闸住 diff 新增的行为，加上用户等待的终态，不要编造一个主干结果。

性能门是双侧的。主干和头都必须产出点名的指标。主干没有这个功能时，还要单独隔离 diff 新增的工作，给这份工作加上绝对预算，并加上用户等待的端到端状态。不要在不可比的场景之间声称一个比值。性能块写出指标、交错的探测、先测量的主干基线，以及带有失败数字的规则。

改变交互的 PR 有审查门。操作者在聊天里看截图和视频，然后才合并。不改变交互的 PR 写上 `**Review gate.** None. <PR id> is not review-gated.`，并且下面没有格子。

控制技能按界面选。浏览器、Electron 和网页界面用 `cursor-team-kit` 的 `control-ui`。CLI 和 TUI 用 `cursor-team-kit` 的 `control-cli`。原生移动界面用仓库里已有的、驱动模拟器的技能。一个 PR 碰到两个界面，就两边都设分路。某个界面没有控制技能时，记为附录 C 的风险，实机块仍要写明每条分路如何驱动它。

骨架必须整份保留。正文不足十行，写清改什么、为谁改、程序强制的规则，以及按顺序的 PR 标识。

How to read this 写明：一格是一个工作单元。每一格点名能核对它的证据。嵌套的格是上面那格的子步骤。只有证据存在时才勾格。证据是一个文件、一行日志、一张截图、一次测试运行或一个 SHA。正文是 how-to。附录负责解释和记录。程序运行哪一份执行剧本要写出来，并写明谁合并，哪些 PR 标识是操作者的项、停在 merge-ready。验证规则那句英文也要出现。

Program checklist 按顺序含有这些三级标题。检查脚本要求标题以这些英文开头。

Arm the program 的格子是：

- 向操作者陈述协议和这份计划，然后停止。只有操作者明确开工才开始执行。
- 开工之后，用这段精确文字武装一个 `/goal`。文字包含计划路径、按顺序的 PR 标识、验证规则、谁合并，以及完成条件。
- 程序开始时从主干读这些文件，每一拍都重读。执行剧本、`pstack/skills/swarm/SKILL.md`、控制技能的路径、[Opening a PR](playbooks-pr.md#playbook-opening-a-pr) 对应的 `playbooks/opening-a-pr.md`，以及程序用到的其他叶子技能。命令形式是 `git show origin/main:` 加上路径。
- 武装 30 分钟的审计拍。本地会话用真实终端里的 `/loop`。云上的根用 cloud-sleeper 唤醒链。不要把节拍留在记忆里。
- 原样使用下面的拍子提示。审计发现了先前任何状态消息都没报告过的被跟踪变化时，才在聊天里给操作者发短状态。这类变化包括 PR 打开、代码就绪的头、一轮开始或结束、一份裁决、一次合并、卡住的代理和采取的行动、阻塞加上或清除、只有操作者能做的决定。点名每一个这样的变化，其他什么都不写。不要重复表格、已合并名单或没变的阻塞。审计什么都没发现时，这一回合不写回复文字。无论哪种，都把这一拍的行记进决策轨迹。行里写报告了哪些项，或写 none。
- 操作者要求暂停或停工时，立刻向每个主人发送零写入命令。

原文要求原样放进计划的拍子提示是：

```text
Re-read the execution playbook from trunk and the armed /goal. Audit the operation against both and fix drift in this tick. Probe every active lane and judge progress by side effects only. Stand down a stuck lane and dispatch its replacement now. Then post a short status message to the operator in chat only when the audit found a tracked change that no earlier status message reported, such as a PR opened, a code-ready head, a round launched or closed, a verdict, a merge, a stuck agent and the action taken, a blocker added or cleared, or a decision only the operator can make. Name every such change and nothing else. Do not repeat a table, the merged list, or an unchanged blocker. If the audit found none, end the turn with no reply text. Either way, log this tick's row in your decision trail. The row names the items reported, or none.
```

Spawn owners 的格子是：每个 PR 一名主人，生命周期以执行剧本为准。按依赖图。依赖工作只在父 PR 合并后开始。执行剧本使用栈时，可以基在父分支上。占位例子是：若干 PR 彼此独立且最先，都从 `main` 分出。某个 PR 在另一个之后。守住文件边界，某一类 PR 只碰指定的 glob。守住审查门。改变交互的 PR 在合并前等待操作者在聊天里看截图和视频。

PR mechanics, for every PR 的格子是：forge 只选定一次。默认 `gh`。`command -v origin` 成功且 Origin 能解析仓库时，每次 PR 操作都用 `origin pr`。任何回退到 `gh` 都要记录。从不要求 `gt`。PR 以就绪打开，从不以草稿打开。命令是 `origin pr create --status open --base <base-branch>` 或 `gh pr create --base <base-branch>`。栈的子 PR 指向父分支。面向 PR 的推送之前，把仓库的 lint 和类型检查跑一次。推送时钩子开着。每次提交前跑 `/deslop`，审查前跑 `/no-comments`。每条 Bugbot 和安全审查评论都按 `references/bugbot-triage.md` 分类。代码就绪报告和 Babysit 之前，变基到当前主干。修复轮次保持那个合并基。只有在合并准备、与主干的 `git merge-tree` 冲突，或 CI 失败来自主干上的变化时，才再次变基。

Verdict and merge, for every PR 的格子是：在代码就绪的头 SHA 上，以及之后每次改变补丁的推送上，按 `pstack/skills/swarm/SKILL.md` 跑 swarm。一条门禁分路。十条实机分路来自该 PR 的 Verify, live。一条性能分路来自 Verify, perf。两条或更多审计分路，各自有焦点，读 diff 和收据，并且不信任 PR 正文。根在裁决之前，于 merge-ready 报告里审计收据。只有每条分路都是 `PASS` 才算干净。发现回到主人，包括分路当成笔记提交的缺陷。新的头要新的 swarm 和新的裁决。按 [Shipping](playbooks-pr.md#playbook-shipping) 的 patch-id 规则仍然有效的结果除外。合并或追加规则来自执行剧本，并带上 Shipping 的 patch-id 规则。

Boot recipe, for every live lane 写明：每条实机分路在 PR 头上的自己的云虚拟机里运行。经 `cursor-team-kit` 的 `control-ui` 或 `control-cli` 驱动。格子包括：`git fetch origin <head-branch> && git checkout <head SHA>`。启动后端和界面，等到就绪。输入只经控制技能的命令送入，并点名只读诊断。每张截图存到 `/tmp/swarm-<pr-id>/worker-<n>/<slug>.png`，报告里返回路径。

每个 PR 节的子块必须按这个顺序，标题用这些英文。

- Depends on。写依赖的 PR 标识，或 None。
- Files。编辑、创建、删除的路径，各用格子。
- Build。一处改动，写出符号和文件。
- You see。一个可观察结果，带确切的日志行或屏幕状态。
- Verify, unit。以验证规则开头。格子写测试文件和新增的用例，以及要跑的命令。
- Verify, live。以验证规则开头。写明十条分路所在的模型，以及“在 PR 头上”。第 1 条是针对主干的回归分路。第 2 条到第 10 条各写场景、`Save` 的截图和 `Pass when` 的谓词。
- Verify, perf。以验证规则开头。四格依次是 Metric、Probe、Baseline、Rule。指标在主干和头上都测量。主干没有功能时，还要写出 diff 新增的工作和用户等待的端到端状态。探测在主干和头上交错运行，两侧都要产出指标。基线先记录主干的值。规则写头相对主干、以及哪个数字算失败。场景不可比时，改为给 diff 新增的工作和用户可见终态设绝对预算，不用一个无效比值。
- Review gate。操作者在合并前审查。格子包括把某条分路的截图复制到 `<media path>/<pr-id>-review-<slug>.png`，在分路虚拟机上录 30 到 60 秒视频，存成 `<media path>/<pr-id>-review.mp4`，把截图和视频发到聊天里，停在 merge-ready，等待操作者的点击。不需要审查门时，用上面的 None 句子，并且没有格子。
- Merge。根在确切的头 SHA 上给出干净裁决。Bugbot 分类已做。裁决之后变基到当前主干，patch-id 不变。然后要么主人 squash 合并自己的 PR，要么根把它追加到基分支栈上、由操作者自下而上落地。

Close the program 的格子是：上面每一格都连同证据勾上。按执行剧本所要求的报告回复操作者。

附录按这个顺序。附录 A 是原型证据。每个被原型回答的开放问题，带上分支、SHA 和产物链接。每个仍未证明的问题也留下。附录 B 是被否决的方案，以及它为什么输。附录 C 是风险，写明落在哪个 PR，以及主人看着什么。附录 D 是链接和阅读清单。编辑前要读的文档。哪些 PR 使用 `pstack/skills/how/SKILL.md` 和 `pstack/skills/interrogate/SKILL.md`。轨迹按 `pstack/skills/show-me-your-work/SKILL.md`。

必须原样出现在每个验证块开头的英文规则是：

```text
Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked.
```

### 回应

写出计划路径，PR 标识及其依赖和需要审查门的那一组，原型证明了什么、什么仍未证明，以及检查脚本的输出。

### 陷阱与注意

计划是交付物。不要在这个剧本里实现。

一两个文件且做法明显时，不要写计划。

只问实验解决不了的产品或偏好，并且要给选项。

正文是 how-to。解释和参考放附录。不用长破折号，不用句中冒号。标题和子块的顺序不能改。

实机块不能省。十条分路、截图和通过谓词都不能省。主干没有功能时，不要编造主干结果，也不要在不可比的场景之间写比值。计划要求每个验证块都以那句验证规则开头。

改变交互才有审查门。不改变交互时写 None，并且不要在下面留空格子。

交还之后停止。没有明确的开工，不开始执行。暂停或停工时，每个主人立刻收到零写入。

### 流程图

```flow 写多阶段计划
start 开始
step 判断要不要计划 | 一两文件可跳过
  stop 改动很窄 | 说明原因后停止
step 用原型收口问题 | 只问产品或偏好
step 子代理探查代码 | 只回收指针
step 填满计划骨架 | 一节对应一个 PR
step 按技术写作定稿 | 然后再跑 unslop
step 跑计划检查脚本 | 修掉打印的每一行
step 交还路径与输出 | 等明确开工再执行
end 结束
```

### 分步产出

1. 一句说明：这次不写计划，并已停止。或者进入下一步。
2. 每个开放问题的原型分支、SHA 和截图，准备放进附录 A。仍未证明的问题也记下来。
3. 子代理返回的文件指针、约定、测试命令和入口。没有内联转储。
4. 一份填满占位的计划。标题和子块顺序与骨架一致。执行剧本已点名。
5. 经过 `/technical-writing` 和 `/unslop` 的 how-to 正文，以及附录里的解释和参考。
6. `check-plan.mjs` 的输出。打印出的每一行都已修掉，脚本以成功结束。
7. 交给操作者的计划路径和脚本输出。执行没有开始。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你要把结账拆成三个互相依赖的 PR，对代理说：先写多 PR 计划，不要动手改代码。
>
> 代理发现这不是一两个文件的明显改动，于是为还没定的交互跑原型，把分支、SHA 和截图留给附录 A。探索放在 `poteto-agent` 子代理里，只要指针。计划写到代理存储的 `docs/` 下。三个 PR 各一节，子块顺序与骨架一致。执行剧本按“操作者要在落地前审查”选 Autopilot-stack。正文用 `/technical-writing` 写成 how-to，再 `/unslop`。然后运行 `check-plan.mjs`，修到它不再打印问题。代理贴出路径和脚本输出后停止，不实现。

### 失败、中止与含糊时

改动窄且做法明显时，说明并停止，不要写一份空计划。

原型解决不了的产品或偏好才问人，并且给出选项。其余开放问题先跑 `playbooks/prototype.md`。

检查脚本以非零退出时，修它打印的每一行，不要把带问题的计划交出去。

操作者没有明确开工时，第 7 步就是终点。陈述协议和计划之后也要停，这是 Arm the program 的第一格。

主干没有功能时，回归分路记下这个事实并闸住新增行为与用户等待的终态。性能块改用绝对预算。不要写一个比值。

界面没有控制技能时，写进附录 C，实机块仍要写驱动方式。

### 调用的技能与脚本

- `playbooks/prototype.md`：每个开放问题先原型。
- `subagent_type: "poteto-agent"`：探索子代理。模型按 Subagents 节指定。
- `principle-never-block-on-the-human`、`principle-guard-the-context-window`、`principle-sequence-verifiable-units`、`principle-prove-it-works`、`principle-encode-lessons-in-structure`。
- `/technical-writing`、`/unslop`。正文是 how-to 这一种 Diátaxis 模式。
- `node pstack/skills/poteto-mode/scripts/check-plan.mjs`：见 [check-plan.mjs](#ref-check-plan)。
- [Autopilot-full](#playbook-autopilot-full)、[Autopilot-stack](#playbook-autopilot-stack)、[Orchestrate](#playbook-orchestrate)：按规则选执行剧本。
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)、[Shipping](playbooks-pr.md#playbook-shipping)：计划要读前者，合并规则引用后者的 patch-id。
- `swarm`，工作者模型默认 `grok-4.7-xhigh-fast`。
- `control-ui`、`control-cli`：属于 `cursor-team-kit`。
- [how](how.md#skill-how)、`interrogate`、[show-me-your-work](personal.md#skill-show-me-your-work)：附录 D 点名哪些 PR 要读它们。
- `/deslop`、`/no-comments`：属于 PR mechanics。`/deslop` 在 `cursor-team-kit`。
- `references/bugbot-triage.md`：分类 Bugbot 和安全审查评论。标准见 [Bugbot 分类](playbooks-pr.md#ref-bugbot-triage)。

### 辅助资料：check-plan.mjs {#ref-check-plan}

原文：{{src:skills/poteto-mode/scripts/check-plan.mjs}}

用法是 `node check-plan.mjs <plan.md>`。剧本写的路径是 `node pstack/skills/poteto-mode/scripts/check-plan.mjs <plan.md>`。没有文件参数时，标准错误写出 `Usage: node check-plan.mjs <plan.md>`，退出码 2。

文件若以 `---` 开头，第一段前言会被跳过，从下一个 `---` 之后开始检查。代码围栏里的行不参与破折号、引号、冒号和格子检查。

围栏之外，它把行内代码换成一个反引号，去掉图片和链接目标，然后检查。出现长破折号或短破折号，报告 `long dash`。出现弯引号，报告 `curly quote`。出现冒号后紧跟非空白，报告 `mid-sentence colon`。这就是剧本要求计划不用长破折号、不用句中冒号的可执行形式。

结构上它要求有一级标题。引言，也就是一级标题之后、How to read this 之前的非空行，必须少于十行。必须有 `## How to read this`，并且含有这些片段：`One box is one unit of work`、`names the evidence`、`Check a box only when its evidence exists`、`playbooks/`，以及验证规则全文。

必须有 `## Program checklist`。其中三级标题要按顺序以这些英文开头：`Arm the program`、`Spawn owners`、`PR mechanics`、`Verdict and merge`、`Boot recipe`。正文还要含有 `/goal`、`git show origin/main:`、30 分钟的写法，以及 `status message`。

必须有 `## Close the program`。Program checklist 和 Close the program 之间至少有一节 PR。Close the program 之后的二级标题都必须以 `Appendix` 开头，并且其中一节的标题含有 `Prototype evidence`。

每一节 PR 的加粗子块必须严格按这个顺序：`Depends on.`、`Files.`、`Build.`、`You see.`、`Verify, unit.`、`Verify, live.`、`Verify, perf.`、`Review gate.`、`Merge.`。Depends on 后面不能什么都不写。Files、Build、You see、Verify, unit、Merge 至少各有一格。三个 Verify 子块的同一行必须以验证规则开头。

Verify, live 的同一行必须匹配“Ten lanes on \`模型\` at the PR head”，模型由反引号里的文字填上。实机格子必须是 Lane 1 到 Lane 10。每一条都要有 `Save` 加上反引号路径，以及 `Pass when`。不是分路的实机格子会报错。

Verify, perf 的格子必须以 `Metric.`、`Probe.`、`Baseline.`、`Rule.` 这个顺序开头。

Review gate 若以 `None.` 开头，下面不能有格子。否则必须有格子，并且正文含有 `screenshot`、`video`、`operator`。

标准输出先对每个 PR 打一行：标题、总格子数，以及除 Depends on 以外各子块的格子数。最后一行是 `N PR sections, M problems`。问题行写到标准错误，形式是 `文件:行号: 消息`。有问题时退出码 1，没有问题时退出码 0。

## Orchestrate {#playbook-orchestrate}

原文：{{src:skills/poteto-mode/playbooks/orchestrate.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责这个程序，从不负责代码。你写简报、排空队列、保持合并前沿为绿色，并做决定。

### 何时使用

整个项目交给一个常设的协调者聊天时使用。它跨越多日，有许多叠放的 PR，几十到几百个子代理，人一天看两次，而不是每五分钟看一次。说法包括 “run this whole project” 和 “own this migration until it lands”。

一个任务驱向一个谓词，走 [Autonomous run](#playbook-autonomous-run)。一次雄心运行需要专门流程，走 [figure-it-out](arena-swarm.md#skill-figure-it-out)。工作活过任何一个单独的代理时，才路由到这里。一个代理能在会话预算内做完的工作不是程序。仪式必须随程序缩放。单元便宜又几乎相同时，按每一节的指示把仪式收掉。

### 运作方式

三条规则贯穿其余部分。完成是队列事件，不是中断。每一次派出和每一次续跑都原样带上常设指令。简报就是产品。含糊的简报会安静地失败，因为工作者不能问你问题。

角色和位置如下。

协调者就是这个聊天。它在本地。它框定、写简报、排空收件箱、拥有给人的报告、做判断。它从不编写或编辑代码。有冲突的合并、重新叠栈和代码改动永远是任务。在本地 Git 便宜的仓库上，把一个已验证单元机械地落地，可以是协调者自己做的记账。那是指快进，或干净地拣取工作者的提交，然后推送。把做完的工作排在一个闲着的叠栈者后面，会让截止时间什么都收不到。循环从头到尾是代理的。派出、续跑和排空只经 Task 工具。状态的读和写在排空点经 `scripts/orch/orch.ts`，一条命令进去，一行出来。CLI 从不派出、等待或唤醒任何东西。

子协调者永远在本地，耐久，一条轨道一个，并且只在程序大到一个协调者的排空管不过来时才设。协调者自己排得空的轨道不需要中间层。每加一层嵌套，都要再付一整段定向开场。阻塞的子协调者会在父级空闲时把它的孩子藏起来。它拥有自己轨道的单元和板，写自己工作者的简报，派出自己的工作者和验证者。嵌套可以到深度 3。嵌套的派出拥有完整的 Task 模式，包括 `environment`。它在波次边界汇总聚合，从不转发孩子的原始报告。在飞的孩子封顶在一次排空处理得了的数量，大约十个，作为滚动窗口。绝不要做成阻塞的批次。批次的代价是每一批里最慢的那个孩子。

工作者和验证者永远使用 `environment: "cloud"`，除非任务需要这台机器。需要本机的情况是：`cursor-team-kit` 的 `control-ui` 或 `control-cli` 做运行时验证。读取 `agent-transcripts/` 下的本地转录。模拟器和本地 IDE 状态。只存在于这里的认证。云代理读不到本地存储，所以简报把它们需要的内容内联进去，或指向仓库路径。宁可更少、更宽的工作者。一个工作树或一个分支只有一个写者。这是 `principle-separate-before-serializing-shared-state`。一个单元的验证者要用和工作者不同的模型族。

深度停在协调者、轨道、工作者。轨道怎么切，按项目来写。构建、落地和验证是常见的切法，不是规定的形状。硬编码的 swarm 树试过，因太死板而搁置。

存储布局如下。在当前代理的存储里创建 `orchestrate/<project-slug>/`。路径在系统提示里。每个文件恰好一个写者。拥有者发布事实，读者在读取时聚合。记账用 `bun scripts/orch/orch.ts`，下面写成 `orch`。它的普通 TSV 和 JSON 没有 CLI 也能读。命令的实际行为见 [orch CLI](#ref-orch)。

- `preferences.md` 是常设指令登记。编号的行，每行一条约束。内容可以是模型政策、栈的形状和数量、验证门槛、禁止的路径、升级政策。每次派出和每次续跑都原样粘贴。指令会在续跑中衰减，丢掉一条就要人再花一轮。发现自己在重复一条指令时，先把这一行追加进去，再行动。这是 `principle-encode-lessons-in-structure`。
- `overview.md` 是耐久的 PR 和问题库。追加。不要按事件整份重写。
- `units.tsv` 每个单元一行。列是 id、track、state、branch、PR、head SHA、brief 路径。就地更新行。
- `frontier.json` 是算出来的合并前沿，见栈安全。
- `ledger.tsv` 是验证账本，见验证一节。
- `inbox/` 放完成指针。`gates.md` 停放人的门。每条有问题、选项，以及没有回答时的默认。
- `decisions.tsv` 是经 show-me-your-work 留下的轨迹。
- `status.md` 在每次排空时从 `units.tsv` 和 `ledger.tsv` 派生，从不手写维护。从表重新生成，不要把事件叙述写进去。

简报是你给代理的提示，也是你唯一的产品。马虎的简报会在整棵树上复合成马虎。每次派出都带上全部字段。填不出的字段，表示这个单元你还没框定。

字段如下。

- `GOAL`：一句话，结果，一个没有聊天权限的陌生人也能执行。
- `SCOPE`：这个单元可以写的路径，不可以写的路径，以及它独占的工作树或分支。
- `CONTEXT`：指向文件和 PR 的指针。这个单元依赖上游报告时，把报告全文粘进来，因为工作者看不见兄弟。
- `ACCEPTANCE`：可检查的标准，一行一条。
- `VERIFY`：确切命令或控制技能的路径，加上已知的陷阱。
- `TIMEBOX`：运行时间的粗上限。到期时返回部分发现并停止，不要继续跑。
- `FORBIDDEN`：不要 `gt`，不要变基，不要强推，不要修范围之外的东西，再加上这个单元特有的禁令。
- `REPORT`：状态、分支、头 SHA、PR、裁决、你实际跑了什么、偏差、建议的后续。
- `STANDING`：`preferences.md` 原样粘贴。

简报的大小随单元缩放。一条命令的单元把模板收成一段，这段仍要点名目标、范围、验证命令和报告形状。用 4KB 的脚手架包住两行编辑，写和遵守的成本会超过编辑本身。本地派出可以用存储路径引用常设指令文件。原样粘贴用于云派出和每一次续跑。

子协调者的简报还要加上轨道边界和单元名单、派出预算、云默认和本地例外名单、排空协议，以及汇总格式。每个孩子一行：名字、状态、PR、头 SHA、裁决、一句话，再加上轨道状态和前沿增量。

依赖是上下文的传递，不只是顺序。没声明的上游上下文会让工作者猜测。缺字段是拒绝派出的条件。每一波、每个子协调者，抽一份工作者简报来审计。审计和它所抽的那一波同时进行，绝不做成挡在前面的门。失败的简报停掉那条轨道，并修正子协调者的指令，不只是修正那个工作者，因为简报质量会在运行后期衰减。绝不要用续跑把简报串起来。用收拢后的范围重新派出。

编号步骤如下。

1. 框定。把完成谓词说成可数的东西。原文的例子是全部 126 个单元都已合并，并且每个都在账本里验证到 `unit-test-verified` 或更好。量化范围：单元、粗略工作量、预期的栈，以及墙钟预算。若一个代理能在这个预算内做完，停在这里，改跑 Autonomous run。收掉仪式不能依赖另一份文档在不在。它的意思是在这次会话里直接做。需要时用普通工作者，验证就地做，边做边落地。下面的存储、登记和试点机器都不用。对着预算安排落地。大约到预算的百分之七十时，停止派出，把已经验证的落地。按项目给轨道命名。有争议的分解，或一扇单向的门，在试点之前走 arena 技能。框定呈现一次。可逆的准备不等待。

2. 安装运行时。运行 `orch init`。经 [show-me-your-work](personal.md#skill-show-me-your-work) 打开轨迹。任何派出之前写好常设指令。用 `orch frontier set --repo <repo-dir>` 从已有 PR 种下 `frontier.json`。

3. 试点。把一个单元走完整条路径：简报、工作者、验证、进入栈、账本行、合并。试点用来证伪简报模板、验证配方和单元大小。此时代价是一个代理，而不是五十个。在铺开之前，用试点的证据修正契约。试点的规模随单元缩放。程序由几乎相同的便宜单元组成时，第一个单元就是试点，当作普通单元来跑，验证命令就地执行，它一落地就开始铺开。专门的试点流水线，也就是单独的验证者代理加上审计门，用于昂贵或新颖的单元形状。对克隆单元来说，串行的试点没有什么可证伪的。

4. 铺开。派出滚动窗口里的工作者，直到在飞上限，孩子完成一个就补一个。阻塞的批次会为每一批里最慢的孩子付钱。只有超过角色一节里的单排空门槛时，才派出轨道子协调者。每次排空之后重算就绪的工作。把上游报告传进下游简报。兄弟之间的通信只向上。抽查简报的审计和它所抽的那一波并行。失败时停掉下一次补充，不停当前这一波。

5. 排空。在每个排空点运行下面的队列纪律。

6. 落地。落地是连续的，从不是最后阶段。集成从第一个已验证单元开始，和其余波次并行。重的仓库上，叠栈者从第一波起就是常设角色，单元一验证就集成。本地 Git 便宜的仓库上，协调者按角色一节自己落地已验证单元。栈上方的工作之前，先保持前沿为绿色。栈安全管辖这里。只在合并或报告了新的头 SHA 时推进 `frontier.json`。

7. 关闭。排空最后的收件箱。把每个派出过的代理对到一个终态行：完成、放弃，或僵尸已对账。在真实产物上确认谓词。确认每个已落地的 PR 对其当前头 SHA 都有裁决。按 show-me-your-work 审计轨迹，包括它的跨模型审查。把反复出现的修正编码进 `preferences.md` 或简报模板。存储留着。它就是事后记录。

队列和排空的纪律如下。

收到完成通知时，运行 `orch inbox push <agent> <unit> <status> [--report PATH]`，然后回到你正在做的事。绝不在线做深审查。需要审查的完成变成一个验证者单元。绝不在一次排空里审查 diff。

在四个点成批排空：关键段结束时，轨道汇总时，前沿监视器唤醒时，以及给人报告之前。前沿监视经 loop skill 武装，并带一个长时间心跳做后备。每一批以 `orch inbox drain` 开始。排空期间到达的东西等下一批。

先做完的关键段是：写简报、一次栈操作、一个冲突决定、写一扇门、更新账本或前沿。

每次排空把每个指针分成已落地、需要验证、失败、僵尸或噪声。结果行经 `orch unit add`、`orch unit set` 和 `orch ledger record` 写入。然后运行 `orch status`，再在同一条消息里派出下一波。

在轨道汇总时交代每一个派出过的孩子：已到达、已重新派出，或它的范围被明确吸收。悄悄重做一个失踪孩子的工作，会同时藏起浪费的花费，和它的结果本来要补上的覆盖缺口。

一次排空回合以 `orch status` 的三行结束：相对各状态的计数、变了什么、打开的门。细节在 `status.md`。完整的回复契约用在检查点和关闭时。

栈安全如下。

前沿是算出来的对象，从不是叙述。每次合并和每次栈变动之后，从 `gt` 重算 `frontier.json`。因为 GitHub 的基引用会在重新叠栈中途漂移，而 gt 的跟踪才是权威。内容是有序的 PR 名单、分支名、头 SHA、一个世代号，以及最低的未合并 PR。在 gt 认识这条栈的地方解析它，通常是叠栈者的克隆。一个从未见过这些提交的检出，其 gt 元数据会报告没有 PR，命令会报错，而不是猜测。

每条栈恰好一个叠栈者可以运行 `gt`，并且在它自己的栈内串行。把持有者写进常设指令。重新叠栈在云上跑。这个规模的本地重新叠栈会把笔记本拖垮。

工作者从不变基，也从不运行 `gt`。看守者遵循 [Babysit](playbooks-pr.md#playbook-babysit)，一条栈一个，范围是一个不可变的前沿世代。它们把冲突报告给叠栈者，而不是自己重新叠栈。

PR 的关闭和改指向只经叠栈者。关掉一个基 PR 会让它上面的每一条链变成孤儿。合并和栈手术是单元，和其他单元一样有简报。

一个回溯监视者跟随已合并的 PR，看回退、合并后的 CI 破裂，以及没人接的后续。

验证随单元缩放。`VERIFY` 是一条便宜命令时，工作者运行它并报告输出，协调者抽查收据。专门的验证者代理，而且要用和工作者不同的模型族，用于验证昂贵、依赖判断或爆炸半径大的单元。一个验证者代理的全部产品只是重跑一条命令，那是仪式，不是验证。

用 `orch ledger record` 写账本行。用 `orch ledger check` 查当前 PR 和头 SHA。`ledger.tsv` 每个裁决一行，键是 PR 号加上头 SHA。裁决取 `live-ui-verified`、`unit-test-verified`、`type-check-only`、`verifier-blocked`、`verifier-failed`。CI 变绿是裁决的输入，不是裁决。行为方面的工作要比 `type-check-only` 更好。`verifier-blocked` 不是通过。环境恢复后重新派出。`verifier-failed` 得到一个修复单元，而不是再验证一次。工作者可以自述。验证者在同一键上覆盖它。新的头 SHA 使这一行失效，所以重新叠栈之后要再验证。账本回答“这个验证过了吗”。记忆和转录不回答。

一个单元在它的输出于落地的那一刻外化之前，不算完成。不要攒到运行结束。工作者推送它的分支。验证者写下账本行。收据落在存储里。只存在于一台虚拟机上的工作，在那台虚拟机死掉时，从来就不算完成。

存活和失败如下。

绝不要为了查看一个代理而续跑它。续跑会把一个空闲代理重新启动。只读探测用账本、`units.tsv`、`gh`、已推送的分支，以及 Cursor 仪表上云代理的状态。转录的修改时间不是存活。

安静的死亡要在收件箱里放一行合成的事后记录：单元、失败方式、最后的证据、选项。证据一到就重计划。不要等全部安静下来。

按方式重试。碰到上限或内存不足，用更小的范围重新派出。网络掉线，原样重试。工具错误，换一个模型重试。未知情况，重试一次。两次重试之后，放弃这个单元，并绕过它重计划。

几小时后才回来的僵尸，在任何东西被接受之前，先对照当前前沿和账本。独特的发现经一个新单元抢救，绝不盲目合并。

继续派出会在整棵树上产出垃圾时，例如上游输出是坏的、验收是坏的、基础设施是死的，在常设指令顶部写一行停止。让在飞的工作做完，修好原因，再清除这行停止。

你自己的基础设施重试，用和孩子一样的界限。连续几次工具中止之后，停止重试。把终态交接写进耐久状态：什么做完了、它在哪里、续上的确切命令。然后结束这次运行。

Cursor 重启之后，本地代理是死的，云上的工作不是。重读常设指令和 `units.tsv`，重算前沿，按 PR 和分支重新接上云工作，而不是按代理 id。每条轨道从它存着的简报加上当前状态，重新派出一个子协调者。然后排空、继续。死会话的存储锁会在下一次写入时自己清除。`orch` 会替换持有者 pid 已经不在的锁。

升级如下。

到达人的事项，收进状态页，而不是逐条送出。它们是不可逆行动，包括对共享分支强推、部署、删除、关掉别人的 PR。还有实验解决不了的真实产品或偏好。还有与观察到的现实矛盾的常设指令。还有挺过一次重计划的、程序级的死路。每一条先写成 `gates.md` 的条目，再问。工作绕过它继续。

绝不到达人的事项是：前沿的轻推、重新叠栈的机制、重试、CI 闪断的分类、审查线程的分类、格式修复、简报已经禁止的范围（拒绝并继续），以及“我该继续吗”。拿不准时，行动并记下。

运行中途的发现只修挡住前沿的东西。其余停进后续。在这个扇出规模上，一小点范围泄漏会乘成没人要的 PR。

### 回应

在检查点和关闭时写出：谓词，以及从 `units.tsv` 和 `ledger.tsv` 得出的计数。各条轨道以及每条落地了什么。前沿，包括 PR 名单和 SHA。裁决摘要。放弃了什么以及为什么。等着人的门，这是仅有的询问。存储路径和轨迹路径。数字来自表，不来自叙述。附上 PR 链接。

### 陷阱与注意

协调者不写代码。有冲突的合并、重新叠栈和代码改动是任务。本地 Git 便宜时，快进或干净拣取再推送，可以是协调者的记账。

一个代理能在预算内做完时，不要安装这套存储。大约百分之七十的预算之后停止派出，落地已验证的部分。

缺字段的简报不要派出。不要用续跑串简报。抽查失败时停的是下一次补充，不是当前波次。并修正子协调者的指令。

排空时不要在线审 diff。完成通知只推进收件箱。

工作者不变基、不跑 `gt`。只有登记过的那一个叠栈者可以跑 `gt`，并且在云上重新叠栈。关掉基 PR 会让上面的链变成孤儿。

CI 变绿不是裁决。`verifier-blocked` 不是通过。`verifier-failed` 要修复单元，不要原样再验。新 SHA 使账本行失效。

不要续跑一个代理来探活。转录修改时间不是存活。两次重试之后放弃并重计划。僵尸先对账。连续的工具中止之后，写下交接并结束。

只修挡住前沿的发现。范围泄漏会乘开。

> **解说（本书的解释，原文中没有）**
>
> [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)、Babysit、Shipping 和两个自动驾驶剧本都写明不要求 `gt`。本剧本的栈安全要求从 `gt` 重算前沿，并且每条栈只有一个叠栈者可以运行它。工作者的简报仍然禁止 `gt`。这是不同剧本各自的句子，不是一条可以互相替换的总规则。

### 流程图

```flow 编排长期项目
start 开始
  stop 单代理能做完 | 改走自主运行
step 框定完成谓词 | 量化范围与预算
step 安装记账运行时 | 运行 orch init
step 先把试点跑通 | 证伪后再铺开
step 滚动补齐工作者 | 完成一个补一个
step 在四个点排空 | 完成不是中断
step 持续落地已验证 | 前沿保持绿色
  back 5 | 下一波
step 收口并留下存档 | 核对谓词与裁决
end 结束
```

### 分步产出

1. 可数的完成谓词，以及单元、工作量、栈和墙钟预算。大约百分之七十处停止派出的安排。轨道的切法。有争议或单向门时，arena 的结果。若应收掉，则没有存储机器，工作在本次会话里直接做。
2. `orch init` 之后的存储。常设指令。经 show-me-your-work 打开的轨迹。从已有 PR 种下的 `frontier.json`。
3. 一个走完简报、工作者、验证、入栈、账本和合并的试点。被证伪之后修正过的契约。便宜的克隆单元则是第一个普通单元落地后立即铺开。
4. 不超过在飞上限的滚动窗口。需要时才有的子协调者。传进下游的上游报告。与波次并行的简报抽查。
5. 排空后的单元行、账本行和 `orch status` 的三行。下一波在同一次排空里派出。
6. 保持绿色的前沿。重仓库上的常设叠栈者，或本地 Git 便宜时协调者自己的机械落地。`frontier.json` 只随合并或新的头 SHA 前进。
7. 每个派出代理的终态行。真实产物上的谓词确认。每个已落地 PR 当前头的裁决。审计过的轨迹。写回 `preferences.md` 或模板的反复修正。原样留下的存储。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你说：own this migration until it lands。预计一百多个单元，要跨好几天。
>
> 代理先把谓词写成“每个单元都已合并，并且账本至少是 `unit-test-verified`”。它估计一个代理在这次会话预算里做不完，于是不收掉仪式。`orch init` 之后、任何派出之前，它写好编号的常设指令，并用 `orch frontier set` 种下前沿。它先把一个单元走完试点，用这次证据改简报模板，再开滚动窗口。完成通知只做 `orch inbox push`，排空时才分类、写行、看 `orch status` 的三行。它不写代码。不可逆的事写进 `gates.md`，其余绕过去继续。

### 失败、中止与含糊时

一个代理能在预算内做完时，第 1 步就停止编排，改跑 Autonomous run。不要依赖另一份文档来决定是否收掉。

大约百分之七十的预算用完后，停止派出，只落地已验证的部分。

简报缺字段时拒绝派出。抽查失败时停下一波补充，并改子协调者的指令。

继续派出会产出整树垃圾时，在常设指令顶部写停止行，等在飞的做完，修好再清除。

连续几次工具中止之后，停止重试，写下终态交接并结束。交接含已完成的内容、位置和续上的确切命令。

Cursor 重启后不要按代理 id 去找云工作。按 PR 和分支重接。本地代理视为已死。

到达人的只有不可逆行动、实验解决不了的产品或偏好、与现实矛盾的常设指令，以及挺过重计划的程序级死路。每条先停进 `gates.md`。拿不准时行动并记录。

### 调用的技能与脚本

- [Autonomous run](#playbook-autonomous-run)：一个代理能在预算内做完时改走它。一个任务对一个谓词时也走它。
- [figure-it-out](arena-swarm.md#skill-figure-it-out)：一次运行需要专门流程时改走它。
- arena：有争议的分解或单向门，在试点之前使用。
- [show-me-your-work](personal.md#skill-show-me-your-work)：打开轨迹。关闭时连同跨模型审查一起审计。`decisions.tsv` 由它留下。
- `scripts/orch/orch.ts`：排空点的记账。见 [orch CLI](#ref-orch)。CLI 不派出、不等待、不唤醒。
- `principle-encode-lessons-in-structure`：重复的指令先写进 `preferences.md`。
- `principle-separate-before-serializing-shared-state`：一个工作树或分支一个写者。
- Task 工具：派出、续跑、排空只走它。
- `control-ui`、`control-cli`：属于 `cursor-team-kit`。需要本机验证时，工作者可以不在云上。
- [Babysit](playbooks-pr.md#playbook-babysit)：一条栈一个看守者，范围是一个不可变的前沿世代。冲突报告给叠栈者。
- loop skill：武装前沿监视，并带长时间心跳。自主运行剧本把 `/loop` 写成 Cursor 内建命令。本剧本写的是 loop skill。
- `gt`：只由每条栈上的那一个叠栈者使用，用来重算前沿。工作者的 `FORBIDDEN` 含有不要 `gt`。

### 辅助资料：orch CLI {#ref-orch}

原文：{{src:skills/poteto-mode/scripts/orch/orch.ts}}

`orch` 的说明是普通文件上的编排记账。用法是 `orch [--store <dir>] [--json] [--force] <command>`。存储目录来自 `--store` 或环境变量 `ORCH_STORE`。两者都没有时，命令要求设置它们。`--json` 把完整行打成 JSON。`--force` 夺走已有的存储锁。锁的持有者 pid 已经不在时，命令会替换过期锁，并在标准错误说明。`--force` 夺走仍在的锁时，标准错误也会说明。剧本写明，死会话的锁会在下一次写入时清除，`orch` 替换持有者 pid 已经不在的锁。

CLI 不派出、不等待、不唤醒。剧本要求在排空点一条命令进去、一行出来。

`orch init` 创建存储目录，并在缺失时写入 `units.tsv`、`ledger.tsv`、`inbox/`、`gates.md`、`preferences.md` 和 `frontier.json`。`units.tsv` 的表头是 id、track、state、branch、pr、sha、brief。`ledger.tsv` 的表头是 pr、sha、verdict、evidence、verifier、ts。`frontier.json` 初始是一个空对象。剧本还要求协调者自己追加 `overview.md`，并用 show-me-your-work 留下 `decisions.tsv`。`status.md` 由 `orch status` 生成，不在 init 里写。

`unit add <id>` 需要 `--track`，可选 `--brief`。`unit set <id>` 需要 `--state`，可选 `--branch`、`--pr`、`--sha`。`unit get <id>` 取一行。`unit list` 可用 `--state` 和 `--track` 过滤。`unit counts` 按状态计数。紧凑的单元行是这些字段用制表符隔开。

`ledger record <pr> <sha> <verdict>` 需要 `--evidence`，可选 `--verifier`。裁决只能是 `live-ui-verified`、`unit-test-verified`、`type-check-only`、`verifier-blocked`、`verifier-failed`。`ledger check <pr> <sha>` 打出裁决。`ledger summary` 按裁决计数。

`inbox push <agent> <unit> <status>` 可选 `--report`。`inbox drain` 取走指针。`--peek` 只读不取走。`inbox count` 计数。排空的紧凑输出是全部指针，不截断。

`gate park <id>` 需要 `--question`、`--options`、`--default`。`gate list` 列出打开的门。`gate resolve <id>` 需要 `--answer`。

`frontier set` 发现 Graphite 栈并设置前沿。仓库目录来自 `--repo` 或 `ORCH_REPO`。`--prs <n,...>` 可选，用来钉住预期的 PR 顺序。`frontier show` 打出世代、PR 名单和最低的未合并 PR。紧凑形式含 `generation`、`prs` 和 `lowest-unmerged`。

`status` 渲染 `status.md`，并打出三行。第一行是单元数、各状态计数和账本裁决计数。第二行是相对上次的变化。第三行是打开的门的数量和 id。这就是剧本要求排空回合结束时的三行。

`standing show` 显示常设指令。`standing add <line>` 追加一条。

列表的紧凑输出默认最多四行，更多时提示改用 `--json`。`inbox drain` 除外，它打出全部。找不到对象时退出码 2。用法错误退出码 1，并打出帮助。

> **解说（本书的解释，原文中没有）**
>
> 剧本把排空点的结果说成一行。命令对单条记录的紧凑输出通常是一行。列表默认最多四行，`inbox drain` 可以多行，`--json` 是完整 JSON。原文没有把“一行”定义成禁止这些输出。

## Autopilot-full {#playbook-autopilot-full}

原文：{{src:skills/poteto-mode/playbooks/autopilot-full.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责裁决，从不负责那些 PR 本身。每个 PR 由一名主人从构建做到合并。没有你的干净蜂群裁决，什么都不能合并。

### 何时使用

说法是 “autopilot this queue”、“full autopilot”，以及一个主人对应一个 PR 的程序。选择规则在 [Autopilot-stack](#playbook-autopilot-stack) 末尾。PR 彼此独立，并且落地权已经授予时，用本剧本。操作者要在落地前审查、工作有顺序或互相耦合，或合并权被扣下时，用 Autopilot-stack。

[Orchestrate](#playbook-orchestrate) 跑的是常设程序。那里的协调者自己落地已验证的工作，工作者从不合并。这里每个 PR 的主人把整个生命周期做到合并。根只保留验证、会签和审计。

### 运作方式

1. 标出操作者的项，并遵守先陈述再等待。操作者点名的项留在操作者那里。操作者审查并点击。没有主人去合并其中一项。操作者要求陈述协议或计划时，交付陈述并停止。只有操作者明确开工，才开始执行。开工之后，用完整的程序目标武装一个 `/goal`。这个目标跨回合保持，直到队列做完。

2. 每个 PR 派出一名主人，带上完整生命周期和一份早开的轨迹。整个程序只选定一次 forge。默认是 `gh`。`command -v origin` 成功且 Origin 能解析仓库时，PR 的创建、编辑、查看、监视和合并都用 `origin pr ...`。否则留在 `gh` 并记下回退。从不要求 `gt`。每个 PR 一名 Cursor 云代理。它拥有构建、第一次推送、一个就绪的 PR、在真实产物上的自证（`principle-prove-it-works`）、按 `references/bugbot-triage.md` 的怀疑式 Bugbot 分类、一次去掉马虎文字的清理（`cursor-team-kit` 的 `deslop`，命令是 `/deslop`）、`/no-comments`（`no-comments` 技能）、变基到当前主干、按 [Babysit](playbooks-pr.md#playbook-babysit) 做到绿色的看守循环，以及合并本身。大约 15 分钟内，每个主人按 [show-me-your-work](personal.md#skill-show-me-your-work) 开始一份 `decisions.tsv` 轨迹，推送第一份分支快照，并以就绪状态打开 PR，从不以草稿打开。在自证之前打开 PR，这样 URL、决定和检查形成耐久轨迹。`decisions.tsv` 不提交，随报告返回。子代理一开始，主人就把其 id、预期运行时间，以及状态，写进同样方式保存的 `children.tsv`。预期运行时间至少是该类过去最长的一次。主人在代码就绪报告和 Babysit 之前做第一次变基，无论主干有没有漂移。修复轮次保持那个合并基。只有在第 5 步的合并准备、与主干的 `git merge-tree` 冲突，或 CI 失败来自主干上的变化时，主人才再次变基。交付的代码最终定稿后，在去掉马虎文字和 `/no-comments` 之后，它报告代码就绪的头 SHA。之后每次改变补丁的推送，也报告 SHA。自证、CI 和 Babysit 随后与 swarm 并行。自证、CI 和 Babysit 都结束时，主人带着头 SHA 报告 merge-ready。开始一轮的推送之前，先跑仓库 `AGENTS.md` 和规则为被碰路径点名的审查前检查。在已提交的头上跑。钩子通过不是证明。发布每次变基时，先做 `ls-remote` 检查，再对主人自己的分支 `git push --force-with-lease`。绝不强推共享分支。合并是主人不能单独做的唯一步骤。第 4 步给它把门。

3. 主人真正并行，并且从不叠成栈。PR 自成一体时，许多主人同时进行。一个分支一个写者，文件互不相交，跨 PR 的漂移由变基吸收。只有真正重叠的工作才串行。自成一体的 PR 直接从 main 分出。有顺序的工作是先合并再分枝。一个例外：主人必须拆开一处真正依赖的改动时，可以持有一条短的、私人的基分支栈。

4. 每一轮在合并前都要 swarm 验证。一轮从主人的代码就绪头 SHA 开始，也从之后每次改变 PR 补丁的推送开始。在那个 SHA 上，按 `swarm` 技能派出并行的、彼此独立的验证者，聚成一份裁决。合并需要的是，其补丁与 merge-ready 头相符的那一轮的干净裁决。裁决之前，在 merge-ready 报告里审计收据。分路包括：在那个 SHA 上重跑门禁。在改动所碰的真实界面上，实机证明承重行为。控制技能用 `cursor-team-kit` 的 `control-cli` 或 `control-ui`，没有时用点名的驱动。审计 diff，并且不信任 PR 正文。审计做成两条或更多审查分路，每条带完整简报，每条一个主焦点，例如与主干的消费者对等、生命周期和竞争，或数据和配置安全。针对主干的回归分路，在当前主干上跑同一个承重场景。主干没有这个功能时，记下这个事实，并闸住 diff 新增的行为加上用户等待的终态。不要假装主干能把它做出来。实机分路是地板。没有它的裁决不算干净。没有根的干净裁决，就不能合并。分路返回后，把每一条已经证明的、针对该 PR 的发现，一次修复向前发给主人。分路当成笔记提交的缺陷也是发现。对每条行为发现，要求一条先红的测试，覆盖每一处有同样缺陷的位点。没有测试能显出缺陷时，要求一份复现收据。把该缺陷加进下一轮的审查简报。新的头得到新的 swarm 和新的裁决。按 [Shipping](playbooks-pr.md#playbook-shipping) 的 patch-id 规则仍然有效的分路结果除外。

5. 干净裁决之后，主人合并并领取下一项。主人只从刚刚变基到主干的头上合并。合并准备绝不早于一轮的分路开始，并且在合并正之前，以变基到当前主干结束。合并准备的变基之后，主人报告新的头 SHA。合并前 CI 必须在这个头上通过。patch-id 规则决定这一轮的裁决是否仍然成立。若主干在合并前又动了，重新验证按 Shipping 的 patch-id 规则。新的头使裁决失效，除非 patch-id 没变。主人经已选定的 forge squash 合并自己的 PR，并从队列领取下一个自成一体的项。操作者的完全自主授予，加上根的干净裁决，才是合并授权。只靠 Babysit 永远没有这份授权。操作者点名的项停在 merge-ready，等待操作者点击。

6. 运行根层。被钉住的门或预算值的一次真正新的提高，需要你新的会签。这种限制是 CI 只允许收紧的那种。会签只在验证者证明之后授予。若操作者的授予或常设指令覆盖了批准，这份会签就是批准。主人按工具的批准契约所允许的形式记录它，并指向根的会签。一条分路对照这份会签检查记录。根从不给出或绕过 forge 所强制的批准。吸收已经落在 main 上的值是漂移，不是提高。大约每 30 分钟对所有主人跑一次审计拍。本地的根把每一拍武装成真实终端里的 `/loop`。循环使用被监视的 shell，睡眠 30 分钟，并发出输出通知的哨兵。云上的根使用已有的 cloud-sleeper 唤醒链。不要把节拍留给记忆，或有损的完成通知。每一拍用 `git show origin/main:pstack/skills/poteto-mode/playbooks/autopilot-full.md` 从主干重读本剧本，然后重读已武装的 `/goal`。对照两者审计这次运行。在这一拍里修正漂移。用通用的存活或状态检查探每个主人，并收集决策轨迹。只把副作用算成进展：提交、推送、PR 或检查的变化，以及存储里的报告。分路出错，或超过预期运行时间却没有副作用，就当作卡住。立刻让它停工并派出替换。不要等它客气地返回。每一拍还对程序的代理名单，在平台有这份名单时，以及每个主人的 `children.tsv`，做分路卡住测试。无论停止是否成功，根都让主人把每个卡住的子代理记成卡住。工作仍需要时就替换它。每个又卡住的替换走同样的步骤。主人做不到时，根把两步都做了。卡住从不证明工作，也从不把工作丢掉。合并成批时，跑一次回溯，并扫一遍合并后的机器人评论。只有在没有任何已经派出去的工作剩下时，才结束这一拍。最后一次合并之后也一样。

7. 操作者一停止，立刻停工。操作者的暂停或停工，立刻作为零写入命令到达每个主人。主人保持他们的简报，直到操作者放开。

### 回应

写出队列，以及每个 PR 的主人、状态和头 SHA。每份裁决和产出它的 swarm。合并了什么，每个主人接下来领了什么。授予了哪些会签以及为什么。打开的操作者的门。收集到的决策轨迹在哪里。

### 陷阱与注意

操作者点名的项，主人不合并。陈述协议或计划不是开工。

大约 15 分钟内要有轨迹、第一份推送和就绪的 PR。PR 在自证之前打开。`decisions.tsv` 和 `children.tsv` 不提交。

钩子通过不是证明。绝不强推共享分支。变基用 `git push --force-with-lease`，并且先 `ls-remote`。

自成一体的 PR 不叠栈。只有真正重叠才串行。短的私人基分支栈只用于必须拆开的真正依赖。

没有实机分路的裁决不算干净。没有根的干净裁决不能合并。笔记里的缺陷也是发现。

合并准备不能早于分路开始。新头使裁决失效，除非 patch-id 没变。Babysit 单独不构成合并授权。

吸收 main 上已有的值不是提高门或预算。根不绕过 forge 的批准。卡住的分路立刻替换。卡住既不证明也不丢弃工作。

### 流程图

```flow 全自主自动驾驶
start 开始
step 标出操作者的项 | 陈述完就先停下
  stop 还没有明确开工 | 不开始执行
step 每 PR 一名主人 | 走完全部生命周期
step 真并行且不叠栈 | 重叠的工作才串行
step 每轮蜂群后再合并 | 没有实机不算干净
step 干净裁决后才合并 | 合并前变基到主干
step 根层审计并会签 | 大约三十分钟一拍
step 叫停就立刻停写 | 主人保持原简报
end 结束
```

### 分步产出

1. 留给操作者的项。陈述之后的停止，或开工后武装的 `/goal`。
2. 每个 PR 一名云代理主人。大约 15 分钟内的轨迹、分支快照和就绪 PR。`children.tsv`。代码就绪的头 SHA。随后的 merge-ready 报告。
3. 并行的、文件不相交的主人。有顺序的工作是合并之后再分枝。真正依赖时，一条短的私人栈。
4. 每一轮的 swarm 裁决。收据在裁决前被审计。发现一次发回主人。实机分路在场。
5. 主人 squash 合并自己的 PR，并领取下一项。操作者的项停在 merge-ready。patch-id 仍对应那一轮时，裁决才被沿用。
6. 会签记录。大约每 30 分钟的审计拍。被替换的卡住分路。合并成批之后的回溯和机器人评论清扫。
7. 已经到达每个主人的零写入。简报保持到操作者放开。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你说：full autopilot。这两个 PR 互不重叠，落地权给你。第三个 PR 我自己点合并。
>
> 代理把第三个标成操作者的项。你说开工之后，它武装 `/goal`，为前两个各派一名云代理主人。大约 15 分钟内各自打开就绪 PR 并开始 `decisions.tsv`。根在代码就绪的 SHA 上跑 swarm。实机分路在场、每条分路都是 `PASS`、收据已审计之后，主人才变基到主干并 squash 合并，然后领下一项。第三个停在 merge-ready。你说停时，两个主人立刻零写入。

### 失败、中止与含糊时

要求陈述协议或计划时，交付并停止。没有明确开工不执行。

主人不能单独合并。第 4 步的干净裁决缺了，第 5 步不能发生。没有实机分路，裁决不算干净。

patch-id 变了就要新的一轮。主干在合并前又动了，同样按 patch-id 决定要不要重验。

分路出错或超时无副作用时，立刻停工并替换。不要等它返回。替换再卡住，步骤相同。主人做不到时根来做。

操作者的暂停或停工是立刻的零写入。已经派出去的工作还在时，审计拍不结束。最后一次合并之后也要确认没有剩余的派出工作。

### 调用的技能与脚本

- [show-me-your-work](personal.md#skill-show-me-your-work)：`decisions.tsv`。不提交，随报告返回。
- `principle-prove-it-works`：在真实产物上自证。
- `references/bugbot-triage.md`：怀疑式分类。标准见 [Bugbot 分类](playbooks-pr.md#ref-bugbot-triage)。
- `/deslop`：属于 `cursor-team-kit`。`/no-comments`。
- [Babysit](playbooks-pr.md#playbook-babysit)：主人把循环跑到绿色。合并授权不来自它单独一份。
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)：主人的简报就是那里等待的看守请求。
- `swarm`：每一轮的独立验证者。`control-ui` 与 `control-cli` 属于 `cursor-team-kit`。
- [Shipping](playbooks-pr.md#playbook-shipping)：patch-id 规则。
- `/loop` 或 cloud-sleeper：大约 30 分钟一拍。本地是被监视的 30 分钟睡眠加输出哨兵。
- `git push --force-with-lease`：只用于主人自己的分支，且先 `ls-remote`。
- `gh` 或 `origin pr`：不要求 `gt`。

## Autopilot-stack {#playbook-autopilot-stack}

原文：{{src:skills/poteto-mode/playbooks/autopilot-stack.md}} {{src:skills/poteto-mode/SKILL.md}}

你负责这条栈，从不负责落地。以完全自主把队列构建并验证完，然后把一条线性的基分支栈交给操作者审查和落地。

### 何时使用

它是 Autopilot-full 的姊妹剧本。说法包括 “autopilot-stack”、“stack them, don't ship”、“build the stack, I'll land it”。

PR 彼此独立且落地权已授予时，用 [Autopilot-full](#playbook-autopilot-full)。操作者要在落地前审查、工作有顺序或互相耦合，或合并权被扣下时，用本剧本。

### 运作方式

1. 主人循环保持不变。整个程序只选定一次 forge。默认 `gh`。`command -v origin` 成功且 Origin 能解析仓库时，创建、编辑、查看、监视和合并都用 `origin pr ...`。否则留在 `gh` 并记下回退。从不要求 `gt`。每个 PR 一名 Cursor 云代理，端到端拥有它的改动：构建、第一次推送、在自证之前打开的就绪 PR、自证（门禁、CI、收据）、按 `references/bugbot-triage.md` 的怀疑式 Bugbot 分类、`cursor-team-kit` 的 `/deslop`、`/no-comments`，以及按 Babysit 做到绿色。工作自成一体时，主人并行。大约 15 分钟内，每个主人按 show-me-your-work 开始 `decisions.tsv`，推送第一份分支快照，并以就绪状态打开 PR，从不以草稿打开。轨迹不提交，放在报告里返回。主人也保存 Autopilot-full 第 2 步的 `children.tsv`。

2. 在唤醒链上审计。根大约每 30 分钟跑一拍。本地的根把每一拍武装成真实终端里的 `/loop`。循环使用被监视的 shell，睡眠 30 分钟，并发出输出通知的哨兵。云上的根使用已有的 cloud-sleeper 唤醒链。不要把节拍留给记忆或有损的完成通知。每一拍用 `git show origin/main:pstack/skills/poteto-mode/playbooks/autopilot-stack.md` 从主干重读本剧本，然后重读已武装的 `/goal`。对照两者审计。在这一拍里修正漂移。用通用的存活或状态检查探每个主人。只把副作用算成进展：提交、推送、PR 或检查的变化，以及存储报告。分路超过预期运行时间却没有副作用时，当作卡住。立刻停工并派出替换。不要等它客气地返回。按 Autopilot-full 第 6 步探全部子代理，并按那里的方式结束这一拍。

3. 守住操作者的门。先陈述再等待，所以要求陈述计划不是开工。操作者明确开工之后，用完整的程序目标武装 `/goal`。目标跨回合保持，直到这条链做完。操作者停止时，每个主人立刻零写入并保持。

4. 验证每一轮。交付的代码最终定稿后，主人报告代码就绪的头 SHA。循环变绿时，带着确切的头 SHA 报告 STACK-READY。根按 Autopilot-full 第 4 步验证每一轮，只是用 STACK-READY 代替 merge-ready。没有验证过的东西不进入栈。

5. 干净裁决时只追加，从不发布。没有主人合并、武装 auto-merge 或关闭。干净裁决把 PR 追加到那一条线性的基分支栈上。顺序是验证完成的顺序，或操作者指定的顺序。

6. 拓扑只有一个写者，构建可以并行写。主人只推自己的分支，并报告尖端、当前基和打算的父。根是唯一的拓扑写者。追加一个 PR 时，获取打算的父，把子分支变基到那个父的准确尖端，在 `ls-remote` 检查之后才用 `--force-with-lease` 推送，并把 PR 的基设为父分支。创建用 `origin pr create --status open --base <parent-branch>` 或 `gh pr create --base <parent-branch>`。已有 PR 改指向用 `origin pr edit <pr> --base <parent-branch>` 或 `gh pr edit <pr> --base <parent-branch>`。只有根 PR 指向主干。绝不经 `gt` 提交或登记这条链。

7. 在根上吸收漂移，然后重验动过的部分。根获取当前主干，自下而上变基这条链。变基在主人的文件里露出冲突时，由那个主人修自己的一片，根再把结果推上去。变基改写它上面的每个 SHA，并使旧 SHA 上的裁决失效。在每个裁决 SHA 上应用 Shipping 的 patch-id 规则。不再有效的，交付之前回到本剧本第 4 步。即使 patch-id 没变，每次改写后的推送也要重跑可合并性和 CI。会签规则与 Autopilot-full 相同。一次真正新的钉住要停下来，等根的新会签。吸收已落地数值的漂移不是提高。

8. 交付这条链。交付物是一条已验证 PR 的线性链。在已选定的 forge 上可以自下而上审查。每一环在 PR 正文或评论里带上验证者的裁决。操作者审查并落地。用他们自己的点击，或武装 merge-when-ready。

在两个自动驾驶之间选择。PR 独立且落地权已授予时用 Autopilot-full。操作者要在落地前审查、工作有顺序或互相耦合，或合并权被扣下时用 Autopilot-stack。

### 回应

写出栈根和栈尖的链接。每一环一行裁决摘要。停放或排除的东西及其理由。

### 陷阱与注意

主人不合并、不武装 auto-merge、不关闭。未验证的不进栈。

陈述计划不是开工。停止是立刻的零写入。

只有根改拓扑。主人只推自己的分支。链不经 `gt` 登记。只有根 PR 指向主干。

变基使上面的 SHA 和旧裁决失效。patch-id 没变也要重跑可合并性和 CI。不再有效的回到第 4 步。

会签与 Autopilot-full 相同。吸收已落地的值不是新的钉住。

交付之后由操作者落地。本剧本不落地。

### 流程图

```flow 自动驾驶交付栈
start 开始
step 主人循环照旧 | 主人不得合并
step 在唤醒链上审计 | 大约三十分钟一拍
step 守住操作者的门 | 陈述计划不是开工
step 每轮验证后才入栈 | 未验证的不进入
step 干净裁决只追加 | 不武装自动合并
step 只有根能改拓扑 | 工作者只推自己的
step 在根上吸收漂移 | 改写之后重新验证
step 交付一条线性栈 | 操作者审查并落地
end 结束
```

### 分步产出

1. 每个 PR 一名主人。就绪 PR 在自证之前打开。`decisions.tsv` 与 `children.tsv` 不提交。forge 选定一次。
2. 大约每 30 分钟的审计拍。卡住的分路已被替换。拍的结束方式与 Autopilot-full 第 6 步相同。
3. 开工后的 `/goal`，或陈述之后的等待。停止时的零写入。
4. 代码就绪的头 SHA，以及变绿后的 STACK-READY。根按 Autopilot-full 第 4 步做出的裁决。
5. 追加到一条线性基分支栈上的 PR。没有合并，没有 auto-merge，没有关闭。
6. 根写下的父尖端、`--force-with-lease` 推送和 PR 基。根 PR 指向主干。没有 `gt` 登记。
7. 自下而上吸收主干之后的链。冲突由拥有那一片的主人修。失效的裁决回到第 4 步。可合并性和 CI 在改写后重跑。
8. 一条可自下而上审查的链。每一环的验证者裁决在正文或评论里。操作者负责审查和落地。

### 示例

> **示例（本书作者所写，原文中没有）**
>
> 你说：stack them, don't ship。这三项有顺序，我来落地。
>
> 代理选定 Autopilot-stack。你明确开工后，它武装 `/goal`。三名主人并行构建彼此的改动，大约 15 分钟内打开就绪 PR，并做到 STACK-READY。根按 Autopilot-full 的第 4 步验证。干净裁决只把 PR 追加成一条链。根把子分支变基到父的尖端，`ls-remote` 之后 `--force-with-lease`，再把基设为父分支。没有主人合并。代理交出栈根和栈尖的链接，以及每一环的一行裁决。你用自己的点击落地。

### 失败、中止与含糊时

要求陈述计划时不开工。没有明确的开工，不武装 `/goal` 去执行。

STACK-READY 之前，或根的验证不干净时，PR 不进入栈。

主人执行合并、auto-merge 或关闭，都越出本剧本。

变基写出冲突时，由拥有那些文件的主人修自己的一片，根再推。旧 SHA 的裁决失效。patch-id 规则通不过的，交付前回到第 4 步。

新的钉住停下等会签。已落地数值的漂移直接吸收，不当成提高。

操作者停止时，每个主人立刻零写入。

### 调用的技能与脚本

- [Autopilot-full](#playbook-autopilot-full)：主人循环、`children.tsv`、第 4 步的验证、第 6 步的探活和结束拍、会签规则。本剧本用 STACK-READY 代替 merge-ready，并且主人不合并。
- [show-me-your-work](personal.md#skill-show-me-your-work)：`decisions.tsv`。
- `references/bugbot-triage.md`：见 [Bugbot 分类](playbooks-pr.md#ref-bugbot-triage)。
- `/deslop`：属于 `cursor-team-kit`。`/no-comments`。
- [Babysit](playbooks-pr.md#playbook-babysit)：主人做到绿色。
- [Opening a PR](playbooks-pr.md#playbook-opening-a-pr)：创建和改指向的命令与那里一致。主人的简报是那里的看守请求。
- [Shipping](playbooks-pr.md#playbook-shipping)：patch-id 规则。改写后的推送还要重跑可合并性和 CI。
- `/loop` 或 cloud-sleeper：大约 30 分钟一拍。
- `git push --force-with-lease`：根在 `ls-remote` 之后用于子分支。不经 `gt` 登记整条链。
- `gh` 或 `origin pr`：不要求 `gt`。
