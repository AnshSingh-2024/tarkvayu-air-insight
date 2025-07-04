
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AQIHeatMap from "../components/AQIHeatMap";
import AQIStats from "../components/AQIStats";
import { MapPin, RefreshCw, Map, Grid3X3 } from "lucide-react";

const Dashboard = () => {
  const [currentLocation, setCurrentLocation] = useState("Delhi, India");
  const [viewMode, setViewMode] = useState<"map" | "cards">("cards");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const mockAQIData = {
    overall: {
      aqi: 156,
      status: "Unhealthy",
      color: "bg-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50"
    },
    pollutants: [
      { name: "PM2.5", value: 89, unit: "μg/m³", status: "Unhealthy", color: "red" },
      { name: "PM10", value: 145, unit: "μg/m³", status: "Unhealthy", color: "red" },
      { name: "NO₂", value: 42, unit: "ppb", status: "Moderate", color: "yellow" },
      { name: "SO₂", value: 12, unit: "ppb", status: "Good", color: "green" },
      { name: "O₃", value: 65, unit: "ppb", status: "Moderate", color: "yellow" },
      { name: "CO", value: 1.2, unit: "ppm", status: "Good", color: "green" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-700 bg-green-50 border-green-200";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Unhealthy": return "text-red-700 bg-red-50 border-red-200";
      case "Very Unhealthy": return "text-purple-700 bg-purple-50 border-purple-200";
      case "Hazardous": return "text-gray-700 bg-gray-50 border-gray-400";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const handleLocationDetection = () => {
    // Mock location detection
    setCurrentLocation("Mumbai, Maharashtra");
    setLastUpdated(new Date());
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Real-Time AQI Dashboard
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{currentLocation}</span>
              </div>
              <div className="text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLocationDetection}
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Detect Location</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="flex items-center space-x-1"
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Cards</span>
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="flex items-center space-x-1"
              >
                <Map className="h-4 w-4" />
                <span>Map</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main AQI Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-2">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Current Air Quality Index
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-5xl font-bold text-red-600">
                    {mockAQIData.overall.aqi}
                  </div>
                  <div>
                    <Badge className={getStatusColor(mockAQIData.overall.status)}>
                      {mockAQIData.overall.status}
                    </Badge>
                    <p className="text-gray-600 mt-1">
                      Sensitive groups should limit outdoor activities
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {mockAQIData.overall.aqi}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle Content */}
        {viewMode === "cards" ? (
          <AQIStats pollutants={mockAQIData.pollutants} />
        ) : (
          <AQIHeatMap />
        )}

        {/* Recent Readings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>24-Hour Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { time: "00:00", aqi: 142 },
                { time: "03:00", aqi: 158 },
                { time: "06:00", aqi: 172 },
                { time: "09:00", aqi: 165 },
                { time: "12:00", aqi: 149 },
                { time: "15:00", aqi: 156 },
                { time: "18:00", aqi: 168 },
                { time: "21:00", aqi: 156 }
              ].map((reading, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-600 mb-1">{reading.time}</div>
                  <div className="text-lg font-semibold text-red-600">{reading.aqi}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
