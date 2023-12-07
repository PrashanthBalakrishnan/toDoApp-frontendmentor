import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5174/");
  await page.getByPlaceholder("Create a new todo...").click();
  await page.getByPlaceholder("Create a new todo...").fill("go to gym");
  await page.getByTestId("delete-button").click();
});
