import { useEffect } from 'react';
import Lenis from 'lenis';

const LenisScroll = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Don't initialize Lenis if user prefers reduced motion
      return;
    }

    // Initialize Lenis with optimized settings for finserve
    const lenis = new Lenis({
      duration: 1.2,        // Smooth but not too slow (default: 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,   // Normal scroll speed
      smoothTouch: false,   // Disable on touch for better mobile UX
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default LenisScroll;
