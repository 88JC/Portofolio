"use client";

import Link from 'next/link';
import { FaBook } from 'react-icons/fa';

export default function BlogPage() {
  return (
    <div className="py-6 md:py-10 mb-10">
      <div className="relative max-w-4xl mx-auto px-4">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:underline">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" />
                </svg>
                <span className="font-medium">Profile</span>
              </Link>
            </li>
            <li>
              <span className="mx-1">&gt;</span>
            </li>
            <li className="flex items-center gap-1">
              <Link href="/blog" className="flex items-center gap-1 font-semibold text-white hover:underline">
                <FaBook className="text-base" />
                <span>Blog</span>
              </Link>
            </li>
          </ol>
        </nav>
        <div className="w-full p-6 sm:p-8 md:p-12 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaBook className="text-4xl text-blue-500 mr-3" />
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Blog
              </h1>
            </div>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              My thoughts, experiences, and insights about technology, development, and life.
            </p>
          </div>

          <div className="space-y-8">
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    className="w-12 h-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Coming Soon
                </h3>
                <p className="text-gray-300 mb-6">
                  Blog posts are in the works. Check back soon for interesting content!
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
              <div className="backdrop-blur-sm rounded-xl p-6 border-2 border-gray-700/50">
                <div className="bg-gray-700 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>

              <div className="backdrop-blur-sm rounded-xl p-6 border-2 border-gray-700/50">
                <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>

              <div className="backdrop-blur-sm rounded-xl p-6 border-2 border-gray-700/50">
                <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 