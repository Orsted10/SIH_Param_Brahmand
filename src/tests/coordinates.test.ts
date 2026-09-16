import { describe, it, expect } from "vitest";
import {
  formatLatitude,
  formatLongitude,
  formatCoordinates,
  normalizeLongitude,
  clampLatitude,
} from "@/lib/utils/coordinates";

describe("Geospatial Coordinate Formatting", () => {
  it("formats positive latitudes as North", () => {
    expect(formatLatitude(20.5937, 4)).toBe("20.5937° N");
    expect(formatLatitude(0, 2)).toBe("0.00° N");
  });

  it("formats negative latitudes as South", () => {
    expect(formatLatitude(-34.6037, 4)).toBe("34.6037° S");
  });

  it("formats positive longitudes as East", () => {
    expect(formatLongitude(78.9629, 4)).toBe("78.9629° E");
    expect(formatLongitude(0, 2)).toBe("0.00° E");
  });

  it("formats negative longitudes as West", () => {
    expect(formatLongitude(-122.4194, 4)).toBe("122.4194° W");
  });

  it("formats full latitude, longitude pair", () => {
    expect(formatCoordinates(20.5937, 78.9629, 4)).toBe("20.5937° N, 78.9629° E");
  });

  it("normalizes longitudes to [-180, 180]", () => {
    expect(normalizeLongitude(190)).toBe(-170);
    expect(normalizeLongitude(-190)).toBe(170);
    expect(normalizeLongitude(78.96)).toBeCloseTo(78.96);
  });

  it("clamps latitudes to [-90, 90]", () => {
    expect(clampLatitude(95)).toBe(90);
    expect(clampLatitude(-105)).toBe(-90);
    expect(clampLatitude(20.59)).toBe(20.59);
  });
});
