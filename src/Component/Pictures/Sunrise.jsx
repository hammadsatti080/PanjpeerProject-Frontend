import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sunrise() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  // Admin credentials (in real app, use environment variables)
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/images');
      setImages(res.data);
    } catch (error) {
      console.error('Error fetching images:', error);
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
      await axios.post('http://localhost:5000/api/images', { url, title });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 flex items-center justify-center px-4 overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-orange-500 mx-auto mb-3 md:mb-4"></div>
          <p className="text-orange-700 text-base md:text-lg">Loading Sunrise Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 py-4 md:py-8 mt-16 md:mt-20 overflow-x-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 md:mb-12 w-full">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 md:mb-6 break-words">
            Sunrise <span className="text-orange-600">Gallery</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-2 break-words">
            Golden moments at Panjpeer Rocks - A collection of breathtaking sunrise photographs
          </p>

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
              <div className="text-center mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Admin Login</h3>
                <p className="text-gray-600 text-xs md:text-sm">Enter password to manage gallery</p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-3 md:space-y-4 w-full">
                <div>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 text-sm md:text-base"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2 md:py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="flex-1 bg-gray-500 text-white py-2 md:py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors duration-300 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add Image Form (Only for Admin) */}
          {adminMode && (
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl mb-6 md:mb-8 border-2 border-green-200 w-full">
              <div className="text-center mb-3 md:mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-green-700">➕ Add New Image</h3>
                <p className="text-gray-600 text-sm md:text-base">Admin: Add new sunrise images to the gallery</p>
              </div>
              <form onSubmit={addImage} className="space-y-3 md:space-y-4 w-full">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Image Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Beautiful Sunrise at Panjpeer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 md:py-3 rounded-xl font-bold text-sm md:text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Add to Gallery
                </button>
              </form>
            </div>
          )}

          {/* Stats */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 inline-block mx-auto">
            <div className="flex items-center justify-center space-x-4 md:space-x-6 text-gray-700 flex-wrap gap-2 md:gap-0">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">{images.length}</div>
                <div className="text-xs md:text-sm">Total Images</div>
              </div>
              <div className="h-6 md:h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-600">50+</div>
                <div className="text-xs md:text-sm">Sunrise Views</div>
              </div>
              <div className="h-6 md:h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  {adminMode ? '🔓' : '🔒'}
                </div>
                <div className="text-xs md:text-sm">Admin {adminMode ? 'Active' : 'Locked'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center py-12 md:py-16 px-4 w-full">
            <div className="text-5xl md:text-6xl mb-3 md:mb-4">🌅</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">No Images Yet</h3>
            <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base max-w-md mx-auto">
              {adminMode 
                ? "Add the first image using the form above!" 
                : "Gallery is empty. Contact admin to add images."
              }
            </p>
            {!adminMode && (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-300 text-sm md:text-base mx-auto"
              >
                Request Admin Access
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {images.map((img, index) => (
              <div 
                key={img._id} 
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <img 
                  src={img.url} 
                  alt={img.title || 'Panjpeer Sunrise'} 
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE1MCAxMDBIMjUwTDIwMCAxNTBaIiBmaWxsPSIjRkRCQjQ2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5QzlDOUMiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 text-white">
                    {/* Title */}
                    {img.title && (
                      <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1 md:mb-2 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300 line-clamp-2 break-words">
                        {img.title}
                      </h3>
                    )}
                    
                    {/* Description */}
                    <p className="text-gray-200 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Beautiful sunrise at Panjpeer Rocks
                    </p>
                    
                    {/* Admin Badge */}
                    {adminMode && (
                      <div className="mt-1 md:mt-2 bg-green-500/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold inline-block">
                        Admin View
                      </div>
                    )}
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-orange-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-8 md:mt-12 px-4 w-full">
          <p className="text-gray-600 italic text-sm md:text-base max-w-2xl mx-auto">
            "Every sunrise at Panjpeer Rocks tells a unique story of nature's beauty"
          </p>
          {!adminMode && (
            <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2 max-w-md mx-auto">
              🔒 Image upload restricted to authorized administrators only
            </p>
          )}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-4 sm:left-10 w-16 h-16 md:w-20 md:h-20 bg-orange-300 rounded-full blur-xl opacity-20"></div>
        <div className="absolute top-40 right-4 sm:right-10 md:right-20 w-24 h-24 md:w-32 md:h-32 bg-amber-300 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 md:left-1/3 w-20 h-20 md:w-24 md:h-24 bg-yellow-300 rounded-full blur-xl opacity-20"></div>
      </div>
    </div>
  );
}

export default Sunrise;