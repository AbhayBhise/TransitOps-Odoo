import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main viewport area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic page content wrapper */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
