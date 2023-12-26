import { test } from "@playwright/test";

test("Adding/editing/deleting a todo", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Create a new task...").click();
  await page.getByPlaceholder("Create a new task...").fill("go to gym");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("edit-button").click();
  await page.getByTestId("edit-input").fill("go to gym now");
  await page.getByTestId("save-button").click();
  await page.getByText("go to gym now").click();
  await page.getByTestId("delete-button").click();
});

test("Checking if filters work", async ({ page }) => {
  await page.goto("/");
  await page.pause();
});
