import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo('top', { immediate: true });
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
