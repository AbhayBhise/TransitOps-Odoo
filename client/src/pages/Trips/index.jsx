import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import TripForm from '../../components/forms/TripForm';

const DUMMY_TRIPS = [
  { id: 1, source: 'Warehouse A', destination: 'Store B', vehicle: 'Van-05', driver: 'Alex', status: 'Dispatched', distance: 120, weight: 450 },
  { id: 2, source: 'Port', destination: 'Warehouse C', vehicle: 'Truck-02', driver: 'Sam', status: 'Completed', distance: 340, weight: 1200 },
];

export default function TripsPlaceholder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState(DUMMY_TRIPS);

  const handleAddTrip = (data) => {
    const newTrip = {
      id: trips.length + 1,
      source: data.source,
      destination: data.destination,
      vehicle: 'Assigned Vehicle', 
      driver: 'Assigned Driver',
      status: 'Draft',
      distance: data.plannedDistance,
      weight: data.cargoWeight,
    };
    setTrips([...trips, newTrip]);
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'id', title: 'ID', render: (row) => <span className="font-medium text-slate-200">TRP-{String(row.id).padStart(3, '0')}</span> },
    { key: 'route', title: 'Route', render: (row) => `${row.source} → ${row.destination}` },
    { key: 'vehicle', title: 'Vehicle' },
    { key: 'driver', title: 'Driver' },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Trips" 
        subtitle="Manage and dispatch active transport operations."
      />

      <DataTable 
        columns={columns}
        data={trips}
        searchKey="source"
        searchPlaceholder="Search by source..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Create Trip"
        emptyTitle="No Trips Found"
        emptyDescription="Get started by creating your first trip."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Trip"
        size="lg"
      >
        <TripForm 
          onSubmit={handleAddTrip} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
