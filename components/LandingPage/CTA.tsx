import React from 'react'

const CTA = () => {
  return (
    <div className="w-full py-16 text-center  dark:bg-gray-900 rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-4 dark:text-white">
        Ready to make your voice heard?
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Join CivicVoice and bring positive change to your community.
      </p>

      <div className="flex justify-center gap-6">
        <a href='/Login' className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg rounded-lg font-semibold transition cursor-pointer">
          Login
        </a>

        <a href='/SignUp' className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400 text-lg rounded-lg font-semibold border border-orange-500 transition cursor-pointer">
          Sign Up
        </a>
      </div>
    </div>
  )
}

export default CTA
