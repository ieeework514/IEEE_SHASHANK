"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Target, Users, Award, Lightbulb, TrendingUp, Code, BookOpen, Trophy, Calendar, Briefcase, Network, GraduationCap, ArrowRight, Sparkles, Zap, Heart, Rocket } from 'lucide-react';

const StatCard = ({ value, label, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            const numericValue = parseInt(value.toString().replace(/\D/g, ''));
            const suffix = value.toString().includes('+') ? '+' : '';
            const duration = 2000;
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const now = Date.now();
              const elapsed = (now - startTime) / 1000;
              const progress = Math.min(elapsed / (duration / 1000), 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(startValue + (numericValue - startValue) * easeOutQuart);
              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(numericValue);
              }
            };

            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible, value]);

  const suffix = value.toString().includes('+') ? '+' : '';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      {/* Animated Gradient Border */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: isHovered 
            ? 'linear-gradient(45deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))'
            : 'transparent',
          backgroundSize: '200% 200%',
          animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
        }}
      />
      
      {/* Main Card */}
      <div className="relative bg-black/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl transition-all duration-500 group-hover:border-white/30 group-hover:bg-black/70 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        </div>

        {/* Floating Icon Container */}
        <div className="relative z-10 mb-6">
          <div className="relative inline-flex items-center justify-center">
            {/* Icon Glow Effect */}
            <div className="absolute inset-0 bg-purple-500/30 rounded-xl blur-xl group-hover:blur-2xl group-hover:bg-purple-400/50 transition-all duration-500 group-hover:scale-150" />
            
            {/* Icon Container */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/20 flex items-center justify-center group-hover:border-purple-400/50 group-hover:rotate-6 transition-all duration-500 group-hover:scale-110">
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-purple-300 group-hover:text-purple-200 transition-all duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Number with Animation */}
        <div className="relative z-10 text-center mb-3">
          <div className="relative inline-block">
            {/* Number Glow */}
            <div className="absolute inset-0 bg-purple-500/20 blur-2xl group-hover:bg-purple-400/30 transition-all duration-500" />
            
            {/* Number */}
            <div className="relative text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-500">
              {count}{suffix}
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="relative z-10 text-center">
          <p className="text-white/80 text-sm md:text-base font-semibold group-hover:text-white transition-colors duration-300">
            {label}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

const ValueCard = ({ title, description, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-white/20 transition-all duration-500 hover:scale-105"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-purple-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const OfferCard = ({ title, description, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-purple-300" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const AchievementTimeline = ({ year, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative pl-8 pb-8 border-l border-white/10 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-black -translate-x-[10px] group-hover:scale-125 transition-transform duration-300" />
      <div className="text-purple-300 text-sm font-semibold mb-2">{year}</div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
        {title}
      </h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

const AboutPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Add gradient animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-20px) translateX(10px);
          opacity: 0.6;
        }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const values = [
    {
      title: 'Innovation',
      description: 'Fostering creative thinking and cutting-edge solutions to real-world challenges.',
      icon: Sparkles
    },
    {
      title: 'Collaboration',
      description: 'Building a strong community through teamwork and knowledge sharing.',
      icon: Network
    },
    {
      title: 'Excellence',
      description: 'Striving for the highest standards in all our technical and professional endeavors.',
      icon: Award
    },
    {
      title: 'Leadership',
      description: 'Developing future leaders who will shape the technology landscape.',
      icon: TrendingUp
    }
  ];

  const offers = [
    {
      title: 'Technical Workshops',
      description: 'Hands-on sessions covering cutting-edge technologies, programming languages, and industry tools.',
      icon: Code
    },
    {
      title: 'Guest Lectures',
      description: 'Sessions with industry experts, researchers, and alumni sharing their knowledge and experiences.',
      icon: BookOpen
    },
    {
      title: 'Hackathons & Competitions',
      description: 'Platforms to showcase your skills, solve real-world problems, and win exciting prizes.',
      icon: Trophy
    },
    {
      title: 'Research & Projects',
      description: 'Collaborative research initiatives and innovative projects addressing real-world challenges.',
      icon: Rocket
    },
    {
      title: 'Networking Events',
      description: 'Connect with peers, professionals, and potential employers to expand your network.',
      icon: Network
    },
    {
      title: 'Certification Programs',
      description: 'Industry-recognized certifications to boost your resume and career prospects.',
      icon: GraduationCap
    }
  ];

  const achievements = [
    {
      year: '2025',
      title: 'National Level Hackathon Winner',
      description: 'Our team secured first place in the national hackathon competition.'
    },
    {
      year: '2024',
      title: 'Best Student Branch Award',
      description: 'Recognized as the best IEEE student branch in the region.'
    },
    {
      year: '2022',
      title: 'Research Publication',
      description: 'Published 15+ research papers in international conferences.'
    }
  ];

  return (
    <div className="relative min-h-screen py-24 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Heart className="w-5 h-5 text-purple-300" />
            <span className="text-purple-300 text-sm font-semibold">About Us</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            About IEEE RGIPT
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Empowering students to innovate, collaborate, and excel in the ever-evolving world of technology.
          </p>
        </div>

        {/* Mission & Vision - Redesigned */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-5xl mx-auto space-y-12 md:space-y-16">
            {/* Mission Section */}
            <div className="group relative">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/15 rounded-lg blur-lg group-hover:blur-xl group-hover:bg-purple-400/25 transition-all duration-500" />
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center group-hover:border-purple-400/50 group-hover:scale-105 transition-all duration-500">
                      <Target className="w-6 h-6 md:w-7 md:h-7 text-purple-300 group-hover:text-purple-200 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                      Our Mission
                    </span>
                  </h2>
                  <div className="space-y-3">
                    <p className="text-white/85 text-base md:text-lg leading-relaxed">
                      To provide a platform for students to{' '}
                      <span className="font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                        explore, innovate, and excel
                      </span>{' '}
                      in the field of technology.
                    </p>
                    <p className="text-white/85 text-base md:text-lg leading-relaxed">
                      We aim to bridge the gap between academic learning and industry requirements by organizing{' '}
                      <span className="font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                        technical workshops, seminars, and hands-on projects
                      </span>{' '}
                      that enhance both theoretical knowledge and practical skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Vision Section */}
            <div className="group relative">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/15 rounded-lg blur-lg group-hover:blur-xl group-hover:bg-blue-400/25 transition-all duration-500" />
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-hover:border-blue-400/50 group-hover:scale-105 transition-all duration-500">
                      <Lightbulb className="w-6 h-6 md:w-7 md:h-7 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      Our Vision
                    </span>
                  </h2>
                  <div className="space-y-3">
                    <p className="text-white/85 text-base md:text-lg leading-relaxed">
                      To be the{' '}
                      <span className="font-semibold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                        leading student branch
                      </span>{' '}
                      that cultivates technological excellence and professional development.
                    </p>
                    <p className="text-white/85 text-base md:text-lg leading-relaxed">
                      We envision a future where our members become{' '}
                      <span className="font-semibold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                        industry leaders, innovators, and change-makers
                      </span>{' '}
                      who contribute significantly to advancing technology for humanity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* What is IEEE - Redesigned */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  What is IEEE?
                </span>
              </h2>
              <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Understanding our foundation and global impact
              </p>
            </div>

            {/* Flowing Text Content - No Boxes */}
            <div className="relative space-y-8 md:space-y-10">
              {/* Paragraph 1 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-white/90 text-lg md:text-xl leading-relaxed pl-0 group-hover:pl-4 transition-all duration-500">
                  <span className="font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                    IEEE (Institute of Electrical and Electronics Engineers)
                  </span>{' '}
                  is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
                </p>
              </div>

              {/* Paragraph 2 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-white/90 text-lg md:text-xl leading-relaxed pl-0 group-hover:pl-4 transition-all duration-500">
                  With more than{' '}
                  <span className="font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    420,000 members
                  </span>{' '}
                  in over{' '}
                  <span className="font-bold text-white bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    160 countries
                  </span>
                  , IEEE is a leading authority on areas ranging from aerospace systems, computers, and telecommunications to biomedical engineering, electric power, and consumer electronics.
                </p>
              </div>

              {/* Paragraph 3 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-white/90 text-lg md:text-xl leading-relaxed pl-0 group-hover:pl-4 transition-all duration-500">
                  The{' '}
                  <span className="font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                    IEEE RGIPT Student Branch
                  </span>{' '}
                  is a dynamic community of passionate students at Rajiv Gandhi Institute of Petroleum Technology, working together to promote technological innovation, foster professional development, and create opportunities for learning and growth.
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-purple-400/50 animate-pulse" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto">
              The principles that guide everything we do at IEEE RGIPT
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <ValueCard
                key={idx}
                title={value.title}
                description={value.description}
                icon={value.icon}
                delay={idx * 100}
              />
            ))}
          </div>
        </div>


        {/* Achievements */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto">
              Milestones that define our journey
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            {achievements.map((achievement, idx) => (
              <AchievementTimeline
                key={idx}
                year={achievement.year}
                title={achievement.title}
                description={achievement.description}
                delay={idx * 200}
              />
            ))}
          </div>
        </div>

        {/* What We Offer - Redesigned */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  What We Offer
                </span>
              </h2>
              <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Opportunities for growth and development
              </p>
            </div>

            {/* Flowing Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {offers.map((offer, idx) => {
                const Icon = offer.icon;
                return (
                  <div
                    key={idx}
                    className="group relative"
                  >
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-purple-500/15 rounded-lg blur-lg group-hover:blur-xl group-hover:bg-purple-400/25 transition-all duration-500" />
                        <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center group-hover:border-purple-400/50 group-hover:scale-110 transition-all duration-500">
                          <Icon className="w-6 h-6 text-purple-300 group-hover:text-purple-200 transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {offer.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Join CTA - Redesigned */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Be part of a vibrant community of{' '}
              <span className="font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                tech enthusiasts, innovators, and future leaders
              </span>
              . Together, we can shape the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/team"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 active:scale-95 hover:border-purple-400/50"
              >
                <span>Meet Our Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 active:scale-95 hover:border-blue-400/50"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

