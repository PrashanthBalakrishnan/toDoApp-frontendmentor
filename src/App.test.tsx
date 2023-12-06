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
});
