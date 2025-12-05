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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            Essential <span className="text-blue-600">Panjpeer</span>
          </h1>
          <p className="text-gray-600 text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Discover the best of Panjpeer. Pick a category to filter your recommendations.
          </p>

          {/* Category Filter Buttons - Mobile: Vertical, Desktop: Horizontal */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mb-8 md:mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.name);
                  setSelectedCard(null);
                }}
                className={`w-full md:w-auto flex items-center justify-center md:justify-start gap-3 px-5 py-4 md:px-7 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <span className="text-2xl md:text-2xl">{category.icon}</span>
                <span className="font-semibold text-base md:text-lg">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {cardsData[getActiveCategoryKey()]?.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`${card.color} border-2 rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl md:hover:shadow-2xl group`}
            >
              {/* Card Icon */}
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${card.textColor} flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>

              {/* Card Title as Clickable Link */}
              <h3 
                onClick={(e) => handleTitleClick(card, e)}
                className={`text-lg md:text-xl font-bold mb-2 md:mb-3 ${card.textColor} cursor-pointer hover:underline hover:underline-offset-3 md:hover:underline-offset-4 transition-all duration-200`}
              >
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-gray-600 text-sm md:text-base mb-5 md:mb-6 leading-relaxed">
                {card.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(card.pageLink);
                  }}
                  className={`${card.textColor} font-semibold hover:underline flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-opacity-10 ${card.color.split(' ')[0]} transition-all duration-200 text-sm md:text-base`}
                >
                  View Full Page
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors text-xs md:text-sm text-center md:text-right">
                  Click card for preview →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Card Details Modal */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full p-5 md:p-10 shadow-2xl animate-slideUp max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0 mb-6 md:mb-8">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl ${selectedCard.color} flex items-center justify-center text-3xl md:text-4xl`}>
                    {selectedCard.icon}
                  </div>
                  <div className="flex-1">
                    <h2 
                      onClick={() => navigate(selectedCard.pageLink)}
                      className={`text-2xl md:text-3xl font-bold ${selectedCard.textColor} mb-1 md:mb-2 cursor-pointer hover:underline hover:underline-offset-3 md:hover:underline-offset-4 transition-all duration-200`}
                    >
                      {selectedCard.title}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">{selectedCard.description}</p>
                  </div>
                </div>
                <button
                  onClick={closeCardDetails}
                  className="self-end md:self-start text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Details</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {selectedCard.details}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={handleViewFullPage}
                  className={`${selectedCard.textColor} bg-gradient-to-r from-white to-white border-2 ${selectedCard.color.split(' ')[0].replace('bg-', 'border-')} font-semibold py-3 px-5 md:py-3 md:px-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base`}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Go to {selectedCard.title} Page
                </button>
                <button
                  onClick={closeCardDetails}
                  className="bg-gray-100 text-gray-700 font-semibold py-3 px-5 md:py-3 md:px-6 rounded-xl hover:bg-gray-200 transition-colors duration-300 text-sm md:text-base"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EssentialPanjpeer;