export type NavigationTab = 
  | 'hero' 
  | 'mission-control' 
  | 'crises' 
  | 'physics-lab' 
  | 'execution-trace' 
  | 'dharma-gate' 
  | 'ndma-sop';

export type IndianLanguage = 
  | 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'gu' | 'pa' | 'or' | 'kn' | 'ml' | 'as' | 'ur' | 'sd' | 'ks' | 'ne' | 'kok' | 'doi' | 'mni' | 'sat' | 'mai' | 'brx';

export interface LanguageMeta {
  code: IndianLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface NavagrahaEngine {
  id: string;
  name: string;
  role: string;
  deityAnalogy: string;
  sensor: string;
  accuracy: string;
  iconName: string;
  description: string;
  active: boolean;
}

export interface PhysicalIndices {
  ndvi: number;   // Normalized Difference Vegetation Index
  ndwi: number;   // Normalized Difference Water Index
  mndwi: number;  // Modified NDWI (urban water)
  ndbi: number;   // Normalized Difference Built-up Index
  evi: number;    // Enhanced Vegetation Index
  savi: number;   // Soil Adjusted Vegetation Index
  bsi: number;    // Bare Soil Index
  ndre: number;   // Red Edge Chlorophyll
  nbr: number;    // Normalized Burn Ratio
  ndti: number;   // Tillage Index (crop stubble)
  cr: number;     // Cross-polarization ratio (VH/VV)
  dpd: number;    // Soil roughness index
  rvi: number;    // Radar Vegetation Index
  oswi: number;   // Fused Optical-SAR Standing Water Index
  glcm: number;   // Texture contrast
  slope: number;  // DEM Slope in degrees
}

export interface YamaguchiDecomposition {
  surfacePower: number;   // Ps (flat single bounce)
  doubleBouncePower: number; // Pd (corner bounce/flooded trunks)
  volumePower: number;    // Pv (foliage canopy)
  helixPower: number;     // Ph (asymmetric metal)
  deorientationAngle: number; // theta_rot in degrees
  totalSpan: number;      // Trace(T3)
}

export interface RVoGInversion {
  coherence: number;     // gamma(w)
  verticalWavenumber: number; // kz (rad/m)
  treeHeightMeters: number;   // hv (meters)
  subCanopyWaterDetected: boolean;
}

export interface MESMAUnmix {
  cropFraction: number;
  waterFraction: number;
  builtFraction: number;
  soilFraction: number;
}

export interface PhysicsManifold128D {
  yamaguchi: YamaguchiDecomposition;
  rvog: RVoGInversion;
  mesma: MESMAUnmix;
  indices: PhysicalIndices;
}

export interface TieredCaption {
  executiveBrief: string;
  tacticalGisReport: string;
  forensicPhysicsBrief: string;
  sensorTelemetry: string;
}

export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: Record<string, any>;
}

export interface JSONExecutionTraceNode {
  step: number;
  timestamp: string;
  agent: string;
  action: string;
  decisionReason: string;
  confidence: number;
  status: 'PENDING' | 'EXECUTING' | 'VERIFIED' | 'REJECTED';
  outputSnippet: string;
}

export interface ISROExecutionTrace {
  queryId: string;
  userQuery: string;
  inputScope: 'Single-Image' | 'Cross-Modal Pair' | 'Bi-Temporal Pair';
  selectedSatellites: string[];
  mctsPlannerNodes: JSONExecutionTraceNode[];
  physicsFirewallPassed: boolean;
  totalLatencyMs: number;
  groundingIoU: number;
  calibrationECE: number;
}

export interface NDMASOPDirective {
  disasterType: string;
  affectedRegion: string;
  severityLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MONITORING';
  blockedHighways: string[];
  isolatedVillagesCount: number;
  trappedPopulationEstimate: number;
  safeHelicopterLandingZones: Array<{ name: string; lat: number; lng: number; capacity: string }>;
  recommendedActionPlan: string[];
  timestamp: string;
}

export interface CrisisCaseStudy {
  id: string;
  title: string;
  region: string;
  state: string;
  crisisType: string;
  satelliteModalities: string[];
  problemDescription: string;
  whyStandardAiFails: string;
  paramBrahmandSolution: string;
  assignedEngineId: string;
  opticalImageUrl: string;
  radarOrSecondaryImageUrl: string;
  demSlopeMapUrl?: string;
  sampleQueries: string[];
  samplePhysicsManifold: PhysicsManifold128D;
  sampleSop: NDMASOPDirective;
  sampleGeoJson: GeoJsonFeature;
}
