import { test, expect } from "@playwright/test";

test.describe("Subscription Tests - Cross Browser", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.waitForSelector(".subscription-panel", { state: "visible" });
  });

  test("renders all subscription plans", async ({ page }) => {
    const plans = ["Just mates", "Good mates", "Best mates"];

    for (const plan of plans) {
      const planElement = page
        .locator(`.plan-card:has-text("${plan}")`)
        .first();
      await expect(planElement).toBeVisible({ timeout: 5000 });
    }
  });

  test("selects a plan and applies styles", async ({ page }) => {
    const goodMatesPlan = page
      .locator(".plan-card")
      .filter({ hasText: "Good mates" });

    await goodMatesPlan.click();
    await page.waitForTimeout(300);

    const classList = await goodMatesPlan.getAttribute("class");
    expect(classList).toContain("plan-card--selected");
  });

  test("toggles GPS and insurance add-ons", async ({ page }) => {
    const planCard = page
      .locator(".plan-card")
      .filter({ hasText: "Good mates" });
    await planCard.click();
    await page.waitForTimeout(500);

    const gpsAddon = page
      .locator(".addon-card")
      .filter({ hasText: "BYO secondary GPS" });
    await expect(gpsAddon).toBeVisible();

    await gpsAddon.click();
    let classList = await gpsAddon.getAttribute("class");
    expect(classList).toContain("addon-card--selected");

    const lockboxAddon = page
      .locator(".addon-card")
      .filter({ hasText: "BYO lockbox" });
    await expect(lockboxAddon).toBeVisible();

    await lockboxAddon.click();
    classList = await lockboxAddon.getAttribute("class");
    expect(classList).toContain("addon-card--selected");
  });

  test("card details section appears for non-free plans", async ({ page }) => {
    const freePlanCard = page
      .locator(".plan-card")
      .filter({ hasText: "Just mates" });
    await freePlanCard.click();
    await page.waitForTimeout(500);

    const cardSections = page.locator(".subscription-panel__collapsible");
    const cardSection = cardSections.nth(1);

    let classList = await cardSection.getAttribute("class");
    expect(classList).not.toContain("subscription-panel__collapsible--open");

    const paidPlanCard = page
      .locator(".plan-card")
      .filter({ hasText: "Good mates" });
    await paidPlanCard.click();
    await page.waitForTimeout(500);

    classList = await cardSection.getAttribute("class");
    expect(classList).toContain("subscription-panel__collapsible--open");

    const cardInput = page.locator('input[name="cardNumber"]');
    await expect(cardInput).toBeVisible({ timeout: 5000 });
  });

  test("updates card input fields", async ({ page }) => {
    const paidPlanCard = page
      .locator(".plan-card")
      .filter({ hasText: "Good mates" });
    await paidPlanCard.click();
    await page.waitForTimeout(500);

    const cardNumber = page.locator('input[name="cardNumber"]');
    const expiry = page.locator('input[name="expiry"]');
    const cvc = page.locator('input[name="cvc"]');

    await cardNumber.waitFor({ state: "visible", timeout: 5000 });

    await cardNumber.fill("4242424242424242");
    await expiry.fill("12/25");
    await cvc.fill("123");

    await expect(cardNumber).toHaveValue("4242424242424242");
    await expect(expiry).toHaveValue("12/25");
    await expect(cvc).toHaveValue("123");
  });
});
