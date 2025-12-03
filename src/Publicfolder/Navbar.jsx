import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if window is defined (for SSR) and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initial check
    checkMobile();

    // Add event listeners
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMenuOpen && !event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMenuOpen]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Handle home navigation
  const handleHomeNavigation = (e) => {
    e.preventDefault();
    navigate('/');
    createRipple(e);
  };

  // Inline CSS Styles with enhanced animations
  const styles = {
    navbar: {
      backgroundColor: scrolled ? 'rgba(44, 85, 48, 0.95)' : '#2c5530',
      padding: '0 1rem',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease-in-out',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: scrolled ? '0.7rem 0' : '1rem 0',
      position: 'relative',
      transition: 'padding 0.3s ease-in-out',
    },
    navLogo: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    navLogoAfter: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '0%',
      height: '2px',
      backgroundColor: '#a8e6cf',
      transition: 'width 0.3s ease',
    },
    navLogoHover: {
      transform: 'translateY(-2px)',
      textShadow: '0 2px 10px rgba(168, 230, 207, 0.3)',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      gap: '1.5rem',
      margin: 0,
      padding: 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    navMenuMobile: {
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(44, 85, 48, 0.98)',
      padding: '1rem 0',
      transform: 'translateY(-20px)',
      opacity: 0,
      visibility: 'hidden',
      gap: '0',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    },
    navMenuMobileActive: {
      transform: 'translateY(0)',
      opacity: 1,
      visibility: 'visible',
    },
    navItem: {
      position: 'relative',
      overflow: 'hidden',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      padding: '0.7rem 1.2rem',
      borderRadius: '8px',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent',
      cursor: 'pointer',
      border: 'none',
      fontFamily: 'inherit',
    },
    navLinkHover: {
      color: '#a8e6cf',
      backgroundColor: 'rgba(255,255,255,0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
    navLinkActive: {
      color: '#a8e6cf',
    },
    navLinkUnderline: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: '0%',
      height: '2px',
      backgroundColor: '#a8e6cf',
      transition: 'all 0.3s ease',
      transform: 'translateX(-50%)',
    },
    navLinkUnderlineHover: {
      width: '80%',
    },
    navToggle: {
      display: 'none',
      flexDirection: 'column',
      cursor: 'pointer',
      padding: '8px',
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    navToggleHover: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      transform: 'scale(1.05)',
    },
    navToggleMobile: {
      display: 'flex',
    },
    bar: {
      width: '25px',
      height: '3px',
      backgroundColor: 'white',
      margin: '3px 0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '2px',
      transformOrigin: 'center',
    },
    bar1Active: {
      transform: 'rotate(45deg) translate(6px, 6px)',
    },
    bar2Active: {
      opacity: 0,
      transform: 'scale(0)',
    },
    bar3Active: {
      transform: 'rotate(-45deg) translate(6px, -6px)',
    },
    rippleEffect: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      pointerEvents: 'none',
    },
  };

  // Enhanced style computation with hover states
  const getNavMenuStyle = () => {
    const baseStyle = {...styles.navMenu};
    
    if (isMobile) {
      Object.assign(baseStyle, styles.navMenuMobile);
      if (isMenuOpen) {
        Object.assign(baseStyle, styles.navMenuMobileActive);
      }
    }
    
    return baseStyle;
  };

  const getNavToggleStyle = () => {
    const baseStyle = {...styles.navToggle};
    
    if (isMobile) {
      Object.assign(baseStyle, styles.navToggleMobile);
    }
    
    return baseStyle;
  };

  const getNavLinkStyle = (index) => {
    const baseStyle = {...styles.navLink};
    const isHovered = hoveredLink === index;
    
    if (isHovered) {
      Object.assign(baseStyle, styles.navLinkHover);
    }
    
    return baseStyle;
  };

  const getNavLogoStyle = () => {
    const baseStyle = {...styles.navLogo};
    const isLogoHovered = hoveredLink === 'logo';
    
    if (isLogoHovered) {
      Object.assign(baseStyle, styles.navLogoHover);
    }
    
    return baseStyle;
  };

  // Ripple effect function
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 0.6s linear';
    circle.style.pointerEvents = 'none';

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Visit Info', path: '/Visitinfo' },
    { label: 'Contact', path: '/ContactForm' },
  ];

  return (
    <>
      <style>
        {`
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .nav-link-item {
            animation: fadeInDown 0.5s ease-out;
          }
          
          .nav-link-item:nth-child(1) { animation-delay: 0.1s; }
          .nav-link-item:nth-child(2) { animation-delay: 0.2s; }
          .nav-link-item:nth-child(3) { animation-delay: 0.3s; }
          .nav-link-item:nth-child(4) { animation-delay: 0.4s; }
          .nav-link-item:nth-child(5) { animation-delay: 0.5s; }
        `}
      </style>
      
      <nav style={styles.navbar} className="nav-container">
        <div style={styles.navContainer}>
          {/* Logo with hover effect */}
          <div 
            style={getNavLogoStyle()}
            onMouseEnter={() => setHoveredLink('logo')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <button 
              onClick={handleHomeNavigation}
              style={{
                color: 'white', 
                textDecoration: 'none', 
                position: 'relative',
                background: 'none',
                border: 'none',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: 0,
              }}
            >
              Panjpeer
              <span style={{
                ...styles.navLogoAfter,
                width: hoveredLink === 'logo' ? '100%' : '0%'
              }}></span>
            </button>
          </div>

          {/* Navigation Menu */}
          <ul style={getNavMenuStyle()}>
            {navLinks.map((link, index) => (
              <li 
                key={index} 
                style={styles.navItem}
                className="nav-link-item"
              >
                <button 
                  style={getNavLinkStyle(index)}
                  onClick={(e) => {
                    createRipple(e);
                    handleNavigation(link.path);
                  }}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <span 
                    style={{
                      ...styles.navLinkUnderline,
                      ...(hoveredLink === index ? styles.navLinkUnderlineHover : {})
                    }}
                  ></span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle Button with enhanced animation */}
          <button 
            style={getNavToggleStyle()} 
            onClick={(e) => {
              toggleMenu();
              createRipple(e);
            }}
            onMouseEnter={() => setHoveredLink('toggle')}
            onMouseLeave={() => setHoveredLink(null)}
            aria-label="Toggle menu"
            className="nav-toggle-btn"
          >
            <span style={{
              ...styles.bar,
              ...(isMenuOpen ? styles.bar1Active : {})
            }}></span>
            <span style={{
              ...styles.bar,
              ...(isMenuOpen ? styles.bar2Active : {})
            }}></span>
            <span style={{
              ...styles.bar,
              ...(isMenuOpen ? styles.bar3Active : {})
            }}></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;