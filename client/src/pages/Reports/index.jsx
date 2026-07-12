import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { reportService } from '../../services/report.service';
import { CHART_UTILIZATION } from '../../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';

const MOCK_COST_DATA = [
  { month: 'Jan', fuel: 4000, maintenance: 1200 },
  { month: 'Feb', fuel: 3800, maintenance: 900 },
  { month: 'Mar', fuel: 4200, maintenance: 2100 },
  { month: 'Apr', fuel: 4500, maintenance: 1500 },
  { month: 'May', fuel: 4100, maintenance: 800 },
  { month: 'Jun', fuel: 4800, maintenance: 1100 },
];

const MOCK_STATUS_DIST = [
  { name: 'Available', value: 8 },
  { name: 'On Trip', value: 12 },
  { name: 'In Shop', value: 3 },
  { name: 'Retired', value: 1 },
];

const MOCK_DRIVER_PERF = [
  { driver: 'Alex', score: 94, trips: 45 },
  { driver: 'Suresh', score: 88, trips: 38 },
  { driver: 'Vijay', score: 72, trips: 50 },
  { driver: 'Rajesh', score: 96, trips: 41 },
];

const STATUS_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function ReportsPlaceholder() {
  const { data: dashboardData } = useQuery({
    queryKey: ['reports-dashboard'],
    queryFn: async () => {
      try {
        const res = await reportService.getDashboardStats();
        return res;
      } catch (err) {
        console.warn('Backend dashboard API offline. Using mock data.', err);
        return null;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const utilizationData = dashboardData?.utilization || CHART_UTILIZATION;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Reports"
        subtitle="Comprehensive operational insights, costs, and performance tracking."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Fleet Utilization */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Fleet Utilization (Weekly)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#0f172a'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Bar dataKey="utilization" name="Utilization %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fuel vs Maintenance Costs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Operational Costs (6 Months)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_COST_DATA}>
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
                <Area type="monotone" dataKey="fuel" name="Fuel ($)" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorFuel)" />
                <Area type="monotone" dataKey="maintenance" name="Maintenance ($)" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorMaint)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Status Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Vehicle Status Distribution</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_STATUS_DIST} cx="50%" cy="45%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                  {MOCK_STATUS_DIST.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="block text-3xl font-black text-slate-100">24</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Fleet</span>
            </div>
          </div>
        </div>

        {/* Driver Performance */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Driver Safety & Performance</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_DRIVER_PERF}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="driver" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} domain={[60, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                <Line yAxisId="left" type="monotone" dataKey="score" name="Safety Score" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="trips" name="Total Trips" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
