import { ImageryKind, AssetStatus } from "@/types/imagery";

/**
 * Formats byte size into human-readable scientific units (B, KB, MB, GB)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const safeIndex = Math.min(i, sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, safeIndex)).toFixed(dm))} ${sizes[safeIndex]}`;
}

/**
 * Categorizes an uploaded file based on its extension and MIME type
 */
export function classifyFile(file: File): {
  kind: ImageryKind;
  status: AssetStatus;
  statusMessage?: string;
  isPreviewable: boolean;
} {
  const name = file.name.toLowerCase();
  const mime = file.type.toLowerCase();

  // TIFF / GeoTIFF detection
  if (
    name.endsWith(".tif") ||
    name.endsWith(".tiff") ||
    mime.includes("tiff") ||
    mime.includes("geotiff")
  ) {
    return {
      kind: "GEOTIFF",
      status: "UNSUPPORTED_PREVIEW",
      statusMessage: "Raster parsing will be enabled in the ingestion engine.",
      isPreviewable: false,
    };
  }

  // Standard web image formats (Optical)
  if (
    mime.startsWith("image/png") ||
    mime.startsWith("image/jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg")
  ) {
    return {
      kind: "OPTICAL_IMAGE",
      status: "READY",
      isPreviewable: true,
    };
  }

  // Fallback for unclassified files
  return {
    kind: "UNKNOWN",
    status: "UNSUPPORTED_PREVIEW",
    statusMessage: "Format requires server-side raster decoders.",
    isPreviewable: false,
  };
}

/**
 * Extracts width and height from browser-supported image files
 */
export function extractImageDimensions(
  file: File
): Promise<{ width: number; height: number } | undefined> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.type.includes("tiff")) {
      resolve(undefined);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      resolve(undefined);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
}

/**
 * Object URL lifecycle manager to guarantee zero memory leaks
 */
class ObjectUrlManager {
  private activeUrls: Set<string> = new Set();

  public create(file: File): string {
    const url = URL.createObjectURL(file);
    this.activeUrls.add(url);
    return url;
  }

  public revoke(url: string | null): void {
    if (!url) return;
    if (this.activeUrls.has(url)) {
      URL.revokeObjectURL(url);
      this.activeUrls.delete(url);
    }
  }

  public revokeAll(): void {
    this.activeUrls.forEach((url) => URL.revokeObjectURL(url));
    this.activeUrls.clear();
  }
}

export const urlManager = new ObjectUrlManager();
