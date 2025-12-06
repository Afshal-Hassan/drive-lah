import Toggle from "./Toggle";
import FileUpload from "./FileUpload";
import { memo, useCallback } from "react";
import { Device } from "@/device/types";

interface DeviceRowProps {
  device: Device;
  onChange: (updatedDevice: Device) => void;
}

function DeviceRow({ device, onChange }: DeviceRowProps) {
  const handleInputChange = useCallback(
    (field: keyof Device, value: unknown) => {
      onChange({ ...device, [field]: value });
    },
    [device, onChange],
  );

  const handleFileSelect = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      onChange({ ...device, image: file, imagePreviewUrl: url });
    },
    [device, onChange],
  );

  return (
    <div className="device-row">
      <h3 className="device-row__title">{device.name}</h3>

      <div className="device-row__grid">
        <div className="device-row__column">
          <div className="device-row__field">
            <label className="device-row__label">Device type</label>
            <input
              type="text"
              value={device.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="device-row__input"
              placeholder="e.g. Primary GPS"
            />
          </div>

          <div className="device-row__field">
            <label className="device-row__label">Serial number</label>
            <input
              type="text"
              value={device.serialNumber}
              onChange={(e) =>
                handleInputChange("serialNumber", e.target.value)
              }
              disabled={!device.isByod}
              className={`device-row__input ${!device.isByod ? "device-row__input--disabled" : ""}`}
              placeholder="Enter the serial number of the device"
            />
          </div>
        </div>

        <div className="device-row__column">
          <div className="device-row__field">
            <div className="device-row__toggle-wrapper">
              <Toggle
                label="Bringing your own device?"
                checked={device.isByod}
                onChange={(val) => handleInputChange("isByod", val)}
              />
            </div>
            <p className="device-row__help-text">
              Toggle this on if you're bringing your own device. Leave it off if
              Drive mate is to provide the device.
            </p>
          </div>

          <div className="device-row__field">
            <label className="device-row__label">
              Upload an image of the device
            </label>
            <FileUpload
              onFileSelect={handleFileSelect}
              previewUrl={device.imagePreviewUrl}
              disabled={!device.isByod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DeviceRow);
