import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ArrowUp, ArrowDown, Check, CheckCircle2, ChevronDown, Zap, PanelRight } from 'lucide-react';

interface EditorToolbarProps {
  showInspector: boolean;
  setShowInspector: (v: boolean) => void;
  showBottomPanel: boolean;
  setShowBottomPanel: (v: boolean) => void;
  compactRows: boolean;
  setCompactRows: (v: boolean) => void;
  showMetadata: boolean;
  setShowMetadata: (v: boolean) => void;
  showQuickAsk: boolean;
  onQuickAskClick: () => void;
}

export default function EditorToolbar({
  showInspector, setShowInspector,
  showBottomPanel, setShowBottomPanel,
  compactRows, setCompactRows,
  showMetadata, setShowMetadata,
  showQuickAsk, onQuickAskClick
}: EditorToolbarProps) {
  const [batchOpen, setBatchOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  
  const batchRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (batchRef.current && !batchRef.current.contains(event.target as Node)) {
        setBatchOpen(false);
      }
      if (viewRef.current && !viewRef.current.contains(event.target as Node)) {
        setViewOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white shrink-0 z-10">
      <div className="flex items-center gap-1">
        <div className="relative mr-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-8 pr-3 py-1 text-[13px] bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-48 transition-all"
          />
        </div>
        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" title="Filter">
          <Filter className="w-4 h-4" />
        </button>
        
        <div className="w-px h-4 bg-slate-200 mx-1" />
        
        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" title="Previous Segment">
          <ArrowUp className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" title="Next Segment">
          <ArrowDown className="w-4 h-4" />
        </button>
        
        <div className="w-px h-4 bg-slate-200 mx-1" />
        
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 shadow-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors text-[13px] font-medium" title="Confirm">
          <Check className="w-4 h-4 text-primary-600" />
          Confirm
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 shadow-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors text-[13px] font-medium" title="Confirm and Next">
          <CheckCircle2 className="w-4 h-4 text-primary-600" />
          Confirm & Next
        </button>

        <div className="w-px h-4 bg-slate-200 mx-1" />

        {/* Batch Dropdown */}
        <div className="relative" ref={batchRef}>
          <button 
            onClick={() => setBatchOpen(!batchOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors ${batchOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            Batch
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
          
          {batchOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 shadow-lg rounded-md py-1 z-50">
              <button className="w-full text-left px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50" onClick={() => { console.log('Pre-translate'); setBatchOpen(false); }}>Pre-translate</button>
              <button className="w-full text-left px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50" onClick={() => { console.log('Batch QA'); setBatchOpen(false); }}>Batch QA</button>
              <button className="w-full text-left px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50" onClick={() => { console.log('Mark file complete'); setBatchOpen(false); }}>Mark file complete</button>
              <button className="w-full text-left px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50" onClick={() => { console.log('Export current file'); setBatchOpen(false); }}>Export current file</button>
              <div className="h-px bg-slate-100 my-1" />
              <button className="w-full text-left px-3 py-1.5 text-[13px] text-slate-400 cursor-not-allowed" disabled>More batch tools...</button>
            </div>
          )}
        </div>

        {/* View Dropdown */}
        <div className="relative" ref={viewRef}>
          <button 
            onClick={() => setViewOpen(!viewOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors ${viewOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            View
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
          
          {viewOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 shadow-lg rounded-md py-1 z-50">
              <label className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" checked={showInspector} onChange={(e) => setShowInspector(e.target.checked)} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Show Inspector
              </label>
              <label className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" checked={showBottomPanel} onChange={(e) => setShowBottomPanel(e.target.checked)} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Show Bottom Panel
              </label>
              <label className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" checked={compactRows} onChange={(e) => setCompactRows(e.target.checked)} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Compact Rows
              </label>
              <label className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" checked={showMetadata} onChange={(e) => setShowMetadata(e.target.checked)} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Show Metadata
              </label>
              <div className="h-px bg-slate-100 my-1" />
              <button className="w-full text-left px-3 py-1.5 text-[13px] text-slate-400 cursor-not-allowed" disabled>Compare View...</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onQuickAskClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors border shadow-sm ${showQuickAsk ? 'bg-primary-50 text-primary-700 border-primary-300' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}`}
        >
          <Zap className={`w-3.5 h-3.5 ${showQuickAsk ? 'text-ai-600' : 'text-slate-500'}`} />
          Quick Ask
        </button>
        <button 
          onClick={() => setShowInspector(!showInspector)}
          className={`p-1.5 rounded-md transition-colors ${showInspector ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
          title="Toggle Inspector"
        >
          <PanelRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
