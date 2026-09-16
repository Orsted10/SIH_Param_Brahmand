import { describe, it, expect } from "vitest";
import { detectWebGLSupport, getWebGLDiagnostics } from "@/lib/browser/webgl";

describe("WebGL Detection Utilities", () => {
  it("detectWebGLSupport returns a boolean", () => {
    const supported = detectWebGLSupport();
    expect(typeof supported).toBe("boolean");
  });

  it("getWebGLDiagnostics returns structured info", () => {
    const diag = getWebGLDiagnostics();
    expect(diag).toHaveProperty("supported");
    expect(diag).toHaveProperty("renderer");
    expect(diag).toHaveProperty("vendor");
    expect(typeof diag.supported).toBe("boolean");
    expect(typeof diag.renderer).toBe("string");
    expect(typeof diag.vendor).toBe("string");
  });
});
