import axios from 'axios';

export const dashboardService = {
  async getDashboardStats() {
    const response = await axios.get('/api/reports/dashboard');
    return response.data.data;
  },

  async getUtilizationTrend() {
    const response = await axios.get('/api/reports/utilization');
    return response.data.data;
  },
};
