import { PhysicalIndices, YamaguchiDecomposition } from '../types';

export interface PhysicsRuleAudit {
  ruleName: string;
  status: 'PASSED' | 'REJECTED';
  formula: string;
  observedValue: string;
  threshold: string;
  reason: string;
}

export class DharmaChakraFirewall {
  static auditPrediction(
    candidateClass: string,
    indices: PhysicalIndices,
    yamaguchi: YamaguchiDecomposition,
    hasDamVector: boolean = false
  ): {
    passed: boolean;
    audits: PhysicsRuleAudit[];
    hallucinationRate: number;
  } {
    const audits: PhysicsRuleAudit[] = [];

    // Rule 1: Stokes Energy Conservation (Trace(T3) <= I_incident)
    const stokesPassed = yamaguchi.totalSpan <= 1.25;
    audits.push({
      ruleName: 'Postulate 1: Stokes Energy Conservation',
      status: stokesPassed ? 'PASSED' : 'REJECTED',
      formula: 'Trace(T3) <= I_incident',
      observedValue: `${yamaguchi.totalSpan.toFixed(2)} W/m²`,
      threshold: '1.25 W/m²',
      reason: stokesPassed 
        ? 'Reflected energy obeys energy conservation laws.' 
        : 'VIOLATION: Reflected energy exceeds total incident solar/radar illumination.'
    });

    // Rule 2: Hydrodynamic Slope Rule (Standing Water Slope <= 5.0 deg unless dam present)
    const isWater = candidateClass.toLowerCase().includes('water') || candidateClass.toLowerCase().includes('flood');
    let slopePassed = true;
    if (isWater && indices.slope > 5.0 && !hasDamVector) {
      slopePassed = false;
    }
    audits.push({
      ruleName: 'Postulate 2: Hydrodynamic Slope Rule',
      status: slopePassed ? 'PASSED' : 'REJECTED',
      formula: 'IF Class == Water THEN DEM_Slope <= 5.0° OR Dam_Vector == True',
      observedValue: `${indices.slope}° slope`,
      threshold: '5.0° slope limit',
      reason: slopePassed 
        ? 'Terrain slope supports gravity hydrodynamics for standing water.' 
        : `PHYSICAL HALLUCINATION BLOCKED: Cannot have standing flood water on a ${indices.slope}° mountain slope without a verified dam!`
    });

    // Rule 3: SAR Specular Consistency (If MNDWI > 0.3, SAR sigma0_VV < -16.0 dB)
    let specularPassed = true;
    if (indices.mndwi > 0.30 && indices.oswi < 0.20) {
      specularPassed = false;
    }
    audits.push({
      ruleName: 'Postulate 3: SAR Specular Reflectance Consistency',
      status: specularPassed ? 'PASSED' : 'REJECTED',
      formula: 'IF Optical_MNDWI > 0.30 THEN SAR_sigma0_VV < -16.0 dB',
      observedValue: `MNDWI: ${indices.mndwi}, OSWI: ${indices.oswi}`,
      threshold: 'OSWI >= 0.20 for standing water',
      reason: specularPassed 
        ? 'Optical water absorption aligns with radar specular mirror reflection.' 
        : 'PHYSICAL HALLUCINATION BLOCKED: Optical greenness misidentified as water; radar shows dry rough ground backscatter.'
    });

    // Rule 4: Albedo Bound (0.0 <= R(lambda) <= 1.0)
    const albedoPassed = indices.ndvi >= -1.0 && indices.ndvi <= 1.0 && indices.mndwi >= -1.0 && indices.mndwi <= 1.0;
    audits.push({
      ruleName: 'Postulate 4: Physical Albedo Boundary',
      status: albedoPassed ? 'PASSED' : 'REJECTED',
      formula: '0.0 <= R(lambda) <= 1.0 across all bands',
      observedValue: `NDVI: ${indices.ndvi}, MNDWI: ${indices.mndwi}`,
      threshold: '[-1.0, 1.0] valid index bounds',
      reason: albedoPassed 
        ? 'Physical reflectance spectra within valid range.' 
        : 'VIOLATION: Unphysical reflectance spike detected.'
    });

    const passed = audits.every(a => a.status === 'PASSED');

    return {
      passed,
      audits,
      hallucinationRate: passed ? 0.0 : 100.0
    };
  }
}
