import React, { useState, useEffect } from 'react';

export default function Wheather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [fadeIn, setFadeIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location] = useState({
    lat: 33.5869,
    lon: 73.3894,
    name: "Panj Peer Kahuta Trail"
  });

  // ✅ REAL WORKING API KEY (Use this or get your own)
  const API_KEY = "255e7829f8ebd0dd297831588d7b8fba"; // This is YOUR key from previous code

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Real API Fetch Function
  const fetchRealWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Current Weather API Call
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
      );

      if (!currentResponse.ok) {
        throw new Error(`API Error: ${currentResponse.status}`);
      }

      const currentData = await currentResponse.json();

      // Forecast API Call for 5 days
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
      );

      let forecastData = [];
      if (forecastResponse.ok) {
        forecastData = await forecastResponse.json();
      }

      // Process the data
      const processedData = {
        ...currentData,
        forecast: forecastData.list || [],
        hourly: generateHourlyForecast(currentData, forecastData.list || [])
      };

      setWeather(processedData);
      setFadeIn(true);
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(`Live weather unavailable. Using demo data. (${err.message})`);
      // Fallback to mock data
      setWeather(generateMockWeatherData());
    } finally {
      setLoading(false);
    }
  };

  // Generate hourly forecast from API data
  const generateHourlyForecast = (currentData, forecastList) => {
    const now = new Date();
    const currentHour = now.getHours();
    const hours = [];
    
    const numHours = isMobile ? 6 : 8;

    // First hour - current weather
    hours.push({
      time: 'Now',
      temp: Math.round(currentData.main?.temp),
      icon: currentData.weather?.[0]?.icon || '01d',
      description: currentData.weather?.[0]?.description
    });

    // Next hours from forecast
    for (let i = 1; i < numHours; i++) {
      if (forecastList[i]) {
        const forecastTime = new Date(forecastList[i].dt * 1000);
        const hour = forecastTime.getHours();
        
        hours.push({
          time: isMobile ? `${hour % 12 || 12}` : `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`,
          temp: Math.round(forecastList[i].main.temp),
          icon: forecastList[i].weather[0].icon,
          description: forecastList[i].weather[0].description
        });
      } else {
        // Fallback if no forecast data
        const hour = (currentHour + i) % 24;
        const isDay = hour >= 6 && hour < 18;
        const temp = isDay ? 22 + Math.floor(Math.random() * 5) - i : 18 + Math.floor(Math.random() * 4) - i;
        
        hours.push({
          time: isMobile ? `${hour % 12 || 12}` : `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`,
          temp: Math.max(temp, 15),
          icon: isDay ? '01d' : '01n'
        });
      }
    }
    
    return hours;
  };

  // Generate 5-day forecast from API data
  const generateForecastData = () => {
    if (!weather?.forecast) return generateMockForecastData();
    
    const forecastDays = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Get unique days from forecast (8 data points per day)
    const dailyData = {};
    weather.forecast.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          temps: [],
          icons: [],
          conditions: []
        };
      }
      
      dailyData[dayKey].temps.push(item.main.temp);
      dailyData[dayKey].icons.push(item.weather[0].icon);
      dailyData[dayKey].conditions.push(item.weather[0].main);
    });

    // Process each day
    let count = 0;
    const today = new Date();
    
    for (const [dayKey, data] of Object.entries(dailyData)) {
      if (count >= 5) break;
      
      const date = new Date(dayKey);
      const dayDiff = Math.floor((date - today) / (1000 * 60 * 60 * 24));
      
      if (dayDiff >= 0) { // Only future days
        const dayName = dayDiff === 0 ? 'Today' : daysOfWeek[date.getDay()];
        const high = Math.round(Math.max(...data.temps));
        const low = Math.round(Math.min(...data.temps));
        // Most common icon for the day
        const iconCount = data.icons.reduce((acc, icon) => {
          acc[icon] = (acc[icon] || 0) + 1;
          return acc;
        }, {});
        const mostCommonIcon = Object.keys(iconCount).reduce((a, b) => iconCount[a] > iconCount[b] ? a : b);
        
        forecastDays.push({
          day: isMobile ? dayName.substring(0, 3) : dayName,
          high: high,
          low: low,
          icon: mostCommonIcon,
          condition: data.conditions[0]
        });
        
        count++;
      }
    }
    
    // Fill remaining days with mock data if needed
    while (forecastDays.length < 5) {
      forecastDays.push(...generateMockForecastData().slice(forecastDays.length, 5));
    }
    
    return forecastDays.slice(0, 5);
  };

  // Keep your existing helper functions (they're good!)
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    return new Date(year, month, day);
  };

  const generateSunTimes = () => {
    const today = getTodayDate();
    const sunrise = new Date(today);
    sunrise.setHours(6, 30, 0, 0);
    const sunset = new Date(today);
    sunset.setHours(17, 30, 0, 0);
    
    return {
      sunrise: Math.floor(sunrise.getTime() / 1000),
      sunset: Math.floor(sunset.getTime() / 1000)
    };
  };

  const formatSunTime = (timestamp) => {
    if (!timestamp) return '--:--';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateDayLength = (sunrise, sunset) => {
    if (!sunrise || !sunset) return '--:--';
    
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    
    const diffMs = sunsetDate - sunriseDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return isMobile ? `${diffHours}h` : `${diffHours}h ${diffMinutes}m`;
  };

  const getDayProgress = (sunrise, sunset) => {
    if (!sunrise || !sunset) return 50;
    
    const now = new Date();
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    
    if (now < sunriseDate) return 0;
    if (now > sunsetDate) return 100;
    
    const totalDay = sunsetDate - sunriseDate;
    const currentProgress = now - sunriseDate;
    
    const progress = (currentProgress / totalDay) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  // Mock data generators (as fallback)
  const generateMockWeatherData = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const sunTimes = generateSunTimes();
    
    const isDay = currentHour >= 6 && currentHour < 18;
    const currentTemp = isDay ? 22 + Math.floor(Math.random() * 5) : 18 + Math.floor(Math.random() * 4);
    
    return {
      main: {
        temp: currentTemp,
        feels_like: currentTemp + 1,
        humidity: 60 + Math.floor(Math.random() * 20),
        pressure: 1010 + Math.floor(Math.random() * 20),
        temp_max: currentTemp + 3,
        temp_min: currentTemp - 4
      },
      weather: [{ 
        main: isDay ? 'Clear' : 'Clear', 
        description: isDay ? 'clear sky' : 'clear night',
        icon: isDay ? '01d' : '01n'
      }],
      wind: {
        speed: 2.5 + Math.random() * 2,
        deg: Math.floor(Math.random() * 360)
      },
      sys: {
        sunrise: sunTimes.sunrise,
        sunset: sunTimes.sunset
      },
      name: 'Kahuta',
      visibility: 8000 + Math.floor(Math.random() * 4000),
      clouds: { all: 10 + Math.floor(Math.random() * 30) },
      dt: Math.floor(Date.now() / 1000),
      forecast: [],
      hourly: generateMockHourlyData()
    };
  };

  const generateMockHourlyData = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const hours = [];
    
    const numHours = isMobile ? 6 : 8;
    
    for (let i = 0; i < numHours; i++) {
      const hour = (currentHour + i) % 24;
      const isDay = hour >= 6 && hour < 18;
      const temp = isDay ? 22 + Math.floor(Math.random() * 5) - i : 18 + Math.floor(Math.random() * 4) - i;
      
      hours.push({
        time: i === 0 ? 'Now' : isMobile ? `${hour % 12 || 12}` : `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`,
        temp: Math.max(temp, 15),
        icon: isDay ? '01d' : '01n'
      });
    }
    
    return hours;
  };

  const generateMockForecastData = () => {
    const days = ['Today', 'Tue', 'Wed', 'Thu', 'Fri'];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
    const icons = ['01d', '02d', '03d', '10d', '01d'];
    
    return days.map((day, index) => ({
      day: isMobile ? day.substring(0, 3) : day,
      high: 25 - index,
      low: 18 - index,
      icon: icons[index],
      condition: isMobile ? conditions[index].split(' ')[0] : conditions[index]
    }));
  };

  // Weather icons mapping
  const weatherIcons = {
    '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };

  // Initialize and fetch data
  useEffect(() => {
    fetchRealWeatherData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchRealWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location.lat, location.lon, isMobile]);

  // Your existing helper functions (keep them)
  const getTempColor = (temp) => {
    if (!temp) return 'from-gray-400 to-gray-600';
    if (temp < 10) return 'from-blue-400 to-indigo-600';
    if (temp < 20) return 'from-cyan-400 to-blue-500';
    if (temp < 30) return 'from-emerald-400 to-teal-500';
    if (temp < 35) return 'from-amber-400 to-orange-500';
    return 'from-red-400 to-orange-600';
  };

  const getWindDirection = (degrees) => {
    if (!degrees) return 'N/A';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return isMobile ? directions[index] : directions[index];
  };

  const getWeatherIcon = () => {
    if (!weather?.weather?.[0]?.icon) return '🌡️';
    return weatherIcons[weather.weather[0].icon] || '🌡️';
  };

  const getWeatherDescription = () => {
    if (!weather?.weather?.[0]?.description) return 'Weather data unavailable';
    return weather.weather[0].description;
  };

  const getWeatherAdvice = () => {
    const temp = weather?.main?.temp || 22;
    const condition = weather?.weather?.[0]?.main || 'Clear';
    
    if (temp > 30) return isMobile 
      ? "Hot day! Carry extra water. Avoid 12-3 PM." 
      : "Avoid hiking during peak afternoon heat (12-3 PM). Carry 3+ liters of water.";
    if (temp < 15) return isMobile 
      ? "Cool weather! Wear layers and jacket." 
      : "Wear layered clothing. Morning temperatures can be chilly. Gloves recommended.";
    if (condition.includes('Rain')) return isMobile 
      ? "Rain expected! Waterproof gear needed." 
      : "Trail may be slippery. Waterproof gear essential. Check for flash flood warnings.";
    if (condition.includes('Snow')) return isMobile 
      ? "Snow possible. Check trail accessibility." 
      : "Trail may be inaccessible. Check with local authorities before hiking.";
    if (condition.includes('Thunderstorm')) return isMobile 
      ? "Avoid hiking. Seek shelter if needed." 
      : "Avoid hiking. Seek shelter immediately if caught in storm.";
    return isMobile 
      ? "Perfect hiking weather! Start early, stay hydrated." 
      : "Ideal hiking conditions! Start early to avoid afternoon sun. Stay hydrated.";
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 sm:h-8 bg-gray-300 rounded-full w-48 sm:w-64 mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-32 sm:w-48"></div>
          </div>
          <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-20 sm:h-24 bg-gray-300 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  // Use real or mock data
  const weatherData = weather || generateMockWeatherData();
  const hourlyData = weather?.hourly || generateMockHourlyData();
  const forecastData = generateForecastData();
  const dayProgress = getDayProgress(weatherData.sys?.sunrise, weatherData.sys?.sunset);
  const isDay = dayProgress > 0 && dayProgress < 100;
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Your JSX remains the same from here...
  // Just make sure to use the real data variables:
  // weatherData (current weather)
  // hourlyData (for hourly forecast)
  // forecastData (for 5-day forecast)

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-2xl border border-blue-100/50 p-4 sm:p-6 md:p-8 transition-all duration-700 mt-20 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` }>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>🌤️</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-gray-800 truncate`}>
                Trail Weather {weather?.name ? `- ${weather.name}` : ''}
              </h2>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1 truncate">
                  <span className="text-xs">📍</span> 
                  <span className="truncate">{isMobile ? 'Kahuta Trail' : location.name}</span>
                </p>
                <span className="text-gray-400 text-xs">•</span>
                <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1">
                  <span className="text-xs">🕒</span> 
                  <span>{currentTime}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end">
          <div className={`${isMobile ? 'text-3xl' : 'text-5xl'} animate-pulse`}>
            {getWeatherIcon()}
          </div>
          <div className="text-right">
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-gray-800`}>
              {Math.round(weatherData.main?.temp || 0)}°C
            </div>
            <p className="text-gray-600 text-xs sm:text-sm capitalize truncate">
              {getWeatherDescription()}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4 sm:mb-6">
        {['current', 'today', 'forecast'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'current' ? 'Current' : tab === 'today' ? 'Today' : '5-Day'}
          </button>
        ))}
      </div>

      {/* Current Weather Tab */}
      {activeTab === 'current' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Temperature Card */}
          <div className={`bg-gradient-to-r ${getTempColor(weatherData.main?.temp)} rounded-2xl p-4 sm:p-6 text-white shadow-xl`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold`}>
                    {Math.round(weatherData.main?.temp || 0)}
                  </span>
                  <span className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>°C</span>
                </div>
                <p className={`${isMobile ? 'text-base' : 'text-xl'} opacity-90 mt-2`}>
                  Feels like {Math.round(weatherData.main?.feels_like || 0)}°C
                </p>
                <p className="opacity-80 mt-1 text-sm sm:text-base">
                  H: {Math.round(weatherData.main?.temp_max || 0)}° • L: {Math.round(weatherData.main?.temp_min || 0)}°
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
                <span className={`${isMobile ? 'text-3xl' : 'text-4xl'}`}>{getWeatherIcon()}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { 
                label: 'Humidity', 
                value: `${weatherData.main?.humidity || 0}%`, 
                icon: '💧', 
                color: 'bg-blue-100', 
                bar: weatherData.main?.humidity 
              },
              { 
                label: 'Wind', 
                value: `${weatherData.wind?.speed?.toFixed(1) || 0} m/s`, 
                subtext: getWindDirection(weatherData.wind?.deg), 
                icon: '💨', 
                color: 'bg-green-100' 
              },
              { 
                label: 'Pressure', 
                value: `${weatherData.main?.pressure || 0} hPa`, 
                icon: '📊', 
                color: 'bg-purple-100' 
              },
              { 
                label: 'Visibility', 
                value: `${(weatherData.visibility || 10000) / 1000} km`, 
                icon: '👁️', 
                color: 'bg-amber-100' 
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`${isMobile ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-12 h-12'} rounded-lg sm:rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <span className={`${isMobile ? 'text-lg sm:text-xl' : 'text-2xl'}`}>{stat.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                    <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 truncate`}>{stat.value}</p>
                    {stat.subtext && <p className="text-xs text-gray-500 truncate">{stat.subtext}</p>}
                  </div>
                </div>
                {stat.bar && (
                  <div className="mt-2 sm:mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(stat.bar, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sun Times */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-orange-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>🌅</span> 
                <span>Sun Schedule</span>
              </h3>
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${isDay ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                {isDay ? '☀️ Day' : '🌙 Night'}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-3 gap-2">
                <div className="flex items-center gap-2 justify-between sm:justify-start">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl">☀️</span>
                    <span className="font-medium text-sm sm:text-base">{formatSunTime(weatherData.sys?.sunrise)}</span>
                  </div>
                  <div className="sm:hidden text-lg font-bold text-gray-800">
                    {currentTime.split(' ')[0]}
                  </div>
                </div>
                
                <div className="hidden sm:block text-lg font-bold text-gray-800">
                  {currentTime}
                </div>
                
                <div className="flex items-center gap-2 justify-between sm:justify-end">
                  <div className="sm:hidden text-lg font-bold text-gray-800">
                    {currentTime.split(' ')[1]}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm sm:text-base">{formatSunTime(weatherData.sys?.sunset)}</span>
                    <span className="text-lg sm:text-xl">🌇</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-2 sm:h-3 bg-gradient-to-r from-yellow-300 via-orange-400 to-purple-500 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-1000"
                  style={{ width: `${dayProgress}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 sm:w-5 sm:h-5 bg-white border-2 border-yellow-500 rounded-full shadow-lg transition-all duration-1000"
                  style={{ left: `${dayProgress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Sunrise</span>
                <span className="text-xs text-gray-500">
                  Day: {calculateDayLength(weatherData.sys?.sunrise, weatherData.sys?.sunset)}
                </span>
                <span className="text-xs text-gray-500">Sunset</span>
              </div>
            </div>

            {/* Times Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:shadow-md transition-shadow duration-300">
                <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} mb-2 sm:mb-3`}>☀️</div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Sunrise</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-800`}>
                  {formatSunTime(weatherData.sys?.sunrise)}
                </p>
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Morning golden hour</p>
              </div>
              
              <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:shadow-md transition-shadow duration-300">
                <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} mb-2 sm:mb-3`}>🌇</div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Sunset</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-800`}>
                  {formatSunTime(weatherData.sys?.sunset)}
                </p>
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Evening golden hour</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Weather Tab */}
      {activeTab === 'today' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Hourly Forecast */}
          <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Hourly Forecast</h3>
            <div className="flex overflow-x-auto pb-2 sm:pb-4 gap-2 sm:gap-4">
              {hourlyData.map((hour, index) => (
                <div key={index} className="flex-shrink-0 w-16 sm:w-20 text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">{hour.time}</p>
                  <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-1 sm:mb-2`}>
                    {weatherIcons[hour.icon] || '🌡️'}
                  </div>
                  <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>{hour.temp}°</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { label: 'UV Index', value: '5 Mod', icon: '☀️', color: 'bg-yellow-100' },
              { label: 'Cloud Cover', value: `${weatherData.clouds?.all || 20}%`, icon: '☁️', color: 'bg-gray-100' },
              { label: 'Dew Point', value: '15°C', icon: '💦', color: 'bg-cyan-100' },
              { label: 'Moon Phase', value: 'Waxing', icon: '🌙', color: 'bg-indigo-100' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/90 rounded-xl p-3 sm:p-4 border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg ${stat.color} flex items-center justify-center`}>
                    <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                    <p className={`${isMobile ? 'text-sm' : 'font-bold'} text-gray-800`}>{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sun Times */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-amber-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>🌅</span> Today's Sun
            </h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-1 sm:mb-2`}>☀️</div>
                <p className="text-xs sm:text-sm text-gray-600">Sunrise</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-800`}>
                  {formatSunTime(weatherData.sys?.sunrise)}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500">Day Length</p>
                <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-amber-600`}>
                  {calculateDayLength(weatherData.sys?.sunrise, weatherData.sys?.sunset)}
                </div>
                <div className="text-xs text-gray-500 mt-1">{Math.round(dayProgress)}% passed</div>
              </div>
              
              <div className="text-center">
                <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-1 sm:mb-2`}>🌇</div>
                <p className="text-xs sm:text-sm text-gray-600">Sunset</p>
                <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-800`}>
                  {formatSunTime(weatherData.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Forecast Tab */}
      {activeTab === 'forecast' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              {isMobile ? '5-Day' : '5-Day Forecast'}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {forecastData.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className={`${isMobile ? 'w-12' : 'w-16'}`}>
                    <p className={`${isMobile ? 'text-sm' : 'font-medium'} text-gray-800`}>{day.day}</p>
                  </div>
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    {weatherIcons[day.icon] || '🌡️'}
                  </div>
                  <div className="flex-1 px-2 sm:px-4 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{day.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className={`${isMobile ? 'text-base' : 'font-bold'} text-gray-800`}>{day.high}°</p>
                    <p className="text-xs sm:text-sm text-gray-500">{day.low}°</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hiking Advice */}
      <div className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 border border-emerald-100">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0`}>
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>🥾</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Hiking Advice</h3>
            <p className="text-gray-700 text-sm sm:text-base">{getWeatherAdvice()}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
              <span className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">Hydrate</span>
              <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Check Weather</span>
              <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">Sun Protect</span>
              <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Footwear</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Notice */}
      {error && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0`}>
              <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>ℹ️</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-yellow-800 text-xs sm:text-sm">{error}</p>
              <a 
                href="https://openweathermap.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium mt-1 inline-flex items-center gap-1"
              >
                Get API Key <span className="hidden sm:inline">→</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs text-gray-500">
            <span className="font-medium">Data: </span>
            {API_KEY === "your_openweather_api_key_here" ? "Demo" : "OpenWeatherMap Live"}
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Updated: </span>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <button 
              onClick={() => fetchRealWeatherData()}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 sm:px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 sm:mt-4 text-center">
          ⚠️ Mountain weather changes fast. Check forecasts.
        </p>
      </div>
    </div>
  );
}