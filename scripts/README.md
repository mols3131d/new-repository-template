---
description: "Find project-owned scripts, documentation indexing and guidance for adding custom automation."
---

# Scripts

This directory contains project-owned executable helpers only when a native CLI or short [mise task](../mise.toml) is insufficient.

| Need | Read or run |
| --- | --- |
| Run the shared Rulesync `agents-*` tasks from `mise` | [Agent asset manager](manage-agent-assets.ts); `node scripts/manage-agent-assets.ts --help` |
| Verify the agent asset manager CLI behavior | [Agent asset tests](../tests/scripts/manage-agent-assets.test.ts); `node --test tests/scripts/manage-agent-assets.test.ts` |
| Generate or check the documentation index | [Index generator](generate-docs-index.ts); `npm run docs:index` or `npm run docs:index:check` |
| Understand the index format, input metadata and options | [Document indexing](../docs/documentation/indexing.md) |
| Modify a script or introduce new automation | [Script maintenance](../docs/development/scripts.md) |
| Verify the index generator's behavior | [Generator tests](../tests/scripts/generate-docs-index.test.ts); `npm run test:docs` |

[manage-agent-assets.ts](manage-agent-assets.ts) uses only Node built-ins (`mise` provides Node) so `mise run setup` and `agents-*` work before `npm ci`. The TypeScript documentation index generator is an optional template example ([adapt or retire it for the new project](../docs/guides/project-setup.md)).
