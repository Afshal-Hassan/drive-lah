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

const deviceSlice = createSlice({
  name: "device",
  initialState: INITIAL_DEVICES,
  reducers: {
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    resetDevices: () => {
      return INITIAL_DEVICES;
    },
  },
});

export const { updateDevice, resetDevices } = deviceSlice.actions;
export default deviceSlice.reducer;
