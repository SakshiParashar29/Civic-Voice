import React from 'react'

const HeroSection = () => {
  return (
    <div className="relative w-full h-[45vh] md:h-[60vh]">
      <img
        className="w-full h-full object-cover mx-auto dark:opacity-50 opacity-70"
        src="/Empowernment.jpg"
        alt="empower"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-center px-4">
        <h2 className="text-5xl md:text-6xl font-bold dark:text-white text-black">
          Civic<span className="text-orange-600 dark:text-orange-400">Voice</span>
        </h2>

        <p className="text-xl md:text-2xl font-semibold dark:text-gray-200 text-gray-600 max-w-2xl">
          Bringing transparency, trust, and community power together.
        </p>

        <a href='#why-civicvoice' className="px-6 py-3 mt-4 cursor-pointer bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-xl rounded-lg font-semibold">Explore</a>
      </div>
    </div>
  )
}

export default HeroSection
