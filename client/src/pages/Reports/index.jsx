import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const fleetData = [
  { name: 'Mon', active: 12, idle: 3, maintenance: 1 },
  { name: 'Tue', active: 14, idle: 1, maintenance: 1 },
  { name: 'Wed', active: 10, idle: 5, maintenance: 1 },
  { name: 'Thu', active: 15, idle: 0, maintenance: 1 },
  { name: 'Fri', active: 13, idle: 2, maintenance: 1 },
  { name: 'Sat', active: 8, idle: 6, maintenance: 2 },
  { name: 'Sun', active: 5, idle: 9, maintenance: 2 },
];

const costData = [
  { month: 'Jan', fuel: 4000, maintenance: 1200 },
  { month: 'Feb', fuel: 3800, maintenance: 900 },
  { month: 'Mar', fuel: 4200, maintenance: 2100 },
  { month: 'Apr', fuel: 4500, maintenance: 1500 },
  { month: 'May', fuel: 4100, maintenance: 800 },
  { month: 'Jun', fuel: 4800, maintenance: 1100 },
];

const driverPerformance = [
  { driver: 'Alex', score: 98, trips: 45 },
  { driver: 'Sam', score: 92, trips: 38 },
  { driver: 'Marcus', score: 85, trips: 50 },
  { driver: 'Leon', score: 95, trips: 41 },
];

const statusDistribution = [
  { name: 'Available', value: 8 },
  { name: 'On Trip', value: 12 },
  { name: 'In Shop', value: 3 },
  { name: 'Retired', value: 1 },
];

const STATUS_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // green, blue, orange, red

export default function ReportsPlaceholder() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Analytics & Reports" 
        subtitle="Comprehensive operational insights, costs, and performance tracking."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Fleet Utilization Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Fleet Utilization (Weekly)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#0f172a'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                <Bar dataKey="active" name="On Trip" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="idle" name="Available" stackId="a" fill="#10b981" />
                <Bar dataKey="maintenance" name="In Shop" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Costs (Fuel vs Maintenance) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Operational Costs (6 Months)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costData}>
                <defs>
                  <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMaint" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                <Area type="monotone" dataKey="fuel" name="Fuel & Tolls ($)" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorFuel)" />
                <Area type="monotone" dataKey="maintenance" name="Maintenance ($)" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorMaint)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Status Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Real-time Vehicle Status</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="block text-3xl font-black text-slate-100">24</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Fleet</span>
            </div>
          </div>
        </div>

        {/* Driver Analytics */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Driver Safety & Performance</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driverPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="driver" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} domain={[60, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                <Line yAxisId="left" type="monotone" dataKey="score" name="Safety Score (Out of 100)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="trips" name="Total Trips" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
