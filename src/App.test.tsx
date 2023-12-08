// @vitest-environment jsdom

import { render, screen } from "../test/utilities";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "./App";

// CHECKS FOR ACCESSIBILITY VIOLATIONS

expect.extend(toHaveNoViolations);

describe("App", () => {
  it("should render app", () => {
    render(<App />);
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should have a title of TODO", () => {
    render(<App />);
    const title = screen.getByRole("heading", { name: /todo/i });
    expect(title).toHaveTextContent(/todo/i);
  });

  test("button should be disabled if the input is empty", () => {
    render(<App />);
    const SubmitButton = screen.getByTestId("submit-button");
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    expect(SubmitButton).toBeDisabled();
  });

  test("User able to add a todo", async () => {
    const { user } = render(<App />);
    const input = screen.getByRole("textbox");
    const SubmitButton = screen.getByTestId("submit-button");

    expect(input).toHaveValue("");

    await user.type(input, "Go to the gym");
    await user.click(SubmitButton);
    expect(document.body).toHaveTextContent("Go to the gym");
  });

  test("user able to toggle complete", async () => {
    const { user } = render(<App />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("user able to see completed todo", async () => {
    const { user } = render(<App />);
    const completedFilter = screen.getByRole("radio", { name: /completed/i });

    await user.click(completedFilter);
    expect(document.body).toHaveTextContent("Go to the gym");
  });

  test("user able to see active todo", async () => {
    const { user } = render(<App />);
    const activeFilter = screen.getByRole("radio", { name: /active/i });

    await user.click(activeFilter);
    expect(document.body).not.toHaveTextContent("Go to the gym");
  });

  test("user able to see all todo", async () => {
    const { user } = render(<App />);
    const activeFilter = screen.getByRole("radio", { name: /all/i });

    await user.click(activeFilter);
    expect(document.body).toHaveTextContent("Go to the gym");
  });

  test("user able to create todo and delete", async () => {
    const { user } = render(<App />);
    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);
    expect(document.body).not.toHaveTextContent("Go to the gym");
  });
});
