import api from '../config/api';

const RESOURCE = '/fuel';

export const fuelService = {
  async getFuelLogs() {
    const response = await api.get(RESOURCE);
    return response.data.data;
  },

  async createFuelLog(data) {
    const response = await api.post(RESOURCE, data);
    return response.data.data;
  },
};

const EXPENSE_RESOURCE = '/expenses';

export const expenseService = {
  async getExpenses() {
    const response = await api.get(EXPENSE_RESOURCE);
    return response.data.data;
  },

  async createExpense(data) {
    const response = await api.post(EXPENSE_RESOURCE, data);
    return response.data.data;
  },
};
