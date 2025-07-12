"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/data/navbar';
import { NavbarProps } from '@/types/components';

export default function Navbar({ position = 'top' }: NavbarProps) {
  const pathname = usePathname();
  const [hoverIdx, setHoverIdx] = useState<number|null>(null);

  const renderIcon = (iconPath: string) => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
    </svg>
  );

  return (
    <>
      <nav
        className={`hidden sm:flex justify-center ${position === 'footer' ? 'fixed bottom-0 left-0 w-full mb-0 z-50' : 'mt-6'} pointer-events-auto`}
        style={position === 'footer' ? { background: 'none' } : {}}
      >
        <div className={`flex bg-black/30 backdrop-blur-sm border border-white/30 rounded-xl p-1.5 gap-1 shadow-lg ${position === 'footer' ? 'mb-3 mx-auto' : ''}`}>
          {navItems.map((item, idx) => {
            let effect = '';
            let gap = '';
            if (hoverIdx !== null) {
              if (idx === hoverIdx) {
                effect = 'z-20 -translate-y-1 scale-110';
                gap = 'mx-0.5';
              } else if (idx === hoverIdx - 1 || idx === hoverIdx + 1) {
                effect = 'z-10 -translate-y-0.5 scale-105';
                gap = 'mx-0.25';
              } else {
                effect = 'scale-95';
                gap = 'mx-0';
              }
            }
            const isActive = pathname === item.href;
            return (
              <Link 
                href={item.href} 
                key={`desktop-${item.label}`}
                className={`relative group flex flex-col items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 cursor-pointer touch-manipulation ${
                  isActive ? 'bg-white/90 text-black shadow-lg' : 'bg-black/30 text-white/80 hover:bg-white/20 hover:text-white active:bg-white/30'
                } ${effect} ${gap}`}
                onMouseEnter={() => setHoverIdx(idx)}
                onMouseLeave={() => setHoverIdx(null)}
                onTouchStart={() => setHoverIdx(idx)}
                onTouchEnd={() => setHoverIdx(null)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {renderIcon(item.iconPath)}
                </div>
                {hoverIdx === idx && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs font-semibold whitespace-nowrap z-10 shadow-lg">
                    {item.label}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-black rotate-45 -mt-1 z-0" />
                  </div>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="sm:hidden fixed bottom-0 left-0 w-full z-50 pointer-events-auto">
        <div className="flex bg-black/30 backdrop-blur-sm border-t border-white/30 p-2 gap-1 shadow-lg">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                href={item.href} 
                key={`mobile-${item.label}`}
                className={`relative flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-all duration-200 cursor-pointer touch-manipulation ${
                  isActive 
                    ? 'bg-white/90 text-black shadow-lg scale-105' 
                    : 'bg-black/30 text-white/80 hover:bg-white/20 hover:text-white active:bg-white/30'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center mb-1">
                  {renderIcon(item.iconPath)}
                </div>
                <span className="text-[8px] font-medium leading-none opacity-90 text-center">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
