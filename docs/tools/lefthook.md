# Lefthook

[Lefthook](https://lefthook.dev/) runs optional local Git hook checks configured in [lefthook.yml](../../lefthook.yml). It currently checks staged Markdown and supported Biome file types without automatically formatting, staging or committing them.

`mise run check` validates the hook configuration; it does **not** install Git hooks. Before using `lefthook install`, inspect existing hooks and `git config --get core.hooksPath`, then explicitly authorize changes to that local setup.

The hooks are a contributor convenience rather than a replacement for repository checks, PR review or eventual CI admission gates. Avoid adding hooks for a language or test tool that the project has not adopted.
