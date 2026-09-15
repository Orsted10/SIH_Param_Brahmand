import React, { useState } from 'react';
import { NavigationTab, IndianLanguage } from '../types';
import { INDIAN_LANGUAGES } from '../data/crisesData';
import { GroqService } from '../services/groqService';
import { 
  Globe, 
  Key, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Radio, 
  Volume2, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedLanguage: IndianLanguage;
  setSelectedLanguage: (lang: IndianLanguage) => void;
  onOpenApiKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  onOpenApiKeyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const hasKey = GroqService.hasApiKey();

  const currentLang = INDIAN_LANGUAGES.find(l => l.code === selectedLanguage) || INDIAN_LANGUAGES[0];

  const navItems: Array<{ id: NavigationTab; label: string; icon: React.ReactNode }> = [
    { id: 'hero', label: 'Home', icon: <Globe className="w-4 h-4" /> },
    { id: 'mission-control', label: 'Mission Control', icon: <Radio className="w-4 h-4 text-cyan-400" /> },
    { id: 'crises', label: '10 Crisis Cases', icon: <Layers className="w-4 h-4 text-amber-400" /> },
    { id: 'physics-lab', label: '128-D Physics Lab', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { id: 'execution-trace', label: 'JSON Trace', icon: <FileText className="w-4 h-4 text-purple-400" /> },
    { id: 'dharma-gate', label: 'Dharma Gate (0% Error)', icon: <ShieldCheck className="w-4 h-4 text-cyan-300" /> },
    { id: 'ndma-sop', label: 'NDMA SOPs', icon: <Sparkles className="w-4 h-4 text-isro-saffron" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3">
      <div className="liquid-glass rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-xl border border-white/10">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-amber-500 p-[1.5px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-space-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🌌</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg md:text-xl tracking-wider text-white font-sans group-hover:text-cyan-300 transition-colors">
                PARAM-BRAHMAND
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/40">
                ISRO SAC PS 26167
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-serif italic hidden md:block">
              "विश्वं पश्यति चक्षुषा विज्ञानेन च युज्यते"
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-space-900/60 p-1.5 rounded-full border border-white/10">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg button-glow-cyan'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: API Key & 22-Language Voice Toggle */}
        <div className="flex items-center gap-2.5">
          
          {/* 22-Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="liquid-glass px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 text-gray-200 hover:text-white hover:border-cyan-400/50 transition-all"
              title="Select Indian Vernacular Language"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-semibold">{currentLang.flag} {currentLang.name}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto liquid-glass-strong rounded-2xl p-2 z-50 shadow-2xl border border-cyan-500/30 grid grid-cols-1 gap-1 scrollbar-hide">
                <div className="text-[10px] font-bold text-gray-400 px-3 py-1 tracking-wider uppercase border-b border-white/10 mb-1">
                  22 Scheduled Indian Languages (VIVA)
                </div>
                {INDIAN_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag} {lang.name}</span>
                    <span className="text-[10px] text-gray-400 font-serif italic">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Groq API Key Status / Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
              hasKey
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasKey ? 'Groq Active' : 'Configure Groq API'}
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white liquid-glass rounded-xl"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 liquid-glass-strong rounded-2xl p-4 shadow-2xl border border-cyan-500/30 flex flex-col gap-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
