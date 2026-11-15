---
description: "Read when configuring repository-local Git settings and the commit message template."
---

# Git

The [`.gitmessage`](../../.gitmessage) file provides commit message guidance; it does not enforce commit validation.

`mise run setup` enables it in the current clone after Agent Skill setup. Git stores `commit.template` in the local repository configuration, not in tracked project files. Each clone needs its own setup.

To enable the template independently, run from the repository root:

```sh
git config --local commit.template .gitmessage
```

Check the setting with `git config --local --get commit.template`. This does not modify global Git configuration.
