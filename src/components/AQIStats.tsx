
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Pollutant {
  name: string;
  value: number;
  unit: string;
  status: string;
  color: string;
}

interface AQIStatsProps {
  pollutants: Pollutant[];
}

const AQIStats = ({ pollutants }: AQIStatsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "Unhealthy": return "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      case "Very Unhealthy": return "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800";
      case "Hazardous": return "text-gray-700 bg-gray-50 border-gray-400 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
      default: return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
    }
  };

  const getMaxValue = (pollutant: string) => {
    switch (pollutant) {
      case "PM2.5": return 150;
      case "PM10": return 250;
      case "NO₂": return 100;
      case "SO₂": return 50;
      case "O₃": return 100;
      case "CO": return 5;
      default: return 100;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pollutants.map((pollutant, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold dark:text-white">
                {pollutant.name}
              </CardTitle>
              <Badge className={getStatusColor(pollutant.status)}>
                {pollutant.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {pollutant.value}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {pollutant.unit}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Level</span>
                  <span>{Math.round((pollutant.value / getMaxValue(pollutant.name)) * 100)}%</span>
                </div>
                <Progress 
                  value={(pollutant.value / getMaxValue(pollutant.name)) * 100} 
                  className="h-2"
                />
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                {pollutant.name === "PM2.5" && "Fine particulate matter that can penetrate deep into lungs"}
                {pollutant.name === "PM10" && "Coarse particulate matter from dust and smoke"}
                {pollutant.name === "NO₂" && "Nitrogen dioxide from vehicle emissions"}
                {pollutant.name === "SO₂" && "Sulfur dioxide from industrial sources"}
                {pollutant.name === "O₃" && "Ground-level ozone formed by sunlight and pollutants"}
                {pollutant.name === "CO" && "Carbon monoxide from incomplete combustion"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AQIStats;
