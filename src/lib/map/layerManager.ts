export type StandardLayerId = "BASEMAP" | "STUDY_POINT";

export interface MapLayerDefinition {
  id: StandardLayerId | string;
  name: string;
  type: "raster" | "vector" | "geojson" | "marker";
  visible: boolean;
  opacity: number;
}

export class MapLayerManager {
  private layers: Map<string, MapLayerDefinition> = new Map();
  private listeners: Set<(layers: MapLayerDefinition[]) => void> = new Set();

  constructor() {
    // Initial Phase 01 active layers
    this.registerLayer({
      id: "BASEMAP",
      name: "OpenFreeMap Liberty Basemap",
      type: "raster",
      visible: true,
      opacity: 1.0,
    });
    this.registerLayer({
      id: "STUDY_POINT",
      name: "Selected Study Point Target",
      type: "marker",
      visible: true,
      opacity: 1.0,
    });
  }

  public registerLayer(layer: MapLayerDefinition): void {
    this.layers.set(layer.id, { ...layer });
    this.notify();
  }

  public removeLayer(id: string): void {
    this.layers.delete(id);
    this.notify();
  }

  public toggleLayer(id: string): void {
    const layer = this.layers.get(id);
    if (layer) {
      layer.visible = !layer.visible;
      this.notify();
    }
  }

  public setLayerOpacity(id: string, opacity: number): void {
    const layer = this.layers.get(id);
    if (layer) {
      layer.opacity = Math.max(0, Math.min(1, opacity));
      this.notify();
    }
  }

  public getLayers(): MapLayerDefinition[] {
    return Array.from(this.layers.values());
  }

  public subscribe(callback: (layers: MapLayerDefinition[]) => void): () => void {
    this.listeners.add(callback);
    callback(this.getLayers());
    return () => this.listeners.delete(callback);
  }

  private notify(): void {
    const current = this.getLayers();
    this.listeners.forEach((fn) => fn(current));
  }
}

export const layerManager = new MapLayerManager();
