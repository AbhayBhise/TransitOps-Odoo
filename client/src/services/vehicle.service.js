import axios from 'axios';

const API_BASE = '/api/vehicles';

export const vehicleService = {
  async getVehicles() {
    const response = await axios.get(API_BASE);
    return response.data.data;
  },

  async getVehicleById(id) {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data.data;
  },

  async createVehicle(vehicleData) {
    const response = await axios.post(API_BASE, vehicleData);
    return response.data.data;
  },

  async updateVehicle(id, vehicleData) {
    const response = await axios.put(`${API_BASE}/${id}`, vehicleData);
    return response.data.data;
  },

  async deleteVehicle(id) {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data.data;
  },
};
