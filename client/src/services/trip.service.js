import api from '../config/api';

const RESOURCE = '/trips';

export const tripService = {
  async getTrips() {
    const response = await api.get(RESOURCE);
    return response.data.data;
  },

  async getTripById(id) {
    const response = await api.get(`${RESOURCE}/${id}`);
    return response.data.data;
  },

  async createTrip(tripData) {
    const response = await api.post(RESOURCE, tripData);
    return response.data.data;
  },

  async updateTrip(id, tripData) {
    const response = await api.put(`${RESOURCE}/${id}`, tripData);
    return response.data.data;
  },
};
