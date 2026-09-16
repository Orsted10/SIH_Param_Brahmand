import { describe, it, expect } from "vitest";
import { formatBytes, classifyFile } from "@/lib/files/fileUtils";

describe("File Utilities", () => {
  it("formats byte sizes correctly", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1048576)).toBe("1 MB");
    expect(formatBytes(5242880)).toBe("5 MB");
    expect(formatBytes(1073741824)).toBe("1 GB");
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
  });

  it("classifies TIFF files as GeoTIFF with unsupported preview flag", () => {
    const mockTiff = {
      name: "cartosat_scene.tif",
      type: "image/tiff",
      size: 15000000,
    } as unknown as File;

    const res = classifyFile(mockTiff);
    expect(res.kind).toBe("GEOTIFF");
    expect(res.status).toBe("UNSUPPORTED_PREVIEW");
    expect(res.isPreviewable).toBe(false);
    expect(res.statusMessage).toContain("Raster parsing will be enabled");
  });

  it("classifies PNG and JPEG as Optical image with ready preview", () => {
    const mockPng = {
      name: "rgb_composite.png",
      type: "image/png",
      size: 2000000,
    } as unknown as File;

    const resPng = classifyFile(mockPng);
    expect(resPng.kind).toBe("OPTICAL_IMAGE");
    expect(resPng.status).toBe("READY");
    expect(resPng.isPreviewable).toBe(true);

    const mockJpg = {
      name: "sentinel_patch.jpg",
      type: "image/jpeg",
      size: 1200000,
    } as unknown as File;

    const resJpg = classifyFile(mockJpg);
    expect(resJpg.kind).toBe("OPTICAL_IMAGE");
    expect(resJpg.status).toBe("READY");
    expect(resJpg.isPreviewable).toBe(true);
  });

  it("classifies unknown file formats gracefully", () => {
    const mockTxt = {
      name: "notes.txt",
      type: "text/plain",
      size: 500,
    } as unknown as File;

    const resTxt = classifyFile(mockTxt);
    expect(resTxt.kind).toBe("UNKNOWN");
    expect(resTxt.status).toBe("UNSUPPORTED_PREVIEW");
    expect(resTxt.isPreviewable).toBe(false);
  });
});
