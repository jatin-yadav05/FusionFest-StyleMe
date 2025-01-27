import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-xl opacity-50" />
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 mb-6">
              Why Choose StyleMe?
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-neutral-300 text-lg md:text-xl">
              Transform your fashion ideas into reality with our cutting-edge AI platform
            </p>
            <p className="text-neutral-400 text-base md:text-lg">
              Join thousands of designers and fashion enthusiasts who are revolutionizing their creative process
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm text-white/70">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-white/70">Real-time Generation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-white/70">Custom Designs</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-white via-white to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}; 