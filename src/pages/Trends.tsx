
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ForecastChart from "../components/ForecastChart";
import { TrendingUp, Calendar, MapPin, Filter } from "lucide-react";

const Trends = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [selectedPollutant, setSelectedPollutant] = useState("PM2.5");
  const [timeRange, setTimeRange] = useState("7days");
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
    { value: "O3", label: "O₃", color: "#3b82f6" },
    { value: "CO", label: "CO", color: "#8b5cf6" }
  ];

  const timeRanges = [
    { value: "24hours", label: "Last 24 Hours" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "3months", label: "Last 3 Months" },
    { value: "1year", label: "Last Year" }
  ];

  // Mock historical data
  const generateMockData = () => {
    const data = [];
    const days = timeRange === "24hours" ? 1 : timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : timeRange === "3months" ? 90 : 365;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const baseValue = selectedPollutant === "PM2.5" ? 80 : 
                       selectedPollutant === "PM10" ? 120 : 
                       selectedPollutant === "NO2" ? 40 : 
                       selectedPollutant === "SO2" ? 15 : 
                       selectedPollutant === "O3" ? 60 : 1.5;
      
      const variation = Math.random() * 0.4 - 0.2; // ±20% variation
      const seasonalFactor = 1 + 0.3 * Math.sin((date.getMonth() / 12) * 2 * Math.PI); // Seasonal variation
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.max(0, Math.round(baseValue * (1 + variation) * seasonalFactor)),
        time: timeRange === "24hours" ? date.getHours() + ":00" : date.toLocaleDateString()
      });
    }
    
    return data;
  };

  const mockData = generateMockData();

  const getAverageValue = () => {
    const sum = mockData.reduce((acc, item) => acc + item.value, 0);
    return Math.round(sum / mockData.length);
  };

  const getChangePercentage = () => {
    if (mockData.length < 2) return 0;
    const first = mockData[0].value;
    const last = mockData[mockData.length - 1].value;
    return Math.round(((last - first) / first) * 100);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Historical AQI Trends
          </h1>
          <p className="text-gray-600">
            Analyze air quality patterns and identify trends across different time periods
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
            <label className="text-sm font-medium text-gray-700">Time Range</label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{range.label}</span>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average {selectedPollutant}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {getAverageValue()}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {selectedPollutant.includes("PM") ? "μg/m³" : 
                       selectedPollutant === "CO" ? "ppm" : "ppb"}
                    </span>
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Peak Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...mockData.map(d => d.value))}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {selectedPollutant.includes("PM") ? "μg/m³" : 
                       selectedPollutant === "CO" ? "ppm" : "ppb"}
                    </span>
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Change</p>
                  <p className={`text-2xl font-bold ${getChangePercentage() >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {getChangePercentage() >= 0 ? '+' : ''}{getChangePercentage()}%
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      vs start
                    </span>
                  </p>
                </div>
                <div className={`p-3 rounded-full ${getChangePercentage() >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                  <TrendingUp className={`h-6 w-6 ${getChangePercentage() >= 0 ? 'text-red-600' : 'text-green-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedPollutant} Trends - {selectedCity}</span>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Filter className="h-4 w-4" />
                <span>{timeRanges.find(r => r.value === timeRange)?.label}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ForecastChart 
              data={mockData} 
              type={chartType}
              pollutant={selectedPollutant}
            />
          </CardContent>
        </Card>

        {/* Satellite Time-lapse Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Satellite Time-lapse View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Satellite Integration Coming Soon
                </h3>
                <p className="text-gray-600">
                  View air quality changes over time through satellite imagery and time-lapse visualization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
