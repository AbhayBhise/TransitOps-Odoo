import React from 'react';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-6 border-b border-slate-800">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100 uppercase">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      {actions && (
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
