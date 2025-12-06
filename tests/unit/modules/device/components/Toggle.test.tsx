import { Toggle } from "@/device/components";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Toggle Tests", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with label when provided", () => {
    render(
      <Toggle label="Test Label" checked={false} onChange={mockOnChange} />,
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders without label when not provided", () => {
    const { container } = render(
      <Toggle checked={false} onChange={mockOnChange} />,
    );
    const label = container.querySelector(".toggle__label");
    expect(label).not.toBeInTheDocument();
  });

  it("has correct aria-checked attribute when checked", () => {
    render(<Toggle checked={true} onChange={mockOnChange} />);
    const button = screen.getByRole("switch");
    expect(button).toHaveAttribute("aria-checked", "true");
  });

  it("has correct aria-checked attribute when unchecked", () => {
    render(<Toggle checked={false} onChange={mockOnChange} />);
    const button = screen.getByRole("switch");
    expect(button).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with opposite value when clicked", () => {
    render(<Toggle checked={false} onChange={mockOnChange} />);
    const button = screen.getByRole("switch");

    fireEvent.click(button);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with opposite value when checked is true", () => {
    render(<Toggle checked={true} onChange={mockOnChange} />);
    const button = screen.getByRole("switch");

    fireEvent.click(button);
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it("applies checked class to button when checked", () => {
    render(<Toggle checked={true} onChange={mockOnChange} />);
    const button = screen.getByRole("switch");
    expect(button).toHaveClass("toggle__button--checked");
  });

  it("applies checked class to slider when checked", () => {
    const { container } = render(
      <Toggle checked={true} onChange={mockOnChange} />,
    );
    const slider = container.querySelector(".toggle__slider");
    expect(slider).toHaveClass("toggle__slider--checked");
  });

  it("does not apply checked classes when unchecked", () => {
    const { container } = render(
      <Toggle checked={false} onChange={mockOnChange} />,
    );
    const button = screen.getByRole("switch");
    const slider = container.querySelector(".toggle__slider");

    expect(button).not.toHaveClass("toggle__button--checked");
    expect(slider).not.toHaveClass("toggle__slider--checked");
  });

  it("has button type set to button", () => {
    render(<Toggle checked={false} onChange={mockOnChange} />);
    const button = screen.getByRole("switch");
    expect(button).toHaveAttribute("type", "button");
  });
});
