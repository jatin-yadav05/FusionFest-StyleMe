import React, { useEffect, useRef } from 'react'
import { firstImage, checkbg, NorthEastArrow } from '../../utils/index.js'
import Typed from 'typed.js'
import {Link} from 'react-router-dom';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Create Your Own <span class="text-white/90 font-extrabold">Uni</span><span class="text-zinc-400/90">que</span> <span class="bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">Clothing Designs</span> <span class="text-white/90 font-extrabold">Tod</span><span class="text-zinc-400/90">ay</span>'
      ],
      typeSpeed: 45,
      backSpeed: 45,
      loop: true,
      cursorChar: '_',
      showCursor: true,
      smartBackspace: true
    };

    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  return (
    <section className='flex flex-col lg:flex-row max-w-full h-screen relative overflow-hidden'>
      {/* Ambient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black opacity-50'></div>
      
      {/* Left Section */}
      <div className='w-full lg:w-[55%] text-white flex justify-center flex-col pt-8 lg:pt-0 gap-8 lg:gap-12 px-6 lg:px-0 relative'>
        <div className='flex flex-col gap-12 lg:gap-16'>
          {/* Animated Text */}
          <div className='text-3xl md:text-5xl lg:text-6xl font-bold w-full lg:w-[120%] relative lg:left-[15%] z-20 tracking-tight leading-tight'>
            <span ref={typedRef} className='drop-shadow-lg'></span>
          </div>
          
          {/* Description */}
          <div className='font-medium text-base md:text-lg relative w-full lg:w-[80%] lg:left-[15%] z-20 text-zinc-300/90 leading-relaxed'>
            Unleash your creativity and design clothing that fits you perfectly. 
            <span className='text-zinc-400/80 block mt-2'>
              Our platform provides a personalised experience, allowing you to visualize and adjust your designs before finalizing.
            </span>
          </div>
        </div>

        {/* Background Pattern with Blur */}
        <div className='h-[35vh] absolute bottom-0 w-full lg:w-[50vw] overflow-hidden opacity-40'>
          <div className='absolute inset-0 z-10'></div>
          <img
            src={checkbg}
            className='h-[600%] brightness-110 w-full object-cover mix-blend-overlay blur-[1px]'
            alt="Background pattern"
          />
        </div>

        {/* CTA Button */}
        <div className='relative lg:left-[15%] z-20'>
          <Link to={localStorage.getItem("Details")?"/dashboard":"/login"}>
          <button className='group border-[1.5px] flex items-center gap-3 border-zinc-700/80 px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold hover:border-white/80 hover:bg-white/95 hover:text-black transition-all duration-300 backdrop-blur-sm transform -translate-y-4'>
            <span className='text-zinc-200 group-hover:text-black transition-colors text-base'>
              Get Started
            </span>
            <svg alt="Arrow"
              className='w-4 h-4  opacity-70 group-hover:opacity-100 group-hover:fill-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg>
              </button>
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className='w-full lg:w-[45%] h-[45vh] lg:h-full mt-8 lg:mt-0'>
        <div className='relative h-full w-full overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10'></div>
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10'></div>
          <img
            src={firstImage}
            className='h-full w-full object-cover brightness-95 scale-105 hover:scale-100 transition-transform duration-700'
            alt="Hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;