import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../components/ui/FormComponents';

const REALISTIC_FUEL_LOGS = [
  { id: 1, vehicle: 'Van-05', type: 'Fuel', liters: 40, cost: 65.50, date: '2026-07-10', location: 'Shell Station #4' },
  { id: 2, vehicle: 'Truck-02', type: 'Fuel', liters: 150, cost: 245.00, date: '2026-07-11', location: 'Pilot Travel Center' },
  { id: 3, vehicle: 'Van-12', type: 'Toll', liters: 0, cost: 15.00, date: '2026-07-11', location: 'I-95 North Toll' },
  { id: 4, vehicle: 'Truck-08', type: 'Fuel', liters: 120, cost: 195.20, date: '2026-07-12', location: 'Love\'s Travel Stop' },
];

function FuelForm({ onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Select 
          label="Expense Type"
          options={[{ value: 'Fuel', label: 'Fuel Refill' }, { value: 'Toll', label: 'Toll Fee' }]}
          {...register('type')}
        />
        <Select 
          label="Vehicle"
          options={[{ value: 'Van-05', label: 'Van-05' }, { value: 'Truck-02', label: 'Truck-02' }]}
          {...register('vehicle')}
        />
        <Input type="number" step="0.01" label="Amount / Liters" placeholder="e.g. 50" {...register('liters')} />
        <Input type="number" step="0.01" label="Total Cost ($)" placeholder="e.g. 80" {...register('cost')} />
        <Input label="Location" placeholder="e.g. Shell Station" {...register('location')} />
      </div>
      <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="px-5 py-2 text-sm text-slate-300 hover:text-white">Cancel</button>
        <button type="submit" className="px-5 py-2 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg">
          Log Expense
        </button>
      </div>
    </form>
  );
}

export default function FuelPlaceholder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState(REALISTIC_FUEL_LOGS);
  const [filterType, setFilterType] = useState('All');

  const totalFuelCost = logs.filter(l => l.type === 'Fuel').reduce((acc, curr) => acc + curr.cost, 0);
  const totalLiters = logs.filter(l => l.type === 'Fuel').reduce((acc, curr) => acc + curr.liters, 0);
  const totalTolls = logs.filter(l => l.type === 'Toll').reduce((acc, curr) => acc + curr.cost, 0);

  const filteredLogs = filterType === 'All' ? logs : logs.filter(l => l.type === filterType);

  const columns = [
    { key: 'id', title: 'ID', render: (row) => <span className="font-medium text-slate-200">LOG-{String(row.id).padStart(3, '0')}</span> },
    { key: 'date', title: 'Date' },
    { key: 'type', title: 'Type', render: (row) => (
      <span className={`px-2 py-1 rounded text-xs font-bold ${row.type === 'Fuel' ? 'bg-blue-900/40 text-blue-400' : 'bg-purple-900/40 text-purple-400'}`}>
        {row.type}
      </span>
    )},
    { key: 'vehicle', title: 'Vehicle' },
    { key: 'location', title: 'Location' },
    { key: 'liters', title: 'Volume', render: (row) => row.liters > 0 ? `${row.liters} L` : '-' },
    { key: 'cost', title: 'Cost', render: (row) => <span className="text-amber-500 font-medium">${row.cost.toFixed(2)}</span> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader title="Fuel & Expenses" subtitle="Monitor operational costs, fuel consumption, and toll fees." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl glass-panel relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Fuel Expenses</p>
          <h4 className="text-4xl font-black text-slate-100 mt-2">${totalFuelCost.toFixed(2)}</h4>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl glass-panel relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Volume Logged</p>
          <h4 className="text-4xl font-black text-slate-100 mt-2">{totalLiters} L</h4>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl glass-panel relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Other Expenses (Tolls)</p>
          <h4 className="text-4xl font-black text-slate-100 mt-2">${totalTolls.toFixed(2)}</h4>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800 glass-panel">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Filter Type:</label>
        <select 
          className="bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-2 outline-none"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Expenses</option>
          <option value="Fuel">Fuel Only</option>
          <option value="Toll">Tolls Only</option>
        </select>
      </div>

      <DataTable 
        columns={columns}
        data={filteredLogs}
        searchKey="vehicle"
        searchPlaceholder="Search logs by vehicle..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Log Expense"
        emptyTitle="No Expense Logs Found"
        emptyDescription="Start recording operational expenses."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Expense" size="md">
        <FuelForm 
          onSubmit={(data) => {
            setLogs([{ 
              id: logs.length + 1, 
              type: data.type,
              vehicle: data.vehicle, 
              liters: Number(data.liters) || 0, 
              cost: Number(data.cost) || 0, 
              location: data.location || 'Unknown',
              date: new Date().toISOString().split('T')[0] 
            }, ...logs]);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
