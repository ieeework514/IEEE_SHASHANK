"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import AuthModal from './auth-modal';
import { authService } from '@/lib/auth';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = ({ className = "" }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
          authService.removeToken();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { text: "Events", href: "/events" },
    { text: "Our Team", href: "/team" },
    { text: "Achievements", href: "/achievements" },
    { text: "About Us", href: "/about" },
    { text: "Contact Us", href: "/contact" },
  ];

  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSwitchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    window.location.reload();
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-purple-600/20 blur-2xl pointer-events-none" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mt-4 sm:mt-6 flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 px-4 sm:px-6 py-2 sm:py-4 shadow-[0_15px_60px_rgba(76,29,149,0.35)] backdrop-blur-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg 
                width="36" 
                height="36" 
                className="sm:w-11 sm:h-11 relative"
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
            <span className="relative text-white font-semibold text-lg sm:text-xl tracking-tight">
              IEEE
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-10 flex-1 px-4">
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {!loading && (
              <>
                {!user ? (
                  <>
                    <button 
                      onClick={handleLoginClick}
                      className="group relative overflow-hidden rounded-xl border border-white/20 px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(96,165,250,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 active:scale-95"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative">Login</span>
                    </button>
                    <button 
                      onClick={handleSignUpClick}
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_15px_50px_rgba(168,85,247,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
                    >
                      <span className="absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] bg-white/15" />
                      <span className="relative">Join Us</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-white">
                      <div className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-white/20 text-sm lg:text-base font-semibold backdrop-blur-md">
                        {user?.full_name ? user.full_name.charAt(0).toUpperCase() : user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="hidden lg:block text-sm text-white/80 max-w-[120px] truncate">{user?.full_name || user?.username || user?.email}</span>
                    </div>
                    {(user?.role === 'admin' || user?.role === 'executive') && (
                      <Link
                        href="/dashboard"
                        className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500/80 to-blue-500/80 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_45px_rgba(139,92,246,0.5)] active:scale-95"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="relative overflow-hidden rounded-lg bg-gradient-to-r from-rose-500/80 to-red-500/80 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_45px_rgba(239,68,68,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 active:scale-95"
                    >
                      <span className="absolute inset-[1px] rounded-md border border-white/20 opacity-60" />
                      <span className="relative">Sign Out</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-gradient-to-br from-[#120026]/95 via-[#0f0620]/98 to-[#0b0b25]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl md:hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg 
                  width="24" 
                  height="24" 
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
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">IEEE</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.text}
                href={link.href}
                onClick={handleNavLinkClick}
                className="block px-4 py-3 rounded-xl text-white/90 font-medium transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Section */}
          <div className="p-4 border-t border-white/10 space-y-3">
            {!loading && (
              <>
                {!user ? (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold transition-all duration-200 hover:bg-white/10 active:scale-95"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleSignUpClick}
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-semibold transition-all duration-200 hover:shadow-[0_15px_50px_rgba(168,85,247,0.55)] active:scale-95"
                    >
                      Join Us
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-semibold text-white">
                          {user?.full_name ? user.full_name.charAt(0).toUpperCase() : user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">
                            {user?.full_name || user?.username || 'User'}
                          </p>
                          <p className="text-white/60 text-sm truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Link (if admin/executive) */}
                    {(user?.role === 'admin' || user?.role === 'executive') && (
                      <Link
                        href="/dashboard"
                        onClick={handleNavLinkClick}
                        className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white font-semibold text-center transition-all duration-200 hover:shadow-[0_12px_45px_rgba(139,92,246,0.5)] active:scale-95"
                      >
                        Dashboard
                      </Link>
                    )}

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500/80 to-red-500/80 text-white font-semibold transition-all duration-200 hover:shadow-[0_12px_45px_rgba(239,68,68,0.5)] active:scale-95"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
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
