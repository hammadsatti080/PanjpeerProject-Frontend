import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      id: 1,
      question: "Are kids allowed to visit?",
      answer: "Yes, children are welcome but must be supervised at all times by adults. We recommend activities suitable for children's age and physical ability.",
      category: "Visitors",
      icon: "👶"
    },
    { 
      id: 2,
      question: "What is the best time for photography?",
      answer: "Early morning (sunrise) and late afternoon (golden hour) provide the most spectacular lighting. Overcast days are also excellent for landscape photography with even lighting.",
      category: "Activities",
      icon: "📸"
    },
    { 
      id: 3,
      question: "Is overnight stay allowed?",
      answer: "Yes, overnight stays are permitted only in designated camping areas with prior booking. Camping permits are required and can be obtained from our information center.",
      category: "Accommodation",
      icon: "🏕️"
    },
    { 
      id: 4,
      question: "Is food available on site?",
      answer: "Limited food services including snacks, beverages, and local cuisine are available at our food court. Visitors are also welcome to bring their own food and drinks.",
      category: "Facilities",
      icon: "🍔"
    },
    { 
      id: 5,
      question: "What is the difficulty level of hiking trails?",
      answer: "We offer trails of varying difficulty levels: Easy (suitable for beginners), Moderate (some elevation), and Difficult (steep climbs). Guides are recommended for difficult trails.",
      category: "Activities",
      icon: "🥾"
    },
    { 
      id: 6,
      question: "Are pets allowed?",
      answer: "Small pets on leash are allowed in designated areas only. Owners must clean up after their pets. Aggressive breeds are not permitted for safety reasons.",
      category: "Visitors",
      icon: "🐕"
    },
    { 
      id: 7,
      question: "What safety measures are in place?",
      answer: "We have 24/7 security patrol, emergency medical assistance, marked trails, safety barriers at viewpoints, and regular weather monitoring for visitor safety.",
      category: "Safety",
      icon: "🛡️"
    },
    { 
      id: 8,
      question: "Is there parking available?",
      answer: "Yes, ample parking is available with separate sections for bikes, cars, and large vehicles. Parking is secure with CCTV surveillance and attendants.",
      category: "Facilities",
      icon: "🚗"
    },
    { 
      id: 9,
      question: "Do I need to book in advance?",
      answer: "Weekday visits usually don't require booking. However, weekends, holidays, and guided tours should be booked in advance through our website or phone.",
      category: "Booking",
      icon: "📅"
    },
    { 
      id: 10,
      question: "What should I bring for hiking?",
      answer: "Essential items include: comfortable hiking shoes, water bottle, sun protection, first aid kit, weather-appropriate clothing, and mobile phone with power bank.",
      category: "Activities",
      icon: "🎒"
    },
    { 
      id: 11,
      question: "Is the area wheelchair accessible?",
      answer: "Partially accessible. The main viewing platform, parking, and food court are wheelchair accessible. However, hiking trails are not suitable for wheelchairs.",
      category: "Accessibility",
      icon: "♿"
    },
    { 
      id: 12,
      question: "What are the operating hours?",
      answer: "We are open daily from 6:00 AM to 8:00 PM. Some facilities like food court close earlier at 7:00 PM. Overnight camping is available in designated areas.",
      category: "Timings",
      icon: "⏰"
    }
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: "❓" },
    { id: "activities", name: "Activities", icon: "🥾" },
    { id: "facilities", name: "Facilities", icon: "🏪" },
    { id: "visitors", name: "Visitors", icon: "👥" },
    { id: "safety", name: "Safety", icon: "🛡️" },
    { id: "booking", name: "Booking", icon: "📅" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category.toLowerCase() === selectedCategory);

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'activities': return 'from-green-500 to-emerald-500';
      case 'facilities': return 'from-blue-500 to-cyan-500';
      case 'visitors': return 'from-purple-500 to-pink-500';
      case 'safety': return 'from-red-500 to-orange-500';
      case 'booking': return 'from-yellow-500 to-amber-500';
      case 'accessibility': return 'from-indigo-500 to-purple-500';
      case 'timings': return 'from-gray-500 to-blue-gray-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
          <span className="text-3xl">❓</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Find answers to common questions about visiting Panj Peer Kahuta Trail
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* FAQ Count */}
      <div className="mb-6 text-center">
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
          {filteredFAQs.length} Questions Found
        </span>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className={`rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${
              openIndex === faq.id ? 'ring-2 ring-blue-500' : ''
            }`}>
              {/* FAQ Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-5 sm:p-6 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center gap-4 focus:outline-none"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(faq.category)} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg sm:text-xl">{faq.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-left mb-1">
                      {faq.question}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        faq.category.toLowerCase() === 'activities' ? 'bg-green-100 text-green-600' :
                        faq.category.toLowerCase() === 'facilities' ? 'bg-blue-100 text-blue-600' :
                        faq.category.toLowerCase() === 'visitors' ? 'bg-purple-100 text-purple-600' :
                        faq.category.toLowerCase() === 'safety' ? 'bg-red-100 text-red-600' :
                        faq.category.toLowerCase() === 'booking' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === faq.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rotate-180' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* FAQ Answer */}
              <AnimatePresence>
                {openIndex === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-600">💡</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                          {faq.id === 1 && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-700">
                                <span className="font-bold">Child Safety Tip:</span> Children under 12 must be accompanied by adults at all times.
                              </p>
                            </div>
                          )}
                          {faq.id === 3 && (
                            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-sm text-green-700">
                                <span className="font-bold">Camping Booking:</span> Contact our camping coordinator at 0300-1234567
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl">📞</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Still have questions?</h3>
              <p className="text-gray-600">Our team is here to help you 24/7</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: 0300-0000000
            </button>
          
          </div>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600">⏰</span>
            </div>
            <h4 className="font-bold text-gray-800">Quick Tip</h4>
          </div>
          <p className="text-sm text-gray-600">
            Arrive early to avoid crowds and enjoy the best views during sunrise.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600">📱</span>
            </div>
            <h4 className="font-bold text-gray-800">Mobile App</h4>
          </div>
          <p className="text-sm text-gray-600">
            Download our mobile app for real-time updates, maps, and bookings.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600">📋</span>
            </div>
            <h4 className="font-bold text-gray-800">Checklist</h4>
          </div>
          <p className="text-sm text-gray-600">
            Download our visitor checklist to ensure you don't forget anything.
          </p>
        </div>
      </motion.div>
    </div>
  );
}