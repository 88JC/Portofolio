"use client";

import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaFolder, FaCode, FaCalendarAlt, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { languages } from '@/lib/data/languages';
import { PinnedRepo } from '@/types/project';
import { otherProjects } from '@/lib/data/other-projects';
import { config } from '@/lib/data/config';

export default function ProjectPage() {
  const [projects, setProjects] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/github/pinned?username=${config.github.username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.pinnedRepos || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="py-6 md:py-10 mb-10">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="w-full p-6 sm:p-8 md:p-12 relative">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <FaFolder className="text-4xl text-blue-500 mr-3" />
                <h1 className="text-white text-3xl md:text-4xl font-bold">
                  Projects
                </h1>
              </div>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                Loading your GitHub projects...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="backdrop-blur-sm rounded-xl p-6 border-2 border-gray-700/50 animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 md:py-10">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="w-full p-6 sm:p-8 md:p-12 relative text-center">
            <div className="flex items-center justify-center mb-4">
              <FaFolder className="text-4xl text-blue-500 mr-3" />
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Projects
              </h1>
            </div>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-red-500 mb-4">Error loading projects: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10 mb-10">
      <div className="relative max-w-6xl mx-auto px-4">
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
              <Link href="/project" className="flex items-center gap-1 font-semibold text-white hover:underline">
                <FaFolder className="text-base" />
                <span>Project</span>
              </Link>
            </li>
          </ol>
        </nav>
        <div className="w-full p-6 sm:p-8 md:p-12 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaFolder className="text-4xl text-blue-500 mr-3" />
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Projects
              </h1>
            </div>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              Here are some of my GitHub projects. Each one represents a learning experience and a step forward in my development journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="backdrop-blur-sm rounded-xl p-6 border-2 border-gray-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FaCode className="text-blue-500 text-lg" />
                      <h3 className="text-lg font-bold text-white">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-300">
                        <FaStar className="text-yellow-500" />
                        <span>{project.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-300">
                        <FaCodeBranch className="text-blue-500" />
                        <span>{project.forks_count}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description || 'No description available'}
                  </p>
                  <div className="mb-2">
                    {project.language && (
                      <span
                        className="flex items-center font-medium text-xs md:text-sm gap-1 text-white/60"
                      >
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: languages[project.language as keyof typeof languages] || '#888' }}
                        ></span>
                        {project.language}
                      </span>
                    )}
                    {project.topics?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.topics.slice(0, 3).map((topic, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-transparent text-gray-300 text-xs rounded-lg border border-gray700 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" />
                    <span>Updated {formatDate(project.updated_at)}</span>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                    >
                      <FaGithub className="text-xs" />
                      <span>Code</span>
                    </a>
                    {project.homepage && (
                      <a 
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <FaCode className="text-4xl text-blue-500 mr-3" />
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                  Other Projects
                </h2>
              </div>
              <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                Additional projects showcasing various technologies and development skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map(project => (
                <div key={project.id} className="backdrop-blur-sm rounded-xl border-2 border-gray-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={project.cover} 
                      alt={project.name}
                      className="w-full h-full object-cover blur-[1px]"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <FaCode className="text-2xl mb-1 mx-auto" />
                        <h3 className="text-base font-bold">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-300 text-sm mb-6 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        <span>Updated {formatDate(project.updated_at)}</span>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                        >
                          <FaGithub className="text-xs" />
                          <span>Code</span>
                        </a>
                        {project.homepage && (
                          <a 
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="backdrop-blur-sm rounded-xl p-8 border-2 border-gray-700/50">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGithub className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Want to see more?
              </h3>
              <p className="text-gray-300 mb-4">
                Check out my GitHub profile for more projects and contributions.
              </p>
              <a 
                href={`https://github.com/${config.github.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                <FaGithub />
                <span>View GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 