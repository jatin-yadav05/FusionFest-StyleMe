import React, { useState, useEffect } from 'react';
import { desktopView, tabletView, mobileView } from '../../utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScroll } from '../../utils';

const Steps = () => {
  const [currentView, setCurrentView] = useState(getInitialView());
  const [ref, controls] = useScroll();

  function getInitialView() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 768) return desktopView;
      if (window.innerWidth > 480) return tabletView;
      return mobileView;
    }
    return desktopView;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setCurrentView(desktopView);
      } else if (window.innerWidth > 480) {
        setCurrentView(tabletView);
      } else {
        setCurrentView(mobileView);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="container mx-auto px-4 py-16"
    >
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
        <div className="container px-4 md:px-6 mx-auto max-w-[1400px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Transform Your Ideas Into Reality
            </h2>
            <div className="max-w-[800px] mx-auto">
              <p className="text-lg md:text-xl text-zinc-400 mb-8">
                Experience our powerful AI-driven design platform that brings your fashion concepts to life. 
                Create, customize, and visualize your clothing designs in real-time.
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center gap-4 text-sm text-zinc-400"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white/40 mr-2"></div>
                  Design
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white/40 mr-2"></div>
                  Generate
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white/40 mr-2"></div>
                  Customize
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 pointer-events-none"></div>
            <img 
              src={currentView} 
              alt="AI Fashion Design Generator Interface" 
              className="w-full h-auto rounded-2xl border border-white/[0.08] shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Steps;

