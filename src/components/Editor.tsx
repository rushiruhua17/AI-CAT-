import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Segment } from '../types';

import EditorHeader from './EditorHeader';
import EditorToolbar from './EditorToolbar';
import SegmentRow from './SegmentRow';
import SelectionActionBar from './SelectionActionBar';
import InspectorPane from './InspectorPane';
import BottomUtilityPanel from './BottomUtilityPanel';
import QuickAskOverlay from './QuickAskOverlay';

const initialSegments: Segment[] = [
  { id: 1, source: 'Financial growth & strategy', target: '财务增长与战略', status: 'approved', origin: 'ai' },
  { id: 2, source: 'Presented by Frey Munch', target: '由 Frey Munch 演示', status: 'approved', origin: 'ai', issues: 1 },
  { id: 3, source: 'Agenda', target: '议程', status: 'translated', origin: 'human' },
  { id: 4, source: 'Financial overview', target: '', status: 'draft', origin: 'mt' },
  { id: 5, source: 'Key metrics', target: '', status: 'draft', origin: 'mt' },
  { id: 6, source: 'Budget', target: '', status: 'draft', origin: 'mt' },
  { id: 7, source: 'Conclusion', target: '', status: 'draft', origin: 'mt' },
  { id: 8, source: 'Financial success outlook', target: '', status: 'draft', origin: 'mt' },
  { id: 9, source: 'Our financial position', target: '', status: 'draft', origin: 'mt' },
  { id: 10, source: 'Our company continues to experience significant growth via strategic investments.', target: '', status: 'draft', origin: 'mt' },
];

export default function Editor({ onBack }: { onBack: () => void }) {
  const [segments, setSegments] = useState(initialSegments);
  
  // Selection State
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<number[]>([3]);
  const [primarySelectedId, setPrimarySelectedId] = useState<number | null>(3);
  
  // UI State
  const [showInspector, setShowInspector] = useState(true);
  const [inspectorTab, setInspectorTab] = useState<'assist' | 'activity'>('assist');
  const [activitySubTab, setActivitySubTab] = useState<'comments' | 'history' | 'qa'>('comments');
  
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const [compactRows, setCompactRows] = useState(false);
  const [showMetadata, setShowMetadata] = useState(true);
  const [showQuickAsk, setShowQuickAsk] = useState(false);

  const selectedSegments = segments.filter(s => selectedSegmentIds.includes(s.id));

  const handleQuickAskClick = () => {
    if (showInspector) {
      setInspectorTab('assist');
      setTimeout(() => document.getElementById('inspector-ai-input')?.focus(), 50);
    } else {
      setShowQuickAsk(!showQuickAsk);
    }
  };

  const handleSegmentAction = (action: 'comment' | 'history' | 'ask', id?: number) => {
    if (id && !selectedSegmentIds.includes(id)) {
      setSelectedSegmentIds([id]);
      setPrimarySelectedId(id);
    }
    setShowInspector(true);
    setShowQuickAsk(false);
    
    if (action === 'comment') {
      setInspectorTab('activity');
      setActivitySubTab('comments');
    } else if (action === 'history') {
      setInspectorTab('activity');
      setActivitySubTab('history');
    } else if (action === 'ask') {
      setInspectorTab('assist');
      setTimeout(() => document.getElementById('inspector-ai-input')?.focus(), 50);
    }
  };

  const handleSegmentClick = (e: React.MouseEvent, id: number) => {
    if (e.shiftKey) {
      // Basic shift click implementation (can be improved)
      if (primarySelectedId !== null) {
        const start = Math.min(primarySelectedId, id);
        const end = Math.max(primarySelectedId, id);
        const newSelection = segments.filter(s => s.id >= start && s.id <= end).map(s => s.id);
        setSelectedSegmentIds(newSelection);
        setPrimarySelectedId(id);
      }
    } else if (e.metaKey || e.ctrlKey) {
      // Toggle selection
      if (selectedSegmentIds.includes(id)) {
        setSelectedSegmentIds(selectedSegmentIds.filter(sid => sid !== id));
        if (primarySelectedId === id) setPrimarySelectedId(null);
      } else {
        setSelectedSegmentIds([...selectedSegmentIds, id]);
        setPrimarySelectedId(id);
      }
    } else {
      // Single selection
      setSelectedSegmentIds([id]);
      setPrimarySelectedId(id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative overflow-hidden">
      <EditorHeader onBack={onBack} />
      
      <EditorToolbar 
        showInspector={showInspector}
        setShowInspector={setShowInspector}
        showBottomPanel={showBottomPanel}
        setShowBottomPanel={setShowBottomPanel}
        compactRows={compactRows}
        setCompactRows={setCompactRows}
        showMetadata={showMetadata}
        setShowMetadata={setShowMetadata}
        showQuickAsk={showQuickAsk}
        onQuickAskClick={handleQuickAskClick}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Left Column: Segments & Bottom Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-white relative">
          {/* Segments List */}
          <div className="flex-1 overflow-y-auto relative">
            <div className="flex flex-col pb-32">
              {segments.map(seg => (
                <SegmentRow 
                  key={seg.id} 
                  segment={seg} 
                  isSelected={selectedSegmentIds.includes(seg.id)}
                  isPrimarySelected={primarySelectedId === seg.id}
                  compactRows={compactRows}
                  showMetadata={showMetadata}
                  onClick={(e) => handleSegmentClick(e, seg.id)}
                  onAction={(action) => handleSegmentAction(action, seg.id)}
                />
              ))}
            </div>
            
            {/* Selection Action Bar */}
            <SelectionActionBar 
              selectedCount={selectedSegmentIds.length} 
              onAction={(action) => handleSegmentAction(action)} 
            />
          </div>

          {/* Bottom Panel */}
          {showBottomPanel && (
            <BottomUtilityPanel 
              selectedSegments={selectedSegments} 
              onClose={() => setShowBottomPanel(false)} 
            />
          )}
        </div>

        {/* Right Column: Fixed Inspector */}
        {showInspector && (
          <div className="w-[360px] shrink-0 border-l border-slate-200 bg-white flex flex-col z-10">
            <InspectorPane 
              selectedSegments={selectedSegments} 
              onClose={() => setShowInspector(false)} 
              activeTab={inspectorTab}
              setActiveTab={setInspectorTab}
              activitySubTab={activitySubTab}
              setActivitySubTab={setActivitySubTab}
            />
          </div>
        )}

        {/* Floating Quick Ask */}
        <AnimatePresence>
          {showQuickAsk && (
            <QuickAskOverlay 
              selectedSegments={selectedSegments} 
              onClose={() => setShowQuickAsk(false)} 
              onOpenInPanel={() => {
                setShowQuickAsk(false);
                setShowInspector(true);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
