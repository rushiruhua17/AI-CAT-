import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Languages, 
  BookOpen, 
  RefreshCw, 
  Check, 
  X, 
  Plus,
  Mic,
  Image as ImageIcon,
  ChevronDown,
  MessageSquare,
  Search,
  Bot,
  Target
} from 'lucide-react';
import { Segment } from '../types';

type Mode = 'Ask' | 'Review' | 'Translation' | 'LLM';
type Model = 'GPT-4o' | 'Claude 3.5' | 'Gemini 1.5' | 'DeepSeek';

export default function CopilotPanel({ activeSegment, onClose }: { activeSegment?: Segment, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'chat' | 'context'>('chat');
  const [mode, setMode] = useState<Mode>('Ask');
  const [model, setModel] = useState<Model>('GPT-4o');
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const modes: { id: Mode; icon: any; label: string }[] = [
    { id: 'Ask', icon: MessageSquare, label: 'Ask' },
    { id: 'Review', icon: Search, label: 'Review' },
    { id: 'Translation', icon: Languages, label: 'Translation' },
    { id: 'LLM', icon: Bot, label: 'LLM' },
  ];

  const models: Model[] = ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'DeepSeek'];

  const activeModeData = modes.find(m => m.id === mode) || modes[0];
  const ModeIcon = activeModeData.icon;

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-500" />
          <span className="text-sm font-bold text-slate-900">AI Copilot</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Target Indicator */}
      <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-2 shrink-0">
        <Target className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-800 font-semibold">
          Target: {activeSegment ? `Segment ${activeSegment.id}` : 'None selected'}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1.5 border-b border-slate-200 gap-1 bg-slate-50 shrink-0">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[13px] font-medium rounded-md transition-all ${
            activeTab === 'chat' ? 'bg-white text-primary-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Chat
        </button>
        <button 
          onClick={() => setActiveTab('context')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[13px] font-medium rounded-md transition-all ${
            activeTab === 'context' ? 'bg-white text-primary-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Context
        </button>
      </div>

      {activeTab === 'chat' ? (
        <>
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white no-scrollbar">
            {!activeSegment ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500 font-medium">Please select a segment first</p>
                <p className="text-xs text-slate-400 mt-1">AI needs a target to assist you effectively.</p>
              </div>
            ) : (
              <>
                {/* AI Greeting */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-ai-50 flex items-center justify-center shrink-0 border border-ai-100">
                    <Sparkles className="w-4 h-4 text-ai-600" />
                  </div>
                  <div className="text-[13px] text-slate-800 leading-relaxed pt-1">
                    Hello! I'm your AI Copilot. I can help you translate, review, or answer questions about the text.
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    <span className="text-xs font-medium text-slate-600">You</span>
                  </div>
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tr-sm px-4 py-2.5 text-[13px] text-slate-800 leading-relaxed max-w-[85%]">
                    How do I translate "{activeSegment.source}" in this context?
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-ai-50 flex items-center justify-center shrink-0 border border-ai-100">
                    <Sparkles className="w-4 h-4 text-ai-600" />
                  </div>
                  <div className="text-[13px] text-slate-800 space-y-3 leading-relaxed pt-1 w-full">
                    <p>In this financial presentation context, it usually translates to:</p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm font-medium text-slate-900">
                      {activeSegment.target || '财务概览'}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button className="flex items-center gap-1.5 text-xs font-medium bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md hover:bg-primary-100 transition-colors">
                        <Check className="w-3.5 h-3.5" /> Apply
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-medium bg-white text-slate-600 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors border border-slate-200">
                        <RefreshCw className="w-3.5 h-3.5" /> Alternative
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Input Area (Cursor/ChatGPT Style) */}
          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="flex flex-col bg-white border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
              
              {/* Textarea */}
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={activeSegment ? "Ask anything..." : "Select a segment to ask..."}
                disabled={!activeSegment}
                className="w-full bg-transparent border-none px-3 py-2.5 text-[13px] focus:outline-none resize-none min-h-[60px] max-h-[150px] text-slate-800 placeholder-slate-400 disabled:opacity-50"
                rows={1}
              />
              
              {/* Bottom Toolbar */}
              <div className="flex items-center justify-between px-2 pb-2 pt-1">
                <div className="flex items-center gap-1 relative">
                  {/* Add Attachment */}
                  <button disabled={!activeSegment} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50" title="Add attachment">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  
                  {/* Add Image */}
                  <button disabled={!activeSegment} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50" title="Add image">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>

                  {/* Mode Switcher */}
                  <div className="relative ml-1">
                    <button 
                      disabled={!activeSegment}
                      onClick={() => { setIsModeOpen(!isModeOpen); setIsModelOpen(false); }}
                      className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded transition-colors disabled:opacity-50"
                    >
                      <ModeIcon className="w-3 h-3" />
                      {mode}
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                    
                    {isModeOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                        {modes.map(m => (
                          <button
                            key={m.id}
                            onClick={() => { setMode(m.id); setIsModeOpen(false); }}
                            className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 transition-colors ${mode === m.id ? 'text-primary-600 font-medium' : 'text-slate-700'}`}
                          >
                            <m.icon className="w-3.5 h-3.5" />
                            {m.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Model Switcher */}
                  <div className="relative ml-1">
                    <button 
                      disabled={!activeSegment}
                      onClick={() => { setIsModelOpen(!isModelOpen); setIsModeOpen(false); }}
                      className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors disabled:opacity-50"
                    >
                      {model}
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                    
                    {isModelOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-32 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                        {models.map(m => (
                          <button
                            key={m}
                            onClick={() => { setModel(m); setIsModelOpen(false); }}
                            className={`flex items-center w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 transition-colors ${model === m ? 'text-slate-900 font-medium' : 'text-slate-600'}`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Voice Input */}
                  <button disabled={!activeSegment} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50" title="Voice input">
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                  
                  {/* Send Button */}
                  <button 
                    disabled={!activeSegment || !inputValue.trim()}
                    className={`p-1.5 rounded-md transition-colors flex items-center justify-center ${
                      inputValue.trim() && activeSegment ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Project Knowledge</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary-500" />
                <span className="text-[13px] font-semibold text-slate-800">Style Guide</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">Formal, professional tone. Use active voice and avoid overly complex jargon where possible.</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Languages className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[13px] font-semibold text-slate-800">Glossary</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">3 terms found for current segment.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
