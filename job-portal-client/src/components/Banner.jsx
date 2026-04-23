import React from 'react'
import { FiMapPin, FiSearch } from "react-icons/fi"

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find your <span className="text-blue">new job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in software, engineering and technology are waiting for you.
      </p>

      <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4 max-w-2xl">
        {/* Search Input */}
        <div className="relative flex flex-1 items-center border border-gray-200 md:rounded-l-lg rounded-lg bg-white shadow-sm">
          <FiSearch className="absolute left-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Job title, keyword or company..."
            className="block w-full py-3 pl-9 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm rounded-l-lg"
            onChange={handleInputChange}
            value={query}
          />
        </div>

        {/* Location Input */}
        <div className="relative flex md:w-44 items-center border border-l-0 border-gray-200 bg-white shadow-sm">
          <FiMapPin className="absolute left-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Location"
            className="block w-full py-3 pl-9 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="bg-blue py-3 px-8 text-white md:rounded-r-lg rounded-lg font-medium text-sm hover:opacity-90 transition"
        >
          Search Jobs
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mt-8 text-sm text-gray-500">
        <span>🏢 <strong className="text-primary">12+</strong> companies hiring</span>
        <span>💼 <strong className="text-primary">50+</strong> jobs available</span>
        <span>🌍 <strong className="text-primary">10+</strong> locations</span>
      </div>
    </div>
  );
};

export default Banner;
