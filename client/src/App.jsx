import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import TripsPlaceholder from './pages/Trips';
import MaintenancePlaceholder from './pages/Maintenance';
import FuelPlaceholder from './pages/Fuel';
import ReportsPlaceholder from './pages/Reports';
import SettingsPlaceholder from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/trips" element={<TripsPlaceholder />} />
            <Route path="/maintenance" element={<MaintenancePlaceholder />} />
            <Route path="/fuel" element={<FuelPlaceholder />} />
            <Route path="/reports" element={<ReportsPlaceholder />} />
            <Route path="/settings" element={<SettingsPlaceholder />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid #1e293b',
          },
          duration: 3000,
        }}
      />
    </QueryClientProvider>
  );
}
