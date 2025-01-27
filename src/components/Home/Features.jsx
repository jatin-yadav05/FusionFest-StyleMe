import React from 'react'
import Prompt from './Prompt.jsx'
import Fabric from './Fabric.jsx'
import GenderSelection from './GenderSelection.jsx'
import OwnModal from './OwnModal.jsx'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Features = () => {
    const [headingRef, setHeadingRef] = useState(null);

    const [genderFeature, setGenderFeature] = useState(true);
    const [fabricFeature, setFabricFeature] = useState(false);
    const [visionFeature, setVisionFeature] = useState(false);
    const [modelFeature, setModelFeature] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);  // Initialize with current window width

    const fadeInVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    const transition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7
    };

    
        
        



  useEffect(() => {
    // Function to update the width state on resize
    const handleResize = () => {
      setWidth(window.innerWidth);  // Continuously update the width state with the current window width
    };

    // Add resize event listener to update width state when window size changes
    window.addEventListener("resize", handleResize);

    // Run handleResize once on mount to capture the initial width
    handleResize();

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]); // Empty dependency array means this effect runs only once on mount
      
        // useEffect(() => {
        //     const handleResize = () => {
        //       // Check window width and update genderFeature state
        //       if (window.innerWidth < 768) {
        //         setGenderFeature(false); // Set to false if width < 768
        //       } else {
        //         setGenderFeature(true); // Optional: handle state for larger screens
        //       }
        //     };
        
        //     // Add the resize event listener
        //     window.addEventListener("resize", handleResize);
        
        //     // Run the function once on mount to handle the initial size
        //     handleResize();
        
        //     // Cleanup the event listener when the component unmounts
        //     return () => {
        //       window.removeEventListener("resize", handleResize);
        //     };
        //   }, [width]); // Empty dependency array ensures this runs only once on mount

      
     
    
      

    return (
        <>
          
            <section className='relative'>
                <h2 className='text-center text-6xl my-10 w-full' ref={headingRef}>Features</h2>

                {width > 768 ?  <div className='w-full h-[80vh] flex items-center gap-10'>
                    <div className='w-[50%] h-full text-3xl flex flex-col'>
                        <ul className='h-full'>
                            <li 
                                onMouseEnter={() => {
                                    setGenderFeature(true)
                                    setFabricFeature(false)
                                    setModelFeature(false)
                                    setVisionFeature(false)
                                }}
                                className='py-14 border-b border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Gender Selection
                            </li>

                            <li 
                                onMouseEnter={() => {
                                    setFabricFeature(true)
                                    setGenderFeature(false)
                                    setModelFeature(false)
                                    setVisionFeature(false)
                                }}
                                className='py-14 border-b border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Fabric, Size & Color Customization
                            </li>

                            <li 
                                onMouseEnter={() => {
                                    setVisionFeature(true)
                                    setFabricFeature(false)
                                    setGenderFeature(false)
                                    setModelFeature(false)
                                }}
                                className='py-14 border-b border-t border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Design with Your Vision
                            </li>

                            <li 
                                onMouseEnter={() => {
                                    setModelFeature(true)
                                    setVisionFeature(false)
                                    setFabricFeature(false)
                                    setGenderFeature(false)
                                }}
                                className='py-14 border-b border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Upload Your Own Models
                            </li>
                        </ul>
                    </div>

                    <div className='w-[50%] h-full relative flex items-center justify-center'>
                        <AnimatePresence mode="wait">
                            {genderFeature && (
                                <motion.div
                                    key="gender"
                                    variants={fadeInVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                    className="absolute w-full h-full flex items-center justify-center"
                                >
                                    <GenderSelection />
                                </motion.div>
                            )}
                            {fabricFeature && (
                                <motion.div
                                    key="fabric"
                                    variants={fadeInVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                    className="absolute w-full h-full flex items-center justify-center"
                                >
                                    <Fabric />
                                </motion.div>
                            )}
                            {visionFeature && (
                                <motion.div
                                    key="vision"
                                    variants={fadeInVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                    className="absolute w-full h-full flex items-center justify-center"
                                >
                                    <Prompt />
                                </motion.div>
                            )}
                            {modelFeature && (
                                <motion.div
                                    key="model"
                                    variants={fadeInVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                    className="absolute w-full h-full flex items-center justify-center"
                                >
                                    <OwnModal />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div> : 
                  
                <div className="w-full">
                        <div className='w-full h-full text-3xl flex flex-col'>
                        <ul className='h-full'>

                            <div className="flex flex-col">
                            <li 
                                onMouseEnter={() => {
                                    setGenderFeature(true)
                                    setFabricFeature(false)
                                    setModelFeature(false)
                                    setVisionFeature(false)
                                }}
                                className='py-14 border-b border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Gender Selection
                            </li>

                            {genderFeature ? <GenderSelection/> : <></>}
                            </div>

                            <div className="flex flex-col">
                            <li 
                                onMouseEnter={() => {
                                    setFabricFeature(true)
                                    setGenderFeature(false)
                                    setModelFeature(false)
                                    setVisionFeature(false)
                                }}
                                className='py-14 border-b border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Fabric, Size & Color Customization
                            </li>

                            {fabricFeature ? <Fabric/> : <></>}
                            </div>

                            <div className="flex flex-col">
                            <li 
                                onMouseEnter={() => {
                                    setVisionFeature(true)
                                    setFabricFeature(false)
                                    setGenderFeature(false)
                                    setModelFeature(false)
                                }}
                                className='py-14 border-b border-t border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Design with Your Vision
                            </li>

                            {visionFeature ? <Prompt/> : <></>}

                            </div>


                            <div className="flex flex-col">
                            <li 
                                onMouseEnter={() => {
                                    setModelFeature(true)
                                    setVisionFeature(false)
                                    setFabricFeature(false)
                                    setGenderFeature(false)
                                }}
                                className='py-14 border-b border-grey hover:bg-default-grey text-center transition-colors duration-300'
                            >
                                Upload Your Own Models
                            </li>

                            {modelFeature ? <OwnModal/> : <></>}

                            </div>
                        </ul>
                    </div>

                </div>
                 }
             


            </section>
        </>
    )
}

export default Features