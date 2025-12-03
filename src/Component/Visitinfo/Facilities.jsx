import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const facilities = [
    { 
      id: 1,
      name: "Parking", 
      icon: "🚗", 
      detail: "Secure parking available 24/7",
      description: "Our parking facility offers CCTV surveillance, well-lit areas, and separate sections for bikes, cars, and large vehicles. Parking attendants are available during peak hours.",
      price: "50 Rs (Bike) | 100 Rs (Car) | 200 Rs (Large Vehicle)",
      timing: "24 Hours",
      contact: "Parking Manager: 0300-1234567",
      phoneNumber: "03001234567", // Phone number for direct calling
      phoneLabel: "Call Parking Manager",
      features: ["CCTV Surveillance", "Attended Parking", "Well-lit Area", "Separate Sections"]
    },
    { 
      id: 2,
      name: "Rest Area", 
      icon: "🛋️", 
      detail: "Comfortable resting zones",
      description: "Air-conditioned rest areas with comfortable seating, charging ports, and complimentary drinking water. Perfect for families and large groups.",
      price: "Free (Day Visit) | 500 Rs (Overnight)",
      timing: "6:00 AM - 10:00 PM",
      contact: "Rest Area Manager: 0300-2345678",
      phoneNumber: "03002345678",
      phoneLabel: "Call Rest Area Manager",
      features: ["AC Facility", "Charging Ports", "Drinking Water", "Family Seating"]
    },
    { 
      id: 3,
      name: "Viewing Point", 
      icon: "🌄", 
      detail: "Panoramic scenic viewpoints",
      description: "Designated viewing platforms with binocular stations and photography spots. Best visited during sunrise and sunset for breathtaking views.",
      timing: "5:00 AM - 8:00 PM",
      contact: "View Point Coordinator: 0300-3456789",
      phoneNumber: "03003456789",
      phoneLabel: "Call View Point Coordinator",
      features: ["Binocular Stations", "Photography Spots", "Safety Railings", "Seating Arrangement"]
    },
    { 
      id: 4,
      name: "Guide Service", 
      icon: "🧭", 
      detail: "Professional guided tours",
      description: "Certified local guides available in multiple languages. They provide historical insights, safety guidance, and enhance your overall experience.",
      price: "500 Rs (1 Hour) | 1500 Rs (Full Day)",
      timing: "8:00 AM - 6:00 PM",
      contact: "Guide Coordinator: 0300-4567890",
      phoneNumber: "03004567890",
      phoneLabel: "Call Guide Coordinator",
      features: ["Multi-lingual", "Certified Guides", "Historical Insights", "Safety Briefing"]
    },
    { 
      id: 5,
      name: "Information Center", 
      icon: "ℹ️", 
      detail: "Visitor information & support",
      description: "Central information hub with maps, brochures, and knowledgeable staff to help plan your visit. Emergency contact point available.",
      timing: "7:00 AM - 9:00 PM",
      contact: "Info Desk: 0300-0000000",
      phoneNumber: "03000000000",
      phoneLabel: "Call Information Center",
      features: ["Maps & Brochures", "Emergency Contact", "Tour Planning", "Multilingual Staff"]
    },
    { 
      id: 6,
      name: "Security", 
      icon: "🛡️", 
      detail: "24/7 security surveillance",
      description: "Trained security personnel patrol the area 24/7. Emergency response team available. Lost & found service at security office.",
      timing: "24 Hours",
      contact: "Security Control: 1122",
      phoneNumber: "1122",
      phoneLabel: "Call Security Control",
      features: ["Trained Personnel", "Patrol Teams", "Emergency Response", "Lost & Found"]
    },
    { 
      id: 7,
      name: "Washrooms", 
      icon: "🚻", 
      detail: "Clean sanitation facilities",
      description: "Modern washrooms with separate male/female sections. Maintained regularly with proper hygiene standards. Baby changing stations available.",
      timing: "24 Hours",
      contact: "Maintenance: 0300-5678901",
      phoneNumber: "03005678901",
      phoneLabel: "Call Maintenance",
      features: ["Separate Sections", "Regular Cleaning", "Hygiene Maintained", "Baby Changing"]
    },
    { 
      id: 8,
      name: "First Aid", 
      icon: "🏥", 
      detail: "Medical assistance available",
      description: "Basic first aid station with trained medical staff. Emergency medical supplies and oxygen available. Ambulance on standby.",
      timing: "24 Hours",
      contact: "Medical Emergency: 1122",
      phoneNumber: "1122",
      phoneLabel: "Call Medical Emergency",
      features: ["Trained Staff", "Emergency Supplies", "Oxygen Available", "Ambulance Service"]
    },
    { 
      id: 9,
      name: "Food Court", 
      icon: "🍔", 
      detail: "Variety of dining options",
      description: "Multiple food stalls offering local and international cuisine. Halal certified. Outdoor seating with scenic views available.",
      price: "Varies by stall",
      timing: "8:00 AM - 10:00 PM",
      contact: "Food Court Manager: 0300-6789012",
      phoneNumber: "03006789012",
      phoneLabel: "Call Food Court Manager",
      features: ["Local Cuisine", "Halal Certified", "Outdoor Seating", "Clean Kitchen"]
    },
    { 
      id: 10,
      name: "Souvenir Shop", 
      icon: "🛍️", 
      detail: "Memorabilia & gifts",
      description: "Authentic local crafts, souvenirs, and memorabilia. Support local artisans with your purchase.",
      timing: "9:00 AM - 7:00 PM",
      contact: "Shop Manager: 0300-7890123",
      phoneNumber: "03007890123",
      phoneLabel: "Call Shop Manager",
      features: ["Local Crafts", "Authentic Souvenirs", "Reasonable Prices", "Local Artisans"]
    },
    { 
      id: 11,
      name: "WiFi Zone", 
      icon: "📡", 
      detail: "Free internet access",
      description: "High-speed WiFi available in designated areas. Connect instantly with provided credentials.",
      timing: "24 Hours",
      contact: "IT Support: 0300-8901234",
      phoneNumber: "03008901234",
      phoneLabel: "Call IT Support",
      features: ["High-speed", "Multiple Devices", "Easy Login", "Designated Zones"]
    },
    { 
      id: 12,
      name: "Prayer Area", 
      icon: "🕌", 
      detail: "Designated prayer spaces",
      description: "Clean and peaceful prayer areas with separate sections. Prayer mats and Quran available.",
      timing: "24 Hours",
      contact: "Facilities Manager: 0300-9012345",
      phoneNumber: "03009012345",
      phoneLabel: "Call Facilities Manager",
      features: ["Separate Sections", "Prayer Mats", "Ablution Area", "Peaceful Environment"]
    }
  ];

  const openModal = (facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFacility(null), 300);
  };

  // Function to initiate phone call
  const initiatePhoneCall = (phoneNumber) => {
    // For mobile devices, tel: link will open phone dialer
    // For web, it will show alert
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // For desktop, show a message with the number
      alert(`Please call: ${phoneNumber}\n\nOn mobile devices, this would automatically open your phone dialer.`);
    }
  };

  // Function to copy phone number to clipboard
  const copyPhoneNumber = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        alert(`Phone number copied to clipboard: ${phoneNumber}`);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
          <span className="text-3xl">⭐</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Available Facilities
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Discover all amenities and services. Click any facility for details and direct contact.
        </p>
      </motion.div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {facilities.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer"
            onClick={() => openModal(item)}
          >
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 mb-4">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.detail}</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                View Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety Advice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 shadow-lg mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-3">Important Safety Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <span className="text-red-700">Do not climb mountains or trees — dangerous and unstable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <span className="text-red-700">Stay only on designated walking paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <span className="text-red-700">Keep a safe distance from edges and high drops</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <span className="text-red-700">Supervise children at all times</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <span className="text-red-700">Follow guide and staff instructions strictly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <span className="text-red-700">Carry necessary medications if required</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl border border-red-200">
              <p className="text-red-600 font-medium">
                <span className="font-bold">Emergency Contact:</span> 1122 (24/7 Helpline)
                <button 
                  onClick={() => initiatePhoneCall("1122")}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  📞 Call Now
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Facility Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedFacility && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                        <span className="text-3xl">{selectedFacility.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedFacility.name}</h2>
                        <p className="text-blue-100">{selectedFacility.detail}</p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedFacility.description}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedFacility.timing && (
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Timing</p>
                        <p className="font-semibold text-blue-600">{selectedFacility.timing}</p>
                      </div>
                    )}
                    {selectedFacility.price && (
                      <div className="bg-green-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Price</p>
                        <p className="font-semibold text-green-600">{selectedFacility.price}</p>
                      </div>
                    )}
                    {selectedFacility.contact && (
                      <div className="col-span-2 bg-purple-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                        <p className="font-semibold text-purple-600 text-lg mb-2">{selectedFacility.contact}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => initiatePhoneCall(selectedFacility.phoneNumber)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {selectedFacility.phoneLabel}
                          </button>
                          <button
                            onClick={() => copyPhoneNumber(selectedFacility.phoneNumber)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {selectedFacility.features && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFacility.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-lg text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Contact Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Need Immediate Assistance?</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-500">Direct Phone</p>
                          <p className="font-bold text-lg">{selectedFacility.phoneNumber}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => initiatePhoneCall(selectedFacility.phoneNumber)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Now
                          </button>
                          <button
                            onClick={() => copyPhoneNumber(selectedFacility.phoneNumber)}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            title="Copy Phone Number"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        On mobile devices, clicking "Call Now" will open your phone dialer
                      </p>
                    </div>
                  </div>

                  {/* Emergency Contact Always Available */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <span className="text-xl">🚨</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-red-700">Emergency Contact (24/7)</p>
                        <p className="text-red-600">1122 - Available for all emergencies</p>
                      </div>
                      <button
                        onClick={() => initiatePhoneCall("1122")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Call 1122
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t p-4 rounded-b-3xl">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Close
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyPhoneNumber(selectedFacility.phoneNumber)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Copy Number
                      </button>
                      <button
                        onClick={() => initiatePhoneCall(selectedFacility.phoneNumber)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Manager
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Call Button for Emergency */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => initiatePhoneCall("1122")}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="font-bold">Emergency: 1122</span>
      </motion.button>
    </div>
  );
}