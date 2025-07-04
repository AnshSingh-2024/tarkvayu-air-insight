
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AQIStats from "../components/AQIStats";
import AQIHeatMap from "../components/AQIHeatMap";
import CitySelector from "../components/CitySelector";
import { MapPin, Wind, Droplets, Factory } from "lucide-react";

interface City {
  name: string;
  state: string;
  population?: string;
  type: "metro" | "tier1" | "tier2" | "tier3";
}

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState<City>({
    name: "Delhi",
    state: "Delhi",
    population: "3.2 Cr",
    type: "metro"
  });

  // Mock AQI data that changes based on selected city
  const getAQIData = (city: City) => {
    const baseAQI = {
      "Delhi": 156,
      "Mumbai": 98,
      "Bangalore": 65,
      "Chennai": 78,
      "Kolkata": 134,
      "Patna": 168,
      "Varanasi": 142,
      "Jaunpur": 178,
      "Jhansi": 89,
      "Siliguri": 95
    };
    
    return baseAQI[city.name as keyof typeof baseAQI] || 95;
  };

  const currentAQI = getAQIData(selectedCity);

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: "Good", color: "bg-green-500", textColor: "text-green-700" };
    if (aqi <= 100) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-700" };
    if (aqi <= 150) return { level: "Unhealthy for Sensitive", color: "bg-orange-500", textColor: "text-orange-700" };
    if (aqi <= 200) return { level: "Unhealthy", color: "bg-red-500", textColor: "text-red-700" };
    if (aqi <= 300) return { level: "Very Unhealthy", color: "bg-purple-500", textColor: "text-purple-700" };
    return { level: "Hazardous", color: "bg-gray-800", textColor: "text-gray-100" };
  };

  const aqiInfo = getAQILevel(currentAQI);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time AQI Dashboard
          </h1>
          <div className="max-w-md">
            <CitySelector 
              selectedCity={selectedCity} 
              onSelectCity={setSelectedCity} 
            />
          </div>
        </div>

        {/* Current AQI Card */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-blue-500 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
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
                  <div className={`text-lg font-medium ${aqiInfo.textColor} dark:text-gray-300`}>
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
          <AQIStats />
        </div>

        {/* Heat Map */}
        <div className="mb-8">
          <AQIHeatMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
