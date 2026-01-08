const { killPorts } = require("./ports");

const killed = killPorts([3000, 4001, 9000]);
if (!killed.length) {
  console.log("No dev server processes found on ports 3000/4001/9000.");
  process.exit(0);
}

for (const entry of killed) {
  console.log(`Killed PID ${entry.pid} listening on port ${entry.port}`);
}

