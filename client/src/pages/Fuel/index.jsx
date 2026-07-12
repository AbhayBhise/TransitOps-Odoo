import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../components/ui/FormComponents';

const DUMMY_FUEL_LOGS = [
  { id: 1, vehicle: 'Van-05', liters: 40, cost: 60, date: '2026-07-10' },
  { id: 2, vehicle: 'Truck-02', liters: 150, cost: 210, date: '2026-07-11' },
];

function FuelForm({ onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Select 
          label="Vehicle"
          options={[{ value: 'v1', label: 'Van-05' }, { value: 'v2', label: 'Truck-02' }]}
          {...register('vehicleId')}
        />
        <Input type="number" label="Liters" placeholder="e.g. 50" {...register('liters')} />
        <Input type="number" label="Cost ($)" placeholder="e.g. 80" {...register('cost')} />
      </div>
      <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="px-5 py-2 text-sm text-slate-300">Cancel</button>
        <button type="submit" className="px-5 py-2 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg">
          Log Fuel
        </button>
      </div>
    </form>
  );
}

export default function FuelPlaceholder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState(DUMMY_FUEL_LOGS);

  const columns = [
    { key: 'id', title: 'ID', render: (row) => <span className="font-medium text-slate-200">FUEL-{String(row.id).padStart(3, '0')}</span> },
    { key: 'vehicle', title: 'Vehicle' },
    { key: 'liters', title: 'Liters', render: (row) => `${row.liters} L` },
    { key: 'cost', title: 'Cost', render: (row) => `$${row.cost}` },
    { key: 'date', title: 'Date' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader title="Fuel Logs" subtitle="Record fuel consumption and track expenses." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* KPI Cards Placeholder */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400 font-semibold uppercase">Total Fuel Cost</p>
          <h4 className="text-3xl font-bold text-slate-100 mt-2">$270.00</h4>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400 font-semibold uppercase">Total Liters</p>
          <h4 className="text-3xl font-bold text-slate-100 mt-2">190 L</h4>
        </div>
      </div>

      <DataTable 
        columns={columns}
        data={logs}
        searchKey="vehicle"
        searchPlaceholder="Search by vehicle..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Log Fuel"
        emptyTitle="No Fuel Logs Found"
        emptyDescription="Start recording fuel consumption."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Fuel" size="md">
        <FuelForm 
          onSubmit={(data) => {
            setLogs([...logs, { id: logs.length + 1, vehicle: 'Selected Vehicle', liters: data.liters, cost: data.cost, date: new Date().toISOString().split('T')[0] }]);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
