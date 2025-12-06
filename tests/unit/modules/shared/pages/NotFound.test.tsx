import { NotFoundPage } from "@/shared/pages";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("NotFound Tests", () => {
  it("renders the 404 error code", () => {
    render(<NotFoundPage />);
    const errorCode = screen.getByText("404");
    expect(errorCode).toBeInTheDocument();
  });

  it('displays the main heading "You\'ve gone off-road!"', () => {
    render(<NotFoundPage />);
    const heading = screen.getByRole("heading", {
      name: /you've gone off-road!/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows the descriptive error message", () => {
    render(<NotFoundPage />);
    const description = screen.getByText(
      /the page you are looking for seems to have taken a wrong turn/i,
    );
    expect(description).toBeInTheDocument();
  });

  it("renders with correct CSS class structure", () => {
    const { container } = render(<NotFoundPage />);
    const notFoundDiv = container.querySelector(".not-found");
    expect(notFoundDiv).toBeInTheDocument();
    expect(
      notFoundDiv?.querySelector(".not-found__icon-wrapper"),
    ).toBeInTheDocument();
    expect(notFoundDiv?.querySelector(".not-found__code")).toBeInTheDocument();
  });

  it("displays map and question icons", () => {
    const { container } = render(<NotFoundPage />);
    const mapIcon = container.querySelector(".fa-map-marked-alt");
    const questionIcon = container.querySelector(".fa-question");
    expect(mapIcon).toBeInTheDocument();
    expect(questionIcon).toBeInTheDocument();
  });
});
