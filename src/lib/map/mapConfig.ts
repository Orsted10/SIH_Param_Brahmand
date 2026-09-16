import { MapProviderConfig, Coordinate } from "@/types/map";

export const DEFAULT_STUDY_COORDINATE: Coordinate = {
  latitude: 20.5937,
  longitude: 78.9629,
  label: "INDIA · DEFAULT STUDY REGION",
};

export const MAP_CONFIG: MapProviderConfig = {
  provider: "OpenFreeMap",
  styleUrl: "https://tiles.openfreemap.org/styles/liberty",
  attribution: "© OpenStreetMap contributors, OpenFreeMap",
  defaultCenter: [DEFAULT_STUDY_COORDINATE.longitude, DEFAULT_STUDY_COORDINATE.latitude],
  defaultZoom: 4.2,
};
