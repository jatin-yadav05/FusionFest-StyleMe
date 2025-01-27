import React from 'react'

import { maleModal, femaleModel } from '../../utils'

const GenderSelection = () => {
  return (
    <section className='w-full h-full relative text-base sm:text-xl md:text-2xl text-gray-500 p-4 sm:p-6 md:pr-10'>
      <div className='h-[45%] md:h-full flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10 text-center md:text-left'>
        <img 
          src={maleModal} 
          className='h-full max-h-[200px] md:max-h-[60%] object-contain'
          alt="Male model"
        />
        <div className='md:mt-4'>
          StyleMe is inclusive and caters to everyone. Select your gender to get tailored recommendations.
        </div>
      </div>

      <div className='h-[45%] md:h-full flex flex-col md:flex-row gap-4 md:gap-10 mt-4 md:mt-0'>
        <img 
          src={femaleModel} 
          className='h-full max-h-[200px] md:max-h-[60%] md:absolute md:right-3 md:bottom-2 object-contain'
          alt="Female model"
        />
        <div className='md:absolute md:bottom-[5%] md:w-[50%] text-center md:text-left'>
          Our platform aims to break down barriers and make fashion accessible to everyone, effortlessly.
        </div>
      </div>
    </section>
  )
}

export default GenderSelection