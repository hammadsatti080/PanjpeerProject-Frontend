import React, { useState, useRef, useEffect } from 'react';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const images = [
    {
      id: 1,
      url: '/About/Muree.jpg',
      title: 'Mountain Landscape',
   
    },
    {
      id: 2,
      url: '/About/Hotel.jpg',
      title: 'Northern Lights',
     
    },
    {
      id: 3,
      url: '/About/murree2.jpg',
      title: 'Forest Path',
   
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(prev => !prev);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-9xl w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
       
        </div>

        {/* Gallery Container - Main div with white background */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
          <div className="relative flex items-center justify-center mb-8">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-20 bg-white/90 hover:bg-blue-600 text-gray-800 hover:text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-xl border border-gray-200"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image Gallery - 95% width */}
            <div className="w-[95%] overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div 
                    key={image.id} 
                    className="w-full flex-shrink-0 relative"
                  >
                    <div className="relative h-[50vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                          index === currentIndex ? 'scale-105' : 'scale-100'
                        }`}
                        loading="lazy"
                      />
                      
                      {/* Image Overlay */}
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 lg:p-8 transition-all duration-500 ${
                        index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        <div className="max-w-3xl mx-auto">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                            {image.title}
                          </h3>
                          <p className="text-gray-100 text-sm md:text-base lg:text-lg mb-3">
                            {image.desc}
                          </p>
                          <span className="inline-block bg-blue-600 text-white text-xs md:text-sm px-3 py-1 rounded-full font-semibold">
                            {index + 1} / {images.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-20 bg-white/90 hover:bg-blue-600 text-gray-800 hover:text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-xl border border-gray-200"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            {/* Dots Navigation */}
            <div className="flex gap-3 md:gap-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125 shadow-md' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 ${
                isAutoPlay 
                  ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              } hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300`}
              aria-label={isAutoPlay ? 'Pause auto-play' : 'Start auto-play'}
            >
              {isAutoPlay ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">Pause Auto-play</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm md:text-base font-medium">Play Auto-play</span>
                </>
              )}
            </button>
          </div>

         

              
            
     
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;