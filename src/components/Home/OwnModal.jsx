import React from 'react'
import {input, output} from '../../utils'

const OwnModal = () => {
    return (
        <section className='h-full w-full p-4 sm:p-6 md:p-10 gap-6 md:gap-10 flex flex-col'>
            <div className='h-[50%] md:h-[60%] w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8'>
                <img 
                    src={input} 
                    className='h-full w-full md:w-[45%] object-cover object-top rounded'
                    alt="Input model"
                />
                <img 
                    src={output} 
                    className='h-full w-full md:w-[45%] object-cover object-top rounded'
                    alt="Output result"
                />
            </div>

            <div className='text-base sm:text-lg md:text-xl text-center md:text-left'>
                Our project empowers users to upload their own pictures or 2D models and virtually try on clothes of their choice. It provides a personalized shopping experience, enabling users to visualize how outfits look on them before making a purchase.
            </div>
        </section>
    )
}

export default OwnModal