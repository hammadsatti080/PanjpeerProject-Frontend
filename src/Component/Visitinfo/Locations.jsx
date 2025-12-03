import React, { useState, useEffect } from "react";

export default function Locations() {
  // Panj Peer Kahuta Trail - Exact Coordinates
  const coordinates = { 
    lat: 33.5869,  // Kahuta, Rawalpindi District
    lng: 73.3894
  };

  const [zoom, setZoom] = useState(15);
  const [isMobile, setIsMobile] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [directionText, setDirectionText] = useState("");
  const [tipTexts, setTipTexts] = useState(["", "", ""]);
  const [locationInfoText, setLocationInfoText] = useState("");

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Text animation sequences
  useEffect(() => {
    // Animate title
    const title = "PanjPeer Kahuta Trail";
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      if (titleIndex <= title.length) {
        setTitleText(title.substring(0, titleIndex));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        
        // Animate subtitle after title
        const subtitle = "Exact location and directions to the historic Panj Peer Kahuta hiking trail";
        let subtitleIndex = 0;
        const subtitleInterval = setInterval(() => {
          if (subtitleIndex <= subtitle.length) {
            setSubtitleText(subtitle.substring(0, subtitleIndex));
            subtitleIndex++;
          } else {
            clearInterval(subtitleInterval);
            
            // Animate location info
            const locationInfo = "Trail Information";
            let locationIndex = 0;
            const locationInterval = setInterval(() => {
              if (locationIndex <= locationInfo.length) {
                setLocationInfoText(locationInfo.substring(0, locationIndex));
                locationIndex++;
              } else {
                clearInterval(locationInterval);
              }
            }, 50);
          }
        }, 30);
      }
    }, 100);

    return () => {
      clearInterval(titleInterval);
    };
  }, []);

  // Animate direction title
  useEffect(() => {
    const directionTitle = "Get Directions";
    let directionIndex = 0;
    const directionInterval = setInterval(() => {
      if (directionIndex <= directionTitle.length) {
        setDirectionText(directionTitle.substring(0, directionIndex));
        directionIndex++;
      } else {
        clearInterval(directionInterval);
        
        // Animate tips one by one
        const tips = [
          "Best time to visit: Early morning or late afternoon",
          "Carry water and wear comfortable shoes",
          "Download offline maps before visiting"
        ];
        
        let tipIndex = 0;
        const tipIntervals = tips.map((tip, index) => {
          return setTimeout(() => {
            let charIndex = 0;
            const tipInterval = setInterval(() => {
              if (charIndex <= tip.length) {
                const newTips = [...tipTexts];
                newTips[index] = tip.substring(0, charIndex);
                setTipTexts(newTips);
                charIndex++;
              } else {
                clearInterval(tipInterval);
              }
            }, 30);
          }, index * 1000); // Stagger each tip by 1 second
        });
      }
    }, 80);

    return () => {
      clearInterval(directionInterval);
    };
  }, []);

  // Alternative: Basic Google Maps embed (no API key needed)
  const basicMapSrc = `https://www.google.com/maps?q=Panj+Peer+Kahuta+Trail,Kahuta,Rawalpindi,Pakistan&ll=${coordinates.lat},${coordinates.lng}&z=${zoom}&output=embed`;

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
    kahuta: "https://www.google.com/maps/dir/Kahuta,+Pakistan/Panj+Peer+Kahuta+Trail/"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with Typewriter Animation */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 animate-pulse">
          <span className="text-2xl sm:text-3xl">📍</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-2 h-14 lg:h-16">
          <span className="typewriter-text">
            {titleText}
            <span className="inline-block w-[2px] h-8 lg:h-10 bg-blue-500 ml-1 animate-blink"></span>
          </span>
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-lg px-2 min-h-[48px]">
          <span className="typewriter-subtitle">
            {subtitleText}
            <span className="inline-block w-[1px] h-5 bg-gray-400 ml-0.5 animate-blink"></span>
          </span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column - Additional Info */}
        <div className="lg:w-1/2">
          {/* Location Details Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6 animate-slideInLeft">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              <span className="flex items-center gap-2">
                <span>📍</span>
                <span className="typewriter-info">
                  {locationInfoText}
                  <span className="inline-block w-[2px] h-6 bg-blue-500 ml-0.5 animate-blink"></span>
                </span>
              </span>
            </h3>
            <div className="space-y-4">
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <p className="text-sm text-gray-500 mb-1">Coordinates</p>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-3 py-2 rounded-lg text-gray-800 font-mono text-sm animate-pulse-once">
                    {coordinates.lat}, {coordinates.lng}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:scale-110 transform duration-200"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-gray-800">Kahuta, Rawalpindi District, Pakistan</p>
              </div>
              <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <p className="text-sm text-gray-500 mb-1">Trail Type</p>
                <p className="text-gray-800">Mountain hiking trail</p>
              </div>
            </div>
          </div>

          {/* Quick Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg border border-blue-100 p-6 ">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              <span className="flex items-center gap-2">
                <span className="text-blue-500">💡</span>
                <span>Quick Tips</span>
              </span>
            </h3>
            <ul className="space-y-3">
                      <li>
                      Best time to visit: Early morning or late afternoon
                      </li>
                      <li>
                      Carry water and wear comfortable shoes
                      </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Map and Directions */}
        <div className="lg:w-2/3">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
            {/* Map Container */}
            <div className="lg:w-2/3 animate-slideInRight">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-full animate-pulse-once">
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
                  {/* Mobile Warning Overlay */}
                  {isMobile && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10 animate-fadeIn">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mx-4 shadow-lg max-w-sm animate-scaleIn">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center animate-bounce">
                            <span className="text-xl">📍</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">View Full Map</h3>
                            <p className="text-sm text-gray-600">Tap below to open in Google Maps</p>
                          </div>
                        </div>
                        <button
                          onClick={openGoogleMapsApp}
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 animate-pulse hover:animate-none"
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
                      className="w-full h-full animate-fadeIn"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  )}
                  
                  {/* Static Map Image for Mobile Preview */}
                  {isMobile && (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center animate-pulse">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center animate-spin-slow">
                          <span className="text-2xl">🗺️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Panj Peer Kahuta Trail</h3>
                        <p className="text-sm text-gray-600 mb-4">Tap button below to view full interactive map</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Map Overlay Info */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs animate-slideInUp">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="font-bold text-gray-800 truncate">📍 Panj Peer Kahuta Trail</p>
                    </div>
                    <p className="text-sm text-gray-600 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                      The trail starts from this point and extends into the hills.
                    </p>
                  </div>
                </div>
                
                {/* Mobile Action Buttons */}
                {isMobile && (
                  <div className="p-4 border-t border-gray-200 animate-slideInUp">
                    <div className="flex gap-2">
                      <button
                        onClick={openGoogleMapsApp}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-sm hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 animate-pulse"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Open Map
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`)}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 hover:scale-105 transform duration-200"
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
            </div>

            {/* Directions Panel */}
            <div className="lg:w-1/2 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl sm:rounded-2xl shadow-lg border border-orange-100 p-6 h-full animate-pulse-once">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      <span className="typewriter-direction">
                        {directionText}
                        <span className="inline-block w-[2px] h-6 bg-orange-500 ml-0.5 animate-blink"></span>
                      </span>
                    </h2>
                    <p className="text-gray-500 text-sm animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                      Quick navigation from major cities
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      key: "islamabad", 
                      label: "ISB", 
                      name: "Islamabad", 
                      time: "~2 hours", 
                      color: "blue",
                      distance: "65 km",
                      delay: 0.1
                    },
                    { 
                      key: "rawalpindi", 
                      label: "RWP", 
                      name: "Rawalpindi", 
                      time: "~2 hours", 
                      color: "green",
                      distance: "60 km",
                      delay: 0.2
                    },
                    { 
                      key: "kahuta", 
                      label: "KHT", 
                      name: "Kahuta City", 
                      time: "~35 min", 
                      color: "purple",
                      distance: "15 km",
                      delay: 0.3
                    }
                  ].map((city, index) => (
                    <a
                      key={city.key}
                      href={directionsLinks[city.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 animate-fadeInUp hover:scale-105 transform duration-300"
                      style={{ animationDelay: `${0.5 + city.delay}s` }}
                      onClick={(e) => {
                        if (isMobile) {
                          e.preventDefault();
                          window.open(directionsLinks[city.key], '_blank');
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${
                          city.color === 'blue' ? 'bg-blue-50' : 
                          city.color === 'green' ? 'bg-green-50' : 
                          'bg-purple-50'
                        } group-hover:${
                          city.color === 'blue' ? 'bg-blue-100' : 
                          city.color === 'green' ? 'bg-green-100' : 
                          'bg-purple-100'
                        } flex items-center justify-center flex-shrink-0 animate-pulse-once`}>
                          <span className={`${
                            city.color === 'blue' ? 'text-blue-600' : 
                            city.color === 'green' ? 'text-green-600' : 
                            'text-purple-600'
                          } font-bold text-base`}>
                            {city.label}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{city.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{city.time}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{city.distance}</span>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Additional Action Button */}
                <button
                  onClick={openGoogleMapsApp}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2 animate-pulse hover:animate-none hover:scale-105 transform duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open Live Navigation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulseOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }
        
        .animate-pulse-once {
          animation: pulseOnce 2s ease-in-out;
        }
        
        .typewriter-text {
          border-right: 2px solid transparent;
        }
        
        .typewriter-subtitle {
          border-right: 1px solid transparent;
        }
        
        .typewriter-info {
          border-right: 2px solid transparent;
        }
        
        .typewriter-direction {
          border-right: 2px solid transparent;
        }
      `}</style>
    </div>
  );
}