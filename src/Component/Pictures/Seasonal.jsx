import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Seasonal() {

    const SEASONS = ['spring', 'summer', 'autumn', 'winter'];

const SEASON_ICONS = {
  spring: '🌸',
  summer: '☀️',
  autumn: '🍂',
  winter: '❄️',
  all: '🌎'
};

const SEASON_COLORS = {
  spring: 'from-green-500 to-emerald-600',
  summer: 'from-yellow-500 to-orange-600',
  autumn: 'from-orange-500 to-red-600',
  winter: 'from-blue-400 to-cyan-600',
  all: 'from-purple-500 to-pink-600'
};



  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const ADMIN_PASSWORD = "admin123";

  const panjpeerImages = [
    "https://www.silkroadguides.com/wp-content/uploads/photo-gallery/Panjpeer_Rocks_Tour/Team46@-PanjPeer-Rocks-Azad-Jummun-n-Kashmir.jpeg?bwg=1694430275",
    "https://preview.redd.it/g2yjxfsg80wy.jpg?auto=webp&s=92e18bd5131573e29bf4a050d751125fd15da0d3",
    "https://travelertrails.com/wp-content/uploads/2022/08/1745637719-1.jpg",
    "https://i0.wp.com/www.nadiyanajib.com/wp-content/uploads/2018/09/IMG_0081.jpg?fit=957%2C718&ssl=1",
    "https://i.ytimg.com/vi/lPtMP7_AzVM/maxresdefault.jpg",
    "https://www.natureadventureclub.pk/wp-content/uploads/2025/07/Panjpeer-Rocks-View.jpg",
    "https://www.travelertrails.com/wp-content/uploads/2022/08/2068755713-1.jpg"
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/Season');
      setImages(res.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Fallback to local images
      setImages(panjpeerImages.map((url, index) => ({
        _id: index,
        url,
        title: `Panjpeer Rocks ${index + 1}`,
        season: SEASONS[index % SEASONS.length]
      })));
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminMode(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const addImage = async (e) => {
    e.preventDefault();
    if (!url) return;
    try {
      await axios.post('http://localhost:5000/api/season', { 
        url, 
        title,
        season: selectedSeason !== 'all' ? selectedSeason : 'summer'
      });
      setUrl('');
      setTitle('');
      fetchImages();
      alert('Image added successfully!');
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Error adding image');
    }
  };

  const logoutAdmin = () => {
    setAdminMode(false);
    setUrl('');
    setTitle('');
  };

  const filteredImages = selectedSeason === 'all' 
    ? images 
    : images.filter(img => img.season === selectedSeason);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center px-4 overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-purple-500 mx-auto mb-3 md:mb-4"></div>
          <p className="text-purple-700 text-base md:text-lg">Loading Seasonal Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 py-4 md:py-8 mt-16 md:mt-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 md:mb-6 break-words">
            Seasonal <span className="text-purple-600">Beauty</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-2 break-words">
            Experience Panjpeer Rocks through all four seasons - Each with its unique charm and beauty
          </p>

          {/* Season Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            {['all', ...SEASONS].map(season => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm md:text-base capitalize ${
                  selectedSeason === season
                    ? `bg-gradient-to-r ${SEASON_COLORS[season]} text-white`
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                <span className="text-lg">{SEASON_ICONS[season]}</span>
                <span>{season}</span>
              </button>
            ))}
          </div>

          {/* Admin Controls */}
          <div className="flex flex-col items-center space-y-3 md:space-y-4 mb-6 md:mb-8 w-full">
            {!adminMode ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm md:text-base w-full max-w-xs mx-auto"
              >
                🔒 Admin Access
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-3 md:p-4 w-full max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 justify-center sm:justify-between">
                  <span className="text-green-600 font-semibold text-sm md:text-base text-center sm:text-left">
                    ✅ Admin Mode Active
                  </span>
                  <button
                    onClick={logoutAdmin}
                    className="bg-red-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 text-sm md:text-base"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Login Form */}
          {showLogin && (
            <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl mb-6 md:mb-8 w-full">
              <form onSubmit={handleAdminLogin} className="space-y-3 md:space-y-4 w-full">
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-sm md:text-base"
                />
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 md:py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm md:text-base">Login</button>
                  <button type="button" onClick={() => setShowLogin(false)} className="flex-1 bg-gray-500 text-white py-2 md:py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors duration-300 text-sm md:text-base">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Add Image Form */}
          {adminMode && (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl mb-6 md:mb-8 border-2 border-green-200 w-full">
              <form onSubmit={addImage} className="space-y-3 md:space-y-4 w-full">
                <input type="url" placeholder="Image URL" value={url} onChange={(e) => setUrl(e.target.value)} required className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-sm md:text-base" />
                <input type="text" placeholder="Image Title (Optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-sm md:text-base" />
                <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-sm md:text-base">
                  {SEASONS.map(season => <option key={season} value={season}>{SEASON_ICONS[season]} {season.charAt(0).toUpperCase() + season.slice(1)}</option>)}
                </select>
                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 md:py-3 rounded-xl font-bold text-sm md:text-lg shadow-lg transform hover:scale-105 transition-all duration-300">Add to Seasonal Gallery</button>
              </form>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12 md:py-16 px-4 w-full">
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">No {selectedSeason !== 'all' ? selectedSeason : ''} Images Yet</h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">{adminMode ? `Add the first ${selectedSeason} image using the form above!` : `No ${selectedSeason} images available. Contact admin.`}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {filteredImages.map((img, index) => (
              <div key={img._id} className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer">
                <img src={img.url} alt={img.title || `Panjpeer ${img.season}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" onError={(e) => e.target.src='https://via.placeholder.com/400x300?text=Image+Not+Found'} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 text-white">
                  {img.title && <h3 className="font-bold text-lg mb-1 line-clamp-2">{img.title}</h3>}
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold mb-2 bg-gradient-to-r ${SEASON_COLORS[img.season]}`}>
                    <span>{SEASON_ICONS[img.season]}</span>
                    <span className="capitalize">{img.season}</span>
                  </div>
                  <p className="text-gray-200 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Panjpeer Rocks in {img.season}
                  </p>
                  {adminMode && <div className="mt-1 bg-green-500/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold inline-block">Admin View</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Seasonal;
