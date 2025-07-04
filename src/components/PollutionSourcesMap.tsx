
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Factory, Car, Flame, Building } from "lucide-react";

const PollutionSourcesMap = () => {
  const [activeOverlays, setActiveOverlays] = useState({
    traffic: true,
    industry: true,
    cropBurning: false,
    construction: false
  });

  const toggleOverlay = (overlay: string) => {
    setActiveOverlays(prev => ({
      ...prev,
      [overlay]: !prev[overlay as keyof typeof prev]
    }));
  };

  const overlayControls = [
    {
      id: "traffic",
      label: "Traffic Density",
      icon: <Car className="h-4 w-4" />,
      color: "bg-red-500",
      description: "Vehicle emissions and traffic congestion areas"
    },
    {
      id: "industry",
      label: "Industrial Zones",
      icon: <Factory className="h-4 w-4" />,
      color: "bg-gray-600",
      description: "Manufacturing units and industrial emissions"
    },
    {
      id: "cropBurning",
      label: "Crop Burning",
      icon: <Flame className="h-4 w-4" />,
      color: "bg-orange-500",
      description: "Agricultural burning detected by satellite"
    },
    {
      id: "construction",
      label: "Construction Sites",
      icon: <Building className="h-4 w-4" />,
      color: "bg-yellow-600",
      description: "Active construction and dust sources"
    }
  ];

  const mockPollutionSources = [
    { id: 1, type: "traffic", name: "Delhi-Gurgaon Expressway", intensity: "High", lat: 28.4595, lng: 77.0266 },
    { id: 2, type: "industry", name: "Ghaziabad Industrial Area", intensity: "Very High", lat: 28.6692, lng: 77.4538 },
    { id: 3, type: "cropBurning", name: "Punjab Farmlands", intensity: "Moderate", lat: 30.7333, lng: 76.7794 },
    { id: 4, type: "traffic", name: "Ring Road Junction", intensity: "High", lat: 28.6139, lng: 77.2090 },
    { id: 5, type: "construction", name: "New Metro Line", intensity: "Moderate", lat: 28.5355, lng: 77.3910 },
    { id: 6, type: "industry", name: "Faridabad Manufacturing Hub", intensity: "High", lat: 28.4089, lng: 77.3178 }
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Very High": return "text-red-700 bg-red-50 border-red-200";
      case "High": return "text-orange-700 bg-orange-50 border-orange-200";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Low": return "text-green-700 bg-green-50 border-green-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "traffic": return <Car className="h-4 w-4" />;
      case "industry": return <Factory className="h-4 w-4" />;
      case "cropBurning": return <Flame className="h-4 w-4" />;
      case "construction": return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pollution Sources Map
          </h2>
          <p className="text-gray-600">
            Identify and track major pollution sources in your region
          </p>
        </div>
      </div>

      {/* Overlay Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Map Overlays</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {overlayControls.map((overlay) => (
              <div key={overlay.id} className="space-y-2">
                <Button
                  variant={activeOverlays[overlay.id as keyof typeof activeOverlays] ? "default" : "outline"}
                  className="w-full h-auto p-4 flex-col space-y-2"
                  onClick={() => toggleOverlay(overlay.id)}
                >
                  <div className="flex items-center space-x-2">
                    {overlay.icon}
                    <span className="font-medium">{overlay.label}</span>
                  </div>
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  {overlay.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle>Delhi NCR Pollution Sources</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-green-100 via-yellow-50 to-red-100 h-96 overflow-hidden rounded-b-lg">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 opacity-40"></div>
            
            {/* Pollution Source Markers */}
            {mockPollutionSources
              .filter(source => activeOverlays[source.type as keyof typeof activeOverlays])
              .map((source) => (
                <div
                  key={source.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                  style={{
                    left: `${((source.lng - 76) / (78 - 76)) * 100}%`,
                    top: `${((29 - source.lat) / (29 - 28)) * 100}%`
                  }}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                    source.intensity === "Very High" ? "bg-red-600" :
                    source.intensity === "High" ? "bg-orange-500" :
                    source.intensity === "Moderate" ? "bg-yellow-500" : "bg-green-500"
                  }`}>
                    <div className="text-white text-xs">
                      {getTypeIcon(source.type)}
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg min-w-max z-10">
                    <div className="font-semibold text-sm">{source.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      {getTypeIcon(source.type)}
                      <Badge className={getIntensityColor(source.intensity)}>
                        {source.intensity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

            {/* Wind Direction Indicator */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">Wind Direction</div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-2 border-blue-500 rounded-full flex items-center justify-center relative">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-blue-500 transform rotate-45"></div>
                </div>
                <span className="text-sm text-gray-600">NW 12 km/h</span>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2 text-sm">Pollution Intensity</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Very High</span>
                </div>
              </div>
            </div>

            {/* Satellite Data Notice */}
            <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Live Satellite Data
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Pollution Source Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPollutionSources.map((source) => (
              <div
                key={source.id}
                className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(source.type)}
                    <span className="font-medium text-sm">{source.type.charAt(0).toUpperCase() + source.type.slice(1)}</span>
                  </div>
                  <Badge className={getIntensityColor(source.intensity)}>
                    {source.intensity}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{source.name}</h4>
                <div className="text-xs text-gray-500">
                  Lat: {source.lat}, Lng: {source.lng}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Notice */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Advanced Satellite Integration
          </h3>
          <p className="text-gray-600 text-sm">
            Real-time pollution source mapping using NASA and ISRO satellite data, combined with ground sensor networks for accurate source identification.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PollutionSourcesMap;
