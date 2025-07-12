"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DiscordAvatar from "../components/DiscordAvatar";
import ProfileAvatar from "../components/ProfileAvatar";
import TechStack from "../components/TechStack";
import DiscordStatus from "../components/DiscordStatus";
import { personInfo, CONFIG } from "@/lib/data/profile";

export default function About() {
  const [avatarSize, setAvatarSize] = useState(CONFIG.avatarSize);

  useEffect(() => {
    const handleResize = () => {
      setAvatarSize(window.innerWidth < 640 ? CONFIG.mobileAvatarSize : CONFIG.avatarSize);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 text-white">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="relative z-10 flex flex-col items-center mb-10 sm:mb-16" style={{ height: avatarSize * 1.2, minHeight: avatarSize * 1.2 }}>
          {CONFIG.useDiscordAvatar ? (
            <DiscordAvatar 
              size={avatarSize * 1.2}
              showStatus={CONFIG.showStatus}
              decorationInFront={CONFIG.decorationInFront}
              className="mx-auto"
            />
          ) : (
            <ProfileAvatar 
              fallbackInitials={personInfo.name.split(' ').map(n => n[0]).join('')}
              size={avatarSize * 1.2}
              className="mx-auto"
            />
          )}
        </div>
        <div className="relative z-10 flex flex-col items-center mt-[-60px]">
          <div className="flex items-center gap-1 mt-4 ml-8">
            <h1 className="text-2xl font-bold">{personInfo.nickname}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48" className="text-blue-500">
              <polygon fill="currentColor" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon>
              <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
            </svg>
          </div>
          <h2 className="text-md mb-4 sm:mb-4 text-gray-400 font-semibold">{personInfo.profession}</h2>
        </div>
        <div className="">
            <DiscordStatus />
        </div>
      </div>
      <div className="w-full max-w-2xl mt-10 rounded-lg p-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">ABOUT ME</h3>
        <p className="mb-6 text-white/80">Hi! I'm <span className="text-white font-medium">{personInfo.nickname}</span>, a passionate Tech Enthusiast who loves exploring new technologies and building cool stuff, and is also a gamer.</p>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">PERSONAL INFORMATION</h3>
        <ul className="mb-6 ml-4 list-disc">
          <li>
            <div className="flex items-center">
              <span className="font-medium text-sm w-16">Name</span>
              <span className="text-white/60 text-sm mx-2">:</span>
              <span className="text-white/80 text-sm">{personInfo.name}</span>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="font-medium text-sm w-16">Hobby</span>
              <span className="text-white/60 text-sm mx-2">:</span>
              <span className="text-white/80 text-sm">{personInfo.hobby}</span>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="font-medium text-sm w-16">Region</span>
              <span className="text-white/60 text-sm mx-2">:</span>
              <span className="text-white/80 text-sm">{personInfo.region}</span>
            </div>
          </li>
        </ul>
        <TechStack />
      </div>
    </main>
  );
} 