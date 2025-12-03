import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiCamera, 
  FiSun, 
  FiCompass, 
  FiStar,
  FiArrowRight,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const images = [
    {
      src: "https://www.silkroadguides.com/wp-content/uploads/photo-gallery/Panjpeer_Rocks_Tour/Panjpeer-Rocks-2.jpeg?bwg=1694430275",
      text: "Experience the majestic beauty of Panjpeer Rocks",
      title: "Majestic Landscape",
      location: "Kahuta Narh, Pakistan"
    },
    {
      src: "https://wpassets.graana.com/blog/wp-content/uploads/2023/08/Panjperer-rock.jpg",
      text: "A popular destination for nature lovers and adventurers",
      title: "Tourist Haven",
      location: "Kahuta Narh, Pakistan"
    },
    {
      src: "https://wpassets.graana.com/blog/wp-content/uploads/2023/08/hikers-on-their-way-to-panjpeer-Rocks-.jpeg",
      text: "Witness nature's incredible rock formations",
      title: "Natural Wonder",
      location: "Kahuta Narh, Pakistan"
    },
    {
      src: "https://wpassets.graana.com/blog/wp-content/uploads/2023/08/hikers-on-their-way-to-panjpeer-Rocks-.jpeg",
      text: "Breathtaking panoramic views of the valley",
      title: "Valley Views",
      location: "Kahuta Narh, Pakistan"
    }
  ];

  const features = [
    {
      icon: <FiCompass className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Easy Navigation",
      description: "Well-marked trails and guided paths"
    },
    {
      icon: <FiCamera className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Photography Spots",
      description: "Perfect locations for capturing memories"
    },
    {
      icon: <FiSun className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Best Time to Visit",
      description: "Spring and autumn for ideal weather"
    },
    {
      icon: <FiMapPin className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Location Guide",
      description: "Detailed maps and directions"
    }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate=useNavigate();
  const handleexplore=()=>{
navigate("/Areainformation")
  }
  const handlegallery=()=>{
    navigate("/Sunrise")
  }
  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
                <FiMapPin className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
              </div>
              <span className="text-white text-lg md:text-xl font-bold">PanjpeerRocks</span>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-6 lg:space-x-8"
            >
              <a href="#home" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">Home</a>
              <a href="#gallery" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">Gallery</a>
              <a href="#about" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">About</a>
              <a href="#visit" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">Visit</a>
              <button className="bg-white text-gray-900 px-4 py-2 lg:px-6 lg:py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-sm lg:text-base active:scale-95">
                Book Tour
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 active:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800 fixed top-16 left-0 right-0 z-40 border-t border-gray-700"
          >
            <div className="px-4 py-2 space-y-0">
              <a 
                href="#home" 
                className="block text-white text-lg py-4 border-b border-gray-700 active:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#gallery" 
                className="block text-white text-lg py-4 border-b border-gray-700 active:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <a 
                href="#about" 
                className="block text-white text-lg py-4 border-b border-gray-700 active:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#visit" 
                className="block text-white text-lg py-4 border-b border-gray-700 active:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Visit
              </a>
              <button className="w-full bg-white text-gray-900 px-6 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 mt-4 mb-4 active:scale-95">
                Book Tour
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={images[3].src}
            alt={images[3].title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        </div>

        {/* Hero Content */}
        {/* Hero Content */}
<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-4xl w-full"
  >
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 px-2 leading-tight"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
      }}
    >
      PANJPEER ROCKS
    </motion.h1>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex items-center justify-center mb-3 md:mb-4"
    >
      <FiMapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" style={{ color: 'red' }} />
      <span className="text-base md:text-xl font-medium" style={{ color: '#dbeafe' }}>
        {images[0].location}
      </span>
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-sm sm:text-base md:text-lg font-light mb-6 md:mb-8 leading-relaxed px-2 sm:px-4"
      style={{ color: '#f8fafc', textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}
    >
      {images[0].text}
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
    >
      <button 
        className="px-6 py-4 sm:px-8 sm:py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center text-base active:scale-95 hover:shadow-xl"
        onClick={handleexplore}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          color: '#1e3a8a',
          boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Explore Destination <FiArrowRight className="ml-2 w-4 h-4" />
      </button>
      
      <button 
        className="px-6 py-4 sm:px-8 sm:py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center text-base active:scale-95 hover:shadow-xl"
        onClick={handlegallery}
        style={{
          border: '2px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        View Gallery <FiCamera className="ml-2 w-4 h-4" />
      </button>
    </motion.div>
  </motion.div>
</div>
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-center"
          >
            <div className="text-xs sm:text-sm mb-2">Scroll Down</div>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Professional Gallery Section */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Explore the Beauty
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Discover the stunning landscapes and unique rock formations that make Panjpeer Rocks a must-visit destination
            </p>
          </motion.div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center text-white mb-1">
                      <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm font-medium">{image.location}</span>
                    </div>
                    <h3 className="text-white text-base sm:text-lg font-bold mb-1">
                      {image.title}
                    </h3>
                  </div>
                </div>
                
                {/* Image Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white text-sm sm:text-base font-semibold">
                      {image.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <FiStar className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      <span className="text-white text-xs sm:text-sm ml-1">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">
                    {image.text}
                  </p>
                  <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {image.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 sm:mt-12"
          >
            <button className="bg-white text-gray-900 px-6 py-4 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center mx-auto text-base active:scale-95">
              View Full Gallery
              <FiCamera className="ml-2 w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4"
          >
            Why Visit Panjpeer Rocks?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4"
          >
            Discover the unique features that make Panjpeer Rocks a must-visit destination for nature enthusiasts and adventure seekers.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 rounded-xl p-4 sm:p-6 text-center hover:bg-gray-600 transition-all duration-300 active:scale-95"
              >
                <div className="text-white mb-3 sm:mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                About Kahuta Narh
              </h2>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                Nestled in the scenic Kahuta region of Rawalpindi District, Kahuta Narh is a stunning 
                natural attraction known for its unique rock formations and breathtaking landscapes. 
                This picturesque destination offers a perfect escape into nature's tranquility.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
                Ideal for hiking enthusiasts, photography lovers, and nature seekers, 
                Kahuta Narh provides a refreshing retreat from city life. The area is known 
                for its pleasant climate and stunning views of the surrounding hills and valleys.
              </p>
              <button className="bg-white text-gray-900 px-6 py-4 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-base active:scale-95 w-full sm:w-auto">
                Learn More
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative order-first lg:order-last"
            >
              <img
                src={images[0].src}
                alt="Kahuta Narh"
                className="rounded-xl sm:rounded-2xl shadow-2xl w-full"
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white text-gray-900 px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg"
              >
                <div className="flex items-center space-x-1">
                  <FiStar className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="font-semibold text-xs sm:text-base">4.8/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;