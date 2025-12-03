import React, { useState, useEffect, useMemo, useCallback } from 'react';

const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    isMobile: width < 768,
    width
  };
};

const Card = React.memo(({ section, isMobile, isActive, onHover }) => {
  const cardStyle = useMemo(() => ({
    padding: isMobile ? '20px 16px' : '24px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: isActive 
      ? '0 10px 25px rgba(0,0,0,0.1)' 
      : '0 4px 6px rgba(0,0,0,0.05)',
    borderLeft: `5px solid ${section.accentColor}`,
    transition: 'all 0.2s ease',
    transform: isActive ? 'translateY(-4px)' : 'none'
  }), [isMobile, isActive, section.accentColor]);

  const iconStyle = useMemo(() => ({
    fontSize: isMobile ? '24px' : '28px',
    marginBottom: '12px'
  }), [isMobile]);

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => onHover(section.id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(section.id)}
    >
      <div style={iconStyle}>{section.icon}</div>
      <h3 style={{ 
        margin: '0 0 16px 0', 
        fontSize: isMobile ? '18px' : '20px',
        color: '#1f2937'
      }}>
        {section.title}
      </h3>
      
      <div style={{ marginBottom: '16px' }}>
        {section.data.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #f3f4f6',
            fontSize: isMobile ? '14px' : '15px'
          }}>
            <span style={{ color: '#4b5563', fontWeight: '500' }}>
              {item.metric}
            </span>
            <span style={{ color: '#6b7280', textAlign: 'right' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
      <div style={{
        padding: '12px',
        backgroundColor: `${section.accentColor}10`,
        borderRadius: '6px',
        fontSize: isMobile ? '13px' : '14px',
        color: '#374151',
        borderLeft: `3px solid ${section.accentColor}`
      }}>
        {section.description}
      </div>
    </div>
  );
});

const PanjpeerPracticalInfo = () => {
  const { isMobile, width } = useResponsive();
  const [activeCard, setActiveCard] = useState(null);

  const sections = useMemo(() => [
    {
      id: 1,
      title: '⛰️ Geological Details',
      icon: '⛰️',
      accentColor: '#1e3a8a',
      data: [
        { metric: 'Elevation', value: '5,900 ft (1,800m)' },
        { metric: 'Rock Type', value: 'Precambrian Sandstone' },
        { metric: 'Ridge Length', value: '4 km' },
      ],
      description: 'Ancient uplift and erosion formed unique stepped rocks.'
    },
    {
      id: 2,
      title: '🧗 Trekking Info',
      icon: '🧗',
      accentColor: '#b91c1c',
      data: [
        { metric: 'Trail Length', value: '6 km round trip' },
        { metric: 'Elevation Gain', value: '1,500 ft (450m)' },
        { metric: 'Difficulty', value: 'Moderate-Strenuous' },
      ],
      description: 'Regularly maintained trails with safety ropes on steep sections.'
    },
    {
      id: 3,
      title: '🌳 Conservation',
      icon: '🌳',
      accentColor: '#059669',
      data: [
        { metric: 'Forest Type', value: 'Pine, Oak, Cypress' },
        { metric: 'Status', value: 'Protected Area' },
        { metric: 'Water', value: 'Natural springs' },
      ],
      description: 'Crucial for local biodiversity and climate regulation.'
    },
    {
      id: 4,
      title: '📍 Navigation',
      icon: '📍',
      accentColor: '#2563eb',
      data: [
        { metric: 'Markers', value: 'GPS & trail posts' },
        { metric: 'Base Camp', value: '4,400 ft (1,340m)' },
        { metric: 'Guides', value: 'Required for climbing' },
      ],
      description: 'Guides trained in wilderness first aid and rescue.'
    },
    {
      id: 5,
      title: '☁️ Weather',
      icon: '☁️',
      accentColor: '#d97706',
      data: [
        { metric: 'Best Season', value: 'Spring & Autumn' },
        { metric: 'Monsoon', value: 'Restricted access' },
        { metric: 'Winter', value: 'Snow closures' },
      ],
      description: 'Check forecasts before ascent - conditions change rapidly.'
    },
  ], []);

  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  }), [isMobile]);

  const handleCardHover = useCallback((id) => {
    if (!isMobile) {
      setActiveCard(id);
    }
  }, [isMobile]);

  return (
    <div style={{
      padding: isMobile ? '20px 16px' : '40px 24px',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: isMobile ? '24px' : '32px',
        textAlign: 'center',
        marginBottom: isMobile ? '24px' : '40px',
        color: '#111827',
        fontWeight: '700'
      }}>
        🏔️ Panjpeer Rocks Guide
      </h1>
      
      <p style={{
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '32px',
        fontSize: isMobile ? '14px' : '16px',
        maxWidth: '800px',
        margin: '0 auto 32px',
        lineHeight: '1.6'
      }}>
        Essential geological, trekking, and safety information
      </p>
      
      <div style={gridStyle}>
        {sections.map(section => (
          <Card
            key={section.id}
            section={section}
            isMobile={isMobile}
            isActive={activeCard === section.id}
            onHover={handleCardHover}
          />
        ))}
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '13px',
        color: '#9ca3af'
      }}>
        Data provided by Panjpeer Conservation Authority • Updated {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default React.memo(PanjpeerPracticalInfo);