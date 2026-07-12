import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { Input, Select } from '../../components/ui/FormComponents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // Wait, let's verify if @hookform/resolvers is installed!
import * as z from 'zod';
import { INITIAL_VEHICLES } from '../../utils/mockData';
import { toast } from 'react-hot-toast';
import { Edit2, Trash2 } from 'lucide-react';

// Form validation schema
const vehicleSchema = z.object({
  registrationNumber: z
    .string()
    .min(1, 'Registration Number is required')
    .regex(/^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$/, 'Format must match: MH-12-GQ-4819'),
  model: z.string().min(1, 'Vehicle Model is required'),
  type: z.string().min(1, 'Vehicle Type is required'),
  capacity: z.coerce.number().positive('Capacity must be a positive number'),
  odometer: z.coerce.number().nonnegative('Odometer must be non-negative'),
  cost: z.coerce.number().positive('Acquisition Cost must be positive'),
  status: z.enum(['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED']),
});

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deletingVehicleId, setDeletingVehicleId] = useState(null);

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

  // Save Vehicle (Create or Update)
  const onSave = (data) => {
    if (editingVehicle) {
      // Update
      // Validate unique registration number excluding self
      const isDuplicate = vehicles.some(
        (v) =>
          v.registrationNumber.toLowerCase() === data.registrationNumber.toLowerCase() &&
          v.id !== editingVehicle.id
      );
      if (isDuplicate) {
        toast.error('Registration number must be unique');
        return;
      }
      setVehicles((prev) =>
        prev.map((v) => (v.id === editingVehicle.id ? { ...v, ...data } : v))
      );
      toast.success('Vehicle updated successfully');
    } else {
      // Create
      // Validate unique registration number
      const isDuplicate = vehicles.some(
        (v) => v.registrationNumber.toLowerCase() === data.registrationNumber.toLowerCase()
      );
      if (isDuplicate) {
        toast.error('Registration number must be unique');
        return;
      }
      const newVehicle = {
        id: `veh-${Date.now()}`,
        ...data,
      };
      setVehicles((prev) => [newVehicle, ...prev]);
      toast.success('Vehicle added successfully');
    }
    setIsModalOpen(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    setVehicles((prev) => prev.filter((v) => v.id !== deletingVehicleId));
    toast.success('Vehicle deleted successfully');
    setDeletingVehicleId(null);
  };

  const columns = [
    {
      key: 'registrationNumber',
      title: 'Registration No',
      render: (v) => <span className="font-mono font-bold text-slate-200">{v.registrationNumber}</span>,
    },
    { key: 'model', title: 'Model' },
    { key: 'type', title: 'Type' },
    {
      key: 'capacity',
      title: 'Capacity',
      render: (v) => <span>{v.capacity.toLocaleString()} kg</span>,
    },
    {
      key: 'odometer',
      title: 'Odometer',
      render: (v) => <span>{v.odometer.toLocaleString()} km</span>,
    },
    {
      key: 'cost',
      title: 'Acquisition Cost',
      render: (v) => <span>${v.cost.toLocaleString()}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (v) => <StatusBadge status={v.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (v) => (
        <div className="flex items-center gap-2">
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
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4">
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
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer"
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
