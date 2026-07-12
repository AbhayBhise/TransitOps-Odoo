import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Input, Select } from '../../components/ui/FormComponents';

export default function SettingsPlaceholder() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your profile, roles, system preferences, and notifications."
      />

      <div className="space-y-6">
        
        {/* User Profile */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">User Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" defaultValue="Alex Mercer" />
            <Input label="Email Address" defaultValue="alex@transitops.com" />
            <Input label="Phone Number" defaultValue="+1 (555) 123-4567" />
            <Input label="Job Title" defaultValue="Operations Module Lead" />
          </div>
        </section>

        {/* Roles & RBAC */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">Roles & Access</h3>
          <div className="max-w-md">
            <Select 
              label="Assigned System Role" 
              options={[
                { value: 'admin', label: 'Fleet Manager (Full Access)' },
                { value: 'dispatcher', label: 'Dispatcher' },
                { value: 'safety', label: 'Safety Officer' },
                { value: 'driver', label: 'Driver (Mobile Only)' },
              ]}
              defaultValue="admin"
            />
            <p className="text-xs text-slate-500 mt-2">
              Role changes will apply after the next login session. 
            </p>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">System Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-800 rounded-lg">
              <div>
                <p className="font-semibold text-slate-200">Dark Theme</p>
                <p className="text-sm text-slate-500">Force the application to strictly use dark mode.</p>
              </div>
              <div className="h-6 w-11 bg-amber-500 rounded-full relative cursor-pointer shadow-lg shadow-amber-500/20">
                <div className="absolute right-1 top-1 h-4 w-4 bg-slate-950 rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-slate-800 rounded-lg">
              <div>
                <p className="font-semibold text-slate-200">Compact Table View</p>
                <p className="text-sm text-slate-500">Reduce padding in data tables to show more rows.</p>
              </div>
              <div className="h-6 w-11 bg-slate-800 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 h-4 w-4 bg-slate-500 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">Notification Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-amber-500 bg-amber-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-950 rounded-sm" />
              </div>
              <span className="text-slate-300 group-hover:text-slate-100 transition">Email alerts for new trips dispatched</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-amber-500 bg-amber-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-950 rounded-sm" />
              </div>
              <span className="text-slate-300 group-hover:text-slate-100 transition">Push notifications for vehicle maintenance</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-slate-700 bg-slate-900 flex items-center justify-center group-hover:border-slate-500 transition">
              </div>
              <span className="text-slate-300 group-hover:text-slate-100 transition">Weekly digest reports via email</span>
            </label>
          </div>
        </section>

        <div className="pt-4 flex justify-end border-t border-slate-800">
          <button className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
