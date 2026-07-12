import axios from 'axios';

// Configure standard API base URL
const API_BASE = '/api/drivers';

/**
 * Driver service placeholders to connect to the Express & Prisma backend.
 * TODO: Integrate standard JWT authorization headers when auth is configured on frontend.
 */
export const driverService = {
  /**
   * Fetch all driver profiles from backend database
   * TODO: Connect to Express endpoint GET /api/drivers
   */
  async getDrivers() {
    // const response = await axios.get(API_BASE);
    // return response.data;
    console.log('API Call Placeholder: driverService.getDrivers');
    return [];
  },

  /**
   * Fetch a single driver profile by ID
   * TODO: Connect to Express endpoint GET /api/drivers/:id
   */
  async getDriverById(id) {
    // const response = await axios.get(`${API_BASE}/${id}`);
    // return response.data;
    console.log(`API Call Placeholder: driverService.getDriverById(${id})`);
    return null;
  },

  /**
   * Create and register a new driver profile
   * TODO: Connect to Express endpoint POST /api/drivers
   */
  async createDriver(driverData) {
    // const response = await axios.post(API_BASE, driverData);
    // return response.data;
    console.log('API Call Placeholder: driverService.createDriver', driverData);
    return driverData;
  },

  /**
   * Update details of an existing driver profile
   * TODO: Connect to Express endpoint PUT /api/drivers/:id
   */
  async updateDriver(id, driverData) {
    // const response = await axios.put(`${API_BASE}/${id}`, driverData);
    // return response.data;
    console.log(`API Call Placeholder: driverService.updateDriver(${id})`, driverData);
    return driverData;
  },

  /**
   * Remove a driver by deleting their profile
   * TODO: Connect to Express endpoint DELETE /api/drivers/:id
   */
  async deleteDriver(id) {
    // const response = await axios.delete(`${API_BASE}/${id}`);
    // return response.data;
    console.log(`API Call Placeholder: driverService.deleteDriver(${id})`);
    return { success: true };
  },
};
