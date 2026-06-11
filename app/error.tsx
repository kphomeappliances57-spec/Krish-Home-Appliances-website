'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="relative z-10 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-accent" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Something Went Wrong
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          We ran into an unexpected issue. Please try again, or contact us directly for assistance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white border-2 border-gray-200 text-foreground hover:border-primary hover:text-primary font-semibold rounded-xl shadow-sm transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
