"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Zap, Users, Code, Trophy, Target, Clock, MapPin, ArrowRight, ArrowLeft, CheckCircle2, X as XIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const EventCard = ({ event, onClick, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Advanced':
        return 'text-red-300 border-red-500/30';
      case 'Intermediate':
        return 'text-yellow-300 border-yellow-500/30';
      case 'Beginner':
        return 'text-green-300 border-green-500/30';
      default:
        return 'text-gray-300 border-gray-500/30';
    }
  };

  const getSeatsPercentage = (event) => {
    return Math.round((event.registeredSeats / event.totalSeats) * 100);
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none`} />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Difficulty Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border backdrop-blur-sm bg-white/10 group-hover:bg-white/15 transition-all duration-300 ${getDifficultyColor(event.difficulty)}`}>
          {event.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Date & Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-white/60 text-xs group-hover:text-white/80 transition-colors">
            <Calendar className="w-4 h-4 text-white/40 group-hover:text-purple-300 transition-colors" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs group-hover:text-white/80 transition-colors">
            <Clock className="w-4 h-4 text-white/40 group-hover:text-blue-300 transition-colors" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs group-hover:text-white/80 transition-colors">
            <MapPin className="w-4 h-4 text-white/40 group-hover:text-green-300 transition-colors" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-white/80 transition-colors">
          {event.description}
        </p>

        {/* Language Badge */}
        {event.language && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/80 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <Code className="w-3 h-3" />
              {event.language}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="space-y-3 mb-5">
          {event.seatsLimited && (
            <>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white/60 group-hover:text-white/80 transition-colors">
                  <Zap className="w-4 h-4 text-white/40 group-hover:text-yellow-400 transition-colors" />
                  <span>Seats Available</span>
                </div>
                <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                  {event.totalSeats - event.registeredSeats} / {event.totalSeats}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden group-hover:bg-white/15 transition-colors">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500/50 to-blue-500/50 transition-all duration-500 group-hover:from-purple-500/70 group-hover:to-blue-500/70"
                  style={{ width: `${getSeatsPercentage(event)}%` }}
                />
              </div>
            </>
          )}
          <div className="flex items-center gap-2 text-white/60 text-xs group-hover:text-white/80 transition-colors">
            <Users className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors" />
            <span>{event.expectedParticipants}+ Expected</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:border-white/30 hover:scale-[1.02] active:scale-95 group-hover:shadow-lg group-hover:shadow-purple-500/20"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const EventsPage = ({ isOpen, onClose, isFullPage = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const eventsRef = useRef(null);
  const headerRef = useRef(null);

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

  const events = [
    {
      id: '1',
      category: 'Competitions',
      date: '3rd November 2025 (Monday)',
      time: '10:00 AM - 4:00 PM',
      location: 'Computer Lab, RGIPT',
      difficulty: 'Advanced',
      title: 'CODEQUEST 2025',
      description: 'Gear up with your coding skills for CODEQUEST 2025, an exciting coding contest hosted on HackerRank. Compete for IIT Bombay TECHFEST spots and showcase your problem-solving abilities.',
      fullDescription: 'CODEQUEST 2025 is a premier coding competition designed to test your algorithmic thinking and programming skills. Participants will solve challenging problems on HackerRank platform. Top performers will get direct entry to IIT Bombay TECHFEST. The contest will feature problems ranging from basic data structures to advanced algorithms.',
      language: 'C++ Only',
      seatsLimited: true,
      totalSeats: 150,
      registeredSeats: 87,
      expectedParticipants: 150,
      requirements: ['Basic knowledge of C++', 'HackerRank account', 'Laptop with internet connection'],
      prizes: ['Winner: ₹10,000 + TECHFEST Entry', 'Runner-up: ₹5,000', 'Top 10: Certificates + Goodies'],
      photos: []
    },
    {
      id: '2',
      category: 'Hackathons',
      date: '12th–13th November 2025',
      time: '9:00 AM - 9:00 PM (Both Days)',
      location: 'Main Auditorium, RGIPT',
      difficulty: 'Intermediate',
      title: 'Hack RGIPT 2025',
      description: 'Flagship hackathon under Urjotsav in collaboration with IEEE & KODE Club. Showcase innovation and teamwork! Build innovative solutions in 48 hours.',
      fullDescription: 'Hack RGIPT 2025 is a 48-hour hackathon where teams of 2-4 members will build innovative solutions to real-world problems. The event includes mentorship sessions, workshops, and networking opportunities. Participants will present their projects to a panel of judges.',
      language: 'Any',
      seatsLimited: true,
      totalSeats: 200,
      registeredSeats: 134,
      expectedParticipants: 200,
      requirements: ['Team of 2-4 members', 'Laptop with development environment', 'GitHub account'],
      prizes: ['Winner: ₹25,000', 'Runner-up: ₹15,000', 'Best Design: ₹10,000', 'All participants: Certificates'],
      photos: []
    },
    {
      id: '3',
      category: 'Series',
      date: '24th–27th October 2025',
      time: '2:00 PM - 6:00 PM (Daily)',
      location: 'Robotics Lab, RGIPT',
      difficulty: 'Beginner',
      title: 'RoboQuest 2025',
      description: 'Hands-on robotics challenge featuring Line Follower & Obstacle Avoidance bots. Finale: PID Workshop. Learn robotics from scratch!',
      fullDescription: 'RoboQuest 2025 is a 4-day robotics series that takes you from basics to advanced robotics. Day 1-2: Build your line follower bot. Day 3: Implement obstacle avoidance. Day 4: Advanced PID control workshop. All materials and kits will be provided.',
      language: 'Arduino/C++',
      seatsLimited: false,
      totalSeats: 100,
      registeredSeats: 45,
      expectedParticipants: 100,
      requirements: ['No prior experience needed', 'Interest in robotics', 'Laptop (optional)'],
      prizes: ['Best Bot: ₹8,000', 'Most Innovative: ₹5,000', 'All participants: Participation certificates'],
      photos: []
    },
    {
      id: '4',
      category: 'Workshops',
      date: '15th October 2025',
      time: '10:00 AM - 5:00 PM',
      location: 'Seminar Hall, RGIPT',
      difficulty: 'Beginner',
      title: 'Web Development Workshop',
      description: 'Learn modern web development with React and TypeScript. Build your first full-stack application from scratch.',
      fullDescription: 'This comprehensive workshop covers modern web development stack: React, TypeScript, Node.js, and MongoDB. You\'ll build a complete full-stack application with authentication, database integration, and deployment. Perfect for beginners and intermediate developers.',
      language: 'JavaScript/TypeScript',
      seatsLimited: true,
      totalSeats: 50,
      registeredSeats: 32,
      expectedParticipants: 50,
      requirements: ['Basic programming knowledge', 'Laptop with Node.js installed', 'VS Code'],
      prizes: ['Best Project: ₹3,000', 'All participants: Certificates'],
      photos: []
    },
    {
      id: '5',
      category: 'Workshops',
      date: '20th October 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Lab 3, RGIPT',
      difficulty: 'Intermediate',
      title: 'Machine Learning Bootcamp',
      description: 'Deep dive into ML algorithms, neural networks, and practical applications. Hands-on projects included.',
      fullDescription: 'A comprehensive machine learning bootcamp covering supervised learning, neural networks, and deep learning. Participants will work on real-world projects using Python, TensorFlow, and scikit-learn. Perfect for students looking to start their ML journey.',
      language: 'Python',
      seatsLimited: true,
      totalSeats: 40,
      registeredSeats: 28,
      expectedParticipants: 40,
      requirements: ['Python basics', 'Laptop with Python 3.8+', 'Jupyter Notebook'],
      prizes: ['Best Model: ₹5,000', 'All participants: Certificates'],
      photos: []
    },
    {
      id: '6',
      category: 'Competitions',
      date: '5th November 2025',
      time: '11:00 AM - 3:00 PM',
      location: 'Online',
      difficulty: 'Intermediate',
      title: 'CodeChef Contest',
      description: 'Monthly coding contest on CodeChef platform. Solve algorithmic challenges and improve your rating.',
      fullDescription: 'Join our monthly CodeChef contest featuring problems of varying difficulty. Perfect for practicing competitive programming. The contest will be held online, and participants can join from anywhere.',
      language: 'Any',
      seatsLimited: false,
      totalSeats: 500,
      registeredSeats: 234,
      expectedParticipants: 500,
      requirements: ['CodeChef account', 'Internet connection'],
      prizes: ['Top 3: Cash prizes', 'Top 10: Certificates', 'All participants: Rating improvement'],
      photos: []
    }
  ];

  const categories = [
    { name: 'All', icon: Target, count: events.length },
    { name: 'Competitions', icon: Code, count: events.filter(e => e.category === 'Competitions').length },
    { name: 'Hackathons', icon: Trophy, count: events.filter(e => e.category === 'Hackathons').length },
    { name: 'Series', icon: Target, count: events.filter(e => e.category === 'Series').length },
    { name: 'Workshops', icon: Users, count: events.filter(e => e.category === 'Workshops').length }
  ];

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const handleRegister = async (event) => {
    setIsRegistering(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRegistering(false);
    setSelectedEvent(null);
    alert(`Registration successful for ${event.title}!`);
  };

  const nextImage = () => {
    if (selectedEvent && selectedEvent.photos && selectedEvent.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.photos.length);
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.photos && selectedEvent.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.photos.length) % selectedEvent.photos.length);
    }
  };

  if (!isFullPage && !isOpen) {
    return null;
  }

  return (
    <div className={`${isFullPage ? 'min-h-screen' : 'fixed inset-0 z-[100] overflow-y-auto'} bg-black/0`}>
      <div className="relative min-h-screen py-24 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div 
            ref={headerRef}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 md:mb-16 gap-4 transition-all duration-1000 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-purple-300 text-xs font-semibold">Upcoming Events</span>
      </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                Upcoming Events
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-2xl">
                Join our technical events and showcase your skills. Register now to secure your spot!
              </p>
            </div>
            {!isFullPage && onClose && (
            <button
              onClick={onClose}
                className="p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 active:scale-95"
                aria-label="Close"
            >
                <XIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            )}
            {isFullPage && (
              <Link
                href="/"
                className="p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 active:scale-95 flex items-center gap-2 text-white text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 md:mb-12">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
              <button
                key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    eventsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                  selectedCategory === category.name
                      ? 'bg-white/10 text-white border border-white/20 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                  }`}
                  style={{
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${selectedCategory === category.name ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span>{category.name}</span>
                  <span className={`px-2 py-0.5 rounded text-xs transition-all duration-300 ${
                    selectedCategory === category.name 
                      ? 'bg-white/20' 
                      : 'bg-white/10 group-hover:bg-white/15'
                  }`}>
                    {category.count}
                  </span>
              </button>
              );
            })}
          </div>

          {/* Events Grid */}
          <div ref={eventsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Calendar className="w-8 h-8 text-white/50" />
              </div>
              <p className="text-white/70 text-lg">No events found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                View All Events
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="relative bg-black/95 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
            >
              <XIcon className="w-5 h-5 text-white" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-4">
                  {selectedEvent.category}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {selectedEvent.title}
                </h2>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">About This Event</h3>
                <p className="text-white/80 leading-relaxed">
                  {selectedEvent.fullDescription}
                </p>
              </div>

              {/* Requirements */}
              {selectedEvent.requirements && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedEvent.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prizes */}
              {selectedEvent.prizes && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Prizes & Rewards</h3>
                  <ul className="space-y-2">
                    {selectedEvent.prizes.map((prize, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80">
                        <Trophy className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                        <span>{prize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Register Button */}
              <button
                onClick={() => handleRegister(selectedEvent)}
                disabled={isRegistering || (selectedEvent.seatsLimited && selectedEvent.registeredSeats >= selectedEvent.totalSeats)}
                className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 ${
                  selectedEvent.seatsLimited && selectedEvent.registeredSeats >= selectedEvent.totalSeats
                    ? 'bg-white/5 cursor-not-allowed opacity-50'
                    : 'bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                {isRegistering ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : (
                  <>
                    <span>Register Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
