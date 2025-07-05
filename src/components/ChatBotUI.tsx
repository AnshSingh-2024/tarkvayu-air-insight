
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User, MapPin, TrendingUp } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "aqi" | "suggestion";
}

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Vayu, your AI air quality assistant. I can help you with:\n\n• Current AQI information\n• Health recommendations\n• Pollution explanations\n• Location-specific advice\n\nHow can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock responses based on user input
  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let type: "text" | "aqi" | "suggestion" = "text";

    if (lowerMessage.includes("aqi") || lowerMessage.includes("air quality")) {
      response = "The current AQI in Delhi is 156 (Unhealthy). This means:\n\n• Sensitive groups should limit outdoor activities\n• Everyone should reduce prolonged outdoor exertion\n• Consider wearing a mask when going outside\n• Keep windows closed during peak hours\n\nWould you like me to explain what causes this pollution level?";
      type = "aqi";
    } else if (lowerMessage.includes("health") || lowerMessage.includes("recommend")) {
      response = "Based on the current air quality (AQI 156), here are my health recommendations:\n\n🏃‍♂️ Exercise: Move workouts indoors\n😷 Protection: Wear N95 masks outdoors\n👶 Children: Limit outdoor play time\n🏠 Home: Use air purifiers if available\n🪟 Windows: Keep closed during high pollution\n\nAny specific health concerns I can address?";
    } else if (lowerMessage.includes("pollution") || lowerMessage.includes("cause")) {
      response = "Current pollution in Delhi is mainly caused by:\n\n🚗 Vehicle emissions (30%)\n🏭 Industrial sources (25%)\n🔥 Crop burning in nearby states (20%)\n🏗️ Construction dust (15%)\n🌡️ Weather conditions (10%)\n\nWind patterns and temperature inversions are trapping pollutants close to ground level.";
    } else if (lowerMessage.includes("forecast") || lowerMessage.includes("tomorrow")) {
      response = "Tomorrow's AQI forecast for Delhi:\n\n🌅 Morning: 145 (Unhealthy for Sensitive)\n☀️ Afternoon: 132 (Unhealthy for Sensitive) \n🌆 Evening: 168 (Unhealthy)\n\nBest time for outdoor activities: 2-4 PM\nWorst time: 7-9 PM\n\nWould you like a 3-day forecast?";
      type = "suggestion";
    } else if (lowerMessage.includes("mask") || lowerMessage.includes("protection")) {
      response = "For current AQI levels, I recommend:\n\n😷 N95 masks for outdoor activities\n🚫 Cloth masks are not sufficient\n⏱️ Limit outdoor exposure to 30 minutes\n🏃‍♂️ Avoid exercising outdoors\n\nN95 masks filter 95% of particles. Make sure it fits snugly around your nose and mouth.";
    } else if (lowerMessage.includes("location") || lowerMessage.includes("area")) {
      response = "I can provide air quality information for any location in India. Popular areas:\n\n📍 Delhi NCR: Currently Unhealthy (156)\n📍 Mumbai: Moderate (89)\n📍 Bangalore: Moderate (65)\n📍 Chennai: Moderate (78)\n\nJust tell me your city or pin code for specific data!";
    } else {
      response = "I'm here to help with air quality questions! You can ask me about:\n\n• Current AQI levels\n• Health recommendations\n• Pollution causes\n• Weather forecasts\n• Protection measures\n• Location-specific data\n\nWhat would you like to know?";
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: "bot",
      timestamp: new Date(),
      type
    };
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Current AQI", icon: <TrendingUp className="h-4 w-4" /> },
    { text: "Health tips", icon: <User className="h-4 w-4" /> },
    { text: "My location", icon: <MapPin className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Chat Bubble Button - Right Side */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg z-50 flex items-center justify-center transform -translate-y-1/2"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window - Right Side Panel */}
      {isOpen && (
        <Card className="fixed top-16 right-6 bottom-6 w-80 shadow-2xl z-50 flex flex-col bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Vayu AI Assistant</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </div>
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputMessage(action.text);
                      handleSendMessage();
                    }}
                    className="flex items-center space-x-1 text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t dark:border-gray-600">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about air quality..."
                className="flex-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || inputMessage.trim() === ""}
                size="icon"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBotUI;
