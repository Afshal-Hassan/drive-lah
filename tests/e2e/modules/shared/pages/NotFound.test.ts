import { test, expect } from "@playwright/test";

test.describe("Not Found Page Tests - Cross Browser", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/not-found");
  });

  test("404 heading is visible", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  });

  test("Off-road heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "You've gone off-road!" }),
    ).toBeVisible();
  });

  test("Not-found text is visible", async ({ page }) => {
    await expect(page.getByText("The page you are looking for")).toBeVisible();
  });

  test("Not-found icon circle is visible", async ({ page }) => {
    await expect(page.locator(".not-found__icon-circle")).toBeVisible();
  });
});
