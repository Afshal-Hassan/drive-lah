import { useDevice } from "@/device/hooks";
import { DeviceRow } from "@/device/components";

export default function Device() {
  const { devices, deviceRef, handleDeviceChange } = useDevice();

  return (
    <div className="device-container" ref={deviceRef}>
      <div className="device-content">
        <div className="device-card">
          <div className="device-card-header">
            <h1 className="device-title">Device Management</h1>
            <p className="device-subtitle">
              Add details of the device, if any already installed on your car.
              If none, then continue to next step.
            </p>
          </div>

          <div className="device-card-body">
            {devices.map((device) => (
              <DeviceRow
                key={device.id}
                device={device}
                onChange={handleDeviceChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
