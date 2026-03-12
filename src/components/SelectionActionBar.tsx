import React from 'react';
import { Sparkles, RefreshCw, BookOpen, MessageSquare, History, CheckCircle, ListChecks, CheckSquare, FileCheck } from 'lucide-react';

interface SelectionActionBarProps {
  selectedCount: number;
  onAction: (action: 'ask' | 'comment' | 'history') => void;
}

export default function SelectionActionBar({ selectedCount, onAction }: SelectionActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="absolute bottom-4 left-4 bg-white border border-slate-200 shadow-md rounded-md px-1.5 py-1 flex items-center gap-0.5 z-30">
      <div className="px-2 py-0.5 text-[11px] font-semibold text-primary-600 bg-primary-50 rounded mr-1">
        {selectedCount} selected
      </div>
      
      <div className="w-px h-3 bg-slate-200 mx-1" />
      
      <button onClick={() => onAction('ask')} className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
        <Sparkles className="w-3.5 h-3.5 text-ai-600" />
        Ask AI
      </button>

      {selectedCount === 1 ? (
        <>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            Rephrase
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Explain
          </button>
          <button onClick={() => onAction('comment')} className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            Comment
          </button>
          <button onClick={() => onAction('history')} className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <History className="w-3.5 h-3.5 text-slate-400" />
            History
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
            Mark Review
          </button>
        </>
      ) : (
        <>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Terminology
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <ListChecks className="w-3.5 h-3.5 text-slate-400" />
            Consistency
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <FileCheck className="w-3.5 h-3.5 text-slate-400" />
            Style Review
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors">
            <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
            Create Task
          </button>
        </>
      )}
    </div>
  );
}
