import { test, expect } from "@playwright/test";

test.describe("Header Tests - Cross Browser", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.waitForSelector("header", { state: "visible" });
  });

  test("should render header correctly across browsers", async ({ page }) => {
    const header = page.locator("header");

    await expect(header).toBeVisible();
  });

  test("should navigate via logo link", async ({ page }) => {
    const logo = page.locator('a[aria-label="Drive lah"]');

    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("should navigate via nav links", async ({ page, isMobile }) => {
    // Skip on mobile as nav is hidden
    if (isMobile) {
      test.skip();
    }

    const learnMore = page.locator('a.header__nav-link:has-text("Learn more")');
    const listYourCar = page.locator(
      'a.header__nav-link:has-text("List your car")',
    );
    const inbox = page.locator('a.header__nav-link:has-text("Inbox")');

    await expect(learnMore).toBeVisible();
    await learnMore.click();

    await page.waitForTimeout(100);
    await expect(page).toHaveURL(/#learn-more/);

    await page.goto("/");
    await page.waitForSelector("header", { state: "visible" });

    await expect(listYourCar).toBeVisible();
    await listYourCar.click();

    await page.waitForTimeout(100);
    await expect(page).toHaveURL(/#list-car/);

    await page.goto("/");
    await page.waitForSelector("header", { state: "visible" });

    await expect(inbox).toBeVisible();
    await inbox.click();

    await page.waitForTimeout(100);
    await expect(page).toHaveURL(/#inbox/);
  });

  test("should handle keyboard navigation", async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    await page.keyboard.press("Tab");

    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;

      return {
        tagName: el?.tagName,
        ariaLabel: el?.getAttribute("aria-label"),
        href: el?.getAttribute("href"),
      };
    });

    expect(focusedElement.tagName).toBeTruthy();
    expect(focusedElement.ariaLabel).toBeTruthy();
  });

  test("should work on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const header = page.locator("header");
    const logo = page.locator(".header__logo");

    await expect(header).toBeVisible();
    await expect(logo).toBeVisible();
  });

  test("should handle profile button click", async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    const profileBtn = page.locator('button[aria-label="Profile Pic"]');

    await expect(profileBtn).toBeVisible({ timeout: 10000 });
    await profileBtn.click();

    await expect(profileBtn).toBeVisible();
  });

  test("should load images properly", async ({ page, isMobile }) => {
    const logoImg = page.locator(".header__logo-icon");

    await expect(logoImg).toBeVisible();

    if (!isMobile) {
      const profileImg = page.locator(".header__profile-img");
      const count = await profileImg.count();

      if (count > 0) {
        await expect(profileImg).toBeVisible();
      }
    }
  });

  test("should maintain sticky positioning on scroll", async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.style.height = "2000px";
      document.body.appendChild(div);
    });

    await page.evaluate(() => window.scrollTo(0, 500));

    const header = page.locator("header");
    const headerBox = await header.boundingBox();

    await expect(header).toBeVisible();

    expect(headerBox?.y).toBeLessThanOrEqual(10);
  });

  test("should have proper ARIA labels", async ({ page }) => {
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('a[aria-label="Drive lah"]')).toBeVisible();
  });

  test("should render logo with correct attributes", async ({ page }) => {
    const logoImg = page.locator(".header__logo-icon");

    await expect(logoImg).toHaveAttribute("loading", "eager");
    await expect(logoImg).toHaveAttribute("decoding", "async");
  });
});
