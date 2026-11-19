---
description: "Use when generating and validating documentation indexes or diagnosing CI drift repair."
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

The [CI workflow](../../.github/workflows/docs-index.yml) checks metadata, generator tests and index drift on relevant PRs and `main` pushes. Script type checking remains in [repository checks](../../.github/workflows/repo-checks.yml). When a same-repository PR has a stale index, the read-only validation job regenerates and verifies the output, then passes **only** `docs/INDEX.tsv` as an artifact to a separate commit job. That job does not execute PR code: it commits the index to the PR branch and dispatches both CI workflows against the updated ref. Invalid source metadata or unsuccessful regeneration fails validation without a write.

Fork PRs, `main` pushes and manual runs validate without automatic commits. Only the commit job has `contents: write` and `actions: write`; a non-force push rejects newer PR changes. If repository policy prevents the bot from pushing, regenerate and commit locally. Explicit dispatch is needed because `GITHUB_TOKEN` pushes do not trigger normal CI runs.
