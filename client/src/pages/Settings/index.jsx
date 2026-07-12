import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Input, Select } from '../../components/ui/FormComponents';

export default function SettingsPlaceholder() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your profile and system configurations."
      />

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel space-y-6">
        <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">Profile Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" defaultValue="M3 Developer" />
          <Input label="Email Address" defaultValue="member3@transitops.com" />
          <Select 
            label="Role (RBAC Preview)" 
            options={[
              { value: 'admin', label: 'Fleet Manager (Admin)' },
              { value: 'driver', label: 'Driver' },
              { value: 'safety', label: 'Safety Officer' },
            ]}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
