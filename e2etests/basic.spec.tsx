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

test("Checking if filters work", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Create a new task...").click();
  await page.getByPlaceholder("Create a new task...").fill("Go to gym");
  await page.getByPlaceholder("Create a new task...").press("Enter");
  await page.getByPlaceholder("Create a new task...").fill("Get work done");
  await page.getByPlaceholder("Create a new task...").press("Enter");
  await page.getByText("Go to gym").click();
  await page.getByLabel("filteractive").click();
  await page.pause();
  await expect(page.getByText("get work done")).toBeVisible();
  await page.getByLabel("filtercompleted").click();
  await expect(page.getByText("Go to gym")).toBeVisible();
  await page.getByLabel("filterall").click();
  await expect(page.getByText("Go to gym")).toBeVisible();
  await expect(page.getByText("get work done")).toBeVisible();
});
