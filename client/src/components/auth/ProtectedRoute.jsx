import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children, permission }) {
  const { isAuthenticated, loading, hasPermission } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
          <div className="text-5xl">🚫</div>
          <h2 className="text-xl font-bold text-slate-200">Access Denied</h2>
          <p className="text-sm text-slate-400 max-w-sm">
            You do not have permission to access this page. Contact your administrator if you believe this is an error.
          </p>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">HTTP 403 — Forbidden</p>
        </div>
      </div>
    );
  }

  return children;
}
