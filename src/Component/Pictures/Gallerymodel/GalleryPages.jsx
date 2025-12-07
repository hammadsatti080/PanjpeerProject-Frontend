import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Example images – replace with real website images
const galleryImages = [
  { id: 1, src: "/About/panjpeerTour.jpg", title: "Panjpeer Shrine View", category: "Exterior", description: "Beautiful view of the shrine from outside" },
  { id: 2, src: "/About/Panjper1.jpg", title: "Inside Area", category: "Interior", description: "Inner sanctum of the shrine" },
  { id: 3, src: "/About/Lighting.webp", title: "Evening Lighting", category: "Atmosphere", description: "Evening prayer time with beautiful lighting" },
  { id: 4, src: "/About/Area.webp", title: "Visitors Area", category: "Facilities", description: "Area for visitors to rest and pray" },
  { id: 5, src: "/About/enterence.webp", title: "Main Entrance", category: "Exterior", description: "Main entrance gate of Panjpeer" },
  { id: 6, src: "/About/Mosque.jpg", title: "Prayer Spot", category: "Interior", description: "Main prayer area inside the shrine" },
  { id: 7, src: "/About/Rocks.jpg", title: "Mountain View", category: "Scenery", description: "Panoramic view of surrounding mountains" },
  { id: 8, src: "/About/Area.webp", title: "Architecture", category: "Exterior", description: "Detailed architecture of the shrine" },
  { id: 9, src: "/About/Muree2.jpg", title: "Spiritual Gathering", category: "Atmosphere", description: "Devotees gathering for prayers" },
];

// GalleryLoader Component - Mobile Optimized
function GalleryLoader({ count = 6, isGrid = true }) {
  return (
    <div className={`${isGrid ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6' : 'space-y-3 sm:space-y-4'}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg overflow-hidden ${isGrid ? '' : 'flex'}`}
        >
          {/* Skeleton for Grid Layout */}
          {isGrid ? (
            <div className="animate-pulse">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            /* Skeleton for Modal Layout */
            <div className="animate-pulse w-full">
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300"></div>
                <div className="flex-1 space-y-1 sm:space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ImageModalViewer Component - Mobile Optimized
function ImageModalViewer({ 
  currentImage, 
  images, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious,
  activeCategory 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Reset loading state when image changes
  useEffect(() => {
    if (currentImage) {
      setIsLoading(true);
      setImageError(false);
    }
  }, [currentImage]);

  // Handle swipe gestures for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        // Swipe left -> next image
        onNext();
      } else {
        // Swipe right -> previous image
        onPrevious();
      }
    }
    
    setTouchStart(null);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  // Get filtered images for navigation
  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const currentIndex = filteredImages.findIndex(img => img.id === currentImage?.id);
  const totalImages = filteredImages.length;

  if (!currentImage || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Main Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl sm:max-w-5xl md:max-w-6xl max-h-[85vh] sm:max-h-[90vh] md:max-h-[95vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar - Mobile Optimized */}
          <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="text-white max-w-[70%]">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate">{currentImage.title}</h2>
                <p className="text-gray-300 text-xs sm:text-sm truncate">
                  {currentImage.category} • Image {currentIndex + 1} of {totalImages}
                </p>
              </div>
              
              {/* Close Button - Mobile Friendly */}
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg sm:text-xl transition-all hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Image Container with Touch Support */}
          <div 
            className="relative bg-black rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden h-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Loading State - Mobile Optimized */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center w-full max-w-xs sm:max-w-md p-4 sm:p-6">
                  {/* Loading Animation - Mobile Optimized */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
                    <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent border-t-white animate-spin"></div>
                    <div className="absolute inset-2 sm:inset-3 rounded-full border-3 sm:border-4 border-transparent border-t-white animate-spin" style={{ animationDelay: '0.1s' }}></div>
                  </div>
                  
                  {/* Loading Text */}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-white text-sm sm:text-base font-medium">Loading image</span>
                    <span className="flex gap-0.5 sm:gap-1">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></span>
                      ))}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-1 sm:h-1.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-progress"></div>
                  </div>
                  
                  <p className="text-white/60 text-xs sm:text-sm mt-3 sm:mt-4">
                    {isMobile ? 'Loading...' : 'Please wait while we load the high-quality image...'}
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-black">
                <div className="text-center p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl md:text-3xl">❌</span>
                  </div>
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                    Failed to Load
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">
                    {isMobile ? 'Try again' : 'Unable to load the image. Please try again.'}
                  </p>
                  <button
                    onClick={handleImageLoad}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-colors text-xs sm:text-sm active:scale-95"
                  >
                    {isMobile ? 'Retry' : 'Retry Loading'}
                  </button>
                </div>
              </div>
            )}

            {/* Main Image with Responsive Sizing */}
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className={`w-full h-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
            />

            {/* Image Description Overlay - Conditional for Mobile */}
            {!isLoading && !imageError && !isMobile && (
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="max-w-2xl md:max-w-3xl mx-auto">
                  <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                    {currentImage.description}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons - Mobile Optimized */}
            {totalImages > 1 && !isLoading && !imageError && (
              <>
                {/* Previous Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-base sm:text-lg md:text-xl transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={currentIndex === 0}
                  aria-label="Previous image"
                >
                  ←
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-base sm:text-lg md:text-xl transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={currentIndex === totalImages - 1}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}

            {/* Image Counter - Mobile Optimized */}
            {!isLoading && !imageError && (
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium">
                {currentIndex + 1} / {totalImages}
              </div>
            )}

            {/* Action Buttons - Mobile Optimized */}
            {!isLoading && !imageError && !isMobile && (
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex gap-1 sm:gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = currentImage.src;
                    link.download = `panjpeer-${currentImage.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                    link.click();
                  }}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base"
                  aria-label="Download image"
                >
                  <span className="text-xs sm:text-sm">⬇️</span>
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail Preview - Mobile Optimized */}
          {!isLoading && !imageError && !isMobile && (
            <div className="mt-2 sm:mt-3 md:mt-4 overflow-x-auto pb-1">
              <div className="flex gap-1 sm:gap-2 justify-center px-1">
                {filteredImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      // This would need to be handled by parent
                    }}
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImage.id === img.id ? 'border-white scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Close Hint - Desktop Only */}
        {!isMobile && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs sm:text-sm">
            Press ESC to close • Use ← → arrows to navigate
          </div>
        )}

        {/* Mobile Swipe Hint */}
        {isMobile && !isLoading && !imageError && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white/70 text-xs text-center">
            Swipe left/right to navigate
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Main Gallery Component - Fully Mobile Responsive
function GalleryPages() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate image loading for demo
  useEffect(() => {
    const simulateImageLoading = () => {
      setImagesLoaded(false);
      setLoadingProgress(0);
      
      // Simulate progressive loading
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setImagesLoaded(true);
            setLoadedImages(galleryImages);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      
      return () => clearInterval(interval);
    };
    
    simulateImageLoading();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Open modal with image
  const openModal = (image) => {
    if (!imagesLoaded) return;
    setSelectedImage(image);
    setIsModalOpen(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, filteredImages]);

  // Navigate to previous image
  const previousImage = useCallback(() => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  }, [selectedImage, filteredImages]);

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Responsive Top Padding */}
      <div className="pt-8 xs:pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
          {/* Header Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 xs:mb-10 sm:mb-12 mt-16 md:mb-16 "
          >
            {/* Icon with Responsive Sizing */}
            <div className="inline-flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg sm:rounded-xl md:rounded-2xl mb-4 xs:mb-5 sm:mb-6 md:mb-8">
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl">📷</span>
            </div>
            
            {/* Title with Responsive Typography */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 xs:mb-4 sm:mb-5 md:mb-6">
              Panjpeer Photo Gallery
            </h1>
            
            {/* Subtitle with Responsive Typography */}
            <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl md:max-w-3xl mx-auto px-3 xs:px-4 mb-4 xs:mb-5 sm:mb-6 md:mb-8">
              Explore stunning photographs of Panjpeer shrine
            </p>
            
            {/* Decorative Divider */}
            <div className="w-16 xs:w-20 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto"></div>
          </motion.div>

          {/* Loading Overlay for Initial Load */}
          {!imagesLoaded && (
            <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
                className="text-center max-w-xs xs:max-w-sm sm:max-w-md p-4 xs:p-6 sm:p-8"
              >
                {/* Loading Animation - Responsive */}
                <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 mx-auto mb-4 xs:mb-5 sm:mb-6">
                  <div className="absolute inset-0 rounded-full border-6 xs:border-7 sm:border-8 border-amber-100 animate-pulse"></div>
                  <div className="absolute inset-4 xs:inset-5 sm:inset-6 rounded-full border-6 xs:border-7 sm:border-8 border-amber-200 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl xs:text-4xl sm:text-5xl animate-bounce">📷</span>
                  </div>
                </div>
                
                {/* Loading Text */}
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Loading Gallery
                  <span className="inline-flex ml-1 xs:ml-2">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="inline-block w-1 h-1 xs:w-1.5 xs:h-1.5 mx-0.5 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></span>
                    ))}
                  </span>
                </h2>
                
                {/* Progress Bar */}
                <div className="mt-4 xs:mt-5 sm:mt-6 mb-3 xs:mb-4 sm:mb-5">
                  <div className="flex justify-between text-xs xs:text-sm sm:text-base text-gray-600 mb-1 xs:mb-2">
                    <span>Loading images...</span>
                    <span>{loadingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 xs:h-2 sm:h-2.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                </div>
                
                {/* Tips - Mobile Optimized */}
                <div className="mt-4 xs:mt-6 sm:mt-8 p-3 xs:p-4 bg-amber-50 rounded-lg xs:rounded-xl border border-amber-100">
                  <p className="text-xs xs:text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">Tip:</span> {isMobile ? 'Connect to WiFi for faster loading' : 'Gallery loads faster on good internet connection'}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Category Filter - Mobile Optimized */}
          <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-14">
            <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  disabled={!imagesLoaded}
                  className={`px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Content - Show Skeleton or Images */}
          {!imagesLoaded ? (
            <div>
              {/* Gallery Loader Skeleton */}
              <GalleryLoader count={isMobile ? 4 : 8} isGrid={true} />
              
              {/* Loading Message */}
              <div className="text-center mt-8 xs:mt-10 sm:mt-12 p-4 xs:p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                <div className="inline-flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-lg xs:text-xl">⏳</span>
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800">Preparing gallery</h3>
                </div>
                <p className="text-gray-600 text-sm xs:text-base mb-4 xs:mb-6">
                  Loading high-quality images for the best viewing experience
                </p>
                <div className="inline-flex items-center gap-2 xs:gap-3 px-4 xs:px-6 py-2 xs:py-3 bg-amber-50 rounded-full">
                  <div className="w-2 h-2 xs:w-3 xs:h-3 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-sm xs:text-base text-amber-700">Please wait...</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Image Grid - Fully Responsive */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
                {filteredImages.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white transform hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-95"
                    onClick={() => openModal(img)}
                    whileHover={!isMobile ? { y: -8 } : {}}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-sm xs:text-base sm:text-lg truncate">{img.title}</h3>
                        <p className="text-gray-300 text-xs xs:text-sm truncate">{img.category}</p>
                      </div>
                      <div className="absolute top-2 xs:top-3 right-2 xs:right-3 w-8 h-8 xs:w-10 xs:h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <span className="text-gray-800 text-base xs:text-lg">🔍</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Image Modal Viewer */}
              <ImageModalViewer
                currentImage={selectedImage}
                images={galleryImages}
                isOpen={isModalOpen}
                onClose={closeModal}
                onNext={nextImage}
                onPrevious={previousImage}
                activeCategory={activeCategory}
              />

              {/* Gallery Stats - Mobile Optimized */}
              {imagesLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 xs:mt-10 sm:mt-12 md:mt-16 pt-6 xs:pt-8 sm:pt-10 md:pt-12 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 text-center">
                    {[
                      { value: galleryImages.length, label: "Total Photos" },
                      { value: categories.length - 1, label: "Categories" },
                      { value: filteredImages.length, label: "Currently Viewing" },
                      { value: "Loaded", label: "Ready to View" }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600">{stat.value}</div>
                        <p className="text-gray-600 text-xs xs:text-sm sm:text-base mt-1 xs:mt-2">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Mobile Instructions */}
              {!isModalOpen && isMobile && imagesLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-4 xs:bottom-5 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 xs:px-4 py-2 xs:py-2.5 rounded-full shadow-lg text-xs xs:text-sm text-gray-700 z-40"
                >
                  👆 Tap photos to view fullscreen
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .grid-cols-1 {
            grid-template-columns: 1fr;
          }
          .xs\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Touch optimizations */
        @media (hover: none) and (pointer: coarse) {
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}

export default GalleryPages;