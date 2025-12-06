import { Footer } from "@/shared/components";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mocks
vi.mock("@/shared/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (fn: any) =>
    fn({
      sidebar: {
        steps: ["step1", "step2", "step3"],
        currentStepIndex: 0,
      },
      subscription: {
        selectedPlan: "basic",
      },
    }),
}));

const mockNextStep = vi.fn();
vi.mock("@/shared/slices/sidebar", () => ({
  nextStep: () => mockNextStep(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual<any>("react-router-dom")) as object;

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Footer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Next button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer />
      </MemoryRouter>,
    );

    const button = screen.getByText(/Next/i);
    expect(button).toBeInTheDocument();
  });

  it("dispatches nextStep and navigates to /device when clicking Next", () => {
    render(
      <MemoryRouter initialEntries={["/some-path"]}>
        <Footer />
      </MemoryRouter>,
    );

    const button = screen.getByText("Next");

    fireEvent.click(button);

    expect(mockNextStep).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/device");
  });

  it("disables the button when on /device route", () => {
    render(
      <MemoryRouter initialEntries={["/device"]}>
        <Footer />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /Next/i });

    expect(button.className).toContain("sticky-footer__button--disabled");
  });
});
