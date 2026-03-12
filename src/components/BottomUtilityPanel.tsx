import React, { useState } from 'react';
import { BookOpen, RefreshCw, Eye, AlertTriangle, Layers, X } from 'lucide-react';
import { Segment } from '../types';

interface BottomUtilityPanelProps {
  selectedSegments: Segment[];
  onClose: () => void;
}

export default function BottomUtilityPanel({ selectedSegments, onClose }: BottomUtilityPanelProps) {
  const [activeTab, setActiveTab] = useState<'tm' | 'similar' | 'preview' | 'qa' | 'batch'>('tm');

  const tabs = [
    { id: 'tm', label: 'TM / Glossary', icon: BookOpen },
    { id: 'similar', label: 'Similar', icon: RefreshCw },
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'qa', label: 'Doc QA', icon: AlertTriangle },
    { id: 'batch', label: 'Batch Revisions', icon: Layers },
  ];

  const activeSegment = selectedSegments.length === 1 ? selectedSegments[0] : null;

  return (
    <div className="h-48 bg-slate-50 border-t border-slate-200 flex flex-col shrink-0 relative z-20">
      {/* Header / Tabs */}
      <div className="flex items-center justify-between px-2 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center">
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
        <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors mr-2">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'tm' && (
          <div className="h-full flex flex-col">
            {activeSegment ? (
              <div className="flex flex-col">
                {/* Result Row */}
                <div className="px-4 py-3 border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">100% Match</span>
                    <span className="text-[11px] font-medium text-slate-500">Main TM</span>
                  </div>
                  <div className="text-[13px] text-slate-600 mb-1 leading-relaxed">{activeSegment.source}</div>
                  <div className="text-[13px] text-slate-900 font-medium leading-relaxed">{activeSegment.target || '---'}</div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="text-[13px] font-medium text-slate-700">No matches found</h3>
                  <p className="text-[12px] text-slate-500 mt-0.5">Select a segment to view Translation Memory and Glossary results.</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'similar' && (
          <div className="px-4 py-6 flex items-start gap-3">
            <RefreshCw className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <h3 className="text-[13px] font-medium text-slate-700">No similar translations</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">We couldn't find any similar segments in the current document.</p>
            </div>
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="px-4 py-6 flex items-start gap-3">
            <Eye className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <h3 className="text-[13px] font-medium text-slate-700">Document Preview</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">A live preview of the translated document will appear here.</p>
            </div>
          </div>
        )}
        {activeTab === 'qa' && (
          <div className="px-4 py-6 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <h3 className="text-[13px] font-medium text-slate-700">Document QA</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">Ask questions about the entire document context.</p>
            </div>
          </div>
        )}
        {activeTab === 'batch' && (
          <div className="px-4 py-6 flex items-start gap-3">
            <Layers className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <h3 className="text-[13px] font-medium text-slate-700">Batch Revisions</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">Review and apply changes across multiple segments at once.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
