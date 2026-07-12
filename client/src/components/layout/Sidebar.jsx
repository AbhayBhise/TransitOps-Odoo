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
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`relative flex flex-col min-h-screen bg-slate-950 border-r border-slate-800 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 bg-amber-500 rounded-lg text-slate-950 shadow-md shadow-amber-500/10 shrink-0">
            <ShieldCheck size={20} />
          </div>
          {!isCollapsed && (
            <span className="text-base font-extrabold uppercase tracking-widest text-slate-100 font-mono">
              Transit<span className="text-amber-500">Ops</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex items-center justify-center p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Workspace Menu list */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/25 shadow-inner'
                    : 'text-slate-400 border-transparent hover:bg-slate-900/60 hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Build mark */}
      {!isCollapsed && (
        <div className="p-5 border-t border-slate-900 bg-slate-950 text-center">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            TransitOps Enterprise
          </div>
          <div className="text-[9px] text-slate-600 mt-0.5">v1.0.0 (Odoo Hackathon)</div>
        </div>
      )}
    </div>
  );
}
