import React, { useState, useRef } from 'react';

const Introduction = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showVisitInfo, setShowVisitInfo] = useState(false);
  const videoRef = useRef(null);

  const handlevisit = () => {
    setShowVisitInfo(true);
  };

  const handlevideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const closeVisitInfo = () => {
    setShowVisitInfo(false);
  };

  const handleBackdropClick = (e, type) => {
    if (e.target === e.currentTarget) {
      if (type === 'video') closeVideo();
      if (type === 'visit') closeVisitInfo();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8" style={{marginTop:"70px"}}>
        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Natural Wonder of Kahuta
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  Panjpeer
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl">
                A scenic hilltop area located in Kahuta, Rawalpindi District, Pakistan. Famous for its 
                <span className="font-semibold text-green-700"> breathtaking rock formations</span>, 
                panoramic views, and adventurous hiking trails that attract nature lovers, photographers, 
                and adventure seekers alike.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  {
                    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                    title: 'Hiking Trails',
                    desc: 'Adventure Routes'
                  },
                  {
                    icon: 'M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z',
                    title: 'Photography',
                    desc: 'Scenic Views'
                  },
                  {
                    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                    title: 'Nature',
                    desc: 'Eco Tourism'
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                  onClick={handlevisit}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Plan Your Visit
                </button>
                <button 
                  className="px-8 py-4 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                  onClick={handlevideo}
                >   
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Video
                </button>
              </div>
            </div>

            {/* Image/Visual Content */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group border-2 border-transparent bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-border">
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
  <img 
    src="/About/Muree3.jpg" 
    alt="Panjpeer Rocks"
    className="relative w-full h-full object-cover rounded-3xl transform transition-transform duration-700 group-hover:scale-110 z-10"
  />
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
  <div className="absolute bottom-6 left-6 right-6 z-30 text-white transform transition-transform duration-300 group-hover:translate-y-1">
    <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">Panjpeer Rocks</h3>
    <p className="text-green-100 font-medium drop-shadow-lg flex items-center">
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      Kahuta, Pakistan
    </p>
  </div>
</div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { number: '5000+', label: 'Visitors' },
                  { number: '1500m', label: 'Altitude' },
                  { number: '4.8', label: 'Rating' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-lg font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Best time to visit: March to October</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={(e) => handleBackdropClick(e, 'video')}
        >
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] animate-scale-in">
            {/* Video Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
              <h3 className="text-lg font-semibold">Panjpeer Rocks - Experience the Beauty</h3>
              <button 
                onClick={closeVideo}
                className="text-white hover:text-green-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Video Player */}
            <div className="relative">
              <video 
                ref={videoRef}
                className="w-full h-auto max-h-[70vh]"
                controls
                autoPlay
                muted
              >
                <source src="https://media.istockphoto.com/id/1391776684/video/hiker-in-a-forest.mp4?s=mp4-640x640-is&k=20&c=kl7wL2UouAj5xKGh23xMb64oubTuj3KlCUTu2luGWeA=" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Loading State */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 hidden">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            </div>
            
            {/* Video Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Experience the majestic beauty of Panjpeer Rocks through this breathtaking footage
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visit Information Modal */}
      {showVisitInfo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={(e) => handleBackdropClick(e, 'visit')}
        >
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
              <h3 className="text-xl font-semibold">Plan Your Visit to Panjpeer</h3>
              <button 
                onClick={closeVisitInfo}
                className="text-white hover:text-green-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Best Time to Visit */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Best Time to Visit
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-green-700">Ideal Season:</strong>
                      <p className="text-gray-700">March to October</p>
                    </div>
                    <div>
                      <strong className="text-green-700">Best Time of Day:</strong>
                      <p className="text-gray-700">Early Morning (6-9 AM)</p>
                    </div>
                  </div>
                </div>

                {/* Travel Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Travel Tips
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Wear comfortable hiking shoes</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Carry water and snacks</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Bring camera for photography</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Check weather forecast</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Travel in groups for safety</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Carry first-aid kit</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Need Help Planning?</h4>
                  <p className="text-sm text-gray-700 mb-2">Contact local tour guides for the best experience:</p>
                  <div className="text-sm text-gray-600">
                    <p>📞 +92 300 1234567</p>
                    <p>📧 info@panjpeerrocks.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Enjoy your adventure at Panjpeer Rocks! 🏔️
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Introduction;