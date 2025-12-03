import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    place: "",
    reviewText: "",
  });
  const [showCount, setShowCount] = useState(3);
  const [loading, setLoading] = useState(false);

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
      await axios.post("http://localhost:5000/api/reviews", formData);
      setFormData({ name: "", email: "", place: "", reviewText: "" });
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Share & Read Reviews
      </h1>

      {/* === SECTION 1: Form === */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Submit Your Review</h2>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <input
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Place Name"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            placeholder="Write your review..."
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none h-28"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </section>

      
    </div>
  );
};

export default ReviewComponent;
