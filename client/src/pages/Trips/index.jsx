import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import TripForm from '../../components/forms/TripForm';

const REALISTIC_TRIPS = [
  { id: 1, source: 'NYC Central Hub', destination: 'Boston Warehouse A', vehicle: 'Van-05', driver: 'Alex Mercer', status: 'Dispatched', distance: 340, weight: 1200, timeline: ['Draft created', 'Driver Assigned', 'Dispatched from NYC'] },
  { id: 2, source: 'Port of LA', destination: 'SF Distribution', vehicle: 'Truck-02', driver: 'Sam Fisher', status: 'Completed', distance: 615, weight: 8500, timeline: ['Draft created', 'Dispatched', 'Arrived SF'] },
  { id: 3, source: 'Chicago Hub', destination: 'Detroit Plant', vehicle: 'Van-12', driver: 'Marcus Fenix', status: 'Draft', distance: 455, weight: 2000, timeline: ['Draft created'] },
  { id: 4, source: 'Miami Port', destination: 'Orlando Hub', vehicle: 'Truck-08', driver: 'Leon Kennedy', status: 'Cancelled', distance: 380, weight: 6000, timeline: ['Draft created', 'Cancelled by Dispatch'] },
];

export default function TripsPlaceholder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState(REALISTIC_TRIPS);
  const [statusFilter, setStatusFilter] = useState('All');

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
      timeline: ['Draft created']
    };
    setTrips([...trips, newTrip]);
    setIsModalOpen(false);
  };

  const filteredTrips = statusFilter === 'All' ? trips : trips.filter(t => t.status === statusFilter);

  const columns = [
    { key: 'id', title: 'ID', render: (row) => <span className="font-medium text-slate-200">TRP-{String(row.id).padStart(3, '0')}</span> },
    { key: 'route', title: 'Route', render: (row) => <div className="max-w-[200px] truncate">{row.source} → {row.destination}</div> },
    { key: 'vehicle', title: 'Vehicle' },
    { key: 'driver', title: 'Driver' },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', title: 'Actions', render: (row) => (
      <button 
        onClick={() => setSelectedTrip(row)}
        className="text-amber-500 hover:text-amber-400 text-xs uppercase font-bold tracking-wider"
      >
        Details
      </button>
    )}
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Trips & Dispatch" 
        subtitle="Manage end-to-end transport operations, routing, and dispatching."
      />

      <div className="flex items-center gap-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800 glass-panel">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Filter Status:</label>
        <select 
          className="bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-2 focus:ring-1 focus:ring-amber-500 outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <DataTable 
        columns={columns}
        data={filteredTrips}
        searchKey="source"
        searchPlaceholder="Search by source location..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Create Trip"
        emptyTitle="No Trips Found"
        emptyDescription="Get started by creating your first trip."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Trip" size="lg">
        <TripForm onSubmit={handleAddTrip} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!selectedTrip} onClose={() => setSelectedTrip(null)} title="Trip Details" size="md">
        {selectedTrip && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Route</p>
                <p className="text-slate-200">{selectedTrip.source} &rarr; {selectedTrip.destination}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</p>
                <StatusBadge status={selectedTrip.status} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Vehicle</p>
                <p className="text-slate-200">{selectedTrip.vehicle}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Driver</p>
                <p className="text-slate-200">{selectedTrip.driver}</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Timeline</h4>
              <div className="space-y-4 pl-2 border-l-2 border-slate-800 ml-2">
                {selectedTrip.timeline.map((event, idx) => (
                  <div key={idx} className="relative pl-4">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-amber-500 border-[3px] border-slate-900" />
                    <p className="text-sm text-slate-300">{event}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedTrip.status !== 'Completed' && selectedTrip.status !== 'Cancelled' && (
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button 
                  onClick={() => {
                    const newStatus = selectedTrip.status === 'Draft' ? 'Dispatched' : 'Completed';
                    setTrips(trips.map(t => t.id === selectedTrip.id ? { ...t, status: newStatus, timeline: [...t.timeline, `Status updated to ${newStatus}`] } : t));
                    setSelectedTrip(null);
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-amber-600 transition"
                >
                  Mark as {selectedTrip.status === 'Draft' ? 'Dispatched' : 'Completed'}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
