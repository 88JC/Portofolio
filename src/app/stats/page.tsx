"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { languages as languagesData } from '@/lib/data/languages';
import Link from 'next/link';
import { FaChartBar, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { GitHubStats, GitHubRepo, GitHubUser, GitHubStarredRepo } from '@/types/github';
import { config } from '@/lib/data/config';

export default function StatsPage() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [starredCount, setStarredCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  

  
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [followers, setFollowers] = useState<GitHubUser[]>([]);
  const [following, setFollowing] = useState<GitHubUser[]>([]);
  const [starredRepos, setStarredRepos] = useState<GitHubStarredRepo[]>([]);

  const username = config.github.username;

  const getLanguageColor = (language: string) => {
    return languagesData[language as keyof typeof languagesData] || '#6e7681';
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch(`/api/github/stats?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        const data = await response.json();
        
        setStats(data.user);
        setRepos(data.repos);
        setStarredCount(data.starredCount);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchGitHubData();
  }, [username]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const fetchFollowers = async () => {
    if (followers.length > 0) return;
    try {
      const response = await fetch(`/api/github/followers?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setFollowers(data.followers);
      }
    } catch (err) {
      console.error('Error fetching followers:', err);
    }
  };

  const fetchFollowing = async () => {
    if (following.length > 0) return;
    try {
      const response = await fetch(`/api/github/following?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setFollowing(data.following);
      }
    } catch (err) {
      console.error('Error fetching following:', err);
    }
  };

  const fetchStarredRepos = async () => {
    if (starredRepos.length > 0) return;
    try {
      const response = await fetch(`/api/github/starred?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setStarredRepos(data.starredRepos);
      }
    } catch (err) {
      console.error('Error fetching starred repos:', err);
    }
  };

  const handleFollowersClick = () => {
    setShowFollowers(true);
    fetchFollowers();
  };

  const handleFollowingClick = () => {
    setShowFollowing(true);
    fetchFollowing();
  };

  const handleStarredClick = () => {
    setShowStarred(true);
    fetchStarredRepos();
  };

  const handleReposClick = () => {
    const reposSection = document.getElementById('recent-repos');
    if (reposSection) {
      reposSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-white/80 mb-2">Error loading GitHub data</p>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center"></div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 mb-10">
      <div className="max-w-6xl mx-auto">
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
              <Link href="/stats" className="flex items-center gap-1 font-semibold text-white hover:underline">
                <FaChartBar className="text-base" />
                <span>Stats</span>
              </Link>
            </li>
          </ol>
        </nav>
        <div className="w-full p-6 sm:p-8 md:p-12 relative">
          <div className="flex items-center justify-center mb-6">
            <FaChartBar className="text-4xl text-blue-500 mr-3" />
            <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
              GitHub Stats
            </h1>
          </div>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-300 text-base md:text-lg text-center mb-10">
            Statistics and information from my GitHub profile
          </p>
        </div>

        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
            <div className="relative">
              <Image
                src={stats.avatar_url}
                alt={`${stats.name} avatar`}
                width={100}
                height={100}
                className="rounded-full border-4 border-white/20 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
             <div className="flex items-center gap-1 justify-center sm:justify-start ml-8 sm:ml-0">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{stats.name}</h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-5 h-5 md:w-6 md:h-6 text-blue-500 -mt-1 md:-mt-1" viewBox="0 0 48 48">
                <polygon fill="currentColor" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon>
                <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
              </svg>
              </div>
              <p className="text-white/80 font-semibold text-sm mb-2 text-center sm:text-left">@{stats.login}</p>

              
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center sm:justify-start">
                {stats.location && (
                  <div className="flex items-center gap-2 text-white/70">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{stats.location}</span>
                  </div>
                )}
                {stats.company && (
                  <div className="flex items-center gap-2 text-white/70">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{stats.company}</span>
                  </div>
                )}
                {stats.blog && (
                  <a 
                    href={stats.blog.startsWith('http') ? stats.blog : `https://${stats.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
          <div 
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-md p-2 md:p-3 text-center cursor-pointer hover:bg-black/30 transition-colors"
            onClick={handleFollowersClick}
          >
            <div className="flex justify-center mb-1">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-white/70 text-[9px] md:text-xs">Followers</div>
            <div className="text-xs md:text-sm lg:text-base text-white mb-1">{stats.followers}</div>
          </div>
          <div 
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-md p-2 md:p-3 text-center cursor-pointer hover:bg-black/30 transition-colors"
            onClick={handleFollowingClick}
          >
            <div className="flex justify-center mb-1">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-white/70 text-[9px] md:text-xs">Following</div>
            <div className="text-xs md:text-sm lg:text-base text-white mb-1">{stats.following}</div>
          </div>
          <div 
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-md p-2 md:p-3 text-center cursor-pointer hover:bg-black/30 transition-colors"
            onClick={handleReposClick}
          >
            <div className="flex justify-center mb-1">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-white/70 text-[9px] md:text-xs">Repositories</div>
            <div className="text-xs md:text-sm lg:text-base text-white mb-1">{stats.public_repos}</div>
          </div>
          <div 
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-md p-2 md:p-3 text-center cursor-pointer hover:bg-black/30 transition-colors"
            onClick={handleStarredClick}
          >
            <div className="flex justify-center mb-1">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="text-white/70 text-[9px] md:text-xs">Starred</div>
            <div className="text-xs md:text-sm lg:text-base text-white mb-1">{starredCount}</div>
          </div>
        </div>

        <div id="recent-repos" className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 mb-15">
          <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V10m0 0L7 15m5-5l5 5M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Recent Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {repos.map((repo) => (
              <div key={repo.id} className="bg-black/30 border border-white/10 rounded-xl p-3 md:p-4 hover:bg-black/40 transition-colors">
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <h4 className="font-semibold text-white truncate flex-1 flex items-center gap-1 md:gap-2 text-sm md:text-base">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  {repo.fork && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full ml-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Fork
                    </span>
                  )}
                </div>
                {repo.description && (
                  <p className="text-white/70 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{repo.description}</p>
                )}
                <div className="flex flex-col gap-2 md:gap-0">
                  {repo.language && (
                    <div className="flex items-center font-medium text-xs md:text-sm gap-1 text-white/60">
                      <div 
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full mb-2" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></div>
                      <span className="mb-2">{repo.language}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-row justify-end md:justify-between items-center gap-2 md:gap-4">
                    <div className="flex flex-row items-center gap-4">
                      <div className="text-white/50 text-[10px] md:text-xs flex items-center gap-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="#facc15" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span>{repo.stargazers_count} stars</span>
                      </div>
                      <div className="text-white/50 text-[10px] md:text-xs flex items-center gap-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="6" cy="6" r="2" />
                          <circle cx="18" cy="6" r="2" />
                          <circle cx="12" cy="18" r="2" />
                          <path d="M6 8v2a4 4 0 004 4h0a4 4 0 004-4V8" />
                        </svg>
                        <span>{repo.forks_count} forks</span>
                      </div>
                      <div className="text-white/50 text-[10px] md:text-xs flex items-center gap-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                        </svg>
                        <span>0 issues</span>
                      </div>
                    </div>
                    
                    <div className="text-white/50 text-[10px] md:text-xs flex items-center gap-1 md:ml-auto">
                     <FaCalendarAlt className="text-xs" />
                      Updated {formatDate(repo.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showFollowers && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-black/90 border border-white/20 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Followers ({stats.followers})</h3>
                <button 
                  onClick={() => setShowFollowers(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh] popup-scrollbar">
                {followers.length > 0 ? (
                  <div className="space-y-3 pr-2">
                    {followers.map((follower) => (
                      <a
                        key={follower.login}
                        href={follower.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <Image
                          src={follower.avatar_url}
                          alt={follower.login}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-white/10 group-hover:ring-white/20 transition-all"
                        />
                        <span className="text-white font-medium group-hover:text-blue-300 transition-colors">@{follower.login}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70 text-center py-8">No followers found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {showFollowing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-black/90 border border-white/20 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Following ({stats.following})</h3>
                <button 
                  onClick={() => setShowFollowing(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh] popup-scrollbar">
                {following.length > 0 ? (
                  <div className="space-y-3 pr-2">
                    {following.map((user) => (
                      <a
                        key={user.login}
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <Image
                          src={user.avatar_url}
                          alt={user.login}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-white/10 group-hover:ring-white/20 transition-all"
                        />
                        <span className="text-white font-medium group-hover:text-green-300 transition-colors">@{user.login}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70 text-center py-8">Not following anyone</p>
                )}
              </div>
            </div>
          </div>
        )}

        {showStarred && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-black/90 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Starred Repositories ({starredCount})</h3>
                <button 
                  onClick={() => setShowStarred(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh] popup-scrollbar">
                {starredRepos.length > 0 ? (
                  <div className="space-y-3 pr-2">
                    {starredRepos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20 group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Image
                              src={repo.owner.avatar_url}
                              alt={repo.owner.login}
                              width={32}
                              height={32}
                              className="rounded-full ring-2 ring-white/10 group-hover:ring-white/20 transition-all"
                            />
                            <div>
                              <h4 className="text-white font-semibold group-hover:text-yellow-300 transition-colors">{repo.full_name}</h4>
                              <p className="text-white/60 text-sm">by @{repo.owner.login}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="text-sm">{repo.stargazers_count}</span>
                          </div>
                        </div>
                        {repo.description && (
                          <p className="text-white/70 text-sm mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">{repo.description}</p>
                        )}
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></div>
                            <span className="text-white/60 text-sm group-hover:text-white/70 transition-colors">{repo.language}</span>
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70 text-center py-8">No starred repositories</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 