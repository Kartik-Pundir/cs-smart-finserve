import { useEffect } from 'react';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Add smooth scroll behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
