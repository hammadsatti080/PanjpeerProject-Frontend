import React, { useState } from 'react';

const Snowfall = () => {
  // Snowfall images data
  const snowfallImages = [
    {
      id: 1,
      image: "/About/Snowfall.jpg",
      title: "Winter Wonderland",
      description: "Beautiful snowfall covering pine trees and creating a magical winter landscape.",
      location: "Panjpeer",
      temperature: "-5°C",
      snowfall: "Heavy"
    },
    {
      id: 2,
      image: "/About/Snowfall.jpg",
      title: "Snowy Mountain Peak",
      description: "Majestic mountain peak covered in fresh snow under clear blue skies.",
      location: "Panjpeer",
      temperature: "-12°C",
      snowfall: "Moderate"
    },
    {
      id: 3,
      image: "/About/Snowfall.jpg",
      title: "Frozen Lake",
      description: "Serene frozen lake surrounded by snow-covered trees and mountains.",
      location: "Panjpeer",
      temperature: "-8°C",
      snowfall: "Light"
    },
    {
      id: 4,
      image: "/About/Snowfall.jpg",
      title: "Snowfall in Forest",
      description: "Gentle snowfall in a dense forest creating a peaceful winter atmosphere.",
      location: "Panjpeer",
      temperature: "-3°C",
      snowfall: "Heavy"
    },
    {
      id: 5,
      image: "/About/Snowfall.jpg",
      title: "Arctic Expedition",
      description: "Epic journey through arctic landscapes with breathtaking snow scenes.",
      location: "Panjpeer",
      temperature: "-25°C",
      snowfall: "Blizzard"
    },
    {
      id: 6,
      image: "/About/Snowfall.jpg",
      title: "Snowy Cabin",
      description: "Cozy wooden cabin surrounded by deep snow in a peaceful valley.",
      location: "Panjpeer",
      temperature: "-7°C",
      snowfall: "Moderate"
    },
    {
      id: 7,
      image: "/About/Snowfall.jpg",
      title: "Ice Crystals",
      description: "Close-up view of beautiful ice crystals and frost patterns.",
      location: "Panjpeer",
      temperature: "-15°C",
      snowfall: "Light"
    },
    {
      id: 8,
      image: "/About/Snowfall.jpg",
      title: "Northern Lights Snow",
      description: "Aurora borealis dancing over snow-covered landscapes.",
      location: "Panjpeer",
      temperature: "-18°C",
      snowfall: "Clear"
    }
  ];

  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Snowflake animation component
  const Snowflakes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white opacity-60 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${10 + Math.random() * 20}px`
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 relative overflow-hidden pt-24">
      {/* Animated Snow Background */}
      <Snowflakes />
      
      {/* Additional Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-16 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-cyan-200 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-white rounded-full opacity-25 animate-ping-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Added Back */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInDown">
            ❄️ Panjpeer Snowfall Gallery
          </h1>
          <div className="relative inline-block">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp">
              Explore breathtaking snowfall scenes from the beautiful landscapes of Panjpeer
            </p>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Weather Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">-15°C</div>
              <div className="text-sm text-gray-600">Average Temp</div>
            </div>
            <div className="p-4 bg-cyan-50 rounded-xl">
              <div className="text-2xl font-bold text-cyan-600">85%</div>
              <div className="text-sm text-gray-600">Snow Coverage</div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600">Panjpeer</div>
              <div className="text-sm text-gray-600">Location</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">8+</div>
              <div className="text-sm text-gray-600">Snow Spots</div>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {snowfallImages.map((image, index) => (
            <div 
              key={image.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:transform hover:-translate-y-2 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Image Container */}
              <div className="relative pt-[75%] bg-gray-800 overflow-hidden cursor-pointer">
                <img
                  src={image.image}
                  alt={image.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onClick={() => handleImageClick(image)}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Info */}
                {hoveredImage === image.id && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-blue-500 text-xs px-2 py-1 rounded-full font-semibold">
                        {image.temperature}
                      </span>
                      <span className="bg-cyan-500 text-xs px-2 py-1 rounded-full font-semibold">
                        {image.snowfall}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleImageClick(image)}
                      className="w-full bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200"
                    >
                      View Details
                    </button>
                  </div>
                )}

                {/* Location Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                  📍 {image.location}
                </div>

                {/* Snow Badge */}
                <div className="absolute top-3 right-3 bg-cyan-500 text-white px-2 py-1 rounded text-xs font-semibold animate-pulse">
                  ❄️ Snow
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-blue-600">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {image.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span>🌡️</span>
                      <span>{image.temperature}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>❄️</span>
                      <span>{image.snowfall}</span>
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleImageClick(image)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 transform hover:scale-105 shadow hover:shadow-lg"
                  >
                    <span>Explore</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ❄️ Panjpeer Winter Collection
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing the serene beauty of snowfall in Panjpeer's stunning landscapes. 
              Each image showcases the magical winter transformation of this beautiful region.
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{selectedImage.title}</h2>
              <p className="text-gray-600 text-lg mb-4">{selectedImage.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-600">Location</div>
                  <div className="text-gray-700">{selectedImage.location}</div>
                </div>
                <div className="text-center p-3 bg-cyan-50 rounded-lg">
                  <div className="font-semibold text-cyan-600">Temperature</div>
                  <div className="text-gray-700">{selectedImage.temperature}</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-600">Snowfall</div>
                  <div className="text-gray-700">{selectedImage.snowfall}</div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out 0.3s both;
        }
        .animate-fadeIn {
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Snowfall;