import axios from 'axios';

const API_BASE = '/api/drivers';

export const driverService = {
  async getDrivers() {
    const response = await axios.get(API_BASE);
    return response.data.data;
  },

  async getDriverById(id) {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data.data;
  },

  async createDriver(driverData) {
    const response = await axios.post(API_BASE, driverData);
    return response.data.data;
  },

  async updateDriver(id, driverData) {
    const response = await axios.put(`${API_BASE}/${id}`, driverData);
    return response.data.data;
  },

  async deleteDriver(id) {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data.data;
  },
};
