import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

console.log('[API] Initializing with base URL:', API_BASE_URL);
console.log('[API] Build timestamp:', new Date().toISOString());

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false, // Changed to false to avoid CORS/SSL issues
  timeout: 120000 // 120 seconds timeout for cold starts (Render free tier can be slow)
});

// Retry configuration
const MAX_RETRIES = 2; // Reduced to 2 retries since we increased timeout
const RETRY_DELAY = 3000; // 3 seconds between retries

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to check if error is retryable
const isRetryableError = (error) => {
  // Retry on network errors, timeouts, or 5xx server errors
  // But don't retry if we've already waited too long
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    // For timeout errors, only retry if it's the first attempt
    return error.config?.retryCount === 0;
  }
  return (
    !error.response || 
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
    
    // Log API requests for debugging
    console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('[API] Request data:', config.data);
    
    // Dispatch event for UI feedback
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-request-start'));
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors with retry logic
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response received:', response.status, response.data);
    return response;
  },
  async (error) => {
    const config = error.config;
    
    console.log('[API] Error occurred:', {
      status: error.response?.status,
      message: error.message,
      code: error.code,
      retryCount: config.retryCount
    });
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Retry logic for server errors and network issues
    if (isRetryableError(error) && config.retryCount < MAX_RETRIES) {
      config.retryCount += 1;
      
      console.log(`[API] Retrying request (${config.retryCount}/${MAX_RETRIES})...`);
      
      // Wait before retrying (exponential backoff)
      await wait(RETRY_DELAY * config.retryCount);
      
      return api(config);
    }
    
    // If all retries failed, return a user-friendly error
    if (config.retryCount >= MAX_RETRIES) {
      console.error('[API] All retries failed');
      
      // Check if it's a timeout error
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        return Promise.reject({
          ...error,
          message: 'Server is waking up (this can take up to 2 minutes on free hosting). Please wait a moment and try again.',
          isTimeout: true
        });
      }
      
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
