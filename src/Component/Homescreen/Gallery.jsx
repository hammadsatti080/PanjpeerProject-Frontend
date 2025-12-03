import { motion } from 'framer-motion';
import { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: "https://wpassets.graana.com/blog/wp-content/uploads/2023/08/hikers-on-their-way-to-panjpeer-Rocks-.jpeg",
      alt: "Hikers on their way to Panjpeer Rocks",
      category: "Adventure"
    },
    {
      id: 2,
      src: "http://4.bp.blogspot.com/-cGTMAJpv9X8/Ue_aHjVTunI/AAAAAAAAD1s/OkD24jyyA1M/s1600/Panjpeer+Rocks+Narh+Kahuta.jpg",
      alt: "Panjpeer Rocks Narh Kahuta landscape",
      category: "Landscape"
    },
    {
      id: 3,
      src: "https://wpassets.graana.com/blog/wp-content/uploads/2023/08/Panjperer-rock.jpg",
      alt: "Panjpeer Rock formation",
      category: "Nature"
    },
    {
      id: 4,
      src: "https://www.natureadventureclub.pk/wp-content/uploads/2025/07/Panjpeer-Rock-Travel.jpg",
      alt: "Mountain hiking adventure",
      category: "Hiking"
    },
    {
      id: 5,
      src: "https://i0.wp.com/www.nadiyanajib.com/wp-content/uploads/2018/09/IMG_0081.jpg?fit=957%2C718&ssl=1",
      alt: "Beautiful rock formations",
      category: "Geology"
    },
    {
      id: 6,
      src: "https://www.natureadventureclub.pk/wp-content/uploads/2025/07/Panjpeer-Rock-Travel.jpg",
      alt: "Hiking in Pakistan mountains",
      category: "Adventure"
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Group images by category for filtering
  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Explore Panjpeer Narh Gallery
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Discover the breathtaking beauty of Kahuta Narh through our collection of stunning photographs 
            showcasing its unique landscapes and adventurous trails.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl cursor-pointer bg-gray-800"
              onClick={() => openModal(image)}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                    <span className="text-xs sm:text-sm text-blue-300 font-semibold mb-1 block">
                      {image.category}
                    </span>
                    <p className="text-white text-sm sm:text-base font-medium line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-50 rounded-full p-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 bg-white text-gray-900 rounded-full p-2 sm:p-3 z-10 hover:bg-gray-200 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-4 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {selectedImage.alt}
                </h3>
                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedImage.category}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile-specific styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .aspect-\\[4\\/3\\] {
            aspect-ratio: 4/3;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;