'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storeContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, ArrowLeft, Store } from 'lucide-react';

export default function AdminLoginPage() {
  const { setDemoUser } = useStore();
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'staff'>('admin');

  const handleDemoLogin = (selectedRole: 'admin' | 'staff') => {
    setDemoUser(selectedRole);
    router.push('/admin');
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
            Krish Home Appliances — Staff &amp; Admin Store Operations
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <Store className="w-4 h-4 text-amber-600" /> Authorized Roles Access
          </div>
          <p>Select your operational role to access the management portal:</p>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-md transition-all text-center"
            >
              👑 Login as Admin
            </button>

            <button
              onClick={() => handleDemoLogin('staff')}
              className="py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs shadow-md transition-all text-center"
            >
              🛡️ Login as Staff
            </button>
          </div>
        </div>

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
