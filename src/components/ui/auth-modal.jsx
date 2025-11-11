"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';

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

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-[90vh] bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 rounded-2xl overflow-hidden border border-purple-400/20 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex h-full">
          <div className="w-1/2 flex flex-col justify-center p-8 lg:p-12">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold text-white mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-purple-200 mb-8">
                {mode === 'login' 
                  ? 'Sign in to your account to continue' 
                  : 'Join us to get started'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                  </>
                )}

                {mode === 'login' && (
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      User ID
                    </label>
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your user ID"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Captcha
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="captcha"
                          value={formData.captcha}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                          placeholder="Enter captcha"
                          required
                        />
                        <div className="px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white font-semibold backdrop-blur-sm">
                          ABC123
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 mt-6"
                >
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>

                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2 mt-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-purple-200 text-sm">
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={onSwitchMode}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gradient-to-br from-purple-900 to-purple-950">
            <SplineScene 
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9p/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;


