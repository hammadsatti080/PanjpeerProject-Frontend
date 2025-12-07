import React from 'react'

export default function GallerySection() {
  const galleryCollections = [
    {
      title: "Sunrise Magic",
      description: "Golden hour moments at Panjpeer",
      count: "120 photos",
      gradient: "from-orange-200 to-yellow-300",
      link: "/Sunrise",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/18/ed/the-view-of-panjpeer.jpg?w=1200&h=1200&s=1"
    },
    {
      title: "Nature's Art",
      description: "Rock formations and landscapes",
      count: "85 photos",
      gradient: "from-green-200 to-emerald-300",
      link: "/SunriseUploadandgallery",
      image: "/About/Muree2.jpg"
    },
    {
      title: "Seasonal Beauty",
      description: "Through all four seasons",
      count: "200+ photos",
      gradient: "from-blue-200 to-cyan-300",
      link: "/Seasonal",
      image: "/About/Muree3.jpg"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-green-600">Collections</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated visual journeys through different seasons and perspectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryCollections.map((collection, index) => (
            <a 
              key={index}
              href={collection.link}
              className="group cursor-pointer block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-500 h-64">
                {/* Background Image */}
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-green-300 transition-colors duration-300">
                    {collection.title}
                  </h3>
                  <p className="text-gray-200 mb-3">
                    {collection.description}
                  </p>
                  <div className="text-green-300 font-semibold">
                    {collection.count}
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Collections Link */}
        <div className="text-center mt-12">
          <a 
            href="/SunriseUploadandgallery" 
            className="inline-flex items-center text-green-600 font-semibold text-lg hover:text-green-700 transition-colors duration-300 group"
          >
            View All Collections
            <svg 
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}