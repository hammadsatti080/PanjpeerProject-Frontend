import React, { useState } from 'react'

export default function Gallerynav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Navigation Bar with Green Background */}
      <nav className="bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">NG</span>
                </div>
                <span className="text-white font-bold text-lg">NatureGallery</span>
              </div>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="Waterfall" 
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Waterfall
              </a>
              <a 
                href="Mountain" 
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Mountain
              </a>
              <a 
                href="Snowfall" 
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Snowfall
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-green-200 focus:outline-none focus:text-green-200 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu - Hidden by default */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-48 opacity-100 py-4' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="flex flex-col space-y-3 px-2">
              <a 
                href="Waterfall" 
                className="text-white hover:text-green-200 hover:bg-white/10 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                💧 Waterfall
              </a>
              <a 
                href="Mountain" 
                className="text-white hover:text-green-200 hover:bg-white/10 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                🏔️ Mountain
              </a>
              <a 
                href="Snowfall" 
                className="text-white hover:text-green-200 hover:bg-white/10 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                ❄️ Snowfall
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}