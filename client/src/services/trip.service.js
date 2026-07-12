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
    // Map status transition to the correct PATCH endpoints expected by the backend
    let url = `${RESOURCE}/${id}`;
    if (tripData.status === 'DISPATCHED') {
      url = `${RESOURCE}/${id}/dispatch`;
    } else if (tripData.status === 'COMPLETED') {
      url = `${RESOURCE}/${id}/complete`;
    } else if (tripData.status === 'CANCELLED') {
      url = `${RESOURCE}/${id}/cancel`;
    }
    const response = await api.patch(url, tripData);
    return response.data.data;
  },
};
