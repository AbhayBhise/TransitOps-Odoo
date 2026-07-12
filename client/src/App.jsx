import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import TripsPlaceholder from './pages/Trips';
import MaintenancePlaceholder from './pages/Maintenance';
import FuelPlaceholder from './pages/Fuel';
import ReportsPlaceholder from './pages/Reports';
import SettingsPlaceholder from './pages/Settings';
import Profile from './pages/Profile';

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
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute permission="dashboard"><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
              <Route path="/vehicles" element={<ProtectedRoute permission="vehicles"><AppLayout><Vehicles /></AppLayout></ProtectedRoute>} />
              <Route path="/drivers" element={<ProtectedRoute permission="drivers"><AppLayout><Drivers /></AppLayout></ProtectedRoute>} />
              <Route path="/trips" element={<ProtectedRoute permission="trips"><AppLayout><TripsPlaceholder /></AppLayout></ProtectedRoute>} />
              <Route path="/maintenance" element={<ProtectedRoute permission="maintenance"><AppLayout><MaintenancePlaceholder /></AppLayout></ProtectedRoute>} />
              <Route path="/fuel" element={<ProtectedRoute permission="fuel"><AppLayout><FuelPlaceholder /></AppLayout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute permission="reports"><AppLayout><ReportsPlaceholder /></AppLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute permission="settings"><AppLayout><SettingsPlaceholder /></AppLayout></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute permission="profile"><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
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
