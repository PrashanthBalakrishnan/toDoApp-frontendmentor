import { test, expect } from "@playwright/test";

test("Ability to add and delete todo", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByPlaceholder("Create a new todo...").click();
  await page.getByPlaceholder("Create a new todo...").fill("go to gym");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("delete-button").click();
});
