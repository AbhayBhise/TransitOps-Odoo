import api from '../config/api';

const RESOURCE = '/drivers';

export const driverService = {
  async getDrivers() {
    const response = await api.get(RESOURCE);
    return response.data.data;
  },

  async getDriverById(id) {
    const response = await api.get(`${RESOURCE}/${id}`);
    return response.data.data;
  },

  async createDriver(driverData) {
    const response = await api.post(RESOURCE, driverData);
    return response.data.data;
  },

  async updateDriver(id, driverData) {
    const response = await api.put(`${RESOURCE}/${id}`, driverData);
    return response.data.data;
  },

  async deleteDriver(id) {
    const response = await api.delete(`${RESOURCE}/${id}`);
    return response.data.data;
  },
};
