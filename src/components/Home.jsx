import Hero from './Home/Hero'
import Steps from './Home/Steps'
import LeftScroll from './Home/LeftScroll'
import Features from './Home/Features'
import Testimonial from './Home/Testimonial'
import WhyStyleMe from './Home/WhyStyleMe'

const Home = () => (
    <div className="flex flex-col w-full bg-black h-content max-w-full">
        <Hero />
        <Features />
        <Steps />
        <WhyStyleMe />
        <LeftScroll />
        <Testimonial />
    </div>
);

export default Home;