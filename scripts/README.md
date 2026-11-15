---
description: "Find project-owned scripts, documentation indexing and guidance for adding custom automation."
---

# Scripts

This directory contains project-owned executable helpers only when a native CLI or short [mise task](../mise.toml) is insufficient.

| Need | Read or run |
| --- | --- |
| Generate or check the documentation index | [Index generator](generate-docs-index.ts); `npm run docs:index` or `npm run docs:index:check` |
| Understand the index format, input metadata and options | [Document indexing](../docs/documentation/indexing.md) |
| Modify a script or introduce new automation | [Script maintenance](../docs/development/scripts.md) |
| Verify the index generator's behavior | [Generator tests](../tests/generate-docs-index.test.ts); `npm run test:docs` |

The TypeScript index generator is a working template example, not a required scripting language. [Adapt or replace it for the new project](../docs/guides/project-setup.md).
