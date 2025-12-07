import React from 'react';
import { Link } from 'react-router-dom';

export default function Foodservices() {

   
  const foodServices = [
    {
      id: 1,
      title: 'Fine Dining Restaurants',
      description: 'Upscale dining experiences with gourmet cuisine and premium ambiance',
      image: '/About/Res.jpg',
      rating: '4.7',
      cuisine: 'Multi-cuisine',
      priceRange: '$$$$',
      featured: true,
      pageLink: '/food/fine-dining'
    },
    {
      id: 2,
      title: 'Street Food Stalls',
      description: 'Authentic local flavors and traditional street food delicacies',
      image: '/About/Stall.jpg',
      rating: '4.5',
      cuisine: 'Local',
      priceRange: '$',
      featured: false,
      pageLink: '/food/street-food'
    },
    {
      id: 3,
      title: 'Cafes & Coffee Shops',
      description: 'Cozy spots for coffee, snacks, and light meals with free WiFi',
      image: '/About/Family.jpg',
      rating: '4.6',
      cuisine: 'Cafe',
      priceRange: '$$',
      featured: true,
      pageLink: '/food/cafes'
    },
    {
      id: 4,
      title: 'Fast Food Chains',
      description: 'Quick service restaurants offering burgers, pizzas, and snacks',
      image: '/About/Splash1.jpg',
      rating: '4.3',
      cuisine: 'Fast Food',
      priceRange: '$$',
      featured: false,
      pageLink: '/food/fast-food'
    },
    {
      id: 5,
      title: 'Vegetarian & Vegan',
      description: 'Plant-based dining options with healthy and nutritious meals',
      image: '/About/Veg.jpg',
      rating: '4.8',
      cuisine: 'Vegetarian',
      priceRange: '$$$',
      featured: true,
      pageLink: '/food/vegetarian'
    },
    {
      id: 6,
      title: 'Family Restaurants',
      description: 'Kid-friendly restaurants with diverse menus for all ages',
      image: '/About/Splash.jpg',
      rating: '4.4',
      cuisine: 'Family',
      priceRange: '$$$',
      featured: false,
      pageLink: '/food/family'
    }
  ];

  // Filter featured items
  const featuredItems = foodServices.filter(item => item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 px-4 md:py-12 md:px-8">
      {/* Main Container with See All Button at top right */}
      <div className="max-w-7xl mx-auto relative">
        {/* Header with See All Button at top right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              Food <span className="text-orange-600">Services</span>
            </h1>
            <p className="text-gray-600 mt-2 md:mt-3 text-lg md:text-xl">
              Discover the best dining experiences in Panjpeer
            </p>
          </div>
          
          {/* See All Button - Top Right */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link
              to="/Cusines"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              See All Services
            </Link>
           
          </div>
        </div>

  

        {/* Featured Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              <span className="text-orange-500">Featured</span> Restaurants
            </h2>
            <span className="text-orange-500 font-semibold text-sm md:text-base">
              Highly Rated
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="group">
                <Link to={item.pageLink}>
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        Featured
                      </div>
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-gray-800">{item.rating}</span>
                      </div>
                      {/* Price Range */}
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                        {item.priceRange}
                      </div>
                      {/* Cuisine Type */}
                      <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
                        {item.cuisine}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <button  className="w-full bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 font-semibold py-3 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-300">
                        View Menu & Details
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* All Food Services Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Food <span className="text-orange-500">Services</span>
            </h2>
            <span className="text-gray-500 text-sm md:text-base">
              {foodServices.length} services available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {foodServices.map((item) => (
              <div key={item.id} className="group">
                <Link to={item.pageLink}>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative h-48 md:h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.featured && (
                        <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 hover:text-orange-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-bold text-gray-700">{item.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm">{item.cuisine}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-700 font-medium">{item.priceRange}</span>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>


        
      </div>
    </div>
  );
}