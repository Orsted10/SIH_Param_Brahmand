# ASSETS & ATTRIBUTION LOG

**System:** PARAM-BRAHMAND / VISHWAROOPA-AI  
**Smart India Hackathon 2026** | **Problem Statement ID: SIH26167**  
**Organization:** ISRO / Department of Space

---

## 1. Basemap & Cartographic Data

| Asset Name | Provider / Source | License | Usage in Phase 01 |
|---|---|---|---|
| OpenFreeMap Liberty Style | [OpenFreeMap](https://openfreemap.org) | Open Database License (ODbL) / Open Data | Vector basemap tiles for real geographical rendering (`src/lib/map/mapConfig.ts`) |
| OpenStreetMap Map Data | [OpenStreetMap Contributors](https://www.openstreetmap.org) | Open Data Commons Open Database License (ODbL) | Fundamental geospatial road, water, terrain features |

---

## 2. Visual & Shader Assets

| Asset Name | Provider / Source | License | Usage in Phase 01 |
|---|---|---|---|
| Procedural Earth Shader | Developed in-house for Param Brahmand (`PlanetaryGlobe.tsx`) | MIT / Open Source | Dynamic GPU-based continental elevation, ocean depth, night-side terminator, and atmospheric Rayleigh glow without downloading bulky proprietary texture maps |
| Lucide Icons | [Lucide](https://lucide.dev) | ISC License | Spacecraft instrument iconography |

---

## 3. Scientific Honesty & Data Declaration

- No copyrighted or proprietary ISRO satellite datasets are bundled in Phase 01.
- All remote sensing raster parsing hooks (`GEOTIFF`, `SAR_IMAGE`, `OPTICAL_IMAGE`) are structured to accept authentic client-ingested imagery.
