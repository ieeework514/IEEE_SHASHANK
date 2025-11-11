"use client"
import React from 'react';

const StatCard = ({ value, label }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 px-6 py-8 md:px-10 md:py-10 text-center text-white/90 shadow-xl shadow-purple-900/20 hover:shadow-purple-700/30 transition-all">
    <span className="text-4xl font-extrabold text-white">{value}</span>
    <p className="text-purple-200/90 text-sm mt-2">{label}</p>
  </div>
);

const LeaderboardHero = () => {
  return (
    <div className="text-white bg-black/0">
      <div className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Join the <span className="text-purple-400">Coding Leaderboard</span>
            </h1>
            <p className="text-lg text-purple-200/90 mb-8 max-w-lg mx-auto md:mx-0">
              Submit your LeetCode, Codeforces, and CodeChef IDs to rank among all students at <span className="font-semibold text-white">RGIPT</span>. Showcase your skills and compete with peers!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Sign Up Now
              </a>
              <a 
                href="#leaderboard" 
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white/90 font-semibold py-3 px-8 rounded-lg transition-all duration-300 backdrop-blur-md"
              >
                View Leaderboard
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/10 border border-white/10 p-6 rounded-lg shadow-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:bg-white/15">
              <span className="text-2xl font-bold text-white">
                 LeetCode
              </span>
            </div>
            <div className="bg-white/10 border border-white/10 p-6 rounded-lg shadow-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:bg-white/15">
              <span className="text-2xl font-bold text-white">
                 CodeForces
              </span>
            </div>
            <div className="bg-white/10 border border-white/10 p-6 rounded-lg shadow-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:bg-white/15">
              <span className="text-2xl font-bold text-white">
                 CodeChef
              </span>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard value="150+" label="Active Members" />
            <StatCard value="50+" label="Events Organized" />
            <StatCard value="20+" label="Workshops" />
            <StatCard value="25+" label="Internships Provided" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHero;


