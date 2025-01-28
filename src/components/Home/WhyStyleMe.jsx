import React from 'react';
import { Timeline } from '../ui/timeline';
import { motion } from 'framer-motion';
import { application1, application2, application3, application4 , Education, Wardrobe2} from '../../utils';

const WhyStyleMe = () => {
  const timelineData = [
    {
      title: "Learning",
      content: (
        <div>
          <p className="text-neutral-200  md:text-xl font-normal mb-8">
          Our platform is an innovative tool for fashion education, allowing students and educators to explore garment design and visualization in a hands-on, interactive way. Perfect for courses and workshops, it bridges theory and practice effortlessly.

          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={application4} 
              alt="AI Design Interface"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img 
              src={Education} 
              alt="Design Process"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Branding",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-xl font-normal mb-8">
          Fashion brands can harness our platform to design costumes and integrate it into their websites, enabling customers to try on clothes virtually. This not only enhances the shopping experience but also drives customer engagement and increases sales.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={application3} 
              alt="AI Generation"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img 
              src={application2} 
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
          <p className="text-neutral-200 text-sm md:text-xl font-normal mb-4">
          Reimagine your personal wardrobe with ease. Upload your picture, try out garments, and visualize your style choices in real-time. It’s like having a virtual dressing room at your fingertips.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-xl">
              • Premium Fabric Selection & Management
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-xl">
              • Advanced Color Palette Integration
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-xl">
              • Precision Size Customization
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-xl">
              • Extensive Style Variations
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-sm md:text-xl">
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
              src={Wardrobe2} 
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
