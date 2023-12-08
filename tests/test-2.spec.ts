import { test, expect } from "@playwright/test";

test("User should be able to add a todo then edit it then toggle complete and clear complete", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByPlaceholder("Create a new todo...").click();
  await page.getByPlaceholder("Create a new todo...").fill("addingg to do");
  await page.getByPlaceholder("Create a new todo...").press("Enter");
  await page.getByLabel("edit a todo").click();
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).press("ArrowLeft");
  await page.getByRole("textbox").nth(1).press("ArrowLeft");
  await page.getByRole("textbox").nth(1).press("ArrowLeft");
  await page.getByRole("textbox").nth(1).press("ArrowLeft");
  await page.getByRole("textbox").nth(1).press("ArrowLeft");
  await page.getByRole("textbox").nth(1).press("ArrowLeft");
  await page.getByRole("textbox").nth(1).fill("adding to do");
  await page.getByLabel("submit edited todo").click();
  await page.getByLabel("adding to do").check();
  await page.getByRole("button", { name: "clear completed" }).click();
});
