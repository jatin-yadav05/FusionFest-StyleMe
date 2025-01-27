import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Wand2, CreditCard, LayoutDashboard } from 'lucide-react';
import Logo from './Logo';

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Generate', url: '/generate', icon: Wand2 },
    { name: 'Pricing', url: '/pricing', icon: CreditCard },
    { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }
  ];

  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [isMobile, setIsMobile] = useState(false);
const [isLogin,setIslogin]=useState(false);
useEffect(()=>{
  const userLocal=localStorage.getItem("Details");
  setIslogin(!userLocal);
  
},[localStorage.getItem("Details")])
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed bottom-0 sm:top-0 w-full z-50 sm:py-6 pointer-events-none">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="hidden lg:block flex-shrink-0 pointer-events-auto">
            <Logo />
          </div>

          {/* Center Navigation */}
          <div className="flex-1 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-black/50 border border-white/20 backdrop-blur-lg py-1.5 px-1.5 rounded-full shadow-lg pointer-events-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <Link
                    key={item.name}
                    to={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "relative cursor-pointer text-[15px] font-semibold px-4 sm:px-6 py-2.5 rounded-full transition-colors",
                      "text-white/70 hover:text-white",
                      isActive && "bg-white/10 text-white"
                    )}
                  >
                    <span className="hidden md:inline">{item.name}</span>
                    <span className="md:hidden">
                      <Icon size={20} strokeWidth={2.5} />
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                          <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Auth Buttons */}
          {isLogin &&<div className="hidden lg:flex items-center gap-5 flex-shrink-0 pointer-events-auto">
            <Link
              to="/login"
              className="text-white hover:text-white text-[15px] font-semibold transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/20"
            >
              Sign Up
            </Link>
          </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
