import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/tables/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { Input, Select } from '../../components/ui/FormComponents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { INITIAL_DRIVERS } from '../../utils/mockData';
import { toast } from 'react-hot-toast';
import { Edit2, Trash2 } from 'lucide-react';

// Form validation schema
const driverSchema = z.object({
  name: z.string().min(1, 'Driver Name is required'),
  licenseNumber: z
    .string()
    .min(1, 'License Number is required')
    .regex(/^[A-Z]{2}-\d{12}$/, 'Format must match DL-MHXXXXXXXXXX'),
  licenseCategory: z.string().min(1, 'License Category is required'),
  licenseExpiry: z.string().min(1, 'License Expiry Date is required'),
  phone: z.string().min(10, 'Contact number must be at least 10 digits'),
  safetyScore: z.coerce.number().min(0, 'Min score is 0').max(100, 'Max score is 100'),
  status: z.enum(['AVAILABLE', 'ON_TRIP', 'OFF_DUTY', 'SUSPENDED']),
});

export default function Drivers() {
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deletingDriverId, setDeletingDriverId] = useState(null);

  // Today's date check: 2026-07-12
  const TODAY = '2026-07-12';

  const isLicenseExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date(TODAY);
  };

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: '',
      licenseNumber: '',
      licenseCategory: 'Heavy Vehicle (Class A)',
      licenseExpiry: '',
      phone: '',
      safetyScore: 90,
      status: 'AVAILABLE',
    },
  });

  // Open Modal for Create
  const handleAddClick = () => {
    setEditingDriver(null);
    reset({
      name: '',
      licenseNumber: '',
      licenseCategory: 'Heavy Vehicle (Class A)',
      licenseExpiry: '',
      phone: '',
      safetyScore: 90,
      status: 'AVAILABLE',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEditClick = (driver) => {
    setEditingDriver(driver);
    reset(driver);
    setIsModalOpen(true);
  };

  // Save Driver
  const onSave = (data) => {
    if (editingDriver) {
      // Update
      const isDuplicate = drivers.some(
        (d) =>
          d.licenseNumber.toLowerCase() === data.licenseNumber.toLowerCase() &&
          d.id !== editingDriver.id
      );
      if (isDuplicate) {
        toast.error('License number must be unique');
        return;
      }
      setDrivers((prev) =>
        prev.map((d) => (d.id === editingDriver.id ? { ...d, ...data } : d))
      );
      toast.success('Driver updated successfully');
    } else {
      // Create
      const isDuplicate = drivers.some(
        (d) => d.licenseNumber.toLowerCase() === data.licenseNumber.toLowerCase()
      );
      if (isDuplicate) {
        toast.error('License number must be unique');
        return;
      }
      const newDriver = {
        id: `drv-${Date.now()}`,
        ...data,
      };
      setDrivers((prev) => [newDriver, ...prev]);
      toast.success('Driver profile created successfully');
    }
    setIsModalOpen(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    setDrivers((prev) => prev.filter((d) => d.id !== deletingDriverId));
    toast.success('Driver profile deleted successfully');
    setDeletingDriverId(null);
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      width: '20%',
      render: (d) => <span className="font-semibold text-slate-200">{d.name}</span>,
    },
    {
      key: 'licenseNumber',
      title: 'License No',
      width: '18%',
      render: (d) => <span className="font-mono text-slate-400">{d.licenseNumber}</span>,
    },
    { key: 'licenseCategory', title: 'Category', width: '18%' },
    {
      key: 'licenseExpiry',
      title: 'License Expiry',
      width: '15%',
      render: (d) => {
        const expired = isLicenseExpired(d.licenseExpiry);
        return (
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className={expired ? 'text-rose-400 font-semibold' : 'text-slate-300'}>
              {d.licenseExpiry}
            </span>
            {expired && (
              <span className="p-0.5 bg-rose-500/10 text-rose-500 rounded border border-rose-500/20 text-[9px] uppercase tracking-wider font-bold shrink-0">
                Expired
              </span>
            )}
          </div>
        );
      },
    },
    { key: 'phone', title: 'Phone', width: '15%' },
    {
      key: 'safetyScore',
      title: 'Safety',
      width: '8%',
      render: (d) => {
        const score = d.safetyScore;
        let color = 'text-emerald-400';
        if (score < 75) color = 'text-rose-400 font-bold';
        else if (score < 90) color = 'text-amber-400';
        return <span className={color}>{score}%</span>;
      },
    },
    {
      key: 'status',
      title: 'Status',
      width: '10%',
      render: (d) => <StatusBadge status={d.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '8%',
      render: (d) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleEditClick(d)}
            className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-amber-500 hover:border-amber-500/35 transition-colors cursor-pointer"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={() => setDeletingDriverId(d.id)}
            disabled={d.status === 'ON_TRIP'}
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
        title="Driver Management"
        subtitle="Manage operators profiles, categories, safety indexes, and licensing statuses."
      />

      <DataTable
        columns={columns}
        data={drivers}
        searchKey="name"
        searchPlaceholder="Search by Driver Name..."
        onAddClick={handleAddClick}
        addText="Add Driver Profile"
        emptyTitle="No drivers found"
        emptyDescription="Register driver operators to make them eligible for dispatch dispatching."
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDriver ? 'Edit Driver Profile' : 'Add New Driver Profile'}
      >
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Alex Driver"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="License Number"
            placeholder="e.g. DL-MH1220150098"
            error={errors.licenseNumber?.message}
            {...register('licenseNumber')}
          />
          <Select
            label="License Category"
            options={[
              { label: 'Heavy Vehicle (Class A)', value: 'Heavy Vehicle (Class A)' },
              { label: 'Light Vehicle (Class B)', value: 'Light Vehicle (Class B)' },
              { label: 'Cargo Truck (Class C)', value: 'Cargo Truck (Class C)' },
            ]}
            error={errors.licenseCategory?.message}
            {...register('licenseCategory')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="License Expiry"
              type="date"
              error={errors.licenseExpiry?.message}
              {...register('licenseExpiry')}
            />
            <Input
              label="Safety Score (%)"
              type="number"
              error={errors.safetyScore?.message}
              {...register('safetyScore')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              placeholder="+91 XXXXX XXXXX"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Select
              label="Status"
              options={[
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'On Trip', value: 'ON_TRIP' },
                { label: 'Off Duty', value: 'OFF_DUTY' },
                { label: 'Suspended', value: 'SUSPENDED' },
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
              {editingDriver ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingDriverId !== null}
        onClose={() => setDeletingDriverId(null)}
        onConfirm={handleConfirmDelete}
        title="Deregister Driver"
        message="Are you sure you want to remove this driver profile? This operator will be immediately excluded from active trip assignments."
        confirmText="Remove Profile"
        isDestructive={true}
      />
    </div>
  );
}
