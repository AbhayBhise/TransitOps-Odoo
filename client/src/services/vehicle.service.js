import api from '../config/api';

const RESOURCE = '/vehicles';

export const vehicleService = {
  async getVehicles() {
    const response = await api.get(RESOURCE);
    return response.data.data;
  },

  async getVehicleById(id) {
    const response = await api.get(`${RESOURCE}/${id}`);
    return response.data.data;
  },

  async createVehicle(vehicleData) {
    const response = await api.post(RESOURCE, vehicleData);
    return response.data.data;
  },

  async updateVehicle(id, vehicleData) {
    const response = await api.put(`${RESOURCE}/${id}`, vehicleData);
    return response.data.data;
  },

  async deleteVehicle(id) {
    const response = await api.delete(`${RESOURCE}/${id}`);
    return response.data.data;
  },
};
