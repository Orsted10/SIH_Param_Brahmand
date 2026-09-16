/**
 * Detects whether user prefers reduced motion
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Subscribes to changes in prefers-reduced-motion
 */
export function subscribeToReducedMotion(
  onChange: (reduced: boolean) => void
): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (e: MediaQueryListEvent) => onChange(e.matches);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  } else {
    // Legacy fallback
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }
}
