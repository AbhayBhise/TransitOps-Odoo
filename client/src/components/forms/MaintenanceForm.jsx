import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select, Textarea } from '../ui/FormComponents';

const maintenanceSchema = z.object({
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  issue: z.string().min(3, 'Issue description is required'),
  cost: z.coerce.number().min(1, 'Cost must be at least $1'),
});

export default function MaintenanceForm({ onSubmit, onCancel, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: defaultValues || {
      vehicleId: '',
      issue: '',
      cost: '',
    },
  });

  const DUMMY_VEHICLES = [
    { value: '', label: 'Select Vehicle' },
    { value: 'v1', label: 'Van-05 (Available)' },
    { value: 'v2', label: 'Truck-02 (Available)' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Select 
          label="Vehicle"
          options={DUMMY_VEHICLES}
          {...register('vehicleId')}
          error={errors.vehicleId?.message}
        />
        <Input 
          type="number"
          label="Estimated Cost ($)" 
          placeholder="e.g. 150"
          {...register('cost')}
          error={errors.cost?.message}
        />
        <Textarea 
          label="Issue Description" 
          placeholder="Describe the issue..."
          {...register('issue')}
          error={errors.issue?.message}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 mt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer"
        >
          Log Maintenance
        </button>
      </div>
    </form>
  );
}
