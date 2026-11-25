---
description: "Choose GitHub issue, pull request, comment and review authoring templates and attribution guidance."
---

# GitHub Agent Authoring Templates

GitHub recognizes [Issue Forms](../ISSUE_TEMPLATE/) and the [Markdown Issue template](../ISSUE_TEMPLATE/issue.md) in its web UI, plus the [PR template](../pull_request_template.md). The comment/review templates here are **authoring aids**. API/Plugin authors must explicitly load and apply templates; Issue Form validation does not apply to API-created Issues.

## Agent attribution

When an agent substantially writes or rewrites final Issue, review, or comment text, record its identity in a final fenced YAML block. PR descriptions do not use a YAML attribution block in this repository; follow the native PR template:

```yaml
author:
  - <user>:<provider>:<product>[/<mode>]:<model>
```

- `user` is the explicitly selected GitHub user; `provider` is the model provider; `product` is the application or product used to author the text (e.g. `chatgpt` or `codex`); `model` is the verified model identifier.
- Append `/mode` to the product only for materially different execution environments, such as `chatgpt/chat` and `chatgpt/work`. Do **not** record reasoning effort (`instant`, `medium`, `high`, etc.) as a mode.
- Attribute the final text, **not every model or alias encountered during a session**. If a model changed or cannot be identified reliably, use `unknown` for `model` rather than reconstructing session history. List separate entries only for independently identified co-authors.
- Use `unknown` for other unverified components too. Do not infer identities from the authenticated GitHub actor or from the provider under development.
- Omit attribution for wholly human-authored text or unchanged human text merely posted by a tool. GitHub's own author, review, and approval records remain authoritative; this block is descriptive provenance only.
- Native Issue Forms render the optional **Agent author** field as labeled YAML code. For Markdown/API Issues, reviews, and comments, append the block only when applicable. Do not add attribution YAML to PR descriptions; the [native PR template](../pull_request_template.md) owns their authoring structure.

## Select a template

| GitHub surface | Source |
| --- | --- |
| Issue (specific report or proposal, web UI) | [Native Issue forms](../ISSUE_TEMPLATE/) |
| Issue (general request or API/Plugin) | [General Issue template](../ISSUE_TEMPLATE/issue.md) |
| Pull request | [Native PR template](../pull_request_template.md) |
| Issue or PR conversation comment | [Conversation comment](comment.md) |
| PR review | [Review](pull-request-review.md) |
| PR inline review comment | [Inline review](pull-request-inline-comment.md) |

Comment/review authoring aids use illustrative `{{ value }}`, `{% if ... %}`, and `{% for ... %}` notation, not an installed template engine. Markdown templates use visible italic parenthetical writing guidance. Follow the relevant guidance, then remove it along with unused sections, examples, placeholders, and authoring notation before posting. Do not duplicate GitHub-native statuses or review decisions.
