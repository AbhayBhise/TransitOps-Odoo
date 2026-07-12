import React from 'react';

export const Input = React.forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-slate-950/60 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all ${
            error ? 'border-rose-500/80 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-800'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export const Select = React.forwardRef(
  ({ label, options = [], error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 bg-slate-950/60 border rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all appearance-none ${
            error ? 'border-rose-500/80 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-800'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export const Textarea = React.forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={3}
          className={`w-full px-4 py-2.5 bg-slate-950/60 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all ${
            error ? 'border-rose-500/80 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-800'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
