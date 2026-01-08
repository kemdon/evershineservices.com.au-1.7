const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");
const { killPorts } = require("./ports");

const tinaEnv = { ...process.env, NODE_ENV: "development" };
const buildEnv = {
  ...process.env,
  NODE_ENV: "production",
  TINA_LOCAL: "true",
  NEXT_PUBLIC_TINA_LOCAL: "true",
};

const waitForPort = (port, timeoutMs) =>
  new Promise((resolve, reject) => {
    const startTime = Date.now();

    const tryConnect = () => {
      const socket = net.connect({ port, host: "localhost" }, () => {
        socket.end();
        resolve();
      });

      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - startTime > timeoutMs) {
          reject(new Error(`Timed out waiting for port ${port}`));
          return;
        }
        setTimeout(tryConnect, 500);
      });
    };

    tryConnect();
  });

const waitForGraphql = async (url, timeoutMs) => {
  const startTime = Date.now();
  const query = "query { pageConnection { totalCount } }";

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const payload = await response.json().catch(() => null);
      const errors = Array.isArray(payload?.errors) ? payload.errors : [];
      const schemaMissing = errors.some((err) =>
        String(err?.message || "").toLowerCase().includes("graphql schema not found")
      );

      if (
        response.ok &&
        payload?.data?.pageConnection &&
        typeof payload.data.pageConnection.totalCount === "number" &&
        errors.length === 0 &&
        !schemaMissing
      )
        return;
    } catch {
      // ignore
    }

    if (Date.now() - startTime > timeoutMs) {
      throw new Error("Timed out waiting for Tina GraphQL schema");
    }
    await new Promise((r) => setTimeout(r, 750));
  }
};

const clearNextFetchCache = () => {
  const cachePath = path.join(process.cwd(), ".next", "cache", "fetch-cache");
  try {
    fs.rmSync(cachePath, { recursive: true, force: true });
  } catch {
    // ignore
  }
};

const killProcessTree = (pid) => {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(pid), "/t", "/f"], {
      stdio: "ignore",
      windowsHide: true,
    });
    return;
  }
  try {
    process.kill(-pid, "SIGTERM");
  } catch {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // ignore
    }
  }
};

(async () => {
  clearNextFetchCache();
  killPorts([4001, 9000]);
  const tina = spawn("tinacms dev --noWatch --noTelemetry", {
    shell: true,
    stdio: "inherit",
    env: tinaEnv,
    windowsHide: true,
  });

  try {
    await waitForPort(4001, 120_000);
    await waitForGraphql("http://localhost:4001/graphql", 120_000);
    const build = spawnSync("next build", {
      shell: true,
      stdio: "inherit",
      env: buildEnv,
    });
    killProcessTree(tina.pid);
    process.exit(build.status ?? 1);
  } catch (error) {
    killProcessTree(tina.pid);
    console.error(error);
    process.exit(1);
  }
})();
