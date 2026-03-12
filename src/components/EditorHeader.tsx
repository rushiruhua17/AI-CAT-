import React from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';

interface EditorHeaderProps {
  onBack: () => void;
}

export default function EditorHeader({ onBack }: EditorHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white shrink-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="font-semibold text-slate-900">BA Analyst</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium">English → Chinese</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">Presentation.pptx</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-medium text-slate-600">3 / 84 (3.5%)</div>
          <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 w-[3.5%] rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-ai-600" />
            AI Auto-Translate
          </button>
          <button className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors">
            Complete
          </button>
        </div>
      </div>
    </header>
  );
}
