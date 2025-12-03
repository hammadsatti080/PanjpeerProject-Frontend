import React, { useState, useRef, useEffect } from 'react';

const Waterfall = () => {
  // Video data
  const videos = [
    {
      id: 1,
      url: "https://cdn.pixabay.com/video/2023/08/06/174860-852215326_tiny.mp4",
      title: "Majestic Waterfall",
      description: "A breathtaking view of a powerful waterfall cascading down rocky cliffs surrounded by lush green forest."
    },
    {
      id: 2,
      url: "https://cdn.pixabay.com/video/2025/05/06/277097_tiny.mp4",
      title: "Forest Stream",
      description: "A gentle stream flowing through a dense forest with sunlight filtering through the canopy."
    },
    {
      id: 3,
      url: "https://cdn.pixabay.com/video/2019/06/17/24515-343454414_tiny.mp4",
      title: "Mountain Cascade",
      description: "Water rushing down a mountain slope, creating multiple cascades and pools along its path."
    },
    {
      id: 4,
      url: "https://cdn.pixabay.com/video/2023/06/28/169249-840702546_tiny.mp4",
      title: "River Rapids",
      description: "Powerful river rapids flowing through a rocky canyon with mist rising from the turbulent water."
    },
    {
      id: 5,
      url: "https://cdn.pixabay.com/video/2023/08/06/174860-852215326_tiny.mp4",
      title: "Tropical Waterfall",
      description: "Crystal clear water falling into a turquoise pool surrounded by tropical vegetation."
    }
  ];

  // State for currently playing video
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  
  // Refs for video elements
  const videoRefs = useRef([]);

  // Play/pause functions with error handling
  const playVideo = async (videoId) => {
    // If clicking the same video, pause it
    if (playingVideo === videoId) {
      try {
        videoRefs.current[videoId]?.pause();
        setPlayingVideo(null);
      } catch (error) {
        console.log('Pause error:', error);
      }
      return;
    }

    setIsLoading(true);

    try {
      // Pause currently playing video if any
      if (playingVideo !== null) {
        const currentVideo = videoRefs.current[playingVideo];
        if (currentVideo) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
        }
      }

      // Small delay to ensure previous video is properly paused
      await new Promise(resolve => setTimeout(resolve, 100));

      // Play the new video
      const videoElement = videoRefs.current[videoId];
      if (videoElement) {
        videoElement.currentTime = 0;
        
        const playPromise = videoElement.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setPlayingVideo(videoId);
        }
      }
    } catch (error) {
      console.error('Video play error:', error);
      setPlayingVideo(videoId);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle video end
  const handleVideoEnd = (videoId) => {
    setPlayingVideo(null);
  };

  // Handle video errors
  const handleVideoError = (videoId, error) => {
    console.error(`Video ${videoId} error:`, error);
    setPlayingVideo(null);
    setIsLoading(false);
  };

  // Water drop animation effect
  const WaterDropEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-waterDrop"
          style={{
            left: `${20 + i * 15}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );

  // Floating bubbles animation
  const FloatingBubbles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-cyan-200 rounded-full opacity-40 animate-float"
          style={{
            left: `${10 + i * 10}%`,
            bottom: '-10px',
            animationDelay: `${i * 0.7}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 relative overflow-hidden pt-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-100 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-100 rounded-full opacity-25 animate-ping-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInDown">
            Premium Waterfall Videos
          </h1>
          <div className="relative inline-block">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp">
              Immerse yourself in the mesmerizing beauty of nature's most stunning waterfalls
            </p>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Waterfall Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 50% Section - Extra Large Video */}
          <div className="lg:w-1/2">
            <div 
              className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl animate-slideInLeft"
              onMouseEnter={() => setHoveredVideo(0)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative pt-[70%] bg-gray-900 overflow-hidden">
                <video 
                  ref={el => videoRefs.current[0] = el}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loop
                  muted
                  playsInline
                  onEnded={() => handleVideoEnd(0)}
                  onError={(e) => handleVideoError(0, e)}
                  poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  preload="metadata"
                >
                  <source src={videos[0].url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Water Drop Effect when playing */}
                {playingVideo === 0 && <WaterDropEffect />}
                
                {/* Play/Pause Overlay Button */}
                <button 
                  onClick={() => playVideo(0)}
                  disabled={isLoading}
                  className={`absolute inset-0 flex items-center justify-center bg-black transition-all duration-500 ${
                    playingVideo === 0 ? 'bg-opacity-20 hover:bg-opacity-40' : 'bg-opacity-40 hover:bg-opacity-60'
                  } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`transform transition-all duration-500 ${
                    hoveredVideo === 0 ? 'scale-110' : 'scale-100'
                  }`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
                      playingVideo === 0 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-white animate-bounce-slow'
                    }`}>
                      {isLoading ? (
                        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : playingVideo === 0 ? (
                        <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-blue-600 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>

                {/* Video Badge with animation */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce-in">
                  Featured
                </div>

                {/* Floating Bubbles */}
                <FloatingBubbles />
              </div>
              
              <div className="p-8 relative">
                {/* Animated content */}
                <div className="flex items-start justify-between mb-4 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3 transition-all duration-300 hover:text-blue-600">
                      {videos[0].title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed transition-all duration-300 hover:text-gray-700">
                      {videos[0].description}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    4K Ultra HD
                  </div>
                </div>
                
                <div className="flex space-x-4 animate-slideInUp">
                  <button 
                    onClick={() => playVideo(0)}
                    disabled={isLoading}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-500 ${
                      playingVideo === 0 
                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105 hover:shadow-xl'}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Loading...
                      </>
                    ) : playingVideo === 0 ? (
                      <>
                        <svg className="w-5 h-5 mr-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Pause Video
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play Video
                      </>
                    )}
                  </button>
                  
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* 50% Section - Five Smaller Videos */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.slice(1).map((video, index) => {
                const videoIndex = index + 1;
                const animationDelay = index * 100;
                
                return (
                  <div 
                    key={video.id} 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:transform hover:-translate-y-2 animate-slideInRight"
                    style={{ animationDelay: `${animationDelay}ms` }}
                    onMouseEnter={() => setHoveredVideo(videoIndex)}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    <div className="relative pt-[75%] bg-gray-900 overflow-hidden">
                      <video 
                        ref={el => videoRefs.current[videoIndex] = el}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loop
                        muted
                        playsInline
                        onEnded={() => handleVideoEnd(videoIndex)}
                        onError={(e) => handleVideoError(videoIndex, e)}
                        poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                        preload="metadata"
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Water Drop Effect when playing */}
                      {playingVideo === videoIndex && <WaterDropEffect />}
                      
                      {/* Play/Pause Overlay Button */}
                      <button 
                        onClick={() => playVideo(videoIndex)}
                        disabled={isLoading}
                        className={`absolute inset-0 flex items-center justify-center bg-black transition-all duration-500 ${
                          playingVideo === videoIndex ? 'bg-opacity-20 hover:bg-opacity-40' : 'bg-opacity-30 hover:bg-opacity-50'
                        } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className={`transform transition-all duration-300 ${
                          hoveredVideo === videoIndex ? 'scale-125' : 'scale-100'
                        }`}>
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                            playingVideo === videoIndex 
                              ? 'bg-red-500 animate-pulse' 
                              : 'bg-white'
                          }`}>
                            {isLoading && playingVideo === videoIndex ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : playingVideo === videoIndex ? (
                              <svg className="w-6 h-6 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-blue-600 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>

                      {/* HD Badge with animation */}
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold animate-bounce">
                        HD
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-blue-600">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed transition-colors duration-300 hover:text-gray-700">
                        {video.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <button 
                          onClick={() => playVideo(videoIndex)}
                          disabled={isLoading}
                          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            playingVideo === videoIndex 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200 shadow' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow'
                          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
                        >
                          {isLoading && playingVideo === videoIndex ? (
                            <>
                              <div className="w-3 h-3 border-2 border-red-700 border-t-transparent rounded-full animate-spin mr-2"></div>
                              Loading
                            </>
                          ) : playingVideo === videoIndex ? (
                            <>
                              <svg className="w-4 h-4 mr-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Pause
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-2 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                              Play
                            </>
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-all duration-300 hover:bg-gray-200 hover:text-gray-700">
                            2:30
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-all duration-300 hover:bg-gray-200 hover:text-gray-700">
                            4K
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes waterDrop {
          0% {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100px) scale(1.2);
            opacity: 0;
          }
        }

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-waterDrop {
          animation: waterDrop 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
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

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: fadeInUp 0.8s ease-out 0.7s both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
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

export default Waterfall;