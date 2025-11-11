"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { signIn } from "next-auth/react";

function SplineScene({ scene, className }) {
  return (
    <iframe
      src={scene}
      className={`w-full h-full border-0 ${className || ''}`}
      allow="autoplay; fullscreen"
      loading="lazy"
      title="Spline 3D Scene"
    />
  );
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    userId: '',
    captcha: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${mode} form submitted:`, formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-xl px-4 py-10">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#120026]/90 via-[#0f0620]/92 to-[#0b0b25]/95 shadow-[0_30px_120px_rgba(59,130,246,0.35)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-32 h-72 w-72 rounded-full bg-purple-500/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-40 rounded-full bg-white/10 p-2 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid h-full w-full lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-center px-6 py-10 md:px-10 lg:px-12">
            <div className="absolute inset-y-10 right-0 w-[1px] bg-gradient-to-b from-white/5 via-purple-400/20 to-white/5" />
            <div className="relative z-10 mx-auto w-full max-w-md space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-200/80">
                  {mode === 'login' ? 'SIGN IN' : 'JOIN IEEE'}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {mode === 'login' ? 'Welcome back to the cosmos' : 'Embark on your IEEE journey'}
                </h2>
                <p className="text-sm text-purple-100/80 md:text-base">
                  {mode === 'login' 
                    ? 'Access exclusive events, hackathons, and the community shaping the future of technology.' 
                    : 'Create your IEEE account and unlock member-only opportunities, mentorship, and innovation labs.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-purple-100/90">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-purple-100/90">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-purple-100/90">
                        Mobile
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        placeholder="Enter mobile number"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-purple-100/90">
                        Captcha
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          name="captcha"
                          value={formData.captcha}
                          onChange={handleChange}
                          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                          placeholder="Type code"
                          required
                        />
                        <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/80">
                          ABC123
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-purple-100/90">
                      IEEE ID / Email
                    </label>
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      placeholder="Enter your registered email or user ID"
                      required
                    />
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className={mode === 'signup' ? "" : "md:col-span-2"}>
                    <label className="mb-2 block text-sm font-medium text-purple-100/90">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      placeholder="Create a secure password"
                      required
                    />
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-purple-100/90">
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/60 transition ring-offset-0 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        placeholder="Repeat password"
                        required
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="relative mt-4 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_20px_60px_rgba(147,51,234,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                >
                  <span className="absolute inset-0 animate-[pulse_5s_ease-in-out_infinite] bg-white/20" />
                  <span className="relative">{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                </button>

                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_15px_50px_rgba(59,130,246,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <svg className="relative h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="relative">Sign in with Google</span>
                  </button>
                )}
              </form>

              <div className="text-center text-sm text-purple-100/80">
                {mode === 'login' ? "New to IEEE? " : "Already a member? "}
                <button
                  onClick={onSwitchMode}
                  className="relative font-semibold text-purple-200 transition-colors duration-300 hover:text-white"
                >
                  <span className="relative z-10">{mode === 'login' ? 'Create an account' : 'Sign in to your account'}</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-l-3xl border-l border-white/10 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-black/70 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.45),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_35%)]" />
            <SplineScene 
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9p/scene.splinecode"
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
            <div className="pointer-events-none absolute bottom-6 left-1/2 w-[80%] -translate-x-1/2 rounded-3xl border border-white/10 bg-black/40 px-6 py-5 text-center text-sm text-purple-100/85 backdrop-blur-lg">
              <p className="text-xs uppercase tracking-[0.35em] text-purple-300/80">IEEE Student Branch</p>
              <p className="mt-2 text-base font-semibold text-white">Innovate • Collaborate • Lead</p>
              <p className="mt-1 text-xs text-purple-100/70">Join global engineers building future-ready solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;


