import React, { useState, useEffect, useRef } from 'react';

// CustomSelect & TouristSpotCard included below (same structure as before)
// but data now comes from backend.

const Areainformation = () => {
  const [villages, setVillages] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [isMobile, setIsMobile] = useState(false);

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
        const res = await fetch('http://localhost:5000/api/tourist-spots');
        const data = await res.json();
        setVillages(data);
        setFilteredVillages(data);
      } catch (err) {
        console.error('Failed to fetch spots', err);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">Tourist Spots Directory</h1>
          <p className="text-lg text-center text-green-100 max-w-2xl mx-auto">
            Explore beautiful tourist spots and their unique facilities in Kahuta region
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by spot name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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

          <div className="flex justify-end mt-4">
            <button onClick={resetFilters} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-sm font-medium">
            Showing {filteredVillages.length} of {villages.length} tourist spots
          </p>
        </div>

        {filteredVillages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVillages.map(village => (
              <TouristSpotCard key={village._id || village.id} village={village} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No spots found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// CustomSelect component (identical behavior)
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
        className={`w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-left ${value ? 'text-gray-900' : 'text-gray-500'}`}
      >
        {value || placeholder}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto ${isMobile ? 'fixed inset-x-4 bottom-4 top-auto max-h-64 w-[calc(100%-2rem)]' : 'w-full left-0 top-full max-h-80'}`}>
          {isMobile && (
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
              <span className="font-medium text-gray-900">{placeholder}</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>
          )}

          <div className="py-1">
            <button onClick={() => handleSelect('')} className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${value === '' ? 'bg-green-50 text-green-700' : 'text-gray-900'}`}>{placeholder}</button>
            {options.map(option => (
              <button key={option} onClick={() => handleSelect(option)} className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${value === option ? 'bg-green-50 text-green-700' : 'text-gray-900'}`}>{option}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// TouristSpotCard updated to include Google Maps link
const TouristSpotCard = ({ village }) => {
  const [showContact, setShowContact] = useState(false);

  const getFacilityColor = (index) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-teal-100 text-teal-800',
      'bg-yellow-100 text-yellow-800',
      'bg-cyan-100 text-cyan-800'
    ];
    return colors[index % colors.length];
  };

  const mapLink = (village.location && village.location.lat && village.location.lng)
    ? `https://www.google.com/maps?q=${village.location.lat},${village.location.lng}`
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${village.image || 'https://via.placeholder.com/600x400'})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{village.name}</h3>
          <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
            {village.district || '—'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>Visitors: <strong>{village.population ? village.population.toLocaleString() : '—'}</strong></span>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <span>Activities: <strong>{village.activities?.join(', ') || '—'}</strong></span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">Available Facilities:</h4>
          <div className="flex flex-wrap gap-1">
            {village.facilities?.map((facility, index) => (
              <span key={index} className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getFacilityColor(index)}`}>{facility}</span>
            )) || <span className="text-gray-500">No facilities listed</span>}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm text-gray-700">
              <span><strong>Tourist Guide</strong></span>
            </div>
            <div className="flex gap-2 items-center">
              {mapLink && (
                <a href={mapLink} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded">
                  View on Map
                </a>
              )}
              <button onClick={() => setShowContact(!showContact)} className="text-sm text-green-600 hover:text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 transition-colors">
                {showContact ? 'Hide Contact' : 'Show Contact'}
              </button>
            </div>
          </div>

          {showContact && (
            <div className="flex items-center text-sm text-gray-600 bg-green-50 rounded-lg p-3">
              <span className="font-mono">{village.contact || '—'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Areainformation;
