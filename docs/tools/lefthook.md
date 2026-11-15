---
description: "Read when configuring opt-in local Git hooks and their compatibility checks."
---

# Lefthook

[Lefthook](https://lefthook.dev/) runs optional local Git hooks configured in [lefthook.yml](../../lefthook.yml). Staged Markdown outside `.inbox/` and supported Biome file types are checked without rewriting files. For staged `.inbox/` Markdown, the pre-commit hook runs `rumdl fmt` followed by `rumdl check`, then automatically stages the formatted files. This does not run in CI or for GitHub API commits.

Auto-staging can include unstaged edits in a partially staged Inbox file. Review the staged diff before committing.

`mise run check` validates the hook configuration; it does **not** install Git hooks. Before using `lefthook install`, inspect existing hooks and `git config --get core.hooksPath`, then explicitly authorize changes to that local setup.

## Version management — loose

Follow the [major-prefix policy](README.md#version-management). Run `lefthook validate` and check staged-file behavior on upgrades.
