// @vitest-environment jsdom

import { render, screen } from "../test/utilities";
import App from "./App";

// CHECKS FOR ACCESSIBILITY VIOLATIONS

// import { axe, toHaveNoViolations } from "jest-axe";

// expect.extend(toHaveNoViolations);

// it("should have no accessibility violations", async () => {
//   const { container } = render(<App />);
//   const results = await axe(container);

//   expect(results).toHaveNoViolations();
// });

describe("App", () => {
  it("should render app", () => {
    render(<App />);
    screen.debug();
  });
  it("should have a title of TODO", () => {
    render(<App />);
    const title = screen.getByRole("heading", { name: /todso/i });
    expect(title).toHaveTextContent(/todo/i);
  });
});
