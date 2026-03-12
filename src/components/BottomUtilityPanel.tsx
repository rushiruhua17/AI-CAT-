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
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tm' && (
          <div className="max-w-4xl mx-auto h-full">
            {activeSegment ? (
              <div className="space-y-3">
                <div className="p-3 bg-white border border-slate-200 rounded-md shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">100% Match</span>
                    <span className="text-[11px] text-slate-500">Main TM</span>
                  </div>
                  <div className="text-[13px] text-slate-700 mb-1.5">{activeSegment.source}</div>
                  <div className="text-[13px] text-slate-950 font-medium">{activeSegment.target || '---'}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-[13px] font-medium text-slate-700 mb-1">No TM or Glossary matches</h3>
                <p className="text-[12px] text-slate-500 max-w-[250px]">Select a segment to see translation memory and glossary results.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'similar' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-[13px] font-medium text-slate-700 mb-1">No similar translations</h3>
            <p className="text-[12px] text-slate-500 max-w-[250px]">We couldn't find any similar segments in the current document.</p>
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Eye className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-[13px] font-medium text-slate-700 mb-1">Document Preview</h3>
            <p className="text-[12px] text-slate-500 max-w-[250px]">A live preview of the translated document will appear here.</p>
          </div>
        )}
        {activeTab === 'qa' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-[13px] font-medium text-slate-700 mb-1">Document QA</h3>
            <p className="text-[12px] text-slate-500 max-w-[250px]">Ask questions about the entire document context.</p>
          </div>
        )}
        {activeTab === 'batch' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-[13px] font-medium text-slate-700 mb-1">Batch Revisions</h3>
            <p className="text-[12px] text-slate-500 max-w-[250px]">Review and apply changes across multiple segments at once.</p>
          </div>
        )}
      </div>
    </div>
  );
}
