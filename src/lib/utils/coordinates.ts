/**
 * Scientific Coordinate Formatting Utilities
 * Standard: Latitude first, Longitude second, with N/S/E/W indicators.
 * E.g. "20.5937° N, 78.9629° E"
 */

export function formatLatitude(lat: number, decimals: number = 4): string {
  const dir = lat >= 0 ? "N" : "S";
  const abs = Math.abs(lat).toFixed(decimals);
  return `${abs}° ${dir}`;
}

export function formatLongitude(lng: number, decimals: number = 4): string {
  const dir = lng >= 0 ? "E" : "W";
  const abs = Math.abs(lng).toFixed(decimals);
  return `${abs}° ${dir}`;
}

export function formatCoordinates(
  lat: number,
  lng: number,
  decimals: number = 4
): string {
  return `${formatLatitude(lat, decimals)}, ${formatLongitude(lng, decimals)}`;
}

/**
 * Normalizes longitude to [-180, 180] range
 */
export function normalizeLongitude(lng: number): number {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}

/**
 * Clamps latitude to [-90, 90] range
 */
export function clampLatitude(lat: number): number {
  return Math.max(-90, Math.min(90, lat));
}
