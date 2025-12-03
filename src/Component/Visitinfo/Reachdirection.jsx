import React, { useState } from "react";

export default function Reachdirection({
  destinationName = "Your Destination",
  destinationQuery = "Your+Destination+Address",
  embedPlace = "Your+Destination+Address",
}) {
  const gmapsBase = "https://www.google.com/maps";
  const [copiedFrom, setCopiedFrom] = useState(null);
  
  const directionsUrl = (origin) =>
    `${gmapsBase}/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
      destinationQuery
    )}&travelmode=driving`;

  const openInNewTab = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const handleCopy = async (url, from) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedFrom(from);
      setTimeout(() => setCopiedFrom(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedFrom(from);
      setTimeout(() => setCopiedFrom(null), 2000);
    }
  };

  // Custom SVG Icons
  const Icons = {
    Navigation: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    Map: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    Car: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3h18V7a2 2 0 00-2-2H5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10v8a2 2 0 002 2h14a2 2 0 002-2v-8H3z" />
      </svg>
    ),
    Globe: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    Copy: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    ),
    CheckCircle: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    ExternalLink: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    MapPin: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
            <Icons.Navigation />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          How to Reach <span className="text-blue-600">{destinationName}</span>
        </h1>
        <p className="mt-2 text-gray-500 text-lg">Find the best routes and directions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Directions */}
        <div className="space-y-6">
          {/* Main Map Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Icons.Map />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Interactive Map</h2>
                <p className="text-sm text-gray-500">Explore the area around {destinationName}</p>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title={`Map to ${destinationName}`}
                className="w-full h-72"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(embedPlace)}&output=embed&zoom=14`}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Icons.Globe />
              <span className="ml-2">View in full screen for detailed navigation</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => openInNewTab(directionsUrl("Islamabad, Pakistan"))}
              className="group p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Icons.Car />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">From Islamabad</h3>
                  <p className="text-xs text-gray-500 mt-1">~45 min drive • Most Popular</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => openInNewTab(directionsUrl("Kahuta, Pakistan"))}
              className="group p-4 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 text-left transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Icons.Navigation />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">From Kahuta</h3>
                  <p className="text-xs text-gray-500 mt-1">~30 min drive • Scenic Route</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column - Route Details */}
        <div className="space-y-6">
          {/* Route Cards */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Icons.MapPin />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Step-by-Step Directions</h2>
              </div>

              {/* Islamabad Route */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                    From Islamabad
                  </h3>
                  <span className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full border border-blue-100">
                    Recommended Route
                  </span>
                </div>
                
                <div className="space-y-4 ml-5 border-l-2 border-blue-100 pl-5">
                  {[
                    "Take Islamabad Expressway or GT Road toward Rawalpindi",
                    "Follow signs for M-2/Murree/Kahuta exit",
                    "Continue on highway and follow local signs to destination"
                  ].map((step, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold border-2 border-white">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pl-2">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openInNewTab(directionsUrl("Islamabad, Pakistan"))}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Icons.ExternalLink />
                    Open Google Maps
                  </button>
                  <button
                    onClick={() => handleCopy(directionsUrl("Islamabad, Pakistan"), "islamabad")}
                    className="px-4 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    {copiedFrom === "islamabad" ? (
                      <span className="flex items-center justify-center gap-2 text-green-600">
                        <Icons.CheckCircle />
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Icons.Copy />
                        Copy Link
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  From Kahuta
                </h3>
                
                <div className="space-y-4 ml-5 border-l-2 border-green-100 pl-5">
                  {[
                    "Head out of Kahuta toward main Kahuta–Islamabad road",
                    "Follow local highways and signage toward destination",
                    "Expect winding or hilly stretches — drive carefully"
                  ].map((step, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-8 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-bold border-2 border-white">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pl-2">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openInNewTab(directionsUrl("Kahuta, Pakistan"))}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Icons.ExternalLink />
                    Open Google Maps
                  </button>
                  <button
                    onClick={() => handleCopy(directionsUrl("Kahuta, Pakistan"), "kahuta")}
                    className="px-4 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    {copiedFrom === "kahuta" ? (
                      <span className="flex items-center justify-center gap-2 text-green-600">
                        <Icons.CheckCircle />
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Icons.Copy />
                        Copy Link
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tip Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Travel Tips & Accessibility</h4>
                  <p className="text-gray-600 mt-2">
                    • For public transport or ride-hailing, open Google Maps and switch travel mode<br/>
                    • Check live traffic conditions before departing<br/>
                    • Wheelchair accessible routes available in Google Maps<br/>
                    • Consider weather conditions in hilly areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}