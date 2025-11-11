"use client"
import React from 'react';
import Link from 'next/link';

const EventCard = ({ date, title, description, ctaHref = '#' }) => {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 md:p-10 text-white/90 shadow-xl shadow-purple-900/20 hover:shadow-purple-700/30 transition-all">
      <div className="text-xs tracking-widest font-semibold text-purple-300 uppercase mb-6">
        {date}
      </div>
      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
        {title}
      </h3>
      <p className="text-purple-200/90 leading-relaxed mb-8">
        {description}
      </p>
      <a href={ctaHref} className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-semibold">
        Learn more <span className="text-lg">→</span>
      </a>
    </div>
  );
};

const EventsSection = () => {
  return (
    <section id="events" className="relative w-full bg-black/0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">
        <h2 className="text-center text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Upcoming Events
        </h2>
        <p className="text-center text-purple-200/90 mt-6 max-w-3xl mx-auto">
          Don't miss out on our exciting upcoming events and activities
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <EventCard
            date="3rd November 2025"
            title="CODEQUEST 2025"
            description={
              'C++ Coding Contest on HackerRank — Compete for IIT Bombay TECHFEST spots!'
            }
          />
          <EventCard
            date="12th–13th November 2025"
            title="Hack RGIPT 2025"
            description={
              'Flagship hackathon under Urjotsav in collaboration with IEEE & KODE Club. Showcase innovation and teamwork!'
            }
          />
          <EventCard
            date="24th–27th October 2025"
            title="RoboQuest 2025"
            description={
              'Hands-on robotics challenge featuring Line Follower & Obstacle Avoidance bots. Finale: PID Workshop.'
            }
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            View All Events 
            <span className="text-lg group-hover:translate-x-1 transition-transform">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;


