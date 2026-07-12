import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select } from '../ui/FormComponents';
import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicle.service';
import { driverService } from '../../services/driver.service';

const tripSchema = z.object({
  source: z.string().min(2, 'Source is required'),
  destination: z.string().min(2, 'Destination is required'),
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  driverId: z.string().min(1, 'Please select a driver'),
  cargoWeight: z.coerce.number().min(1, 'Weight must be at least 1 kg'),
  plannedDistance: z.coerce.number().min(1, 'Distance must be at least 1 km'),
});

export default function TripForm({ onSubmit, onCancel, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: defaultValues || {
      source: '',
      destination: '',
      vehicleId: '',
      driverId: '',
      cargoWeight: '',
      plannedDistance: '',
    },
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getVehicles(),
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => driverService.getDrivers(),
  });

  const vehicleOptions = [
    { value: '', label: 'Select Vehicle' },
    ...vehicles.filter(v => v.status === 'AVAILABLE').map(v => ({ value: v.id, label: `${v.make} ${v.model} (${v.registrationNumber})` }))
  ];

  const driverOptions = [
    { value: '', label: 'Select Driver' },
    ...drivers.filter(d => d.status === 'AVAILABLE').map(d => ({ value: d.id, label: `${d.name} (${d.licenseNumber})` }))
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Source" 
          placeholder="e.g. Warehouse A"
          {...register('source')}
          error={errors.source?.message}
        />
        <Input 
          label="Destination" 
          placeholder="e.g. Store B"
          {...register('destination')}
          error={errors.destination?.message}
        />
        <Select 
          label="Assign Vehicle"
          options={vehicleOptions}
          {...register('vehicleId')}
          error={errors.vehicleId?.message}
        />
        <Select 
          label="Assign Driver"
          options={driverOptions}
          {...register('driverId')}
          error={errors.driverId?.message}
        />
        <Input 
          type="number"
          label="Cargo Weight (kg)" 
          placeholder="e.g. 500"
          {...register('cargoWeight')}
          error={errors.cargoWeight?.message}
        />
        <Input 
          type="number"
          label="Planned Distance (km)" 
          placeholder="e.g. 150"
          {...register('plannedDistance')}
          error={errors.plannedDistance?.message}
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
          Save Trip
        </button>
      </div>
    </form>
  );
}
