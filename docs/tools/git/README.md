---
description: "Use when choosing Git guidance for commit messages, branches, integration or recovering local work."
---

# Git

This bundle covers Git practices for a repository created from the template. Follow only the topic relevant to the task; adapt conventions to the derived project.

| Task | Guidance |
| --- | --- |
| Compose and review commits | [Commits](commits.md) |
| Create and manage work branches | [Branches](branches.md) |
| Merge or rebase changes and resolve conflicts | [Integration](integration.md) |
| Inspect and recover local work safely | [Recovery](recovery.md) |

## Local commit template

The [`.gitmessage`](../../../.gitmessage) file is the source for commit message formatting. It guides interactive commits; it does not validate messages, and `git commit -m` does not open it.

`mise run setup` runs [Agent Skill setup](../initial-setup.md) and then enables the template for the current clone. To configure Git without installing Skills, run from the repository root:

```sh
git config --local commit.template .gitmessage
```

Verify with `git config --local --get commit.template`. This setting belongs to the current clone's local Git configuration, not tracked project files or the global Git config.

Git is not installed through this template's mise tool list. GitHub Issue and PR authoring templates have a separate [owner](../../../.github/templates/README.md).
