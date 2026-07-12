import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import MaintenanceForm from '../../components/forms/MaintenanceForm';

const DUMMY_MAINTENANCE = [
  { id: 1, vehicle: 'Van-05', issue: 'Oil Change', status: 'In Shop', cost: 150, date: '2026-07-12' },
  { id: 2, vehicle: 'Truck-02', issue: 'Tire Replacement', status: 'Completed', cost: 400, date: '2026-06-25' },
];

export default function MaintenancePlaceholder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState(DUMMY_MAINTENANCE);

  const handleAddMaintenance = (data) => {
    const newRecord = {
      id: records.length + 1,
      vehicle: 'Assigned Vehicle', 
      issue: data.issue,
      status: 'In Shop',
      cost: data.cost,
      date: new Date().toISOString().split('T')[0],
    };
    setRecords([...records, newRecord]);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'id', title: 'ID', render: (row) => <span className="font-medium text-slate-200">MNT-{String(row.id).padStart(3, '0')}</span> },
    { key: 'vehicle', title: 'Vehicle' },
    { key: 'issue', title: 'Issue' },
    { key: 'date', title: 'Date' },
    { key: 'cost', title: 'Cost', render: (row) => `$${row.cost}` },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Maintenance" 
        subtitle="Track vehicle repairs and servicing."
      />

      <DataTable 
        columns={columns}
        data={records}
        searchKey="vehicle"
        searchPlaceholder="Search by vehicle..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Log Maintenance"
        emptyTitle="No Maintenance Logs Found"
        emptyDescription="Get started by logging maintenance."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Maintenance"
        size="md"
      >
        <MaintenanceForm 
          onSubmit={handleAddMaintenance} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
