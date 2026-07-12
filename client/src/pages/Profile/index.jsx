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
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { label: 'Vehicles Managed', value: '12', icon: Truck, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { label: 'Drivers Registered', value: '8', icon: Users, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
    { label: 'Tasks Completed', value: '45', icon: CheckSquare, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Active Projects', value: '2', icon: Layers, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
  ];

  const personalInfo = [
    { label: 'Full Name', value: 'Vaishnavi Phad', icon: User },
    { label: 'Email Address', value: 'vaishnavi@example.com', icon: Mail },
    { label: 'Phone Number', value: '+91 98765 43210', icon: Phone },
    { label: 'Office Location', value: 'Pune, Maharashtra', icon: MapPin },
    { label: 'Employee ID', value: 'TOP-2026-001', icon: Award },
    { label: 'Department', value: 'Engineering & Development', icon: Layers },
    { label: 'Active Team', value: 'TransitOps Frontend Team', icon: Users },
    { label: 'Joining Date', value: 'July 2026', icon: Calendar },
  ];

  const skills = [
    'React.js',
    'Vite',
    'Tailwind CSS v4',
    'shadcn/ui',
    'TanStack Query',
    'REST APIs',
    'Zod Validation',
    'Responsive Design',
    'UX Architecture',
  ];

  const teamMembers = [
    { name: 'Abhay Bhise', role: 'Backend Lead / System Architect' },
    { name: 'Disa', role: 'Operations & Testing Lead' },
    { name: 'Vaishnavi Phad', role: 'Frontend ERP Developer (You)' },
  ];

  const activities = [
    { title: 'Improved Fleet Analytics', time: '2 hours ago', description: 'Optimized Recharts ResponsiveContainer dimensions to eliminate layout shifts.' },
    { title: 'Completed Dashboard UI', time: '5 hours ago', description: 'Redesigned KPI cards hierarchy and customized scrollbars in index.css.' },
    { title: 'Updated Driver Profile', time: 'Yesterday', description: 'Linked driver license category validations to Zod schemas.' },
    { title: 'Added Vehicle Asset', time: '2 days ago', description: 'Registered MH-12-GQ-4819 heavy cargo truck to local state.' },
  ];

  const settingsOptions = [
    { label: 'Global Theme Mode', value: 'Dark ERP Mode (Active)', icon: SunMoonClickable },
    { label: 'Preferred Language', value: 'English (US)', icon: Globe },
    { label: 'Desktop Notifications', value: 'Enabled', icon: Bell },
    { label: 'Access Control Credentials', value: 'Manager (Role Weight 8)', icon: Lock },
    { label: 'System Visibility Settings', value: 'Public in TransitOps scope', icon: Eye },
  ];

  function SunMoonClickable() {
    return <Globe />; // fallback
  }

  const handleEditClick = () => {
    toast.success('Edit profile drawer simulated (UI only)');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Profile"
        subtitle="Manage personal settings, developer stats and project credentials."
      />

      {/* Hero Profile Banner Card */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5">
          {/* Avatar with fallback initials */}
          <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center font-bold text-2xl text-amber-500 shadow-xl shadow-amber-500/5">
            <span>VP</span>
            {/* Online Pulse Dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">Vaishnavi Phad</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle size={10} /> Online
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{personalInfo[6].value}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
              Employee ID: {personalInfo[4].value}
            </p>
          </div>
        </div>

        <button
          onClick={handleEditClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/15 shrink-0"
        >
          <Edit size={14} />
          Edit Profile
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-800 bg-slate-950/20 glass-panel flex items-center justify-between hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</p>
                <h3 className="text-xl font-extrabold text-slate-100">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-lg border flex items-center justify-center ${item.color}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details (Col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Personal Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800/80">
                    <div className="p-2 bg-slate-800 text-slate-400 rounded-lg">
                      <Icon size={14} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{info.label}</p>
                      <p className="text-xs font-medium text-slate-200 truncate max-w-[200px]">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Settings Configuration */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Account Security & Configuration
            </h3>
            <div className="divide-y divide-slate-850">
              {settingsOptions.map((opt, idx) => (
                <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-500">
                      {idx === 0 && <SunMoon size={15} />}
                      {idx === 1 && <Globe size={15} />}
                      {idx === 2 && <Bell size={15} />}
                      {idx === 3 && <Lock size={15} />}
                      {idx === 4 && <Eye size={15} />}
                    </div>
                    <p className="text-xs font-semibold text-slate-300">{opt.label}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{opt.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info Panels (Col-span-1) */}
        <div className="space-y-6">
          {/* Tech Stack Skills */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Developer Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300 rounded-lg hover:border-amber-500/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members List */}
          <div className="p-6 bg-slate-950/30 border border-slate-800 rounded-xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Project Collaborators
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
          Recent Activity Timeline
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
