import { FileUpload } from "@/device/components";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("File Upload Tests", () => {
  const mockOnFileSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders upload placeholder when no preview", () => {
    render(<FileUpload onFileSelect={mockOnFileSelect} />);
    expect(screen.getByText("Click to upload")).toBeInTheDocument();
  });

  it("renders preview image when previewUrl is provided", () => {
    render(
      <FileUpload onFileSelect={mockOnFileSelect} previewUrl="test.jpg" />,
    );
    const img = screen.getByAltText("Preview");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test.jpg");
  });

  it("shows change text on preview", () => {
    render(
      <FileUpload onFileSelect={mockOnFileSelect} previewUrl="test.jpg" />,
    );
    expect(screen.getByText("Change")).toBeInTheDocument();
  });

  it("calls onFileSelect when file is selected", () => {
    const { container } = render(
      <FileUpload onFileSelect={mockOnFileSelect} />,
    );

    const file = new File(["content"], "image.png", { type: "image/png" });
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
  });

  it("triggers file input click when container is clicked", () => {
    const { container } = render(
      <FileUpload onFileSelect={mockOnFileSelect} />,
    );

    const fileUploadDiv = container.querySelector(".file-upload");
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const clickSpy = vi.spyOn(input, "click");
    fireEvent.click(fileUploadDiv!);

    expect(clickSpy).toHaveBeenCalled();
  });

  it("does not trigger click when disabled", () => {
    const { container } = render(
      <FileUpload onFileSelect={mockOnFileSelect} disabled />,
    );

    const fileUploadDiv = container.querySelector(".file-upload");
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const clickSpy = vi.spyOn(input, "click");
    fireEvent.click(fileUploadDiv!);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it("applies disabled styles when disabled", () => {
    const { container } = render(
      <FileUpload onFileSelect={mockOnFileSelect} disabled />,
    );

    const fileUploadDiv = container.querySelector(".file-upload");
    expect(fileUploadDiv).toHaveClass("file-upload--disabled");
  });

  it("applies preview styles when previewUrl exists", () => {
    const { container } = render(
      <FileUpload onFileSelect={mockOnFileSelect} previewUrl="test.jpg" />,
    );

    const fileUploadDiv = container.querySelector(".file-upload");
    expect(fileUploadDiv).toHaveClass("file-upload--has-preview");
  });

  it("accepts only image files", () => {
    const { container } = render(
      <FileUpload onFileSelect={mockOnFileSelect} />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input).toHaveAttribute("accept", "image/*");
  });
});
