import { Provider } from "react-redux";
import Subscription from "@/subscription/index";
import { PlanType } from "@/subscription/types";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import subscriptionReducer from "@/subscription/slices";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/shared/hooks", async () => {
  const actual = await vi.importActual("@/shared/hooks");
  return {
    ...actual,
    useClickOutside: () => ({ current: null }),
  };
});

vi.mock("@/subscription/sections", () => ({
  PlanSection: ({ plans, onSelect, selectedPlan }: any) => (
    <div data-testid="plan-section">
      {plans.map((plan: any) => (
        <div
          key={plan.id}
          className="plan-card"
          onClick={() => onSelect(plan.id)}
          aria-pressed={selectedPlan === plan.id}
          role="button"
        >
          <h3>{plan.title}</h3>
        </div>
      ))}
    </div>
  ),
  AddOnsSection: ({
    addOns,
    toggleAddon,
    hasPlanSelected,
    selectedPlan,
  }: any) => {
    if (!hasPlanSelected || selectedPlan === PlanType.JUST_MATES) {
      return null;
    }

    return (
      <div data-testid="addons-section">
        {Object.entries(addOns).map(([key, value]: [string, any]) => (
          <div
            key={key}
            className="addon-card"
            onClick={() => toggleAddon(key)}
            aria-checked={value}
            role="checkbox"
          >
            {key === "secondaryGPS" && "BYO secondary GPS - $5/month"}
            {key === "lockbox" && "BYO lockbox - $10/month"}
            {key === "insurance" && "Between trip insurance"}
          </div>
        ))}
      </div>
    );
  },
  CardDetailsSection: ({ state, show, handleCardInput }: any) => {
    if (!show) return null;

    return (
      <div data-testid="card-details-section">
        <input
          name="cardNumber"
          placeholder="1234 5678 1234 5678"
          defaultValue={state.cardDetails?.cardNumber || ""}
          onChange={handleCardInput}
        />
        <input
          name="expiry"
          placeholder="MM/YY"
          defaultValue={state.cardDetails?.expiry || ""}
          onChange={handleCardInput}
        />
        <input
          name="cvc"
          placeholder="CVC"
          defaultValue={state.cardDetails?.cvc || ""}
          onChange={handleCardInput}
        />
      </div>
    );
  },
  InfoSection: () => <div data-testid="info-section">Info Section</div>,
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      subscription: subscriptionReducer,
    },
  });
};

const renderWithRedux = (component: React.ReactElement) => {
  const store = createMockStore();
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Subscription Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all plan cards", () => {
    renderWithRedux(<Subscription />);

    expect(screen.getByText("Just mates")).toBeInTheDocument();
    expect(screen.getByText("Good mates")).toBeInTheDocument();
    expect(screen.getByText("Best mates")).toBeInTheDocument();
  });

  it("updates plan selection via user click", async () => {
    renderWithRedux(<Subscription />);

    const goodMatesPlan = screen.getByText("Good mates").closest(".plan-card");
    expect(goodMatesPlan).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(goodMatesPlan!);
    expect(goodMatesPlan).toHaveAttribute("aria-pressed", "true");
  });

  it("plan selection toggles correctly", async () => {
    renderWithRedux(<Subscription />);

    const justMates = screen.getByText("Just mates").closest(".plan-card");
    const goodMates = screen.getByText("Good mates").closest(".plan-card");

    await userEvent.click(goodMates!);
    expect(goodMates).toHaveAttribute("aria-pressed", "true");
    expect(justMates).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(justMates!);
    expect(justMates).toHaveAttribute("aria-pressed", "true");
    expect(goodMates).toHaveAttribute("aria-pressed", "false");
  });

  it("does not show insurance add-on for Just mates plan", async () => {
    renderWithRedux(<Subscription />);

    const justMatesPlan = screen.getByText("Just mates").closest(".plan-card");
    await userEvent.click(justMatesPlan!);

    expect(
      screen.queryByText("BYO lockbox - $10/month"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Between trip insurance"),
    ).not.toBeInTheDocument();
  });

  it("updates card input fields via user input", async () => {
    renderWithRedux(<Subscription />);

    // First select a paid plan to show card details
    const goodMatesPlan = screen.getByText("Good mates").closest(".plan-card");
    await userEvent.click(goodMatesPlan!);

    const cardNumberInput = screen.getByPlaceholderText(
      "1234 5678 1234 5678",
    ) as HTMLInputElement;
    const expiryInput = screen.getByPlaceholderText(
      "MM/YY",
    ) as HTMLInputElement;
    const cvcInput = screen.getByPlaceholderText("CVC") as HTMLInputElement;

    await userEvent.clear(cardNumberInput);
    await userEvent.type(cardNumberInput, "4111111111111111");

    await userEvent.clear(expiryInput);
    await userEvent.type(expiryInput, "12/25");

    await userEvent.clear(cvcInput);
    await userEvent.type(cvcInput, "123");

    expect(cardNumberInput.value).toBe("4111111111111111");
    expect(expiryInput.value).toBe("12/25");
    expect(cvcInput.value).toBe("123");
  });
});
