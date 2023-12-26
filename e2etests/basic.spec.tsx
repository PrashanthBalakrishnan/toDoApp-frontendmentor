import { test, expect } from "@playwright/test";

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

test("Filter Test", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Create a new task...").click();
  await page.getByPlaceholder("Create a new task...").fill("go to gym");
  await page.getByTestId("submit-button").click();
  await page.getByLabel("Task", { exact: true }).check();
  await page.getByLabel("filteractive").click();
  expect(page.getByText("go to gym")).not.toBeVisible();
  await page.getByLabel("filtercompleted").click();
  await page.getByRole("button", { name: "clear completed" }).click();
});
