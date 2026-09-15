import React, { useState } from 'react';
import { NDMASopGenerator } from '../services/ndmaGenerator';
import { NDMASOPDirective } from '../types';
import { ShieldAlert, Download, FileText, CheckCircle2, MapPin, Navigation } from 'lucide-react';

export const NDMASopViewer: React.FC = () => {
  const [sop, setSop] = useState<NDMASOPDirective>(
    NDMASopGenerator.generateSop(
      'FLASH FLOOD & SUB-CANOPY INUNDATION',
      'Kaziranga Sector 4 & Nagaon District, Assam',
      'CRITICAL',
      ['NH-37 Km 142 (Submerged 1.8m)', 'State Highway 12 (Bridge Washout)'],
      14,
      18500,
      [
        { name: 'Nagaon High School Ground Helipad', lat: 26.3451, lng: 92.6834, capacity: '4 Heavy Lift Choppers' },
        { name: 'Jakhalabandha Airfield Helipad', lat: 26.5812, lng: 92.9912, capacity: '2 Medium Choppers' }
      ]
    )
  );

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-12 bg-space-950">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border border-isro-saffron/40 text-isro-saffron text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <ShieldAlert className="w-4 h-4 text-isro-saffron" />
          <span>NDMA Disaster Management Act 2005 Compliant</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Actionable <span className="text-transparent bg-clip-text bg-gradient-to-r from-isro-saffron via-amber-400 to-cyan-400">Emergency Rescue SOPs</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Raw maps don't save lives; actionable directives do. Bhoomi-Rakshak converts satellite inundation vectors into official NDMA Standard Operating Procedures with 1-click GeoJSON export for helicopter rescue crews.
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Main Document Card */}
        <div className="liquid-glass-strong rounded-3xl p-6 md:p-8 border border-isro-saffron/40 shadow-2xl flex flex-col gap-6">
          
          {/* Top Document Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-isro-saffron uppercase tracking-widest block mb-1">
                OFFICIAL EMERGENCY DIRECTIVE
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">{sop.disasterType}</h3>
              <p className="text-xs text-gray-300 mt-1">Region: {sop.affectedRegion}</p>
            </div>

            <button
              onClick={() => NDMASopGenerator.exportAsGeoJson(sop)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-isro-saffron to-amber-500 text-space-950 font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-xl flex items-center gap-2 self-start md:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export WGS84 GeoJSON SOP</span>
            </button>
          </div>

          {/* Quick Directive Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-space-950/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-gray-400 block mb-1">SEVERITY LEVEL</span>
              <span className="font-extrabold text-lg text-red-400 font-mono">{sop.severityLevel}</span>
            </div>
            <div className="bg-space-950/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-gray-400 block mb-1">ISOLATED VILLAGES</span>
              <span className="font-extrabold text-lg text-amber-300 font-mono">{sop.isolatedVillagesCount} Hamlets</span>
            </div>
            <div className="bg-space-950/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-gray-400 block mb-1">TRAPPED POPULATION</span>
              <span className="font-extrabold text-lg text-cyan-300 font-mono">{sop.trappedPopulationEstimate.toLocaleString()}</span>
            </div>
            <div className="bg-space-950/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-gray-400 block mb-1">HELICOPTER LANDING ZONES</span>
              <span className="font-extrabold text-lg text-emerald-400 font-mono">{sop.safeHelicopterLandingZones.length} Base HLZs</span>
            </div>
          </div>

          {/* Blocked Corridors */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Impassable Corridors & Submerged Bridges:</span>
            </h4>
            <div className="flex flex-col gap-2">
              {sop.blockedHighways.map((h, i) => (
                <div key={i} className="bg-red-950/20 border border-red-500/30 p-3 rounded-xl text-xs text-red-200 font-mono">
                  ⛔ {h}
                </div>
              ))}
            </div>
          </div>

          {/* Safe Helicopter Landing Zones */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Verified Safe Helicopter Landing Zones (HLZ):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sop.safeHelicopterLandingZones.map((hlz, i) => (
                <div key={i} className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-2xl flex flex-col gap-1">
                  <span className="font-bold text-xs text-white">{hlz.name}</span>
                  <span className="text-[11px] font-mono text-emerald-300">
                    Coords: {hlz.lat}° N, {hlz.lng}° E
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">Capacity: {hlz.capacity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan Directives */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              <span>Recommended NDRF Tactical Directives:</span>
            </h4>
            <div className="bg-space-950 p-4 rounded-2xl border border-white/10 space-y-2 text-xs text-gray-200 leading-relaxed font-mono">
              {sop.recommendedActionPlan.map((action, i) => (
                <p key={i}>{action}</p>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
