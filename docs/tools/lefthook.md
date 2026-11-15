---
description: "Read when configuring opt-in local Git hooks and their compatibility checks."
---

# Lefthook

[Lefthook](https://lefthook.dev/) runs optional local Git hook checks configured in [lefthook.yml](../../lefthook.yml). It currently checks staged Markdown and supported Biome file types without automatically formatting, staging or committing them.

`mise run check` validates the hook configuration; it does **not** install Git hooks. Before using `lefthook install`, inspect existing hooks and `git config --get core.hooksPath`, then explicitly authorize changes to that local setup.

## Version management — loose

Follow the [major-prefix policy](README.md#version-management). Run `lefthook validate` and check staged-file behavior on upgrades.
