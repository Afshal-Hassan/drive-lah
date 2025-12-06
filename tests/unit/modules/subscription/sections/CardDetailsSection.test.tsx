import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { SubscriptionState } from "@/subscription/types";
import CardDetailsSection from "@/subscription/sections/CardDetailsSection";

const mockState: SubscriptionState = {
  cardNumber: "",
  expiry: "",
  cvc: "",
  addOns: { gps: false, insurance: false },
  selectedPlan: null,
};

describe("CardDetails Section Tests", () => {
  it("renders all input fields", () => {
    render(
      <CardDetailsSection
        show={true}
        state={mockState}
        handleCardInput={() => {}}
      />,
    );

    expect(
      screen.getByPlaceholderText(/1234 5678 1234 5678/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/MM\/YY/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/CVC/i)).toBeInTheDocument();
  });

  it("calls handleCardInput on input change", async () => {
    const handleCardInput = vi.fn();
    render(
      <CardDetailsSection
        show={true}
        state={mockState}
        handleCardInput={handleCardInput}
      />,
    );

    const cardNumberInput = screen.getByPlaceholderText(/1234 5678 1234 5678/i);
    await userEvent.type(cardNumberInput, "4");

    expect(handleCardInput).toHaveBeenCalled();
  });
});
