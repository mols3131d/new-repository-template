---
description: "Read when creating, naming, switching, updating or retiring Git branches."
---

# Branches

Choose the intended repository and base ref before starting. Work proposed for the default branch belongs on a dedicated topic branch; do not modify a protected/shared base directly.

- Inspect `git status --short` and current branch before switching. Preserve unrelated work; do not discard changes to make a switch succeed.
- Use a descriptive topic name, such as `docs/git-guidance` or `fix/index-validation`. Treat these as examples, not an enforced naming scheme.
- Keep one branch focused on a related goal. A branch may contain multiple reviewable [commits](commits.md); unrelated tasks should not be bundled.
- Confirm the remote and intended base before fetching, publishing or updating a branch. Do not infer permission to change another contributor's branch.
- Remove a branch only after confirming its useful commits are integrated or preserved and no pending work depends on it.

For merging and history updates, use [Integration](integration.md). GitHub PR metadata and review templates have a separate [owner](../../../.github/templates/README.md).
