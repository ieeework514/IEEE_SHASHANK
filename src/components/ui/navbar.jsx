"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AuthModal from './auth-modal';

const Navbar = ({ className = "" }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const navLinks = [
    { text: "Events", hasDropdown: false },
    { text: "Our Team", hasDropdown: false },
    { text: "Leaderboard", hasDropdown: false },
    { text: "About Us", hasDropdown: false },
    { text: "Contact Us", hasDropdown: false },
  ];

  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleSwitchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full bg-black/0 ${className}`}>
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-t border-white/10 border-b border-white/10 bg-white/20 backdrop-blur-lg">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center justify-center">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M50 15 L75 35 L75 65 L50 85 L25 65 L25 35 Z" 
                fill="white" 
                stroke="white" 
                strokeWidth="1.5"
              />
              <circle cx="50" cy="50" r="22" fill="none" stroke="rgb(139, 92, 246)" strokeWidth="2.5"/>
              <path 
                d="M50 35 L50 28 L55 28 L55 35 M50 65 L50 72 L45 72 L45 65" 
                fill="rgb(139, 92, 246)"
              />
              <path 
                d="M50 35 L45 40 L50 45 L55 40 Z" 
                fill="rgb(139, 92, 246)"
              />
              <path 
                d="M 65 50 A 15 15 0 0 1 75 60" 
                stroke="rgb(139, 92, 246)" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">IEEE</span>
        </div>

        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-10 flex-1">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-white text-sm lg:text-base font-medium hover:text-purple-300 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
            >
              {link.text}
              {link.hasDropdown && (
                <ChevronDown className="w-4 h-4" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={handleLoginClick}
            className="px-5 py-2 bg-white/20 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 backdrop-blur-md border border-white/20 hover:border-blue-600"
          >
            Login
          </button>
          <button 
            onClick={handleSignUpClick}
            className="px-5 py-2 bg-white/20 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 backdrop-blur-md border border-white/20 hover:border-blue-600"
          >
            Sign Up
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={handleSwitchMode}
      />
    </nav>
  );
};

export default Navbar;


