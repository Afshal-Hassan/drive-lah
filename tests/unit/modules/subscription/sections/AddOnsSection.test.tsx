import "@testing-library/jest-dom";
import { PlanType } from "@/subscription/types";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import AddOnsSection from "@/subscription/sections/AddOnsSection";

const defaultAddOns = { gps: false, insurance: false };

describe("AddOns Section Tests", () => {
  it("renders GPS add-on", () => {
    render(
      <AddOnsSection
        hasPlanSelected={true}
        selectedPlan={PlanType.GOOD_MATES}
        addOns={defaultAddOns}
        toggleAddon={() => {}}
      />,
    );
    expect(screen.getByText(/BYO secondary GPS/i)).toBeInTheDocument();
  });

  it("renders insurance add-on only for Good/Best Mates", () => {
    const { rerender } = render(
      <AddOnsSection
        hasPlanSelected={true}
        selectedPlan={PlanType.JUST_MATES}
        addOns={defaultAddOns}
        toggleAddon={() => {}}
      />,
    );
    expect(screen.queryByText(/lockbox/i)).not.toBeInTheDocument();

    rerender(
      <AddOnsSection
        hasPlanSelected={true}
        selectedPlan={PlanType.GOOD_MATES}
        addOns={defaultAddOns}
        toggleAddon={() => {}}
      />,
    );
    expect(screen.getByText(/lockbox/i)).toBeInTheDocument();
  });

  it("calls toggleAddon when GPS or insurance clicked", async () => {
    const toggleAddon = vi.fn();
    render(
      <AddOnsSection
        hasPlanSelected={true}
        selectedPlan={PlanType.GOOD_MATES}
        addOns={defaultAddOns}
        toggleAddon={toggleAddon}
      />,
    );

    await userEvent.click(
      screen.getByText(/BYO secondary GPS/i).closest("div")!,
    );
    expect(toggleAddon).toHaveBeenCalledWith("gps");

    await userEvent.click(screen.getByText(/BYO lockbox/i).closest("div")!);
    expect(toggleAddon).toHaveBeenCalledWith("insurance");
  });

  it("has proper aria-checked attribute", () => {
    const addOns = { gps: true, insurance: false };
    render(
      <AddOnsSection
        hasPlanSelected={true}
        selectedPlan={PlanType.GOOD_MATES}
        addOns={addOns}
        toggleAddon={() => {}}
      />,
    );

    const gpsCard = screen.getByText(/BYO secondary GPS/i).closest("div")!;

    expect(gpsCard).toHaveAttribute("aria-checked", "true");
  });
});
