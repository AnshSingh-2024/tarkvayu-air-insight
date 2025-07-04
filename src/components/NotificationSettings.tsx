
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Clock, MapPin, Heart, AlertTriangle, TrendingUp } from "lucide-react";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    pollutionAlerts: true,
    healthTips: true,
    nightMode: true,
    weeklyReports: false,
    emergencyAlerts: true,
    forecastAlerts: true,
    aqiThreshold: "150",
    quietHoursStart: "22:00",
    quietHoursEnd: "06:00",
    frequency: "immediate"
  });

  const handleNotificationChange = (key: string, value: any) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const notificationTypes = [
    {
      id: "pollutionAlerts",
      title: "Pollution Alerts",
      description: "Get notified when air quality exceeds safe levels in your area",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      enabled: notifications.pollutionAlerts
    },
    {
      id: "healthTips",
      title: "Location-based Health Tips",
      description: "Receive personalized health recommendations based on current AQI",
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      enabled: notifications.healthTips
    },
    {
      id: "forecastAlerts",
      title: "Forecast Alerts",
      description: "Daily air quality forecasts and planning recommendations",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      enabled: notifications.forecastAlerts
    },
    {
      id: "emergencyAlerts",
      title: "Emergency Alerts",
      description: "Critical air quality warnings and health emergency notifications",
      icon: <Bell className="h-5 w-5 text-orange-500" />,
      enabled: notifications.emergencyAlerts
    },
    {
      id: "weeklyReports",
      title: "Weekly Reports",
      description: "Weekly air quality summary and health impact analysis",
      icon: <MapPin className="h-5 w-5 text-green-500" />,
      enabled: notifications.weeklyReports
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Notification Toggles */}
      <div className="space-y-4">
        {notificationTypes.map((notification) => (
          <Card key={notification.id} className="border-l-4 border-l-gray-200 hover:border-l-blue-400 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <Label className="text-base font-medium cursor-pointer">
                      {notification.title}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notification.enabled}
                  onCheckedChange={(checked) => handleNotificationChange(notification.id, checked)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Settings */}
      <div className="border-t pt-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
        
        {/* AQI Alert Threshold */}
        <div className="space-y-2">
          <Label htmlFor="aqiThreshold">AQI Alert Threshold</Label>
          <Select 
            value={notifications.aqiThreshold} 
            onValueChange={(value) => handleNotificationChange("aqiThreshold", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">50 - Good to Moderate</SelectItem>
              <SelectItem value="100">100 - Moderate to Unhealthy for Sensitive</SelectItem>
              <SelectItem value="150">150 - Unhealthy for Sensitive to Unhealthy</SelectItem>
              <SelectItem value="200">200 - Unhealthy to Very Unhealthy</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600">
            Receive alerts when AQI exceeds this level
          </p>
        </div>

        {/* Notification Frequency */}
        <div className="space-y-2">
          <Label htmlFor="frequency">Notification Frequency</Label>
          <Select 
            value={notifications.frequency} 
            onValueChange={(value) => handleNotificationChange("frequency", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="hourly">Hourly Summary</SelectItem>
              <SelectItem value="daily">Daily Summary</SelectItem>
              <SelectItem value="critical">Critical Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quiet Hours */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Night-Time Silence (10PM–6AM)</Label>
              <p className="text-sm text-gray-600">Disable non-critical notifications during quiet hours</p>
            </div>
            <Switch
              checked={notifications.nightMode}
              onCheckedChange={(checked) => handleNotificationChange("nightMode", checked)}
            />
          </div>

          {notifications.nightMode && (
            <div className="grid grid-cols-2 gap-4 ml-6 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="quietStart">Start Time</Label>
                <Select 
                  value={notifications.quietHoursStart} 
                  onValueChange={(value) => handleNotificationChange("quietHoursStart", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quietEnd">End Time</Label>
                <Select 
                  value={notifications.quietHoursEnd} 
                  onValueChange={(value) => handleNotificationChange("quietHoursEnd", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="05:00">5:00 AM</SelectItem>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Firebase Integration Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-900">Push Notifications</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Notifications are powered by Firebase Cloud Messaging. Make sure to allow notifications in your browser settings.
        </p>
      </div>
    </div>
  );
};

export default NotificationSettings;
