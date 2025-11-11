"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Users, ArrowRight, Linkedin, Instagram, Github } from 'lucide-react';

// Add CSS for float animation
if (typeof document !== 'undefined') {
  const styleId = 'contact-page-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.15;
        }
        50% {
          transform: translateY(-20px) translateX(10px);
          opacity: 0.6;
        }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }
}

const ContactInfoCard = ({ icon: Icon, title, value, href, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
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

  const content = (
    <div
      ref={cardRef}
      className="group relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/15 rounded-lg blur-lg group-hover:blur-xl group-hover:bg-purple-400/25 transition-all duration-500" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center group-hover:border-purple-400/50 group-hover:scale-110 transition-all duration-500">
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-purple-300 group-hover:text-purple-200 transition-colors" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-semibold text-white/60 mb-1 group-hover:text-white/80 transition-colors">
            {title}
          </h3>
          {href ? (
            <a
              href={href}
              className="text-white/90 text-base md:text-lg font-medium group-hover:text-purple-300 transition-colors block"
            >
              {value}
            </a>
          ) : (
            <p className="text-white/90 text-base md:text-lg font-medium group-hover:text-purple-300 transition-colors">
              {value}
            </p>
          )}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
};

const ContactPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Message sent successfully! We will get back to you within 24-48 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen py-24 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MessageCircle className="w-5 h-5 text-purple-300" />
            <span className="text-purple-300 text-sm font-semibold">Contact Us</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions or want to collaborate? We'd love to hear from you. Reach out to IEEE RGIPT Student Branch.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto space-y-6">
            <ContactInfoCard
              icon={Phone}
              title="Phone"
              value="+91 7870304944"
              href="tel:+917870304944"
              delay={0}
            />
            <ContactInfoCard
              icon={Mail}
              title="Email"
              value="ieee_sb@rgipt.ac.in"
              href="mailto:ieee_sb@rgipt.ac.in"
              delay={100}
            />
            <ContactInfoCard
              icon={MapPin}
              title="Location"
              value="RGIPT, Jais, Amethi, UP, India"
              delay={200}
            />
            <ContactInfoCard
              icon={MessageCircle}
              title="WhatsApp"
              value="+91 7870304944"
              href="https://wa.me/917870304944"
              delay={300}
            />
          </div>
        </div>

        {/* Send us a Message */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-black/60 transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-black/60 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-white/80 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-black/60 transition-all"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-black/60 transition-all resize-none"
                  placeholder="Enter your message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 active:scale-95 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-20 md:mb-28 relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/15 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500" />
                    <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-300" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Office Hours</h3>
                </div>
                <p className="text-white/80 text-base md:text-lg">
                  Mon - Fri, 9:00 AM - 5:00 PM
                </p>
              </div>

              <div className="group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/15 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500" />
                    <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-300" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Response Time</h3>
                </div>
                <p className="text-white/80 text-base md:text-lg">
                  Within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Join Us */}
        <div className="relative overflow-hidden">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Ready to Join Us?
              </span>
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Become a member of IEEE RGIPT and be part of a global community of{' '}
              <span className="font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                technology enthusiasts
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/team"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 active:scale-95 hover:border-purple-400/50"
              >
                <Users className="w-5 h-5" />
                <span>Become a Member</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 active:scale-95 hover:border-blue-400/50"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

