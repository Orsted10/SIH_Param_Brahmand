export type ImageryKind =
  | "OPTICAL_IMAGE"
  | "SAR_IMAGE"
  | "MULTISPECTRAL"
  | "GEOTIFF"
  | "UNKNOWN";

export type AssetStatus =
  | "LOCAL"
  | "READY"
  | "UNSUPPORTED_PREVIEW"
  | "ERROR";

export interface ImageryAsset {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  lastModified: number;
  kind: ImageryKind;
  previewUrl: string | null;
  status: AssetStatus;
  dimensions?: {
    width: number;
    height: number;
  };
  createdAt: string;
  statusMessage?: string;
}
