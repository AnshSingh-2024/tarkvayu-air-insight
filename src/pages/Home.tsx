
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, TrendingUp, Heart, Bell } from "lucide-react";

const Home = () => {
  const [location, setLocation] = useState("");

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-500" />,
      title: "Hyperlocal AQI",
      description: "Get precise air quality data for your exact location, not just major cities."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Smart Forecasting",
      description: "AI-powered 72-hour air quality predictions to plan your activities."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Health Advisory",
      description: "Personalized health recommendations based on current air quality."
    },
    {
      icon: <Bell className="h-8 w-8 text-yellow-500" />,
      title: "Smart Alerts",
      description: "Timely notifications about pollution spikes and health advisories."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Kanpur, UP",
      text: "Finally, accurate AQI data for my city! TarkVayu helps me protect my family's health every day."
    },
    {
      name: "Priya Sharma",
      location: "Patna, Bihar",
      text: "The health advisories are incredibly helpful. I know when to keep my kids indoors during high pollution."
    },
    {
      name: "Arjun Singh",
      location: "Gwalior, MP",
      text: "Love the hyperlocal forecasts. Perfect for planning my morning runs and outdoor activities."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-green-500 to-cyan-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Breathe Better with <span className="text-yellow-300">TarkVayu</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Breathe It. Beat It. Track It.
          </p>
          <p className="text-lg mb-8 text-blue-100 max-w-3xl mx-auto">
            Granular, Real-Time & Predictive Air Quality Information for Every Indian
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your city or pin code..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/70 h-12"
                />
              </div>
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8">
                  Check AQI Now
                </Button>
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                View Dashboard
              </Button>
            </Link>
            <Link to="/forecast">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                See Forecast
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TarkVayu?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built specifically for India's diverse geography and climate, serving communities often overlooked by metro-focused apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-600 rounded-2xl shadow-md mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-xl text-gray-700 dark:text-gray-200">Cities Covered</div>
              <div className="text-gray-500 dark:text-gray-400">Including rural and tier-2 cities</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
              <div className="text-xl text-gray-700 dark:text-gray-200">Real-time Monitoring</div>
              <div className="text-gray-500 dark:text-gray-400">Continuous data updates</div>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">72hrs</div>
              <div className="text-xl text-gray-700 dark:text-gray-200">Forecast Accuracy</div>
              <div className="text-gray-500 dark:text-gray-400">AI-powered predictions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from real people across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-gray-100 dark:border-gray-600">
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t dark:border-gray-600 pt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Breathe Better?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of Indians who trust TarkVayu for their daily air quality information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
