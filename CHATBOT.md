# Chatbot Compatibility Entrypoint

Use this file **only when the chat runtime is explicitly directed here** or otherwise loads it. It is a bridge to canonical project guidance, not a second policy owner.

1. Identify the actual repository, ref, task, and target paths. Read the corresponding [AGENTS.md](AGENTS.md) and any applicable scoped instructions.
2. Follow the relevant project [README](README.md), [development reference](docs/development/README.md), and source files. If task-relevant Skills, Rules, or agents are declared and accessible, select their authoritative sources rather than guessing from names or indexes.
3. Prefer native runtime capabilities. If an essential command, tool, or delegation capability is unavailable, use an authorized alternative only when it preserves the required behavior and verification. Otherwise complete the safe portion, omit only genuinely optional work, or hand off the blocked step. A sequential review is not an independent delegated review.
4. Distinguish observed work from simulated, partial, skipped, or unverified steps in the user-visible result. Never claim an inaccessible tool, test, or independent agent was executed.

The runtime must be configured separately if it cannot discover these instructions. This file does not grant new permissions or replace project rules, tools, or external service policies.
