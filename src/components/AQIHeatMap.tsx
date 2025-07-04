
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter } from "lucide-react";

const AQIHeatMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState("satellite");

  // Mock data for Indian cities
  const indianCities = [
    { name: "Delhi", aqi: 324, status: "Hazardous", lat: 28.7041, lng: 77.1025, color: "bg-red-900" },
    { name: "Mumbai", aqi: 156, status: "Unhealthy", lat: 19.0760, lng: 72.8777, color: "bg-red-500" },
    { name: "Kolkata", aqi: 178, status: "Unhealthy", lat: 22.5726, lng: 88.3639, color: "bg-red-600" },
    { name: "Chennai", aqi: 89, status: "Moderate", lat: 13.0827, lng: 80.2707, color: "bg-yellow-500" },
    { name: "Bangalore", aqi: 65, status: "Moderate", lat: 12.9716, lng: 77.5946, color: "bg-yellow-400" },
    { name: "Hyderabad", aqi: 112, status: "Unhealthy", lat: 17.3850, lng: 78.4867, color: "bg-orange-500" },
    { name: "Ahmedabad", aqi: 142, status: "Unhealthy", lat: 23.0225, lng: 72.5714, color: "bg-red-500" },
    { name: "Pune", aqi: 98, status: "Moderate", lat: 18.5204, lng: 73.8567, color: "bg-yellow-500" },
    { name: "Jaipur", aqi: 167, status: "Unhealthy", lat: 26.9124, lng: 75.7873, color: "bg-red-600" },
    { name: "Lucknow", aqi: 201, status: "Very Unhealthy", lat: 26.8467, lng: 80.9462, color: "bg-purple-600" },
    { name: "Kanpur", aqi: 234, status: "Very Unhealthy", lat: 26.4499, lng: 80.3319, color: "bg-purple-700" },
    { name: "Patna", aqi: 189, status: "Unhealthy", lat: 25.5941, lng: 85.1376, color: "bg-red-600" },
    { name: "Indore", aqi: 123, status: "Unhealthy", lat: 22.7196, lng: 75.8577, color: "bg-orange-500" },
    { name: "Bhopal", aqi: 145, status: "Unhealthy", lat: 23.2599, lng: 77.4126, color: "bg-red-500" },
    { name: "Gwalior", aqi: 178, status: "Unhealthy", lat: 26.2183, lng: 78.1828, color: "bg-red-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-700 bg-green-50 border-green-200";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Unhealthy": return "text-red-700 bg-red-50 border-red-200";
      case "Very Unhealthy": return "text-purple-700 bg-purple-50 border-purple-200";
      case "Hazardous": return "text-gray-100 bg-gray-800 border-gray-600";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant={mapLayer === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapLayer("satellite")}
            className="flex items-center space-x-2"
          >
            <Layers className="h-4 w-4" />
            <span>Satellite</span>
          </Button>
          <Button
            variant={mapLayer === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapLayer("terrain")}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Terrain</span>
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          Click on any city to view detailed information
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Live AQI Heatmap - India</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 h-96 overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 opacity-30"></div>
            
            {/* City Markers */}
            {indianCities.map((city, index) => (
              <div
                key={index}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                style={{
                  left: `${((city.lng - 68) / (97 - 68)) * 100}%`,
                  top: `${((35 - city.lat) / (35 - 6)) * 100}%`
                }}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className={`w-6 h-6 rounded-full ${city.color} border-2 border-white shadow-lg flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-lg min-w-max">
                  <div className="font-semibold">{city.name}</div>
                  <div className="text-gray-600">AQI: {city.aqi}</div>
                </div>
              </div>
            ))}
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2 text-sm">AQI Scale</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Good (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Moderate (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Unhealthy (101-150)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Unhealthy (151-200)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span>Very Unhealthy (201-300)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <span>Hazardous (300+)</span>
                </div>
              </div>
            </div>
            
            {/* Real-time Integration Notice */}
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Live Data • CPCB & Satellite
            </div>
          </div>
        </CardContent>
      </Card>

      {/* City List */}
      <Card>
        <CardHeader>
          <CardTitle>Major Cities AQI Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indianCities.map((city, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                  selectedCity === city.name ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{city.name}</h4>
                  <Badge className={getStatusColor(city.status)}>
                    {city.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{city.aqi}</span>
                  <span className="text-sm text-gray-500">AQI</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AQIHeatMap;
