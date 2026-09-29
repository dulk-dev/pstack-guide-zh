# 原文（Source）

本书只以这一份英文原文为准。不把 pstack 的移植、其他版本或安装副本当作原文。韩文解说只提供章节布局、体例和构建工具，不提供措辞。韩文与本固定提交不一致时，以本提交为准。

| 项目 | 值 |
| --- | --- |
| 仓库 | https://github.com/cursor/plugins |
| 目录 | `pstack/` |
| 提交（完整 SHA） | `adf3218ca2f5b9971eedc07a76bef22df7701539` |
| 插件版本 | 0.15.5（`pstack/.cursor-plugin/plugin.json`）。本书版本是该版本加上修订号，形如 `0.15.5-zh.N`（见 `tools/lib/manuscript.mjs`） |
| 默认分支 | `main` |
| 核对日期 | 2026-09-29 |
| 版权 | MIT，Copyright (c) 2026 Lauren Tan（`pstack/LICENSE`） |

范围是 `pstack/` 下的全部内容：`skills/`（47 个）、`agents/`、`automations/`、`docs/`、`README.md`、`.cursor-plugin/plugin.json`、`LICENSE`。同一上游仓库里的独立插件 `cursor-team-kit`（`deslop`、`fix-ci` 等）不单独成章。pstack 文件调用它时，用一两句话标明它属于 `cursor-team-kit`。

结构参考（不是原文）：https://github.com/jayjongcheolpark/pstack-guide-ko

## 阅读方式

原文克隆在本书仓库之外，只读核对。不把整份 `cursor/plugins` 复制进本书仓库，也不做成子模块。

```shell
git clone https://github.com/cursor/plugins.git <仓库之外的临时路径>/cursor-plugins
cd <仓库之外的临时路径>/cursor-plugins
git checkout adf3218ca2f5b9971eedc07a76bef22df7701539
chmod -R a-w .
```

## 原文链接格式

每个技能节标题下的“原文”一行，是固定在该提交上的 GitHub permalink。稿件里写 `{{src:skills/<name>/SKILL.md}}`，构建时换成：

```text
https://github.com/cursor/plugins/blob/adf3218ca2f5b9971eedc07a76bef22df7701539/pstack/skills/<name>/SKILL.md
```

文中提到的其他文件（`references/`、`playbooks/`、`scripts/`、`agents/`、`docs/`、`automations/`）使用同一提交的 permalink。
