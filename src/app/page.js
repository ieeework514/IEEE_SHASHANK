"use client"
import { useState, useEffect } from "react";
import Hero from "@/components/ui/animated-shader-hero";
import EventsSection from "@/components/ui/events-section";
import WhatWeDo from "@/components/ui/what-we-do";
import PastEventsTimeline from "@/components/ui/past-events-timeline";
import Navbar from "@/components/ui/navbar";
import dynamic from "next/dynamic";
const CosmicBackground = dynamic(
  () => import("@/components/ui/cosmic-background").then(m => m.CosmicBackground),
  { ssr: false }
);

export default function Home() {

  // Smooth scrolling (Lenis) is disabled because the package isn't installed.
  // To enable, install @studio-freight/lenis and re-add the init block.

  const handleAboutClick = () => {
    window.location.href = '/about';
  };

  const handleEventsClick = () => {
    window.location.href = '/events';
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
              text: "About Us",
              onClick: handleAboutClick
            },
            secondary: {
              text: "Explore Events",
              onClick: handleEventsClick
            }
          }}
        />
        <EventsSection />
        <WhatWeDo />
        <PastEventsTimeline />
      </div>
    </div>
  );
}
