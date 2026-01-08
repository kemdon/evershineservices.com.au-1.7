const { killPorts } = require("./ports");

const ports = process.argv.slice(2).map((value) => Number.parseInt(value, 10));
if (!ports.length || ports.some((port) => !Number.isFinite(port))) {
  console.error("Usage: node scripts/kill-ports.js <port> [port...]");
  process.exit(1);
}

const killed = killPorts(ports);
if (!killed.length) {
  console.log(`No processes found on ports: ${ports.join(", ")}`);
  process.exit(0);
}

for (const entry of killed) {
  console.log(`Killed PID ${entry.pid} listening on port ${entry.port}`);
}

