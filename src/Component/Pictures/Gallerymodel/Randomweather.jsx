import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "255e7829f8ebd0dd297831588d7b8fba";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function Randomweather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState("Rawalpindi");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getWeatherByCity(currentCity);
  }, []);

  const normalizeCityName = (city) => {
    const normalized = city.toLowerCase().trim();
    
    if (normalized.includes("narh")) {
      if (normalized.includes("panjpeer") || normalized.includes("panj-peer")) {
        return "Narh Panjpeer";
      }
      return "Narh";
    }
    return city.trim();
  };

  const getCoordinatesForCity = async (city) => {
    const normalizedCity = normalizeCityName(city);
    
    const cityCoordinates = {
      "narh": { lat: 33.65, lon: 73.20 },
      "narh panjpeer": { lat: 33.65, lon: 73.20 },
      "rawalpindi": { lat: 33.5651, lon: 73.0169 }
    };

    const key = normalizedCity.toLowerCase();
    
    if (cityCoordinates[key]) {
      return cityCoordinates[key];
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${encodeURIComponent(normalizedCity)}&appid=${API_KEY}`
      );
      return {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      };
    } catch (error) {
      throw new Error("City not found");
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      if (!city.trim()) {
        setError("Please enter a city name");
        return;
      }

      setIsLoading(true);
      setError(null);
      
      const normalizedCity = normalizeCityName(city);
      
      if (normalizedCity.toLowerCase().includes("narh")) {
        const coords = await getCoordinatesForCity(normalizedCity);
        
        const response = await axios.get(
          `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
        );
        
        setCurrentWeather(response.data);
        setCurrentCity(normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1));
      } else {
        const response = await axios.get(
          `${BASE_URL}/weather?q=${encodeURIComponent(normalizedCity)}&appid=${API_KEY}&units=metric`
        );
        setCurrentWeather(response.data);
        setCurrentCity(response.data.name);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Failed to load weather data. Please check the city name.");
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (code) => {
    const base = code.substring(0, 2);
    const map = {
      "01": "☀️",
      "02": "⛅",
      "03": "☁️",
      "04": "☁️",
      "09": "🌧️",
      "10": "🌦️",
      "11": "⛈️",
      "13": "❄️",
      "50": "🌫️",
    };
    return map[base] || "🌤️";
  };

  const formatDate = (date) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      getWeatherByCity(searchText);
      setSearchText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      getWeatherByCity(searchText);
      setSearchText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 font-sans pb-10">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-b-2xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Weather App</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              placeholder="Search city (e.g., Narh, Narh Panjpeer)..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : "Search"}
            </button>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {isLoading && !currentWeather && (
        <div className="text-center mt-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <h3 className="text-blue-600 text-xl font-medium">Loading weather data...</h3>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => getWeatherByCity(currentCity)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Weather Display */}
      {currentWeather && !isLoading && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Main Weather Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 mt-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">{currentCity}</h2>
                <p className="text-blue-100 text-lg mt-1">{formatDate(new Date())}</p>
              </div>
              <div className="text-6xl md:text-7xl mt-4 sm:mt-0">
                {getWeatherIcon(currentWeather.weather[0].icon)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold">
                  {currentWeather.main.temp.toFixed(0)}°C
                </h1>
                <p className="text-blue-100 text-xl mt-2 capitalize">
                  {currentWeather.weather[0].description}
                </p>
              </div>

              <div className="mt-6 sm:mt-0 sm:text-right">
                <p className="text-blue-100 text-lg">Feels like</p>
                <h3 className="text-3xl md:text-4xl font-bold">
                  {currentWeather.main.feels_like.toFixed(0)}°C
                </h3>
              </div>
            </div>
          </div>

          {/* Weather Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              {
                title: "Humidity",
                value: `${currentWeather.main.humidity}%`,
                icon: "💧",
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                title: "Wind Speed",
                value: `${currentWeather.wind.speed} m/s`,
                icon: "💨",
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
              {
                title: "Pressure",
                value: `${currentWeather.main.pressure} hPa`,
                icon: "📊",
                color: "text-purple-600",
                bgColor: "bg-purple-50",
              },
              {
                title: "Visibility",
                value: `${(currentWeather.visibility / 1000).toFixed(1)} km`,
                icon: "👁️",
                color: "text-amber-600",
                bgColor: "bg-amber-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.bgColor} rounded-xl p-5 shadow-md border border-gray-100`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-gray-600 text-sm font-medium">{item.title}</h4>
                    <h2 className={`${item.color} text-2xl md:text-3xl font-bold mt-2`}>
                      {item.value}
                    </h2>
                  </div>
                  <span className="text-3xl">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Weather Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌡️</div>
                <div>
                  <h4 className="text-gray-600 text-sm font-medium">Temperature Range</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div>
                      <span className="text-blue-500 text-sm">Min</span>
                      <p className="text-lg font-bold">{currentWeather.main.temp_min.toFixed(0)}°C</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div>
                      <span className="text-red-500 text-sm">Max</span>
                      <p className="text-lg font-bold">{currentWeather.main.temp_max.toFixed(0)}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌅</div>
                <div className="flex-1">
                  <h4 className="text-gray-600 text-sm font-medium">Sunrise & Sunset</h4>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-orange-500 font-bold">
                        {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-gray-500 text-xs">Sunrise</p>
                    </div>
                    <div>
                      <p className="text-purple-500 font-bold">
                        {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-gray-500 text-xs">Sunset</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4 font-medium">Quick access cities:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Narh", "Narh Panjpeer", "Rawalpindi", "Islamabad", "Lahore"].map((city) => (
                <button
                  key={city}
                  onClick={() => getWeatherByCity(city)}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition duration-200 ${
                    currentCity === city
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Data provided by OpenWeatherMap • Updated just now</p>
            <p className="mt-1">Location: {currentWeather.coord.lat.toFixed(2)}°N, {currentWeather.coord.lon.toFixed(2)}°E</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentWeather && !isLoading && !error && (
        <div className="text-center mt-12 max-w-4xl mx-auto px-4">
          <div className="text-6xl mb-4">🌤️</div>
          <h3 className="text-2xl text-gray-700 font-medium mb-2">Welcome to Weather App</h3>
          <p className="text-gray-500">Search for a city to see its weather information</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Narh", "Narh Panjpeer", "Rawalpindi", "Islamabad"].map((city) => (
              <button
                key={city}
                onClick={() => getWeatherByCity(city)}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100"
              >
                <div className="text-3xl mb-2">🌡️</div>
                <p className="font-medium text-gray-700">{city}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}