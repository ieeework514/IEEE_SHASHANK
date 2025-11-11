"use client"
import Navbar from "@/components/ui/navbar";
import EventsPage from "@/components/ui/events-page";
import dynamic from "next/dynamic";

const CosmicBackground = dynamic(
  () => import("@/components/ui/cosmic-background").then(m => m.CosmicBackground),
  { ssr: false }
);

export default function EventsRoute() {
  return (
    <div className="w-full min-h-screen  bg-black relative">
      <div className="fixed inset-0 z-0">
        <CosmicBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
        <EventsPage isOpen={true} isFullPage={true} />
      </div>
    </div>
  );
}

