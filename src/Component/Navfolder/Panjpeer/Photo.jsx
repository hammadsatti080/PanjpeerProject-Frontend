import React, { useState, useEffect } from 'react';

const Photo = () => {

    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, []);
      
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  // Photo categories
  const photoCategories = [
    { id: 'all', name: 'All Photos' },
    { id: 'nature', name: 'Nature' },
    { id: 'hotels', name: 'Hotels' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'food', name: 'Dining' },
    { id: 'activities', name: 'Activities' },
    { id: 'events', name: 'Events' }
  ];

  // 58 local images with your paths
  const allImages = [
    // Nature (12) - Using your local images
    { id: 1, category: 'nature', url: '/About/View1.jpg' },
    { id: 2, category: 'nature', url: '/About/View2.jpg' },
    { id: 3, category: 'nature', url: '/About/View3.jpg' },
    { id: 4, category: 'nature', url: '/About/View4.jpg' },
    { id: 5, category: 'nature', url: '/About/View5.jpg' },
    { id: 6, category: 'nature', url: '/About/View6.jpg' },
    { id: 7, category: 'nature', url: '/About/View7.jpg' },
    { id: 8, category: 'nature', url: '/About/View8.jpg' },
    { id: 9, category: 'nature', url: '/About/View7.jpg' },
    { id: 10, category: 'nature', url: '/About/View8.jpg' },
    { id: 11, category: 'nature', url: '/About/View5.jpg' },
    { id: 12, category: 'nature', url: '/About/View6.jpg' },

    // Hotels (15) - Using local hotel images
    { id: 13, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 14, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 15, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 16, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 17, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 18, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 19, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 20, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 21, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 22, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 23, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 24, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 25, category: 'hotels', url: '/About/Hotel1.jpg' },
    { id: 26, category: 'hotels', url: '/About/Hotel2.jpg' },
    { id: 27, category: 'hotels', url: '/About/Hotel1.jpg' },

    // Rooms (10) - Using local room images
    { id: 28, category: 'rooms', url: '/About/Room4.webp' },
    { id: 29, category: 'rooms', url: '/About/Room5.jpg' },
    { id: 30, category: 'rooms', url: '/About/Room4.webp' },
    { id: 31, category: 'rooms', url: '/About/Room5.jpg' },
    { id: 32, category: 'rooms', url: '/About/Room4.webp' },
    { id: 33, category: 'rooms', url: '/About/Room5.jpg' },
    { id: 34, category: 'rooms', url: '/About/Room4.webp' },
    { id: 35, category: 'rooms', url: '/About/Room5.jpg' },
    { id: 36, category: 'rooms', url: '/About/Room4.webp' },
    { id: 37, category: 'rooms', url: '/About/Room5.jpg' },

    // Food (8) - Using local food images
    { id: 38, category: 'food', url: '/About/Food1.jpg' },
    { id: 39, category: 'food', url: '/About/Food2.jpg' },
    { id: 40, category: 'food', url: '/About/Event1.jpg' },
    { id: 41, category: 'food', url: '/About/Event2.jpg' },
    { id: 42, category: 'food', url: '/About/Event3.jpg' },
    { id: 43, category: 'food', url: '/About/Food1.jpg' },
    { id: 44, category: 'food', url: '/About/Food2.jpg' },
    { id: 45, category: 'food', url: '/About/Food1.jpg' },

    // Activities (7) - Using local activity images
    { id: 46, category: 'activities', url: '/About/Event3.jpg' },
    { id: 47, category: 'activities', url: '/About/Event2.jpg' },
    { id: 48, category: 'activities', url: '/About/Food1.jpg' },
    { id: 49, category: 'activities', url: '/About/Food2.jpg' },


    // Events (6) - Using local event images
    { id: 53, category: 'events', url: '/About/Event1.jpg' },
    { id: 54, category: 'events', url: '/About/Event2.jpg' },
    { id: 55, category: 'events', url: '/About/Event3.jpg' },

  ];

  // Filter images
  const filteredImages = selectedCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  // Handle image load
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Lightbox Modal
  const LightboxModal = () => {
    if (!selectedImage) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <div className="relative max-w-7xl max-h-[90vh] w-full">
          <img
            src={selectedImage.url}
            alt=""
            className="w-full h-full object-contain max-h-[85vh] rounded-lg"
          />
          <div 
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            ✕
          </div>
        </div>
      </div>
    );
  };

  // Category indicator
  const CategoryIndicator = () => (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-800">
          {selectedCategory === 'all' ? 'All Photos' : 
           selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </span>
        <span className="text-xs text-gray-500 ml-2">
          ({filteredImages.length} photos)
        </span>
      </div>
    </div>
  );

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(180deg);
        }
      }
      
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
      
      @keyframes pulse-glow {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      
      .image-grid-item {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .image-grid-item:hover {
        transform: scale(1.05);
        z-index: 10;
      }
      
      .image-grid-item:nth-child(4n+1) {
        animation-delay: 0.1s;
      }
      
      .image-grid-item:nth-child(4n+2) {
        animation-delay: 0.2s;
      }
      
      .image-grid-item:nth-child(4n+3) {
        animation-delay: 0.3s;
      }
      
      .image-grid-item:nth-child(4n+4) {
        animation-delay: 0.4s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle image errors - fallback to placeholder
  const handleImageError = (e, id) => {
    console.log(`Image ${id} failed to load: ${e.target.src}`);
    // You can set a fallback image here if needed
    // e.target.src = '/path/to/fallback-image.jpg';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Category Indicator */}
      <CategoryIndicator />

      {/* Main Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Auto-scrolling category tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 min-w-max pb-4">
            {photoCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-6 py-3 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium whitespace-nowrap">
                  {category.name}
                </span>
                {selectedCategory === category.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full animate-pulse-glow"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image Counter */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2 animate-fade-in-up">
              {filteredImages.length}
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">
              Photos Available
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="relative">
          {/* Images Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="image-grid-item mb-4 break-inside-avoid relative group"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => setSelectedImage(image)}
                style={{
                  animationDelay: `${(index % 4) * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Loading Skeleton */}
                {!loadedImages[image.id] && (
                  <div className="w-full h-64 bg-gradient-to-r from-gray-100 to-gray-200 animate-shimmer rounded-lg"></div>
                )}
                
                {/* Image Container */}
                <div className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
                  loadedImages[image.id] ? 'opacity-100' : 'opacity-0'
                }`}>
                  <img
                    src={image.url}
                    alt={`Panjpeer ${image.category}`}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                    onError={(e) => handleImageError(e, image.id)}
                    style={{
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      animationDelay: `${(index % 8) * 0.1}s`
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {image.category}
                      </span>
                    </div>
                    
                    {/* Zoom Indicator */}
                    <div className="absolute bottom-3 right-3">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Progress Bar (on hover) */}
                    {hoveredImage === image.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
                        <div className="h-full bg-white/30 animate-shimmer"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Panjpeer Photo Gallery
            </h3>
            <p className="text-gray-600">
              Explore our collection of local photographs showcasing the beauty of Panjpeer.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal />

      {/* Instructions */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
        Click on any image to view full screen
      </div>
    </div>
  );
};

export default Photo;