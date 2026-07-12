import api from '../config/api';

export const dashboardService = {
  async getDashboardStats() {
    const response = await api.get('/dashboard');
    return response.data.data;
  },

  async getUtilizationTrend() {
    const response = await api.get('/dashboard/utilization');
    return response.data.data;
  },
};
