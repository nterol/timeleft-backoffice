import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test("should allow navigation between pages", async ({ page }) => {
        // Start on the home page
        await page.goto("/");
        await expect(page).toHaveURL("/");

        // Navigate to events
        await page.getByRole("link", { name: /Go to event page/i }).click();
        await expect(page).toHaveURL(/.*\/events/);
    });

    test("should have a visible header on all pages", async ({
        page,
    }) => {
        // Test on the home page
        await page.goto("/");
        const header = page.getByTestId("header");
        await expect(header).toBeVisible();

        // Test on the events page
        await page.goto("/events");
        const headerOnEvents = page.getByTestId("header");
        await expect(headerOnEvents).toBeVisible();
    });
});
