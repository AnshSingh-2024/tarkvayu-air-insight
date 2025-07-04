
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ForecastChart from "../components/ForecastChart";
import { Cloud, TrendingUp, AlertTriangle, Calendar, MapPin, Brain } from "lucide-react";

const Forecast = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [forecastPeriod, setForecastPeriod] = useState("24hours");
  const [selectedPollutant, setSelectedPollutant] = useState("PM2.5");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", 
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"
  ];

  const pollutants = [
    { value: "PM2.5", label: "PM2.5", color: "#ef4444" },
    { value: "PM10", label: "PM10", color: "#f97316" },
    { value: "NO2", label: "NO₂", color: "#eab308" },
    { value: "SO2", label: "SO₂", color: "#22c55e" },
    { value: "O3", label: "O₃", color: "#3b82f6" }
  ];

  const forecastPeriods = [
    { value: "24hours", label: "24 Hours", hours: 24 },
    { value: "48hours", label: "48 Hours", hours: 48 },
    { value: "72hours", label: "72 Hours", hours: 72 }
  ];

  // Generate mock forecast data
  const generateForecastData = () => {
    const hours = forecastPeriods.find(p => p.value === forecastPeriod)?.hours || 24;
    const data = [];
    
    for (let i = 0; i <= hours; i += 3) {
      const date = new Date();
      date.setHours(date.getHours() + i);
      
      const baseValue = selectedPollutant === "PM2.5" ? 85 : 
                       selectedPollutant === "PM10" ? 125 : 
                       selectedPollutant === "NO2" ? 45 : 
                       selectedPollutant === "SO2" ? 18 : 65;
      
      const hourlyVariation = Math.sin((date.getHours() / 24) * 2 * Math.PI) * 0.2;
      const randomVariation = (Math.random() - 0.5) * 0.3;
      const trendFactor = 1 + (i / hours) * 0.1; // Slight upward trend
      
      data.push({
        date: date.toISOString(),
        value: Math.max(0, Math.round(baseValue * (1 + hourlyVariation + randomVariation) * trendFactor)),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    
    return data;
  };

  const forecastData = generateForecastData();

  const getAQIStatus = (value: number) => {
    if (value <= 50) return { status: "Good", color: "text-green-700 bg-green-50 border-green-200" };
    if (value <= 100) return { status: "Moderate", color: "text-yellow-700 bg-yellow-50 border-yellow-200" };
    if (value <= 150) return { status: "Unhealthy for Sensitive", color: "text-orange-700 bg-orange-50 border-orange-200" };
    if (value <= 200) return { status: "Unhealthy", color: "text-red-700 bg-red-50 border-red-200" };
    if (value <= 300) return { status: "Very Unhealthy", color: "text-purple-700 bg-purple-50 border-purple-200" };
    return { status: "Hazardous", color: "text-gray-100 bg-gray-800 border-gray-600" };
  };

  const getCurrentForecast = () => {
    return forecastData[0] || { value: 0 };
  };

  const getPeakForecast = () => {
    return Math.max(...forecastData.map(d => d.value));
  };

  const getHealthRecommendation = (value: number) => {
    if (value <= 50) return "Great day for outdoor activities!";
    if (value <= 100) return "Moderate air quality. Sensitive people should limit prolonged outdoor exertion.";
    if (value <= 150) return "Unhealthy for sensitive groups. Consider reducing outdoor activities.";
    if (value <= 200) return "Unhealthy air quality. Everyone should limit outdoor exertion.";
    if (value <= 300) return "Very unhealthy. Avoid outdoor activities, especially for sensitive groups.";
    return "Hazardous conditions. Stay indoors and use air purifiers.";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AQI Forecast & Predictions
          </h1>
          <p className="text-gray-600">
            AI-powered air quality forecasts to help you plan your activities
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{city}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Forecast Period</label>
            <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {forecastPeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{period.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Pollutant</label>
            <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pollutants.map((pollutant) => (
                  <SelectItem key={pollutant.value} value={pollutant.value}>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pollutant.color }}
                      ></div>
                      <span>{pollutant.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Chart Type</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="flex-1"
              >
                Line
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="flex-1"
              >
                Bar
              </Button>
            </div>
          </div>
        </div>

        {/* Current Forecast Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Forecast</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {getCurrentForecast().value}
                  </p>
                  <Badge className={getAQIStatus(getCurrentForecast().value).color}>
                    {getAQIStatus(getCurrentForecast().value).status}
                  </Badge>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Peak Forecast</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {getPeakForecast()}
                  </p>
                  <Badge className={getAQIStatus(getPeakForecast()).color}>
                    {getAQIStatus(getPeakForecast()).status}
                  </Badge>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Confidence</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">87%</p>
                  <Badge className="text-purple-700 bg-purple-50 border-purple-200">
                    High Accuracy
                  </Badge>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Advisory */}
        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Health Recommendation
                </h3>
                <p className="text-gray-700">
                  {getHealthRecommendation(getCurrentForecast().value)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedPollutant} Forecast - {selectedCity}</span>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{forecastPeriods.find(p => p.value === forecastPeriod)?.label}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ForecastChart 
              data={forecastData} 
              type={chartType}
              pollutant={selectedPollutant}
            />
          </CardContent>
        </Card>

        {/* Weather Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Weather Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wind Speed</span>
                  <span className="font-medium">12 km/h NW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Temperature</span>
                  <span className="font-medium">28°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pressure</span>
                  <span className="font-medium">1013 hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Model Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced AI Forecasting
                </h3>
                <p className="text-gray-600 text-sm">
                  Our models use satellite data, weather patterns, and historical trends to provide accurate 72-hour forecasts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
