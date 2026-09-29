# NOTICE

This repository is an unofficial Simplified Chinese explanation of pstack, written with AI assistance. It may contain errors. The English original is authoritative.

The original author, Lauren Tan (X: @poteto), gave permission on 2026-09-28 to distribute the Korean guide for free ([reply on X](https://x.com/poteto/status/2104671461827055941), in answer to [the request](https://x.com/jayparkcanada/status/2104664228561141848)). That permission is cited here as the author's stated willingness to allow a free unofficial guide. The author has not reviewed this Chinese explanation, and neither the author nor Cursor endorses or guarantees it. This note is in addition to the MIT license terms below, which are unchanged.

## Original work

- **pstack** by Lauren Tan, Copyright (c) 2026 Lauren Tan, MIT License.
- Source: https://github.com/cursor/plugins/tree/main/pstack
- Based on pstack 0.15.5. The book version is the pstack version plus the book revision suffix (`-zh.N`). Pinned commit: `adf3218ca2f5b9971eedc07a76bef22df7701539`.
- The MIT notice of the original is quoted in `LICENSE` (with added copyright lines for this explanation and for the adapted build tooling) and in the attribution appendix (`manuscript/94-app-attribution.md`).

## Structural reference

- The chapter plan, example/commentary labels, NOTICE/SOURCE pattern, and Bun EPUB+PDF tooling follow the unofficial Korean guide by Jay Park, Copyright (c) 2026 Jay Park, MIT License: https://github.com/jayjongcheolpark/pstack-guide-ko
- Korean wording is not the source of truth. Where the Korean guide and the pinned English commit differ, this book follows the English commit.
- This text is a new Simplified Chinese explanation, not a translation of the Korean prose.

## What comes from pstack

- Short quotations, code examples, tables, and prompt examples taken from pstack's skills, playbooks, agents, automations, and documentation. Each skill section cites its source file with a permalink at the pinned commit.
- The six illustrations in `manuscript/images/` come from pstack's `docs/guide/images/` and are resized to 1000 pixels wide.

## What is new here

- The Simplified Chinese text and the adaptations of the build tooling for Chinese typography are Copyright (c) 2026 Chaochun, MIT License.
- The build pipeline itself is adapted from Jay Park's MIT-licensed tooling.

## Not included

- `cursor-team-kit` is a separate plugin in the same upstream repository. Its skills are mentioned where a pstack file calls them, and are not reproduced.
- Cursor, Slack, Linear, Notion, Datadog, Sentry, Databricks, Tailscale, and GitHub are trademarks of their owners and are named only to identify those tools.

## Fonts used in the PDF

Noto Serif SC, Noto Sans SC, and JetBrains Mono, installed as npm packages (`@fontsource/*`) and licensed under the SIL Open Font License. The EPUB embeds no fonts.
