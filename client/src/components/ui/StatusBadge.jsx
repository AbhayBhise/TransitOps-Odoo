import React from 'react';

const STATUS_CONFIGS = {
  // Vehicle statuses
  AVAILABLE: {
    label: 'Available',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  ON_TRIP: {
    label: 'On Trip',
    className: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  IN_SHOP: {
    label: 'In Shop',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  RETIRED: {
    label: 'Retired',
    className: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  // Driver statuses
  OFF_DUTY: {
    label: 'Off Duty',
    className: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  },
  SUSPENDED: {
    label: 'Suspended',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
};

export default function StatusBadge({ status }) {
  const normalizedStatus = String(status).toUpperCase();
  const config = STATUS_CONFIGS[normalizedStatus] || {
    label: status,
    className: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current"></span>
      {config.label}
    </span>
  );
}
