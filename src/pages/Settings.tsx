
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NotificationSettings from "../components/NotificationSettings";
import { Bell, MapPin, User, Shield, Smartphone, Clock, Save, Languages } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Notification Settings
    pollutionAlerts: true,
    healthTips: true,
    nightMode: true,
    weeklyReports: false,
    emergencyAlerts: true,
    
    // Location Settings
    autoLocation: true,
    defaultCity: "Delhi",
    radius: "5",
    
    // Personal Settings
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    ageGroup: "25-35",
    healthConditions: "none",
    
    // App Settings
    units: "metric",
    language: "english",
    theme: "light",
    dataUsage: "standard",
    displayLanguage: "english"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Add save logic here
  };

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", 
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings & Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your TarkVayu experience and notification preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Language Toggle */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Languages className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>Language Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">Display Language</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred language for the interface</p>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <Button
                    variant={settings.displayLanguage === "english" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleSettingChange("displayLanguage", "english")}
                    className="dark:text-white"
                  >
                    English
                  </Button>
                  <Button
                    variant={settings.displayLanguage === "hindi" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleSettingChange("displayLanguage", "hindi")}
                    className="dark:text-white"
                  >
                    हिन्दी
                  </Button>
                </div>
              </div>
              
              {settings.displayLanguage === "hindi" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    हिन्दी भाषा सक्रिय की गई है। पूर्ण अनुवाद जल्द ही उपलब्ध होगा।
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>

          {/* Location Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>Location Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">Auto-detect Location</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically detect your current location for AQI data</p>
                </div>
                <Switch
                  checked={settings.autoLocation}
                  onCheckedChange={(checked) => handleSettingChange("autoLocation", checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultCity" className="dark:text-white">Default City</Label>
                  <Select value={settings.defaultCity} onValueChange={(value) => handleSettingChange("defaultCity", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city} className="dark:text-white dark:hover:bg-gray-700">
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radius" className="dark:text-white">Alert Radius (km)</Label>
                  <Select value={settings.radius} onValueChange={(value) => handleSettingChange("radius", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="1" className="dark:text-white dark:hover:bg-gray-700">1 km</SelectItem>
                      <SelectItem value="5" className="dark:text-white dark:hover:bg-gray-700">5 km</SelectItem>
                      <SelectItem value="10" className="dark:text-white dark:hover:bg-gray-700">10 km</SelectItem>
                      <SelectItem value="25" className="dark:text-white dark:hover:bg-gray-700">25 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-white">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="dark:text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange("phone", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageGroup" className="dark:text-white">Age Group</Label>
                  <Select value={settings.ageGroup} onValueChange={(value) => handleSettingChange("ageGroup", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="under-18" className="dark:text-white dark:hover:bg-gray-700">Under 18</SelectItem>
                      <SelectItem value="18-25" className="dark:text-white dark:hover:bg-gray-700">18-25</SelectItem>
                      <SelectItem value="25-35" className="dark:text-white dark:hover:bg-gray-700">25-35</SelectItem>
                      <SelectItem value="35-50" className="dark:text-white dark:hover:bg-gray-700">35-50</SelectItem>
                      <SelectItem value="50-65" className="dark:text-white dark:hover:bg-gray-700">50-65</SelectItem>
                      <SelectItem value="over-65" className="dark:text-white dark:hover:bg-gray-700">Over 65</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthConditions" className="dark:text-white">Health Conditions (Optional)</Label>
                <Select value={settings.healthConditions} onValueChange={(value) => handleSettingChange("healthConditions", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    <SelectItem value="none" className="dark:text-white dark:hover:bg-gray-700">None</SelectItem>
                    <SelectItem value="asthma" className="dark:text-white dark:hover:bg-gray-700">Asthma</SelectItem>
                    <SelectItem value="copd" className="dark:text-white dark:hover:bg-gray-700">COPD</SelectItem>
                    <SelectItem value="heart-disease" className="dark:text-white dark:hover:bg-gray-700">Heart Disease</SelectItem>
                    <SelectItem value="diabetes" className="dark:text-white dark:hover:bg-gray-700">Diabetes</SelectItem>
                    <SelectItem value="respiratory" className="dark:text-white dark:hover:bg-gray-700">Other Respiratory Conditions</SelectItem>
                    <SelectItem value="pregnancy" className="dark:text-white dark:hover:bg-gray-700">Pregnancy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Smartphone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <span>App Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="units" className="dark:text-white">Units</Label>
                  <Select value={settings.units} onValueChange={(value) => handleSettingChange("units", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="metric" className="dark:text-white dark:hover:bg-gray-700">Metric (μg/m³, km)</SelectItem>
                      <SelectItem value="imperial" className="dark:text-white dark:hover:bg-gray-700">Imperial (ppm, miles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="dark:text-white">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="english" className="dark:text-white dark:hover:bg-gray-700">English</SelectItem>
                      <SelectItem value="hindi" className="dark:text-white dark:hover:bg-gray-700">हिन्दी</SelectItem>
                      <SelectItem value="bengali" className="dark:text-white dark:hover:bg-gray-700">বাংলা</SelectItem>
                      <SelectItem value="tamil" className="dark:text-white dark:hover:bg-gray-700">தமிழ்</SelectItem>
                      <SelectItem value="marathi" className="dark:text-white dark:hover:bg-gray-700">मराठी</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme" className="dark:text-white">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="light" className="dark:text-white dark:hover:bg-gray-700">Light</SelectItem>
                      <SelectItem value="dark" className="dark:text-white dark:hover:bg-gray-700">Dark</SelectItem>
                      <SelectItem value="auto" className="dark:text-white dark:hover:bg-gray-700">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataUsage" className="dark:text-white">Data Usage</Label>
                  <Select value={settings.dataUsage} onValueChange={(value) => handleSettingChange("dataUsage", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="low" className="dark:text-white dark:hover:bg-gray-700">Low (Basic data only)</SelectItem>
                      <SelectItem value="standard" className="dark:text-white dark:hover:bg-gray-700">Standard</SelectItem>
                      <SelectItem value="high" className="dark:text-white dark:hover:bg-gray-700">High (Full features)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">Share Anonymous Usage Data</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Help improve TarkVayu by sharing anonymous usage statistics</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">Location History</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Store location history for personalized insights</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">Data Export</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Allow exporting your personal data</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
