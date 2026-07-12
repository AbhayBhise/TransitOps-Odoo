import React from 'react';

export default function LoadingSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {/* Search bar skeleton */}
      <div className="h-10 bg-slate-800 rounded-lg w-full max-w-sm mb-4"></div>
      
      {/* Table grid skeleton */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/20">
        <div className="h-12 bg-slate-800/50 border-b border-slate-850 flex items-center px-6">
          {[...Array(cols)].map((_, i) => (
            <div key={i} className="h-4 bg-slate-800 rounded w-1/4 mr-4"></div>
          ))}
        </div>
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="h-16 border-b border-slate-850 flex items-center px-6 last:border-none"
          >
            {[...Array(cols)].map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-slate-800 rounded w-1/4 mr-4"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
