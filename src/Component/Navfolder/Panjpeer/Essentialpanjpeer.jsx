import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EssentialPanjpeer = () => {
  const [activeCategory, setActiveCategory] = useState('Essentials');
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  // Categories data
  const categories = [
    { id: 'essentials', name: 'Essentials', icon: '⭐', key: 'essentials' },
    { id: 'family', name: 'Family friendly', icon: '👨‍👩‍👧‍👦', key: 'family' },
    { id: 'outdoors', name: 'Outdoors', icon: '🌳', key: 'outdoors' },
  ];

  // Cards data for each category
  const cardsData = {
    essentials: [
      {
        id: 1,
        title: 'Emergency Services',
        description: 'Hospitals, police stations, and emergency contacts in Panjpeer',
        pageLink: '/emergency-services',
        icon: '🏥',
        color: 'bg-red-50 border-red-100',
        textColor: 'text-red-700',
        details: '24/7 emergency services including medical facilities and security services'
      },
      {
        id: 2,
        title: 'Transportation',
        description: 'Local transport options and travel information',
        pageLink: '/transportation',
        icon: '🚗',
        color: 'bg-blue-50 border-blue-100',
        textColor: 'text-blue-700',
        details: 'Bus routes, taxi services, and transportation hubs in the area'
      },
      {
        id: 3,
        title: 'Accommodation',
        description: 'Hotels, guest houses, and lodging options',
        pageLink: '/accommodation',
        icon: '🏨',
        color: 'bg-green-50 border-green-100',
        textColor: 'text-green-700',
        details: 'Various accommodation options ranging from budget to luxury'
      },
      {
        id: 4,
        title: 'Food & Dining',
        description: 'Restaurants, cafes, and local cuisine',
        pageLink: '/food-dining',
        icon: '🍽️',
        color: 'bg-yellow-50 border-yellow-100',
        textColor: 'text-yellow-700',
        details: 'Local restaurants and dining experiences in Panjpeer'
      },
    ],
    family: [
      {
        id: 5,
        title: 'Parks & Playgrounds',
        description: 'Family-friendly parks and recreational areas',
        pageLink: '/parks-playgrounds',
        icon: '🌳',
        color: 'bg-green-50 border-green-100',
        textColor: 'text-green-700',
        details: 'Beautiful parks and playgrounds perfect for family outings'
      },
      {
        id: 6,
        title: 'Educational Centers',
        description: 'Schools, libraries, and learning centers',
        pageLink: '/educational-centers',
        icon: '📚',
        color: 'bg-purple-50 border-purple-100',
        textColor: 'text-purple-700',
        details: 'Educational facilities for children of all ages'
      },
      {
        id: 7,
        title: 'Family Activities',
        description: 'Fun activities for the whole family',
        pageLink: '/family-activities',
        icon: '🎪',
        color: 'bg-pink-50 border-pink-100',
        textColor: 'text-pink-700',
        details: 'Entertainment and activities suitable for all family members'
      },
      {
        id: 8,
        title: 'Child Care',
        description: 'Daycare and child care services',
        pageLink: '/child-care',
        icon: '👶',
        color: 'bg-teal-50 border-teal-100',
        textColor: 'text-teal-700',
        details: 'Reliable child care services and facilities'
      },
    ],
    outdoors: [
      {
        id: 9,
        title: 'Hiking Trails',
        description: 'Scenic trails and walking paths',
        pageLink: '/hiking-trails',
        icon: '🥾',
        color: 'bg-orange-50 border-orange-100',
        textColor: 'text-orange-700',
        details: 'Beautiful hiking trails with varying difficulty levels'
      },
      {
        id: 10,
        title: 'Adventure Sports',
        description: 'Exciting outdoor adventure activities',
        pageLink: '/adventure-sports',
        icon: '🚵',
        color: 'bg-indigo-50 border-indigo-100',
        textColor: 'text-indigo-700',
        details: 'Adventure sports and outdoor activities for thrill-seekers'
      },
      {
        id: 11,
        title: 'Nature Spots',
        description: 'Natural attractions and scenic viewpoints',
        pageLink: '/nature-spots',
        icon: '🏞️',
        color: 'bg-emerald-50 border-emerald-100',
        textColor: 'text-emerald-700',
        details: 'Breathtaking natural landscapes and viewpoints'
      },
      {
        id: 12,
        title: 'Camping Sites',
        description: 'Camping locations and facilities',
        pageLink: '/camping-sites',
        icon: '🏕️',
        color: 'bg-amber-50 border-amber-100',
        textColor: 'text-amber-700',
        details: 'Designated camping areas with necessary facilities'
      },
    ],
  };

  // Get active category key
  const getActiveCategoryKey = () => {
    const category = categories.find(cat => cat.name === activeCategory);
    return category ? category.key : 'essentials';
  };

  // Handle card click - opens modal
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Handle card title click - navigates to page
  const handleTitleClick = (card, e) => {
    e.stopPropagation(); // Stop modal from opening
    navigate(card.pageLink);
  };

  // Close card details
  const closeCardDetails = () => {
    setSelectedCard(null);
  };

  // Handle "View Full Page" button click
  const handleViewFullPage = () => {
    if (selectedCard) {
      navigate(selectedCard.pageLink);
      closeCardDetails();
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        {/* Header - Compact */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
            Essential <span className="text-blue-600">Panjpeer</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-4 max-w-2xl mx-auto">
            Discover the best of Panjpeer. Pick a category to filter your recommendations.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.name);
                  setSelectedCard(null);
                }}
                className={`w-full md:w-auto flex items-center justify-center md:justify-start gap-2 px-4 py-3 md:px-5 md:py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-semibold text-sm md:text-base">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {cardsData[getActiveCategoryKey()]?.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`${card.color} border rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group min-h-[180px] flex flex-col`}
            >
              {/* Card Icon */}
              <div className={`w-12 h-12 rounded-lg ${card.textColor} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>

              {/* Card Title as Clickable Link */}
              <h3 
                onClick={(e) => handleTitleClick(card, e)}
                className={`text-base md:text-lg font-bold mb-1 ${card.textColor} cursor-pointer hover:underline hover:underline-offset-2 transition-all duration-200 line-clamp-1`}
              >
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-gray-600 text-xs md:text-sm mb-3 leading-relaxed line-clamp-2 flex-grow">
                {card.description}
              </p>

              {/* View Details Button - Small */}
              <div className="mt-auto">
                <span className={`inline-block text-xs ${card.textColor} font-medium`}>
                  Click to view details →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Card Details Modal */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-xl md:rounded-2xl max-w-md w-full p-5 md:p-6 shadow-2xl animate-slideUp max-h-[85vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg ${selectedCard.color} flex items-center justify-center text-2xl`}>
                    {selectedCard.icon}
                  </div>
                  <div>
                    <h2 
                      onClick={() => navigate(selectedCard.pageLink)}
                      className={`text-lg md:text-xl font-bold ${selectedCard.textColor} mb-1 cursor-pointer hover:underline hover:underline-offset-2 transition-all duration-200`}
                    >
                      {selectedCard.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{selectedCard.description}</p>
                  </div>
                </div>
                <button
                  onClick={closeCardDetails}
                  className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Details</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedCard.details}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
            
                <button
                  onClick={closeCardDetails}
                  className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-xs md:text-sm"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          
          .line-clamp-1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        `}</style>
      </div>
    </div>
  );
};

export default EssentialPanjpeer;