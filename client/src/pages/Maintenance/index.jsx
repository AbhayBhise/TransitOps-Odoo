import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import MaintenanceForm from '../../components/forms/MaintenanceForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { maintenanceService } from '../../services/maintenance.service';
import { vehicleService } from '../../services/vehicle.service';
import { toast } from 'react-hot-toast';

export default function MaintenancePlaceholder() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data: queryRecords = [] } = useQuery({
    queryKey: ['maintenance'],
    queryFn: () => maintenanceService.getMaintenance(),
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getVehicles(),
  });

  const records = queryRecords.map(r => {
    const vObj = vehicles.find(v => v.id === r.vehicleId);
    return {
      ...r,
      issue: r.description || r.issue || 'No Description',
      vehicleNo: vObj?.registrationNumber || 'N/A'
    };
  });

  const createMutation = useMutation({
    mutationFn: maintenanceService.createMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      toast.success('Maintenance logged successfully');
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to log maintenance';
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => maintenanceService.updateMaintenance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      toast.success('Maintenance record updated');
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to update maintenance';
      toast.error(msg);
    },
  });

  const handleAddMaintenance = (data) => {
    createMutation.mutate({
      vehicleId: data.vehicleId,
      description: data.issue || data.description,
      cost: Number(data.cost),
      date: new Date().toISOString(),
    });
    setIsModalOpen(false);
  };

  const handleClose = (record) => {
    updateMutation.mutate({ id: record.id, data: { status: 'COMPLETED' } });
    setSelectedRecord(null);
  };

  const columns = [
    { key: 'id', title: 'Record ID', width: '12%', render: (row) => <span className="font-mono font-bold text-slate-200">{typeof row.id === 'string' ? row.id.toUpperCase() : `MNT-${String(row.id).padStart(3, '0')}`}</span> },
    { key: 'vehicleNo', title: 'Vehicle', width: '18%', render: (row) => row.vehicle?.registrationNumber || row.vehicleNo || '-' },
    { key: 'issue', title: 'Issue', width: '28%', render: (row) => <div className="max-w-[250px] truncate">{row.issue}</div> },
    { key: 'createdAt', title: 'Date', width: '12%', render: (row) => row.createdAt?.split('T')[0] || '-' },
    { key: 'cost', title: 'Cost', width: '10%', render: (row) => <span className="text-amber-500 font-medium">${Number(row.cost).toLocaleString()}</span> },
    { key: 'status', title: 'Status', width: '12%', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', title: '', width: '8%', render: (row) => (
      <button
        onClick={() => setSelectedRecord(row)}
        className="text-amber-500 hover:text-amber-400 text-xs uppercase font-bold tracking-wider cursor-pointer"
      >
        View
      </button>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fleet Maintenance"
        subtitle="Track vehicle repairs, service histories, and maintenance costs."
      />

      <DataTable
        columns={columns}
        data={records}
        searchKey="issue"
        searchPlaceholder="Search by issue description..."
        onAddClick={() => setIsModalOpen(true)}
        addText="Log Maintenance"
        emptyTitle="No Maintenance Logs"
        emptyDescription="Get started by logging a maintenance record."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Maintenance" size="md">
        <MaintenanceForm onSubmit={handleAddMaintenance} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!selectedRecord} onClose={() => setSelectedRecord(null)} title="Maintenance Details" size="md">
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Vehicle</p>
                <p className="text-lg font-bold text-slate-100">{selectedRecord.vehicle?.registrationNumber || selectedRecord.vehicleNo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</p>
                <StatusBadge status={selectedRecord.status} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date</p>
                <p className="text-slate-200">{selectedRecord.createdAt?.split('T')[0]}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cost</p>
                <p className="text-amber-500 font-bold">${Number(selectedRecord.cost).toLocaleString()}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-2">Issue Description</h4>
              <p className="text-slate-300 p-3 bg-slate-900 border border-slate-800 rounded-lg">{selectedRecord.issue}</p>
            </div>
            {selectedRecord.status === 'OPEN' && (
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleClose(selectedRecord)}
                  className="px-4 py-2 bg-amber-500 text-slate-950 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-amber-600 transition cursor-pointer"
                >
                  Close Maintenance
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
