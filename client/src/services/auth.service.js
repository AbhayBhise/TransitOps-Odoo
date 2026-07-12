import api from '../config/api';

export const authService = {
  async login({ email, password }) {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  async register({ email, password, name, roleName = 'USER' }) {
    const response = await api.post('/auth/register', { email, password, name, roleName });
    return response.data.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
