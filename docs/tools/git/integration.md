---
description: "Read when integrating Git branches, choosing merge versus rebase or resolving conflicts."
---

# Integration

Merge and rebase are alternatives, not mandatory defaults. Choose according to the project's history policy and whether the branch is already shared. Verify the actual base, branch and working-tree state before integration.

- **Merge** retains branch ancestry; **rebase** replays commits and changes their identities. Do not rebase shared commits without explicit coordination.
- Inspect each conflict and resolve it against the intended behavior, not by blindly choosing `ours` or `theirs`.
- After resolution, inspect the combined diff and run the relevant checks before considering the integration complete.
- Avoid force-pushing as a default. A coordinated history rewrite, if permitted, needs an explicit target and safeguards such as `--force-with-lease`.
- Do not infer merge authorization from passing checks or a clean local merge.

Consult [Recovery](recovery.md) before using destructive reset or cleanup commands. GitHub reviews, checks and merge permission remain governed by the repository's actual collaboration settings.
