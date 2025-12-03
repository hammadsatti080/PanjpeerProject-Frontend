import React, { useState, useEffect } from "react";
import axios from "axios";

const Sections = () => {
  const [reviews, setReviews] = useState([]);
  const [showCount, setShowCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [expanding, setExpanding] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleLoadMore = () => {
    setExpanding(true);
    setTimeout(() => {
      setShowCount(showCount + 3);
      setExpanding(false);
    }, 300);
  };

  // Function to generate random gradient for cards
  const getCardGradient = (index) => {
    const gradients = [
      'from-green-50 to-emerald-50 border-green-200',
      'from-blue-50 to-cyan-50 border-blue-200',
      'from-purple-50 to-indigo-50 border-purple-200',
      'from-orange-50 to-amber-50 border-orange-200',
      'from-pink-50 to-rose-50 border-pink-200',
      'from-teal-50 to-emerald-50 border-teal-200'
    ];
    return gradients[index % gradients.length];
  };

  // Function to get initial for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // Function to get random color for avatar
  const getAvatarColor = (index) => {
    const colors = [
      'bg-gradient-to-r from-green-500 to-emerald-600',
      'bg-gradient-to-r from-blue-500 to-cyan-600',
      'bg-gradient-to-r from-purple-500 to-indigo-600',
      'bg-gradient-to-r from-orange-500 to-amber-600',
      'bg-gradient-to-r from-pink-500 to-rose-600',
      'bg-gradient-to-r from-teal-500 to-emerald-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-3 sm:mb-4">
            User Reviews
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover what our visitors have to say about their amazing experiences
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 sm:py-16">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${expanding ? 'scale-95' : 'scale-100'}`}>
            {reviews.slice(0, showCount).map((rev, index) => (
              <div
                key={rev._id}
                className={`bg-gradient-to-br ${getCardGradient(index)} rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header with Avatar */}
                <div className="p-4 sm:p-6 border-b border-white/50">
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    {/* User Avatar */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0`}>
                      {getInitial(rev.name)}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{rev.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">{rev.email}</p>
                      
                      {/* Place Badge - Mobile: below name, Desktop: inline */}
                      <div className="mt-2 sm:mt-0 sm:hidden">
                        <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full shadow">
                          <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {rev.place}
                        </span>
                      </div>
                    </div>
                    
                    {/* Place Badge - Desktop */}
                    <span className="hidden sm:inline-flex items-center px-2 sm:px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full shadow-lg flex-shrink-0">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {rev.place}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start">
                    {/* Quote Icon */}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm line-clamp-4 sm:line-clamp-none">
                      {rev.reviewText}
                    </p>
                  </div>

                  {/* Rating Stars (if available) */}
                  {rev.rating && (
                    <div className="flex items-center mt-3 sm:mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rev.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-xs sm:text-sm text-gray-500">({rev.rating}/5)</span>
                    </div>
                  )}

                  {/* Review Date (if available) */}
                  {rev.createdAt && (
                    <div className="flex items-center mt-2 sm:mt-3 text-xs text-gray-500">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white/50 border-t border-white/50">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0 text-xs text-gray-500">
                    <span className="text-center sm:text-left">Verified Review</span>
                    <div className="flex items-center justify-center sm:justify-start">
                      <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Helpful
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Load More Button */}
        {showCount < reviews.length && (
          <div className="text-center mt-8 sm:mt-12 animate-fade-in-up">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 font-semibold flex items-center justify-center mx-auto w-full sm:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm sm:text-base">Load More Reviews</span>
              <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs hidden sm:inline">
                {reviews.length - showCount} remaining
              </span>
            </button>
            {/* Mobile-only remaining count */}
            <p className="text-xs text-gray-600 mt-2 sm:hidden">
              {reviews.length - showCount} more reviews available
            </p>
          </div>
        )}

        {/* No more reviews message */}
        {reviews.length > 0 && showCount >= reviews.length && (
          <div className="text-center mt-6 sm:mt-8 animate-fade-in">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 inline-block max-w-sm sm:max-w-md">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">All Reviews Loaded!</h3>
              <p className="text-sm text-gray-600">You've seen all {reviews.length} reviews from our visitors.</p>
            </div>
          </div>
        )}

        {/* No reviews message */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-12 sm:py-16 animate-fade-in">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-sm sm:text-base text-gray-500">Be the first to share your experience!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sections;