import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const inputRef = useRef(null);
  const [shortcutText, setShortcutText] = useState('Ctrl K');

  useEffect(() => {
    // Detect OS for shortcut hint
    const isMac = typeof window !== 'undefined' && /Mac|iPad|iPhone|iPod/.test(navigator.userAgent);
    setShortcutText(isMac ? '⌘K' : 'Ctrl+K');

    const handleKeyDown = (e) => {
      // Trigger on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[200px] lg:w-[240px] hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Quick search..."
        className="w-full pl-8.5 pr-12 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50"
      />
      <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-slate-800/80 border border-slate-700/60 rounded text-[9px] font-mono text-slate-400 select-none pointer-events-none uppercase tracking-tighter">
        {shortcutText}
      </kbd>
    </div>
  );
}
