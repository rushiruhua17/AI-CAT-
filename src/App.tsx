/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cat } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import Editor from './components/Editor';

export default function App() {
  const [view, setView] = useState<'projects' | 'editor'>('projects');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleOpenEditor = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setView('editor');
      setIsSidebarCollapsed(true);
    }, 1500);
  };

  const handleBackToProjects = () => {
    setView('projects');
    setIsSidebarCollapsed(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar 
        currentView={view === 'editor' ? 'editor' : 'dashboard'} 
        onViewChange={(v) => {
          if (v === 'dashboard') handleBackToProjects();
        }} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Cat className="w-24 h-24 text-violet-500" />
              </motion.div>
              <motion.h2 
                className="mt-6 text-xl font-semibold text-slate-700"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading Project...
              </motion.h2>
            </motion.div>
          ) : view === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full w-full"
            >
              <Projects onOpenEditor={handleOpenEditor} />
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full w-full"
            >
              <Editor onBack={handleBackToProjects} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

