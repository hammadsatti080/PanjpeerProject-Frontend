import React, { useState } from 'react';

const FAQcomponent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    {
      question: 'What are the essential services available in Panjpeer?',
      answer: 'Panjpeer offers all essential services including emergency medical facilities (hospitals, clinics), police stations, fire stations, 24/7 pharmacies, transportation hubs, banks, ATMs, postal services, and government offices. We ensure all essential amenities are within easy reach for residents and visitors.',
      category: 'Essentials'
    },
    {
      question: 'What family-friendly activities are available?',
      answer: 'Panjpeer has numerous family-friendly activities: parks and playgrounds, educational centers, museums, family restaurants, movie theaters, recreational centers, and special family events throughout the year. We also have dedicated child care services and family activity centers.',
      category: 'Family'
    },
    {
      question: 'What outdoor activities can I enjoy in Panjpeer?',
      answer: 'Outdoor enthusiasts can enjoy hiking trails, adventure sports (rock climbing, zip-lining), nature walks, camping sites, picnic spots, bird watching, cycling trails, and water activities. We have well-maintained trails for all skill levels and guided adventure tours.',
      category: 'Outdoors'
    },
    {
      question: 'What types of accommodations are available?',
      answer: 'Panjpeer offers diverse accommodation options: luxury hotels & resorts (₹8,000+/night), mid-range hotels (₹3,000-₹8,000/night), budget hotels (₹1,000-₹3,000/night), homestays, guest houses, mountain cottages, and camping sites. All accommodations are verified for quality and safety.',
      category: 'Accommodation'
    },
    {
      question: 'What food services and dining options are available?',
      answer: 'We have a wide range of dining options: fine dining restaurants (multi-cuisine, ₹₹₹₹), casual dining (₹₹-₹₹₹), cafes & coffee shops, street food stalls (local delicacies, ₹), fast food chains, vegetarian/vegan restaurants, family restaurants, and food delivery services.',
      category: 'Food'
    },
    {
      question: 'How do I book accommodations?',
      answer: 'You can book directly through our website, contact the property via phone/email, or use popular booking platforms. We recommend booking in advance during peak season (November-February). Most places offer online booking with secure payment options.',
      category: 'Booking'
    },
    {
      question: 'What is the best time to visit Panjpeer?',
      answer: 'The best time is from March to June (spring/summer) and September to November (autumn). These periods offer pleasant weather perfect for outdoor activities. Monsoon season (July-August) has lush greenery but occasional rain.',
      category: 'Visit'
    },
    {
      question: 'Are there any safety measures for tourists?',
      answer: 'Yes, Panjpeer has comprehensive safety measures: 24/7 tourist police, emergency helplines, well-lit public areas, first aid stations, mountain rescue teams, weather alerts, and local guides.',
      category: 'Safety'
    },
    {
      question: 'What transportation options are available?',
      answer: 'Transport options include: local buses, taxis, auto-rickshaws, rental cars, scooters, bicycles, and walking trails. For nearby attractions, we have shared jeeps and guided tour vehicles.',
      category: 'Transport'
    },
    {
      question: 'Can I find vegetarian/vegan food options easily?',
      answer: 'Absolutely! Panjpeer has numerous vegetarian and vegan restaurants. Most restaurants offer vegetarian sections in their menus. We also have dedicated vegan cafes and health food stores.',
      category: 'Food'
    },
    {
      question: 'Are there any cultural events or festivals?',
      answer: 'Panjpeer hosts various cultural events: Spring Festival (March), Summer Music Festival (May), Autumn Food Festival (October), Winter Carnival (December), and local religious festivals.',
      category: 'Events'
    },
    {
      question: 'What should I pack for my trip to Panjpeer?',
      answer: 'Pack according to season: Summer - light clothes, sunscreen, hat; Monsoon - raincoat, waterproof shoes; Winter - warm clothes, thermal wear, gloves, hat. Always carry comfortable walking shoes.',
      category: 'Packing'
    }
  ];

  const categories = ['All', 'Essentials', 'Family', 'Outdoors', 'Accommodation', 'Food', 'Booking', 'Visit', 'Safety', 'Transport', 'Events', 'Packing'];

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Mobile category scroll functionality
  const scrollCategories = (direction) => {
    const container = document.querySelector('.categories-container');
    if (container) {
      const scrollAmount = 200;
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-4 md:py-12 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 px-2">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-gray-600 text-base md:text-xl max-w-2xl mx-auto">
            Find answers to common questions about Panjpeer
          </p>
        </div>

        {/* Category Filter - Mobile Enhanced */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">Browse by Category</h2>
            <span className="text-sm text-gray-500 hidden md:block">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
          </div>
          
          {/* Mobile Category Navigation with Scroll Buttons */}
          <div className="relative md:hidden">
            <div className="categories-container flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Scroll indicators */}
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          </div>

          {/* Desktop Category Grid */}
          <div className="hidden md:flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile result count */}
          <div className="mt-3 md:hidden text-sm text-gray-500">
            Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} in {activeCategory}
          </div>
        </div>

        {/* FAQ List - Mobile Optimized */}
        <div className="space-y-3 md:space-y-6">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              {/* Question Header - Mobile Optimized */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 md:p-6 focus:outline-none focus:ring-1 focus:ring-blue-200 rounded-xl"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    {/* Category Badge - Smaller on Mobile */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        faq.category === 'Essentials' ? 'bg-red-100 text-red-700' :
                        faq.category === 'Family' ? 'bg-green-100 text-green-700' :
                        faq.category === 'Outdoors' ? 'bg-orange-100 text-orange-700' :
                        faq.category === 'Accommodation' ? 'bg-purple-100 text-purple-700' :
                        faq.category === 'Food' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {faq.category}
                      </span>
                    </div>
                    
                    {/* Question Text */}
                    <h3 className="text-base md:text-xl font-semibold text-gray-800 leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Expand Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className={`w-5 h-5 md:w-6 md:h-6 text-blue-500 transition-transform duration-300 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer Content - Mobile Optimized */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100">
                  <div className="pt-3 md:pt-5">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                    
                    {/* Additional Tips - Mobile Responsive */}
                    {(faq.category === 'Accommodation' || faq.category === 'Food') && (
                      <div className="mt-3 p-3 rounded-lg text-sm ${
                        faq.category === 'Accommodation' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'
                      }">
                        <p className="flex items-start gap-2">
                          <span className="text-base mt-0.5">
                            {faq.category === 'Accommodation' ? '💡' : '🍽️'}
                          </span>
                          <span>
                            <strong className="font-semibold">
                              {faq.category === 'Accommodation' ? 'Tip:' : 'Local Specialty:'}
                            </strong>{' '}
                            {faq.category === 'Accommodation' 
                              ? 'Book 2 weeks in advance during peak season.' 
                              : 'Try traditional Panjpeer special dishes.'}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
            <p className="text-gray-500 text-sm md:text-base">Try selecting a different category</p>
          </div>
        )}

       
       
       
      </div>

      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FAQcomponent;