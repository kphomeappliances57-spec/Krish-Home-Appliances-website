'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storeContext';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const { setDemoUser } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isFirebaseConfigured()) {
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        router.push('/admin');
      } catch (err: any) {
        console.error(err);
        setError('Invalid credentials or unauthorized account');
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback if env vars not provided
      setTimeout(() => {
        setDemoUser(email.includes('admin') ? 'admin' : 'staff');
        router.push('/admin');
      }, 400);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Control Panel Login</h1>
          <p className="text-xs text-gray-500">
            Krish Home Appliances — Authorized Staff &amp; Admin Portal
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Admin / Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="admin@gmail.com"
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
            {loading ? 'Authenticating...' : 'Sign In to Control Panel'}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-primary gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Customer Website
          </Link>
        </div>
      </div>
    </main>
  );
}
