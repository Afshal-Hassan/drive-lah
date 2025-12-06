import { useCallback, useEffect } from "react";
import storage from "redux-persist/lib/storage";
import { Device as DeviceType } from "@/device/types";
import { updateDevice, resetDevices } from "@/device/slices";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/shared/hooks";
import { useNavigate } from "react-router-dom";

export default function useDevice() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => state.device.items);
  const { selectedPlan } = useAppSelector((state) => state.subscription);

  useEffect(() => {
    if (selectedPlan === null) {
      navigate("/", { replace: true });
    }
  }, [selectedPlan, navigate]);

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
