import React from 'react'

export default function Webintro() {
  // Sample image URLs - replace with your actual images
  const sampleImages = [
    "https://www.youlinmagazine.com/articles/1879-3.jpg",
    "https://www.apricottours.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/Panjpeer-Rocks-Tour-11.jpg?bwg=1692712629",
    "https://www.youlinmagazine.com/articles/1879-3.jpg",
    "https://www.apricottours.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/Panjpeer-Rocks-Tour-11.jpg?bwg=1692712629",
  ]

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-green-300 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the breathtaking beauty of Panjpeer Rocks through our stunning collection of photographs and visual stories
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-gray-600">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">50+</div>
                <div className="text-gray-600">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">360°</div>
                <div className="text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">4K</div>
                <div className="text-gray-600">Quality</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a 
                href="/GalleryPage" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl inline-block"
              >
                Explore Gallery
              </a>
              <a 
                href="Mountain" 
                className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Watch Video Tour
              </a>
            </div>

            {/* Featured Image Grid Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {sampleImages.map((imageUrl, index) => (
                <a 
                  key={index}
                  href={`/gallery/photo-${index + 1}`}
                  className="aspect-square rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500 hover:rotate-2 cursor-pointer overflow-hidden block"
                >
                  <img 
                    src={imageUrl} 
                    alt={`Panjpeer Rocks ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                 
                </a>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-green-500 rounded-full flex justify-center mx-auto">
                <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-green-600 font-medium mt-2">Scroll to explore</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}