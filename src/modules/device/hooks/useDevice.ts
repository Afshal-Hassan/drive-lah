import { useCallback } from "react";
import storage from "redux-persist/lib/storage";
import { Device as DeviceType } from "@/device/types";
import { updateDevice, resetDevices } from "@/device/slices";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/shared/hooks";

export default function useDevice() {
  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => state.device.items);

  const deviceRef = useClickOutside<HTMLDivElement>(async () => {
    dispatch(resetDevices());
    await storage.removeItem("persist:devices");
  });

  const handleDeviceChange = useCallback(
    (updatedDevice: DeviceType) => {
      dispatch(updateDevice(updatedDevice));
    },
    [dispatch],
  );

  return {
    devices,
    deviceRef,
    handleDeviceChange,
  };
}
