import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import PlanCard from "@/subscription/components/PlanCard";
import { PlanType } from "@/subscription/types";
import { GPS, Key } from "@/shared/components";

const mockPlan = {
  id: PlanType.GOOD_MATES,
  title: "Good Mates",
  features: [
    { icon: <GPS />, text: "Feature 1" },
    { icon: <Key />, text: "Feature 2" },
  ],
  price: "$20",
  priceLabel: "/month",
};

describe("Plan Card Tests", () => {
  it("renders plan title, features, and price", () => {
    render(<PlanCard plan={mockPlan} isSelected={false} onSelect={vi.fn()} />);

    expect(screen.getByText("Good Mates")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByText("/month")).toBeInTheDocument();
  });

  it("applies selected class and aria-pressed when selected", () => {
    render(<PlanCard plan={mockPlan} isSelected={true} onSelect={vi.fn()} />);

    const card = screen.getByText("Good Mates").closest(".plan-card");
    expect(card).toHaveClass("plan-card--selected");
    expect(card).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect when clicked", async () => {
    const onSelect = vi.fn();
    render(<PlanCard plan={mockPlan} isSelected={false} onSelect={onSelect} />);

    const card = screen.getByText("Good Mates").closest(".plan-card");
    await userEvent.click(card!);

    expect(onSelect).toHaveBeenCalledWith(mockPlan.id);
  });
});
