import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Layers,
  Award,
  Clock,
  Settings,
  ShieldCheck,
  CheckCircle,
  Truck,
  Users,
  CheckSquare,
  Globe,
  Bell,
  Lock,
  Eye,
  Camera,
  Edit,
  SunMoon,
  Share2,
  Activity,
  FolderGit2,
  FileCode2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const [photoSimulated, setPhotoSimulated] = useState(false);

  const stats = [
    { label: 'Projects Completed', value: '4', icon: FolderGit2, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    { label: 'Tasks Completed', value: '45', icon: CheckSquare, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Vehicles Managed', value: '12', icon: Truck, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { label: 'Drivers Added', value: '8', icon: Users, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
    { label: 'Active Sessions', value: '1', icon: Clock, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
  ];

  const personalInfo = [
    { label: 'Full Name', value: 'Vaishnavi Phad', icon: User },
    { label: 'Email Address', value: 'vaishnavi@example.com', icon: Mail },
    { label: 'Phone Number', value: '+91 9876543210', icon: Phone },
    { label: 'Location', value: 'Pune, Maharashtra', icon: MapPin },
    { label: 'Employee ID', value: 'TOP-2026-001', icon: Award },
    { label: 'Team', value: 'TransitOps', icon: Users },
  ];

  const skills = [
    'React',
    'Tailwind',
    'JavaScript',
    'TypeScript',
    'Vite',
    'shadcn/ui',
    'TanStack Query',
    'React Hook Form',
    'Zod',
  ];

  const teamMembers = [
    { name: 'Abhay Bhise', role: 'Backend Lead / Manager' },
    { name: 'Disa', role: 'Operations Module Lead' },
    { name: 'Vaishnavi Phad', role: 'Frontend ERP Developer (You)' },
  ];

  const activities = [
    { title: 'Updated Dashboard', time: '2 hours ago', description: 'Integrated TanStack Query hooks to fetch live fleet statistics.' },
    { title: 'Created Vehicle UI', time: '5 hours ago', description: 'Polished data tables and added Zod validation schemas for registration numbers.' },
    { title: 'Improved Driver Module', time: 'Yesterday', description: 'Implemented license expiry warnings and contact information registers.' },
    { title: 'Added Responsive Layout', time: '2 days ago', description: 'Refactored common layouts to support collapsible side navigation overlays.' },
    { title: 'Profile Updated', time: '3 days ago', description: 'Synchronized branding favicons and updated index.html for SEO.' },
  ];

  const settingsOptions = [
    { label: 'Theme Mode', value: 'Dark ERP Mode', icon: SunMoon },
    { label: 'Language', value: 'English (US)', icon: Globe },
    { label: 'Notifications', value: 'All Active', icon: Bell },
    { label: 'Privacy Control', value: 'Strict', icon: Eye },
    { label: 'Security Protocols', value: 'Standard Role-Based', icon: ShieldCheck },
    { label: 'Password Encryption', value: 'SHA-256 Hashes', icon: Lock },
    { label: 'Two Factor Authentication', value: 'Disabled', icon: ShieldCheck },
  ];

  const handleEditClick = () => {
    toast.success('Edit profile modal simulated (UI only)');
  };

  const handleShareClick = () => {
    toast.success('Profile sharing link copied (UI only)');
  };

  const handleChangePhotoClick = () => {
    setPhotoSimulated(true);
    toast.success('Profile photo upload simulated (UI only)');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage developer details, system configurations and security settings."
      />

      {/* Hero Profile Banner Card */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Avatar with fallback initials & change photo overlay */}
          <div className="relative shrink-0 w-24 h-24 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-bold text-3xl text-amber-500 shadow-xl shadow-amber-500/5 group overflow-hidden">
            {photoSimulated ? (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center font-sans font-extrabold text-sky-400">
                VP
              </div>
            ) : (
              <span>VP</span>
            )}
            {/* Online Pulse Dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse z-10" />
            <button
              onClick={handleChangePhotoClick}
              className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-[9px] text-slate-350 transition-opacity cursor-pointer duration-200"
            >
              <Camera size={16} className="text-amber-500" />
              <span>Change Photo</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-bold text-slate-100">Vaishnavi Phad</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-wider self-center sm:self-auto">
                <CheckCircle size={10} /> Online
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">Frontend ERP Developer</p>
            <p className="text-xs text-slate-500 font-medium">Transport Operations Department</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={handleEditClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/15"
          >
            <Edit size={14} />
            Edit Profile
          </button>
          <button
            onClick={handleShareClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-800 bg-slate-950/20 glass-panel flex items-center justify-between hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-tight">{item.label}</p>
                <h3 className="text-xl font-extrabold text-slate-100">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-lg border flex items-center justify-center ${item.color} shrink-0`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details & Settings (Col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Card */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Personal Information
            </h3>
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

          {/* Account Settings Configuration */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Account Settings (UI Only)
            </h3>
            <div className="divide-y divide-slate-850">
              {settingsOptions.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-500">
                        <Icon size={15} />
                      </div>
                      <p className="text-xs font-semibold text-slate-300">{opt.label}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{opt.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Info Panels (Col-span-1) */}
        <div className="space-y-6">
          {/* Professional Information & Skills */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Professional Details
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-500 font-semibold">Current Project</span>
                <span className="text-slate-200 font-bold">TransitOps ERP</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-500 font-semibold">Manager</span>
                <span className="text-slate-200 font-bold">Abhay Bhise</span>
              </div>
            </div>
            <div className="space-y-2 pt-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300 rounded-lg hover:border-amber-500/35 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              TransitOps Team
            </h3>
            <div className="space-y-3">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="text-xs font-bold text-slate-200 truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline section */}
      <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Recent Activity
        </h3>
        <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
          {activities.map((act, idx) => (
            <div key={idx} className="relative pl-8 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              {/* Timeline marker */}
              <div className="absolute left-1 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-200">{act.title}</p>
                <p className="text-xs text-slate-450">{act.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 shrink-0">
                <Clock size={12} />
                <span>{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
