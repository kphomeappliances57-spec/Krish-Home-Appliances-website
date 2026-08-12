'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storeContext';
import { isFirebaseConfigured, auth, googleProvider } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { X, Lock, Mail, User, Phone, ShieldCheck, Check, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateAdmin?: () => void;
}

export default function CustomerAuthModal({ isOpen, onClose, onNavigateAdmin }: CustomerAuthModalProps) {
  const { user, logout, setDemoUser, isFirebaseActive } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isFirebaseActive) {
      try {
        if (mode === 'login') {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
        onClose();
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    } else {
      // Demo / Local Auth
      setTimeout(() => {
        setDemoUser(email.includes('admin') ? 'admin' : email.includes('staff') ? 'staff' : 'customer');
        setLoading(false);
        onClose();
      }, 500);
    }
  };

  const handleGoogleAuth = async () => {
    if (isFirebaseActive) {
      try {
        await signInWithPopup(auth, googleProvider);
        onClose();
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Google sign in failed');
      }
    } else {
      setDemoUser('customer');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-foreground hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {user ? (
            /* Logged in view */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold font-serif">
                {user.displayName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground">{user.displayName}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs rounded-full uppercase tracking-wider">
                  Role: {user.role}
                </div>
              </div>

              {(user.role === 'admin' || user.role === 'staff') && (
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateAdmin) onNavigateAdmin();
                  }}
                  className="w-full min-h-[48px] bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Open Control Panel ({user.role.toUpperCase()})
                </button>
              )}

              <button
                onClick={async () => {
                  await logout();
                  onClose();
                }}
                className="w-full min-h-[48px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            /* Login / Register Form */
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-xs text-gray-500">
                  {mode === 'login'
                    ? 'Sign in to track your quotation requests & orders'
                    : 'Register for faster quotation requests'}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="you@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Demo Mode Quick Role Switcher for Testing */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="text-[11px] text-center text-gray-400 font-bold uppercase tracking-wider">
                  ⚡ Quick Test Demo Access
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDemoUser('admin');
                      onClose();
                    }}
                    className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    👑 Test Admin
                  </button>
                  <button
                    onClick={() => {
                      setDemoUser('staff');
                      onClose();
                    }}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    🛡️ Test Staff
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="font-bold text-primary hover:underline"
                >
                  {mode === 'login' ? 'Register now' : 'Sign in'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
