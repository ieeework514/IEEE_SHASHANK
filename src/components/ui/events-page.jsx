"use client"
import React, { useState, useEffect } from 'react';
import { X, Calendar, Zap, Users, Code, Trophy, Target, Users as UsersIcon } from 'lucide-react';
import { CosmicBackground } from './cosmic-background';

const EventsPage = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Competitions');

  useEffect(() => {
    console.log('EventsPage isOpen:', isOpen);
  }, [isOpen]);

  const events = [
    {
      id: '1',
      category: 'Competitions',
      date: '3rd November 2025 (Monday)',
      difficulty: 'Advanced',
      title: 'CODEQUEST 2025',
      description: 'Gear up with your coding skills for CODEQUEST 2025, an exciting coding contest hosted on HackerRank.',
      language: 'C++ Only',
      seatsLimited: true,
      expectedParticipants: 150
    },
    {
      id: '2',
      category: 'Hackathons',
      date: '12th–13th November 2025',
      difficulty: 'Intermediate',
      title: 'Hack RGIPT 2025',
      description: 'Flagship hackathon under Urjotsav in collaboration with IEEE & KODE Club. Showcase innovation and teamwork!',
      seatsLimited: true,
      expectedParticipants: 200
    },
    {
      id: '3',
      category: 'Series',
      date: '24th–27th October 2025',
      difficulty: 'Beginner',
      title: 'RoboQuest 2025',
      description: 'Hands-on robotics challenge featuring Line Follower & Obstacle Avoidance bots. Finale: PID Workshop.',
      seatsLimited: false,
      expectedParticipants: 100
    },
    {
      id: '4',
      category: 'Workshops',
      date: '15th October 2025',
      difficulty: 'Beginner',
      title: 'Web Development Workshop',
      description: 'Learn modern web development with React and TypeScript. Build your first full-stack application.',
      language: 'JavaScript/TypeScript',
      seatsLimited: true,
      expectedParticipants: 50
    }
  ];

  const categories = [
    { name: 'Competitions', icon: <Code className="w-5 h-5" /> },
    { name: 'Hackathons', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Series', icon: <Target className="w-5 h-5" /> },
    { name: 'Workshops', icon: <UsersIcon className="w-5 h-5" /> }
  ];

  const filteredEvents = events.filter(event => event.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (!isOpen) {
    console.log('EventsPage: isOpen is false, not rendering');
    return null;
  }

  console.log('EventsPage: Rendering modal');

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-y-auto bg-black" 
      style={{ 
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <div className="fixed inset-0 z-0">
        <CosmicBackground />
      </div>
      
      <div 
        className="fixed inset-0 bg-black/90 z-[1]"
        onClick={onClose}
      />
      
      <div className="relative min-h-screen py-8 z-[2] bg-black/0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Upcoming Events
              </h1>
              <p className="text-white/90 text-lg">
                Join our technical events and showcase your skills
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800/60 text-white/70 hover:bg-gray-700/60 border border-white/10 backdrop-blur-sm'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-gray-800/80 transition-all shadow-lg"
              >
                <div className="flex justify-end mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(event.difficulty)}`}>
                    {event.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {event.title}
                </h3>

                <p className="text-white/80 leading-relaxed mb-6">
                  {event.description}
                </p>

                {event.language && (
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                      {event.language}
                    </span>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  {event.seatsLimited && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Seats are limited</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>{event.expectedParticipants}+ Expected</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gray-700/60 hover:bg-gray-700/80 border border-white/10 rounded-lg text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                    <span>ℹ</span>
                    Full Details
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30">
                    Register Now
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg">No events found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;


