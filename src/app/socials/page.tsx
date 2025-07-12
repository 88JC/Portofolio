"use client";

import Link from 'next/link';
import { FaDiscord, FaEnvelope, FaGithub, FaSteam, FaTwitter, FaShareAlt } from 'react-icons/fa';
import { ContactItemProps } from '@/types/socials';
import { personInfo } from '@/lib/data/socials';
import { config } from '@/lib/data/config';

function ContactItem({ href, icon: Icon, text, description, bgColor, hoverColor }: ContactItemProps) {
  return (
    <a 
      target="_blank" 
      rel="noreferrer" 
      href={href}
      className="block group"
    >
      <div className=" backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-gray-700/50">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 flex items-center justify-center ${bgColor} ${hoverColor} rounded-lg transition-colors duration-300 shadow-md`}>
            <Icon className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
              {text}
            </p>
            <p className="text-sm text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function SocialsPage() {
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
              <Link href="/socials" className="flex items-center gap-1 font-semibold text-white hover:underline">
                <FaShareAlt className="text-base" />
                <span>Socials</span>
              </Link>
            </li>
          </ol>
        </nav>
        <div className="w-full p-6 sm:p-8 md:p-12 relative">
          <div className="flex items-center justify-center mb-6">
            <FaShareAlt className="text-4xl text-blue-500 mr-3" />
            <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
              Contact Me
            </h1>
          </div>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-300 text-base md:text-lg text-center mb-10">
            Feel free to reach out through any of these platforms
          </p>
          
          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
            <ContactItem 
              href={personInfo.socialLinks.discord}
              icon={FaDiscord}
              text="@jexq"
              description="Chat with me on Discord"
              bgColor="bg-indigo-500"
              hoverColor="hover:bg-indigo-600"
            />
            <ContactItem 
              href={personInfo.socialLinks.mail}
              icon={FaEnvelope}
              text="chan@jecky.id"
              description="Send me an email"
              bgColor="bg-emerald-500"
              hoverColor="hover:bg-emerald-600"
            />
            <ContactItem 
              href={personInfo.socialLinks.github}
              icon={FaGithub}
              text={config.github.username}
              description="Check out my projects on GitHub"
              bgColor="bg-gray-700"
              hoverColor="hover:bg-gray-800"
            />
            <ContactItem 
              href={personInfo.socialLinks.twitter}
              icon={FaTwitter}
              text="@METALHEAD666"
              description="Follow me on X (Twitter)"
              bgColor="bg-blue-500"
              hoverColor="hover:bg-blue-600"
            />
            <ContactItem 
              href={personInfo.socialLinks.steam}
              icon={FaSteam}
              text="@kydo21"
              description="Add me on Steam"
              bgColor="bg-gray-800"
              hoverColor="hover:bg-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
