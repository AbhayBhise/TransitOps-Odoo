import React, { useState } from 'react';
import { Bell, Globe, ChevronDown, Menu } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

export default function Navbar({ onToggleMobileMenu }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 px-4 md:px-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Mobile Toggle & Hub Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
          Hub: Fleet-Alpha
        </span>
      </div>

      {/* Global Navbar Search Bar */}
      <SearchBar />


      {/* Action Utilities */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Globe icon */}
        <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors hidden sm:block">
          <Globe size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors relative cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full border border-slate-950"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl glass-panel overflow-hidden py-1 z-40">
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/40">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Recent Alerts
                </span>
              </div>
              <div className="divide-y divide-slate-850 max-h-60 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-slate-850/30 transition-colors">
                  <p className="text-xs font-semibold text-slate-200">Driver License Expiring</p>
                  <p className="text-[10px] text-slate-400 mt-1">Driver John Doe's license expires in 5 days.</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-850/30 transition-colors">
                  <p className="text-xs font-semibold text-slate-200">Vehicle Maintenance Due</p>
                  <p className="text-[10px] text-slate-400 mt-1">Truck TRK-409 odometer has reached limit.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <span className="h-6 w-px bg-slate-800" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 p-1 px-1.5 sm:px-2.5 rounded-xl border border-slate-800/80 hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-200">Alex Driver</p>
              <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Fleet Manager</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl glass-panel overflow-hidden py-1.5 z-40">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="text-xs font-bold text-slate-200">Alex Driver</p>
                <p className="text-[10px] text-slate-500">manager@transitops.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-850 hover:text-slate-100 transition-colors">
                My Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
