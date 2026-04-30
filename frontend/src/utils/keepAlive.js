// Keep-alive utility to prevent backend from sleeping
// Pings the backend health endpoint every 10 minutes

const BACKEND_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5001';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

let pingInterval = null;

const pingBackend = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      console.log('[KeepAlive] Backend ping successful');
    } else {
      console.warn('[KeepAlive] Backend ping returned non-OK status:', response.status);
    }
  } catch (error) {
    console.error('[KeepAlive] Backend ping failed:', error.message);
  }
};

export const startKeepAlive = () => {
  if (pingInterval) {
    console.log('[KeepAlive] Already running');
    return;
  }
  
  console.log('[KeepAlive] Starting keep-alive pings every 10 minutes');
  
  // Ping immediately on start
  pingBackend();
  
  // Then ping every 10 minutes
  pingInterval = setInterval(pingBackend, PING_INTERVAL);
};

export const stopKeepAlive = () => {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
    console.log('[KeepAlive] Stopped');
  }
};

// Auto-start when module is imported
if (typeof window !== 'undefined') {
  startKeepAlive();
}
