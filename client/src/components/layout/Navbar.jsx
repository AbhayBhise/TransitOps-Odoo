import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Globe,
  ChevronDown,
  Menu,
  LayoutDashboard,
  User,
  Settings as SettingsIcon,
  HelpCircle,
  SunMoon,
  LogOut,
} from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Navbar({ onToggleMobileMenu }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const menuOptions = [
    { label: 'Dashboard', action: () => navigate('/dashboard'), icon: LayoutDashboard },
    { label: 'Profile', action: () => toast.success('Profile page (ERP Demo)'), icon: User },
    { label: 'Account Settings', action: () => navigate('/settings'), icon: SettingsIcon },
    { label: 'Notifications', action: () => toast.success('Notifications Panel'), icon: Bell },
    { label: 'Help & Support', action: () => toast.success('TransitOps Support Center'), icon: HelpCircle },
    { label: 'Theme Toggle', action: () => toast.success('Theme Toggled (Locked to Dark ERP mode)'), icon: SunMoon },
    { label: 'Logout', action: () => toast.error('Logout simulated (UI only)'), icon: LogOut, isDestructive: true },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation inside dropdown menu
  useEffect(() => {
    if (!showProfile) {
      setFocusedIndex(-1);
      return;
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setShowProfile(false);
        buttonRef.current?.focus();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        setFocusedIndex((prev) => (prev + 1) % menuOptions.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (focusedIndex >= 0 && focusedIndex < menuOptions.length) {
          menuOptions[focusedIndex].action();
          setShowProfile(false);
          e.preventDefault();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showProfile, focusedIndex]);

  const handleDropdownItemClick = (action) => {
    action();
    setShowProfile(false);
  };

  return (
    <header className="h-16 px-4 md:px-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Mobile Toggle & Hub Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500/50"
          aria-label="Toggle Navigation Drawer"
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
        <button
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors hidden sm:block focus-visible:ring-2 focus-visible:ring-amber-500/50"
          aria-label="Language Selector"
        >
          <Globe size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl transition-colors relative cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500/50"
            aria-label="View recent alerts"
            aria-expanded={showNotifications}
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full border border-slate-950"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl glass-panel overflow-hidden py-1 z-40 animate-fade-in">
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

        {/* User Profile Section with redone shadcn dropdown replica */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setShowProfile(!showProfile)}
            aria-haspopup="true"
            aria-expanded={showProfile}
            aria-label="User menu"
            className="flex items-center gap-2.5 p-1 px-1.5 sm:px-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900/60 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            {/* Circular Avatar with fallback initials & status dot */}
            <div className="relative w-7.5 h-7.5 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-bold text-xs text-amber-500 shrink-0">
              <span>AD</span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-950 animate-pulse shadow-sm shadow-emerald-500/50" />
            </div>
            <div className="hidden md:block text-left pr-1">
              <p className="text-xs font-bold text-slate-200 leading-tight">Alex Driver</p>
              <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Fleet Manager</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {showProfile && (
            <div
              ref={dropdownRef}
              role="menu"
              aria-label="User actions"
              className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl glass-panel overflow-hidden py-1.5 z-40 animate-slide-in"
            >
              {/* Profile Header Details */}
              <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-950/20 mb-1">
                <p className="text-xs font-bold text-slate-200">Alex Driver</p>
                <p className="text-[10px] text-slate-500 truncate">manager@transitops.com</p>
              </div>

              {/* Menu list options */}
              {menuOptions.map((item, idx) => {
                const Icon = item.icon;
                const isFocused = idx === focusedIndex;
                return (
                  <button
                    key={idx}
                    role="menuitem"
                    onClick={() => handleDropdownItemClick(item.action)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs transition-colors cursor-pointer ${
                      isFocused
                        ? 'bg-slate-800 text-slate-100'
                        : item.isDestructive
                        ? 'text-rose-400 hover:bg-rose-500/10'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                  >
                    <Icon size={14} className={item.isDestructive ? 'text-rose-400' : 'text-slate-400'} />
                    <span className="flex-1">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
