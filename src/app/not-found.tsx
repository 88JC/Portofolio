"use client";

import Link from 'next/link';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717] py-6 md:py-10">
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="w-full p-6 sm:p-8 md:p-12 relative text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-gray-700">
              404
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, you can always go back to the homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <FaHome className="text-lg" />
              <span>Go Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <FaArrowLeft className="text-lg" />
              <span>Go Back</span>
            </button>
          </div>

          <div className="mt-12 opacity-20">
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 