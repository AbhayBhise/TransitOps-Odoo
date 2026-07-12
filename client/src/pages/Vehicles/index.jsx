import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { Input, Select } from '../../components/ui/FormComponents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicle.service';
import { toast } from 'react-hot-toast';
import { Edit2, Trash2 } from 'lucide-react';

// Form validation schema
const vehicleSchema = z.object({
  registrationNumber: z
    .string()
    .min(1, 'Registration Number is required')
    .regex(/^[A-Z0-9][-A-Z0-9\s]{4,28}$/, 'Format: MH-12-GQ-4819 (uppercase alphanumeric and dashes only)'),
  model: z.string().min(1, 'Vehicle Model is required'),
  type: z.string().min(1, 'Vehicle Type is required'),
  capacity: z.coerce.number().positive('Capacity must be a positive number'),
  odometer: z.coerce.number().nonnegative('Odometer must be non-negative'),
  cost: z.coerce.number().positive('Acquisition Cost must be positive'),
  status: z.enum(['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED']),
});

export default function Vehicles() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deletingVehicleId, setDeletingVehicleId] = useState(null);

  // Query Vehicles from API
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getVehicles(),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: vehicleService.createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle registered successfully');
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to register vehicle';
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => vehicleService.updateVehicle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle updated successfully');
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to update vehicle';
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: vehicleService.deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle deleted successfully');
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to delete vehicle';
      toast.error(msg);
    },
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      registrationNumber: '',
      model: '',
      type: 'Heavy Truck',
      capacity: 1000,
      odometer: 0,
      cost: 10000,
      status: 'AVAILABLE',
    },
  });

  // Open Modal for Create
  const handleAddClick = () => {
    setEditingVehicle(null);
    reset({
      registrationNumber: '',
      model: '',
      type: 'Heavy Truck',
      capacity: 1000,
      odometer: 0,
      cost: 10000,
      status: 'AVAILABLE',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEditClick = (vehicle) => {
    setEditingVehicle(vehicle);
    reset(vehicle);
    setIsModalOpen(true);
  };

  // Save Vehicle
  const onSave = (data) => {
    const payload = {
      ...data,
      make: data.model ? data.model.split(' ')[0] : 'Fleet',
      year: 2026,
      capacity: Number(data.capacity),
    };
    if (editingVehicle) {
      // Update
      const isDuplicate = vehicles.some(
        (v) =>
          v.registrationNumber.toLowerCase() === data.registrationNumber.toLowerCase() &&
          v.id !== editingVehicle.id
      );
      if (isDuplicate) {
        toast.error('Registration number must be unique');
        return;
      }
      updateMutation.mutate({ id: editingVehicle.id, data: payload });
    } else {
      // Create
      const isDuplicate = vehicles.some(
        (v) => v.registrationNumber.toLowerCase() === data.registrationNumber.toLowerCase()
      );
      if (isDuplicate) {
        toast.error('Registration number must be unique');
        return;
      }
      createMutation.mutate(payload);
    }
    setIsModalOpen(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deletingVehicleId) {
      deleteMutation.mutate(deletingVehicleId);
      setDeletingVehicleId(null);
    }
  };

  const columns = [
    {
      key: 'registrationNumber',
      title: 'Registration No',
      width: '18%',
      render: (v) => <span className="font-mono font-bold text-slate-200">{v.registrationNumber}</span>,
    },
    { key: 'model', title: 'Model', width: '22%' },
    { key: 'type', title: 'Type', width: '15%' },
    {
      key: 'capacity',
      title: 'Capacity',
      width: '12%',
      render: (v) => <span>{(v.capacity || 0).toLocaleString()} kg</span>,
    },
    {
      key: 'odometer',
      title: 'Odometer',
      width: '12%',
      render: (v) => <span>{(v.odometer || 0).toLocaleString()} km</span>,
    },
    {
      key: 'cost',
      title: 'Acquisition',
      width: '11%',
      render: (v) => <span>${(v.cost || 0).toLocaleString()}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      width: '12%',
      render: (v) => <StatusBadge status={v.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '8%',
      render: (v) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleEditClick(v)}
            className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-amber-500 hover:border-amber-500/35 transition-colors cursor-pointer"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={() => setDeletingVehicleId(v.id)}
            disabled={v.status === 'ON_TRIP'}
            className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-500/35 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicle Registry"
        subtitle="Manage master configurations, capacities and active status of all transit fleet assets."
      />

      <DataTable
        columns={columns}
        data={vehicles}
        searchKey="registrationNumber"
        searchPlaceholder="Search by Registration No (e.g. MH-12)..."
        onAddClick={handleAddClick}
        addText="Register Vehicle"
        emptyTitle="No vehicles registered"
        emptyDescription="Get started by registering a new vehicle asset for dispatch."
        exportFilename="vehicles_registry"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehicle ? 'Edit Vehicle Configuration' : 'Register New Vehicle'}
      >
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <Input
            label="Registration Number"
            placeholder="MH-12-GQ-4819"
            error={errors.registrationNumber?.message}
            {...register('registrationNumber')}
          />
          <Input
            label="Vehicle Name / Model"
            placeholder="e.g. Tata Prima 5530.S"
            error={errors.model?.message}
            {...register('model')}
          />
          <Select
            label="Vehicle Type"
            options={[
              { label: 'Heavy Truck', value: 'Heavy Truck' },
              { label: 'Delivery Van', value: 'Delivery Van' },
              { label: 'Light Cargo', value: 'Light Cargo' },
              { label: 'Electric Van', value: 'Electric Van' },
            ]}
            error={errors.type?.message}
            {...register('type')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Capacity (kg)"
              type="number"
              error={errors.capacity?.message}
              {...register('capacity')}
            />
            <Input
              label="Odometer Reading (km)"
              type="number"
              error={errors.odometer?.message}
              {...register('odometer')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Acquisition Cost ($)"
              type="number"
              error={errors.cost?.message}
              {...register('cost')}
            />
            <Select
              label="Status"
              options={[
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'On Trip', value: 'ON_TRIP' },
                { label: 'In Shop (Maintenance)', value: 'IN_SHOP' },
                { label: 'Retired', value: 'RETIRED' },
              ]}
              error={errors.status?.message}
              {...register('status')}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {editingVehicle ? 'Update Vehicle' : 'Register Vehicle'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingVehicleId !== null}
        onClose={() => setDeletingVehicleId(null)}
        onConfirm={handleConfirmDelete}
        title="Deregister Vehicle"
        message="Are you sure you want to deregister this vehicle? This will remove its capacity metrics from operational dispatch calculations."
        confirmText="Deregister"
        isDestructive={true}
      />
    </div>
  );
}
