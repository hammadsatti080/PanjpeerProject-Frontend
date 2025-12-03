import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    place: "",
    reviewText: "",
  });
  const [showCount, setShowCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const submissionData = {
        ...formData,
        rating: rating,
        createdAt: new Date().toISOString()
      };
      await axios.post("http://localhost:5000/api/reviews", submissionData);
      setFormData({ name: "", email: "", place: "", reviewText: "" });
      setRating(0);
      fetchReviews();
      
      // Success notification
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: { message: "Review submitted successfully! 🎉", type: "success" }
        }));
      }
    } catch (err) {
      console.error("Failed to submit review", err);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: { message: "Failed to submit review. Please try again.", type: "error" }
        }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.slice(0, showCount);

  const getRandomColor = (name) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500", 
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const StarRating = ({ rating, onRate, hoverRating, onHover }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            className="text-2xl focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            {star <= (hoverRating || rating) ? "⭐" : "☆"}
          </button>
        ))}
      </div>
    );
  };

  const ReviewCard = ({ review, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="bg-gray-900 rounded-3xl p-6 border border-gray-700 shadow-2xl shadow-black/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${getRandomColor(review.name)} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/25`}>
                {getInitials(review.name)}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{review.name}</h3>
                <p className="text-gray-400 text-sm">{review.email}</p>
              </div>
            </div>
            <div className="text-right">
             
              {review.rating && (
                <div className="flex justify-end space-x-1 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-500/25">
              {review.place}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed text-lg line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            "{review.reviewText}"
          </p>

          {/* Interactive Elements */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex space-x-4 text-sm text-gray-400">
              <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200">
                <span>👍</span>
                <span>Helpful</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors duration-200">
                <span>💬</span>
                <span>Reply</span>
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse" />
            <h1 className="relative text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Share Your Journey
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of travelers sharing their unforgettable experiences. Your story inspires the next adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          
          {/* Enhanced Form Section - Black Background */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Main Form Card - Black Background */}
            <div className=" rounded-3xl p-8 shadow-2xl shadow-black/50 border border-gray-800 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/25">
                  <span className="text-white text-2xl">✍️</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Tell Your Story</h2>
                  <p className="text-gray-400 text-lg">Share what made your trip special</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your beautiful name"
                      required
                      className="w-full p-4 rounded-2xl border-2 border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-gray-800 text-white placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="hello@example.com"
                      required
                      className="w-full p-4 rounded-2xl border-2 border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-gray-800 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Destination</label>
                  <input
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    placeholder="Where did you explore?"
                    required
                    className="w-full p-4 rounded-2xl border-2 border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-gray-800 text-white placeholder-gray-500"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Your Rating</label>
                  <StarRating 
                    rating={rating} 
                    onRate={setRating}
                    hoverRating={hoverRating}
                    onHover={setHoverRating}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Your Experience</label>
                  <textarea
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleChange}
                    placeholder="Describe your adventure... What made it memorable? Any tips for fellow travelers?"
                    required
                    rows="5"
                    className="w-full p-4 rounded-2xl border-2 border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 resize-none bg-gray-800 text-white placeholder-gray-500"
                  />
                </div>

                {/* Updated Button with Blue-Purple Gradient */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full  text-white py-5 px-8 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      <span className="text-lg">Crafting Your Story...</span>
                    </div>
                  ) : (
                    <span className="Relative">Share Your Experience 🚀</span>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Enhanced Stats Card - Black Background */}
            <div className=" rounded-3xl p-8 text-white shadow-2xl shadow-black/50 border border-gray-800">
              <h3 className="text-2xl font-black mb-6 text-center text-white">Community Impact</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {reviews.length}+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {new Set(reviews.map(r => r.place)).size}+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {reviews.reduce((acc, review) => acc + (review.rating || 0), 0)}+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Stars</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Enhanced Reviews Display - Black Background */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className=" rounded-3xl p-8 shadow-2xl shadow-black/50 border border-gray-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Traveler Chronicles</h2>
                  <p className="text-gray-400 text-lg">Real stories from real adventurers</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <div className="text-right">
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Showing</div>
                    <div className="text-2xl font-black text-white">
                      {Math.min(showCount, reviews.length)} of {reviews.length}
                    </div>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400">Loading amazing stories...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <AnimatePresence>
                      {filteredReviews.map((review, index) => (
                        <ReviewCard key={review._id} review={review} index={index} />
                      ))}
                    </AnimatePresence>
                  </div>

                  {reviews.length > showCount && (
                    <div className="text-center mt-8">
                      {/* Updated Load More Button with Blue-Purple Gradient */}
                      <motion.button
                        onClick={() => setShowCount(showCount + 3)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white py-4 px-10 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 shadow-2xl shadow-blue-500/25"
                      >
                        Discover More Stories
                      </motion.button>
                    </div>
                  )}

                  {reviews.length === 0 && !loading && (
                    <div className="text-center py-16">
                      <div className="text-8xl mb-6">🌄</div>
                      <h3 className="text-2xl font-black text-gray-400 mb-4">No Adventures Yet</h3>
                      <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Be the pioneer! Share your first travel story and inspire others to explore.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-pulse" />
      <div className="fixed top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-bounce" />
      <div className="fixed bottom-32 left-20 w-3 h-3 bg-cyan-400 rounded-full opacity-40 animate-ping" />
    </div>
  );
};

export default Review;