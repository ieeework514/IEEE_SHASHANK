"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const Hero = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black/0 -mb-px pt-24 sm:pt-28 md:pt-32 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.5),
                         0 0 40px rgba(139, 92, 246, 0.3),
                         0 0 60px rgba(96, 165, 250, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(139, 92, 246, 0.8),
                         0 0 60px rgba(139, 92, 246, 0.5),
                         0 0 90px rgba(96, 165, 250, 0.4);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 1.2s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1.2s ease-out forwards;
          opacity: 0;
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
          color: #ffffff; /* Fallback color for browsers that don't support background-clip */
          display: inline-block;
        }
        
        /* Fallback for browsers that don't support background-clip */
        @supports not (-webkit-background-clip: text) {
          .gradient-text {
            color: #ffffff;
            -webkit-text-fill-color: #ffffff;
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Interactive Background Glow */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-white w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {trustBadge && (
          <div className="mb-6 sm:mb-8 animate-fade-in-down">
            <div className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-xs sm:text-sm hover:bg-white/15 transition-all duration-300">
              {trustBadge.icons && (
                <div className="flex">
                  {trustBadge.icons.map((icon, index) => (
                    <span key={index} className="text-white">
                      {icon}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-white whitespace-nowrap">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 max-w-6xl mx-auto w-full">
          {/* Main Headline - IEEE Separated and Prominent */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* IEEE - Large and Minimal */}
            {headline?.line1 && (
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white leading-[1.1] tracking-tight">
                {headline.line1}
              </h1>
            )}
            
            {/* Student Branch - Slide in from left with animation */}
            {headline?.line2 && (
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white animate-slide-in-left animation-delay-400 leading-[1.1] tracking-tight">
                {headline.line2}
              </h1>
            )}
          </div>
          
          {/* Subtitle - Rajiv Gandhi Institute - Slide in from right with glow */}
          {subtitle && (
            <div className="max-w-4xl mx-auto px-2">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed relative inline-block animate-slide-in-right animation-delay-600">
                <span className="relative z-10 animate-glow-pulse">{subtitle}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 blur-2xl rounded-lg -z-10 animate-pulse" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              </p>
            </div>
          )}
          
          {/* Action Buttons - Better Proportioned */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10 md:mt-12 animate-fade-in-up animation-delay-800 w-full sm:w-auto px-4 sm:px-0">
              {buttons.primary && (
                <button 
                  onClick={buttons.primary.onClick}
                  className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 active:scale-[0.98] touch-manipulation overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    {buttons.primary.text}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              )}
              {buttons.secondary && (
                <button 
                  onClick={buttons.secondary.onClick}
                  className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-md active:scale-[0.98] touch-manipulation overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    {buttons.secondary.text}
                  </span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Hero;
