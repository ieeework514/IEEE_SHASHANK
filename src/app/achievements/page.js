"use client"
import Navbar from "@/components/ui/navbar";
import AchievementsPage from "@/components/ui/achievements-page";
import dynamic from "next/dynamic";

const CosmicBackground = dynamic(
  () => import("@/components/ui/cosmic-background").then(m => m.CosmicBackground),
  { ssr: false }
);

export default function AchievementsRoute() {
  return (
    <div className="w-full min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <CosmicBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
        <AchievementsPage />
      </div>
    </div>
  );
}

