import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Truck,
  Users,
  Compass,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  User,
} from 'lucide-react';

const MENU_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/vehicles', label: 'Vehicles', icon: Truck },
  { path: '/drivers', label: 'Drivers', icon: Users },
  { path: '/trips', label: 'Trips', icon: Compass },
  { path: '/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/fuel', label: 'Fuel & Expenses', icon: Fuel },
  { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 bg-slate-950 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg shadow-md shrink-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="shrink-0">
              <path d="M5 4 L13 12 L5 20" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 4 L19 12 L11 20" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <span className="text-base font-extrabold uppercase tracking-widest text-slate-100 font-mono">
              Transit<span className="text-amber-500">Ops</span>
            </span>
          )}
        </div>
        {/* Toggle Collapse Button (desktop only) */}
        {!isMobileOpen && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
        {/* Close Button (mobile only) */}
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Menu List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (isMobileOpen) {
                  setIsMobileOpen(false);
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/25 shadow-inner'
                    : 'text-slate-400 border-transparent hover:bg-slate-900/60 hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {(!isCollapsed || isMobileOpen) && (
        <div className="p-5 border-t border-slate-900 bg-slate-950 text-center shrink-0">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            TransitOps Enterprise
          </div>
          <div className="text-[9px] text-slate-600 mt-0.5">v1.0.0 (Odoo Hackathon)</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col min-h-screen bg-slate-950 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </div>

      {/* Mobile Drawer (Overlay backdrop + Sidebar content) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-64 h-full shadow-2xl">
            {sidebarContent}
          </div>
          <div className="flex-1 h-full" onClick={() => setIsMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
