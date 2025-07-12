'use client';

import { useEffect, useState, useRef } from 'react';
import { DiscordAvatarProps, DiscordStatusData } from '@/types/discord';
import { placeholderData } from '@/lib/data/discord';

export default function DiscordAvatar({
  size = 120,
  className = '',
  showStatus = false,
  decorationInFront = true,
}: DiscordAvatarProps) {
  const [data, setData] = useState<DiscordStatusData>(placeholderData);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch('/api/lanyard/discord');
        if (!response.ok) {
          throw new Error('Failed to fetch Discord status');
        }
        
        const discordData = await response.json();
        
        if (mountedRef.current) {
          setData(discordData);
        }
      } catch (err) {
        console.error('Error fetching Discord avatar:', err);
      }
    };

    fetchDiscordStatus();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const statusDotSize = Math.max(4, size * 0.15);
  const borderSize = Math.max(2, size * 0.015);
  
  const decorationConfig = decorationInFront
    ? {
        padding: Math.max(2, size * 0.02),
        scale: 1.0,
        insetTopBottom: `-${size * 0.02}px`,
        insetLeftRight: `-${size * 0.02}px`,
        filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))',
        animationClass: 'float-animation'
      }
    : {
        padding: Math.max(10, size * 0.1),
        scale: 1.20,
        insetTopBottom: `-${size * 0.08}px`,
        insetLeftRight: `-${size * 0.08}px`,
        filter: 'none',
        animationClass: 'pulse-animation'
      };

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ 
            zIndex: decorationInFront ? 5 : 20,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            top: decorationInFront ? '8%' : '0',
            left: decorationInFront ? '8%' : '0',
            right: decorationInFront ? '8%' : '0',
            bottom: decorationInFront ? '8%' : '0',
            width: decorationInFront ? '84%' : '100%',
            height: decorationInFront ? '84%' : '100%',
          }}
        >
          <img
            src={data.discord_avatar}
            alt={`Discord avatar`}
            className="w-full h-full object-cover rounded-full"
            loading="eager"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        
        {data.avatar_decoration && (
          <div 
            className="absolute flex items-center justify-center overflow-visible"
            style={{ 
              zIndex: decorationInFront ? 25 : 10,
              top: decorationConfig.insetTopBottom,
              right: decorationConfig.insetLeftRight,
              bottom: decorationConfig.insetTopBottom,
              left: decorationConfig.insetLeftRight,
              transform: `scale(${decorationConfig.scale})`,
              filter: decorationConfig.filter,
              pointerEvents: 'none',
            }}
          >
            <img
              src={data.avatar_decoration}
              alt="Avatar decoration"
              className={`w-full h-full object-contain ${decorationConfig.animationClass}`}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}
        
        {showStatus && (
          <span
            className={`absolute bottom-[2%] right-[2%] rounded-full border-solid ${data.status_color}`}
            aria-label={data.discord_status}
            style={{
              width: statusDotSize,
              height: statusDotSize,
              borderWidth: borderSize,
              borderColor: 'white',
              zIndex: 30,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          ></span>
        )}
      </div>
    </div>
  );
} 