import React, { useState } from 'react';
import { Segment } from '../types';
import { History, CheckCircle2, Database, MessageSquare, Eye } from 'lucide-react';

export default function BottomPanel({ activeSegment }: { activeSegment?: Segment }) {
  const [activeTab, setActiveTab] = useState<'tm' | 'history' | 'qa' | 'comments' | 'preview'>('tm');

  const tabs = [
    { id: 'tm', label: 'TM & Glossary', icon: Database },
    { id: 'qa', label: 'QA Checks', icon: CheckCircle2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'preview', label: 'Preview', icon: Eye },
  ] as const;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Tabs */}
      <div className="flex items-center px-2 border-b border-slate-200 bg-white shrink-0">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-primary-600 text-primary-800' 
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tm' && (
          <div className="space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">100% Match</span>
                <span className="text-[11px] text-slate-500">Main TM</span>
              </div>
              <div className="text-[13px] text-slate-700 mb-1.5">{activeSegment?.source}</div>
              <div className="text-[13px] text-slate-950 font-medium">{activeSegment?.target || '---'}</div>
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="text-[13px] text-slate-500 flex items-center justify-center h-full">
            No history available for this segment.
          </div>
        )}
        {activeTab === 'qa' && (
          <div className="text-[13px] text-slate-500 flex items-center justify-center h-full">
            No QA issues detected.
          </div>
        )}
        {activeTab === 'comments' && (
          <div className="text-[13px] text-slate-500 flex items-center justify-center h-full">
            No comments yet.
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="text-[13px] text-slate-500 flex items-center justify-center h-full">
            Preview not available.
          </div>
        )}
      </div>
    </div>
  );
}
