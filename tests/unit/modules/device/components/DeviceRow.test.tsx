import { Device } from "@/device/types";
import { DeviceRow } from "@/device/components";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Device Row Tests", () => {
  const mockDevice: Device = {
    id: 1,
    name: "Test Device",
    type: "GPS",
    serialNumber: "SN123",
    isByod: false,
    image: null,
    imagePreviewUrl: undefined,
  };

  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders device name as title", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    expect(screen.getByText("Test Device")).toBeInTheDocument();
  });

  it("renders device type input with correct value", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    const typeInput = screen.getByPlaceholderText("e.g. Primary GPS");
    expect(typeInput).toHaveValue("GPS");
  });

  it("renders serial number input with correct value", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    const serialInput = screen.getByPlaceholderText(
      "Enter the serial number of the device",
    );
    expect(serialInput).toHaveValue("SN123");
  });

  it("disables serial number input when isByod is false", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    const serialInput = screen.getByPlaceholderText(
      "Enter the serial number of the device",
    );
    expect(serialInput).toBeDisabled();
  });

  it("enables serial number input when isByod is true", () => {
    const byodDevice = { ...mockDevice, isByod: true };
    render(<DeviceRow device={byodDevice} onChange={mockOnChange} />);
    const serialInput = screen.getByPlaceholderText(
      "Enter the serial number of the device",
    );
    expect(serialInput).not.toBeDisabled();
  });

  it("renders Toggle component with correct props", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByText("Bringing your own device?")).toBeInTheDocument();
  });

  it("calls onChange when toggle is clicked", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    const toggleButton = screen.getByRole("switch");
    fireEvent.click(toggleButton);

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockDevice,
      isByod: true,
    });
  });

  it("renders FileUpload component", () => {
    const { container } = render(
      <DeviceRow device={mockDevice} onChange={mockOnChange} />,
    );
    const fileUpload = container.querySelector(".file-upload");
    expect(fileUpload).toBeInTheDocument();
  });

  it("calls onChange when file is selected", () => {
    const { container } = render(
      <DeviceRow device={mockDevice} onChange={mockOnChange} />,
    );

    const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        ...mockDevice,
        image: file,
        imagePreviewUrl: expect.stringContaining("blob:"),
      }),
    );
  });

  it("displays help text for BYOD toggle", () => {
    render(<DeviceRow device={mockDevice} onChange={mockOnChange} />);
    expect(
      screen.getByText(/Toggle this on if you're bringing your own device/),
    ).toBeInTheDocument();
  });
});
