
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AQIStats from "../components/AQIStats";
import AQIHeatMap from "../components/AQIHeatMap";
import CitySelector from "../components/CitySelector";
import LoginPopup from "../components/LoginPopup";
import ChatBotUI from "../components/ChatBotUI";
import { useLocation } from "../hooks/useLocation";
import { indianCities, getAQIData } from "../data/indianCities";
import { MapPin, Wind, Droplets, Factory, Navigation, Loader2 } from "lucide-react";

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState(indianCities[0]);
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const { location, loading, error, getCurrentLocation } = useLocation();

  const currentAQI = getAQIData(selectedCity.name);

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: "Good", color: "bg-green-500", textColor: "text-green-700 dark:text-green-400" };
    if (aqi <= 100) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-700 dark:text-yellow-400" };
    if (aqi <= 150) return { level: "Unhealthy for Sensitive", color: "bg-orange-500", textColor: "text-orange-700 dark:text-orange-400" };
    if (aqi <= 200) return { level: "Unhealthy", color: "bg-red-500", textColor: "text-red-700 dark:text-red-400" };
    if (aqi <= 300) return { level: "Very Unhealthy", color: "bg-purple-500", textColor: "text-purple-700 dark:text-purple-400" };
    return { level: "Hazardous", color: "bg-gray-800", textColor: "text-gray-100 dark:text-gray-300" };
  };

  const aqiInfo = getAQILevel(currentAQI);

  // Mock pollutants data
  const pollutants = [
    { name: "PM2.5", value: 45, unit: "μg/m³", status: "Moderate", color: "yellow" },
    { name: "PM10", value: 89, unit: "μg/m³", status: "Unhealthy", color: "red" },
    { name: "NO₂", value: 23, unit: "ppb", status: "Good", color: "green" },
    { name: "SO₂", value: 12, unit: "ppb", status: "Good", color: "green" },
    { name: "O₃", value: 67, unit: "ppb", status: "Moderate", color: "yellow" },
    { name: "CO", value: 1.2, unit: "ppm", status: "Good", color: "green" }
  ];

  const handleLocationDetected = () => {
    if (location && location.city) {
      const detectedCity = indianCities.find(city => 
        city.name.toLowerCase() === location.city?.toLowerCase()
      );
      if (detectedCity) {
        setSelectedCity(detectedCity);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Real-Time AQI Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="max-w-md">
                <CitySelector 
                  selectedCity={selectedCity} 
                  onSelectCity={setSelectedCity}
                  cities={indianCities}
                />
              </div>
              
              {/* Location Detection Button */}
              <Button
                onClick={getCurrentLocation}
                disabled={loading}
                variant="outline"
                className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                <span>{loading ? "Detecting..." : "My Location"}</span>
              </Button>
            </div>
          </div>
          
          {/* Location Status */}
          {location && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-800 dark:text-blue-300">
                    Location detected: {location.city}, {location.state}
                  </span>
                </div>
                <Button
                  onClick={handleLocationDetected}
                  size="sm"
                  variant="outline"
                  className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300"
                >
                  Use This Location
                </Button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <span className="text-sm text-red-800 dark:text-red-300">
                Location error: {error}
              </span>
            </div>
          )}
        </div>

        {/* Current AQI Card */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-blue-500 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-lg dark:text-white">
                    {selectedCity.name}, {selectedCity.state}
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentAQI}
                  </div>
                  <div className={`text-lg font-medium ${aqiInfo.textColor}`}>
                    {aqiInfo.level}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className={`w-20 h-20 ${aqiInfo.color} rounded-full flex items-center justify-center`}>
                  <Wind className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Wind className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Factory className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Visibility</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">2.5 km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AQI Stats */}
        <div className="mb-8">
          <AQIStats pollutants={pollutants} />
        </div>

        {/* Heat Map */}
        <div className="mb-8">
          <AQIHeatMap />
        </div>
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

export default Dashboard;
