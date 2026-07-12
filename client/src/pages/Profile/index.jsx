import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle,
  Camera,
  Edit,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleLabel = (role) => {
    const labels = { ADMIN: 'Administrator', MANAGER: 'Fleet Manager', USER: 'Operations Staff', DRIVER: 'Driver' };
    return labels[role] || role || 'User';
  };

  const personalInfo = [
    { label: 'Full Name', value: user?.name || 'N/A', icon: User },
    { label: 'Email Address', value: user?.email || 'N/A', icon: Mail },
    { label: 'Role', value: getRoleLabel(user?.role), icon: ShieldCheck },
    { label: 'Account ID', value: user?.id?.slice(0, 8) || 'N/A', icon: Calendar },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setSaving(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      toast.success('Password changed successfully');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to change password';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="View your account details and manage security settings."
      />

      {/* Hero Profile Banner */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative shrink-0 w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-bold text-3xl text-amber-500 shadow-xl shadow-amber-500/5">
            <span>{getInitials(user?.name)}</span>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse z-10" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-bold text-slate-100">{user?.name || 'User'}</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-wider self-center sm:self-auto">
                <CheckCircle size={10} /> Online
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{getRoleLabel(user?.role)}</p>
            <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/15"
          >
            <Lock size={14} />
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      {/* Change Password Form */}
      {showChangePassword && (
        <form onSubmit={handleChangePassword} className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Change Password</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Current Password</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={pwForm.currentPassword}
                onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">New Password</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={pwForm.newPassword}
                onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                placeholder="Min 6 characters"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Confirm Password</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              {showPw ? <EyeOff size={12} /> : <Eye size={12} />}
              {showPw ? 'Hide' : 'Show'}
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setShowChangePassword(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors disabled:opacity-50"
            >
              {saving && <Loader2 size={12} className="animate-spin" />}
              Save
            </button>
          </div>
        </form>
      )}

      {/* Personal Information */}
      <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personalInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-3.5 bg-slate-900/50 rounded-xl border border-slate-800/80">
                <div className="p-2 bg-slate-800 text-slate-400 rounded-lg">
                  <Icon size={14} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{info.label}</p>
                  <p className="text-xs font-medium text-slate-200 truncate max-w-[220px]">{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
