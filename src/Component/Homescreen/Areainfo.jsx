import React, { useState, useEffect, useRef } from 'react';

const Areainfo = () => {
  const [villages, setVillages] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample data for villages with different facilities
  const sampleVillages = [
    {
      id: 1,
      name: "Panjpeer",
      population: 240,
      district: "Kahuta",
      facilities: ["Parking", "Rest Area", "Guide Service", "Viewing Platform", "Security", "Information Center"],
      activities: ["Rock Climbing", "Sightseeing", "Photography"],
      contact: "9876543210",
      image: "https://live.staticflickr.com/4533/37830586854_60931b32b4_b.jpg"
    },
    {
      id: 2,
      name: "Oriak",
      population: 180,
      district: "Kahuta", 
      facilities: ["Camping Site", "Bonfire Area", "Trekking Trail", "First Aid", "Tent Rental", "BBQ Area"],
      activities: ["Trekking", "Camping", "Stargazing"],
      contact: "9876543211",
      image: "https://preview.redd.it/atgd0ts7o3zz.jpg?auto=webp&s=d697b77014712bc35072bb5007a2e4362e2847b8"
    },
    {
      id: 3,
      name: "Cherras",
      population: 320,
      district: "Kahuta",
      facilities: ["Bird Watching Tower", "Nature Trail", "Picnic Spots", "Binocular Rental", "Wildlife Observatory", "Forest Walk"],
      activities: ["Nature Walk", "Bird Watching", "Wildlife Photography"],
      contact: "9876543212",
      image: "http://4.bp.blogspot.com/-cGTMAJpv9X8/Ue_aHjVTunI/AAAAAAAAD1s/OkD24jyyA1M/s1600/Panjpeer+Rocks+Narh+Kahuta.jpg"
    },
    {
      id: 4,
      name: "Otain",
      population: 156,
      district: "Kahuta",
      facilities: ["Food Stalls", "Souvenir Shop", "Restrooms", "Children Play Area", "Local Crafts", "Snack Bar"],
      activities: ["Picnic", "Family Outing", "Local Shopping"],
      contact: "9876543213",
      image: "http://4.bp.blogspot.com/-cGTMAJpv9X8/Ue_aHjVTunI/AAAAAAAAD1s/OkD24jyyA1M/s1600/Panjpeer+Rocks+Narh+Kahuta.jpg"
    },
    {
      id: 5,
      name: "Market",
      population: 290,
      district: "Kahuta",
      facilities: ["Waterfall View", "Sitting Benches", "Trout Fishing", "Natural Pool", "Bridge", "Gardens"],
      activities: ["Fishing", "Swimming", "Relaxation"],
      contact: "9876543214",
      image: "https://i.pinimg.com/originals/69/67/34/69673454838d961a2c9daa19bda90ddb.jpg"
    },
    {
      id: 6,
      name: "Kopandi",
      population: 210,
      district: "Kahuta",
      facilities: ["Sunrise Viewing", "Coffee Shop", "Photography Zone", "Souvenir Shop", "Telescope", "Waiting Area"],
      activities: ["Sunrise Viewing", "Photography", "Coffee Tasting"],
      contact: "9876543215",
      image: "https://www.natureadventureclub.pk/wp-content/uploads/2025/07/Panjpeer-Rock-Travel.jpg"
    },
    {
      id: 7,
      name: "Katara",
      population: 190,
      district: "Kahuta",
      facilities: ["Rock Climbing Gear", "Safety Equipment", "Training Area", "Adventure Guide", "Rappelling Point", "Equipment Rental"],
      activities: ["Rock Climbing", "Rappelling", "Adventure Sports"],
      contact: "9876543216",
      image: "https://www.natureadventureclub.pk/wp-content/uploads/2025/07/Panjpeer-Rock-Travel.jpg"
    },
    {
      id: 8,
      name: "Soarr",
      population: 175,
      district: "Kahuta",
      facilities: ["Meditation Area", "Yoga Platform", "Herbal Garden", "Quiet Zones", "Fountain", "Walking Path"],
      activities: ["Meditation", "Yoga", "Nature Therapy"],
      contact: "9876543217",
      image: "https://i.ytimg.com/vi/Rno1Mb-BimE/maxresdefault.jpg"
    },
    {
      id: 9,
      name: "Norabad",
      population: 220,
      district: "Kahuta",
      facilities: ["Cable Car", "Restaurant", "Hotel", "Gift Shop", "Observation Deck", "Parking","Waterfall"],
      activities: ["Cable Car Ride", "Dining", "Shopping"],
      contact: "9876543218",
      image: "https://travelertrails.com/wp-content/uploads/2022/08/2068760792-1.jpg"
    },
    {
      id: 10,
      name: "Dandoha",
      population: 195,
      district: "Kahuta",
      facilities: ["Boating", "Fishing Pier", "Water Sports", "Changing Rooms", "Life Jackets", "Cafeteria"],
      activities: ["Boating", "Fishing", "Water Sports"],
      contact: "9876543219",
      image: "https://www.silkroadguides.com/wp-content/uploads/photo-gallery/Panjpeer_Rocks_Tour/Team46@-PanjPeer-Rocks-Azad-Jummun-n-Kashmir.jpeg?bwg=1694430275"
    },
    {
      id: 11,
      name: "Kalasara",
      population: 280,
      district: "Kahuta",
      facilities: ["Museum", "Guided Tour", "Audio Guide", "Photo Gallery", "Research Center","lake"],
      activities: ["Historical Tour", "Museum Visit", "Research"],
      contact: "9876543220",
      image: "https://i.pinimg.com/originals/d4/13/2a/d4132a8f271add12313c6c9f5df0ef11.jpg"
    },
  ];

  // All possible facilities for the dropdown
  const allFacilitiesList = [
    "Parking", "Rest Area", "Guide Service", "Viewing Platform", "Security", "Information Center",
    "Camping Site", "Bonfire Area", "Trekking Trail", "First Aid", "Tent Rental", "BBQ Area",
    "Bird Watching Tower", "Nature Trail", "Picnic Spots", "Binocular Rental", "Wildlife Observatory",
    "Forest Walk", "Food Stalls", "Souvenir Shop", "Restrooms", "Children Play Area", "Local Crafts",
    "Snack Bar", "Waterfall View", "Sitting Benches", "Trout Fishing", "Natural Pool", "Bridge",
    "Gardens", "Sunrise Viewing", "Coffee Shop", "Photography Zone", "Telescope", "Waiting Area",
    "Rock Climbing Gear", "Safety Equipment", "Training Area", "Adventure Guide", "Rappelling Point",
    "Equipment Rental", "Meditation Area", "Yoga Platform", "Herbal Garden", "Quiet Zones", "Fountain",
    "Walking Path", "Cable Car", "Restaurant", "Hotel", "Gift Shop", "Observation Deck", "Boating",
    "Fishing Pier", "Water Sports", "Changing Rooms", "Life Jackets", "Cafeteria", "Museum",
    "Guided Tour", "Audio Guide", "Photo Gallery", "Research Center", "Library", "Safari Ride",
    "Animal Feeding", "Visitor Center", "Nursery", "Research Station", "Camera Traps", "WiFi",
    "ATM", "Emergency Services", "Wheelchair Access", "Pet Friendly", "Drinking Water"
  ];

  // Get unique districts for filters
  const districts = [...new Set(sampleVillages.map(village => village.district))];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize with all villages
  useEffect(() => {
    setLoading(true);
    // Simulate API loading
    setTimeout(() => {
      setVillages(sampleVillages);
      setFilteredVillages(sampleVillages);
      setLoading(false);
    }, 800);
  }, []);

  // Filter villages based on search and filters
  useEffect(() => {
    let filtered = sampleVillages;

    if (searchTerm) {
      filtered = filtered.filter(village =>
        village.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (districtFilter) {
      filtered = filtered.filter(village => village.district === districtFilter);
    }

    if (facilityFilter) {
      filtered = filtered.filter(village => 
        village.facilities.includes(facilityFilter)
      );
    }

    setFilteredVillages(filtered);
  }, [searchTerm, districtFilter, facilityFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setDistrictFilter('');
    setFacilityFilter('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 animate-gradient-x">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl font-bold text-center mb-2 animate-fade-in-down">
            Tourist Spots Directory
          </h1>
          <p className="text-lg text-center text-green-100 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Explore beautiful tourist spots and their unique facilities in Kahuta region
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Enhanced Search Box */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by spot name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50/50"
                />
              </div>
            </div>

            {/* Enhanced District Filter */}
            <div className="relative">
              <CustomSelect
                value={districtFilter}
                onChange={setDistrictFilter}
                options={districts}
                placeholder="All Districts"
                isMobile={isMobile}
              />
            </div>

            {/* Enhanced Facility Filter */}
            <div className="relative">
              <CustomSelect
                value={facilityFilter}
                onChange={setFacilityFilter}
                options={allFacilitiesList}
                placeholder="All Facilities"
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Enhanced Reset Button */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600 font-medium">
              {filteredVillages.length} of {sampleVillages.length} spots
            </div>
            <button 
              onClick={resetFilters}
              className="px-6 py-2 border border-green-300 rounded-xl text-green-700 hover:bg-green-50 transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredVillages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVillages.map((village, index) => (
              <TouristSpotCard key={village.id} village={village} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No spots found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Custom Select Component
const CustomSelect = ({ value, onChange, options, placeholder, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {/* Enhanced Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-3 border border-green-200 rounded-xl bg-green-50/50 text-left transition-all duration-300 hover:bg-green-100 hover:border-green-300 ${
          value ? 'text-gray-900 font-medium' : 'text-gray-500'
        } ${isOpen ? 'ring-2 ring-green-500 border-green-500' : ''}`}
      >
        {value || placeholder}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none transition-transform duration-300">
          <svg className={`h-5 w-5 text-green-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute z-50 mt-1 bg-white border border-green-200 rounded-xl shadow-2xl max-h-60 overflow-auto animate-scale-in
          ${isMobile 
            ? 'fixed inset-x-4 bottom-4 top-auto max-h-64 w-[calc(100%-2rem)]' 
            : 'w-full left-0 top-full max-h-80'
          }
        `}>
          {/* Enhanced Mobile Header */}
          {isMobile && (
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold">{placeholder}</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-100 text-lg font-bold"
              >
                ×
              </button>
            </div>
          )}

          {/* Enhanced Options */}
          <div className="py-1">
            <button
              onClick={() => handleSelect('')}
              className={`w-full text-left px-4 py-3 hover:bg-green-50 transition-colors duration-200 border-b border-green-50 ${
                value === '' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-900'
              }`}
            >
              {placeholder}
            </button>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-3 hover:bg-green-50 transition-colors duration-200 ${
                  value === option ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-900'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced TouristSpotCard Component
const TouristSpotCard = ({ village, index }) => {
  const [showContact, setShowContact] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Enhanced colors for facility tags with gradients
  const getFacilityColor = (index) => {
    const colors = [
      'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200',
      'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200',
      'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200',
      'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200',
      'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200',
      'bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-800 border border-indigo-200',
      'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 border border-pink-200',
      'bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 border border-teal-200',
      'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200',
      'bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-800 border border-cyan-200'
    ];
    return colors[index % colors.length];
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Enhanced Image Section */}
      <div className="h-48 bg-cover bg-center relative overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        ></div>
        <img
          src={village.image}
          alt={village.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
        <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-300 group-hover:translate-y-1">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{village.name}</h3>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {village.district} District
          </span>
        </div>
      </div>

      {/* Enhanced Village Info */}
      <div className="p-5">
        {/* Enhanced Basic Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span>Visitors: <strong className="text-gray-800">{village.population.toLocaleString()}+</strong></span>
          </div>
          
          <div className="flex items-start text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            <span>Activities: <strong className="text-gray-800">{village.activities.join(', ')}</strong></span>
          </div>
        </div>

        {/* Enhanced Facilities */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Available Facilities:
          </h4>
          <div className="flex flex-wrap gap-2">
            {village.facilities.map((facility, index) => (
              <span 
                key={index} 
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 ${getFacilityColor(index)}`}
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Contact Information */}
        <div className="border-t border-green-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm text-gray-700 font-semibold">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Tourist Guide
            </div>
            
            <button 
              className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? 'Hide Contact' : 'Show Contact'}
            </button>
          </div>
          
          {showContact && (
            <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200 animate-fade-in">
              <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-mono bg-white px-2 py-1 rounded border border-green-200">{village.contact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Areainfo;