import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Stayarea = () => {

    const navigate=useNavigate();
    const handlecontact=()=>{
navigate('/contactForm')
    }
    const handledetail=()=>{
        navigate('/Hotelarea')   
    }
  const stays = [
    {
      id: 1,
      title: 'Al Rehman rest area',
      description: '5-star accommodation with premium amenities and breathtaking views',
      price: '₹2,000/night',
      rating: '4.8',
      reviews: '1.2k',
      amenities: ['🏊 Pool', '🍽️ Restaurant', '🅿️ Parking'],
      location: 'City Center',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      pageLink: '/stays/luxury-hotel'
    },
    {
      id: 2,
      title: 'Panjpeer rest area',
      description: 'Traditional family home with authentic local experience',
      price: '₹2,500/night',
      rating: '4.6',
      reviews: '890',
      amenities: ['🏠 Kitchen', '📶 WiFi', '🧺 Laundry', '👨‍👩‍👧‍👦 Family-friendly'],
      location: 'Residential Area',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800',
      pageLink: '/stays/cozy-homestay'
    },
    {
      id: 3,
      title: 'Norabad rest house',
      description: 'Secluded cottage perfect for nature lovers and couples',
      price: '₹1,500/night',
      rating: '4.9',
      reviews: '540',
      amenities: ['🔥 Fireplace', '🌄 Mountain View', '🚶 Hiking Trails', '🐕 Pet-friendly'],
      location: 'Hill Station',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w-800',
      pageLink: '/stays/mountain-cottage'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Places to <span className="text-blue-600">Stay</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Discover perfect accommodations for your visit to Panjpeer. From luxury resorts to cozy homestays.
          </p>
          
    
        
        </div>

        {/* Stay Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {stays.map((stay) => (
            <div 
              key={stay.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="font-bold text-lg text-blue-700">{stay.price}</span>
                </div>
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold">{stay.rating}</span>
                  <span className="text-xs opacity-90">({stay.reviews})</span>
                </div>
                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                  📍 {stay.location}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <Link to={stay.pageLink}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300">
                    {stay.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {stay.description}
                </p>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stay.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm border border-gray-200"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                  onClick={handledetail}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                  <button className="flex-1 bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2"   onClick={handlecontact}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Host
                  </button>
                </div>

                
              </div>
            </div>
          ))}
        </div>

     

       
      </div>
    </div>
  );
};

export default Stayarea;