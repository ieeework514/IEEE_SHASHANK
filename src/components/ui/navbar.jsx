"use client"
import React, { useState } from 'react';
import Link from "next/link";
import AuthModal from './auth-modal';
import { useSession, signOut } from "next-auth/react";

const Navbar = ({ className = "" }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { data: session } = useSession();

  const navLinks = [
    { text: "Events", href: "#events" },
    { text: "Our Team", href: "#team" },
    { text: "Leaderboard", href: "#leaderboard" },
    { text: "About Us", href: "#about" },
    { text: "Contact Us", href: "#contact" },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-purple-600/20 blur-2xl pointer-events-none" />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-6 py-4 shadow-[0_15px_60px_rgba(76,29,149,0.35)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg 
                width="44" 
                height="44" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
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
            <span className="relative text-white font-semibold text-xl tracking-tight">
              IEEE
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </span>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-10 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="relative text-white/90 text-sm lg:text-base font-medium transition-all duration-300 flex items-center whitespace-nowrap group"
              >
                <span className="relative z-10 group-hover:text-white">{link.text}</span>
                <span className="absolute inset-x-0 -bottom-2 h-[2px] bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute inset-0 rounded-full bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {!session?.user ? (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="group relative overflow-hidden rounded-xl border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(96,165,250,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative">Login</span>
                </button>
                <button 
                  onClick={handleSignUpClick}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_15px_50px_rgba(168,85,247,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  <span className="absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] bg-white/15" />
                  <span className="relative">Join Us</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-base font-semibold backdrop-blur-md">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:block text-sm text-white/80">{session.user.name || session.user.email}</span>
                </div>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="relative overflow-hidden rounded-lg bg-gradient-to-r from-rose-500/80 to-red-500/80 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_45px_rgba(239,68,68,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                >
                  <span className="absolute inset-[1px] rounded-md border border-white/20 opacity-60" />
                  <span className="relative">Sign Out</span>
                </button>
              </>
            )}
          </div>
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


