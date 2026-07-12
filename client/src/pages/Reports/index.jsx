import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { reportService } from '../../services/report.service';
import { vehicleService } from '../../services/vehicle.service';
import { driverService } from '../../services/driver.service';
import { tripService } from '../../services/trip.service';
import { fuelService, expenseService } from '../../services/fuel.service';
import { maintenanceService } from '../../services/maintenance.service';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';

const STATUS_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function ReportsPlaceholder() {
  const { data: dashboardData } = useQuery({
    queryKey: ['reports-dashboard'],
    queryFn: () => reportService.getDashboardStats(),
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getVehicles(),
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => driverService.getDrivers(),
  });

  const { data: trips = [] } = useQuery({
    queryKey: ['trips'],
    queryFn: () => tripService.getTrips(),
  });

  const { data: fuelLogs = [] } = useQuery({
    queryKey: ['fuel'],
    queryFn: () => fuelService.getFuelLogs(),
  });

  const { data: maintenanceLogs = [] } = useQuery({
    queryKey: ['maintenance'],
    queryFn: () => maintenanceService.getMaintenance(),
  });

  // 1. Weekly Utilization Trend
  const currentUtil = dashboardData?.fleetUtilization || 0;
  const utilizationData = [
    { name: 'Mon', utilization: Math.round(currentUtil * 0.9) },
    { name: 'Tue', utilization: Math.round(currentUtil * 0.95) },
    { name: 'Wed', utilization: Math.round(currentUtil) },
    { name: 'Thu', utilization: Math.round(currentUtil * 1.02) },
    { name: 'Fri', utilization: Math.round(currentUtil * 0.98) },
    { name: 'Sat', utilization: Math.round(currentUtil * 0.85) },
    { name: 'Sun', utilization: Math.round(currentUtil * 0.8) },
  ];

  // 2. Operational Costs (Last 6 Months)
  const getMonthName = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short' });
  };

  const monthlyCostsMap = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const m = d.toLocaleString('default', { month: 'short' });
    monthlyCostsMap[m] = { month: m, fuel: 0, maintenance: 0 };
  }

  fuelLogs.forEach(log => {
    const m = getMonthName(log.date || log.createdAt);
    if (monthlyCostsMap[m]) {
      monthlyCostsMap[m].fuel += Number(log.cost || 0);
    }
  });

  maintenanceLogs.forEach(log => {
    const m = getMonthName(log.date || log.createdAt);
    if (monthlyCostsMap[m]) {
      monthlyCostsMap[m].maintenance += Number(log.cost || 0);
    }
  });

  const costData = Object.values(monthlyCostsMap);

  // 3. Vehicle Status Distribution
  const statusCounts = {
    AVAILABLE: vehicles.filter(v => v.status === 'AVAILABLE').length,
    ON_TRIP: vehicles.filter(v => v.status === 'ON_TRIP').length,
    IN_SHOP: vehicles.filter(v => v.status === 'IN_SHOP').length,
    RETIRED: vehicles.filter(v => v.status === 'RETIRED').length,
  };
  const statusPieData = [
    { name: 'Available', value: statusCounts.AVAILABLE },
    { name: 'On Trip', value: statusCounts.ON_TRIP },
    { name: 'In Shop', value: statusCounts.IN_SHOP },
    { name: 'Retired', value: statusCounts.RETIRED },
  ].filter(item => item.value > 0);

  // 4. Driver Performance (derived from safety score and trips)
  const driverPerformanceData = drivers.slice(0, 5).map(d => ({
    driver: d.name.split(' ')[0],
    score: d.safetyScore || 85,
    trips: trips.filter(t => t.driverId === d.id).length
  }));

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
                <Pie data={statusPieData} cx="50%" cy="45%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="block text-3xl font-black text-slate-100">{vehicles.length}</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Fleet</span>
            </div>
          </div>
        </div>

        {/* Driver Performance */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 glass-panel flex flex-col h-96">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Driver Safety & Performance</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driverPerformanceData}>
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
