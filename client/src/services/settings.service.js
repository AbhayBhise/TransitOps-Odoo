import api from '../config/api';

const RESOURCE = '/settings';

export const settingsService = {
  async getProfile() {
    const response = await api.get(`${RESOURCE}/profile`);
    return response.data.data;
  },

  async updateProfile(data) {
    const response = await api.put(`${RESOURCE}/profile`, data);
    return response.data.data;
  },

  async getPreferences() {
    const response = await api.get(`${RESOURCE}/preferences`);
    return response.data.data;
  },

  async updatePreferences(data) {
    const response = await api.put(`${RESOURCE}/preferences`, data);
    return response.data.data;
  },
};
