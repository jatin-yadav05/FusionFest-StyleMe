import React from 'react'
import { fabricImg } from '../../utils'

const Fabric = () => {
    return (
        <section className='h-full max-w-full justify-between p-4 sm:p-6 md:p-10 flex flex-col'>
            <div className='relative'>
                <div className='text-3xl sm:text-5xl md:text-7xl z-20 relative'>
                    YOUR STYLE,
                </div>
                <img 
                    src={fabricImg} 
                    className='top-[10%] grayscale-[0.75] w-24 sm:w-32 md:w-36 right-[10%] absolute z-10 rotate-[-25deg]'
                    alt="Fabric customization"
                />
                <div className='text-3xl sm:text-5xl md:text-7xl z-50 relative pl-4 sm:pl-16 md:pl-32 mix-blend-difference'>
                    YOUR WAY
                </div>
            </div>

            <div className='text-base sm:text-xl md:text-2xl mt-6 md:mt-8'>
                Customize every detail of your clothing. Choose from a variety of fabrics, select the perfect size, and pick your favorite colors. Our platform offers endless customization options to ensure your garment is uniquely yours. Enjoy a seamless experience in creating a wardrobe that truly reflects your individuality.
            </div>
        </section>
    )
}

export default Fabric