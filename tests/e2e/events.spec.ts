import { test, expect } from "@playwright/test";

test.describe("Events Page", () => {
    test("should display the events page with the table", async ({
        page,
    }) => {
        await page.goto("/events");

        // Verify that the page loads
        await expect(page).toHaveURL(/.*\/events/);

        // Verify that the table is present
        const table = page.getByTestId("event-table");
        await expect(table).toBeVisible();
    });

    test("should display the table headers", async ({ page }) => {
        await page.goto("/events");

        // Wait for the table to be loaded
        const table = page.getByTestId("event-table");
        await expect(table).toBeVisible();

        // Verify the presence of table headers
        const tableHeader = page.getByTestId("event-table-header");
        await expect(tableHeader).toBeVisible();
    });

    test("should display the event filters", async ({ page }) => {
        await page.goto("/events");

        // Verify that filters are present
        const eventFilters = page.getByTestId("event-filters");
        await expect(eventFilters).toBeVisible();
    });
});
