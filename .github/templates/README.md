# GitHub Agent Authoring Templates

GitHub recognizes [Issue Forms](../ISSUE_TEMPLATE/) and the [Markdown Issue template](../ISSUE_TEMPLATE/issue.md) in its web UI, plus the [PR template](../pull_request_template.md). The comment/review templates here are **authoring aids**. API/Plugin authors must explicitly load and apply templates; Issue Form validation does not apply to API-created Issues.

## Agent attribution

When an agent substantially writes or rewrites the final Issue, PR, review, or comment text, record its identity in a final fenced YAML block:

```yaml
author:
  - <user>:<provider>:<product>[/<mode>]:<model>
```

- `user` is the explicitly selected GitHub user; `provider` is the model provider; `product` is the application or product used to author the text (e.g. `chatgpt` or `codex`); `model` is the verified model identifier.
- Append `/mode` to the product only for materially different execution environments, such as `chatgpt/chat` and `chatgpt/work`. Do **not** record reasoning effort (`instant`, `medium`, `high`, etc.) as a mode.
- Attribute the final text, **not every model or alias encountered during a session**. If a model changed or cannot be identified reliably, use `unknown` for `model` rather than reconstructing session history. List separate entries only for independently identified co-authors.
- Use `unknown` for other unverified components too. Do not infer identities from the authenticated GitHub actor or from the provider under development.
- Omit attribution for wholly human-authored text or unchanged human text merely posted by a tool. GitHub's own author, review, and approval records remain authoritative; this block is descriptive provenance only.
- Native Issue Forms render the optional **Agent author** field as labeled YAML code. For Markdown Issues and API/Plugin-created Issues, append the fenced author block as the last content; do the same for PRs, reviews, and comments.

Example, when the author identity is verified:

```yaml
author:
  - example-user:openai:chatgpt/chat:verified-model
```

If the model cannot be confirmed, use `example-user:openai:chatgpt/work:unknown` only when the user, provider, product, and mode are known.

## Select a template

| GitHub surface | Source |
| --- | --- |
| Issue (specific report or proposal, web UI) | [Native Issue forms](../ISSUE_TEMPLATE/) |
| Issue (general request or API/Plugin) | [General Issue template](../ISSUE_TEMPLATE/issue.md) |
| Pull request | [Native PR template](../pull_request_template.md) |
| Issue or PR conversation comment | [Conversation comment](comment.md) |
| PR review | [Review](pull-request-review.md) |
| PR inline review comment | [Inline review](pull-request-inline-comment.md) |

Comment/review authoring aids use illustrative `{{ value }}`, `{% if ... %}`, and `{% for ... %}` notation, not an installed template engine. For the Markdown Issue template, follow its HTML comments. In either case, omit unused sections and authoring directives before posting; do not duplicate GitHub-native statuses or review decisions.
