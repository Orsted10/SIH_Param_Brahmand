export interface Coordinate {
  latitude: number;
  longitude: number;
  label?: string;
}

export interface MapViewport {
  center: [number, number]; // [lng, lat]
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface MapProviderConfig {
  provider: string;
  styleUrl: string;
  attribution: string;
  defaultCenter: [number, number]; // [lng, lat]
  defaultZoom: number;
}
