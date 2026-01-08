const { spawn } = require("node:child_process");
const { killPorts } = require("./ports");

killPorts([3000, 4001, 9000]);

const child = spawn('tinacms dev -c "next dev"', {
  shell: true,
  stdio: "inherit",
  windowsHide: true,
});

const killChild = () => {
  if (!child.pid) return;
  if (process.platform === "win32") {
    spawn(`taskkill /PID ${child.pid} /T /F`, { shell: true, stdio: "ignore" });
    return;
  }
  child.kill("SIGTERM");
};

process.on("SIGINT", killChild);
process.on("SIGTERM", killChild);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

