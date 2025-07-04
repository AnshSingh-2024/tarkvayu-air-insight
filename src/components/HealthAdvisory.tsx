
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, School, Wind, Home } from "lucide-react";

const HealthAdvisory = () => {
  const advisoryCards = [
    {
      level: "Good",
      aqi: "0-50",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: <Activity className="h-8 w-8 text-green-600" />,
      title: "Great day for outdoor activities!",
      description: "Air quality is excellent. Perfect time for all outdoor activities including sports, jogging, and children's play.",
      recommendations: [
        "Enjoy outdoor exercises and sports",
        "Great time for picnics and outdoor events",
        "Children can play outside safely",
        "Keep windows open for natural ventilation"
      ]
    },
    {
      level: "Moderate",
      aqi: "51-100",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: <Activity className="h-8 w-8 text-yellow-600" />,
      title: "Generally safe with minor precautions",
      description: "Air quality is acceptable for most people. Unusually sensitive individuals should consider limiting prolonged outdoor exertion.",
      recommendations: [
        "Normal outdoor activities are fine",
        "Sensitive people should limit long outdoor exercises",
        "Monitor children with respiratory conditions",
        "Good ventilation is still beneficial"
      ]
    },
    {
      level: "Unhealthy for Sensitive Groups",
      aqi: "101-150",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: "Wear a mask, reduce outdoor activity",
      description: "Sensitive groups may experience health effects. Active children, adults, and people with respiratory disease should limit prolonged outdoor exertion.",
      recommendations: [
        "Wear masks when going outside",
        "Limit prolonged outdoor activities",
        "Reduce intensive outdoor exercises",
        "Close windows during peak pollution hours"
      ]
    },
    {
      level: "Unhealthy",
      aqi: "151-200",
      color: "bg-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: <School className="h-8 w-8 text-red-600" />,
      title: "Avoid exercise outdoors",
      description: "Everyone may begin to experience health effects. Active children and adults, and people with respiratory disease should avoid prolonged outdoor exertion.",
      recommendations: [
        "Avoid outdoor exercise completely",
        "Wear N95 masks when outside",
        "Keep children indoors",
        "Cancel outdoor school activities"
      ]
    },
    {
      level: "Very Unhealthy",
      aqi: "201-300",
      color: "bg-purple-600",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: <Wind className="h-8 w-8 text-purple-600" />,
      title: "Use air purifiers, stay indoors",
      description: "Health alert: everyone may experience more serious health effects. Everyone should avoid all outdoor exertion.",
      recommendations: [
        "Stay indoors with air purifiers running",
        "Avoid all outdoor activities",
        "Use N95 or higher grade masks if you must go out",
        "Seal windows and doors"
      ]
    },
    {
      level: "Hazardous",
      aqi: "300+",
      color: "bg-gray-800",
      textColor: "text-gray-100",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-400",
      icon: <Home className="h-8 w-8 text-gray-800" />,
      title: "Emergency conditions - stay indoors",
      description: "Health warning of emergency conditions. The entire population is more likely to be affected by serious health effects.",
      recommendations: [
        "Stay indoors at all times",
        "Use professional-grade air purifiers",
        "Seal all windows and doors completely",
        "Seek medical attention for any symptoms"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Health Advisory Cards
        </h2>
        <p className="text-gray-600">
          Quick health recommendations based on different AQI levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisoryCards.map((card, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 ${card.borderColor}`}
          >
            <CardHeader className={`${card.bgColor} rounded-t-lg`}>
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${card.textColor} ${card.bgColor} ${card.borderColor}`}>
                  AQI {card.aqi}
                </Badge>
                <div className="p-2 bg-white/80 rounded-full">
                  {card.icon}
                </div>
              </div>
              <CardTitle className="text-lg">
                {card.level}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {card.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">
                  Key Recommendations:
                </h4>
                <ul className="space-y-1">
                  {card.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Guide */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center">Quick Action Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-orange-100 rounded-full">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium">Wear Mask</span>
              <span className="text-xs text-gray-500">AQI &gt; 100</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-red-100 rounded-full">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-sm font-medium">Avoid Exercise</span>
              <span className="text-xs text-gray-500">AQI &gt; 150</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <School className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Keep Kids Indoor</span>
              <span className="text-xs text-gray-500">AQI &gt; 150</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-purple-100 rounded-full">
                <Wind className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium">Use Purifier</span>
              <span className="text-xs text-gray-500">AQI &gt; 200</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-gray-100 rounded-full">
                <Home className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Close Windows</span>
              <span className="text-xs text-gray-500">AQI &gt; 100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAdvisory;
