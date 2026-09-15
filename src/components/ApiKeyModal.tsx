import React, { useState } from 'react';
import { GroqService } from '../services/groqService';
import { Key, Check, ShieldCheck, X, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [keyInput, setKeyInput] = useState<string>(GroqService.getApiKey());
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    GroqService.setApiKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="liquid-glass-strong w-full max-w-md rounded-3xl p-6 border border-cyan-500/40 shadow-2xl relative flex flex-col gap-5">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full liquid-glass"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Configure Groq API Key</h3>
            <p className="text-xs text-gray-400">Paid Groq API key for Llama-3.3-70B & Whisper-v3</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-mono text-cyan-300 block">
            Groq API Key (Starts with `gsk_`):
          </label>
          <input 
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="gsk_..."
            className="w-full bg-space-950/80 border border-white/20 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
          />
          <p className="text-[11px] text-gray-400">
            * Your key is saved locally in browser `localStorage`. If no key is set, Param Brahmand runs in instant high-fidelity simulated engine mode!
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : 'Save & Activate'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
