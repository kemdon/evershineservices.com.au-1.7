const { spawnSync } = require("node:child_process");
const { killPorts } = require("./ports");

killPorts([3000, 4001, 9000]);

const run = (command, env) =>
  spawnSync(command, {
    shell: true,
    stdio: "inherit",
    env: env ? { ...process.env, ...env } : process.env,
  });

const build = run("pnpm build-local");
if ((build.status ?? 1) !== 0) process.exit(build.status ?? 1);

const test = run("pnpm exec playwright test -c playwright.config.build.ts");
process.exit(test.status ?? 1);

