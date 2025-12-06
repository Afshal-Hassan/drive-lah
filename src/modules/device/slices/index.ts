import { Device } from "@/device/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_DEVICES: Device[] = [
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

interface DeviceState {
  items: Device[];
}

const INITIAL_STATE: DeviceState = {
  items: INITIAL_DEVICES,
};

const deviceSlice = createSlice({
  name: "device",
  initialState: INITIAL_STATE,
  reducers: {
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.items.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    resetDevices: (state) => {
      state.items = INITIAL_DEVICES;
    },
  },
});

export const { updateDevice, resetDevices } = deviceSlice.actions;
export default deviceSlice.reducer;
