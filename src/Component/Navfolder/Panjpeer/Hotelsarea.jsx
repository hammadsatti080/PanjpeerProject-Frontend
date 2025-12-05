import React from 'react';
import { useNavigate} from 'react-router-dom';
import Cusines from './Cusines';

const HotelsArea = () => {


  const navigate=useNavigate();
  const handlecontact=()=>{
   navigate("/ContactForm") ;
  }
  const handlephoto=()=>{
    navigate("/Photo") ;
   }
  const hotels = [
    {
      id: 1,
      name: "Panjpeer Luxury Resort & Spa",
      location: "Panjpeer Hills, Main Road",
      rating: 4.8,
      reviewCount: 324,
      description: "5-star luxury resort with panoramic mountain views, spa, and fine dining",
      price: "₹12,500",
      discountPrice: "₹9,999",
      amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Parking"],
      images: {
        main: "/About/Launch.avif",
        room: "/About/Room.avif",
        pool: "/About/Pool.avif",
        restaurant: "/About/Resturant.avif"
      },
      tags: ["Luxury", "Spa", "Fine Dining", "Mountain View"]
    },
    {
      id: 2,
      name: "Himalayan Retreat Hotel",
      location: "Near Panjpeer Temple, Valley Road",
      rating: 4.5,
      reviewCount: 215,
      description: "Traditional architecture with modern comforts, ideal for family vacations",
      price: "₹8,900",
      discountPrice: "₹7,200",
      amenities: ["Free Breakfast", "Garden", "Play Area", "Conference Room", "Room Service"],
      images: {
        main: "/About/Bedroom.avif",
        room: "/About/Bedroom1.avif",
        garden: "/About/Bedroom3.avif",
        view: "/About/Bedroom3.avif"
      },
      tags: ["Family Friendly", "Traditional", "Garden View", "Budget"]
    },
    {
      id: 3,
      name: "Mountain View Resort",
      location: "Panjpeer Peak Road",
      rating: 4.7,
      reviewCount: 187,
      description: "Premium resort offering breathtaking sunrise views over the Himalayas",
      price: "₹11,200",
      discountPrice: "₹8,950",
      amenities: ["Sunrise View", "Hot Tub", "Fireplace", "Bar", "Hiking Tours"],
      images: {
        main: "/About/Launch1.avif",
        room: "/About/Room1.avif",
        view: "/About/Launch2.avif",
        lobby: "/About/Restarea1.avif"
      },
      tags: ["Premium", "Sunrise View", "Adventure", "Romantic"]
    },
    {
      id: 4,
      name: "Panjpeer Heritage Hotel",
      location: "Old City Center, Heritage Road",
      rating: 4.3,
      reviewCount: 156,
      description: "Restored heritage property blending traditional charm with modern amenities",
      price: "₹6,500",
      discountPrice: "₹5,200",
      amenities: ["Heritage Building", "Cultural Shows", "Library", "Courtyard", "Free Shuttle"],
      images: {
        main: "/About/Main1.avif",
        room: "/About/Main2.avif",
        courtyard: "/About/Main3.avif",
        heritage: "/About/Main4.avif"
      },
      tags: ["Heritage", "Cultural", "Budget", "Traditional"]
    },
    {
      id: 5,
      name: "Forest Edge Eco Resort",
      location: "Panjpeer Forest Area",
      rating: 4.6,
      reviewCount: 198,
      description: "Eco-friendly resort nestled in the forest, perfect for nature lovers",
      price: "₹9,800",
      discountPrice: "₹7,850",
      amenities: ["Eco Friendly", "Nature Trails", "Bird Watching", "Organic Food", "Yoga"],
      images: {
        main: "/About/Main1.avif",
        room: "/About/Main2.avif",
        forest: "/About/Main3.avif",
        eco: "/About/Main4.avif",
       
      },
      tags: ["Eco Friendly", "Nature", "Wellness", "Sustainable"]
    }
  ];

  const [activeHotel, setActiveHotel] = React.useState(hotels[0]);
  const [activeImage, setActiveImage] = React.useState('main');

  // SVG Icon Components
  const MapPinIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const StarIcon = () => (
    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const WifiIcon = () => (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  );

  const CarIcon = () => (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const UtensilsIcon = () => (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const CoffeeIcon = () => (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  const WindIcon = () => (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2v-1a2 2 0 00-2-2H8a2 2 0 00-2 2v1a2 2 0 002 2z" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const ChatIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium <span className="text-blue-600">Hotels & Resorts</span> in Panjpeer
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Discover the perfect accommodation for your stay. From luxury resorts to budget-friendly hotels, we have options for every traveler.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Hotel List */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Hotels</h2>
              
              {/* Filter/Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search hotels by name or location..."
                    className="w-full px-4 py-3 pl-12 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                </div>
              </div>

              {/* Hotel List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    onClick={() => {
                      setActiveHotel(hotel);
                      setActiveImage('main');
                    }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeHotel.id === hotel.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={hotel.images.main}
                          alt={hotel.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg truncate">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                          <MapPinIcon />
                          <span className="truncate">{hotel.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <StarIcon />
                            <span className="font-semibold">{hotel.rating}</span>
                            <span className="text-gray-500 text-sm">({hotel.reviewCount} reviews)</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">{hotel.discountPrice}</span>
                            <span className="text-gray-500 line-through ml-2">{hotel.price}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            hotel.tags.includes('Luxury') ? 'bg-purple-100 text-purple-800' :
                            hotel.tags.includes('Budget') ? 'bg-green-100 text-green-800' :
                            hotel.tags.includes('Eco Friendly') ? 'bg-emerald-100 text-emerald-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {hotel.tags[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Hotel Details */}
          <div className="lg:w-3/5">
            {/* Hotel Gallery */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative h-64 sm:h-80 md:h-96">
                <img
                  src={activeHotel.images[activeImage]}
                  alt={activeHotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold">{activeHotel.discountPrice}</span>
                  <span className="text-gray-300 line-through ml-2">{activeHotel.price}</span>
                  <span className="text-sm ml-2">/night</span>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {Object.keys(activeHotel.images).map((imgKey) => (
                    <button
                      key={imgKey}
                      onClick={() => setActiveImage(imgKey)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        activeImage === imgKey
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/90 text-gray-800 hover:bg-white'
                      }`}
                    >
                      {imgKey.charAt(0).toUpperCase() + imgKey.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{activeHotel.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPinIcon />
                      <span className="text-gray-600">{activeHotel.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-yellow-50 px-4 py-2 rounded-full">
                      <StarIcon />
                      <span className="font-bold text-gray-900">{activeHotel.rating}</span>
                      <span className="text-gray-600">({activeHotel.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8">{activeHotel.description}</p>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities & Facilities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {activeHotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-xl">
                        {amenity.includes('WiFi') && <WifiIcon />}
                        {amenity.includes('Parking') && <CarIcon />}
                        {amenity.includes('Restaurant') && <UtensilsIcon />}
                        {amenity.includes('Breakfast') && <CoffeeIcon />}
                        {amenity.includes('Spa') && <WindIcon />}
                        <span className="font-medium text-gray-800">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Hotel Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeHotel.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={handlephoto} className="flex-1 bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                    <EyeIcon />
                    View Photos
                  </button>
                  <button onClick={handlecontact} className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                    <ChatIcon />
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Safe & Secure Booking</h3>
                    <p className="text-gray-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Instant Confirmation</h3>
                    <p className="text-gray-600">Get immediate booking confirmation via email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cusines/>
    </div>
  );
};

export default HotelsArea;