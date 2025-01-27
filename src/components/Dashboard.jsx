import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  ImageIcon,
  Settings,
  Bell,
  Search,
  Download,
  Share2,
  MoreHorizontal,
  Plus,
  ChevronDown,
  Calendar,
  Clock,
  Sparkles,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Input from '../components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const details = localStorage.getItem("Details");
    if (details) {
      setUserDetails(JSON.parse(details));
    }
  }, []);

  const userGeneratedImages = [
    {
      id: 1,
      name: "Summer Casual Wear",
      date: "Mar 15, 2024",
      time: "2:30 PM",
      image: "https://source.unsplash.com/random/800x600/?fashion,summer",
      status: "Published",
    },
    {
      id: 2,
      name: "Winter Collection",
      date: "Mar 14, 2024",
      time: "4:15 PM",
      image: "https://source.unsplash.com/random/800x600/?fashion,winter",
      status: "Draft",
    },
    {
      id: 3,
      name: "Formal Attire",
      date: "Mar 13, 2024",
      time: "11:45 AM",
      image: "https://source.unsplash.com/random/800x600/?fashion,formal",
      status: "Published",
    },
  ];

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("Details");
    navigate("/login");
    setIsLoggingOut(false);
  };

  if (!userDetails) return null;

  return (
    <div className="min-h-screen bg-black">
      {isLoggingOut && (
        <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
          <div className="h-full bg-white animate-[loading_1.5s_ease-in-out]"></div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-10">
              <h1 className="text-lg font-medium text-white/90">Dashboard</h1>
              <div className="relative hidden md:block">
                <Input
                  type="search"
                  placeholder="Search designs..."
                  className="w-80 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 rounded-full pl-11 h-10 focus:border-white/20 focus:ring-0"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full w-10 h-10 hover:bg-white/[0.06]"
              >
                <Bell className="h-4 w-4 text-white/60" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-[2px] hover:bg-white/[0.06]"
                  >
                    <Avatar className="h-9 w-9 ring-2 ring-white/[0.08] hover:ring-white/20 transition-all">
                      <AvatarImage src={userDetails.picture} />
                      <AvatarFallback>{userDetails.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 mr-2 p-2 bg-black/95 backdrop-blur-xl border-white/[0.08] rounded-2xl shadow-xl"
                  align="end"
                >
                  <div className="px-2 py-2.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userDetails.picture} />
                        <AvatarFallback>{userDetails.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{userDetails.name}</p>
                        <p className="text-xs text-white/50">{userDetails.email}</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/[0.08] my-2" />
                  <DropdownMenuItem className="rounded-lg hover:bg-white/[0.08]">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/[0.08] my-2" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg text-red-400 hover:bg-white/[0.08]"
                    disabled={isLoggingOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10">
        {/* User Profile Card */}
        <Card className="bg-white/[0.02] border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.04] transition-colors mb-10">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16 ring-2 ring-white/[0.08] ring-offset-4 ring-offset-black">
              <AvatarImage src={userDetails.picture} />
              <AvatarFallback>{userDetails.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium text-white/90">{userDetails.name}</h2>
              <p className="text-sm text-white/50 mt-1">{userDetails.email}</p>
            </div>
          </div>
        </Card>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/[0.02] border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-white/40">Total Designs</p>
                <h3 className="text-2xl font-semibold text-white/90 mt-1">48</h3>
                <p className="text-xs text-white/50 mt-1.5">+12% from last month</p>
              </div>
              <div className="bg-white/[0.03] p-3 rounded-xl">
                <ImageIcon className="h-5 w-5 text-white/60" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/[0.02] border-white/[0.08] rounded-2xl backdrop-blur-sm flex items-center justify-center max-w-xs">
            <Button
              onClick={() => navigate("/generate")}
              className="bg-white hover:bg-white/90 hover:scale-[1.02] hover:shadow-lg text-black rounded-xl py-6 text-sm font-medium transition-all duration-200 ease-in-out"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Design
            </Button>
          </Card>
        </div>

        {/* Generated Images Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-medium text-white/90">Recent Designs</h2>
              <p className="text-sm text-white/40 mt-1">
                You have created {userGeneratedImages.length} designs this month
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white/[0.08] rounded-xl hover:bg-white/[0.06] text-white/80"
            >
              <Settings className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-3.5 w-3.5 ml-2 text-white/60" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userGeneratedImages.map((image) => (
              <Card
                key={image.id}
                className="bg-white/[0.02] border-white/[0.08] rounded-2xl overflow-hidden group backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
              >
                <div className="relative aspect-[3/2]">
                  <img
                    src={image.image}
                    alt={image.name}
                    className="object-cover w-full h-full brightness-90 group-hover:brightness-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="font-medium text-white/90 text-lg">{image.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center text-white/40 text-xs">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              {image.date}
                            </div>
                            <div className="flex items-center text-white/40 text-xs">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              {image.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${image.status === 'Published'
                              ? 'bg-white/10 text-white/80'
                              : 'bg-white/[0.06] text-white/40'
                            }`}>
                            {image.status}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white hover:bg-white/[0.06]">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white hover:bg-white/[0.06]">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white hover:bg-white/[0.06]">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-48 p-2 bg-white/[0.02] backdrop-blur-sm border-white/[0.08] rounded-xl">
                                <DropdownMenuItem className="rounded-lg hover:bg-white/[0.08]">Edit</DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg hover:bg-white/[0.08]">Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/[0.08] my-2" />
                                <DropdownMenuItem className="rounded-lg text-red-400 hover:bg-white/[0.08]">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;