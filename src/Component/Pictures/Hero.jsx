import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Hero() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/images');
      setImages(res.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700 text-lg">Loading Sunrise Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Panjpeer Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the breathtaking beauty of sunrise at Panjpeer Rocks
          </p>
        </div>

        {/* Single Horizontal Scroller - Works on both web and mobile */}
        <div className="relative">
          {/* Scrollable Gallery with smooth scrolling */}
          <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide px-4 smooth-scroll">
            {images.map((img, index) => (
              <div 
                key={img._id} 
                className="flex-shrink-0 w-72 md:w-80 h-80 md:h-96 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={img.url} 
                  alt={img.title || 'Panjpeer Sunrise'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE1MCAxMDBIMjUwTDIwMCAxNTBaIiBmaWxsPSIjRkRCQjQ2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5QzlDOUMiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                  }}
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    {img.title && (
                      <h3 className="font-bold text-lg mb-1">
                        {img.title}
                      </h3>
                    )}
                    <p className="text-gray-200 text-sm">
                      Beautiful sunrise view
                    </p>
                  </div>
                </div>

                {/* Image Number */}
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm md:text-base">
              ← Scroll to see more images →
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            "Every sunrise at Panjpeer Rocks tells a unique story of nature's beauty"
          </p>
        </div>
      </div>

      {/* Enhanced CSS for super smooth scrolling */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Super smooth scrolling */
        .smooth-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          scroll-padding: 0 1rem;
        }
        
        /* Smooth scrolling for all browsers */
        .smooth-scroll {
          animation: smoothScroll 0.5s ease-in-out;
        }
        
        /* Individual card snap points */
        .smooth-scroll > div {
          scroll-snap-align: start;
        }
        
        /* Enhanced performance */
        .smooth-scroll {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
        }
        
        /* Smooth hover effects */
        .smooth-scroll > div {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Fast momentum scrolling for iOS */
        .smooth-scroll {
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }
        
        /* Container padding to show partial next card */
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        /* Keyframes for extra smoothness */
        @keyframes smoothScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;