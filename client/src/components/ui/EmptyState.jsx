import React from 'react';
import { Database } from 'lucide-react';

export default function EmptyState({
  title = 'No records found',
  description = 'Try adjusting your search filters or add a new record to get started.',
  icon: Icon = Database,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-950/20 text-center">
      <div className="p-3 bg-slate-900 rounded-lg text-slate-500 mb-4 border border-slate-800">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
