'use client';

import { useEffect, useState, useRef } from 'react';
import { DiscordStatusData } from '@/types/discord';
import { placeholderData } from '@/lib/data/discord';

export default function DiscordStatus() {
  const [status, setStatus] = useState<DiscordStatusData>(placeholderData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch('/api/lanyard/discord');
        const data = await response.json();
        
        if (mountedRef.current) {
          if (response.ok && !data.error) {
            setStatus(data);
            setRetryCount(0);
          } else {
            console.warn('Discord API returned error:', data.error);
          }
          setIsLoaded(true);
        }
      } catch (err) {
        console.error('Error fetching Discord status:', err);
        if (mountedRef.current) {
          setIsLoaded(true);
        }
      }
    };

    fetchDiscordStatus();

    const getRetryDelay = () => {
      if (retryCount === 0) return 30000;
      return Math.min(30000 * Math.pow(2, retryCount), 300000);
    };

    const interval = setInterval(() => {
      if (mountedRef.current) {
        fetchDiscordStatus();
        setRetryCount(prev => prev + 1);
      }
    }, getRetryDelay());
    
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [retryCount]);

  useEffect(() => {
    console.log('Current status:', status.discord_status, 'Text status:', status.status_text);
  }, [status]);

  const getStatusTextColor = () => {
    const statusValue = status.status_text.toLowerCase();
    
    switch (statusValue) {
      case 'online':
        return 'text-[#3ba55c]';
      case 'idle':
        return 'text-[#faa61a]';
      case 'dnd':
        return 'text-[#ed4245]';
      case 'streaming':
        return 'text-[#5865f2]';
      case 'offline':
      default:
        return 'text-[#747f8d]';
    }
  };

  const renderStatusIcon = () => {
    const statusValue = status.status_text.toLowerCase();
    console.log('Rendering status icon for:', statusValue);
    
    switch (statusValue) {
      case 'online':
        return (
          <div className="relative group">
            <div className="w-4 h-4 rounded-full bg-[#3ba55c] transition-all duration-300 ease-in-out hover:scale-110 animate-pulse shadow-md shadow-[#3ba55c]/30 border-2 border-[#3ba55c]/50 animate-pulse-slow" aria-label="online"></div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">Online</span>
          </div>
        );
      case 'idle':
        return (
          <div className="relative group">
            <div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110 animate-pulse">
              <div className="absolute w-4 h-4 rounded-full bg-[#faa61a] shadow-md shadow-[#faa61a]/30 border-2 border-[#faa61a]/50 animate-pulse-slow"></div>
              <div className="absolute w-2 h-2 bg-[#2b2b2b] rounded-full top-0 right-0"></div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">Idle</span>
          </div>
        );
      case 'dnd':
        return (
          <div className="relative group">
            <div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110 animate-pulse">
              <div className="absolute w-4 h-4 rounded-full bg-[#ed4245] shadow-md shadow-[#ed4245]/30 border-2 border-[#ed4245]/50 animate-pulse-slow"></div>
              <div className="absolute w-2.5 h-[2px] bg-[#2b2b2b] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">Do Not Disturb</span>
          </div>
        );
      case 'streaming':
        return (
          <div className="relative group">
            <div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110 animate-pulse">
              <div className="absolute w-4 h-4 rounded-full bg-[#5865f2] animate-pulse-gentle shadow-md shadow-[#5865f2]/30 border-2 border-[#5865f2]/50 animate-pulse-slow" aria-label="streaming"></div>
              <div className="absolute w-0 h-0 border-solid border-[3px] border-transparent border-l-white top-1/2 left-[9px] transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">Streaming</span>
          </div>
        );
      case 'offline':
      default:
        return (
          <div className="relative group">
            <div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110 animate-pulse">
              <div className="absolute w-4 h-4 rounded-full bg-[#747f8d] shadow-md shadow-[#747f8d]/20 border-2 border-[#747f8d]/30 animate-pulse-slow"></div>
              <div className="absolute w-2 h-2 rounded-full bg-[#2b2b2b] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">Offline</span>
          </div>
        );
    }
  };

  return (
    <div className="inline-flex items-center gap-3 min-w-[60px] min-h-[28px] transition-opacity duration-300">
      {renderStatusIcon()}
      <span className={`text-lg text-bold transition-all duration-300 hover:opacity-70 ${getStatusTextColor()}`}>{status.status_text}</span>
    </div>
  );
} 