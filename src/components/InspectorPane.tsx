import React, { useState } from 'react';
import { 
  Sparkles, Send, BookOpen, Check, X, Plus, Mic, Image as ImageIcon,
  MessageSquare, Search, Target, RefreshCw, Type, AlignLeft, List, History, AlertTriangle, Activity
} from 'lucide-react';
import { Segment } from '../types';

interface InspectorPaneProps {
  selectedSegments: Segment[];
  onClose: () => void;
  activeTab: 'assist' | 'activity';
  setActiveTab: (tab: 'assist' | 'activity') => void;
  activitySubTab: 'comments' | 'history' | 'qa';
  setActivitySubTab: (tab: 'comments' | 'history' | 'qa') => void;
}

export default function InspectorPane({ 
  selectedSegments, 
  onClose,
  activeTab,
  setActiveTab,
  activitySubTab,
  setActivitySubTab
}: InspectorPaneProps) {
  const [inputValue, setInputValue] = useState('');

  const targetText = selectedSegments.length === 0 
    ? 'No segment selected' 
    : selectedSegments.length === 1 
      ? `Segment ${selectedSegments[0].id}`
      : `Segments ${selectedSegments[0].id}–${selectedSegments[selectedSegments.length - 1].id}`;

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-600" />
          <span className="text-sm font-bold text-slate-900">Inspector</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Target Indicator */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 shrink-0">
        <Target className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs text-slate-600 font-medium">
          Target: {targetText}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1.5 border-b border-slate-200 gap-1 bg-slate-50 shrink-0">
        <button 
          onClick={() => setActiveTab('assist')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[13px] font-medium rounded-md transition-all ${
            activeTab === 'assist' ? 'bg-white text-primary-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'assist' ? 'text-ai-600' : ''}`} />
          Assist
        </button>
        <button 
          onClick={() => setActiveTab('activity')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[13px] font-medium rounded-md transition-all ${
            activeTab === 'activity' ? 'bg-white text-primary-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Activity
        </button>
      </div>

      {activeTab === 'assist' ? (
        <div className="flex-1 overflow-y-auto bg-slate-50/50 flex flex-col">
          {/* Ask AI Input */}
          <div className="p-4 bg-white border-b border-slate-100 shrink-0">
            <div className="flex flex-col bg-white border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
              <textarea 
                id="inspector-ai-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={selectedSegments.length > 0 ? "Ask AI to rewrite, explain, or translate..." : "Select a segment to ask..."}
                disabled={selectedSegments.length === 0}
                className="w-full bg-transparent border-none px-3 py-2.5 text-[13px] focus:outline-none resize-none min-h-[60px] max-h-[150px] text-slate-800 placeholder-slate-400 disabled:opacity-50"
                rows={2}
              />
              <div className="flex items-center justify-between px-2 pb-2 pt-1">
                <div className="flex items-center gap-1">
                  <button disabled={selectedSegments.length === 0} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50" title="Add attachment">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button 
                  disabled={selectedSegments.length === 0 || !inputValue.trim()}
                  className={`p-1.5 rounded-md transition-colors flex items-center justify-center ${
                    inputValue.trim() && selectedSegments.length > 0 ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button disabled={selectedSegments.length === 0} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 transition-colors">
                <RefreshCw className="w-3 h-3" /> Rephrase
              </button>
              <button disabled={selectedSegments.length === 0} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 transition-colors">
                <AlignLeft className="w-3 h-3" /> Shorten
              </button>
              <button disabled={selectedSegments.length === 0} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 transition-colors">
                <Type className="w-3 h-3" /> Make Formal
              </button>
              <button disabled={selectedSegments.length === 0} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 transition-colors">
                <List className="w-3 h-3" /> Alternatives
              </button>
              <button disabled={selectedSegments.length === 0} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 transition-colors">
                <BookOpen className="w-3 h-3" /> Explain
              </button>
            </div>
          </div>

          {/* Evidence Summary */}
          <div className="p-4 border-t border-slate-100 mt-auto">
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Evidence Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[12px] text-slate-600">Terminology</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">2 matched</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[12px] text-slate-600">Translation Memory</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">1 similar</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
          {/* Activity Sub Tabs */}
          <div className="flex-none px-2 pt-2 flex gap-1 border-b border-slate-200 bg-white">
            <button 
              onClick={() => setActivitySubTab('comments')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-t-md transition-colors ${activitySubTab === 'comments' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              Comments
            </button>
            <button 
              onClick={() => setActivitySubTab('history')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-t-md transition-colors ${activitySubTab === 'history' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              History
            </button>
            <button 
              onClick={() => setActivitySubTab('qa')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-t-md transition-colors ${activitySubTab === 'qa' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              QA Issues
            </button>
          </div>

          {/* Activity Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activitySubTab === 'comments' && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-[13px] font-medium text-slate-700 mb-1">No comments yet</h3>
                <p className="text-[12px] text-slate-500 max-w-[200px]">Add a comment to discuss this segment with your team.</p>
                <button className="mt-4 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-[12px] font-medium rounded-md hover:bg-slate-50 shadow-sm">
                  Add Comment
                </button>
              </div>
            )}

            {activitySubTab === 'history' && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <History className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-[13px] font-medium text-slate-700 mb-1">No history yet</h3>
                <p className="text-[12px] text-slate-500 max-w-[200px]">Changes to this segment will appear here.</p>
              </div>
            )}

            {activitySubTab === 'qa' && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-[13px] font-medium text-slate-700 mb-1">No QA issues</h3>
                <p className="text-[12px] text-slate-500 max-w-[200px]">This segment has passed all automated checks.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
