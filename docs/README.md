# Documentation

Start here when deciding **where project knowledge belongs**. This template contains real setup documentation, but no application architecture, published API, user workflow or deployment system yet.

| Area | When to use it |
| --- | --- |
| [Development](development/README.md) | Contributor workflows, local environments, tools, testing and development-time checks |
| [Guides](guides/README.md) | Task-based instructions for people **using** the resulting project |
| [Architecture](architecture/README.md) | System boundaries, design rationale, data flows and consequential technical decisions |
| [Operations](operations/README.md) | Deployment, running services, monitoring, incident response and recovery procedures |
| [Reference](reference/README.md) | Stable API, CLI, configuration, schema and other lookup-oriented contracts |

## Add documentation where it is owned

- Choose the reader's question first, then the narrowest applicable area. A feature may have separate guides, design rationale and contract reference **only if** those distinct documents are needed.
- Do not duplicate executable configuration or source contracts in prose: link to their actual owner (for example, [mise.toml](../mise.toml) and [rulesync.jsonc](../rulesync.jsonc)). Keep a single maintained explanation for each decision or procedure.
- Add a topic folder or nested entrypoint when real material needs a separate owner or navigation; avoid one folder per file, empty taxonomies, generated inventories and speculative templates.
- Treat current behavior, proposals and planned work differently. Write instructions for an actual project only after the corresponding implementation or operating practice exists.

The repository [README](../README.md) is the initial setup entrypoint and [AGENTS.md](../AGENTS.md) owns the baseline agent instructions. This documentation map routes human-maintained project knowledge; it does not override those sources or upstream Agent Skills.
