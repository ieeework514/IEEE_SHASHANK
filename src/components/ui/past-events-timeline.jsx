"use client"
import React, { useEffect, useRef, useState } from 'react';

const TimelineItem = ({ 
  title, 
  description, 
  images, 
  type, 
  orientation = 'left',
  onReveal
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const node = itemRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (onReveal) {
              onReveal(node.offsetTop + 24);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  
  let typeClass;
  let typeText;

  switch (type) {
    case 'Workshop':
      typeClass = 'bg-purple-600';
      typeText = 'Workshop';
      break;
    case 'Hackathon':
      typeClass = 'bg-pink-600';
      typeText = 'Hackathon';
      break;
    case 'Orientation':
    default:
      typeClass = 'bg-blue-600';
      typeText = 'Orientation';
      break;
  }

  return (
    <div
      ref={itemRef}
      className={`relative mb-8 last:mb-0 w-full flex md:justify-center ${
        orientation === 'left' ? 'justify-start' : 'justify-end'
      } transition-transform duration-700 ease-out will-change-transform ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : orientation === 'left'
            ? 'opacity-0 -translate-x-6'
            : 'opacity-0 translate-x-6'
      }`}
    >
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 z-10 hidden md:block"></div>
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700 hidden md:block"></div>

      <div 
        className={`bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-full md:w-5/12 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-purple-500/20 
          ${orientation === 'left' ? 'md:mr-auto' : 'md:ml-auto'}
        `}
      >
        <div className="flex items-center mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeClass} text-white`}>
            {typeText}
          </span>
          <h3 className="text-2xl font-bold text-white ml-3">{title}</h3>
        </div>
        <p className="text-purple-200/90 text-sm mb-4 leading-relaxed">{description}</p>

        {images && images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${title} event photo ${index + 1}`} 
                className="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105" 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EventsTimeline = () => {
  const events = [
    {
      id: 1,
      title: 'CS Workshop',
      type: 'Workshop',
      description: 'The IEEE CS WORKSHOP 2.0 series was a group of training sessions designed to help students improve their knowledge and skills in important areas of computer science. It included hands-on practices on the domains like CP and DSA followed by WEB DEVELOPMENT and OPEN SOURCE & GITHUB SESSIONS. Furthermore, workshops sessions in fields like AI & ML, AR & VR introduced students to the latest technologies and how they are used in the modern world. Thereafter, APP DEVELOPMENT workshop focused on teaching the essential steps for app creation.',
      images: [
        'https://example.com/cs-workshop-1.jpg', 
        'https://example.com/cs-workshop-2.jpg',
        'https://example.com/cs-workshop-3.jpg', 
        'https://example.com/cs-workshop-4.jpg'
      ],
      date: 'October 2023',
    },
    {
      id: 2,
      title: 'KODEKURRENT Hackathon',
      type: 'Hackathon',
      description: 'KodeKurrent-Season One-Phase-2 was a 2 day HACKATHON event conducted offline to bring together creative minds, tech enthusiasts and problem solvers under one roof. The hackathon fostered learning, networking, and hands-on experience, leaving participants inspired and empowered.',
      images: [
        'https://example.com/kodekurrent-1.jpg',
        'https://example.com/kodekurrent-2.jpg',
        'https://example.com/kodekurrent-3.jpg',
        'https://example.com/kodekurrent-4.jpg'
      ],
      date: 'November 2023',
    },
    {
      id: 3,
      title: 'IEEE SB Orientation',
      type: 'Orientation',
      description: 'IEEE, SB ORIENTATION was an introductory event which familiarised students with our organization and sparked a tech and innovation enthusiasm among them. The goal of the session was to familiarise students with the structure, benefits, and activities of the IEEE: Student Branch and encourage them to become active members of this global professional community.',
      images: [
        'https://example.com/orientation-1.jpg',
        'https://example.com/orientation-2.jpg',
      ],
      date: 'September 2023',
    },
  ];

  const containerRef = useRef(null);
  const [indicatorY, setIndicatorY] = useState(0);

  return (
    <div className="text-white min-h-screen py-20 px-4 bg-black/0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-white leading-tight">
          Our <span className="text-purple-400">Past Events</span>
        </h2>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-white/15"></div>
          <div className="pointer-events-none absolute left-2.5 md:left-1/2 -translate-x-1/2" style={{ top: `${indicatorY}px` }}>
            <div className="h-5 w-5 rounded-full bg-purple-500 shadow-[0_0_22px_rgba(168,85,247,0.8)] ring-2 ring-white/20 -translate-y-1/2" />
          </div>

          {events.map((event, index) => (
            <TimelineItem
              key={event.id}
              title={event.title}
              description={event.description}
              images={event.images}
              type={event.type}
              orientation={index % 2 === 0 ? 'left' : 'right'}
              onReveal={(y) => setIndicatorY(y)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsTimeline;


