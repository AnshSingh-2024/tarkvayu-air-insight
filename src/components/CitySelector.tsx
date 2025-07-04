
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Search, X } from "lucide-react";

interface City {
  name: string;
  state: string;
  population?: string;
  type: "metro" | "tier1" | "tier2" | "tier3";
}

const cities: City[] = [
  // Metro Cities
  { name: "Delhi", state: "Delhi", population: "3.2 Cr", type: "metro" },
  { name: "Mumbai", state: "Maharashtra", population: "2.0 Cr", type: "metro" },
  { name: "Bangalore", state: "Karnataka", population: "1.3 Cr", type: "metro" },
  { name: "Chennai", state: "Tamil Nadu", population: "1.1 Cr", type: "metro" },
  { name: "Kolkata", state: "West Bengal", population: "1.5 Cr", type: "metro" },
  { name: "Hyderabad", state: "Telangana", population: "1.0 Cr", type: "metro" },
  
  // Tier 1 Cities
  { name: "Pune", state: "Maharashtra", population: "74 L", type: "tier1" },
  { name: "Ahmedabad", state: "Gujarat", population: "82 L", type: "tier1" },
  { name: "Jaipur", state: "Rajasthan", population: "35 L", type: "tier1" },
  { name: "Surat", state: "Gujarat", population: "61 L", type: "tier1" },
  { name: "Lucknow", state: "Uttar Pradesh", population: "35 L", type: "tier1" },
  { name: "Kanpur", state: "Uttar Pradesh", population: "32 L", type: "tier1" },
  { name: "Nagpur", state: "Maharashtra", population: "25 L", type: "tier1" },
  { name: "Patna", state: "Bihar", population: "23 L", type: "tier1" },
  { name: "Indore", state: "Madhya Pradesh", population: "35 L", type: "tier1" },
  { name: "Thane", state: "Maharashtra", population: "19 L", type: "tier1" },
  { name: "Bhopal", state: "Madhya Pradesh", population: "23 L", type: "tier1" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", population: "20 L", type: "tier1" },
  { name: "Vadodara", state: "Gujarat", population: "22 L", type: "tier1" },
  { name: "Firozabad", state: "Uttar Pradesh", population: "6 L", type: "tier1" },
  
  // Tier 2 Cities
  { name: "Varanasi", state: "Uttar Pradesh", population: "14 L", type: "tier2" },
  { name: "Agra", state: "Uttar Pradesh", population: "18 L", type: "tier2" },
  { name: "Meerut", state: "Uttar Pradesh", population: "15 L", type: "tier2" },
  { name: "Rajkot", state: "Gujarat", population: "15 L", type: "tier2" },
  { name: "Kalyan-Dombivali", state: "Maharashtra", population: "15 L", type: "tier2" },
  { name: "Vasai-Virar", state: "Maharashtra", population: "13 L", type: "tier2" },
  { name: "Nashik", state: "Maharashtra", population: "15 L", type: "tier2" },
  { name: "Faridabad", state: "Haryana", population: "14 L", type: "tier2" },
  { name: "Ghaziabad", state: "Uttar Pradesh", population: "17 L", type: "tier2" },
  { name: "Ludhiana", state: "Punjab", population: "17 L", type: "tier2" },
  { name: "Kochi", state: "Kerala", population: "6 L", type: "tier2" },
  { name: "Coimbatore", state: "Tamil Nadu", population: "11 L", type: "tier2" },
  { name: "Madurai", state: "Tamil Nadu", population: "10 L", type: "tier2" },
  { name: "Jabalpur", state: "Madhya Pradesh", population: "12 L", type: "tier2" },
  { name: "Jamshedpur", state: "Jharkhand", population: "6 L", type: "tier2" },
  { name: "Bhilai", state: "Chhattisgarh", population: "11 L", type: "tier2" },
  { name: "Cuttack", state: "Odisha", population: "6 L", type: "tier2" },
  { name: "Jodhpur", state: "Rajasthan", population: "11 L", type: "tier2" },
  { name: "Amritsar", state: "Punjab", population: "11 L", type: "tier2" },
  { name: "Raipur", state: "Chhattisgarh", population: "11 L", type: "tier2" },
  
  // Tier 3 Cities & Towns
  { name: "Jaunpur", state: "Uttar Pradesh", population: "2 L", type: "tier3" },
  { name: "Jhansi", state: "Uttar Pradesh", population: "5 L", type: "tier3" },
  { name: "Siliguri", state: "West Bengal", population: "7 L", type: "tier3" },
  { name: "Aligarh", state: "Uttar Pradesh", population: "9 L", type: "tier3" },
  { name: "Allahabad", state: "Uttar Pradesh", population: "12 L", type: "tier3" },
  { name: "Bareilly", state: "Uttar Pradesh", population: "9 L", type: "tier3" },
  { name: "Moradabad", state: "Uttar Pradesh", population: "9 L", type: "tier3" },
  { name: "Mysore", state: "Karnataka", population: "9 L", type: "tier3" },
  { name: "Salem", state: "Tamil Nadu", population: "8 L", type: "tier3" },
  { name: "Bhiwandi", state: "Maharashtra", population: "7 L", type: "tier3" },
  { name: "Saharanpur", state: "Uttar Pradesh", population: "7 L", type: "tier3" },
  { name: "Gorakhpur", state: "Uttar Pradesh", population: "7 L", type: "tier3" },
  { name: "Bikaner", state: "Rajasthan", population: "6 L", type: "tier3" },
  { name: "Amravati", state: "Maharashtra", population: "6 L", type: "tier3" },
  { name: "Noida", state: "Uttar Pradesh", population: "6 L", type: "tier3" },
  { name: "Jalgaon", state: "Maharashtra", population: "5 L", type: "tier3" },
  { name: "Nanded", state: "Maharashtra", population: "5 L", type: "tier3" },
  { name: "Dehradun", state: "Uttarakhand", population: "6 L", type: "tier3" },
  { name: "Durgapur", state: "West Bengal", population: "6 L", type: "tier3" },
  { name: "Asansol", state: "West Bengal", population: "12 L", type: "tier3" },
  { name: "Rourkela", state: "Odisha", population: "5 L", type: "tier3" },
  { name: "Nellore", state: "Andhra Pradesh", population: "5 L", type: "tier3" },
  { name: "Kurnool", state: "Andhra Pradesh", population: "5 L", type: "tier3" },
  { name: "Rajamahendravaram", state: "Andhra Pradesh", population: "3 L", type: "tier3" },
  { name: "Bokaro", state: "Jharkhand", population: "5 L", type: "tier3" },
  { name: "South Dumdum", state: "West Bengal", population: "4 L", type: "tier3" },
  { name: "Bellary", state: "Karnataka", population: "4 L", type: "tier3" },
  { name: "Patiala", state: "Punjab", population: "4 L", type: "tier3" },
  { name: "Gopalpur", state: "West Bengal", population: "3 L", type: "tier3" },
  { name: "Agartala", state: "Tripura", population: "4 L", type: "tier3" },
  { name: "Bhagalpur", state: "Bihar", population: "4 L", type: "tier3" },
  { name: "Muzaffarnagar", state: "Uttar Pradesh", population: "4 L", type: "tier3" },
  { name: "Bhatpara", state: "West Bengal", population: "4 L", type: "tier3" },
  { name: "Panihati", state: "West Bengal", population: "4 L", type: "tier3" },
  { name: "Latur", state: "Maharashtra", population: "4 L", type: "tier3" },
  { name: "Dhule", state: "Maharashtra", population: "4 L", type: "tier3" },
  { name: "Tirunelveli", state: "Tamil Nadu", population: "5 L", type: "tier3" },
  { name: "Korba", state: "Chhattisgarh", population: "4 L", type: "tier3" },
  { name: "Bhilwara", state: "Rajasthan", population: "4 L", type: "tier3" },
  { name: "Berhampur", state: "Odisha", population: "4 L", type: "tier3" },
  { name: "Muzaffarpur", state: "Bihar", population: "4 L", type: "tier3" },
  { name: "Ahmednagar", state: "Maharashtra", population: "3 L", type: "tier3" },
  { name: "Mathura", state: "Uttar Pradesh", population: "4 L", type: "tier3" },
  { name: "Kollam", state: "Kerala", population: "3 L", type: "tier3" },
  { name: "Avadi", state: "Tamil Nadu", population: "3 L", type: "tier3" },
  { name: "Kadapa", state: "Andhra Pradesh", population: "3 L", type: "tier3" },
  { name: "Kamarhati", state: "West Bengal", population: "3 L", type: "tier3" },
  { name: "Sambalpur", state: "Odisha", population: "3 L", type: "tier3" },
  { name: "Bilaspur", state: "Chhattisgarh", population: "3 L", type: "tier3" },
  { name: "Shahjahanpur", state: "Uttar Pradesh", population: "3 L", type: "tier3" },
  { name: "Satara", state: "Maharashtra", population: "3 L", type: "tier3" },
  { name: "Bijapur", state: "Karnataka", population: "3 L", type: "tier3" },
  { name: "Rampur", state: "Uttar Pradesh", population: "3 L", type: "tier3" },
  { name: "Shivamogga", state: "Karnataka", population: "3 L", type: "tier3" },
  { name: "Chandrapur", state: "Maharashtra", population: "3 L", type: "tier3" },
  { name: "Junagadh", state: "Gujarat", population: "3 L", type: "tier3" },
  { name: "Thrissur", state: "Kerala", population: "3 L", type: "tier3" },
  { name: "Alwar", state: "Rajasthan", population: "3 L", type: "tier3" },
  { name: "Bardhaman", state: "West Bengal", population: "3 L", type: "tier3" },
  { name: "Kulti", state: "West Bengal", population: "3 L", type: "tier3" },
  { name: "Kakinada", state: "Andhra Pradesh", population: "3 L", type: "tier3" },
  { name: "Nizamabad", state: "Telangana", population: "3 L", type: "tier3" },
  { name: "Parbhani", state: "Maharashtra", population: "3 L", type: "tier3" },
  { name: "Tumkur", state: "Karnataka", population: "3 L", type: "tier3" },
  { name: "Khammam", state: "Telangana", population: "2 L", type: "tier3" },
  { name: "Ozhukarai", state: "Puducherry", population: "2 L", type: "tier3" },
  { name: "Bihar Sharif", state: "Bihar", population: "3 L", type: "tier3" },
  { name: "Panipat", state: "Haryana", population: "3 L", type: "tier3" },
  { name: "Darbhanga", state: "Bihar", population: "3 L", type: "tier3" },
  { name: "Bally", state: "West Bengal", population: "3 L", type: "tier3" },
  { name: "Aizawl", state: "Mizoram", population: "3 L", type: "tier3" },
  { name: "Dewas", state: "Madhya Pradesh", population: "3 L", type: "tier3" },
];

interface CitySelectorProps {
  onSelectCity: (city: City) => void;
  selectedCity?: City;
}

const CitySelector = ({ onSelectCity, selectedCity }: CitySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCity = (city: City) => {
    onSelectCity(city);
    setIsOpen(false);
    setSearchTerm("");
  };

  const getCityTypeColor = (type: string) => {
    switch (type) {
      case "metro": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "tier1": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "tier2": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "tier3": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between dark:border-gray-600"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm">
            {selectedCity ? `${selectedCity.name}, ${selectedCity.state}` : "Select City"}
          </span>
        </div>
        <X className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="p-4 border-b dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <ScrollArea className="h-80">
              <div className="p-2">
                {filteredCities.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No cities found</p>
                ) : (
                  filteredCities.map((city, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectCity(city)}
                      className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{city.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{city.state}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {city.population && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {city.population}
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCityTypeColor(city.type)}`}>
                          {city.type.charAt(0).toUpperCase() + city.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CitySelector;
