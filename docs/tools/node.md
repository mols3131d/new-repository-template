---
description: "Read when managing the Node.js runtime used by npm-distributed development tools."
---

# Node.js

[Node.js](https://nodejs.org/) runs npm-distributed CLI tools in this starter, including Biome and Rulesync. It does **not** establish Node.js as the derived application's runtime. The requested version lives in [`mise.toml`](../../mise.toml).

## Version management — loose

Track a reviewed major version and validate npm CLI runtime requirements before raising it.

Run [shared checks](README.md#initial-setup) and inspect CLI behavior on upgrades.

For installation and authorization, follow [Initial Tool Setup](initial-setup.md).
