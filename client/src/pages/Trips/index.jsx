import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import TripForm from '../../components/forms/TripForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '../../services/trip.service';
import { RECENT_TRIPS } from '../../utils/mockData';
import { toast } from 'react-hot-toast';

export default function TripsPlaceholder() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Query with fallback to mock data
  const { data: queryTrips = RECENT_TRIPS } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      try {
        const res = await tripService.getTrips();
        return res && res.length > 0 ? res : RECENT_TRIPS;
      } catch (err) {
        console.warn('Backend getTrips API offline. Using mock data.', err);
        return RECENT_TRIPS;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [trips, setTrips] = useState(queryTrips);
  useEffect(() => { setTrips(queryTrips); }, [queryTrips]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: tripService.createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast.success('Trip created successfully');
    },
    onError: (err, variables) => {
      const newTrip = { id: `trip-${Date.now()}`, ...variables, status: 'DRAFT' };
      setTrips((prev) => [newTrip, ...prev]);
      toast.success('Trip created (Local Simulation)');
    },
  });

  // Update mutation (for status changes)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => tripService.updateTrip(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast.success('Trip updated successfully');
    },
    onError: (err, variables) => {
      setTrips((prev) =>
        prev.map((t) => (t.id === variables.id ? { ...t, ...variables.data } : t))
      );
      toast.success('Trip updated (Local Simulation)');
    },
  });

  const handleAddTrip = (data) => {
    createMutation.mutate({
      source: data.source,
      destination: data.destination,
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      cargoWeight: Number(data.cargoWeight),
      plannedDistance: Number(data.plannedDistance),
      vehicleNo: 'Assigned',
      driverName: 'Assigned',
    });
    setIsModalOpen(false);
  };

  const handleStatusChange = (trip) => {
    const newStatus = trip.status === 'DRAFT' ? 'DISPATCHED' : 'COMPLETED';
    updateMutation.mutate({ id: trip.id, data: { status: newStatus } });
    setSelectedTrip(null);
  };

  const filteredTrips = statusFilter === 'All' ? trips : trips.filter(t => t.status === statusFilter);

  const columns = [
    { key: 'id', title: 'ID', width: '12%', render: (row) => <span className="font-mono font-bold text-slate-200">{typeof row.id === 'string' ? row.id.toUpperCase() : `TRP-${String(row.id).padStart(3, '0')}`}</span> },
    { key: 'route', title: 'Route', width: '28%', render: (row) => <div className="max-w-[250px] truncate">{row.source} → {row.destination}</div> },
    { key: 'vehicleNo', title: 'Vehicle', width: '15%' },
    { key: 'driverName', title: 'Driver', width: '15%' },
    { key: 'cargoWeight', title: 'Cargo', width: '10%', render: (row) => row.cargoWeight ? `${row.cargoWeight.toLocaleString()} kg` : '-' },
    { key: 'status', title: 'Status', width: '12%', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', title: '', width: '8%', render: (row) => (
      <button
        onClick={() => setSelectedTrip(row)}
        className="text-amber-500 hover:text-amber-400 text-xs uppercase font-bold tracking-wider cursor-pointer"
      >
        Details
      </button>
    )},
  ];

  return (
    <div className="space-y-6">
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
          <option value="DRAFT">Draft</option>
          <option value="DISPATCHED">Dispatched</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
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
                <p className="text-slate-200">{selectedTrip.vehicleNo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Driver</p>
                <p className="text-slate-200">{selectedTrip.driverName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cargo Weight</p>
                <p className="text-slate-200">{selectedTrip.cargoWeight?.toLocaleString()} kg</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Planned Distance</p>
                <p className="text-slate-200">{selectedTrip.plannedDistance?.toLocaleString()} km</p>
              </div>
            </div>

            {selectedTrip.status !== 'COMPLETED' && selectedTrip.status !== 'CANCELLED' && (
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleStatusChange(selectedTrip)}
                  className="px-4 py-2 bg-amber-500 text-slate-950 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-amber-600 transition cursor-pointer"
                >
                  Mark as {selectedTrip.status === 'DRAFT' ? 'Dispatched' : 'Completed'}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
