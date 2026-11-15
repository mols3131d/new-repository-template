---
description: "Choose Git guidance for commits, branches, integration, recovery or local template setup."
---

# Git

Read only the guide for the current task:

| Task | Guide |
| --- | --- |
| Commit boundaries, staging, messages and checkpoints | [Commits](commits.md) |
| Branch creation, naming and lifecycle | [Branches](branches.md) |
| Merge, rebase and conflicts | [Integration](integration.md) |
| Inspect and recover local work | [Recovery](recovery.md) |

## Local commit template

`mise run setup` enables [`.gitmessage`](../../../.gitmessage) for this clone. To configure Git independently, run `git config --local commit.template .gitmessage` from the repository root. Verify with `git config --local --get commit.template`.

The setting is clone-local; the template guides editor-based commits but does not validate messages or appear with `git commit -m`.

GitHub Issue/PR authoring has a separate [template owner](../../../.github/templates/README.md).
