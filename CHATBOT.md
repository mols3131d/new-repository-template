# Chatbot Compatibility Entrypoint

Use only if a chat runtime is explicitly configured to read this file. It connects to repository instruction and Skill sources; it does not redefine their behavior or grant permission.

1. Resolve the current repository, ref, target paths, and task. Read [AGENTS.md](AGENTS.md), any applicable scoped instructions, and task-relevant source/configuration.
2. Discover Skills natively when supported. Otherwise inspect [rulesync.jsonc](rulesync.jsonc), [agent-assets.md](docs/development/agent-assets.md), and the **actual installed or source-reachable** task-relevant Skill files (including required references/scripts). A configured source is not a loaded Skill.
3. Prefer supported native execution and delegation. When necessary capabilities are missing, use only authorized, meaning-preserving alternatives. Otherwise complete safe partial work, skip genuinely optional steps, or provide an explicit handoff. Sequential self-review is not an independent delegated review.
4. Report executed, adapted, skipped, blocked, and unverified steps accurately. Never claim an agent runtime or local CLI was used merely because its Skill is declared.

Chat runtime instruction/Skill auto-loading is not guaranteed by this file; configure a runtime-side first hop separately when required.
