"use client"
import { useState, useEffect } from "react";
import Hero from "@/components/ui/animated-shader-hero";
import EventsSection from "@/components/ui/events-section";
import WhatWeDo from "@/components/ui/what-we-do";
import LeaderboardSection from "@/components/ui/leaderboard-section";
import PastEventsTimeline from "@/components/ui/past-events-timeline";
import Navbar from "@/components/ui/navbar";
import EventsPage from "@/components/ui/events-page";
import dynamic from "next/dynamic";
const CosmicBackground = dynamic(
  () => import("@/components/ui/cosmic-background").then(m => m.CosmicBackground),
  { ssr: false }
);

export default function Home() {
  const [isEventsPageOpen, setIsEventsPageOpen] = useState(false);

  useEffect(() => {
    console.log('App: isEventsPageOpen state:', isEventsPageOpen);
  }, [isEventsPageOpen]);

  // Smooth scrolling (Lenis) is disabled because the package isn't installed.
  // To enable, install @studio-freight/lenis and re-add the init block.

  const handleAboutClick = () => {
    console.log('About IEEE_RGIPT clicked!');
  };

  const handleEventsClick = () => {
    setIsEventsPageOpen(true);
  };

  const handleViewAllEvents = () => {
    console.log('handleViewAllEvents called, setting isEventsPageOpen to true');
    setIsEventsPageOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <CosmicBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero
          headline={{
            line1: "IEEE",
            line2: "Student Branch"
          }}
          subtitle="Rajiv Gandhi Institute Of Petroleum Technology"
          buttons={{
            primary: {
              text: "About IEEE_RGIPT",
              onClick: handleAboutClick
            },
            secondary: {
              text: "Events",
              onClick: handleEventsClick
            }
          }}
        />
        <EventsSection onViewAllClick={handleViewAllEvents} />
        <WhatWeDo />
        <LeaderboardSection />
        <PastEventsTimeline />
      </div>
      
      <EventsPage 
        isOpen={isEventsPageOpen} 
        onClose={() => setIsEventsPageOpen(false)} 
      />
    </div>
  );
}
