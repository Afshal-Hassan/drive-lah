import { useCallback } from "react";
import { Device as DeviceType } from "@/device/types";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/shared/hooks";
import { updateDevice, resetDevices } from "@/device/slices";

export default function useDevice() {
  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => state.device);

  const deviceRef = useClickOutside<HTMLDivElement>(() => {
    dispatch(resetDevices());
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
