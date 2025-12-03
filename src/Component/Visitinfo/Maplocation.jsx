import React, { useState, useEffect } from "react";

export default function MapLocation() {
  // Panj Peer Kahuta Trail - Exact Coordinates
  const coordinates = { 
    lat: 33.5869,  // Kahuta, Rawalpindi District
    lng: 73.3894
  };

  const [mapType, setMapType] = useState("roadmap");
  const [zoom, setZoom] = useState(15);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Alternative: Basic Google Maps embed (no API key needed)
  const basicMapSrc = `https://www.google.com/maps?q=Panj+Peer+Kahuta+Trail,Kahuta,Rawalpindi,Pakistan&ll=${coordinates.lat},${coordinates.lng}&z=${zoom}&output=embed`;

  // Open Google Maps in new tab
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  // Open Google Maps app on mobile
  const openGoogleMapsApp = () => {
    const url = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    
    // Try to open in Google Maps app first
    const googleMapsAppUrl = `comgooglemaps://?q=${coordinates.lat},${coordinates.lng}`;
    const appleMapsUrl = `maps://?q=${coordinates.lat},${coordinates.lng}`;
    
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Try Apple Maps
      window.location.href = appleMapsUrl;
      setTimeout(() => {
        // Fallback to web if app not installed
        window.location.href = url;
      }, 500);
    } else if (/Android/i.test(navigator.userAgent)) {
      // Try Google Maps app
      window.location.href = googleMapsAppUrl;
      setTimeout(() => {
        // Fallback to web if app not installed
        window.location.href = url;
      }, 500);
    } else {
      // Desktop - open in new tab
      window.open(url, '_blank');
    }
  };

  // Directions links - Use full URLs for mobile compatibility
  const directionsLinks = {
    islamabad: "https://www.google.com/maps/dir/Islamabad,+Pakistan/Panj+Peer+Kahuta+Trail,Kahuta,Rawalpindi/",
    rawalpindi: "https://www.google.com/maps/dir/Rawalpindi,+Pakistan/Panj+Peer+Kahuta+Trail,Kahuta/",
    lahore: "https://www.google.com/maps/dir/Lahore,+Pakistan/Panj+Peer+Kahuta+Trail,Kahuta,Rawalpindi/",
    kahuta: "https://www.google.com/maps/dir/Kahuta,+Pakistan/Panj+Peer+Kahuta+Trail/"
  };

  const nearbyLandmarks = [
    { name: "Kahuta City Center", distance: "20 km", direction: "West" },
    { name: "Islamabad International Airport", distance: "45 km", direction: "Northwest" },
    { name: "Rawalpindi", distance: "40 km", direction: "North" },
    { name: "Murree Hills", distance: "65 km", direction: "Northeast" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl">📍</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-2">
          Panj Peer Kahuta Trail Location
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-lg px-2">
          Exact location and directions to the historic Panj Peer Kahuta hiking trail
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Map Controls & Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Location Details Card */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Exact Coordinates</h2>
                <p className="text-gray-500 text-xs sm:text-sm">GPS Location for Navigation</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Latitude</p>
                <p className="text-base sm:text-lg font-mono font-bold text-blue-600">33.5869° N</p>
              </div>
              <div className="bg-cyan-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Longitude</p>
                <p className="text-base sm:text-lg font-mono font-bold text-cyan-600">73.3894° E</p>
              </div>
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Altitude</p>
                <p className="text-base sm:text-lg font-mono font-bold text-green-600">~850 meters</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
              <button
                onClick={() => navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`)}
                className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-1 sm:gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span className="text-sm sm:text-base">Copy Coordinates</span>
              </button>
              
              {/* Mobile Friendly Map Button */}
              <button
                onClick={openGoogleMapsApp}
                className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-1 sm:gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-sm sm:text-base">Open in Maps</span>
              </button>
            </div>
          </div>

          {/* Map Controls */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Map Controls</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Map Type</label>
                <div className="flex gap-2">
                  {["roadmap", "satellite", "terrain"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setMapType(type)}
                      className={`flex-1 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        mapType === type
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Zoom Level: {zoom}x
                </label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setZoom(Math.max(10, zoom - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <span className="text-lg sm:text-xl">-</span>
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="10"
                      max="20"
                      value={zoom}
                      onChange={(e) => setZoom(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => setZoom(Math.min(20, zoom + 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <span className="text-lg sm:text-xl">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Landmarks */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl sm:rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Nearby Landmarks</h2>
                <p className="text-gray-500 text-xs sm:text-sm">Distance from Panj Peer Trail</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {nearbyLandmarks.map((landmark, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{landmark.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{landmark.direction} • {landmark.distance}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs sm:text-sm font-medium ml-2">
                    {landmark.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Main Map */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Main Map Container */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
              {/* Mobile Warning Overlay */}
              {isMobile && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mx-4 shadow-lg max-w-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xl">📍</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">View Full Map</h3>
                        <p className="text-sm text-gray-600">Tap below to open in Google Maps</p>
                      </div>
                    </div>
                    <button
                      onClick={openGoogleMapsApp}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Open in Google Maps
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Interactive map not available in preview. Click above to view full map.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Iframe for Desktop */}
              {!isMobile && (
                <iframe
                  title="Panj Peer Kahuta Trail Location"
                  src={basicMapSrc}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
              
              {/* Static Map Image for Mobile Preview */}
              {isMobile && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-2xl">🗺️</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Panj Peer Kahuta Trail</h3>
                    <p className="text-sm text-gray-600 mb-4">Tap button below to view full interactive map</p>
                  </div>
                </div>
              )}
              
              {/* Map Overlay Info */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg max-w-[85%] sm:max-w-xs">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="font-bold text-gray-800 text-sm sm:text-base truncate">📍 Panj Peer Kahuta Trail</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  The trail starts from this point and extends into the hills.
                </p>
              </div>
            </div>
            
            {/* Mobile Action Buttons */}
            {isMobile && (
              <div className="p-3 sm:p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={openGoogleMapsApp}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-sm hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Open Map
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`)}
                    className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Directions Panel */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl sm:rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Get Directions</h2>
                <p className="text-gray-500 text-xs sm:text-sm">Quick navigation from major cities</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { key: "islamabad", label: "ISB", name: "From Islamabad", time: "~2 hour drive", color: "blue" },
                { key: "rawalpindi", label: "RWP", name: "From Rawalpindi", time: "~2 hour drive", color: "green" },
                { key: "lahore", label: "LHR", name: "From Lahore", time: "~6 hour drive", color: "yellow" },
                { key: "kahuta", label: "KHT", name: "From Kahuta City", time: "~30-35 minutes", color: "purple" }
              ].map((city) => (
                <a
                  key={city.key}
                  href={directionsLinks[city.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 active:scale-95"
                  onClick={(e) => {
                    if (isMobile) {
                      // For mobile, ensure it opens properly
                      e.preventDefault();
                      window.open(directionsLinks[city.key], '_blank');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${city.color === 'blue' ? 'bg-blue-50' : city.color === 'green' ? 'bg-green-50' : city.color === 'yellow' ? 'bg-yellow-50' : 'bg-purple-50'} group-hover:${city.color === 'blue' ? 'bg-blue-100' : city.color === 'green' ? 'bg-green-100' : city.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'} flex items-center justify-center flex-shrink-0`}>
                      <span className={`${city.color === 'blue' ? 'text-blue-600' : city.color === 'green' ? 'text-green-600' : city.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'} font-bold text-sm sm:text-base`}>{city.label}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{city.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{city.time}</p>
                    </div>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-auto group-hover:text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Travel Tips */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-blue-600 text-lg sm:text-xl">💡</span>
                <div>
                  <p className="font-medium text-blue-800 text-sm sm:text-base">Travel Tip</p>
                  <p className="text-xs sm:text-sm text-blue-600">
                    The last 5km is a narrow mountain road. 4x4 vehicles are recommended during rainy season.
                    Mobile network may be limited in some areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 px-2">
        <p>
          Coordinates: 33.5869° N, 73.3894° E • Panj Peer Kahuta Trail, Kahuta Tehsil, Rawalpindi District, Punjab, Pakistan
        </p>
        <p className="mt-1">
          Always inform someone about your hiking plans and carry emergency supplies.
        </p>
      </div>

     
    </div>
  );
}