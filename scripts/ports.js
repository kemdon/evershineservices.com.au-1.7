const { execSync } = require("node:child_process");

const unique = (items) => Array.from(new Set(items));

const toInt = (value) => {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const getPidsWindows = (port) => {
  const output = execSync("netstat -ano -p tcp", { encoding: "utf8" });
  const pids = [];
  for (const line of output.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("TCP")) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 5) continue;
    const localAddress = parts[1];
    const state = parts[3];
    const pid = parts[4];

    if (state !== "LISTENING") continue;
    if (!localAddress.endsWith(`:${port}`)) continue;
    const pidNum = toInt(pid);
    if (pidNum) pids.push(pidNum);
  }
  return unique(pids);
};

const getPidsPosix = (port) => {
  try {
    const output = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN -t`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return unique(
      output
        .split(/\r?\n/)
        .map((line) => toInt(line))
        .filter(Boolean)
    );
  } catch {
    return [];
  }
};

const getPidsOnPort = (port) => {
  if (!Number.isFinite(port)) return [];
  if (process.platform === "win32") return getPidsWindows(port);
  return getPidsPosix(port);
};

const killPid = (pid) => {
  if (!pid) return false;
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /T /F`, { stdio: "ignore" });
      return true;
    }
    process.kill(pid, "SIGTERM");
    return true;
  } catch {
    try {
      process.kill(pid, "SIGKILL");
      return true;
    } catch {
      return false;
    }
  }
};

const killPorts = (ports) => {
  const killed = [];
  for (const port of ports) {
    const numericPort = toInt(port);
    if (!numericPort) continue;
    for (const pid of getPidsOnPort(numericPort)) {
      if (killPid(pid)) killed.push({ port: numericPort, pid });
    }
  }
  return killed;
};

module.exports = { getPidsOnPort, killPorts };

