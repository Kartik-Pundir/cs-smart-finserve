import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 60000 // 60 seconds timeout for cold starts
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to check if error is retryable
const isRetryableError = (error) => {
  // Retry on network errors, timeouts, or 5xx server errors
  return (
    !error.response || 
    error.code === 'ECONNABORTED' ||
    error.code === 'ERR_NETWORK' ||
    (error.response && error.response.status >= 500)
  );
};

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add retry count to config
    config.retryCount = config.retryCount || 0;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Retry logic for server errors and network issues
    if (isRetryableError(error) && config.retryCount < MAX_RETRIES) {
      config.retryCount += 1;
      
      console.log(`Retrying request (${config.retryCount}/${MAX_RETRIES})...`);
      
      // Wait before retrying (exponential backoff)
      await wait(RETRY_DELAY * config.retryCount);
      
      return api(config);
    }
    
    // If all retries failed, return a user-friendly error
    if (config.retryCount >= MAX_RETRIES) {
      return Promise.reject({
        ...error,
        message: 'Server is taking longer than expected. Please try again in a moment.',
        isTimeout: true
      });
    }
    
    return Promise.reject(error);
  }
);

export default api;
