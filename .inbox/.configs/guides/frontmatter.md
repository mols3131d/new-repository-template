---
description: "Use when assigning Inbox document metadata, review status or hierarchical tags."
---

## Field contract

For Inbox working documents and files in `.configs/guides/` or `.configs/templates/`, YAML frontmatter requires only a nonempty string `description`. The description states when to open the document and what it covers. `title`, `status` and `tags` are optional.

`README.md` is a directory or bundle entrypoint: its frontmatter is optional, and it should briefly identify its scope and route to relevant documents. `AGENTS.md` follows agent instruction conventions instead of this record schema. Work-document bodies start at H2; do not add H1.

## Optional metadata

| Field | Meaning |
| --- | --- |
| `title` | Human-readable title when the path is insufficient |
| `status` | Optional use state of an Inbox work record, not review approval or task progress; see [Lifecycle](lifecycle.md) |
| `tags` | Topic labels, placed **last** in the frontmatter |

Tags are a list of strings. Both plain labels and colon-separated paths are valid, such as `security`, `domain:domain_name` and `domain:identity:tokens`. Quote structured tags, do not use empty path segments, and do not assume a parent tag is present unless explicitly listed. No fixed taxonomy is required.

```yaml
---
description: "Read when comparing authentication options."
title: "Authentication research"
status: active
tags:
  - "domain:identity:tokens"
  - "security"
---
```

Omit optional fields rather than emitting empty values. If present, `tags` is the **last metadata key**; use `status` only for working records when actively tracking their lifecycle, with values defined in the lifecycle guide. Do not assign work-record status to guides or reusable templates. Replace placeholders and remove authoring comments in finished records.
