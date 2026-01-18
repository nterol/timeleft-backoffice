import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
    test("should display the home page with a link to events", async ({
        page,
    }) => {
        await page.goto("/");

        // Check that the link to events is present
        const linkToEvents = page.getByRole("link", { name: /Go to event page/i });
        await expect(linkToEvents).toBeVisible();
    });

    test("should navigate to the events page when clicking the link", async ({
        page,
    }) => {
        await page.goto("/");

        // Click on the link to events
        await page.getByRole("link", { name: /Go to event page/i }).click();

        // Verify that we are on the events page
        await expect(page).toHaveURL(/.*\/events/);
    });
});
