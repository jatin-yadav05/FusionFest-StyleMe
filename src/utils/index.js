import firstImage from '../assets/home/first.jpg';
import NorthEastArrow from '../assets/home/northEastArrow.svg';
import checkbg from '../assets/home/checkbg.svg'
import ownVision from '../assets/home/ownVision.png'
import fabricImg from '../assets/home/fabric_color_size.png';
import femaleModel from '../assets/home/femaleModel.svg';
import maleModal from '../assets/home/maleModal.svg';
import testimonialbg from '../assets/home/testimonialbg.svg';
import manProfessional from '../assets/home/manProfessional.jpg';
import femaleProfessional from '../assets/home/femaleProfessional.jpg';
import doubleSideArrow from '../assets/home/doubleSideArrow.svg';
import uploadModal from '../assets/home/uploadModal.jpg';
import selectCategory from '../assets/home/selectCategory.jpg';
import processing from '../assets/home/processing.jpg';
import givePrompt from '../assets/home/givePrompt.jpg';
import garment from '../assets/home/garment.jpg';
import wardrobe from '../assets/home/wardrobe.jpg';
import logo from '../assets/home/logo.png'
import chooseModal from '../assets/home/chooseModal.jpg'
import application1 from '../assets/home/application1.jpeg';
import application2 from '../assets/home/application2.jpg';
import application3 from '../assets/home/application3.jpg';
import application4 from '../assets/home/application4.jpg';
import input from '../assets/home/input.jpg';
import output from '../assets/home/output.png';
import desktopView from '../assets/home/Desktop-view.jpg'
import mobileView from '../assets/home/Mobile-view.jpg'
import tabletView from '../assets/home/Tablet-view.jpg'
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
// import maleModel from '../assets/home/maleModal.svg';
// import femaleModel from '../assets/home/femaleModel.svg'

export {checkbg, NorthEastArrow, firstImage, ownVision, fabricImg, maleModal, femaleModel, testimonialbg, manProfessional, femaleProfessional, doubleSideArrow, uploadModal, selectCategory, processing, givePrompt, garment, wardrobe, logo, chooseModal, application1, application2, application3, application4, input, output, desktopView, mobileView, tabletView};

export const useScroll = () => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: 0.3 });
  
  useEffect(() => {
    if (view) {
      controls.start("show");
    }
  }, [controls, view]);

  return [element, controls];
};
