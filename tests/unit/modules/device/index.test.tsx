import Device from "@/device/index";
import { Provider } from "react-redux";
import deviceReducer from "@/device/slices";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("@/device/components", () => ({
  DeviceRow: ({ device, onChange }: any) => (
    <div data-testid={`device-row-${device.id}`}>
      <h3>{device.name}</h3>
      <input
        data-testid={`device-type-${device.id}`}
        value={device.type}
        onChange={(e) => onChange({ ...device, type: e.target.value })}
      />
      <input
        data-testid={`device-serial-${device.id}`}
        value={device.serialNumber}
        onChange={(e) => onChange({ ...device, serialNumber: e.target.value })}
      />
      <button
        data-testid={`device-toggle-${device.id}`}
        onClick={() => onChange({ ...device, isByod: !device.isByod })}
      >
        Toggle BYOD: {device.isByod ? "ON" : "OFF"}
      </button>
    </div>
  ),
}));

vi.mock("@/shared/hooks", async () => {
  const actual = await vi.importActual("@/shared/hooks");
  return {
    ...actual,
    useClickOutside: () => ({ current: null }),
  };
});

const subscriptionReducer = (state = { selectedPlan: "basic" }) => state;

const createMockStore = (devices?: any[]) => {
  return configureStore({
    reducer: {
      device: deviceReducer,
      subscription: subscriptionReducer,
    },
    preloadedState: devices
      ? {
          device: { items: devices },
          subscription: { selectedPlan: "basic" },
        }
      : {
          device: { items: [] },
          subscription: { selectedPlan: "basic" },
        },
  });
};

const renderWithRedux = (component: React.ReactElement, devices?: any[]) => {
  const store = createMockStore(devices);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Device Tests", () => {
  const initialDevices = [
    {
      id: 1,
      name: "Device 1",
      type: "Primary GPS",
      serialNumber: "",
      isByod: true,
      image: null,
    },
    {
      id: 2,
      name: "Device 2",
      type: "Secondary GPS",
      serialNumber: "",
      isByod: true,
      image: null,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Device Management Page Tests - Cross Browser", () => {
    it("renders the device management title", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(screen.getByText("Device Management")).toBeInTheDocument();
    });

    it("renders the subtitle with instructions", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(
        screen.getByText(
          /Add details of the device, if any already installed on your car/,
        ),
      ).toBeInTheDocument();
    });

    it("renders both initial devices", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(screen.getByTestId("device-row-1")).toBeInTheDocument();
      expect(screen.getByTestId("device-row-2")).toBeInTheDocument();
    });

    it("renders Device 1 with correct initial values", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(screen.getByText("Device 1")).toBeInTheDocument();

      const typeInput = screen.getByTestId("device-type-1") as HTMLInputElement;
      expect(typeInput.value).toBe("Primary GPS");

      const serialInput = screen.getByTestId(
        "device-serial-1",
      ) as HTMLInputElement;
      expect(serialInput.value).toBe("");
    });

    it("renders Device 2 with correct initial values", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(screen.getByText("Device 2")).toBeInTheDocument();

      const typeInput = screen.getByTestId("device-type-2") as HTMLInputElement;
      expect(typeInput.value).toBe("Secondary GPS");

      const serialInput = screen.getByTestId(
        "device-serial-2",
      ) as HTMLInputElement;
      expect(serialInput.value).toBe("");
    });

    it("both devices have isByod set to true initially", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(screen.getByTestId("device-toggle-1")).toHaveTextContent(
        "Toggle BYOD: ON",
      );
      expect(screen.getByTestId("device-toggle-2")).toHaveTextContent(
        "Toggle BYOD: ON",
      );
    });
  });

  describe("Device State Management", () => {
    it("updates device type when changed", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      const typeInput = screen.getByTestId("device-type-1") as HTMLInputElement;
      await user.clear(typeInput);
      await user.type(typeInput, "Dashcam");

      expect(typeInput.value).toBe("Dashcam");
    });

    it("updates serial number when changed", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      const serialInput = screen.getByTestId(
        "device-serial-1",
      ) as HTMLInputElement;
      await user.type(serialInput, "SN12345");

      expect(serialInput.value).toBe("SN12345");
    });

    it("toggles isByod state when toggle button is clicked", () => {
      renderWithRedux(<Device />, initialDevices);

      const toggleButton = screen.getByTestId("device-toggle-1");
      expect(toggleButton).toHaveTextContent("Toggle BYOD: ON");

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent("Toggle BYOD: OFF");

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent("Toggle BYOD: ON");
    });

    it("updates only the specific device when changed", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      // Change Device 1
      const device1Type = screen.getByTestId(
        "device-type-1",
      ) as HTMLInputElement;
      await user.clear(device1Type);
      await user.type(device1Type, "Modified GPS");

      // Device 1 should be updated
      expect(device1Type.value).toBe("Modified GPS");

      // Device 2 should remain unchanged
      const device2Type = screen.getByTestId(
        "device-type-2",
      ) as HTMLInputElement;
      expect(device2Type.value).toBe("Secondary GPS");
    });

    it("maintains independent state for each device", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      // Update Device 1 serial
      const serial1 = screen.getByTestId("device-serial-1") as HTMLInputElement;
      await user.type(serial1, "SERIAL001");

      // Update Device 2 serial
      const serial2 = screen.getByTestId("device-serial-2") as HTMLInputElement;
      await user.type(serial2, "SERIAL002");

      // Both should have their respective values
      expect(serial1.value).toBe("SERIAL001");
      expect(serial2.value).toBe("SERIAL002");
    });
  });

  describe("Component Structure", () => {
    it("has the correct container structure", () => {
      const { container } = renderWithRedux(<Device />, initialDevices);

      expect(container.querySelector(".device-container")).toBeInTheDocument();
      expect(container.querySelector(".device-content")).toBeInTheDocument();
      expect(container.querySelector(".device-card")).toBeInTheDocument();
    });

    it("has the correct header structure", () => {
      const { container } = renderWithRedux(<Device />, initialDevices);

      expect(
        container.querySelector(".device-card-header"),
      ).toBeInTheDocument();
      expect(container.querySelector(".device-title")).toBeInTheDocument();
      expect(container.querySelector(".device-subtitle")).toBeInTheDocument();
    });

    it("has the correct body structure", () => {
      const { container } = renderWithRedux(<Device />, initialDevices);

      expect(container.querySelector(".device-card-body")).toBeInTheDocument();
    });

    it("renders DeviceRow components in the card body", () => {
      const { container } = renderWithRedux(<Device />, initialDevices);

      const cardBody = container.querySelector(".device-card-body");
      expect(cardBody).toBeInTheDocument();
      expect(cardBody?.children.length).toBe(2);
    });
  });

  describe("Multiple Device Updates", () => {
    it("handles multiple updates to the same device", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      const typeInput = screen.getByTestId("device-type-1") as HTMLInputElement;

      await user.clear(typeInput);
      await user.type(typeInput, "Type1");
      expect(typeInput.value).toBe("Type1");

      await user.clear(typeInput);
      await user.type(typeInput, "Type2");
      expect(typeInput.value).toBe("Type2");
    });

    it("handles updates to multiple fields of the same device", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      // Update type
      const typeInput = screen.getByTestId("device-type-1") as HTMLInputElement;
      await user.clear(typeInput);
      await user.type(typeInput, "New Type");

      // Update serial
      const serialInput = screen.getByTestId(
        "device-serial-1",
      ) as HTMLInputElement;
      await user.type(serialInput, "NEW123");

      // Toggle BYOD
      const toggleButton = screen.getByTestId("device-toggle-1");
      fireEvent.click(toggleButton);

      // All updates should be reflected
      expect(typeInput.value).toBe("New Type");
      expect(serialInput.value).toBe("NEW123");
      expect(toggleButton).toHaveTextContent("Toggle BYOD: OFF");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string updates", async () => {
      const user = userEvent.setup();
      renderWithRedux(<Device />, initialDevices);

      const typeInput = screen.getByTestId("device-type-1") as HTMLInputElement;
      await user.clear(typeInput);

      expect(typeInput.value).toBe("");
    });

    it("renders correctly when devices array is iterated", () => {
      renderWithRedux(<Device />, initialDevices);

      const deviceRows = screen.getAllByText(/Device \d/);
      expect(deviceRows).toHaveLength(2);
    });

    it("each device has a unique key", () => {
      const { container } = renderWithRedux(<Device />, initialDevices);

      const device1 = container.querySelector('[data-testid="device-row-1"]');
      const device2 = container.querySelector('[data-testid="device-row-2"]');

      expect(device1).toBeInTheDocument();
      expect(device2).toBeInTheDocument();
      expect(device1).not.toBe(device2);
    });
  });

  describe("Accessibility", () => {
    it("has a main heading", () => {
      renderWithRedux(<Device />, initialDevices);
      const heading = screen.getByRole("heading", {
        name: "Device Management",
      });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");
    });

    it("subtitle is properly associated with the form", () => {
      renderWithRedux(<Device />, initialDevices);
      expect(
        screen.getByText(/If none, then continue to next step/),
      ).toBeInTheDocument();
    });
  });
});
