import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import MaintenanceForm from '../../components/forms/MaintenanceForm';

const REALISTIC_MAINTENANCE = [
  { id: 1, vehicle: 'Van-05', issue: 'Engine Oil & Filter Change', status: 'In Shop', cost: 120, date: '2026-07-12', history: 'Routine 10k mile maintenance.' },
  { id: 2, vehicle: 'Truck-02', issue: 'Brake Pad Replacement', status: 'Completed', cost: 450, date: '2026-06-25', history: 'Front brake pads were completely worn out.' },
  { id: 3, vehicle: 'Van-12', issue: 'Transmission Fluid Flush', status: 'Completed', cost: 200, date: '2026-05-14', history: 'Preventative maintenance.' },
  { id: 4, vehicle: 'Truck-08', issue: 'Tire Alignment & Rotation', status: 'In Shop', cost: 300, date: '2026-07-11', history: 'Driver reported pulling to the left.' },
];

export default function MaintenancePlaceholder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState(REALISTIC_MAINTENANCE);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleAddMaintenance = (data) => {
    const newRecord = {
      id: records.length + 1,
      vehicle: data.vehicleId === 'v1' ? 'Van-05' : 'Truck-02', 
      issue: data.issue,
      status: 'In Shop',
      cost: data.cost,
      date: new Date().toISOString().split('T')[0],
      history: 'Newly added log.',
    };
    setRecords([...records, newRecord]);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'id', title: 'Record ID', render: (row) => <span className="font-medium text-slate-200">MNT-{String(row.id).padStart(3, '0')}</span> },
    { key: 'vehicle', title: 'Vehicle' },
    { key: 'issue', title: 'Issue Description', render: (row) => <div className="max-w-[250px] truncate">{row.issue}</div> },
    { key: 'date', title: 'Date Logged' },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', title: 'Actions', render: (row) => (
      <button 
        onClick={() => setSelectedRecord(row)}
        className="text-amber-500 hover:text-amber-400 text-xs uppercase font-bold tracking-wider"
      >
        View History
      </button>
    )}
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Fleet Maintenance" 
        subtitle="Track vehicle repairs, service histories, and maintenance costs."
      />

      <DataTable 
        columns={columns}
        data={records}
        searchKey="vehicle"
        searchPlaceholder="Search by vehicle identifier..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Log Maintenance"
        emptyTitle="No Maintenance Logs Found"
        emptyDescription="Get started by logging maintenance."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Maintenance" size="md">
        <MaintenanceForm onSubmit={handleAddMaintenance} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!selectedRecord} onClose={() => setSelectedRecord(null)} title="Maintenance History" size="md">
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Vehicle</p>
                <p className="text-lg font-bold text-slate-100">{selectedRecord.vehicle}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</p>
                <StatusBadge status={selectedRecord.status} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date</p>
                <p className="text-slate-200">{selectedRecord.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cost</p>
                <p className="text-slate-200 text-amber-500 font-bold">${selectedRecord.cost}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-2">Issue Description</h4>
              <p className="text-slate-300 p-3 bg-slate-900 border border-slate-800 rounded-lg">{selectedRecord.issue}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-2">Mechanic Notes / History</h4>
              <p className="text-slate-400 p-3 bg-slate-900 border border-slate-800 rounded-lg text-sm italic">{selectedRecord.history}</p>
            </div>

            {selectedRecord.status === 'In Shop' && (
              <div className="flex justify-end pt-4 border-t border-slate-800 mt-4">
                <button 
                  onClick={() => {
                    setRecords(records.map(r => r.id === selectedRecord.id ? { ...r, status: 'Completed' } : r));
                    setSelectedRecord(null);
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-amber-600 transition"
                >
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
