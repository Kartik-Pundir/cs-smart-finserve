// Keep-alive utility to prevent backend from sleeping
// Pings the backend health endpoint every 5 minutes

const BACKEND_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5001';
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes (more aggressive)

let pingInterval = null;
let lastPingTime = 0;

const pingBackend = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      lastPingTime = Date.now();
      console.log('[KeepAlive] Backend ping successful at', new Date().toLocaleTimeString());
    } else {
      console.warn('[KeepAlive] Backend ping returned non-OK status:', response.status);
    }
  } catch (error) {
    console.error('[KeepAlive] Backend ping failed:', error.message);
  }
};

// Wake up backend immediately (useful when user is about to submit a form)
export const wakeUpBackend = async () => {
  const timeSinceLastPing = Date.now() - lastPingTime;
  
  // If we pinged recently (within 30 seconds), don't ping again
  if (timeSinceLastPing < 30000) {
    console.log('[KeepAlive] Backend was pinged recently, skipping wake-up');
    return;
  }
  
  console.log('[KeepAlive] Waking up backend...');
  await pingBackend();
};

export const startKeepAlive = () => {
  if (pingInterval) {
    console.log('[KeepAlive] Already running');
    return;
  }
  
  console.log('[KeepAlive] Starting keep-alive pings every 5 minutes');
  
  // Ping immediately on start
  pingBackend();
  
  // Then ping every 5 minutes
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
