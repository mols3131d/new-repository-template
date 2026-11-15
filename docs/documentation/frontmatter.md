---
description: "Read when adding Markdown frontmatter, defining description metadata, or checking asset exceptions."
---

# Markdown Frontmatter

Ordinary project Markdown uses **YAML `description` metadata** to help readers and agents select the right document before opening its body. This metadata is not an instruction, permission grant or implementation claim.

## Scope

| Surface | Contract |
| --- | --- |
| Ordinary `docs/**/*.md`, including directory `README.md` | Required; all nested documents are checked by `docs:index:check` |
| Root [`README.md`](../../README.md) and [`scripts/README.md`](../../scripts/README.md) | Required; each describes the repository or directory it represents |
| [GitHub template documentation](../../.github/templates/README.md) | Required; describes the collection of authoring templates |
| `AGENTS.md`, `CHATBOT.md`, `SKILL.md`, GitHub Issue/PR/comment/review templates and other agent assets | Keep the native metadata and syntax; do not impose ordinary documentation frontmatter |

When adding another maintained Markdown document outside `docs/`, add it to the explicit standalone validation command. Do not apply metadata solely because a filename ends with `.md`.

## Fields

Place YAML frontmatter at the top, before the heading:

```yaml
---
description: "Read when deciding which document owns a project requirement."
---
```

- **`description` is required:** One concise, nonempty string stating **when to select** the document, with domain terms that distinguish it from siblings. Do not reproduce the title or table of contents.
- **`title` is optional:** Add only when a real consumer needs it. Extra metadata fields need a defined owner and use.
- **README scope:** A README's description identifies the directory, bundle or repository—not the file. [README authoring](readme-authoring.md) owns entrypoint design.
- **Authority:** Frontmatter improves search and routing; it neither activates instructions nor replaces the document's evidence, facts or decisions.

The Markdown file is the metadata owner. Generated indexes are projections, not alternative sources of descriptions. Front Matter CMS is not a dependency of this template.

## Verification

Use `npm run docs:index:check` for all ordinary documents under `docs/` and the generated index. Use `npm run docs:frontmatter:check` for the maintained documentation entrypoints outside `docs/`. Both checks require valid YAML and a nonempty string description, and neither writes files.

Follow [Document indexing](indexing.md) for commands, index depth, drift checks and CI integration. Revisit the description when its document's purpose or ownership changes.
