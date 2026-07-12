import axios from 'axios';

// Configure standard API base URL
const API_BASE = '/api/reports/dashboard';

/**
 * Dashboard service placeholders to connect to the Express & Prisma backend.
 * TODO: Integrate standard JWT authorization headers when auth is configured on frontend.
 */
export const dashboardService = {
  /**
   * Fetch aggregate KPI metrics and charts data from backend reports service
   * TODO: Connect to Express endpoint GET /api/reports/dashboard
   */
  async getDashboardStats() {
    // const response = await axios.get(API_BASE);
    // return response.data;
    console.log('API Call Placeholder: dashboardService.getDashboardStats');
    return {
      activeVehicles: 0,
      totalVehicles: 0,
      availableDrivers: 0,
      totalDrivers: 0,
      activeTrips: 0,
      fleetUtilization: 0,
    };
  },

  /**
   * Fetch utilization trends data for charting
   * TODO: Connect to Express endpoint GET /api/reports/utilization
   */
  async getUtilizationTrend() {
    // const response = await axios.get('/api/reports/utilization');
    // return response.data;
    console.log('API Call Placeholder: dashboardService.getUtilizationTrend');
    return [];
  },
};
