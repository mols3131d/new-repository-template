# Node.js

[Node.js](https://nodejs.org/) runs npm-distributed CLI tools in this starter, including Biome and Rulesync. It does **not** establish Node.js as the derived application's runtime. The requested version lives in [`mise.toml`](../../mise.toml).

## Version management — loose

Track a reviewed **major version** using a mise major prefix. This admits minor and patch updates within that line; a new major is an explicit compatibility decision.

Before changing the major, check the runtime requirements of installed npm CLIs, run [shared checks](README.md#initial-setup), and inspect failures or changed output. A matching major is a selection policy, not proof every newer release works.

For installation and authorization, follow [Initial Tool Setup](initial-setup.md).
