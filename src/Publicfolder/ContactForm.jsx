import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setSuccess(res.data.message || "Message Sent Successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header Section */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Contact Tourism Team</h2>
          <p style={subtitleStyle}>Let us craft your perfect Panjpeer experience</p>
        </div>

        <form onSubmit={submitForm} style={formStyle}>
          {/* Name Field */}
          <div style={inputContainerStyle}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              style={inputFieldStyle}
              disabled={loading}
            />
          </div>

          {/* Email Field */}
          <div style={inputContainerStyle}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              style={inputFieldStyle}
              disabled={loading}
            />
          </div>

          {/* Phone Field */}
          <div style={inputContainerStyle}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              style={inputFieldStyle}
              disabled={loading}
            />
          </div>

          {/* Message Field */}
          <div style={inputContainerStyle}>
            <textarea
              name="message"
              placeholder="Tell us about your travel plans, questions, or special requests..."
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              style={{...inputFieldStyle, height: '120px', resize: 'none'}}
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={loading ? {...submitButtonStyle, ...loadingButtonStyle} : submitButtonStyle}
          >
            {loading ? (
              <div style={loadingContainerStyle}>
                <div style={spinnerStyle}></div>
                Sending Message...
              </div>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Success Message */}
          {success && (
            <div style={successStyle}>
              {success}
            </div>
          )}
        </form>

        {/* Footer Info */}
        <div style={footerStyle}>
          <div style={infoGridStyle}>
            <div style={infoItemStyle}>
              <span style={infoIconStyle}>⏰</span>
              <div>
                <div style={infoTitleStyle}>Response Time</div>
                <div style={infoTextStyle}>2-4 Hours</div>
              </div>
            </div>
            <div style={infoItemStyle}>
              <span style={infoIconStyle}>📞</span>
              <div>
                <div style={infoTitleStyle}>Call Us</div>
                <div style={infoTextStyle}>+91 98765 43210</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ContactForm;

// ==================== STYLES ====================

const containerStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
  marginTop:"100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "480px",
  background: "white",
  borderRadius: "16px",
  padding: "40px 35px",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  animation: "fadeIn 0.8s ease-out",
  border: "1px solid #e2e8f0",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "35px",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  margin: "0 0 8px 0",
  color: "#1e293b",
};

const subtitleStyle = {
  fontSize: "1.1rem",
  color: "#64748b",
  margin: "0",
  fontWeight: "500",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "30px",
};

const inputContainerStyle = {
  position: "relative",
};

const inputFieldStyle = {
  width: "100%",
  padding: "16px 20px",
  borderRadius: "12px",
  border: "2px solid #e2e8f0",
  outline: "none",
  fontSize: "1rem",
  background: "white",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
  boxSizing: "border-box",
  fontWeight: "500",
  color: "#1e293b",
};

const submitButtonStyle = {
  width: "100%",
  padding: "16px 24px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "1.1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const loadingButtonStyle = {
  cursor: "not-allowed",
  opacity: "0.7",
};

const loadingContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const spinnerStyle = {
  width: "18px",
  height: "18px",
  border: "2px solid transparent",
  borderTop: "2px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const successStyle = {
  padding: "16px",
  background: "#dcfce7",
  color: "#166534",
  borderRadius: "12px",
  textAlign: "center",
  fontWeight: "600",
  animation: "fadeIn 0.5s ease-out",
  border: "1px solid #bbf7d0",
};

const footerStyle = {
  borderTop: "1px solid #e2e8f0",
  paddingTop: "25px",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const infoItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  background: "#f8fafc",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
};

const infoIconStyle = {
  fontSize: "1.4rem",
};

const infoTitleStyle = {
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#64748b",
  marginBottom: "2px",
};

const infoTextStyle = {
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#1e293b",
};