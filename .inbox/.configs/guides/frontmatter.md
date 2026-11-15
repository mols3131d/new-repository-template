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
| `status` | The document's review state, not the work unit's progress; see [Lifecycle](lifecycle.md) |
| `tags` | Topic labels, placed **last** in the frontmatter |

Tags are a list of strings. Both plain labels and colon-separated paths are valid, such as `security`, `domain:domain_name` and `domain:identity:tokens`. Quote structured tags, do not use empty path segments, and do not assume a parent tag is present unless explicitly listed. No fixed taxonomy is required.

```yaml
---
description: "Read when comparing authentication options."
title: "Authentication research"
status: in-review
tags:
  - "domain:identity:tokens"
  - "security"
---
```

Omit optional fields rather than emitting empty values. If present, `tags` is the **last metadata key**; `status` has only the values defined in the lifecycle guide. Replace all template placeholders and remove authoring comments before publishing the record.
