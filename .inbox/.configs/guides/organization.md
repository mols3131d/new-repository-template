---
description: "Use when locating Inbox work units or choosing numbered files versus README-led document bundles."
---

## Work-unit containers

Keep related records together. Reuse an existing work unit when it still matches the task; a branch becoming a PR does not alone require moving files.

| Work unit | Directory |
| --- | --- |
| GitHub Issue or Pull Request | `.inbox/github-<number>/` |
| Branch without an Issue/PR container | `.inbox/branch-<slug>/` |
| No stable identifier | `.inbox/YYYY-MM-DD/` |

The date is the container's creation date. `.configs/` holds reusable guides and templates, not work records.

## Standalone and bundled documents

A work unit may contain standalone Markdown files, document bundles, or both. Prefer a single file until separate documents improve navigation.

A **document bundle** is a numbered directory with `README.md` as its required entrypoint. The README briefly identifies the bundle and links to relevant child documents; do not repeat their content. Child Markdown files use meaningful names and have a required frontmatter `description`. Do not nest bundles inside bundles. A work-unit-level `README.md` is optional when several records need a shared entrypoint.

```text
.inbox/github-42/
├── README.md
├── 00-research-auth.md
├── 00-research-auth-sources.md
└── 01-review-auth/
    ├── README.md
    ├── findings.md
    └── evidence.md
```

Use the optional [bundle README scaffold](../templates/bundle-readme.md) only if it helps. The numbering contract applies to independent files and bundle directories at the work-unit level, not to children inside a bundle.

## File names

Use `<NN>[-<type>]-<slug>[-<extension>].md` for standalone files, or `<NN>[-<type>]-<slug>/` for bundles. Brackets indicate optional parts, not literal characters.

- `NN`: Required two-digit sequence starting at `00`; choose the next number after the highest existing independent record or bundle. Keep assigned numbers stable.
- `type`: Optional role, such as `research`, `plan`, `review`, `report`, `handoff` or `draft`; not a closed list.
- `slug`: Required short, distinct kebab-case topic without redundant container identifiers.
- `extension`: Optional focused expansion of a standalone document, such as `sources` or `evidence`. Keep the source's number, type and slug; do not encode dates, authors, status or versions.

`README.md` and `AGENTS.md` are exempt from numbering. Do not rename existing files merely for uniformity; inspect affected links when moving or bundling records.

Follow [Frontmatter](frontmatter.md) for metadata and H2-only work-document bodies.
