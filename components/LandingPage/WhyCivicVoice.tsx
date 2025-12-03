import React from 'react'

const WhyCivicVoice = () => {
  return (
    <div id='why-civicvoice' className="w-full py-16">
      <h2 className="text-4xl dark:text-white font-bold text-center mb-12">
        Why <span className="text-orange-600">CivicVoice?</span>
      </h2>

      {/* Feature 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-10">
        <div className="md:w-1/2">
          <h3 className="text-2xl dark:text-orange-500 font-bold mb-3">Raise Your Voice</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Make your voice heard. Report issues anytime and hold your municipality accountable with complete transparency.
          </p>
        </div>

        <img
          className="w-60 h-60 object-cover rounded-full shadow-md"
          src="/RaisingVoice.jpg"
          alt="raising-voice"
        />
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 py-10">
        <div className="md:w-1/2">
          <h3 className="text-2xl dark:text-orange-500 font-bold mb-3">Track Progress Easily</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor how quickly your complaint is addressed with real-time status updates and municipality responses.
          </p>
        </div>

        <img
          className="w-60 h-60 object-cover rounded-full shadow-md"
          src="/ProgressBar.avif"
          alt="progress"
        />
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-10">
        <div className="md:w-1/2">
          <h3 className="text-2xl dark:text-orange-500 font-bold mb-3">Greater Transparency</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Every complaint, update, and action remains visible to citizens — no hidden processes.
          </p>
        </div>

        <img
          className="w-60 h-60 object-cover rounded-full shadow-md"
          src="/transparency.jpg"
          alt="transparency"
        />
      </div>

      {/* Feature 4 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 py-10">
        <div className="md:w-1/2">
          <h3 className="text-2xl dark:text-orange-500 font-bold mb-3">Data Insights for Better Governance</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            View complaint patterns, area insights, and municipality performance to understand what's improving and what's not.
          </p>
        </div>

        <img
          className="w-60 h-60 object-cover rounded-full shadow-md"
          src="/datainsights.jpg"
          alt="data-insights"
        />
      </div>
    </div>
  )
}

export default WhyCivicVoice
