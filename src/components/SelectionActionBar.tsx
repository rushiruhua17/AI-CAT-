import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, BookOpen, MessageSquare, History, CheckCircle, Layers, FileText, CheckSquare } from 'lucide-react';

interface SelectionActionBarProps {
  selectedCount: number;
  onAction: (action: string) => void;
}

export default function SelectionActionBar({ selectedCount, onAction }: SelectionActionBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-4 left-4 z-30 flex items-center bg-white border border-slate-200 shadow-md rounded-lg overflow-hidden"
        >
          <div className="px-3 py-1.5 bg-slate-50 border-r border-slate-200 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-primary-700">
              {selectedCount} selected
            </span>
          </div>
          
          <div className="flex items-center p-1 gap-0.5">
            {selectedCount === 1 ? (
              <>
                <button onClick={() => onAction('ask')} className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-700 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-ai-600" /> Ask AI
                </button>
                <div className="w-px h-3.5 bg-slate-200 mx-1" />
                <button onClick={() => onAction('rephrase')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" /> Rephrase
                </button>
                <button onClick={() => onAction('explain')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" /> Explain
                </button>
                <button onClick={() => onAction('comment')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Comment
                </button>
                <button onClick={() => onAction('history')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <History className="w-3.5 h-3.5" /> History
                </button>
                <div className="w-px h-3.5 bg-slate-200 mx-1" />
                <button onClick={() => onAction('review')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-emerald-50 text-emerald-700 rounded text-[12px] font-medium transition-colors">
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Review
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onAction('ask')} className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-700 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-ai-600" /> Ask AI
                </button>
                <div className="w-px h-3.5 bg-slate-200 mx-1" />
                <button onClick={() => onAction('terminology')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" /> Terminology Check
                </button>
                <button onClick={() => onAction('consistency')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <Layers className="w-3.5 h-3.5" /> Consistency Check
                </button>
                <button onClick={() => onAction('style')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <FileText className="w-3.5 h-3.5" /> Style Review
                </button>
                <div className="w-px h-3.5 bg-slate-200 mx-1" />
                <button onClick={() => onAction('task')} className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded text-[12px] font-medium text-slate-600 transition-colors">
                  <CheckSquare className="w-3.5 h-3.5" /> Create Task
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
