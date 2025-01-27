import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { testimonialbg } from '../../utils';

const testimonials = [
  {
    content: "The AI-powered design suggestions are incredible. It's like having a personal fashion designer!",
    author: "Sarah Chen",
    role: "Fashion Designer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    content: "This platform revolutionized how I approach fashion design. The customization options are endless.",
    author: "Michael Ross",
    role: "Design Student",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    content: "The ability to visualize designs before creation saves so much time and resources.",
    author: "Emma Watson",
    role: "Creative Director",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.9,
        delay: index * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative p-6 rounded-xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 cursor-pointer"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        animate={{
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating Particles */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 
              }}
              className="absolute w-2 h-2 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Static Quote Icon */}
        <svg 
          className="w-8 h-8 text-white/20 mb-4"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            className="relative w-12 h-12"
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={testimonial.avatar}
              alt={testimonial.author}
              className="rounded-full object-cover w-full h-full border-2 border-white/10"
            />
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/5"
              animate={{
                opacity: isHovered ? 0.3 : 0
              }}
            />
          </motion.div>
          <div>
            <motion.h3 
              className="text-white font-medium"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              {testimonial.author}
            </motion.h3>
            <motion.p 
              className="text-sm text-white/60"
              animate={{ x: isHovered ? 5 : 0, transition: { delay: 0.1 } }}
            >
              {testimonial.role}
            </motion.p>
          </div>
        </div>

        <motion.p 
          className="text-white/80 text-lg mb-6"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {testimonial.content}
        </motion.p>

        {/* Rating Stars */}
        <motion.div 
          className="flex gap-1"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            x: isHovered ? 5 : 0
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-white"
              animate={{
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ delay: i * 0.1 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Hover Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover:opacity-100"
        animate={{
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Testimonial = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    { stiffness: 400, damping: 90 }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05),transparent_70%)]" />
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative">
              What Our Users Say
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-transparent to-white/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Join thousands of satisfied designers who have transformed their creative process with our AI-powered platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
