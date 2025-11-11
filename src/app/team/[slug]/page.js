"use client"
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from "@/components/ui/navbar";
import { getMemberBySlug } from '@/data/team-data';
import { Linkedin, ArrowLeft, Mail, Award, Code, Users, Building2, Github, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from "next/dynamic";

const CosmicBackground = dynamic(
  () => import("@/components/ui/cosmic-background").then(m => m.CosmicBackground),
  { ssr: false }
);

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      const memberData = getMemberBySlug(params.slug);
      if (memberData) {
        setMember(memberData);
      } else {
        router.push('/team');
      }
      setLoading(false);
    }
  }, [params, router]);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black relative flex items-center justify-center">
        <div className="fixed inset-0 z-0">
          <CosmicBackground />
        </div>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!member) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0">
        <CosmicBackground />
      </div>
      <div className="relative z-10">
        <Navbar />
        <div className="relative min-h-screen py-24 md:py-28 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/team"
              className="inline-flex items-center gap-2 mb-8 text-white/70 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Team</span>
            </Link>

            {/* Member Card */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 mx-auto md:mx-0">
                    {member.image && member.image.startsWith('/') ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          if (e.target) {
                            e.target.style.display = 'none';
                          }
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-4xl md:text-5xl bg-gradient-to-br from-purple-500/30 to-blue-500/30">
                      {getInitials(member.name)}
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {member.name}
                  </h1>
                  <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold mb-6">
                    {member.position}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-6 flex-wrap">
                    <a
                      href={member.linkedin || '#'}
                      target={member.linkedin ? "_blank" : undefined}
                      rel={member.linkedin ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!member.linkedin) {
                          e.preventDefault();
                        }
                      }}
                      className={`p-3 rounded-xl border border-white/10 transition-all ${
                        member.linkedin 
                          ? 'bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-blue-400/50 cursor-pointer' 
                          : 'bg-white/5 opacity-50 cursor-not-allowed'
                      }`}
                      title={member.linkedin ? "LinkedIn" : "LinkedIn (Not available)"}
                    >
                      <Linkedin className={`w-6 h-6 ${member.linkedin ? 'text-blue-400' : 'text-white/50'}`} />
                    </a>
                    <a
                      href={member.github || '#'}
                      target={member.github ? "_blank" : undefined}
                      rel={member.github ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!member.github) {
                          e.preventDefault();
                        }
                      }}
                      className={`p-3 rounded-xl border border-white/10 transition-all ${
                        member.github 
                          ? 'bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-gray-400/50 cursor-pointer' 
                          : 'bg-white/5 opacity-50 cursor-not-allowed'
                      }`}
                      title={member.github ? "GitHub" : "GitHub (Not available)"}
                    >
                      <Github className={`w-6 h-6 ${member.github ? 'text-white' : 'text-white/50'}`} />
                    </a>
                    <a
                      href={member.instagram || '#'}
                      target={member.instagram ? "_blank" : undefined}
                      rel={member.instagram ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!member.instagram) {
                          e.preventDefault();
                        }
                      }}
                      className={`p-3 rounded-xl border border-white/10 transition-all ${
                        member.instagram 
                          ? 'bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-pink-400/50 cursor-pointer' 
                          : 'bg-white/5 opacity-50 cursor-not-allowed'
                      }`}
                      title={member.instagram ? "Instagram" : "Instagram (Not available)"}
                    >
                      <Instagram className={`w-6 h-6 ${member.instagram ? 'text-pink-400' : 'text-white/50'}`} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {member.bio && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-400" />
                    About
                  </h2>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {member.bio}
                  </p>
                </div>
              )}

              {/* Journey Section */}
              {member.journey && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    Role & Journey
                  </h2>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {member.journey}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
