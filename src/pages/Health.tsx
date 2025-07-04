
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HealthAdvisory from "../components/HealthAdvisory";
import { Heart, Shield, AlertCircle, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const Health = () => {
  const aqiLevels = [
    {
      range: "0-50",
      status: "Good",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      description: "Air quality is satisfactory, and air pollution poses little or no risk.",
      activities: [
        "Perfect for all outdoor activities",
        "Great time for jogging and exercise",
        "Children can play outside safely",
        "Windows can be kept open for ventilation"
      ],
      precautions: []
    },
    {
      range: "51-100",
      status: "Moderate",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
      description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      activities: [
        "Outdoor activities are generally safe",
        "Sensitive individuals should limit prolonged outdoor exertion",
        "Good time for moderate exercise",
        "Normal school activities can continue"
      ],
      precautions: [
        "People with respiratory conditions should monitor symptoms",
        "Consider reducing time spent outdoors if sensitive"
      ]
    },
    {
      range: "101-150",
      status: "Unhealthy for Sensitive Groups",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
      description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      activities: [
        "Limit prolonged outdoor exertion",
        "Reduce intense outdoor activities",
        "Vulnerable groups should stay indoors when possible",
        "Schools may consider limiting outdoor activities"
      ],
      precautions: [
        "Wear a mask when going outside",
        "Keep windows closed during peak pollution hours",
        "Use air purifiers indoors",
        "People with asthma should keep inhalers handy"
      ]
    },
    {
      range: "151-200",
      status: "Unhealthy",
      color: "bg-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      description: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
      activities: [
        "Avoid outdoor exercise and activities",
        "Limit time spent outdoors",
        "Keep children indoors",
        "Cancel outdoor events if possible"
      ],
      precautions: [
        "Wear N95 masks when outdoors",
        "Keep all windows and doors closed",
        "Use air purifiers with HEPA filters",
        "Avoid outdoor exercise completely",
        "Stay hydrated and avoid heavy meals"
      ]
    },
    {
      range: "201-300",
      status: "Very Unhealthy",
      color: "bg-purple-600",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: <XCircle className="h-6 w-6 text-purple-600" />,
      description: "Health alert: The risk of health effects is increased for everyone. Everyone may experience health effects.",
      activities: [
        "Avoid all outdoor activities",
        "Stay indoors with air purification",
        "Cancel all outdoor events",
        "Work from home if possible"
      ],
      precautions: [
        "Use N95 or higher grade masks if you must go out",
        "Seal windows and doors completely",
        "Run air purifiers continuously",
        "Avoid any physical exertion",
        "Consult doctor if experiencing symptoms"
      ]
    },
    {
      range: "300+",
      status: "Hazardous",
      color: "bg-gray-800",
      textColor: "text-gray-100",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-400",
      icon: <XCircle className="h-6 w-6 text-gray-800" />,
      description: "Health warning of emergency conditions: everyone is more likely to be affected by serious health effects.",
      activities: [
        "Stay indoors at all times",
        "Emergency conditions - minimize all outdoor exposure",
        "All outdoor activities strictly prohibited",
        "Consider temporary relocation if possible"
      ],
      precautions: [
        "Use professional-grade air purifiers",
        "Wear P100 respirators if outdoor exposure unavoidable",
        "Seek immediate medical attention for any respiratory symptoms",
        "Create clean air spaces in your home",
        "Stock up on essential supplies to avoid going out"
      ]
    }
  ];

  const vulnerableGroups = [
    {
      group: "Children & Infants",
      icon: "👶",
      risks: [
        "Developing respiratory systems are more susceptible",
        "Higher breathing rates mean more pollutant intake",
        "Increased risk of asthma and allergies"
      ],
      recommendations: [
        "Limit outdoor play during high pollution days",
        "Use indoor air purifiers in nurseries and playrooms",
        "Watch for symptoms like coughing or difficulty breathing"
      ]
    },
    {
      group: "Elderly (65+)",
      icon: "👴",
      risks: [
        "Weakened immune systems",
        "Higher risk of cardiovascular complications",
        "Existing health conditions may worsen"
      ],
      recommendations: [
        "Monitor health closely during pollution spikes",
        "Keep emergency medications accessible",
        "Consider indoor exercises during poor air quality days"
      ]
    },
    {
      group: "Pregnant Women",
      icon: "🤰",
      risks: [
        "Risk of premature birth",
        "Potential impact on fetal development",
        "Increased respiratory stress"
      ],
      recommendations: [
        "Avoid outdoor activities during high pollution",
        "Use masks rated N95 or higher when outside",
        "Regular prenatal check-ups during pollution seasons"
      ]
    },
    {
      group: "People with Respiratory Conditions",
      icon: "🫁",
      risks: [
        "Asthma attacks may increase",
        "COPD symptoms may worsen",
        "Increased risk of respiratory infections"
      ],
      recommendations: [
        "Keep rescue inhalers readily available",
        "Follow prescribed medication schedules strictly",
        "Consider telemedicine consultations during poor air days"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Health Advisory & Guidelines
          </h1>
          <p className="text-gray-600">
            Comprehensive health recommendations based on current air quality levels
          </p>
        </div>

        {/* Current AQI Status */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-2">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Current Health Impact - Delhi
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-red-600">156</div>
                  <div>
                    <Badge className="text-red-700 bg-red-50 border-red-200">
                      Unhealthy
                    </Badge>
                    <p className="text-gray-600 mt-1">
                      Everyone should limit outdoor activities
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-100 rounded-full">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Advisory Component */}
        <HealthAdvisory />

        {/* Detailed AQI Level Guidelines */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detailed Health Guidelines by AQI Level
          </h2>
          <div className="space-y-6">
            {aqiLevels.map((level, index) => (
              <Card key={index} className={`border-l-4 ${level.borderColor}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {level.icon}
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{level.status}</span>
                          <Badge className={`${level.textColor} ${level.bgColor} ${level.borderColor}`}>
                            AQI {level.range}
                          </Badge>
                        </CardTitle>
                        <p className="text-gray-600 mt-1">{level.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Recommended Activities</span>
                      </h4>
                      <ul className="space-y-2">
                        {level.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {level.precautions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span>Health Precautions</span>
                        </h4>
                        <ul className="space-y-2">
                          {level.precautions.map((precaution, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{precaution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vulnerable Groups */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Special Guidelines for Vulnerable Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vulnerableGroups.map((group, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-2xl">{group.icon}</span>
                    <span>{group.group}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Health Risks</h4>
                      <ul className="space-y-1">
                        {group.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {group.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contact Information */}
        <Card className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="h-6 w-6" />
              <span>Emergency Health Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">When to Seek Medical Help</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Difficulty breathing or shortness of breath</li>
                  <li>• Persistent cough or wheezing</li>
                  <li>• Chest pain or tightness</li>
                  <li>• Severe headaches or dizziness</li>
                  <li>• Unusual fatigue or weakness</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Contacts</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• National Emergency: <strong>108</strong></li>
                  <li>• Ambulance: <strong>102</strong></li>
                  <li>• Poison Control: <strong>1066</strong></li>
                  <li>• Air Quality Helpline: <strong>1800-11-0000</strong></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Health;
