import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MoreVertical, Download, LayoutGrid, List, Filter, ArrowUpDown, Columns } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'In progress' | 'Completed' | 'Archived';
  creator: { name: string; initials: string; color: string };
  languagePairs: string;
  suppliers: string;
  deadline: string;
  created: string;
  updated: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: '导师啊',
    progress: 51,
    status: 'In progress',
    creator: { name: 'Shawn Wang', initials: 'SW', color: 'bg-fuchsia-500' },
    languagePairs: 'Zh-Hans → Tr +1 More',
    suppliers: 'Smartcat AI',
    deadline: 'Feb 18, 2026',
    created: 'Feb 8, 2026',
    updated: 'Feb 8, 2026',
  },
  {
    id: '2',
    name: '111',
    progress: 50,
    status: 'In progress',
    creator: { name: 'Shawn Wang', initials: 'SW', color: 'bg-fuchsia-500' },
    languagePairs: 'Zh-Hans → En',
    suppliers: 'Smartcat AI',
    deadline: 'Feb 8, 2026',
    created: 'Feb 8, 2026',
    updated: 'Feb 8, 2026',
  }
];

const allProperties = [
  { id: 'projectNumber', label: 'Project number', defaultVisible: false },
  { id: 'progress', label: 'Progress', defaultVisible: true },
  { id: 'status', label: 'Status', defaultVisible: true },
  { id: 'creator', label: 'Creator', defaultVisible: true },
  { id: 'languagePairs', label: 'Language pairs', defaultVisible: true },
  { id: 'suppliers', label: 'Suppliers', defaultVisible: true },
  { id: 'client', label: 'Client', defaultVisible: false },
  { id: 'deadline', label: 'Deadline', defaultVisible: true },
  { id: 'created', label: 'Created', defaultVisible: true },
  { id: 'updated', label: 'Updated', defaultVisible: true },
  { id: 'done', label: 'Done', defaultVisible: false },
];

export default function Projects({ onOpenEditor }: { onOpenEditor: () => void }) {
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showProperties, setShowProperties] = useState(false);
  const [visibleProps, setVisibleProps] = useState<Record<string, boolean>>(
    allProperties.reduce((acc, prop) => ({ ...acc, [prop.id]: prop.defaultVisible }), {})
  );
  const propertiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (propertiesRef.current && !propertiesRef.current.contains(event.target as Node)) {
        setShowProperties(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProperty = (id: string) => {
    setVisibleProps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
        <button className="bg-[#1e1b4b] hover:bg-[#2e2b5b] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
          <span>+</span> New project
        </button>
      </div>

      {/* Tabs & Toolbar */}
      <div className="px-8 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-6">
          {['All', 'In progress', 'Completed', 'Archived'].map(tab => {
            const count = tab === 'All' || tab === 'In progress' ? 2 : 0;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 py-3 border-b-2 transition-colors ${
                  activeTab === tab ? 'border-slate-900 text-slate-900 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
                <span className="bg-slate-100 text-slate-600 text-xs py-0.5 px-2 rounded-full font-medium">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </div>
          
          <div className="relative" ref={propertiesRef}>
            <button 
              onClick={() => setShowProperties(!showProperties)}
              className={`flex items-center gap-2 hover:text-slate-900 px-2 py-1 rounded ${showProperties ? 'bg-slate-100 text-slate-900' : ''}`}
            >
              <Columns className="w-4 h-4" />
              <span>Properties</span>
            </button>
            
            {showProperties && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                {allProperties.map(prop => (
                  <label 
                    key={prop.id} 
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleProperty(prop.id);
                    }}
                  >
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${visibleProps[prop.id] ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${visibleProps[prop.id] ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-sm text-slate-700">{prop.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </div>
          <div className="flex items-center gap-1 border border-slate-200 rounded-md p-0.5">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white p-8">
        {viewMode === 'list' ? (
          <div className="w-full">
            {/* Table Header */}
            <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">
              <div className="w-10 shrink-0">
                <input type="checkbox" className="rounded border-slate-300" />
              </div>
              <div className="flex-1 min-w-[200px]">Project</div>
              {visibleProps.progress && <div className="w-48 shrink-0">Progress</div>}
              {visibleProps.status && <div className="w-32 shrink-0">Status</div>}
              {visibleProps.creator && <div className="w-40 shrink-0">Creator</div>}
              {visibleProps.languagePairs && <div className="w-48 shrink-0">Language pairs</div>}
              {visibleProps.suppliers && <div className="w-40 shrink-0">Suppliers</div>}
              {visibleProps.deadline && <div className="w-32 shrink-0">Deadline</div>}
              {visibleProps.created && <div className="w-32 shrink-0">Created</div>}
              {visibleProps.updated && <div className="w-32 shrink-0">Updated</div>}
              <div className="w-20 shrink-0 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col gap-2">
              {mockProjects.map(project => (
                <div key={project.id} className="flex items-center px-4 py-4 hover:bg-slate-50 border-b border-slate-100 transition-colors group">
                  <div className="w-10 shrink-0">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </div>
                  <div className="flex-1 min-w-[200px] flex items-center gap-3">
                    <div className="p-1.5 bg-slate-100 rounded text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <span onClick={onOpenEditor} className="font-medium text-slate-700 hover:text-violet-600 cursor-pointer">{project.name}</span>
                  </div>
                  
                  {visibleProps.progress && (
                    <div className="w-48 shrink-0 flex items-center gap-3 pr-4">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-600 rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded">{project.progress}%</span>
                    </div>
                  )}

                  {visibleProps.status && (
                    <div className="w-32 shrink-0">
                      <span className="text-xs font-medium text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                        {project.status}
                      </span>
                    </div>
                  )}

                  {visibleProps.creator && (
                    <div className="w-40 shrink-0 flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${project.creator.color} text-white flex items-center justify-center text-[10px] font-medium`}>
                        {project.creator.initials}
                      </div>
                      <span className="text-sm text-slate-600">{project.creator.name}</span>
                    </div>
                  )}

                  {visibleProps.languagePairs && (
                    <div className="w-48 shrink-0 text-sm text-slate-600">
                      {project.languagePairs}
                    </div>
                  )}

                  {visibleProps.suppliers && (
                    <div className="w-40 shrink-0 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                        Sc
                      </div>
                      <span className="text-sm text-slate-600">{project.suppliers}</span>
                    </div>
                  )}

                  {visibleProps.deadline && (
                    <div className="w-32 shrink-0 text-sm text-slate-600">
                      {project.deadline}
                    </div>
                  )}

                  {visibleProps.created && (
                    <div className="w-32 shrink-0 text-sm text-slate-600">
                      {project.created}
                    </div>
                  )}

                  {visibleProps.updated && (
                    <div className="w-32 shrink-0 text-sm text-slate-600">
                      {project.updated}
                    </div>
                  )}

                  <div className="w-20 shrink-0 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProjects.map(project => (
              <div key={project.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <h3 onClick={onOpenEditor} className="font-semibold text-slate-800 hover:text-violet-600 cursor-pointer text-lg">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">{project.status}</span>
                      <span className="text-slate-500">Due: {project.deadline.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-600 rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded">{project.progress}%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Creator</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full ${project.creator.color} text-white flex items-center justify-center text-[9px] font-medium`}>
                          {project.creator.initials}
                        </div>
                        <span className="text-slate-700">{project.creator.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Language pairs</span>
                      <span className="text-slate-700">{project.languagePairs}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
