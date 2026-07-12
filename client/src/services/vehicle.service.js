import axios from 'axios';

// Configure standard API base URL
const API_BASE = '/api/vehicles';

/**
 * Vehicle service placeholders to connect to the Express & Prisma backend.
 * TODO: Integrate standard JWT authorization headers when auth is configured on frontend.
 */
export const vehicleService = {
  /**
   * Fetch all vehicle records from backend database
   * TODO: Connect to Express endpoint GET /api/vehicles
   */
  async getVehicles() {
    // const response = await axios.get(API_BASE);
    // return response.data;
    console.log('API Call Placeholder: vehicleService.getVehicles');
    return [];
  },

  /**
   * Fetch a single vehicle configuration by ID
   * TODO: Connect to Express endpoint GET /api/vehicles/:id
   */
  async getVehicleById(id) {
    // const response = await axios.get(`${API_BASE}/${id}`);
    // return response.data;
    console.log(`API Call Placeholder: vehicleService.getVehicleById(${id})`);
    return null;
  },

  /**
   * Create and register a new vehicle configuration
   * TODO: Connect to Express endpoint POST /api/vehicles
   */
  async createVehicle(vehicleData) {
    // const response = await axios.post(API_BASE, vehicleData);
    // return response.data;
    console.log('API Call Placeholder: vehicleService.createVehicle', vehicleData);
    return vehicleData;
  },

  /**
   * Update details of an existing vehicle configuration
   * TODO: Connect to Express endpoint PUT /api/vehicles/:id
   */
  async updateVehicle(id, vehicleData) {
    // const response = await axios.put(`${API_BASE}/${id}`, vehicleData);
    // return response.data;
    console.log(`API Call Placeholder: vehicleService.updateVehicle(${id})`, vehicleData);
    return vehicleData;
  },

  /**
   * Deregister a vehicle by deleting it
   * TODO: Connect to Express endpoint DELETE /api/vehicles/:id
   */
  async deleteVehicle(id) {
    // const response = await axios.delete(`${API_BASE}/${id}`);
    // return response.data;
    console.log(`API Call Placeholder: vehicleService.deleteVehicle(${id})`);
    return { success: true };
  },
};
