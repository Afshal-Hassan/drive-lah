export interface Device {
  id: number;
  name: string;
  type: string;
  isByod: boolean;
  serialNumber: string;
  image: File | null;
  imagePreviewUrl?: string;
}
