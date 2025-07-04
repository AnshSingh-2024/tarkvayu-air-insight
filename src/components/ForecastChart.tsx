
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastChartProps {
  data: Array<{
    date: string;
    value: number;
    time: string;
  }>;
  type: "line" | "bar";
  pollutant: string;
}

const ForecastChart = ({ data, type, pollutant }: ForecastChartProps) => {
  const getColor = (pollutant: string) => {
    switch (pollutant) {
      case "PM2.5": return "#ef4444";
      case "PM10": return "#f97316";
      case "NO2": return "#eab308";
      case "SO2": return "#22c55e";
      case "O3": return "#3b82f6";
      case "CO": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const getUnit = (pollutant: string) => {
    if (pollutant.includes("PM")) return "μg/m³";
    if (pollutant === "CO") return "ppm";
    return "ppb";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {pollutant}: {payload[0].value} {getUnit(pollutant)}
          </p>
        </div>
      );
    }
    return null;
  };

  const chartData = data.map(item => ({
    ...item,
    label: item.time
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="label" 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              label={{ 
                value: getUnit(pollutant), 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#6b7280' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={getColor(pollutant)}
              strokeWidth={3}
              dot={{ fill: getColor(pollutant), strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: getColor(pollutant), strokeWidth: 2 }}
            />
          </LineChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="label" 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              label={{ 
                value: getUnit(pollutant), 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#6b7280' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill={getColor(pollutant)}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
