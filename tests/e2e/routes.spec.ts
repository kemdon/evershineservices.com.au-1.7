import { expect, test } from "@playwright/test";

test("core routes render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /evershine/i }).first()).toBeVisible();

  await page.goto("/cleaning");
  await expect(page.getByRole("heading", { level: 1, name: /cleaning/i }).first()).toBeVisible();

  await page.goto("/posts");
  await expect(page.getByRole("heading", { level: 1, name: /latest posts/i })).toBeVisible();
});
