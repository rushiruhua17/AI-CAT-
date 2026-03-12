import React, { useState } from 'react';
import { Sparkles, X, Send, PanelRight } from 'lucide-react';
import { Segment } from '../types';

interface QuickAskOverlayProps {
  selectedSegments: Segment[];
  onClose: () => void;
  onOpenInPanel: () => void;
}

export default function QuickAskOverlay({ selectedSegments, onClose, onOpenInPanel }: QuickAskOverlayProps) {
  const [inputValue, setInputValue] = useState('');

  const targetText = selectedSegments.length === 0 
    ? 'No segment selected' 
    : selectedSegments.length === 1 
      ? `Segment ${selectedSegments[0].id}`
      : `Segments ${selectedSegments[0].id}–${selectedSegments[selectedSegments.length - 1].id}`;

  return (
    <div className="fixed bottom-24 right-8 w-80 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 overflow-hidden z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ai-500" />
          <span className="text-[13px] font-semibold text-slate-800">Quick Ask</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onOpenInPanel} className="p-1 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors" title="Open in Inspector">
            <PanelRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors" title="Close">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Indicator */}
      <div className="px-3 py-1.5 bg-slate-100/50 border-b border-slate-100">
        <span className="text-[11px] font-medium text-slate-500">Target: {targetText}</span>
      </div>

      {/* Input Area */}
      <div className="p-3">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={selectedSegments.length > 0 ? "Ask AI to rewrite, explain..." : "Please select a segment first"}
          disabled={selectedSegments.length === 0}
          className="w-full h-20 text-[13px] resize-none focus:outline-none placeholder-slate-400 text-slate-800 disabled:opacity-50 disabled:bg-slate-50 rounded-md p-2 border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
        />
        <div className="flex justify-end mt-2">
          <button 
            disabled={selectedSegments.length === 0 || !inputValue.trim()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
              inputValue.trim() && selectedSegments.length > 0
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
