import React from 'react';
import { Timeline } from '../ui/timeline';
import { motion } from 'framer-motion';
import { application1, application2, application3, application4 } from '../../utils';

const WhyStyleMe = () => {
  const timelineData = [
    {
      title: "Design",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Embark on your fashion journey with our state-of-the-art AI-powered design suite. Create sophisticated, unique pieces that perfectly embody your creative vision and personal aesthetic.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={application1} 
              alt="AI Design Interface"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img 
              src={application2} 
              alt="Design Process"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Generate",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Witness the power of artificial intelligence as it transforms your creative concepts into stunning, production-ready fashion designs. Experience seamless real-time generation with sophisticated customization capabilities at your fingertips.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={application3} 
              alt="AI Generation"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img 
              src={application4} 
              alt="Generated Designs"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Customize",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-4">
            Take complete control of your creative vision with our comprehensive suite of professional customization tools and features
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-base">
              • Premium Fabric Selection & Management
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-base">
              • Advanced Color Palette Integration
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-base">
              • Precision Size Customization
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-base">
              • Extensive Style Variations
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-base">
              • Intelligent Pattern Generation
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={application1} 
              alt="Customization Interface"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img 
              src={application4} 
              alt="Customized Designs"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-black mb-32">
      <div className="relative w-full">
        <Timeline 
          data={timelineData}
        />
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05),transparent_70%)]" />
        <motion.div 
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyStyleMe;
