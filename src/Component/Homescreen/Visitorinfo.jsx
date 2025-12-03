import { motion } from 'framer-motion';
import { useState } from 'react';

const Visitorinfo = () => {
  const [activeTab, setActiveTab] = useState('essential');

  const visitorData = {
    essential: [
      {
        icon: "🕒",
        title: "Best Time to Visit",
        description: "March to November for pleasant weather",
        details: "Avoid monsoon season (July-August) due to slippery trails"
      },
      {
        icon: "⏱️",
        title: "Visiting Hours",
        description: "Sunrise to Sunset",
        details: "Recommended to start early morning to avoid afternoon heat"
      },
      {
        icon: "💰",
        title: "Entry Fee",
        description: "No Entry Fee",
        details: "Completely free for all visitors"
      },
      {
        icon: "🚗",
        title: "Parking Availability",
        description: "Limited parking available",
        details: "Free parking near the starting point of trails"
      }
    ],
    preparation: [
      {
        icon: "🎒",
        title: "What to Bring",
        description: "Essential hiking gear",
        details: "Water bottles, snacks, first aid kit, power bank, cash"
      },
      {
        icon: "👕",
        title: "Clothing",
        description: "Comfortable hiking clothes",
        details: "Wear layers, hiking shoes, hat, sunglasses"
      },
      {
        icon: "📱",
        title: "Connectivity",
        description: "Network availability",
        details: "Limited mobile network, download offline maps"
      },
      {
        icon: "⛽",
        title: "Fuel Stations",
        description: "Last fuel stop",
        details: "Fill up in Rawalpindi before heading to Kahuta"
      }
    ],
    safety: [
      {
        icon: "⚠️",
        title: "Important Tips",
        description: "Safety first",
        details: "Hire local guide for first-time visitors"
      },
      {
        icon: "🚑",
        title: "Emergency Services",
        description: "Medical facilities",
        details: "Nearest hospital in Rawalpindi (35km away)"
      },
      {
        icon: "📞",
        title: "Emergency Contacts",
        description: "Important numbers",
        details: "Local police: 15, Rescue 1122"
      },
      {
        icon: "🌧️",
        title: "Weather Alert",
        description: "Check forecast",
        details: "Avoid visiting during rain or extreme weather"
      }
    ],
    facilities: [
      {
        icon: "🏪",
        title: "Nearby Shops",
        description: "Basic supplies",
        details: "Small shops in Kahuta town for water and snacks"
      },
      {
        icon: "🍽️",
        title: "Food Options",
        description: "Eating facilities",
        details: "Carry your own food, limited restaurants available"
      },
      {
        icon: "🚻",
        title: "Restrooms",
        description: "Washroom facilities",
        details: "Basic facilities available at starting point"
      },
      {
        icon: "🏕️",
        title: "Accommodation",
        description: "Stay options",
        details: "Day trip recommended, hotels in Rawalpindi"
      }
    ]
  };

  const travelGuide = [
    {
      transport: "🚗 Private Car",
      time: "1-1.5 hours",
      route: "Rawalpindi → Kahuta → Narh",
      details: "Most convenient option"
    },
    {
      transport: "🚐 Local Van",
      time: "2 hours",
      route: "Rawalpindi Bus Stand → Kahuta",
      details: "Economical but crowded"
    },
    {
      transport: "🚖 Taxi/Ride Sharing",
      time: "1.5 hours",
      route: "Direct to location",
      details: "Book round trip in advance"
    }
  ];

  return (
    <section id="visitor-info" className="py-8 xs:py-10 sm:py-12 lg:py-16 bg-gray-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16 w-full"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 xs:mb-4 leading-tight px-2">
            Visitor Information
          </h2>
          <p className="text-gray-300 text-xs xs:text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Everything you need to know before visiting Kahuta Narh. Plan your trip with our 
            comprehensive guide covering essential information, safety tips, and travel details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 w-full">
          
          {/* Left Side - Tabs and Info Cards */}
          <div className="lg:col-span-2 w-full">
            
            {/* Fixed Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full mb-6 xs:mb-8"
            >
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-1 xs:gap-2 w-full">
                {Object.keys(visitorData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 xs:px-3 py-2.5 xs:py-3 rounded-lg transition-all duration-300 font-semibold text-xs xs:text-sm min-w-0 w-full touch-manipulation ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <span className="truncate block">
                      {tab === 'essential' && 'Essential'}
                      {tab === 'preparation' && 'Prep'}
                      {tab === 'safety' && 'Safety'}
                      {tab === 'facilities' && 'Facilities'}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info Cards Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 w-full"
            >
              {visitorData[activeTab].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-700 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 lg:p-6 hover:bg-gray-600 transition-all duration-300 cursor-pointer group active:scale-95 touch-manipulation w-full"
                >
                  <div className="flex items-start space-x-2 xs:space-x-3 sm:space-x-4 w-full">
                    <div className="text-xl xs:text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm xs:text-base sm:text-lg lg:text-xl mb-1 xs:mb-2 leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-300 font-semibold text-xs xs:text-sm sm:text-base mb-1 xs:mb-2 leading-tight">
                        {item.description}
                      </p>
                      <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 xs:mt-8 sm:mt-10 lg:mt-12 rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 lg:p-8 w-full"
            >
              <h3 className="text-white font-bold text-base xs:text-lg sm:text-xl lg:text-2xl mb-3 xs:mb-4 flex items-center">
                <span className="text-xl xs:text-2xl mr-2 xs:mr-3">💡</span>
                Pro Tips for Visitors
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                <div className="flex items-center text-white text-xs xs:text-sm sm:text-base">
                  <span className="mr-1 xs:mr-2 text-xs">✅</span> 
                  <span className="leading-tight">Start early to avoid crowds</span>
                </div>
                <div className="flex items-center text-white text-xs xs:text-sm sm:text-base">
                  <span className="mr-1 xs:mr-2 text-xs">✅</span> 
                  <span className="leading-tight">Carry sufficient water</span>
                </div>
                <div className="flex items-center text-white text-xs xs:text-sm sm:text-base">
                  <span className="mr-1 xs:mr-2 text-xs">✅</span> 
                  <span className="leading-tight">Wear proper hiking shoes</span>
                </div>
                <div className="flex items-center text-white text-xs xs:text-sm sm:text-base">
                  <span className="mr-1 xs:mr-2 text-xs">✅</span> 
                  <span className="leading-tight">Check weather forecast</span>
                </div>
                <div className="flex items-center text-white text-xs xs:text-sm sm:text-base">
                  <span className="mr-1 xs:mr-2 text-xs">✅</span> 
                  <span className="leading-tight">Inform someone about trip</span>
                </div>
                <div className="flex items-center text-white text-xs xs:text-sm sm:text-base">
                  <span className="mr-1 xs:mr-2 text-xs">✅</span> 
                  <span className="leading-tight">Carry a power bank</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Travel Guide */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8 w-full"
          >
            
            {/* Travel Guide Card */}
            <div className="bg-gray-700 rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 lg:p-8 w-full">
              <h3 className="text-white font-bold text-base xs:text-lg sm:text-xl lg:text-2xl mb-4 xs:mb-5 sm:mb-6 flex items-center">
                <span className="text-xl xs:text-2xl mr-2 xs:mr-3">🗺️</span>
                How to Reach
              </h3>
              
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-6">
                {travelGuide.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-600 rounded-lg p-3 xs:p-4 hover:bg-gray-500 transition-colors duration-300 active:scale-95 touch-manipulation w-full"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-lg xs:text-xl mr-2 xs:mr-3">{item.transport.split(' ')[0]}</span>
                      <h4 className="text-white font-semibold text-sm xs:text-base sm:text-lg leading-tight truncate">
                        {item.transport}
                      </h4>
                    </div>
                    <div className="flex items-center text-yellow-300 text-xs xs:text-sm sm:text-base mb-1 xs:mb-2">
                      <span className="mr-1 xs:mr-2">⏱️</span>
                      {item.time}
                    </div>
                    <p className="text-gray-300 text-xs xs:text-sm sm:text-base mb-1 xs:mb-2 leading-relaxed break-words">
                      <span className="text-blue-300 font-semibold">Route:</span> {item.route}
                    </p>
                    <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed break-words">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 xs:mt-5 sm:mt-6 p-3 xs:p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500">
                <p className="text-yellow-300 text-xs xs:text-sm sm:text-base text-center leading-relaxed break-words">
                  🚨 <strong>Important:</strong> Last 5km road might be rough. 
                  SUV recommended for comfortable journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Prevent horizontal scroll on mobile */
        @media (max-width: 640px) {
          body {
            overflow-x: hidden;
          }
        }
        
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Visitorinfo;