export interface WebGLDiagnosticInfo {
  supported: boolean;
  renderer: string;
  vendor: string;
}

/**
 * Accurately detects WebGL 1/2 availability using offscreen canvas context
 */
export function detectWebGLSupport(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Returns detailed diagnostic information about the GPU / WebGL context
 */
export function getWebGLDiagnostics(): WebGLDiagnosticInfo {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { supported: false, renderer: "N/A (SSR)", vendor: "N/A (SSR)" };
  }
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      return { supported: false, renderer: "Unavailable", vendor: "Unavailable" };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR);

    return {
      supported: true,
      renderer: String(renderer || "Standard WebGL"),
      vendor: String(vendor || "Standard Vendor"),
    };
  } catch {
    return { supported: false, renderer: "Error Detecting", vendor: "Error Detecting" };
  }
}
