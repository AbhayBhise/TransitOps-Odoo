import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import api from '../config/api';

const AuthContext = createContext(null);

const ROLE_PERMISSIONS = {
  ADMIN: ['dashboard', 'vehicles', 'drivers', 'trips', 'maintenance', 'fuel', 'reports', 'settings', 'profile'],
  MANAGER: ['dashboard', 'vehicles', 'drivers', 'trips', 'maintenance', 'fuel', 'reports', 'profile'],
  USER: ['dashboard', 'vehicles', 'drivers', 'trips', 'fuel', 'profile'],
  DRIVER: ['dashboard', 'trips', 'profile'],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('transitops_token'));
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem('transitops_token');
    localStorage.removeItem('transitops_user');
    setToken(null);
    setUser(null);
  }, []);

  // Set up axios interceptor for 401 auto-logout
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          clearSession();
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, [clearSession]);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      // Try cached user first
      const cachedUser = localStorage.getItem('transitops_user');
      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch {}
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        localStorage.setItem('transitops_user', JSON.stringify(userData));
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token, clearSession]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem('transitops_token', data.token);
    localStorage.setItem('transitops_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    return data;
  };

  const logout = useCallback(() => {
    authService.logout().catch(() => {});
    clearSession();
  }, [clearSession]);

  const hasPermission = useCallback((permission) => {
    if (!user?.role) return false;
    const perms = ROLE_PERMISSIONS[user.role] || ROLE_PERMISSIONS.USER;
    return perms.includes(permission);
  }, [user]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
