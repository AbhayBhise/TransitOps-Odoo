import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function ReportsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-slate-900/50 rounded-xl border border-slate-800 glass-panel">
      <div className="p-4 bg-amber-500/10 rounded-full text-amber-500 mb-4">
        <BarChart3 size={40} className="animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Reports & Analytics</h2>
      <p className="text-slate-400 max-w-md">
        This module is currently being implemented by the Operations Lead (Member 3). It will display fleet utilization, fuel efficiency reports, and ROI charts.
      </p>
    </div>
  );
}
