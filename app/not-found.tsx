import Link from 'next/link';
import { Home, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* 404 Number */}
        <h1 className="font-serif text-[120px] sm:text-[160px] font-bold text-primary/10 leading-none select-none">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 sm:-mt-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist. But our genuine spare parts do! Head back to explore our inventory.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <a
            href="tel:9867392552"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-white border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold rounded-xl shadow-sm transition-all"
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            Call Store
          </a>
        </div>

        {/* Business info */}
        <p className="mt-12 text-sm text-gray-400">
          Krish Home Appliances — Kanti Avenue, Nalasopara East
        </p>
      </div>
    </div>
  );
}
