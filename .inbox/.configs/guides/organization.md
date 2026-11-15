# Inbox Organization

Group related records by the work unit they support. Prefer an existing container when it still matches the work; do not relocate notes solely because a branch becomes a PR.

| Work unit | Container |
| --- | --- |
| GitHub Issue or Pull Request | `.inbox/github-<number>/` |
| Branch without an Issue/PR container | `.inbox/branch-<slug>/` |
| Work without a stable identifier | `.inbox/YYYY-MM-DD/` |

For date-based containers, use the date the container was first created. Keep a work-unit container flat: related files share it without nested directories. `.configs/` holds reusable guidance and optional templates, not work records.

## File names

Use `<NN>[-<type>]-<slug>[-<extension>].md`. Brackets mark optional parts and are not literal filename characters.

- **`NN` (required):** Start at `00`; assign the next available sequential number to each independent document in the same container. Keep existing numbers stable after edits, moves or deletion.
- **`type` (optional):** Role such as `research`, `plan`, `review`, `report`, `handoff` or `draft`. The set is not closed.
- **`slug` (required):** Short, distinguishable kebab-case topic. Avoid repeating its container identifier.
- **`extension` (optional):** A focused expansion such as `sources`, `findings` or `evidence`. Keep the source document's number, type and slug. Do not use dates, statuses, authors or versions as suffixes.

For example:

```text
.inbox/github-42/
├── 00-research-auth.md
├── 00-research-auth-sources.md
└── 01-review-auth.md
```

A separate document gets a new number; an expansion inherits its parent's number. `README.md` and `AGENTS.md` are exempt from numbering. Do not mass-rename existing records merely to match the convention. Check links and references when relocating a file.
