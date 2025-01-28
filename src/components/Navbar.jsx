import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Wand2, CreditCard, LayoutDashboard, Settings, LogOut, ChevronDown, Info, HelpCircle } from 'lucide-react';
import Logo from './Logo';
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
    const publicNavItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'About', url: '/about', icon: Info },
        { name: 'Pricing', url: '/pricing', icon: CreditCard },
        { name: 'FAQ', url: '/faq', icon: HelpCircle }
    ];

    const privateNavItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Generate', url: '/generate', icon: Wand2 },
        { name: 'Pricing', url: '/pricing', icon: CreditCard },
        { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }
    ];

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isLogin, setIslogin] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const currentNavItems = isLogin ? publicNavItems : privateNavItems;

    useEffect(() => {
        const checkUserStatus = () => {
            const userLocal = localStorage.getItem("Details");
            if (userLocal) {
                setUserDetails(JSON.parse(userLocal));
                setIslogin(false);
            } else {
                setIslogin(true);
                setUserDetails(null);
                // Check if current route is protected
                const protectedRoutes = ['/generate', '/dashboard'];
                if (protectedRoutes.includes(window.location.pathname)) {
                    navigate('/login');
                }
            }
        };

        checkUserStatus();
    }, [localStorage.getItem("Details"), navigate]);

    useEffect(() => {
        const path = window.location.pathname;
        const currentItem = [...publicNavItems, ...privateNavItems].find(item => item.url === path);
        setActiveTab(currentItem?.name || '');
    }, [window.location.pathname]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            localStorage.removeItem("Details");
            setUserDetails(null);
            setIslogin(true);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

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
                            {currentNavItems.map((item) => {
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

                    {/* Auth Buttons or User Menu */}
                    <div className="hidden lg:flex items-center gap-5 flex-shrink-0 pointer-events-auto">
                        {isLogin ? (
                            <>
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
                            </>
                        ) : userDetails && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="group flex items-center gap-2 px-4 rounded-full hover:bg-white/[0.08] transition-all duration-200 "
                                    >
                                        <div className="flex items-center gap-3 py-2">
                                            <Avatar className="h-8 w-8 ring-2 ring-white/[0.08] group-hover:ring-white/20 transition-all bg-[#15181a]">
                                                <AvatarFallback className="bg-[#15181a] text-white">
                                                    {userDetails.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-white/90 group-hover:text-white">
                                                {userDetails.name?.split(' ')[0]}
                                            </span>
                                            <ChevronDown 
                                                className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-all group-data-[state=open]:rotate-180" 
                                            />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-64 mr-2 p-2 bg-[#15181a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-xl animate-in fade-in-0 zoom-in-95"
                                    align="end"
                                    sideOffset={8}
                                >
                                    <div className="px-2 py-2.5 mb-2">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 ring-2 ring-white/[0.08] bg-neutral-800">
                                                <AvatarFallback className="bg-neutral-800 text-white">
                                                    {userDetails.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-white">{userDetails.name}</p>
                                                <p className="text-xs text-white/50">{userDetails.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator className="bg-white/[0.08]" />
                                    <div className="p-1">
                                        <DropdownMenuItem 
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex items-center gap-2 text-sm rounded-lg px-2 py-2 text-red-400 hover:bg-neutral-800 cursor-pointer transition-colors mt-1"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
