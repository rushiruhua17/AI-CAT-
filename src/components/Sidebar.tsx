import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder,
  BarChart2,
  Settings,
  PanelLeftClose,
  PanelLeft,
  ArrowUpCircle,
  ChevronUp,
  Languages,
  Users
} from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'editor';
  onViewChange: (view: 'dashboard' | 'editor') => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ currentView, onViewChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      className={`flex flex-col bg-[#f9f9f9] h-full transition-all duration-300 ease-in-out shrink-0 border-r border-gray-200 relative ${
        isCollapsed ? 'w-[60px]' : 'w-[260px]'
      }`}
    >
      {/* Top Toggle */}
      <div className="flex items-center justify-between p-3">
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-[#e5e5e5] rounded-lg text-gray-600 transition-colors"
          title="Toggle Sidebar"
        >
          {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-1 no-scrollbar">
        <div className="flex flex-col gap-0.5 mb-4">
          <NavItem 
            icon={Folder} 
            label="Projects" 
            collapsed={isCollapsed} 
            active={currentView === 'dashboard'} 
            onClick={() => onViewChange('dashboard')} 
          />
          <NavItem 
            icon={BarChart2} 
            label="Reports" 
            collapsed={isCollapsed} 
          />
          <NavItem 
            icon={Languages} 
            label="Linguistic Assets" 
            collapsed={isCollapsed} 
          />
          <NavItem 
            icon={Users} 
            label="Team" 
            collapsed={isCollapsed} 
          />
          <NavItem 
            icon={Settings} 
            label="Settings" 
            collapsed={isCollapsed} 
          />
        </div>
      </div>

      {/* User Profile / Bottom */}
      <div className="p-3 relative" ref={profileRef}>
        {/* Profile Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute bottom-full left-3 mb-2 w-64 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 py-2 z-50 text-sm">
            {/* Team Section */}
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="text-xs text-gray-500 mb-2">Create new team</div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4a154b] flex items-center justify-center text-white shrink-0">
                  <div className="w-4 h-4 border-2 border-white rounded-sm opacity-80"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">shane's Team</span>
                    <span className="text-xs text-gray-500 shrink-0">Free</span>
                  </div>
                  <div className="text-xs text-gray-500">Owner</div>
                </div>
              </div>
            </div>

            {/* Upgrade Section */}
            <div className="px-4 py-3 border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="text-gray-700 mb-1">Your team is currently on the Free plan</div>
              <div className="text-[#e53e3e] font-medium flex items-center gap-1.5">
                <ArrowUpCircle className="w-4 h-4" /> See upgrade options
              </div>
            </div>

            {/* Links Section */}
            <div className="border-t border-gray-100 py-1">
              <DropdownItem text="Billing" />
              <DropdownItem text="View privacy policy" />
              <DropdownItem text="View terms of service" />
              <DropdownItem text="Team settings" />
            </div>

            {/* Profile Settings Section */}
            <div className="border-t border-gray-100 py-1">
              <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="text-gray-700">Profile Settings</div>
                <div className="text-xs text-gray-500 truncate">wxy9516@gmail.com</div>
              </div>
            </div>

            {/* System Section */}
            <div className="border-t border-gray-100 py-1">
              <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-colors">
                <span className="text-gray-700">Dark mode</span>
                <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors">
                Logout
              </div>
            </div>
          </div>
        )}

        {/* Profile Button */}
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-[#e5e5e5] w-full ${isCollapsed ? 'justify-center px-0' : ''} ${isProfileOpen ? 'bg-[#e5e5e5]' : ''}`}
        >
          <div className="w-7 h-7 rounded-full bg-[#4a154b] text-white flex items-center justify-center text-xs font-medium shrink-0 relative">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-sm opacity-80"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#f9f9f9] flex items-center justify-center">
              <ChevronUp className="w-2 h-2 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col items-start truncate flex-1">
              <span className="text-sm font-medium">shane's Team</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

function NavItem({ 
  icon: Icon, 
  label, 
  collapsed, 
  active, 
  onClick, 
}: { 
  icon: any, 
  label: string, 
  collapsed: boolean, 
  active?: boolean, 
  onClick?: () => void,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 py-2.5 rounded-lg transition-colors ${
        active ? 'bg-[#e5e5e5] text-gray-900 font-medium' : 'text-gray-700 hover:bg-[#e5e5e5]'
      } ${collapsed ? 'justify-center px-0' : 'px-3'}`}
      title={collapsed ? label : undefined}
    >
      <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-gray-900' : 'text-gray-500'}`} />
      {!collapsed && (
        <span className="text-sm truncate">
          {label}
        </span>
      )}
    </button>
  );
}

function DropdownItem({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors">
      {text}
    </div>
  );
}
