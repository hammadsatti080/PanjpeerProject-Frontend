import React from "react";
import { motion } from "framer-motion";

function History() {
  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-24 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-amber-100 rounded-full opacity-20"></div>
      </div>

      {/* Main Title with Decoration */}
      <motion.div
        className="relative mb-12 md:mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
          <div className="w-8 h-8 text-amber-600 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">✵</span>
          </div>
          <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="text-amber-800">History & Background</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl text-amber-700 mt-2 block">
            of Panjpeer
          </span>
        </h1>
        
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto px-4">
          Centuries of Faith, Tradition, and Spiritual Legacy
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
        
        {/* Left Column - Main Stories */}
        <div className="space-y-8 md:space-y-10">
          
          {/* Why Name Panjpeer? - Card Style */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-amber-100"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-xl">
                <span className="text-2xl text-amber-700">📖</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Why <span className="text-amber-700">"Panjpeer"</span>?
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              The name <strong className="text-amber-800">Panjpeer</strong> refers to the revered 
              <span className="font-semibold text-amber-700"> "Five Saints"</span>, who hold profound 
              spiritual significance in local culture and Sufi traditions. Generations have visited 
              this sacred sanctuary believing in the blessings that bring peace, protection, and 
              fulfillment of heartfelt prayers.
            </p>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-amber-800 italic flex items-center gap-2">
                <span className="text-xl">❤️</span>
                "Panj" means Five, "Peer" means Saint – The Five Holy Guides
              </p>
            </div>
          </motion.div>

          {/* Local Stories - Card Style */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-amber-100"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <span className="text-2xl text-purple-700">👥</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Local Stories & Legends
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Panjpeer is enveloped in ancient legends passed through generations. 
              Locals believe the Five Saints meditated here, imbuing the land with 
              divine energy.
            </p>
            <ul className="space-y-3">
              {[
                "Miraculous healings experienced by devotees",
                "Sacred visions during meditation",
                "Protection granted to travelers",
                "Wishes fulfilled through sincere prayers"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right Column - Cultural Aspects */}
        <div className="space-y-8 md:space-y-10">
          
          {/* Cultural Importance - Card Style */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-amber-100"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <span className="text-2xl text-green-700">📍</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Cultural Importance
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              More than a religious site, Panjpeer is a <span className="font-semibold text-green-700">center of unity</span>. 
              People from diverse backgrounds gather here, especially during festivals, 
              celebrating traditions that reflect harmony and deep historical connections.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-700">500+</div>
                <div className="text-sm text-green-800">Years of Legacy</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl font-bold text-amber-700">1000s</div>
                <div className="text-sm text-amber-800">Annual Visitors</div>
              </div>
            </div>
          </motion.div>

          {/* Old Traditions - Card Style */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-amber-100"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <span className="text-2xl text-blue-700">⏳</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Old Traditions
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Traditional practices preserved through centuries:
            </p>
            
            <div className="space-y-4">
              {[
                {
                  title: "Offerings & Prayers",
                  desc: "Devotees bring flowers, light lamps, and offer silent prayers",
                  color: "blue"
                },
                {
                  title: "Pilgrimage on Foot",
                  desc: "Families traditionally traveled long distances walking as devotion",
                  color: "amber"
                },
                {
                  title: "Festival Gatherings",
                  desc: "Annual celebrations keeping ancestral beliefs alive",
                  color: "purple"
                }
              ].map((tradition, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`p-2 ${tradition.color === 'blue' ? 'bg-blue-100' : tradition.color === 'amber' ? 'bg-amber-100' : 'bg-purple-100'} rounded-lg`}>
                    <div className={`w-3 h-3 ${tradition.color === 'blue' ? 'bg-blue-600' : tradition.color === 'amber' ? 'bg-amber-600' : 'bg-purple-600'} rounded-full`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{tradition.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{tradition.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <motion.div
        className="mt-16 md:mt-24 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
          Journey Through Time
        </h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-600"></div>
          
          {/* Timeline Items */}
          {[
            { year: "2000s", event: "First documented mention of Panjpeer" },
            { year: "2010s", event: "Establishment of annual pilgrimage tradition" },
            { year: "2020s", event: "Recognition as cultural heritage site" },
            { year: "Present", event: "Continuing legacy with modern devotees" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center mb-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
                  <div className="text-2xl font-bold text-amber-700 mb-2">{item.year}</div>
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </div>
              
              <div className="w-10 h-10 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center mx-4 z-10">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              </div>
              
              <div className="flex-1 md:hidden"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Closing Quote */}
      <motion.div
        className="mt-16 md:mt-20 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="text-6xl text-amber-300 mb-4">"</div>
        <p className="text-xl md:text-2xl text-gray-800 italic">
          A place where history breathes, traditions live, and faith finds its home
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-8 rounded-full"></div>
      </motion.div>
    </div>
  );
}

export default History;