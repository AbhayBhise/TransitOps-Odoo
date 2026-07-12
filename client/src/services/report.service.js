import api from '../config/api';

export const reportService = {
  async getDashboardStats() {
    const response = await api.get('/dashboard');
    return response.data.data;
  },
};
