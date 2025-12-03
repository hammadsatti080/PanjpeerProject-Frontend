import { motion } from 'framer-motion';

const Location = () => {
  // Google Maps location for Kahuta Narh, Rawalpindi
  const handleViewOnMap = () => {
    const latitude = 33.3697;
    const longitude = 73.3612;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
    window.open(googleMapsUrl, '_blank');
  };

  // Function for How to Reach
  const handleHowToReach = () => {
    const latitude = 33.3697;
    const longitude = 73.3612;
    const googleMapsDirections = `https://www.google.com/maps/dir//${latitude},${longitude}`;
    window.open(googleMapsDirections, '_blank');
  };

  return (
    <section id="narh" className="py-8 sm:py-12 lg:py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Image - Mobile: First, Desktop: Second */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
              <img
                src="https://wpassets.graana.com/blog/wp-content/uploads/2023/08/Panjperer-rock.jpg"
                alt="Kahuta Narh - Scenic View"
                className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute -bottom-2 -right-2 bg-white text-gray-900 px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">Kahuta Narh</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Details - Mobile: Second, Desktop: First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Explore Kahuta Narh
            </h2>
            
            {/* Location Details */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base flex-1"><strong className="text-white">Location:</strong> Kahuta Narh, Rawalpindi</span>
              </div>
              
              <div className="flex items-start text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-sm sm:text-base flex-1"><strong className="text-white">Distance from Rawalpindi:</strong> ~35 km</span>
              </div>
              
              <div className="flex items-start text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm sm:text-base flex-1"><strong className="text-white">Travel Time:</strong> ~1 hour by road</span>
              </div>
              
              <div className="flex items-start text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm sm:text-base flex-1"><strong className="text-white">Altitude:</strong> ~1,200 meters</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed sm:leading-loose">
                Nestled in the scenic Kahuta region of Rawalpindi District, Kahuta Narh is a stunning 
                natural attraction known for its unique rock formations and breathtaking landscapes. 
                This picturesque destination offers a perfect escape into nature's tranquility.
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed sm:leading-loose">
                Ideal for hiking enthusiasts, photography lovers, and nature seekers, 
                Kahuta Narh provides a refreshing retreat from city life. The area is known 
                for its pleasant climate and stunning views of the surrounding hills and valleys.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <button 
                onClick={handleViewOnMap}
                className="bg-white text-gray-900 px-5 sm:px-6 py-3.5 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group active:scale-95 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl min-h-[50px] sm:min-h-0"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform group-hover:scale-110 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="whitespace-nowrap">View on Maps</span>
              </button>
              <button 
                onClick={handleHowToReach}
                className="border border-white text-white px-5 sm:px-6 py-3.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center group active:scale-95 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl min-h-[50px] sm:min-h-0"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform group-hover:scale-110 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="whitespace-nowrap">Get Directions</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Additional Mobile-optimized Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-12 lg:mt-16 bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8"
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
            Quick Location Guide
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-600 transition-colors duration-300">
              <div className="text-blue-400 mb-2 flex justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1">Best Time</h4>
              <p className="text-gray-300 text-xs sm:text-sm">March to November</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-600 transition-colors duration-300">
              <div className="text-green-400 mb-2 flex justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1">Difficulty</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Easy to Moderate</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-600 transition-colors duration-300">
              <div className="text-yellow-400 mb-2 flex justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1">Facilities</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Basic Amenities</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-600 transition-colors duration-300">
              <div className="text-red-400 mb-2 flex justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1">Activities</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Hiking, Photography</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 475px) {
          .xs\\:h-56 {
            height: 14rem;
          }
        }
        
        @media (max-width: 640px) {
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </section>
  );
};

export default Location;