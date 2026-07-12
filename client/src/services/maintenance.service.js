import api from '../config/api';

const RESOURCE = '/maintenance';

export const maintenanceService = {
  async getMaintenance() {
    const response = await api.get(RESOURCE);
    return response.data.data;
  },

  async getMaintenanceById(id) {
    const response = await api.get(`${RESOURCE}/${id}`);
    return response.data.data;
  },

  async createMaintenance(data) {
    const response = await api.post(RESOURCE, data);
    return response.data.data;
  },

  async updateMaintenance(id, data) {
    const response = await api.put(`${RESOURCE}/${id}`, data);
    return response.data.data;
  },
};
