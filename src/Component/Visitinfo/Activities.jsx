import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activities = [
    { 
      id: 1,
      name: "Trekking", 
      icon: "🥾", 
      description: "Explore scenic trails through rugged terrain. Perfect for adventure enthusiasts who enjoy challenging paths and natural beauty.",
      difficulty: "Moderate to Difficult",
      duration: "2-6 hours",
      bestSeason: "October to March",
      tips: [
        "Wear comfortable waterproof hiking boots",
        "Carry at least 2 liters of water",
        "Use trekking poles for better balance",
        "Pack energy snacks and first aid kit",
        "Check weather forecast before departure"
      ],
      essentials: ["Hiking Boots", "Water Bottle", "First Aid", "Snacks", "Sun Protection", "Rain Gear"],
      images: [
        "https://i0.wp.com/embracesomeplace.com/wp-content/uploads/2020/04/DSC06289.jpg?w=1800&ssl=1",
        "https://cdn.pixabay.com/photo/2023/09/20/05/20/hiking-trail-8263881_1280.jpg",
        "https://thumbs.dreamstime.com/b/forest-hike-trail-hiker-woman-walking-autumn-fall-nature-background-season-hiking-active-people-lifestyle-wearing-backpack-193896791.jpg",
        "https://i0.wp.com/embracesomeplace.com/wp-content/uploads/2020/04/DSC06289.jpg?w=1800&ssl=1"
      ],
      contact: "Adventure Guide: 0300-1234567"
    },
    { 
      id: 2,
      name: "Mountain Hiking", 
      icon: "⛰️", 
      description: "Challenge yourself with high-altitude mountain trails offering breathtaking panoramic views of the surrounding valleys.",
      difficulty: "Difficult",
      duration: "4-8 hours",
      bestSeason: "March to June",
      tips: [
        "Follow marked trails only - do not wander off",
        "Check weather forecast before starting",
        "Start early to avoid afternoon heat",
        "Hike with a partner or group for safety",
        "Acclimatize properly for high altitude"
      ],
      essentials: ["Map & Compass", "Layered Clothing", "Headlamp", "Emergency Whistle", "Extra Food", "GPS Device"],
      images: [
        "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/05/featured-hiking.jpg",
        "https://cdn.pixabay.com/photo/2023/09/20/05/20/hiking-trail-8263881_1280.jpg",
        "https://thumbs.dreamstime.com/b/forest-hike-trail-hiker-woman-walking-autumn-fall-nature-background-season-hiking-active-people-lifestyle-wearing-backpack-193896791.jpg",
        "https://i0.wp.com/embracesomeplace.com/wp-content/uploads/2020/04/DSC06289.jpg?w=1800&ssl=1"
      ],
      contact: "Mountain Guide: 0300-2345678"
    },
    { 
      id: 3,
      name: "Nature Photography", 
      icon: "📸", 
      description: "Capture stunning landscapes, wildlife, and natural beauty with professional photography opportunities at every turn.",
      difficulty: "Easy",
      duration: "Flexible",
      bestSeason: "Year Round",
      tips: [
        "Golden hours (sunrise & sunset) are best for photos",
        "Use a tripod for stable shots",
        "Experiment with different angles and perspectives",
        "Respect wildlife - maintain safe distance",
        "Protect your equipment from dust and moisture"
      ],
      essentials: ["Camera", "Tripod", "Extra Batteries", "Lens Cloth", "Memory Cards", "Lens Filters"],
      images: [
        "https://cdn.pixabay.com/photo/2023/09/20/05/20/hiking-trail-8263881_1280.jpg",
        "https://cdn.pixabay.com/photo/2023/09/20/05/20/hiking-trail-8263881_1280.jpg",
        "https://thumbs.dreamstime.com/b/forest-hike-trail-hiker-woman-walking-autumn-fall-nature-background-season-hiking-active-people-lifestyle-wearing-backpack-193896791.jpg",
        "https://i0.wp.com/embracesomeplace.com/wp-content/uploads/2020/04/DSC06289.jpg?w=1800&ssl=1"
      ],
      contact: "Photography Guide: 0300-3456789"
    },
    { 
      id: 4,
      name: "Bird Watching", 
      icon: "🦅", 
      description: "Observe diverse bird species in their natural mountain habitat. Perfect for nature lovers and ornithology enthusiasts.",
      difficulty: "Easy",
      duration: "2-4 hours",
      bestSeason: "Winter (November-February)",
      tips: [
        "Bring binoculars for distant views",
        "Wear muted colors to blend in with nature",
        "Stay quiet and move slowly",
        "Keep a bird identification guide",
        "Record your sightings in a notebook"
      ],
      essentials: ["Binoculars", "Bird Guide", "Notebook", "Camera", "Comfortable Chair", "Field Guide"],
      images: [
        "https://data.1freewallpapers.com/download/saffron-finch-yellow-bird-is-sitting-on-purple-flower-4k-birds.jpg",
        "https://cdn.wallpapersafari.com/64/10/VpymqY.jpg",
        "https://static.vecteezy.com/system/resources/previews/022/655/829/large_2x/colorful-bird-on-a-background-of-nature-3d-illustration-free-photo.jpg",
        "https://cdn.wallpapersafari.com/64/10/VpymqY.jpg"
      ],
      contact: "Birding Expert: 0300-4567890"
    },
    { 
      id: 5,
      name: "Camping", 
      icon: "🏕️", 
      description: "Experience nature up close with overnight stays in designated camping areas under the starry sky.",
      difficulty: "Moderate",
      duration: "Overnight",
      bestSeason: "Spring & Autumn",
      tips: [
        "Set up camp before dark",
        "Keep food stored away from wildlife",
        "Follow leave-no-trace principles",
        "Check for camping permits if required",
        "Choose level ground for tent setup"
      ],
      essentials: ["Tent", "Sleeping Bag", "Cooking Gear", "Flashlight", "Warm Clothes", "Insect Repellent"],
      images: [
        "https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Camping/Sleeping%20Bags/Camping%20sleeping%20bags%20(inside%20REI%20Grand%20Hut%206%20tent).jpg",
        "https://koa.com/blog/images/sleeping-bag-tent.jpg?preset=blogPhoto",
        "https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Camping/Sleeping%20Bags/Camping%20sleeping%20bags%20(inside%20REI%20Grand%20Hut%206%20tent).jpg",
        "https://koa.com/blog/images/sleeping-bag-tent.jpg?preset=blogPhoto"
      ],
      contact: "Camping Coordinator: 0300-5678901"
    },
    { 
      id: 6,
      name: "Sunrise Viewing", 
      icon: "🌅", 
      description: "Witness breathtaking sunrise views from our special viewing points with panoramic mountain vistas.",
      difficulty: "Easy",
      duration: "1-2 hours",
      bestSeason: "Year Round",
      tips: [
        "Arrive at least 30 minutes before sunrise",
        "Bring warm clothing - mornings can be chilly",
        "Check sunrise timing in advance",
        "Reserve your spot early during weekends",
        "Bring a thermos with hot beverage"
      ],
      essentials: ["Warm Jacket", "Thermos", "Camera", "Blanket", "Headlamp", "Tripod"],
      images: [
        "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/05/featured-hiking.jpg",
        "https://cdn.pixabay.com/photo/2023/09/20/05/20/hiking-trail-8263881_1280.jpg",
        "https://thumbs.dreamstime.com/b/forest-hike-trail-hiker-woman-walking-autumn-fall-nature-background-season-hiking-active-people-lifestyle-wearing-backpack-193896791.jpg",
        "https://i0.wp.com/embracesomeplace.com/wp-content/uploads/2020/04/DSC06289.jpg?w=1800&ssl=1"
      ],
      contact: "View Point Guide: 0300-6789012"
    }
  ];

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setSelectedImageIndex(0);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore scrolling
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setSelectedActivity(null);
      setSelectedImageIndex(0);
    }, 300);
  };

  const nextImage = () => {
    if (selectedActivity) {
      setSelectedImageIndex((prev) => 
        prev === selectedActivity.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedActivity) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedActivity.images.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen || !selectedActivity) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedActivity]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Header - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 px-2"
      >
        <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl">⭐</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-2">
          Adventure Activities
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-lg max-w-2xl mx-auto px-2">
          Tap on any activity to explore details, tips, and multiple images
        </p>
      </motion.div>

      {/* Activities Grid - Responsive */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-1">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 active:scale-95 cursor-pointer"
            onClick={() => openModal(activity)}
          >
            <div className="relative overflow-hidden h-36 sm:h-48 md:h-52">
              <img 
                src={activity.images[0]} 
                alt={activity.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                  {activity.difficulty}
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg sm:text-xl md:text-2xl">{activity.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">{activity.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{activity.duration}</p>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                {activity.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs sm:text-sm font-medium truncate max-w-[50%]">
                  {activity.bestSeason}
                </span>
                <button className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 active:scale-95">
                  <span className="hidden xs:inline">Details</span>
                  <span className="xs:hidden">View</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Details Modal - Mobile Optimized */}
      <AnimatePresence>
        {isModalOpen && selectedActivity && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl w-full max-w-full sm:max-w-2xl md:max-w-4xl max-h-[90vh] sm:max-h-[95vh] overflow-hidden flex flex-col"
                style={{
                  height: isMobile ? '90vh' : 'auto'
                }}
              >
                {/* Modal Header - Fixed for mobile */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-green-500 to-emerald-500 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl md:text-3xl">{selectedActivity.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white truncate">
                          {selectedActivity.name}
                        </h2>
                        <div className="flex items-center gap-2 sm:gap-4 mt-1">
                          <span className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white">
                            {selectedActivity.difficulty}
                          </span>
                          <span className="text-white/90 text-xs sm:text-sm">{selectedActivity.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                      aria-label="Close modal"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {/* Image Gallery */}
                  <div className="mb-6 sm:mb-8">
                    <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
                      <img 
                        src={selectedActivity.images[selectedImageIndex]} 
                        alt={`${selectedActivity.name} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-48 sm:h-64 md:h-80 object-cover"
                        loading="lazy"
                      />
                      
                      {/* Navigation Buttons - Mobile Optimized */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                        aria-label="Previous image"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                        aria-label="Next image"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                        {selectedImageIndex + 1} / {selectedActivity.images.length}
                      </div>
                    </div>

                    {/* Thumbnail Gallery - Horizontal Scroll for Mobile */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {selectedActivity.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(index);
                          }}
                          className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index 
                              ? 'border-green-500 ring-1 sm:ring-2 ring-green-200' 
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img 
                            src={img} 
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Description</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{selectedActivity.description}</p>
                  </div>

                  {/* Details Grid - Stack on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-green-50 p-4 sm:p-5 rounded-lg sm:rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm sm:text-base">Activity Tips</span>
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {selectedActivity.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                            <span className="text-gray-700 text-xs sm:text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 sm:p-5 rounded-lg sm:rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm sm:text-base">Essential Items</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {selectedActivity.essentials.map((item, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg text-xs sm:text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Best Time & Duration - Stack on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Best Season</p>
                      <p className="font-bold text-base sm:text-lg text-green-700">{selectedActivity.bestSeason}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Duration</p>
                      <p className="font-bold text-base sm:text-lg text-blue-700">{selectedActivity.duration}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Difficulty</p>
                      <p className="font-bold text-base sm:text-lg text-purple-700">{selectedActivity.difficulty}</p>
                    </div>
                  </div>

                  {/* Contact & Booking */}
                  <div className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-xl border border-gray-200 mb-4">
                    <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Contact & Booking</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                      Interested in {selectedActivity.name.toLowerCase()}? Contact our guide for bookings and information.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500">Contact Person</p>
                          <p className="font-medium text-gray-800 truncate">{selectedActivity.contact}</p>
                        </div>
                        <button
                          onClick={() => window.open(`tel:${selectedActivity.contact.match(/\d+/g)?.join('') || ''}`)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors"
                        >
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer - Fixed for mobile */}
                <div className="sticky bottom-0 bg-gray-50 border-t p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={closeModal}
                      className="px-3 py-1.5 text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
                    >
                      Close
                    </button>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                        {selectedImageIndex + 1} of {selectedActivity.images.length} images
                      </span>
                      <button
                        onClick={nextImage}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors active:scale-95"
                      >
                        Next Image →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Info Section - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-xl sm:text-2xl">ℹ️</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-3">Activity Safety Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Safety Guidelines</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Always inform someone about your hiking plans
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Check weather conditions before departure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Stay hydrated and take regular breaks
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Required Permissions</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Some activities require advance booking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Guided tours recommended for difficult trails
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Camping permits available at information center
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contact - Floating Button for Mobile */}
    </div>
  );
}