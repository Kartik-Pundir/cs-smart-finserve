import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackendStatus = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Listen for API requests
    const handleApiRequest = () => {
      setIsChecking(true);
      setShowWarning(true);
      
      // Hide after 3 seconds
      setTimeout(() => {
        setIsChecking(false);
      }, 3000);
      
      // Hide warning after 10 seconds
      setTimeout(() => {
        setShowWarning(false);
      }, 10000);
    };

    // Add event listener for API calls
    window.addEventListener('api-request-start', handleApiRequest);

    return () => {
      window.removeEventListener('api-request-start', handleApiRequest);
    };
  }, []);

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-blue-500"
        >
          <div className="flex items-start gap-3">
            {isChecking && (
              <div className="flex-shrink-0">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {isChecking ? 'Connecting to server...' : 'Server connected'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isChecking 
                  ? 'This may take up to 60 seconds on first request' 
                  : 'Your request is being processed'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackendStatus;
