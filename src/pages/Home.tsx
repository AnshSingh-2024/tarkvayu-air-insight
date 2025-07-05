
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AQIStats from "../components/AQIStats";
import HealthAdvisory from "../components/HealthAdvisory";
import LoginPopup from "../components/LoginPopup";
import ChatBotUI from "../components/ChatBotUI";
import { 
  Wind, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Bell, 
  BarChart3,
  Calendar,
  UserPlus,
  Play
} from "lucide-react";

const Home = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(true);

  // Mock AQI data
  const currentAQI = 156;
  const aqiLevel = "Unhealthy";
  const aqiColor = "text-red-600 dark:text-red-400";
  const location = "Delhi, India";

  // Mock pollutants data
  const pollutants = [
    { name: "PM2.5", value: 45, unit: "μg/m³", status: "Moderate", color: "yellow" },
    { name: "PM10", value: 89, unit: "μg/m³", status: "Unhealthy", color: "red" },
    { name: "NO₂", value: 23, unit: "ppb", status: "Good", color: "green" },
    { name: "SO₂", value: 12, unit: "ppb", status: "Good", color: "green" },
    { name: "O₃", value: 67, unit: "ppb", status: "Moderate", color: "yellow" },
    { name: "CO", value: 1.2, unit: "ppm", status: "Good", color: "green" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Breathe Smart with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                TarkVayu
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Real-time air quality monitoring across India. Get personalized health 
              recommendations and stay informed about pollution levels in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  View Dashboard
                </Button>
              </Link>
              <Link to="/forecast">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-3 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  See Forecast
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowLoginPopup(true)}
                className="px-8 py-3 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Current AQI Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">{location}</span>
                  <Badge variant="secondary" className="ml-2 dark:bg-gray-700 dark:text-gray-300">Live</Badge>
                </div>
                <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentAQI}
                </div>
                <div className={`text-xl font-semibold ${aqiColor} mb-2`}>
                  {aqiLevel}
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Wind className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose TarkVayu?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Data</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Live AQI updates from monitoring stations across India
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Health Advisory</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalized health recommendations based on air quality
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Alerts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get notified when air quality changes in your area
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Detailed Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Historical trends and forecasting for better planning
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/dashboard" className="block">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white/80 dark:bg-gray-700/80">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">View Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">See detailed AQI data and analytics</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/trends" className="block">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white/80 dark:bg-gray-700/80">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Historical Trends</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Analyze air quality patterns over time</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/forecast" className="block">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white/80 dark:bg-gray-700/80">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">7-Day Forecast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Plan ahead with air quality predictions</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* AQI Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Current Pollutant Levels
        </h2>
        <AQIStats pollutants={pollutants} />
      </div>

      {/* Health Advisory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HealthAdvisory currentAQI={currentAQI} />
      </div>

      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onSkip={() => setShowLoginPopup(false)}
      />

      {/* ChatBot */}
      <ChatBotUI />
    </div>
  );
};

export default Home;
