import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiCamera, 
  FiSun, 
  FiCompass, 
  FiStar,
  FiArrowRight,
  FiMenu,
  FiX,
  FiChevronRight,
  FiGlobe,
  FiNavigation,
  FiCalendar,
  FiUsers
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
      src: "/About/Muree2.jpg",
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
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const textLines = [
    "Experience the majestic beauty of Panjpeer Rocks",
    "A natural wonder that captivates every visitor",
    "Breathtaking panoramic views of the valley",
    "Witness nature's incredible rock formations"
  ];

  const navigate = useNavigate();

  // Typing animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setTimeout(() => setIsPaused(false), 1000);
        return;
      }

      const currentText = textLines[currentLine];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, typedText.length - 1));
        if (typedText.length === 0) {
          setIsDeleting(false);
          setCurrentLine((prev) => (prev + 1) % textLines.length);
          setIsPaused(true);
        }
      } else {
        setTypedText(currentText.substring(0, typedText.length + 1));
        if (typedText.length === currentText.length) {
          setIsPaused(true);
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [typedText, currentLine, isDeleting, isPaused]);

  const handleexplore = () => {
    navigate("/Areainformation");
  };

  const handlegallery = () => {
    navigate("/Sunrise");
  };

  // Floating particles animation
  const Particle = ({ delay }) => (
    <motion.div
      className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 100 - 50, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo with animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <FiGlobe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PanjpeerRocks
                </h1>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  <span className="text-gray-300 text-xs">Online</span>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-6 lg:space-x-8"
            >
              {['Home', 'Gallery', 'About', 'Visit'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-cyan-300 transition-all duration-300 text-sm lg:text-base relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.button
                className="relative px-6 py-2 lg:px-8 lg:py-3 rounded-full font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  color: 'white'
                }}
              >
                <span className="relative z-10">Book Tour</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-6 h-6">
                {isMenuOpen ? (
                  <FiX className="w-6 h-6 text-white" />
                ) : (
                  <>
                    <FiMenu className="w-6 h-6 text-white" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed inset-x-0 top-16 z-40 bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700/50 backdrop-blur-lg"
        >
          <div className="px-4 py-2 space-y-0">
            {['Home', 'Gallery', 'About', 'Visit'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-white text-lg py-4 border-b border-gray-700/50 active:bg-gray-700/30 transition-colors group"
                onClick={() => setIsMenuOpen(false)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <FiChevronRight className="w-4 h-4 mr-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{item}</span>
                </div>
              </motion.a>
            ))}
            <motion.button
              className="w-full mt-4 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              Book Tour
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Hero Section - 40% Text, 60% Image Split Layout */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div className="flex flex-col lg:flex-row w-full h-full">
          {/* Left Column - 40% Text Content */}
          <div className="lg:w-2/5 w-full bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 flex items-center justify-center py-12 lg:py-0 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg w-full relative z-10"
            >
              {/* Badge with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mr-2"
                />
                <span className="text-blue-200 text-sm font-medium tracking-wider">
                  NATURAL WONDER
                </span>
                <FiChevronRight className="w-4 h-4 ml-2 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Main Title with gradient and glow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 sm:mb-8 relative"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 md:mb-4 leading-tight relative"
                >
                  <span className="relative">
                    <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 blur opacity-30 group-hover:opacity-70 transition duration-1000" />
                    <span className="relative bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                      PANJPEER
                    </span>
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">
                    ROCKS
                  </span>
                </motion.h1>

                {/* Title underline animation */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2"
                />
              </motion.div>

              {/* Location with pin animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center mb-4 md:mb-6 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiMapPin className="w-6 h-6 md:w-7 md:h-7 text-red-400 mr-3 drop-shadow-lg" />
                </motion.div>
                <span className="text-xl sm:text-2xl text-blue-100 font-medium tracking-wide">
                  Kahuta Narh, Pakistan
                </span>
              </motion.div>

              {/* Typing Animation Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="min-h-[80px] mb-6 md:mb-8"
              >
                <div className="relative">
                  <motion.p
                    className="text-gray-200 text-lg sm:text-xl md:text-2xl leading-relaxed font-light"
                    style={{ minHeight: '60px' }}
                  >
                    {typedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-[3px] h-7 bg-gradient-to-b from-cyan-400 to-blue-400 ml-1"
                    />
                  </motion.p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-gray-400 text-sm">Discover more...</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons with enhanced effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                {/* Explore Button */}
                <motion.button 
                  onClick={handleexplore}
                  className="group relative px-8 py-4 rounded-full font-semibold text-sm sm:text-base overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="text-white font-bold tracking-wide">Explore Destination</span>
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FiArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-300" />
                </motion.button>

                {/* Gallery Button */}
                <motion.button 
                  onClick={handlegallery}
                  className="group relative px-8 py-4 rounded-full font-semibold text-sm sm:text-base overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glass morphism effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-sm border border-white/20" />
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center">
                    <FiCamera className="w-5 h-5 text-cyan-300 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-cyan-100 font-bold tracking-wide">View Gallery</span>
                  </div>
                  {/* Border pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
              </motion.div>

              {/* Stats Section with animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { icon: <FiStar />, value: "4.8/5", label: "Rating", color: "from-yellow-400 to-orange-400" },
                  { icon: <FiUsers />, value: "2000+", label: "Visitors", color: "from-green-400 to-emerald-400" },
                  { icon: <FiCalendar />, value: "365", label: "Days Open", color: "from-purple-400 to-pink-400" },
                  { icon: <FiNavigation />, value: "50+", label: "Trails", color: "from-red-400 to-pink-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - 60% Image with Parallax Effect */}
          <div className="lg:w-3/5 w-full relative h-[50vh] lg:h-screen">
            {/* Parallax Image Container */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <img
                src={images[3].src}
                alt="Panjpeer Rocks"
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Multiple gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-transparent lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Animated scan line effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Image Info Overlay with animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-md"
            >
              <div className="bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                      {images[3].title}
                    </h3>
                    <div className="flex items-center text-gray-300 mb-4">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiMapPin className="w-4 h-4 mr-2 text-red-400" />
                      </motion.div>
                      <span className="text-sm sm:text-base">{images[2].location}</span>
                    </div>
                  </div>
                  <div className="flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full">
                    <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm">4.8</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  {images[3].text}
                </p>
               
              </div>
            </motion.div>

            {/* Floating elements in image */}
            <motion.div
              className="absolute top-8 right-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"
              animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-20 left-8 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
              animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
      </section>

      {/* Professional Gallery Section */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Explore the Beauty
            </motion.h2>
            <motion.p
              className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover the stunning landscapes and unique rock formations that make Panjpeer Rocks a must-visit destination
            </motion.p>
          </motion.div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden group cursor-pointer border border-gray-700/50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center text-white mb-2">
                      <FiMapPin className="w-4 h-4 mr-2 text-red-400" />
                      <span className="text-sm font-medium">{image.location}</span>
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">
                      {image.title}
                    </h3>
                  </div>
                </div>
                
                {/* Image Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white text-base font-semibold">
                      {image.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <FiStar className="w-4 h-4 fill-current" />
                      <span className="text-white text-sm ml-1">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {image.text}
                  </p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FiMapPin className="w-4 h-4 mr-2 text-red-400" />
                    {image.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-800 to-gray-900">
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
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600/30"
              >
                <div className="text-white mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative order-first lg:order-last"
            >
              <img
                src={images[0].src}
                alt="Kahuta Narh"
                className="rounded-2xl shadow-2xl w-full border-4 border-gray-700/50"
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-white to-gray-100 text-gray-900 px-6 py-3 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center space-x-2">
                  <FiStar className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-base">4.8/5 Rating</span>
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