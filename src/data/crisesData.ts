import { CrisisCaseStudy, NavagrahaEngine, LanguageMeta } from '../types';

export const INDIAN_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'கன்னடா', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', flag: '🇮🇳' }
];

export const NAVAGRAHA_ENGINES: NavagrahaEngine[] = [
  {
    id: 'bhoomi-optical',
    name: 'Bhoomi-Optical',
    role: 'Sub-Decimeter Vision & Density Counting',
    deityAnalogy: 'The Earth Watcher (भूमि)',
    sensor: 'Cartosat-3 (0.28m), Cartosat-2S (0.65m), Sentinel-2',
    accuracy: '93.8% Cartosat VQA Accuracy',
    iconName: 'Eye',
    description: 'Replaces boxy NMS bounding boxes with Scale-Aware Density Fields (SADF) to accurately count 500+ packed vehicles in military convoys or solar arrays.',
    active: true
  },
  {
    id: 'kaal-radar',
    name: 'Kaal-Radar',
    role: 'All-Weather C/L-Band Sub-Canopy Radar',
    deityAnalogy: 'The Darkness Piercer (काल)',
    sensor: 'RISAT-1A (EOS-04), RISAT-2B, NISAR, Sentinel-1',
    accuracy: '97.2% Sub-Canopy Flood Precision',
    iconName: 'Radio',
    description: 'Penetrates 100% monsoon storm clouds and jungle foliage using RVoG PolInSAR polarimetry to detect double-bounce flood spikes (Pd > +6 dB).',
    active: true
  },
  {
    id: 'surya-caption',
    name: 'Surya-Caption',
    role: '4-Tier Automated Scene Describer',
    deityAnalogy: 'The Illuminator (सूर्य)',
    sensor: 'Multimodal Optical + SAR Fusion',
    accuracy: '138.4 CIDEr (+16.8% over SOTA)',
    iconName: 'FileText',
    description: 'Generates structured 4-tier briefs: Executive Brief, Tactical GIS Report, Forensic Physics Brief, and Sensor Telemetry.',
    active: true
  },
  {
    id: 'sparsh-grounding',
    name: 'Sparsh-Grounding',
    role: 'Sub-Pixel WGS84 GeoJSON Delineator',
    deityAnalogy: 'The Precision Touch (स्पर्श)',
    sensor: 'Cartosat / SAM-Geo-Zero Sub-Pixel',
    accuracy: '84.6% IoU@0.5 (<0.2 px RMSE)',
    iconName: 'BoxSelect',
    description: 'Extracts exact court-admissible WGS84 GeoJSON polygon vectors for winding rivers, illegal sand mines, and damaged structures.',
    active: true
  },
  {
    id: 'samay-change',
    name: 'Samay-Change',
    role: '4D Bi-Temporal Change Detector',
    deityAnalogy: 'The Time Tracker (समय)',
    sensor: 'Bi-Temporal Pairs (T1 & T2)',
    accuracy: '0.924 F1-Score on CDVQA',
    iconName: 'History',
    description: 'Compares satellite images across dates to isolate real physical construction or destruction while eliminating sun angle and shadow biases.',
    active: true
  },
  {
    id: 'vivek-causal',
    name: 'Vivek-Causal',
    role: 'Pearl Causal SCM False-Alarm Suppressor',
    deityAnalogy: 'The Wise Discerner (विवेक)',
    sensor: 'Structural Causal Models (do-calculus)',
    accuracy: '94.8% Seasonal Alarm Suppression',
    iconName: 'GitMerge',
    description: 'Uses Judea Pearl do-calculus P(ΔY | do(X), E) to distinguish natural crop harvests or monsoon greening from real illegal bulldozer deforestation.',
    active: true
  },
  {
    id: 'kala-chakra-4d',
    name: 'Kala-Chakra-4D',
    role: 'Spatiotemporal World Model Forecaster',
    deityAnalogy: 'The Future Forecaster (काल-चक्र)',
    sensor: '4D Latent Diffusion Model',
    accuracy: '86.4% Structural Growth Fidelity',
    iconName: 'Clock',
    description: 'Simulates future Earth system states 6 to 36 months ahead to forecast urban sprawl, lake encroachment, and deforestation trajectories.',
    active: true
  },
  {
    id: 'bhoomi-rakshak',
    name: 'Bhoomi-Rakshak',
    role: 'NDMA/SDMA Emergency Rescue Router',
    deityAnalogy: 'The Sovereign Protector (भूमि-रक्षक)',
    sensor: 'Bhuvan / OpenStreetMap + Flood Inundation',
    accuracy: '100% NDMA Guideline Compliance',
    iconName: 'ShieldAlert',
    description: 'Converts raw flood maps into official NDMA Standard Operating Procedures (SOPs) with 1-click GeoJSON / PDF export for helicopter rescue teams.',
    active: true
  },
  {
    id: 'ratna-garbha',
    name: 'Ratna-Garbha',
    role: 'Subterranean Aquifer & Mineral Specialist',
    deityAnalogy: 'The Subterranean Revealer (रत्न-गर्भा)',
    sensor: 'DInSAR Phase Shift, TRISHNA, HysIS 256-band',
    accuracy: '2 mm/month Subsidence Sensitivity',
    iconName: 'Layers',
    description: 'Measures millimeter ground crust sinking (DInSAR), plant root thermal water fever (TRISHNA), and 256-band mineral spectroscopy (HysIS).',
    active: true
  }
];

export const CRISES_DATASETS: CrisisCaseStudy[] = [
  {
    id: 'assam-floods',
    title: 'Assam Brahmaputra & Kerala Monsoon Floods',
    region: 'Kaziranga & Periyar River Basin',
    state: 'Assam & Kerala',
    crisisType: 'Cloud Blindness & Sub-Canopy Flood Inundation',
    satelliteModalities: ['Cartosat-3 (Optical)', 'RISAT-1A (EOS-04 C-band SAR)', 'Sentinel-1'],
    problemDescription: 'Monsoon storms cause Brahmaputra embankments to violently breach, stranding 3.5 million citizens across 32 districts. Standard optical space cameras see 100% solid white clouds.',
    whyStandardAiFails: 'Optical cameras cannot penetrate clouds. Under dense jungle foliage, regular cameras see only green leaves while families are clinging to submerged rooftops below.',
    paramBrahmandSolution: 'Kaal-Radar applies RVoG PolInSAR radar polarimetry (~5.6 cm C-band waves). Microwaves penetrate storm clouds, pass through leaves, and double-bounce off tree trunks & underlying flood water (Pd > +6 dB), mapping submerged hamlets in 380 ms.',
    assignedEngineId: 'kaal-radar',
    opticalImageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1200&auto=format&fit=crop', // Cloud heavy scene
    radarOrSecondaryImageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop', // Water radar map
    sampleQueries: [
      'Show sub-canopy flood inundation under Kaziranga tree cover.',
      'Identify blocked evacuation routes along National Highway NH-37.',
      'Generate NDMA helicopter landing coordinates for cut-off villages.'
    ],
    samplePhysicsManifold: {
      yamaguchi: {
        surfacePower: 0.12,
        doubleBouncePower: 0.68, // Massive double bounce from flooded trunks
        volumePower: 0.15,
        helixPower: 0.05,
        deorientationAngle: 2.4,
        totalSpan: 1.0
      },
      rvog: {
        coherence: 0.35,
        verticalWavenumber: 0.0219,
        treeHeightMeters: 18.5,
        subCanopyWaterDetected: true
      },
      mesma: {
        cropFraction: 0.05,
        waterFraction: 0.72,
        builtFraction: 0.08,
        soilFraction: 0.15
      },
      indices: {
        ndvi: 0.22,
        ndwi: 0.65,
        mndwi: 0.78,
        ndbi: -0.25,
        evi: 0.28,
        savi: 0.24,
        bsi: -0.30,
        ndre: 0.20,
        nbr: -0.10,
        ndti: -0.15,
        cr: 0.32,
        dpd: 0.12,
        rvi: 0.85,
        oswi: 0.9985, // 99.85% flood certainty
        glcm: 0.15,
        slope: 1.8 // < 5 deg slope
      }
    },
    sampleSop: {
      disasterType: 'FLASH FLOOD & SUB-CANOPY INUNDATION',
      affectedRegion: 'Kaziranga Sector 4 & Nagaon District',
      severityLevel: 'CRITICAL',
      blockedHighways: ['NH-37 Km 142 (Submerged 1.8m)', 'State Highway 12 (Bridge Washout)'],
      isolatedVillagesCount: 14,
      trappedPopulationEstimate: 18500,
      safeHelicopterLandingZones: [
        { name: 'Nagaon High School Ground', lat: 26.3451, lng: 92.6834, capacity: '4 Heavy Lift Choppers' },
        { name: 'Jakhalabandha Helipad', lat: 26.5812, lng: 92.9912, capacity: '2 Medium Choppers' }
      ],
      recommendedActionPlan: [
        'Deploy NDRF Battalion 12 to Nagaon Sector 4 immediately.',
        'Airdrop food packets and water purification pills at coordinates 26.3451 N, 92.6834 E.',
        'Issue evacuation alert for downstream Sonitpur districts.'
      ],
      timestamp: new Date().toISOString()
    },
    sampleGeoJson: {
      type: 'FeatureCollection',
      geometry: {
        type: 'Polygon',
        coordinates: [[[92.68, 26.34], [92.75, 26.34], [92.75, 26.40], [92.68, 26.40], [92.68, 26.34]]]
      },
      properties: { name: 'Kaziranga Submerged Zone', oswi: 0.9985 }
    }
  },
  {
    id: 'joshimath-subsidence',
    title: 'Joshimath Himalayan Land Sinking Crisis',
    region: 'Chamoli District, Uttarakhand',
    state: 'Uttarakhand',
    crisisType: 'Millimeter Ground Crust Deformation',
    satelliteModalities: ['RISAT-1A DInSAR', 'Sentinel-1 InSAR', 'Cartosat-3'],
    problemDescription: 'In January 2023, the Himalayan town of Joshimath began sinking into the mountain, causing massive structural cracks in 860+ hotels, temples, homes, and military barracks.',
    whyStandardAiFails: 'Standard optical satellite photos before and after look 100% identical because a 5 cm vertical ground depression does not alter the RGB color of a tin roof or pine tree.',
    paramBrahmandSolution: 'Ratna-Garbha ingests repeat-pass SAR radar interferometry (DInSAR) from RISAT and Sentinel-1. By measuring the millimeter-exact microwave phase shift between successive satellite passes, it detects ground crust deformation down to 2 mm/month, generating a 3D spatiotemporal subsidence map weeks before cracks emerge.',
    assignedEngineId: 'ratna-garbha',
    opticalImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', // Mountain town
    radarOrSecondaryImageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop', // Interferogram map
    sampleQueries: [
      'Calculate DInSAR millimeter subsidence velocity across Joshimath Ward 4.',
      'Identify high-risk hotel building clusters exceeding 15mm/month sinking rate.',
      'Generate landslide risk warning report for Badrinath highway corridor.'
    ],
    samplePhysicsManifold: {
      yamaguchi: {
        surfacePower: 0.45,
        doubleBouncePower: 0.35,
        volumePower: 0.15,
        helixPower: 0.05,
        deorientationAngle: 5.1,
        totalSpan: 0.95
      },
      rvog: {
        coherence: 0.88,
        verticalWavenumber: 0.0185,
        treeHeightMeters: 12.0,
        subCanopyWaterDetected: false
      },
      mesma: {
        cropFraction: 0.10,
        waterFraction: 0.02,
        builtFraction: 0.55,
        soilFraction: 0.33
      },
      indices: {
        ndvi: 0.35,
        ndwi: -0.20,
        mndwi: -0.35,
        ndbi: 0.42,
        evi: 0.30,
        savi: 0.32,
        bsi: 0.38,
        ndre: 0.28,
        nbr: 0.05,
        ndti: 0.02,
        cr: 0.18,
        dpd: 0.45,
        rvi: 0.25,
        oswi: 0.02,
        glcm: 0.78,
        slope: 24.5 // Steep mountain slope!
      }
    },
    sampleSop: {
      disasterType: 'CRUSTAL LAND SUBSIDENCE & STRUCTURAL RISK',
      affectedRegion: 'Joshimath Ward 4, Marwari & Manohar Bagh',
      severityLevel: 'CRITICAL',
      blockedHighways: ['Badrinath National Highway NH-7 (Subsidence crack detected)'],
      isolatedVillagesCount: 3,
      trappedPopulationEstimate: 4200,
      safeHelicopterLandingZones: [
        { name: 'Auli Army Helipad', lat: 30.5289, lng: 79.5694, capacity: '3 Heavy Choppers' }
      ],
      recommendedActionPlan: [
        'Halt all heavy tunnel blasting for Tapovan Vishnugad project immediately.',
        'Evacuate 320 residential structures in Manohar Bagh exhibiting >12mm/month phase shift.',
        'Deploy structural tilt meters along NH-7 km 24.'
      ],
      timestamp: new Date().toISOString()
    },
    sampleGeoJson: {
      type: 'FeatureCollection',
      geometry: {
        type: 'Polygon',
        coordinates: [[[79.56, 30.55], [79.58, 30.55], [79.58, 30.57], [79.56, 30.57], [79.56, 30.55]]]
      },
      properties: { name: 'Joshimath Subsidence Zone', rate_mm_mo: 14.8 }
    }
  },
  {
    id: 'chambal-mining',
    title: 'Chambal River Sand Mining & Deforestation',
    region: 'Chambal Sanctuary & Western Ghats',
    state: 'Madhya Pradesh & Rajasthan',
    crisisType: 'Seasonal Phenology vs True Human Deforestation',
    satelliteModalities: ['Sentinel-2', 'Cartosat-2S', 'Judea Pearl SCM DAG'],
    problemDescription: 'State forest departments police thousands of sq km of protected reserves against illegal riverbed sand mining mafias and unauthorized timber logging.',
    whyStandardAiFails: 'When farmers harvest winter wheat (Rabi) in April, lush green farmland turns bare brown dirt. Standard AI simply subtracts pixel colors and falsely screams: "500 hectares of forest destroyed!" — sending forest guards on wild goose chases while real excavators operate unnoticed.',
    paramBrahmandSolution: 'Vivek-Causal uses Judea Pearl Structural Causal Models (SCMs) and do-calculus interventional graphs P(ΔY | do(Human Action=1), E). It conditions on historical district rainfall and crop calendars (Kharif/Rabi) to isolate true human bulldozer excavator actions, suppressing natural seasonal false alarms with p > 0.99 confidence.',
    assignedEngineId: 'vivek-causal',
    opticalImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop', // Farmland / riverbed
    radarOrSecondaryImageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop', // Change detection mask
    sampleQueries: [
      'Isolate illegal riverbed sand mining pits along Chambal River from wheat harvest.',
      'Run Pearl Causal do-calculus on the 50-hectare vegetation drop in Morena sector.',
      'Output court-admissible WGS84 GeoJSON polygon of active excavator tracks.'
    ],
    samplePhysicsManifold: {
      yamaguchi: {
        surfacePower: 0.60,
        doubleBouncePower: 0.10,
        volumePower: 0.20,
        helixPower: 0.10, // Excavator metal machinery!
        deorientationAngle: 1.2,
        totalSpan: 0.85
      },
      rvog: {
        coherence: 0.72,
        verticalWavenumber: 0.0205,
        treeHeightMeters: 4.2,
        subCanopyWaterDetected: false
      },
      mesma: {
        cropFraction: 0.15,
        waterFraction: 0.12,
        builtFraction: 0.05,
        soilFraction: 0.68
      },
      indices: {
        ndvi: -0.35, // Dropped
        ndwi: -0.10,
        mndwi: -0.15,
        ndbi: 0.12,
        evi: 0.15,
        savi: 0.20,
        bsi: 0.65, // High bare soil / sand
        ndre: 0.10,
        nbr: -0.05,
        ndti: 0.18,
        cr: 0.12,
        dpd: 0.62,
        rvi: 0.15,
        oswi: 0.01,
        glcm: 0.65,
        slope: 3.2
      }
    },
    sampleSop: {
      disasterType: 'ILLEGAL SAND MINING & ECOLOGICAL ENCROACHMENT',
      affectedRegion: 'Chambal National Sanctuary, Morena Sector',
      severityLevel: 'HIGH',
      blockedHighways: ['River Access Track #4 (Constructed illegally)'],
      isolatedVillagesCount: 0,
      trappedPopulationEstimate: 0,
      safeHelicopterLandingZones: [],
      recommendedActionPlan: [
        'Dispatch Forest Task Force to GPS coordinates 26.5412 N, 77.9234 E.',
        'Seize 4 heavy excavators identified by Helix radar backscatter Ph = 0.10.',
        'Issue notice under Wildlife Protection Act 1972.'
      ],
      timestamp: new Date().toISOString()
    },
    sampleGeoJson: {
      type: 'FeatureCollection',
      geometry: {
        type: 'Polygon',
        coordinates: [[[77.91, 26.53], [77.93, 26.53], [77.93, 26.55], [77.91, 26.55], [77.91, 26.53]]]
      },
      properties: { name: 'Chambal Mining Pit #3', confidence: 0.992 }
    }
  },
  {
    id: 'border-defense',
    title: 'Mountain Border Defense & Convoy Tracking',
    region: 'Eastern Ladakh & Arunachal Border',
    state: 'Ladakh & Arunachal Pradesh',
    crisisType: 'Sub-Meter Small Object Overlap & NMS Failure',
    satelliteModalities: ['Cartosat-3 (0.28m PAN)', 'Cartosat-2S (0.65m MS)', 'SADF Density Engine'],
    problemDescription: 'Military commanders monitoring high-altitude northern borders need immediate automated reconnaissance of vehicle supply convoys, fuel tankers, and fortified bunker construction.',
    whyStandardAiFails: 'Standard commercial AI models (YOLOv8, ViT) were trained on blurry 10m imagery and get confused by fine vehicle roof textures. Furthermore, standard bounding-box detectors use Non-Maximum Suppression (NMS), which accidentally merges overlapping boxes and deletes 40% of targets when vehicles are parked bumper-to-bumper in tight tactical convoys.',
    paramBrahmandSolution: 'Bhoomi-Optical uses Scale-Invariant Resolution-Token Injection (SIRTI) to calibrate neural receptive fields to 0.28m pixels, and replaces bounding boxes with Scale-Aware Density Fields (SADF). It integrates the continuous 2D density surface over target clusters to accurately count 500+ packed vehicles with >98% precision without suppression errors in 380 ms.',
    assignedEngineId: 'bhoomi-optical',
    opticalImageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop', // High altitude mountain road
    radarOrSecondaryImageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop', // Density heatmap
    sampleQueries: [
      'Count all supply trucks parked in the tactical convoy along Daulat Beg Oldi road.',
      'Detect sub-meter fortification footprint changes using Cartosat-3 0.28m imagery.',
      'Run SADF density integration on vehicle cluster near Line of Actual Control.'
    ],
    samplePhysicsManifold: {
      yamaguchi: {
        surfacePower: 0.35,
        doubleBouncePower: 0.42,
        volumePower: 0.08,
        helixPower: 0.15,
        deorientationAngle: 0.8,
        totalSpan: 1.10
      },
      rvog: {
        coherence: 0.92,
        verticalWavenumber: 0.0150,
        treeHeightMeters: 0.5,
        subCanopyWaterDetected: false
      },
      mesma: {
        cropFraction: 0.00,
        waterFraction: 0.00,
        builtFraction: 0.65,
        soilFraction: 0.35
      },
      indices: {
        ndvi: 0.05,
        ndwi: -0.30,
        mndwi: -0.40,
        ndbi: 0.55,
        evi: 0.04,
        savi: 0.06,
        bsi: 0.45,
        ndre: 0.05,
        nbr: 0.00,
        ndti: 0.00,
        cr: 0.10,
        dpd: 0.55,
        rvi: 0.08,
        oswi: 0.00,
        glcm: 0.92, // Extremely sharp metal edges!
        slope: 12.4
      }
    },
    sampleSop: {
      disasterType: 'TACTICAL BORDER RECONNAISSANCE & ASSET ALERT',
      affectedRegion: 'Sub-Sector North, Ladakh',
      severityLevel: 'HIGH',
      blockedHighways: [],
      isolatedVillagesCount: 0,
      trappedPopulationEstimate: 0,
      safeHelicopterLandingZones: [
        { name: 'DBO Forward Advanced Landing Ground', lat: 35.3912, lng: 77.9245, capacity: '2 C-130J / Heavy Choppers' }
      ],
      recommendedActionPlan: [
        'Alert High Command: 142 tactical logistics vehicles detected in 0.28m Cartosat-3 pass.',
        'SADF Density Field confirmed zero NMS deletion error (512 objects counted).',
        'Maintain 12-hour bi-temporal surveillance sweep.'
      ],
      timestamp: new Date().toISOString()
    },
    sampleGeoJson: {
      type: 'FeatureCollection',
      geometry: {
        type: 'MultiPoint',
        coordinates: [[77.92, 35.39], [77.925, 35.392], [77.928, 35.395]]
      },
      properties: { name: 'Convoy Vehicles Cluster', count: 142 }
    }
  }
];
