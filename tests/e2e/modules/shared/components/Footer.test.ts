import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/device");
});

test.describe("Footer Tests - Cross Browser", async () => {
  test("should display the Next button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
  });

  test("should show Next text inside footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toContainText("Next");
  });
});
