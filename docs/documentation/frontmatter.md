---
description: "Read when adding document description frontmatter or generating and checking a documentation index."
---

# Frontmatter and Document Index

Use YAML frontmatter to identify ordinary project documents by purpose before a human or agent reads the body. The generated [`docs/INDEX.tsv`](../INDEX.tsv) is **selection metadata**, not an instruction source.

## Description metadata

Ordinary `docs/**/*.md` files, including directory `README.md` entrypoints, require a nonempty string `description`:

```yaml
---
description: "Read when identifying the document that owns a project requirement."
---
```

Describe **when to read** the document with terms that distinguish it from nearby candidates. For a directory `README.md`, describe the **directory's subject**. Do not copy the table of contents or the title. Keep requirements, evidence and decisions in their canonical body.

Agent Assets (`AGENTS.md`, `SKILL.md`), GitHub templates, generated files and documents outside `docs/` follow their own formats. Frontmatter is not an activation or authorization mechanism.

## Generate and check

One [TypeScript script](../../scripts/generate-docs-index.ts) reads YAML descriptions, creates sorted, escaped TSV rows (`path`, `description`), and fails on missing or invalid metadata. A directory row comes from its `README.md`; the root README is not listed.

The root index is **shallow by default**: direct files and immediate directory scopes only. Follow the chosen area README to find deeper documents rather than loading a recursive inventory.

```sh
npm ci --ignore-scripts
npm run docs:index
npm run docs:index:check
npm run test:docs
npm run typecheck:scripts
```

For a narrower area or a recursive index, use the same script:

```sh
node scripts/generate-docs-index.ts --root docs/tools --depth all
node scripts/generate-docs-index.ts --root docs/tools --depth all --check
```

`--root` chooses the directory containing the resulting `INDEX.tsv`; `--depth 1` (default) indexes direct files and immediate directory scopes; `--depth all` includes nested documents. `--check` detects missing or stale output **without writing**. Symlinks in the traversed scope are rejected. Do not hand-edit generated indexes.

The [read-only CI check](../../.github/workflows/docs-index.yml) runs generator tests, type checking and drift detection; it never commits or pushes generated output. Dependencies are locked in [`package-lock.json`](../../package-lock.json). This tooling does not require the derived project to use Node.js for its application.
