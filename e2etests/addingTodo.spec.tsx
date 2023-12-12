import { test, expect } from "@playwright/test";

test("Adding/editing/deleting a todo", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Create a new todo...").click();
  await page.getByPlaceholder("Create a new todo...").fill("go to gym");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("edit-button").click();
  await page.getByTestId("edit-input").fill("go to gym now");
  await page.getByTestId("save-button").click();
  await page.getByText("go to gym now").click();
  await page.getByTestId("delete-button").click();
});

test.only("Checking if filters work", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Create a new todo...").click();
  await page.getByPlaceholder("Create a new todo...").fill("Go to gym");
  await page.getByPlaceholder("Create a new todo...").press("Enter");
  await page.getByPlaceholder("Create a new todo...").fill("Get work done");
  await page.getByPlaceholder("Create a new todo...").press("Enter");
  await page.getByText("Go to gym").click();
  await page.getByText("Active").click();
  await expect(page.getByText("get work done")).toBeVisible();
  await page.getByText("Completed", { exact: true }).click();
  await expect(page.getByText("Go to gym")).toBeVisible();
  await page.getByText("All").click();
  await expect(page.getByText("Go to gym")).toBeVisible();
  await expect(page.getByText("get work done")).toBeVisible();
});
