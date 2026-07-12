import React, { useState } from 'react';
import KPICard from '../../components/ui/KPICard';
import PageHeader from '../../components/ui/PageHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  Truck,
  Users,
  Compass,
  Wrench,
  TrendingUp,
  AlertTriangle,
  Settings,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { INITIAL_VEHICLES, INITIAL_DRIVERS, RECENT_TRIPS, CHART_UTILIZATION } from '../../utils/mockData';

export default function Dashboard() {
  const [vehicles] = useState(INITIAL_VEHICLES);
  const [drivers] = useState(INITIAL_DRIVERS);
  const [trips] = useState(RECENT_TRIPS);
  const [selectedType, setSelectedType] = useState('ALL');

  // Compute KPIs
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === 'ON_TRIP').length;
  const availableVehicles = vehicles.filter((v) => v.status === 'AVAILABLE').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'IN_SHOP').length;

  const totalDrivers = drivers.length;
  const driversOnDuty = drivers.filter((d) => d.status === 'AVAILABLE' || d.status === 'ON_TRIP').length;
  const safetyAlerts = drivers.filter((d) => d.safetyScore < 75).length;

  const activeTrips = trips.filter((t) => t.status === 'DISPATCHED').length;
  const pendingTrips = trips.filter((t) => t.status === 'DRAFT').length;

  // Fleet Utilization Calculation
  const fleetUtilization = Math.round((activeVehicles / (totalVehicles - maintenanceVehicles)) * 100) || 0;

  // Pie chart data
  const statusPieData = [
    { name: 'Available', value: availableVehicles, color: '#10b981' }, // Emerald-500
    { name: 'On Trip', value: activeVehicles, color: '#0ea5e9' },    // Sky-500
    { name: 'In Shop', value: maintenanceVehicles, color: '#f59e0b' }, // Amber-500
  ];

  return (
    <div className="space-y-6">
      {/* Header section with filters */}
      <PageHeader
        title="Fleet Overview"
        subtitle="Operational intelligence and assets health metrics."
        actions={
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none pr-3"
            >
              <option value="ALL" className="bg-slate-900 text-slate-200">All Vehicles</option>
              <option value="Heavy Truck" className="bg-slate-900 text-slate-200">Heavy Trucks</option>
              <option value="Delivery Van" className="bg-slate-900 text-slate-200">Delivery Vans</option>
              <option value="Electric Van" className="bg-slate-900 text-slate-200">Electric Vans</option>
            </select>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active / Total Vehicles"
          value={`${activeVehicles} / ${totalVehicles}`}
          icon={Truck}
          trend="8.3%"
          trendDirection="up"
        />
        <KPICard
          title="Available Drivers"
          value={`${driversOnDuty} / ${totalDrivers}`}
          icon={Users}
          trend="4.2%"
          trendDirection="up"
        />
        <KPICard
          title="Active Trips"
          value={activeTrips}
          icon={Compass}
          trend="12.5%"
          trendDirection="up"
        />
        <KPICard
          title="Fleet Utilization"
          value={`${fleetUtilization}%`}
          icon={TrendingUp}
          trend="2.4%"
          trendDirection="up"
        />
      </div>

      {/* Critical Warnings Bar (Conditional) */}
      {safetyAlerts > 0 && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-3 rounded-xl">
          <AlertTriangle size={18} className="shrink-0" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider mr-1">Alert:</span>
            {safetyAlerts} driver(s) are operating with safety scores below 75% or have expired licenses.
          </div>
        </div>
      )}

      {/* Charts panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Utilization Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-slate-800 bg-slate-950/40 glass-panel">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Fleet Utilization Trend (%)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_UTILIZATION}>
                <defs>
                  <linearGradient id="utilizationColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="utilization"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#utilizationColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/40 glass-panel">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Vehicle Status Distribution
          </h3>
          <div className="h-72 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legends */}
            <div className="flex gap-4 mt-2 justify-center">
              {statusPieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name} ({item.value})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trips Table */}
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/30 glass-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Recent Trips & Dispatch Operations
          </h3>
          <span className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold">
            Live Feed
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-950/50">
                <th className="px-6 py-3">Trip ID</th>
                <th className="px-6 py-3">Vehicle No</th>
                <th className="px-6 py-3">Driver Name</th>
                <th className="px-6 py-3">Route</th>
                <th className="px-6 py-3">Cargo Weight</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-xs">
              {trips.slice(0, 4).map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-300">{trip.id}</td>
                  <td className="px-6 py-4 text-slate-400">{trip.vehicleNo}</td>
                  <td className="px-6 py-4 text-slate-300 font-semibold">{trip.driverName}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {trip.source} → {trip.destination}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{trip.cargoWeight.toLocaleString()} kg</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        trip.status === 'COMPLETED'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : trip.status === 'DISPATCHED'
                          ? 'bg-sky-500/10 text-sky-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
