import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, X, Bot } from 'lucide-react';
import { Segment } from '../types';

interface QuickAskProps {
  activeSegment: Segment | null;
  onClose: () => void;
  onOpenPanel: () => void;
}

export default function QuickAsk({ activeSegment, onClose, onOpenPanel }: QuickAskProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragHandle=".drag-handle"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute z-50 w-[320px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 overflow-hidden flex flex-col"
      style={{ top: '30%', left: '50%', x: '-50%' }}
    >
      <div className="drag-handle flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/80 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-ai-500" />
          <span className="text-xs font-medium text-slate-600">
            {activeSegment ? `Segment ${activeSegment.id}` : 'No segment selected'}
          </span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-md text-slate-400 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={activeSegment ? "Ask AI..." : "Please select a segment first"}
          disabled={!activeSegment}
          className="w-full bg-transparent border-none px-2 py-1.5 text-[13px] focus:outline-none resize-none min-h-[40px] max-h-[120px] text-slate-800 placeholder-slate-400 disabled:opacity-50"
          rows={1}
          autoFocus
        />
        <div className="flex items-center justify-between mt-2 px-1">
          <button 
            onClick={onOpenPanel}
            className="text-[11px] text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors"
          >
            Open in Panel
          </button>
          <button 
            disabled={!activeSegment || !inputValue.trim()}
            className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
              inputValue.trim() && activeSegment ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
