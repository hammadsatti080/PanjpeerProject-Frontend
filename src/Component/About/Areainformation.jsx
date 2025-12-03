import React, { useState, useEffect, useRef } from 'react';

const Areainformation = () => {
  const [villages, setVillages] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch from backend on mount
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/tourist-spots');
        const data = await res.json();
        setVillages(data);
        setFilteredVillages(data);
      } catch (err) {
        console.error('Failed to fetch spots', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpots();
  }, []);

  // build districts and facility lists from villages
  const districts = [...new Set(villages.map(v => v.district).filter(Boolean))];
  const allFacilitiesList = [...new Set(villages.flatMap(v => v.facilities || []))].sort();

  useEffect(() => {
    let filtered = villages;

    if (searchTerm) {
      filtered = filtered.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (districtFilter) filtered = filtered.filter(v => v.district === districtFilter);
    if (facilityFilter) filtered = filtered.filter(v => v.facilities.includes(facilityFilter));

    setFilteredVillages(filtered);
  }, [searchTerm, districtFilter, facilityFilter, villages]);

  const resetFilters = () => {
    setSearchTerm('');
    setDistrictFilter('');
    setFacilityFilter('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 animate-gradient-x">
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

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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

            <div className="relative">
              <CustomSelect
                value={districtFilter}
                onChange={setDistrictFilter}
                options={districts}
                placeholder="All Districts"
                isMobile={isMobile}
              />
            </div>

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

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              {filteredVillages.length} of {villages.length} spots
            </div>
            <button 
              onClick={resetFilters} 
              className="px-6 py-2 border border-green-300 rounded-xl text-green-700 hover:bg-green-50 transition-all duration-300 hover:scale-105 active:scale-95"
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
              <TouristSpotCard 
                key={village._id || village.id} 
                village={village} 
                index={index}
              />
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

// Enhanced CustomSelect with better animations
const CustomSelect = ({ value, onChange, options, placeholder, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

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

      {isOpen && (
        <div className={`absolute z-50 mt-1 bg-white border border-green-200 rounded-xl shadow-2xl max-h-60 overflow-auto animate-scale-in ${
          isMobile ? 'fixed inset-x-4 bottom-4 top-auto max-h-64 w-[calc(100%-2rem)]' : 'w-full left-0 top-full max-h-80'
        }`}>
          {isMobile && (
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold">{placeholder}</span>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-100 text-lg font-bold">×</button>
            </div>
          )}

          <div className="py-1">
            <button 
              onClick={() => handleSelect('')} 
              className={`w-full text-left px-4 py-3 hover:bg-green-50 transition-colors duration-200 border-b border-green-50 ${
                value === '' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-900'
              }`}
            >
              {placeholder}
            </button>
            {options.map(option => (
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

// Enhanced TouristSpotCard with better animations and coloring
const TouristSpotCard = ({ village, index }) => {
  const [showContact, setShowContact] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const mapLink = (village.location && village.location.lat && village.location.lng)
    ? `https://www.google.com/maps?q=${village.location.lat},${village.location.lng}`
    : null;

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div className="h-48 bg-cover bg-center relative overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        ></div>
        <img
          src={village.image || 'https://via.placeholder.com/600x400'}
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
            {village.district || '—'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            <span>Visitors: <strong className="text-gray-800">{village.population ? village.population.toLocaleString() : '—'}</strong></span>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <span>Activities: <strong className="text-gray-800">{village.activities?.join(', ') || '—'}</strong></span>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
            </svg>
            Available Facilities:
          </h4>
          <div className="flex flex-wrap gap-2">
            {village.facilities?.map((facility, index) => (
              <span 
                key={index} 
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 ${getFacilityColor(index)}`}
              >
                {facility}
              </span>
            )) || <span className="text-gray-500 text-sm">No facilities listed</span>}
          </div>
        </div>

        {/* Action Section */}
        <div className="border-t border-green-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm text-gray-700 font-semibold">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0112 0c0 .-.1.389-.029.777A5 5 0 0010 11z" clipRule="evenodd"/>
              </svg>
              Tourist Guide
            </div>
            <div className="flex gap-2 items-center">
              {mapLink && (
                <a 
                  href={mapLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
                >
                  View Map
                </a>
              )}
              <button 
                onClick={() => setShowContact(!showContact)} 
                className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
              >
                {showContact ? 'Hide Contact' : 'Show Contact'}
              </button>
            </div>
          </div>

          {showContact && (
            <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200 animate-fade-in">
              <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span className="font-mono bg-white px-2 py-1 rounded border border-green-200">{village.contact || '—'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Areainformation;