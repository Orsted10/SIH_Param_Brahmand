import { NDMASOPDirective } from '../types';

export class NDMASopGenerator {
  static generateSop(
    crisisTitle: string,
    region: string,
    severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MONITORING',
    highways: string[],
    isolatedVillages: number,
    trappedPopulation: number,
    helipads: Array<{ name: string; lat: number; lng: number; capacity: string }>
  ): NDMASOPDirective {
    return {
      disasterType: crisisTitle.toUpperCase(),
      affectedRegion: region,
      severityLevel: severity,
      blockedHighways: highways,
      isolatedVillagesCount: isolatedVillages,
      trappedPopulationEstimate: trappedPopulation,
      safeHelicopterLandingZones: helipads,
      recommendedActionPlan: [
        `IMMEDIATE DISASTER DIRECTIVE [NDMA ACT 2005 SECTION 35]:`,
        `1. Dispatch National Disaster Response Force (NDRF) teams to ${region}.`,
        `2. Establish emergency air bridge at ${helipads[0]?.name || 'Primary Base Helipad'} (Coords: ${helipads[0]?.lat || 0}°N, ${helipads[0]?.lng || 0}°E).`,
        `3. Deliver food supplies, medical kits, and satellite phones to ${isolatedVillages} isolated hamlets.`,
        `4. Block traffic on ${highways.join(', ') || 'affected corridors'} immediately.`
      ],
      timestamp: new Date().toISOString()
    };
  }

  static exportAsGeoJson(sop: NDMASOPDirective) {
    const geoJson = {
      type: 'FeatureCollection',
      properties: {
        disasterType: sop.disasterType,
        severity: sop.severityLevel,
        generatedAt: sop.timestamp,
        compliance: '100% NDMA Disaster Management Act 2005'
      },
      features: sop.safeHelicopterLandingZones.map(h => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [h.lng, h.lat]
        },
        properties: {
          name: h.name,
          capacity: h.capacity,
          type: 'Helicopter Landing Zone (HLZ)'
        }
      }))
    };

    const blob = new Blob([JSON.stringify(geoJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NDMA_SOP_${sop.affectedRegion.replace(/\s+/g, '_')}_${Date.now()}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
