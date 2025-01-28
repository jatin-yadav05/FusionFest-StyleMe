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
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const getSampleAnalyticsData = (timeframe) => {
  const now = new Date();
  const data = [];
  let days;

  switch (timeframe) {
    case 'year':
      days = 365;
      break;
    case 'month':
      days = 30;
      break;
    default: // week
      days = 7;
      break;
  }

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate random count with some patterns
    let count;
    if (date.getDay() === 0 || date.getDay() === 6) {
      // Weekends have higher activity
      count = Math.floor(Math.random() * 8) + 5;
    } else {
      // Weekdays have moderate activity
      count = Math.floor(Math.random() * 5) + 2;
    }

    data.push({
      date: date.toISOString().split('T')[0],
      count: count
    });
  }

  return data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('week'); // week, month, year
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  useEffect(() => {
    const details = localStorage.getItem("Details");
    if (details) {
      setUserDetails(JSON.parse(details));
    }
  }, []);

  useEffect(() => {
    // Replace the API call with sample data temporarily
    setIsLoadingAnalytics(true);
    setTimeout(() => {
      setAnalyticsData(getSampleAnalyticsData(analyticsTimeframe));
      setIsLoadingAnalytics(false);
    }, 800); // Simulate loading
  }, [analyticsTimeframe]);

  // Calculate statistics from sample data
  const getStatistics = () => {
    if (!analyticsData.length) return { total: 0, average: 0, mostActiveDay: '', mostActiveCount: 0 };

    const total = analyticsData.reduce((acc, curr) => acc + curr.count, 0);
    const average = total / analyticsData.length;
    
    const dayCounts = analyticsData.reduce((acc, curr) => {
      const day = new Date(curr.date).toLocaleDateString('en-US', { weekday: 'long' });
      acc[day] = (acc[day] || 0) + curr.count;
      return acc;
    }, {});

    const mostActiveDay = Object.entries(dayCounts)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      total,
      average,
      mostActiveDay: mostActiveDay[0],
      mostActiveCount: mostActiveDay[1]
    };
  };

  // Use the statistics in your stats cards
  const stats = getStatistics();

  // Update the stats cards section
  const statsCards = [
    {
      title: 'Total Designs',
      value: stats.total,
      change: '+12% from last period',
      icon: ImageIcon
    },
    {
      title: 'Most Active Day',
      value: stats.mostActiveDay,
      change: `${stats.mostActiveCount} designs`,
      icon: Sparkles
    },
    {
      title: 'Average Per Day',
      value: stats.average.toFixed(1),
      change: '+3% improvement',
      icon: Clock
    }
  ];

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
    navigate("/");
    setIsLoggingOut(false);
  };

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-xl">
          <p className="text-white/80 text-sm font-medium">{label}</p>
          <p className="text-white text-lg font-semibold">
            {payload[0].value} designs
          </p>
        </div>
      );
    }
    return null;
  };

  if (!userDetails) return null;

  return (
    <div className="min-h-screen bg-black pt-24">
      {isLoggingOut && (
        <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
          <div className="h-full bg-white animate-[loading_1.5s_ease-in-out]"></div>
        </div>
      )}

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

        {/* Analytics Section */}
        <section className="mb-12">
          <Card className="bg-white/[0.02] border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-medium text-white/90">Design Analytics</h2>
                <p className="text-sm text-white/40 mt-1">
                  Track your design generation activity
                </p>
              </div>
              
              {/* Timeframe Selector */}
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant="ghost"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      analyticsTimeframe === timeframe
                        ? 'bg-white/10 text-white'
                        : 'text-white/40 hover:text-white/60'
                    }`}
                    onClick={() => setAnalyticsTimeframe(timeframe)}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="h-[400px] w-full">
              {isLoadingAnalytics ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/10 border-t-white"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="designCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false}
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#fff"
                      fillOpacity={1}
                      fill="url(#designCount)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {statsCards.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-white/[0.02] border-white/[0.08] rounded-xl p-4 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/[0.05] p-3 rounded-lg">
                      <stat.icon className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">{stat.title}</p>
                      <h4 className="text-xl font-semibold text-white mt-1">{stat.value}</h4>
                      <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

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
                                <DropdownMenuItem className="rounded hover:bg-white/[0.08]">Edit</DropdownMenuItem>
                                <DropdownMenuItem className="rounded hover:bg-white/[0.08]">Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/[0.08] my-2" />
                                <DropdownMenuItem className="rounded text-red-400 hover:bg-white/[0.08]">
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