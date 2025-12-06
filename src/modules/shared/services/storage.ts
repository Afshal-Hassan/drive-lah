// services/storage.ts
import { SubscriptionState } from "../../subscription/types";
import { Device } from "@/device/types";

const SUBSCRIPTION_STORAGE_KEY = "drive_lah_subscription_data_v1";
const DEVICE_STORAGE_KEY = "drive_lah_device_data_v1";

const DEFAULT_SUBSCRIPTION_STATE: SubscriptionState = {
  selectedPlan: null,
  addOns: {
    gps: false,
    insurance: false,
  },
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const DEFAULT_DEVICE_STATE: Device[] = [
  {
    id: 1,
    name: "Device 1",
    type: "Primary GPS",
    isByod: true,
    serialNumber: "",
    image: null,
  },
  {
    id: 2,
    name: "Device 2",
    type: "Secondary GPS",
    isByod: true,
    serialNumber: "",
    image: null,
  },
];

// Subscription functions
export const saveState = (state: SubscriptionState): void => {
  try {
    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state to localStorage", error);
  }
};

export const loadState = (): SubscriptionState => {
  try {
    const serializedState = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (serializedState === null) {
      return DEFAULT_SUBSCRIPTION_STATE;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage", error);
    return DEFAULT_SUBSCRIPTION_STATE;
  }
};

export const clearState = (): void => {
  try {
    localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear state:", error);
  }
};

export const saveDeviceState = (devices: Device[]): void => {
  try {
    localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(devices));
  } catch (error) {
    console.error("Error saving device state to localStorage", error);
  }
};

export const loadDeviceState = (): Device[] => {
  try {
    const serializedState = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (serializedState === null) {
      return DEFAULT_DEVICE_STATE;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading device state from localStorage", error);
    return DEFAULT_DEVICE_STATE;
  }
};

export const clearDeviceState = (): void => {
  try {
    localStorage.removeItem(DEVICE_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear device state:", error);
  }
};
