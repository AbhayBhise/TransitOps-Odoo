import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fleetData = [
  { name: 'Mon', usage: 80 },
  { name: 'Tue', usage: 65 },
  { name: 'Wed', usage: 90 },
  { name: 'Thu', usage: 70 },
  { name: 'Fri', usage: 85 },
];

const roiData = [
  { name: 'Revenue', value: 4000 },
  { name: 'Costs', value: 1500 },
];

const COLORS = ['#10b981', '#ef4444']; // green, red

export default function ReportsPlaceholder() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Reports & Analytics" 
        subtitle="Operational insights, fleet utilization, and ROI."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Fleet Utilization Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-lg font-bold text-slate-100 mb-6 uppercase tracking-wide">Fleet Utilization (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip cursor={{fill: '#0f172a'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Bar dataKey="usage" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROI / Expense Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel">
          <h3 className="text-lg font-bold text-slate-100 mb-6 uppercase tracking-wide">Revenue vs Maintenance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roiData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
