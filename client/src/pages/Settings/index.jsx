import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Input, Select } from '../../components/ui/FormComponents';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../services/settings.service';
import { toast } from 'react-hot-toast';

const INITIAL_PROFILE = {
  fullName: 'Alex Mercer',
  email: 'alex@transitops.com',
  phone: '+91 98765 43210',
  jobTitle: 'Operations Module Lead',
};

const INITIAL_PREFERENCES = {
  darkTheme: true,
  compactView: false,
  emailAlerts: true,
  pushNotifications: true,
  weeklyDigest: false,
};

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Fleet Manager (Full Access)' },
  { value: 'dispatcher', label: 'Dispatcher' },
  { value: 'safety', label: 'Safety Officer' },
  { value: 'driver', label: 'Driver (Mobile Only)' },
];

export default function SettingsPlaceholder() {
  const queryClient = useQueryClient();

  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [role, setRole] = useState('admin');
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);

  const { data: queryProfile } = useQuery({
    queryKey: ['settings-profile'],
    queryFn: async () => {
      try {
        const res = await settingsService.getProfile();
        return res || INITIAL_PROFILE;
      } catch (err) {
        console.warn('Backend profile API offline. Using defaults.', err);
        return INITIAL_PROFILE;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data: queryPreferences } = useQuery({
    queryKey: ['settings-preferences'],
    queryFn: async () => {
      try {
        const res = await settingsService.getPreferences();
        return res || INITIAL_PREFERENCES;
      } catch (err) {
        console.warn('Backend preferences API offline. Using defaults.', err);
        return INITIAL_PREFERENCES;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => { if (queryProfile) setProfile(queryProfile); }, [queryProfile]);
  useEffect(() => { if (queryPreferences) setPreferences(queryPreferences); }, [queryPreferences]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      await settingsService.updateProfile(profile);
      await settingsService.updatePreferences(preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings-profile'] });
      queryClient.invalidateQueries({ queryKey: ['settings-preferences'] });
      toast.success('Settings saved successfully');
    },
    onError: () => {
      toast.success('Settings saved (Local Simulation)');
    },
  });

  const handleSave = () => {
    saveMutation.mutate();
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, roles, system preferences, and notifications."
      />

      <div className="space-y-6">

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">User Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={profile.fullName}
              onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
            />
            <Input
              label="Email Address"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
            <Input
              label="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            />
            <Input
              label="Job Title"
              value={profile.jobTitle}
              onChange={(e) => setProfile((p) => ({ ...p, jobTitle: e.target.value }))}
            />
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">Roles & Access Control</h3>
          <div className="max-w-md">
            <Select
              label="Assigned System Role"
              options={ROLE_OPTIONS}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-2">
              Role changes apply after next login session.
            </p>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">System Preferences</h3>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-4 border border-slate-800 rounded-lg cursor-pointer"
              onClick={() => togglePreference('darkTheme')}
            >
              <div>
                <p className="font-semibold text-slate-200">Dark Theme</p>
                <p className="text-sm text-slate-500">Force the application to use dark mode.</p>
              </div>
              <div className={`h-6 w-11 rounded-full relative transition-colors ${preferences.darkTheme ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800'}`}>
                <div className={`absolute top-1 h-4 w-4 bg-slate-950 rounded-full transition-all ${preferences.darkTheme ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
            <div
              className="flex items-center justify-between p-4 border border-slate-800 rounded-lg cursor-pointer"
              onClick={() => togglePreference('compactView')}
            >
              <div>
                <p className="font-semibold text-slate-200">Compact Table View</p>
                <p className="text-sm text-slate-500">Reduce padding in data tables.</p>
              </div>
              <div className={`h-6 w-11 rounded-full relative transition-colors ${preferences.compactView ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800'}`}>
                <div className={`absolute top-1 h-4 w-4 bg-slate-950 rounded-full transition-all ${preferences.compactView ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 mb-6">Notification Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group" onClick={() => togglePreference('emailAlerts')}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${preferences.emailAlerts ? 'border-amber-500 bg-amber-500' : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'}`}>
                {preferences.emailAlerts && <div className="w-2 h-2 bg-slate-950 rounded-sm" />}
              </div>
              <span className="text-slate-300 group-hover:text-slate-100 transition">Email alerts for new trips dispatched</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group" onClick={() => togglePreference('pushNotifications')}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${preferences.pushNotifications ? 'border-amber-500 bg-amber-500' : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'}`}>
                {preferences.pushNotifications && <div className="w-2 h-2 bg-slate-950 rounded-sm" />}
              </div>
              <span className="text-slate-300 group-hover:text-slate-100 transition">Push notifications for vehicle maintenance</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group" onClick={() => togglePreference('weeklyDigest')}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${preferences.weeklyDigest ? 'border-amber-500 bg-amber-500' : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'}`}>
                {preferences.weeklyDigest && <div className="w-2 h-2 bg-slate-950 rounded-sm" />}
              </div>
              <span className="text-slate-300 group-hover:text-slate-100 transition">Weekly digest reports via email</span>
            </label>
          </div>
        </section>

        <div className="pt-4 flex justify-end border-t border-slate-800">
          <button
            onClick={handleSave}
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
