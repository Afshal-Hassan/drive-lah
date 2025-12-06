import { Provider } from "react-redux";
import { Sidebar } from "@/shared/components";
import { describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";

vi.mock("@/shared/components/List", () => ({
  default: ({ items, renderItem }: any) => (
    <>{items.map((item: any, index: number) => renderItem(item, index))}</>
  ),
}));

const mockSidebarReducer = (
  state: { steps: any[] } = { steps: [] },
): { steps: any[] } => {
  return state;
};

const createMockStore = (steps: any[]) => {
  return configureStore({
    reducer: {
      sidebar: mockSidebarReducer,
    },
    preloadedState: {
      sidebar: { steps },
    },
  });
};

const renderWithRedux = (component: React.ReactElement, steps: any[]) => {
  const store = createMockStore(steps);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Sidebar Tests", () => {
  const mockSteps = [
    { label: "Location", status: "completed" },
    { label: "About", status: "completed" },
    { label: "Features", status: "completed" },
    { label: "Rules", status: "completed" },
    { label: "Pricing", status: "completed" },
    { label: "Promotion", status: "completed" },
    { label: "Pictures", status: "completed" },
    { label: "Insurance", status: "completed" },
    { label: "Subscription", status: "active" },
    { label: "Device", status: "disabled" },
    { label: "Easy Access", status: "disabled" },
  ];

  it("renders all step labels", () => {
    renderWithRedux(<Sidebar />, mockSteps);

    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Rules")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Promotion")).toBeInTheDocument();
    expect(screen.getByText("Pictures")).toBeInTheDocument();
    expect(screen.getByText("Insurance")).toBeInTheDocument();
    expect(screen.getByText("Subscription")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Easy Access")).toBeInTheDocument();
  });

  it("renders correct number of steps", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const listItems = container.querySelectorAll(".sidebar__item");

    expect(listItems).toHaveLength(11);
  });

  it("applies completed class to completed steps", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const completedItems = container.querySelectorAll(
      ".sidebar__item--completed",
    );

    expect(completedItems).toHaveLength(8);
  });

  it("displays checkmark icon for completed steps", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const checkmarks = container.querySelectorAll(".sidebar__icon");

    expect(checkmarks).toHaveLength(8);
    checkmarks.forEach((icon) => {
      expect(icon).toHaveTextContent("✔");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("applies active class to active step", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const activeItem = container.querySelector(".sidebar__item--active");

    expect(activeItem).toBeInTheDocument();
    expect(activeItem).toHaveTextContent("Subscription");
  });

  it("sets aria-current attribute on active step", () => {
    renderWithRedux(<Sidebar />, mockSteps);
    const subscriptionItem = screen.getByText("Subscription").closest("li");

    expect(subscriptionItem).toHaveAttribute("aria-current", "step");
  });

  it("applies disabled class to disabled steps", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const disabledItems = container.querySelectorAll(
      ".sidebar__item--disabled",
    );

    expect(disabledItems).toHaveLength(2);
  });

  it("sets aria-disabled attribute on disabled steps", () => {
    renderWithRedux(<Sidebar />, mockSteps);
    const deviceItem = screen.getByText("Device").closest("li");
    const easyAccessItem = screen.getByText("Easy Access").closest("li");

    expect(deviceItem).toHaveAttribute("aria-disabled", "true");
    expect(easyAccessItem).toHaveAttribute("aria-disabled", "true");
  });

  it("does not display checkmark for active step", () => {
    renderWithRedux(<Sidebar />, mockSteps);
    const subscriptionItem = screen.getByText("Subscription").closest("li");
    const icon = subscriptionItem?.querySelector(".sidebar__icon");

    expect(icon).not.toBeInTheDocument();
  });

  it("does not display checkmark for disabled steps", () => {
    renderWithRedux(<Sidebar />, mockSteps);
    const deviceItem = screen.getByText("Device").closest("li");
    const easyAccessItem = screen.getByText("Easy Access").closest("li");

    expect(deviceItem?.querySelector(".sidebar__icon")).not.toBeInTheDocument();
    expect(
      easyAccessItem?.querySelector(".sidebar__icon"),
    ).not.toBeInTheDocument();
  });

  it("has proper aria-label on sidebar", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const sidebar = container.querySelector(".sidebar");

    expect(sidebar).toHaveAttribute("aria-label", "Sidebar");
  });

  it("renders list items in correct order", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const listItems = container.querySelectorAll(".sidebar__item");
    const labels = Array.from(listItems).map((item) =>
      item.textContent?.replace("✔", "").trim(),
    );

    expect(labels).toEqual([
      "Location",
      "About",
      "Features",
      "Rules",
      "Pricing",
      "Promotion",
      "Pictures",
      "Insurance",
      "Subscription",
      "Device",
      "Easy Access",
    ]);
  });

  it("only applies one status class per item", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const listItems = container.querySelectorAll(".sidebar__item");

    listItems.forEach((item) => {
      const hasCompleted = item.classList.contains("sidebar__item--completed");
      const hasActive = item.classList.contains("sidebar__item--active");
      const hasDisabled = item.classList.contains("sidebar__item--disabled");

      const statusCount = [hasCompleted, hasActive, hasDisabled].filter(
        Boolean,
      ).length;
      expect(statusCount).toBeLessThanOrEqual(1);
    });
  });

  it("supports keyboard navigation", () => {
    renderWithRedux(<Sidebar />, mockSteps);
    const firstItem = screen.getByText("Location").closest("li");

    firstItem?.focus();
    expect(document.activeElement).toBe(firstItem);
  });

  it("has focusable elements with visible focus indicators", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const items = container.querySelectorAll(".sidebar__item");

    items.forEach((item) => {
      expect(item).toHaveAttribute("tabindex", "0");
    });
  });

  it("provides proper role attributes", () => {
    const { container } = renderWithRedux(<Sidebar />, mockSteps);
    const div = container.querySelector("div");
    const list = container.querySelector("ul");

    expect(div).toHaveAttribute("role", "navigation");
    expect(list).toHaveAttribute("role", "list");
  });
});
