---
description: "Use when selecting a README navigation list or generated INDEX.tsv, or checking documentation index drift."
---

# Document Indexing

Use the smallest navigation surface that leads readers to a **canonical document**. [Markdown frontmatter](frontmatter.md) owns selection metadata; the index only projects its `description`.

| Starting point | Use |
| --- | --- |
| The document owner is known | Direct link |
| A reader must choose among related documents | Concise selector within the directory `README.md` |
| Broad discovery needs a repeatable machine-readable list | Generated `INDEX.tsv` |

Use README text for human selection criteria; `INDEX.tsv` provides the generated `path` and `description` inventory.

## Generate and validate

The [single script](../../scripts/generate-docs-index.ts) parses YAML, escapes TSV cells, and sorts paths deterministically. Directory rows come only from their `README.md`. Root [`docs/INDEX.tsv`](../INDEX.tsv) is shallow: it lists direct documents and immediate directory scopes, not all descendants.

```sh
npm ci --ignore-scripts
npm run docs:index
npm run docs:index:check
npm run docs:frontmatter:check
npm run test:docs
npm run typecheck:scripts
```

The same script supports an explicit root and depth for a directory that benefits from its own index:

```sh
node scripts/generate-docs-index.ts --root docs/tools --depth all
node scripts/generate-docs-index.ts --root docs/tools --depth all --check
```

`--root` selects the index directory; `--depth 1` (default) lists direct files and immediate scopes; `--depth all` includes descendants. `--check` is read-only and validates nested frontmatter and the root README when present, even if the output is shallow. Missing descriptions, invalid YAML and traversed symlinks fail.

The same script's standalone `--validate FILE...` mode checks named documents without generating an index. The maintained out-of-scope file list is `docs:frontmatter:check` in [`package.json`](../../package.json); update it when adding such a document.

The [CI workflow](../../.github/workflows/docs-index.yml) checks metadata, tests, types and index drift without modifying generated output.
