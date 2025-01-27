import Hero from './Home/Hero'
import Steps from './Home/Steps'
import LeftScroll from './Home/LeftScroll'
import Features from './Home/Features'

const Home = () => (
    <div className="flex flex-col w-full bg-black h-content max-w-full">
        <Hero />
        <Features />
        <Steps />
        <LeftScroll />
    </div>
);

export default Home;