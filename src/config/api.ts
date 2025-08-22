// API Configuration
export const API_CONFIG = {
  // Production API
  PRODUCTION: 'https://roni-plus-server.onrender.com/api',
  // Local development API (for testing)
  LOCAL: 'http://localhost:3000/api',
  // Current API URL (change this to switch between environments)
  CURRENT: 'https://roni-plus-server.onrender.com/api'
};

// Get current API base URL
export const getApiBaseUrl = () => {
  // You can change this to switch between environments
  return API_CONFIG.CURRENT;
  
  // Or use environment variable if available
  // return import.meta.env.VITE_API_BASE_URL || API_CONFIG.PRODUCTION;
};

// Export the current API base URL
export const API_BASE_URL = getApiBaseUrl();
