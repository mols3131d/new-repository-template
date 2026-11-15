---
description: "Use when creating README entrypoints and writing directory-scoped frontmatter metadata."
---

# README Authoring

A `README.md` is an **entrypoint to a repository, directory or document bundle**. Add it when readers need help understanding the scope, first action or next document—not merely because a directory exists.

## Responsibility

- Repository README: project purpose, first-use path and important navigation.
- Directory README: its area, prerequisites, meaningful choices and next actions.
- Detailed requirements, procedures and policies: link to their [canonical owners](authoring.md); do not duplicate them.
- Index: a short human-curated selector can clarify choices, while repeatable inventories belong to [Document indexing](indexing.md).

## Scope metadata

For directory READMEs that require [frontmatter](frontmatter.md), `description` identifies **when to visit the directory**, not what the README file explains. The repository root `README.md` does not require frontmatter.

The directory README alone owns directory metadata. Do not infer a missing description from sibling documents or a generated index. For example, a tools README should identify shared tooling, installation and version policy rather than repeat the heading "Tools."

## Review

Keep a useful reading order: scope and critical constraints, first action, then direct links to detailed owners. Check relative links, description specificity, and whether an additional README genuinely reduces navigation effort.
