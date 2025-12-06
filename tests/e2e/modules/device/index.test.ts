import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/device");
});

test.describe("Device Management Tests - Cross Browser", () => {
  test("should display Device Management heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Device Management" }),
    ).toBeVisible();
  });

  test("should show device description text", async ({ page }) => {
    await expect(page.locator("#root")).toContainText(
      "Add details of the device, if any already installed on your car.",
    );
  });

  test("should show Device 1 section", async ({ page }) => {
    await expect(page.locator("#root")).toContainText("Device 1");
  });

  test("should display BYOD question", async ({ page }) => {
    await expect(page.locator("#root")).toContainText(
      "Bringing your own device?",
    );
  });

  test("should display BYOD description", async ({ page }) => {
    await expect(page.locator("#root")).toContainText(
      "Toggle this on if you're bringing your own device. Leave it off if Drive mate is to provide the device.",
    );
  });

  test("should allow interacting with Device 1 inputs", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "e.g. Primary GPS" })
      .first()
      .click();
    await page
      .getByRole("textbox", { name: "Enter the serial number of" })
      .first()
      .click();
  });

  test("should allow interacting with Device 2 inputs", async ({ page }) => {
    await page.getByRole("heading", { name: "Device 2" }).click();
    await page.getByText("Upload an image of the device").nth(1).click();
  });
});
