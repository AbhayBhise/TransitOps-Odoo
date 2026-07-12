import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../components/ui/FormComponents';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fuelService, expenseService } from '../../services/fuel.service';
import { toast } from 'react-hot-toast';

const INITIAL_FUEL_LOGS = [
  { id: 'fuel-1', vehicleNo: 'MH-12-GQ-4819', vehicle: { registrationNumber: 'MH-12-GQ-4819' }, liters: 40, cost: 65.50, date: '2026-07-10' },
  { id: 'fuel-2', vehicleNo: 'DL-01-AX-9922', vehicle: { registrationNumber: 'DL-01-AX-9922' }, liters: 150, cost: 245.00, date: '2026-07-11' },
  { id: 'fuel-3', vehicleNo: 'HR-26-CK-1234', vehicle: { registrationNumber: 'HR-26-CK-1234' }, liters: 120, cost: 195.20, date: '2026-07-12' },
];

const INITIAL_EXPENSES = [
  { id: 'exp-1', vehicleNo: 'DL-01-AX-9922', vehicle: { registrationNumber: 'DL-01-AX-9922' }, type: 'Toll', cost: 15.00, date: '2026-07-11' },
  { id: 'exp-2', vehicleNo: 'MH-12-GQ-4819', vehicle: { registrationNumber: 'MH-12-GQ-4819' }, type: 'Parking', cost: 8.00, date: '2026-07-10' },
];

function FuelForm({ onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Select
          label="Vehicle"
          options={[
            { value: 'MH-12-GQ-4819', label: 'MH-12-GQ-4819' },
            { value: 'DL-01-AX-9922', label: 'DL-01-AX-9922' },
            { value: 'HR-26-CK-1234', label: 'HR-26-CK-1234' },
          ]}
          {...register('vehicleNo')}
        />
        <Input type="number" step="0.01" label="Liters" placeholder="e.g. 50" {...register('liters')} />
        <Input type="number" step="0.01" label="Cost ($)" placeholder="e.g. 80" {...register('cost')} />
      </div>
      <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-800">
        <button type="button" onClick={onCancel} className="px-5 py-2 text-sm text-slate-300 hover:text-white cursor-pointer">Cancel</button>
        <button type="submit" className="px-5 py-2 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg cursor-pointer">
          Log Fuel
        </button>
      </div>
    </form>
  );
}

export default function FuelPlaceholder() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('fuel');

  // Fuel query
  const { data: queryFuelLogs = INITIAL_FUEL_LOGS } = useQuery({
    queryKey: ['fuel'],
    queryFn: async () => {
      try {
        const res = await fuelService.getFuelLogs();
        return res && res.length > 0 ? res : INITIAL_FUEL_LOGS;
      } catch (err) {
        console.warn('Backend getFuelLogs API offline. Using mock data.', err);
        return INITIAL_FUEL_LOGS;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Expense query
  const { data: queryExpenses = INITIAL_EXPENSES } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      try {
        const res = await expenseService.getExpenses();
        return res && res.length > 0 ? res : INITIAL_EXPENSES;
      } catch (err) {
        console.warn('Backend getExpenses API offline. Using mock data.', err);
        return INITIAL_EXPENSES;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [fuelLogs, setFuelLogs] = useState(queryFuelLogs);
  const [expenses, setExpenses] = useState(queryExpenses);
  useEffect(() => { setFuelLogs(queryFuelLogs); }, [queryFuelLogs]);
  useEffect(() => { setExpenses(queryExpenses); }, [queryExpenses]);

  const createFuelMutation = useMutation({
    mutationFn: fuelService.createFuelLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel'] });
      toast.success('Fuel log recorded');
    },
    onError: (err, variables) => {
      setFuelLogs((prev) => [{ id: `fuel-${Date.now()}`, ...variables, date: new Date().toISOString().split('T')[0] }, ...prev]);
      toast.success('Fuel logged (Local Simulation)');
    },
  });

  const totalFuelCost = fuelLogs.reduce((acc, curr) => acc + Number(curr.cost), 0);
  const totalLiters = fuelLogs.reduce((acc, curr) => acc + Number(curr.liters), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.cost), 0);

  const fuelColumns = [
    { key: 'id', title: 'ID', width: '12%', render: (row) => <span className="font-mono font-bold text-slate-200">{typeof row.id === 'string' ? row.id.toUpperCase() : `FUEL-${String(row.id).padStart(3, '0')}`}</span> },
    { key: 'date', title: 'Date', width: '15%', render: (row) => row.date?.split('T')[0] || '-' },
    { key: 'vehicleNo', title: 'Vehicle', width: '20%', render: (row) => row.vehicle?.registrationNumber || row.vehicleNo || '-' },
    { key: 'liters', title: 'Volume', width: '15%', render: (row) => `${Number(row.liters)} L` },
    { key: 'cost', title: 'Cost', width: '15%', render: (row) => <span className="text-amber-500 font-medium">${Number(row.cost).toFixed(2)}</span> },
  ];

  const expenseColumns = [
    { key: 'id', title: 'ID', width: '12%', render: (row) => <span className="font-mono font-bold text-slate-200">{typeof row.id === 'string' ? row.id.toUpperCase() : `EXP-${String(row.id).padStart(3, '0')}`}</span> },
    { key: 'date', title: 'Date', width: '15%', render: (row) => row.date?.split('T')[0] || '-' },
    { key: 'type', title: 'Type', width: '15%', render: (row) => (
      <span className="px-2 py-1 rounded text-xs font-bold bg-purple-900/40 text-purple-400">{row.type}</span>
    )},
    { key: 'vehicleNo', title: 'Vehicle', width: '20%', render: (row) => row.vehicle?.registrationNumber || row.vehicleNo || '-' },
    { key: 'cost', title: 'Cost', width: '15%', render: (row) => <span className="text-amber-500 font-medium">${Number(row.cost).toFixed(2)}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Fuel & Expenses" subtitle="Monitor operational costs, fuel consumption, and toll fees." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl glass-panel relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Fuel Cost</p>
          <h4 className="text-4xl font-black text-slate-100 mt-2">${totalFuelCost.toFixed(2)}</h4>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl glass-panel relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Volume</p>
          <h4 className="text-4xl font-black text-slate-100 mt-2">{totalLiters} L</h4>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl glass-panel relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Other Expenses</p>
          <h4 className="text-4xl font-black text-slate-100 mt-2">${totalExpenses.toFixed(2)}</h4>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-950/20 p-1 rounded-lg border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('fuel')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition cursor-pointer ${activeTab === 'fuel' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
        >Fuel Logs</button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition cursor-pointer ${activeTab === 'expenses' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
        >Expenses</button>
      </div>

      {activeTab === 'fuel' ? (
        <DataTable
          columns={fuelColumns}
          data={fuelLogs}
          searchKey="vehicleNo"
          searchPlaceholder="Search by vehicle..."
          onAddClick={() => setIsModalOpen(true)}
          addText="Log Fuel"
          emptyTitle="No Fuel Logs"
          emptyDescription="Start recording fuel consumption."
        />
      ) : (
        <DataTable
          columns={expenseColumns}
          data={expenses}
          searchKey="type"
          searchPlaceholder="Search by expense type..."
          emptyTitle="No Expenses"
          emptyDescription="No operational expenses recorded."
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Fuel" size="md">
        <FuelForm
          onSubmit={(data) => {
            createFuelMutation.mutate({ vehicleNo: data.vehicleNo, liters: Number(data.liters), cost: Number(data.cost) });
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
