---
description: "Read when adding Markdown frontmatter, defining description metadata, or checking asset exceptions."
---

# Markdown Frontmatter

Ordinary documentation uses YAML `description` metadata to support document selection before opening the body.

## Scope

| Surface | Contract |
| --- | --- |
| Ordinary `docs/**/*.md`, including directory `README.md` | Required; all nested documents are checked by `docs:index:check` |
| Repository root [`README.md`](../../README.md) | No frontmatter required |
| [`scripts/README.md`](../../scripts/README.md) | Required; describes the scripts directory |
| [GitHub template documentation](../../.github/templates/README.md) | Required; describes the collection of authoring templates |
| Runtime-owned agent assets and GitHub issue/PR templates | Follow their own metadata contracts |

When another document outside `docs/` uses this metadata contract, add it to the standalone validation command. File extension alone does not define the contract.

## Fields

Place YAML frontmatter at the top, before the heading:

```yaml
---
description: "Read when deciding which document owns a project requirement."
---
```

- **`description` is required:** One concise, nonempty string stating **when to select** the document, with domain terms that distinguish it from siblings. Do not reproduce the title or table of contents.
- **`title` is optional:** Add only when a real consumer needs it. Extra metadata fields need a defined owner and use.
- **README scope:** A directory README's description identifies its directory or document bundle—not the filename. [README authoring](readme-authoring.md) owns entrypoint design.

Generated indexes are derived from document frontmatter; edit the document, not the index.

## Verification

Use `npm run docs:index:check` for all ordinary documents under `docs/` and the generated index. Use `npm run docs:frontmatter:check` for the maintained documentation entrypoints outside `docs/`. Both checks require valid YAML and a nonempty string description, and neither writes files.

Follow [Document indexing](indexing.md) for commands, index depth, drift checks and CI integration. Revisit the description when its document's purpose or ownership changes.
