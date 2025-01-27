import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LeftScroll = () => {
  const containerRef = useRef(null);
  const textContent = "AI FASHION DESIGN • GENERATE YOUR DESIGNS • CUSTOMIZE YOUR STYLE • ";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 bg-black border-y border-white/10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      
      {/* Main Scrolling Text */}
      <motion.div 
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        <div className="flex items-center">
          {[...Array(4)].map((_, index) => (
            <span 
              key={index} 
              className="text-[8vw] font-bold uppercase tracking-tight inline-flex items-center"
            >
              <motion.span
                style={{ opacity }}
                className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
              >
                {textContent}
              </motion.span>
              <span className="mx-4 text-white/20">★</span>
            </span>
          ))}
        </div>
      </motion.div>
      
      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      
      {/* Animated Lines */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 0%, transparent 95%, white 100%)',
          backgroundSize: '100% 8px'
        }}
      />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_70%)]" />
    </div>
  );
};

export default LeftScroll;
