
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Info } from "lucide-react";

const AQIHeatMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState("satellite");

  // Comprehensive data for Indian cities across all states
  const indianCities = [
    // Metro Cities
    { name: "Delhi", aqi: 324, status: "Hazardous", lat: 28.7041, lng: 77.1025, color: "bg-red-900", state: "Delhi" },
    { name: "Mumbai", aqi: 156, status: "Unhealthy", lat: 19.0760, lng: 72.8777, color: "bg-red-500", state: "Maharashtra" },
    { name: "Kolkata", aqi: 178, status: "Unhealthy", lat: 22.5726, lng: 88.3639, color: "bg-red-600", state: "West Bengal" },
    { name: "Chennai", aqi: 89, status: "Moderate", lat: 13.0827, lng: 80.2707, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Bangalore", aqi: 65, status: "Moderate", lat: 12.9716, lng: 77.5946, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Hyderabad", aqi: 112, status: "Unhealthy", lat: 17.3850, lng: 78.4867, color: "bg-orange-500", state: "Telangana" },
    
    // North India
    { name: "Jaipur", aqi: 167, status: "Unhealthy", lat: 26.9124, lng: 75.7873, color: "bg-red-600", state: "Rajasthan" },
    { name: "Lucknow", aqi: 201, status: "Very Unhealthy", lat: 26.8467, lng: 80.9462, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Kanpur", aqi: 234, status: "Very Unhealthy", lat: 26.4499, lng: 80.3319, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Patna", aqi: 189, status: "Unhealthy", lat: 25.5941, lng: 85.1376, color: "bg-red-600", state: "Bihar" },
    { name: "Varanasi", aqi: 198, status: "Unhealthy", lat: 25.3176, lng: 82.9739, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Jaunpur", aqi: 212, status: "Very Unhealthy", lat: 25.7333, lng: 82.6833, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Jhansi", aqi: 134, status: "Unhealthy", lat: 25.4484, lng: 78.5685, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Siliguri", aqi: 142, status: "Unhealthy", lat: 26.7271, lng: 88.3953, color: "bg-red-500", state: "West Bengal" },
    { name: "Amritsar", aqi: 156, status: "Unhealthy", lat: 31.6340, lng: 74.8723, color: "bg-red-500", state: "Punjab" },
    { name: "Chandigarh", aqi: 143, status: "Unhealthy", lat: 30.7333, lng: 76.7794, color: "bg-red-500", state: "Chandigarh" },
    { name: "Ghaziabad", aqi: 267, status: "Very Unhealthy", lat: 28.6692, lng: 77.4538, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Noida", aqi: 245, status: "Very Unhealthy", lat: 28.5355, lng: 77.3910, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Gurugram", aqi: 223, status: "Very Unhealthy", lat: 28.4595, lng: 77.0266, color: "bg-purple-600", state: "Haryana" },
    { name: "Faridabad", aqi: 234, status: "Very Unhealthy", lat: 28.4089, lng: 77.3178, color: "bg-purple-700", state: "Haryana" },
    
    // Central India
    { name: "Indore", aqi: 123, status: "Unhealthy", lat: 22.7196, lng: 75.8577, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Bhopal", aqi: 145, status: "Unhealthy", lat: 23.2599, lng: 77.4126, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Gwalior", aqi: 178, status: "Unhealthy", lat: 26.2183, lng: 78.1828, color: "bg-red-600", state: "Madhya Pradesh" },
    { name: "Nagpur", aqi: 98, status: "Moderate", lat: 21.1458, lng: 79.0882, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Raipur", aqi: 134, status: "Unhealthy", lat: 21.2514, lng: 81.6296, color: "bg-red-500", state: "Chhattisgarh" },
    
    // West India
    { name: "Ahmedabad", aqi: 142, status: "Unhealthy", lat: 23.0225, lng: 72.5714, color: "bg-red-500", state: "Gujarat" },
    { name: "Pune", aqi: 98, status: "Moderate", lat: 18.5204, lng: 73.8567, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Surat", aqi: 156, status: "Unhealthy", lat: 21.1702, lng: 72.8311, color: "bg-red-500", state: "Gujarat" },
    { name: "Rajkot", aqi: 123, status: "Unhealthy", lat: 22.3039, lng: 70.8022, color: "bg-orange-500", state: "Gujarat" },
    { name: "Vadodara", aqi: 134, status: "Unhealthy", lat: 22.3072, lng: 73.1812, color: "bg-red-500", state: "Gujarat" },
    
    // South India
    { name: "Coimbatore", aqi: 76, status: "Moderate", lat: 11.0168, lng: 76.9558, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Madurai", aqi: 89, status: "Moderate", lat: 9.9252, lng: 78.1198, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Mysore", aqi: 67, status: "Moderate", lat: 12.2958, lng: 76.6394, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Kochi", aqi: 54, status: "Moderate", lat: 9.9312, lng: 76.2673, color: "bg-yellow-300", state: "Kerala" },
    { name: "Thiruvananthapuram", aqi: 48, status: "Good", lat: 8.5241, lng: 76.9366, color: "bg-green-500", state: "Kerala" },
    { name: "Visakhapatnam", aqi: 87, status: "Moderate", lat: 17.6868, lng: 83.2185, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Vijayawada", aqi: 95, status: "Moderate", lat: 16.5062, lng: 80.6480, color: "bg-yellow-500", state: "Andhra Pradesh" },
    
    // East India
    { name: "Bhubaneswar", aqi: 123, status: "Unhealthy", lat: 20.2961, lng: 85.8245, color: "bg-orange-500", state: "Odisha" },
    { name: "Cuttack", aqi: 134, status: "Unhealthy", lat: 20.4625, lng: 85.8828, color: "bg-red-500", state: "Odisha" },
    { name: "Guwahati", aqi: 89, status: "Moderate", lat: 26.1445, lng: 91.7362, color: "bg-yellow-500", state: "Assam" },
    { name: "Imphal", aqi: 76, status: "Moderate", lat: 24.8170, lng: 93.9368, color: "bg-yellow-400", state: "Manipur" },
    { name: "Agartala", aqi: 87, status: "Moderate", lat: 23.8315, lng: 91.2868, color: "bg-yellow-500", state: "Tripura" },
    
    // Smaller Cities and Towns
    { name: "Aligarh", aqi: 189, status: "Unhealthy", lat: 27.8974, lng: 78.0880, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Bareilly", aqi: 167, status: "Unhealthy", lat: 28.3670, lng: 79.4304, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Moradabad", aqi: 178, status: "Unhealthy", lat: 28.8386, lng: 78.7733, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Saharanpur", aqi: 198, status: "Unhealthy", lat: 29.9680, lng: 77.5552, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Meerut", aqi: 223, status: "Very Unhealthy", lat: 28.9845, lng: 77.7064, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Muzaffarnagar", aqi: 201, status: "Very Unhealthy", lat: 29.4727, lng: 77.7085, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Mathura", aqi: 156, status: "Unhealthy", lat: 27.4924, lng: 77.6737, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Firozabad", aqi: 189, status: "Unhealthy", lat: 27.1592, lng: 78.3957, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Etawah", aqi: 145, status: "Unhealthy", lat: 26.7854, lng: 79.0154, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Mainpuri", aqi: 167, status: "Unhealthy", lat: 27.2380, lng: 79.0290, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Bulandshahr", aqi: 178, status: "Unhealthy", lat: 28.4041, lng: 77.8498, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Shahjahanpur", aqi: 156, status: "Unhealthy", lat: 27.8828, lng: 79.9103, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Rampur", aqi: 167, status: "Unhealthy", lat: 28.8152, lng: 79.0266, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Farrukhabad", aqi: 189, status: "Unhealthy", lat: 27.3979, lng: 79.5800, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Unnao", aqi: 178, status: "Unhealthy", lat: 26.5464, lng: 80.4879, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Sitapur", aqi: 156, status: "Unhealthy", lat: 27.5676, lng: 80.6736, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Hardoi", aqi: 145, status: "Unhealthy", lat: 27.4159, lng: 80.1331, color: "bg-red-500", state: "Uttar Pradesh" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "Unhealthy": return "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      case "Very Unhealthy": return "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800";
      case "Hazardous": return "text-gray-100 bg-gray-800 border-gray-600 dark:text-gray-300 dark:bg-gray-900/50 dark:border-gray-700";
      default: return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
    }
  };

  const selectedCityData = selectedCity ? indianCities.find(city => city.name === selectedCity) : null;

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
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click on any city to view detailed information
        </div>
      </div>

      {/* Selected City Info */}
      {selectedCityData && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {selectedCityData.name}, {selectedCityData.state}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedCityData.aqi}
                  </span>
                  <Badge className={getStatusColor(selectedCityData.status)}>
                    {selectedCityData.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCity(null)}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Map */}
      <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between dark:text-white">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live AQI Heatmap - India</span>
            </div>
            <Badge className="bg-blue-500 text-white">
              Live Data • {indianCities.length} Cities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 h-[500px] overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 opacity-30"></div>
            
            {/* City Markers */}
            {indianCities.map((city, index) => (
              <div
                key={index}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 hover:z-10"
                style={{
                  left: `${((city.lng - 68) / (97 - 68)) * 100}%`,
                  top: `${((35 - city.lat) / (35 - 6)) * 100}%`
                }}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className={`w-4 h-4 rounded-full ${city.color} border-2 border-white dark:border-gray-200 shadow-lg flex items-center justify-center relative`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  {selectedCity === city.name && (
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-blue-500 rounded-full animate-ping"></div>
                  )}
                </div>
                <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-medium shadow-lg min-w-max border border-gray-200 dark:border-gray-600 ${
                  selectedCity === city.name ? 'opacity-100 scale-110' : 'opacity-0 hover:opacity-100 scale-95 hover:scale-100'
                } transition-all duration-200`}>
                  <div className="font-semibold text-gray-900 dark:text-white">{city.name}</div>
                  <div className="text-gray-600 dark:text-gray-300">AQI: {city.aqi}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{city.state}</div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">AQI Scale</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Good</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">0-50</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Moderate</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">51-100</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">101-150</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Very Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">151-200</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Very Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">201-300</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Hazardous</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">300+</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{indianCities.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Cities Monitored</div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last Updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* City Grid */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">All Cities AQI Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {indianCities.map((city, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md dark:hover:shadow-gray-700 ${
                  selectedCity === city.name 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400" 
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                }`}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{city.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                  </div>
                  <Badge className={`${getStatusColor(city.status)} text-xs`}>
                    {city.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{city.aqi}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">AQI</span>
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
