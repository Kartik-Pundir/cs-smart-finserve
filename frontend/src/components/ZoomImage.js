import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ZoomImage = ({ 
  src, 
  alt, 
  className = '',
  containerClassName = '',
  zoomScale = 1.05
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false,
    margin: "-20%",
    amount: 0.5
  });

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ scale: 1 }}
        animate={{ 
          scale: isInView ? zoomScale : 1
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.4, 0.25, 1]
        }}
      />
    </div>
  );
};

export default ZoomImage;
