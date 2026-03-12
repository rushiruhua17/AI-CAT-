import React, { useState } from 'react';
import { Segment } from '../types';
import { Check, Sparkles, AlertTriangle, MessageSquare, History } from 'lucide-react';

interface SegmentRowProps {
  key?: React.Key;
  segment: Segment;
  isSelected: boolean;
  isPrimarySelected: boolean;
  compactRows?: boolean;
  showMetadata?: boolean;
  onClick: (e: React.MouseEvent) => void;
  onAction: (action: 'comment' | 'history' | 'ask') => void;
}

export default function SegmentRow({ segment, isSelected, isPrimarySelected, compactRows = false, showMetadata = true, onClick, onAction }: SegmentRowProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      onClick={onClick}
      className={`flex group border-b border-slate-200 cursor-pointer transition-all duration-150 relative ${
        isSelected 
          ? 'bg-primary-50 border-l-[4px] border-l-primary-600' 
          : 'bg-white hover:bg-slate-50 border-l-[4px] border-l-transparent'
      }`}
    >
      {/* ID & Status */}
      <div className={`w-12 shrink-0 flex flex-col items-center ${compactRows ? 'py-2' : 'py-3.5'} text-[11px] text-slate-500 font-mono select-none`}>
        <span>{segment.id}</span>
        {segment.issues ? (
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-1.5" />
        ) : null}
      </div>

      {/* Source */}
      <div className={`flex-1 ${compactRows ? 'p-2' : 'p-3.5'} text-[13px] text-slate-900 leading-relaxed pr-6`}>
        {segment.source}
      </div>

      {/* Target */}
      <div className={`flex-1 ${compactRows ? 'p-1.5' : 'p-3'} relative`}>
        {isPrimarySelected ? (
          <div className={`relative rounded-md transition-all duration-200 ${isFocused ? 'ring-2 ring-primary-500/40 bg-white' : 'bg-white/80 hover:bg-white'}`}>
            <textarea
              className={`w-full h-full ${compactRows ? 'min-h-[40px]' : 'min-h-[64px]'} bg-transparent border border-slate-300 focus:border-primary-500 rounded-md p-2.5 text-[13px] text-slate-900 focus:outline-none resize-none shadow-sm`}
              defaultValue={segment.target}
              placeholder="Type translation here..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus
            />
          </div>
        ) : (
          <div className={`text-[13px] text-slate-950 leading-relaxed ${compactRows ? 'min-h-[20px] p-1.5' : 'min-h-[24px] p-2.5'} rounded-md border border-transparent`}>
            {segment.target || <span className="text-slate-400 italic">Empty</span>}
          </div>
        )}
      </div>

      {/* Actions / Meta */}
      <div className={`w-16 shrink-0 flex flex-col items-center justify-start ${compactRows ? 'pt-2' : 'pt-3.5'} gap-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
        {/* Quick Actions */}
        <div className="flex flex-col gap-1">
          <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" title="Comment" onClick={(e) => { e.stopPropagation(); onAction('comment'); }}>
            <MessageSquare className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" title="History" onClick={(e) => { e.stopPropagation(); onAction('history'); }}>
            <History className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-ai-600 hover:bg-ai-50 rounded-md transition-colors" title="Ask AI" onClick={(e) => { e.stopPropagation(); onAction('ask'); }}>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Badges (Absolute positioned on the right edge) */}
      {showMetadata && (
        <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-60">
          {segment.origin === 'ai' && (
            <div className="flex items-center justify-center w-4 h-4 rounded bg-ai-50 text-ai-600" title="AI Translated">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          )}
          {segment.status === 'approved' && (
            <div className="flex items-center justify-center w-4 h-4 rounded bg-emerald-100 text-emerald-600" title="Approved">
              <Check className="w-2.5 h-2.5" />
            </div>
          )}
          {segment.status === 'translated' && (
            <div className="flex items-center justify-center w-4 h-4 rounded bg-primary-50 text-primary-600" title="Translated">
              <Check className="w-2.5 h-2.5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
