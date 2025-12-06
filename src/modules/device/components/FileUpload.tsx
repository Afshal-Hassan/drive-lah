import React, { memo, useRef } from "react";

interface FileUploadProps {
  disabled?: boolean;
  previewUrl?: string;
  onFileSelect: (file: File) => void;
}

function FileUpload({
  onFileSelect,
  previewUrl,
  disabled = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`file-upload ${disabled ? "file-upload--disabled" : ""} ${previewUrl ? "file-upload--has-preview" : ""}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="file-upload__input"
        accept="image/*"
        disabled={disabled}
      />

      {previewUrl ? (
        <div className="file-upload__preview">
          <img src={previewUrl} alt="Preview" className="file-upload__image" />
          <div className="file-upload__overlay">
            <span className="file-upload__change-text">Change</span>
          </div>
        </div>
      ) : (
        <div className="file-upload__placeholder">
          <p
            className={`file-upload__upload-text ${disabled ? "file-upload__upload-text--disabled" : ""}`}
          >
            Click to upload
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(FileUpload);
