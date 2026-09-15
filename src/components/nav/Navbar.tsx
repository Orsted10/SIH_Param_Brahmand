import React from 'react';
import { NavigationTab, IndianLanguage } from '../../types';
import { Radio } from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedLanguage: IndianLanguage;
  setSelectedLanguage: (lang: IndianLanguage) => void;
  onOpenApiKeyModal: () => void;
}

const NAV_ITEMS: { label: string; tab: NavigationTab }[] = [
  { label: 'Home', tab: 'hero' },
  { label: 'Mission Control', tab: 'mission-control' },
  { label: '10 Crises', tab: 'crises' },
  { label: 'Physics Lab', tab: 'physics-lab' },
  { label: 'JSON Trace', tab: 'execution-trace' },
  { label: 'Dharma Gate', tab: 'dharma-gate' },
  { label: 'NDMA SOPs', tab: 'ndma-sop' },
];

/**
 * Prompt 7 (VEX) style navbar: liquid-glass pill centered, 
 * logo left, action button right. Fixed top, premium.
 */
export const Navbar: React.FC<NavbarProps> = ({
  activeTab, setActiveTab, onOpenApiKeyModal,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 lg:px-12 pt-4 hidden md:block">
        <div className="glass border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo */}
          <button
            onClick={() => setActiveTab('hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="font-cinzel font-bold text-white text-base tracking-wide">
              PARAM-BRAHMAND
            </span>
          </button>

          {/* Center nav pills */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl px-2 py-1.5">
            {NAV_ITEMS.slice(0, 5).map(item => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                  activeTab === item.tab
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right action */}
          <button
            onClick={onOpenApiKeyModal}
            className="bg-white text-black text-xs font-semibold px-5 py-2 rounded-lg hover:bg-white/90 transition-all tracking-wide flex items-center gap-1.5"
          >
            Configure Groq API
          </button>
        </div>
      </nav>

      {/* ── Mobile Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 pt-3 md:hidden">
        <div className="glass border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => setActiveTab('hero')} className="font-cinzel font-bold text-white text-sm">
            PARAM-B
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="mt-2 glass-dark border border-white/10 rounded-2xl overflow-hidden">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.tab}
                onClick={() => { setActiveTab(item.tab); setOpen(false); }}
                className={`w-full text-left px-5 py-3.5 text-sm tracking-wide transition-colors border-b border-white/5 last:border-0 ${
                  activeTab === item.tab ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'
                }`}
                style={{
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onOpenApiKeyModal}
              className="w-full px-5 py-3.5 text-sm text-cyan-300 font-medium text-left"
            >
              Configure Groq API
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
