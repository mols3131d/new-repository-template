# Inbox Lifecycle

Work-unit records support ongoing work; they do not define project policy or serve as a complete task tracker.

1. **Active:** Investigate, review, revise and hand off records as needed. Keep unresolved work visible. Move durable decisions and verified knowledge to their canonical source, code, specification or project documentation.
2. **Confirm completion:** Check actual remaining tasks and blockers. A PR being merged or closed, or a finding being copied into canonical documentation, does not by itself finish the work. Continue to maintain records while work remains.
3. **Protect:** Consider cleanup only after work is complete **and** at least seven days have passed since the record's creation or last substantive update. Renaming, moving or merging does not restart the protection period. If timing or completion is uncertain, keep the record.
4. **Dispose deliberately:** Prefer deletion when canonical files, code, PRs, tests or Git history provide enough evidence to reconstruct what matters. Archive only when the original record itself is needed for an active canonical reference, reproduction or audit and would be materially difficult to recover otherwise.

If archiving is justified, use `.inbox/archive/YYYY-MM-DD/` (archive date) and retain enough work-unit identity to avoid collisions. Do not archive unfinished work as completed or automatically delete records based on age alone.

No registry, status file or scheduled cleanup is required. Any deletion or archive move must respect the repository's change and authorization rules.
