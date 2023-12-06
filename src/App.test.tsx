// @vitest-environment jsdom

import { render } from "../test/utilities";
import App from "./App";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("App", () => {
  it("should render app", () => {
    render(<App />);
  });
});

// it("should have no accessibility violations", async () => {
//   const { container } = render(<App />);
//   const results = await axe(container);

//   expect(results).toHaveNoViolations();
// });
