"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Linkedin, Users, Code, Wrench, ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { teamData, generateSlug } from '@/data/team-data';
import Image from 'next/image';

const MemberCard = ({ member, onClick, delay = 0, isLarge = false }) => {
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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="relative overflow-hidden">
        {/* Image Container */}
        <div className={`relative w-full overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-white/20 transition-all duration-500 ${
          isLarge ? 'aspect-[3/4] md:aspect-[2/3]' : 'aspect-[3/4]'
        }`}>
          {member.image && member.image.startsWith('/') ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={(e) => {
                if (e.target) {
                  e.target.style.display = 'none';
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <span className="text-4xl font-bold text-white/40">{getInitials(member.name)}</span>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`} />
          
          {/* Click Indicator - Always visible on mobile, appears on hover on desktop */}
          <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] transition-all duration-500 z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:translate-y-4'
          }`}>
            <div className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
              <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">View Details</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white flex-shrink-0" />
            </div>
          </div>
          
          {/* LinkedIn Icon - appears on hover (desktop only) */}
          {member.linkedin && (
            <div className={`absolute top-4 right-4 transition-all duration-500 hidden md:block ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className={`font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300 ${
          isLarge ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {member.name}
        </h3>

        {/* Position */}
        <p className={`text-white/60 font-medium ${
          isLarge ? 'text-base md:text-lg' : 'text-sm'
        }`}>
          {member.position}
        </p>

        {/* Hover Line Effect */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`} />
      </div>
    </div>
  );
};

const TeamSection = ({ title, members, icon: Icon, description }) => {
  const memberList = Array.isArray(members) ? members : [members];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!members || memberList.length === 0) return null;

  return (
    <div ref={sectionRef} className="mb-20 md:mb-28">
      <div className={`mb-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="flex items-center gap-4 mb-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Icon className="w-6 h-6 text-purple-300" />
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        </div>
        {description && (
          <p className="text-white/60 text-base md:text-lg max-w-3xl mt-4">
            {description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {memberList.map((member, idx) => (
          <MemberCard
            key={idx}
            member={member}
            onClick={member.onClick || (() => {
              window.location.href = `/team/${generateSlug(member.name)}`;
            })}
            delay={idx * 100}
          />
        ))}
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
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

  return (
    <div className="relative min-h-screen py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Users className="w-5 h-5 text-purple-300" />
            <span className="text-purple-300 text-sm font-semibold">Our Team</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Meet Our Team
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            The passionate individuals driving innovation and excellence at IEEE Student Branch, RGIPT
          </p>
        </div>

        {/* Core Team */}
        <div className="mb-20 md:mb-28">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Team</h2>
            <p className="text-white/60 text-base md:text-lg max-w-3xl">
              Leading the vision and strategic direction of IEEE Student Branch
            </p>
          </div>

          {/* Chairperson - Featured */}
          {teamData.executive.chair && (
            <div className="mb-12">
              <div className="max-w-md mx-auto">
                <MemberCard
                  member={teamData.executive.chair}
                  onClick={() => {
                    window.location.href = `/team/${generateSlug(teamData.executive.chair.name)}`;
                  }}
                  delay={0}
                />
              </div>
            </div>
          )}

          {/* Vice Chair, Secretaries, Treasurer */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {teamData.executive.viceChair && (
              <MemberCard
                member={teamData.executive.viceChair}
                onClick={() => {
                  window.location.href = `/team/${generateSlug(teamData.executive.viceChair.name)}`;
                }}
                delay={100}
              />
            )}
            {teamData.executive.secretaries.map((secretary, idx) => (
              <MemberCard
                key={idx}
                member={secretary}
                onClick={() => {
                  window.location.href = `/team/${generateSlug(secretary.name)}`;
                }}
                delay={200 + idx * 100}
              />
            ))}
            {teamData.executive.treasurer && (
              <MemberCard
                member={teamData.executive.treasurer}
                onClick={() => {
                  window.location.href = `/team/${generateSlug(teamData.executive.treasurer.name)}`;
                }}
                delay={400}
              />
            )}
          </div>
        </div>

        {/* Web & Design Team */}
        <TeamSection
          title="Web & Design Team"
          members={teamData.webDesignTeam.webmasters.map(wm => ({
            ...wm,
            onClick: () => {
              const slug = wm.name === 'Aditya Bhattacharya' && wm.position === 'Web Master' 
                ? generateSlug(wm.name) + '-webmaster'
                : generateSlug(wm.name);
              window.location.href = `/team/${slug}`;
            }
          }))}
          icon={Code}
          description="Building and maintaining our digital presence"
        />

        {/* Technical Team */}
        <div className="mb-20 md:mb-28">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Wrench className="w-6 h-6 text-purple-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Technical Team</h2>
            </div>
            <p className="text-white/60 text-base md:text-lg max-w-3xl">
              Leading technical initiatives across various societies
            </p>
          </div>

          {/* CS */}
          {teamData.technicalTeam.csSecretary && (
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">Computer Society</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                <MemberCard
                  member={teamData.technicalTeam.csSecretary}
                  onClick={() => window.location.href = `/team/${generateSlug(teamData.technicalTeam.csSecretary.name)}-cs`}
                  delay={0}
                />
                {teamData.technicalTeam.csViceSecretaries.map((vsec, idx) => (
                  <MemberCard
                    key={idx}
                    member={vsec}
                    onClick={() => {
                      window.location.href = `/team/${generateSlug(vsec.name)}-cs`;
                    }}
                    delay={100 + idx * 100}
                  />
                ))}
              </div>
            </div>
          )}

          {/* RAS */}
          {teamData.technicalTeam.rasSecretary && (
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">Robotics & Automation Society</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                <MemberCard
                  member={teamData.technicalTeam.rasSecretary}
                  onClick={() => {
                    window.location.href = `/team/${generateSlug(teamData.technicalTeam.rasSecretary.name)}`;
                  }}
                  delay={0}
                />
                {teamData.technicalTeam.rasViceSecretaries.map((vsec, idx) => (
                  <MemberCard
                    key={idx}
                    member={vsec}
                    onClick={() => {
                      window.location.href = `/team/${generateSlug(vsec.name)}`;
                    }}
                    delay={100 + idx * 100}
                  />
                ))}
              </div>
            </div>
          )}

          {/* WIE */}
          {teamData.technicalTeam.wieSecretary && (
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">Women in Engineering</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                <MemberCard
                  member={teamData.technicalTeam.wieSecretary}
                  onClick={() => {
                    window.location.href = `/team/${generateSlug(teamData.technicalTeam.wieSecretary.name)}`;
                  }}
                  delay={0}
                />
                {teamData.technicalTeam.wieViceSecretaries.map((vsec, idx) => (
                  <MemberCard
                    key={idx}
                    member={vsec}
                    onClick={() => {
                      window.location.href = `/team/${generateSlug(vsec.name)}`;
                    }}
                    delay={100 + idx * 100}
                  />
                ))}
              </div>
            </div>
          )}

          {/* COMSOC */}
          {teamData.technicalTeam.comsocSecretary && (
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">Communications Society</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                <MemberCard
                  member={teamData.technicalTeam.comsocSecretary}
                  onClick={() => {
                    window.location.href = `/team/${generateSlug(teamData.technicalTeam.comsocSecretary.name)}`;
                  }}
                  delay={0}
                />
                {teamData.technicalTeam.comsocViceSecretaries.map((vsec, idx) => (
                  <MemberCard
                    key={idx}
                    member={vsec}
                    onClick={() => {
                      window.location.href = `/team/${generateSlug(vsec.name)}`;
                    }}
                    delay={100 + idx * 100}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
