---
description: "Read when inspecting Git state or recovering staged, unstaged, conflicted or missing work."
---

# Recovery

Identify the state and the owner of the changes before attempting a repair. Work in the index, working tree, untracked files and committed history requires different recovery steps.

1. Inspect `git status --short`, `git diff` and `git diff --cached` to determine what exists and where.
2. If only staging was unintended, `git restore --staged <path>` unstages without deleting the working-tree content.
3. For lost commit references, inspect `git reflog` before deciding whether any history operation is appropriate. Reflog retention is not a backup guarantee.
4. For a merge or rebase in progress, inspect its conflict state before continuing or aborting it.

Commands such as `git restore <path>`, `git reset --hard`, `git clean -fd` or force-push can discard or replace work. Do not run them without verifying their exact scope, effects and authorization. Do not overwrite another contributor's changes while recovering your own.
