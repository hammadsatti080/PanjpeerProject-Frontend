import React, { useState, useRef, useEffect, useCallback } from 'react';

const Mountain = () => {
  // Updated mountain videos data with actual Pixabay video URLs
  const mountainVideos = [
    {
      id: 1,
      url: "https://cdn.pixabay.com/video/2024/08/01/224253_tiny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400",
      title: "Mountain Stream",
      description: "A serene mountain stream flowing through the beautiful landscapes of Ukraine's Carpathian mountains.",
      duration: "3:15",
      quality: "4K"
    },
    {
      id: 2,
      url: "https://cdn.pixabay.com/video/2019/04/01/22512-328261507_tiny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1464822759849-e41f5bc90383?w=400",
      title: "Mountain Hiker",
      description: "An adventurous hiker exploring rocky mountain trails with breathtaking sky views.",
      duration: "2:45",
      quality: "4K"
    },
    {
      id: 3,
      url: "https://cdn.pixabay.com/video/2024/06/02/215055_tiny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      title: "Aerial Glen Coe",
      description: "Spectacular drone footage of the Three Sisters mountain range in Glen Coe, Scotland.",
      duration: "4:20",
      quality: "4K"
    },
    {
      id: 4,
      url: "https://cdn.pixabay.com/video/2024/08/01/224253_tiny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
      title: "Snowy Peaks",
      description: "Majestic snow-covered mountain peaks surrounded by lush green forests and valleys.",
      duration: "3:50",
      quality: "4K"
    },
    {
      id: 5,
      url: "https://cdn.pixabay.com/video/2024/06/02/215055_tiny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1464822759849-e41f5bc90383?w=800",
      title: "Alpine Valley Expedition",
      description: "Panoramic views of alpine valleys with crystal clear lakes and towering mountain ranges in an epic expedition.",
      duration: "5:15",
      quality: "Ultra HD"
    }
  ];

  // State for currently playing video
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [volume, setVolume] = useState(1);
  
  // Refs for video elements
  const videoRefs = useRef([]);

  // Better ref management
  const setVideoRef = useCallback((index, el) => {
    videoRefs.current[index] = el;
  }, []);

  // Lazy load video when it comes into view
  const loadVideo = useCallback((videoId) => {
    if (!loadedVideos.has(videoId)) {
      setLoadedVideos(prev => new Set([...prev, videoId]));
    }
  }, [loadedVideos]);

  // Play/pause functions with error handling
  const playVideo = async (videoId) => {
    // Load video if not already loaded
    loadVideo(videoId);

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
        videoElement.volume = volume;
        
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

  // Handle video time update for progress
  const handleTimeUpdate = (videoId, e) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(prev => ({ ...prev, [videoId]: progress }));
  };

  // Handle video end
  const handleVideoEnd = (videoId) => {
    setPlayingVideo(null);
    setVideoProgress(prev => ({ ...prev, [videoId]: 0 }));
  };

  // Handle video errors
  const handleVideoError = (videoId, error) => {
    console.error(`Video ${videoId} error:`, error);
    setPlayingVideo(null);
    setIsLoading(false);
  };

  // Volume control
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    // Update volume for all videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.volume = newVolume;
      }
    });
  };

  // Fullscreen support
  const toggleFullscreen = async (videoId) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (!document.fullscreenElement) {
        await video.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    }
  };

  // Mountain cloud animation effect
  const CloudEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-2 bg-white rounded-full opacity-30 animate-cloudFloat"
          style={{
            left: `${15 + i * 20}%`,
            top: '20%',
            animationDelay: `${i * 1.2}s`,
            animationDuration: '8s'
          }}
        />
      ))}
    </div>
  );

  // Floating mountain mist animation
  const MountainMist = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-4 bg-gray-200 rounded-full opacity-20 animate-mistFloat"
          style={{
            left: `${5 + i * 15}%`,
            bottom: '10%',
            animationDelay: `${i * 0.8}s`,
            animationDuration: '6s'
          }}
        />
      ))}
    </div>
  );

  // Video Progress Bar Component
  const VideoProgress = ({ videoId }) => {
    const progress = videoProgress[videoId] || 0;
    
    return (
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 bg-opacity-50">
        <div 
          className="h-full bg-orange-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 relative overflow-hidden pt-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-16 w-24 h-24 bg-gray-200 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-white rounded-full opacity-25 animate-ping-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInDown">
            Majestic Mountain Adventures
          </h1>
          <div className="relative inline-block">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp">
              Explore the world's most breathtaking mountain ranges and alpine landscapes with real footage
            </p>
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Volume Control */}
        <div className="flex justify-center mb-8 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M12 6a8 8 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H4a1 1 0 01-1-1v-7a1 1 0 011-1h3.5z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-32 accent-orange-500"
            />
            <span className="text-sm text-gray-600 w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>
        
        {/* Mountains Section - OPPOSITE LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 50% Section - Four Smaller Videos (LEFT SIDE) */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mountainVideos.slice(0, 4).map((video, index) => {
                const animationDelay = index * 100;
                const isPlaying = playingVideo === index;
                const isLoaded = loadedVideos.has(index);
                
                return (
                  <div 
                    key={video.id} 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:transform hover:-translate-y-2 animate-slideInLeft"
                    style={{ animationDelay: `${animationDelay}ms` }}
                    onMouseEnter={() => setHoveredVideo(index)}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    <div className="relative pt-[75%] bg-gray-800 overflow-hidden">
                      {/* Video Element */}
                      {isLoaded && (
                        <video
                          ref={el => setVideoRef(index, el)}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          onEnded={() => handleVideoEnd(index)}
                          onError={(e) => handleVideoError(index, e)}
                          onTimeUpdate={(e) => handleTimeUpdate(index, e)}
                          preload="metadata"
                          playsInline
                          muted={volume === 0}
                        >
                          <source src={video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      
                      {/* Fallback Thumbnail */}
                      {!isPlaying && (
                        <div 
                          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${video.thumbnail})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-60"></div>
                        </div>
                      )}
                      
                      {/* Cloud Effect when playing */}
                      {isPlaying && <CloudEffect />}
                      
                      {/* Video Progress Bar */}
                      {isPlaying && <VideoProgress videoId={index} />}
                      
                      {/* Play/Pause Overlay Button */}
                      <button 
                        onClick={() => playVideo(index)}
                        disabled={isLoading}
                        aria-label={isPlaying ? `Pause ${video.title}` : `Play ${video.title}`}
                        className={`absolute inset-0 flex items-center justify-center bg-black transition-all duration-500 ${
                          isPlaying ? 'bg-opacity-20 hover:bg-opacity-40' : 'bg-opacity-30 hover:bg-opacity-50'
                        } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className={`transform transition-all duration-300 ${
                          hoveredVideo === index ? 'scale-125' : 'scale-100'
                        }`}>
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                            isPlaying 
                              ? 'bg-orange-500 animate-pulse' 
                              : 'bg-white'
                          }`}>
                            {isLoading && isPlaying ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : isPlaying ? (
                              <svg className="w-6 h-6 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-gray-700 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Mountain Badge with animation */}
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold animate-bounce">
                        Peak
                      </div>

                      {/* Fullscreen Button */}
                      <button
                        onClick={() => toggleFullscreen(index)}
                        className="absolute top-3 right-3 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 transition-opacity duration-300 hover:opacity-100"
                        aria-label="Toggle fullscreen"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-orange-600">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed transition-colors duration-300 hover:text-gray-700">
                        {video.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <button 
                          onClick={() => playVideo(index)}
                          disabled={isLoading}
                          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            isPlaying 
                              ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 shadow' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow'
                          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}`}
                        >
                          {isLoading && isPlaying ? (
                            <>
                              <div className="w-3 h-3 border-2 border-orange-700 border-t-transparent rounded-full animate-spin mr-2"></div>
                              Loading
                            </>
                          ) : isPlaying ? (
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
                              Explore
                            </>
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-all duration-300 hover:bg-gray-200 hover:text-gray-700">
                            {video.duration}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-all duration-300 hover:bg-gray-200 hover:text-gray-700">
                            {video.quality}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 50% Section - Extra Large Video (RIGHT SIDE) */}
          <div className="lg:w-1/2">
            <div 
              className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl animate-slideInRight"
              onMouseEnter={() => setHoveredVideo(4)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative pt-[70%] bg-gray-800 overflow-hidden">
                {/* Featured Video Element */}
                {loadedVideos.has(4) && (
                  <video
                    ref={el => setVideoRef(4, el)}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onEnded={() => handleVideoEnd(4)}
                    onError={(e) => handleVideoError(4, e)}
                    onTimeUpdate={(e) => handleTimeUpdate(4, e)}
                    preload="metadata"
                    playsInline
                    muted={volume === 0}
                  >
                    <source src={mountainVideos[4].url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                
                {/* Fallback Thumbnail */}
                {playingVideo !== 4 && (
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${mountainVideos[4].thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-900 opacity-60"></div>
                  </div>
                )}
                
                {/* Mountain Mist Effect when playing */}
                {playingVideo === 4 && <MountainMist />}
                
                {/* Video Progress Bar */}
                {playingVideo === 4 && <VideoProgress videoId={4} />}
                
                {/* Play/Pause Overlay Button */}
                <button 
                  onClick={() => playVideo(4)}
                  disabled={isLoading}
                  aria-label={playingVideo === 4 ? `Pause ${mountainVideos[4].title}` : `Play ${mountainVideos[4].title}`}
                  className={`absolute inset-0 flex items-center justify-center bg-black transition-all duration-500 ${
                    playingVideo === 4 ? 'bg-opacity-20 hover:bg-opacity-40' : 'bg-opacity-40 hover:bg-opacity-60'
                  } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`transform transition-all duration-500 ${
                    hoveredVideo === 4 ? 'scale-110' : 'scale-100'
                  }`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
                      playingVideo === 4 
                        ? 'bg-orange-500 animate-pulse' 
                        : 'bg-white animate-bounce-slow'
                    }`}>
                      {isLoading ? (
                        <div className="w-8 h-8 border-3 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                      ) : playingVideo === 4 ? (
                        <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-gray-700 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>

                {/* Video Badge with animation */}
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce-in">
                  Expedition
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={() => toggleFullscreen(4)}
                  className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded opacity-0 transition-opacity duration-300 hover:opacity-100"
                  aria-label="Toggle fullscreen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>

                {/* Cloud Effect */}
                <CloudEffect />
              </div>
              
              <div className="p-8 relative">
                {/* Animated content */}
                <div className="flex items-start justify-between mb-4 animate-fadeIn">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3 transition-all duration-300 hover:text-orange-600">
                      {mountainVideos[4].title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed transition-all duration-300 hover:text-gray-700">
                      {mountainVideos[4].description}
                    </p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    Ultra HD
                  </div>
                </div>
                
                <div className="flex space-x-4 animate-slideInUp">
                  <button 
                    onClick={() => playVideo(4)}
                    disabled={isLoading}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-500 ${
                      playingVideo === 4 
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg' 
                        : 'bg-gray-700 text-white hover:bg-gray-800 shadow-lg'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105 hover:shadow-xl'}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Loading...
                      </>
                    ) : playingVideo === 4 ? (
                      <>
                        <svg className="w-5 h-5 mr-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Pause Journey
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Start Journey
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => toggleFullscreen(4)}
                    className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-all duration-500 hover:bg-gray-200 transform hover:scale-105 hover:shadow-lg animate-pulse"
                  >
                    <svg className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Fullscreen
                  </button>
                </div>

                {/* Mountain Stats */}
                <div className="flex space-x-6 mt-6 animate-fadeIn">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">8,848m</div>
                    <div className="text-sm text-gray-600">Highest Peak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">14</div>
                    <div className="text-sm text-gray-600">Summits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">65°C</div>
                    <div className="text-sm text-gray-600">Temperature Range</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for mountain animations */}
      <style jsx>{`
        @keyframes cloudFloat {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateX(10px) translateY(-5px);
            opacity: 0.4;
          }
          50% {
            transform: translateX(20px) translateY(-10px);
            opacity: 0.5;
          }
          75% {
            transform: translateX(10px) translateY(-5px);
            opacity: 0.4;
          }
        }

        @keyframes mistFloat {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-15px) scale(1);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0;
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

        .animate-cloudFloat {
          animation: cloudFloat 8s ease-in-out infinite;
        }

        .animate-mistFloat {
          animation: mistFloat 6s ease-in-out infinite;
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

export default Mountain;