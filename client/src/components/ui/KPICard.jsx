import React from 'react';

export default function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = 'up',
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/40 glass-panel animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-slate-800 rounded w-24"></div>
          <div className="w-10 h-10 bg-slate-800 rounded-lg"></div>
        </div>
        <div className="h-8 bg-slate-800 rounded w-16 mb-2"></div>
        <div className="h-4 bg-slate-800 rounded w-32"></div>
      </div>
    );
  }

  const isTrendUp = trendDirection === 'up';

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/40 glass-panel glass-panel-hover flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-400">{title}</span>
          {Icon && (
            <div className="p-2.5 bg-slate-800/60 rounded-lg text-amber-500 border border-slate-700/50">
              <Icon size={18} />
            </div>
          )}
        </div>
        <div className="text-3xl font-bold tracking-tight text-slate-100 mt-1">
          {value}
        </div>
      </div>

      {trend && (
        <div className="flex items-center mt-4 text-xs">
          <span
            className={`font-semibold mr-1.5 ${
              isTrendUp ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isTrendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
}
