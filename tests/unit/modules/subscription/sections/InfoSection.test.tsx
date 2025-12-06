import { InfoSection } from "@/subscription/sections";
import { render, screen } from "@testing-library/react";

describe("Info Section Tests", () => {
  it("renders info text and link", () => {
    render(<InfoSection />);
    expect(screen.getByText(/Learn more about the plans/i)).toBeInTheDocument();
    expect(
      screen.getByText(/What is the right plan for me\?/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/You will be able to switch/i)).toBeInTheDocument();
  });
});
