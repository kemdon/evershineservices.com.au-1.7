import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm exec next start -p 3000",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

