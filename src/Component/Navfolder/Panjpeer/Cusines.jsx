import React, { useState } from 'react';

const CuisineDining = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Dish categories
  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'biryani', name: 'Biryani', icon: '🍛' },
    { id: 'karahi', name: 'Karahi', icon: '🥘' },
    { id: 'bbq', name: 'BBQ', icon: '🔥' },
    { id: 'curry', name: 'Curries', icon: '🥣' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' }
  ];

  // 15 Pakistani dishes
  const dishes = [
    { id: 1, name: "Chicken Biryani", category: "biryani", description: "Fragrant rice with chicken and spices", price: 1200, currency: "PKR", prepTime: "30 mins", spicyLevel: "🌶️🌶️", serves: "2-3", vegetarian: false, traditional: true },
    { id: 2, name: "Beef Nihari", category: "curry", description: "Slow-cooked beef in spicy gravy", price: 1400, currency: "PKR", prepTime: "4-5 hours", spicyLevel: "🌶️🌶️🌶️", serves: "3-4", vegetarian: false, traditional: true },
    { id: 3, name: "Chicken Karahi", category: "karahi", description: "Chicken cooked in wok with tomatoes", price: 1100, currency: "PKR", prepTime: "25 mins", spicyLevel: "🌶️🌶️", serves: "2-3", vegetarian: false, popular: true },
    { id: 4, name: "Seekh Kebabs", category: "bbq", description: "Minced beef kebabs on skewers", price: 800, currency: "PKR", prepTime: "20 mins", spicyLevel: "🌶️🌶️", serves: "4-6", vegetarian: false },
    { id: 5, name: "Chapli Kabab", category: "bbq", description: "Spiced beef patties", price: 750, currency: "PKR", prepTime: "15 mins", spicyLevel: "🌶️🌶️🌶️", serves: "2", vegetarian: false, traditional: true },
    { id: 6, name: "Haleem", category: "curry", description: "Slow-cooked lentils and meat", price: 900, currency: "PKR", prepTime: "6-7 hours", spicyLevel: "🌶️", serves: "3-4", vegetarian: true },
    { id: 7, name: "Fish Karahi", category: "karahi", description: "Fish in spicy tomato gravy", price: 1300, currency: "PKR", prepTime: "20 mins", spicyLevel: "🌶️🌶️", serves: "2-3", vegetarian: false },
    { id: 8, name: "Mutton Pulao", category: "biryani", description: "Rice with tender mutton", price: 1500, currency: "PKR", prepTime: "40 mins", spicyLevel: "🌶️", serves: "3-4", vegetarian: false },
    { id: 9, name: "Chicken Tikka", category: "bbq", description: "Grilled chicken in spices", price: 1000, currency: "PKR", prepTime: "30 mins", spicyLevel: "🌶️🌶️", serves: "8-10", vegetarian: false },
    { id: 10, name: "Kheer", category: "desserts", description: "Rice pudding with dry fruits", price: 400, currency: "PKR", prepTime: "45 mins", spicyLevel: "", serves: "4", vegetarian: true },
    { id: 11, name: "Gajar ka Halwa", category: "desserts", description: "Carrot pudding", price: 450, currency: "PKR", prepTime: "1 hour", spicyLevel: "", serves: "4", vegetarian: true },
    { id: 12, name: "Lassi", category: "drinks", description: "Yogurt-based drink", price: 250, currency: "PKR", prepTime: "5 mins", spicyLevel: "", serves: "1", vegetarian: true },
    { id: 13, name: "Chana Masala", category: "curry", description: "Chickpeas in spicy gravy", price: 650, currency: "PKR", prepTime: "25 mins", spicyLevel: "🌶️🌶️", serves: "2-3", vegetarian: true },
    { id: 14, name: "Beef Boti", category: "bbq", description: "Grilled beef cubes", price: 950, currency: "PKR", prepTime: "30 mins", spicyLevel: "🌶️🌶️🌶️", serves: "2", vegetarian: false },
    { id: 15, name: "Zarda", category: "desserts", description: "Sweet yellow rice", price: 500, currency: "PKR", prepTime: "35 mins", spicyLevel: "", serves: "4", vegetarian: true }
  ];

  const contactInfo = {
    phone: "+92 300 1234567",
    whatsapp: "+92 300 1234567",
    email: "dining@panjpeer.com",
    address: "Panjpeer Hills, Main Bazaar",
    timing: "11 AM - 12 AM",
    chefContact: "+92 300 1234568",
    deliveryContact: "+92 300 1234569"
  };

  // Filter dishes
  const filteredDishes = selectedCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  // Dish detail modal
  const DishDetailModal = () => {
    if (!selectedDish) return null;

    const calculateTotal = () => selectedDish.price * quantity;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto mt-20">
        <div className="bg-white w-full min-h-screen sm:min-h-0 sm:rounded-2xl sm:max-w-4xl sm:max-h-[90vh] sm:overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-2">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDish.name}</h2>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {selectedDish.category.toUpperCase()}
                  </span>
                  {selectedDish.traditional && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      🏔️ Traditional
                    </span>
                  )}
                  {selectedDish.vegetarian && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      🌿 Vegetarian
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedDish(null)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Mobile View - Stacked */}
            <div className="sm:hidden space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <div className="text-xs text-gray-600">Price</div>
                  <div className="text-xl font-bold text-blue-700">{selectedDish.currency} {selectedDish.price}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-xs text-gray-600">Serves</div>
                  <div className="text-xl font-bold text-green-700">{selectedDish.serves}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedDish.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Prep Time</div>
                  <div className="font-medium">{selectedDish.prepTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Spicy Level</div>
                  <div className="font-medium">{selectedDish.spicyLevel || "Not Spicy"}</div>
                </div>
              </div>

            </div>

            {/* Desktop View - Grid */}
            <div className="hidden sm:grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🍽️</div>
                    <p className="text-gray-500">{selectedDish.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Price</div>
                    <div className="text-2xl font-bold text-blue-700">{selectedDish.currency} {selectedDish.price}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Prep Time</div>
                    <div className="text-xl font-bold text-green-700">{selectedDish.prepTime}</div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedDish.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Spicy Level</div>
                      <div className="font-medium">{selectedDish.spicyLevel || "Not Spicy"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Serves</div>
                      <div className="font-medium">{selectedDish.serves}</div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Global CSS to prevent horizontal scrolling */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          max-width: 100%;
          position: relative;
        }
        
        /* Prevent horizontal overflow */
        .no-horizontal-scroll {
          overflow-x: hidden;
          width: 100%;
        }
        
        /* Fix for mobile viewport */
        @media (max-width: 640px) {
          body {
            touch-action: pan-y;
          }
          
          /* Prevent text overflow */
          .truncate-mobile {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Fix for flex items */
          .flex-no-overflow {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="no-horizontal-scroll py-4 px-3 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10 px-2">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 truncate-mobile">
              Our <span className="text-orange-600">Cuisine</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg">
              Authentic Pakistani flavors with traditional recipes
            </p>
          </div>

          {/* Category Tabs - Fixed horizontal scroll */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Menu Categories</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-orange-100 border border-orange-300'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Dishes */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDishes.map(dish => (
                  <div
                    key={dish.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                        <div className="flex-1 mb-2 sm:mb-0">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{dish.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{dish.prepTime}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-xs">{dish.spicyLevel || "Not Spicy"}</span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xl font-bold text-orange-600">{dish.currency} {dish.price}</div>
                          <div className="text-xs text-gray-500">{dish.serves}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex gap-1">
                          {dish.vegetarian && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              🌿 Veg
                            </span>
                          )}
                          {dish.traditional && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              🏔️ Traditional
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedDish(dish)}
                          className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 w-full sm:w-auto"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Contact */}
            <div className="w-full lg:w-80 flex-shrink-0">
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-4 mb-6 border border-blue-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contact</h2>
                
                <div className="space-y-3">
                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600">📞</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="font-bold text-gray-900 text-sm truncate">{contactInfo.phone}</div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">💬</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500">WhatsApp</div>
                      <div className="font-bold text-gray-900 text-sm truncate">{contactInfo.whatsapp}</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600">📧</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="font-bold text-gray-900 text-sm truncate">{contactInfo.email}</div>
                    </div>
                  </div>
                </div>

                {/* Address & Timing */}
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Address</div>
                    <div className="font-medium text-gray-900 text-sm">{contactInfo.address}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Timing</div>
                    <div className="font-medium text-gray-900 text-sm">{contactInfo.timing}</div>
                  </div>
                </div>
              </div>

              {/* Quick Order */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-4 mb-6 border border-green-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Order</h2>
                <div className="flex flex-col gap-3">
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-lg text-sm"
                  >
                    <span>📞</span>
                    Call to Order
                  </a>
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-lg text-sm"
                  >
                    <span>💬</span>
                    WhatsApp Order
                  </a>
                </div>
              </div>

              {/* Chef Info */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Chef Ali Hassan</h3>
                    <p className="text-gray-600 text-sm">20+ years experience</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Specializing in traditional Pakistani recipes
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-xl font-bold text-orange-600 mb-1">4.8</div>
              <div className="text-xs text-gray-700">Rating</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-xl font-bold text-orange-600 mb-1">15+</div>
              <div className="text-xs text-gray-700">Dishes</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-xs text-gray-700">Delivery</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-xl font-bold text-orange-600 mb-1">20+</div>
              <div className="text-xs text-gray-700">Years Exp</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal />
    </div>
  );
};

export default CuisineDining;