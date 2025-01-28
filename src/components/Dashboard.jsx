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
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('week');
  const [analyticsData, setAnalyticsData] = useState([]);
  const [statsData, setStatsData] = useState({
    total: 0,
    timeframeTotal: 0,
    average: 0,
    timeframe: 'week',
    categoryDistribution: {}
  });
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  useEffect(() => {
    const details = localStorage.getItem("Details");
    if (details) {
      setUserDetails(JSON.parse(details));
    }
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoadingAnalytics(true);
        const userDetails = JSON.parse(localStorage.getItem("Details"));
        if (!userDetails?.email) return;

        const response = await axios.get(
          `http://localhost:4444/api/images/analytics/${userDetails.email}?timeframe=${analyticsTimeframe}`
        );
        
        if (response.data.status) {
          setAnalyticsData(response.data.data.analytics || []);
          setStatsData({
            total: response.data.data.stats.total || 0,
            timeframeTotal: response.data.data.stats.timeframeTotal || 0,
            average: response.data.data.stats.average || 0,
            timeframe: response.data.data.stats.timeframe || analyticsTimeframe,
            categoryDistribution: response.data.data.stats.categoryDistribution || {}
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Failed to load analytics');
        // Reset to default values on error
        setAnalyticsData([]);
        setStatsData({
          total: 0,
          timeframeTotal: 0,
          average: 0,
          timeframe: analyticsTimeframe,
          categoryDistribution: {}
        });
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [analyticsTimeframe]);

  // Fetch user's images
  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("Details"));
        if (!userDetails?.email) return;

        const response = await axios.get(
          `http://localhost:4444/api/images/user/${userDetails.email}${
            selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''
          }`
        );

        if (response.data.status) {
          setUserImages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Failed to load your designs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserImages();
  }, [selectedCategory]);

  // Handle image deletion
  const handleDeleteImage = async (imageId) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("Details"));
      if (!userDetails?.email) return;

      const response = await axios.delete(`http://localhost:4444/api/images/${imageId}`, {
        data: { userId: userDetails.email }
      });

      if (response.data.status) {
        setUserImages(prevImages => prevImages.filter(img => img._id !== imageId));
        toast.success('Design deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete design');
    }
  };

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
      value: statsData.total,
      change: `${analyticsTimeframe} total`,
      icon: ImageIcon
    },
    {
      title: 'Average Per Day',
      value: statsData.average.toFixed(1),
      change: `in last ${analyticsTimeframe}`,
      icon: Clock
    },
    {
      title: 'Most Recent',
      value: userImages[0]?.name || 'No designs yet',
      change: userImages[0] ? new Date(userImages[0].createdAt).toLocaleDateString() : '',
      icon: Sparkles
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
  const CustomTooltip = ({ active, payload, label, timeframe }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/10 rounded-lg p-3 shadow-xl">
          <p className="text-white/60 text-sm mb-1">
            {timeframe === 'day' ? 'Time' : 'Date'}: {label}
          </p>
          <p className="text-white font-medium">
            {payload[0].value} design{payload[0].value !== 1 ? 's' : ''}
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
                <h3 className="text-2xl font-semibold text-white/90 mt-1">{statsData.total}</h3>
                <p className="text-xs text-white/50 mt-1.5">Lifetime total</p>
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
                {['day', 'week', 'month', 'year'].map((timeframe) => (
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
                      dataKey={analyticsTimeframe === 'day' ? 'time' : 'date'}
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <Tooltip 
                      content={<CustomTooltip timeframe={analyticsTimeframe} />}
                      cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
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


        {/* Images Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Your Designs</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="text-white/60 mt-4">Loading your designs...</p>
            </div>
          ) : userImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userImages.map((image) => (
                <Card
                  key={image._id}
                  className="bg-white/[0.02] border-white/[0.08] rounded-xl overflow-hidden group"
                >
                  <div className="relative aspect-[3/2]">
                    <img
                      src={image.imageUrl}
                      alt={image.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium">{image.name}</h3>
                    <p className="text-white/60 text-sm mt-1">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60">No designs found. Start creating!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;