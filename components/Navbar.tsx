'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storeContext';
import Link from 'next/link';
import { 
  ShoppingBag, User, PhoneCall, Clock, Menu, X, 
  Store, ShieldCheck, LayoutDashboard, Search 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CustomerAuthModal from './CustomerAuthModal';
import QuoteCartDrawer from './QuoteCartDrawer';

export default function Navbar() {
  const { getCartCount, user } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = getCartCount();

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Spare Parts Catalog', id: 'parts' },
    { name: 'Doorstep Services', id: 'services' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Contact Store', id: 'contact' },
  ];

  return (
    <>
      {/* 1. Announcement Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block animate-pulse">🎉</span> 
        <span>Now Open! Nalasopara&apos;s Genuine Home Appliance Spare Parts Store – Store Pickup Ready!</span>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="fixed top-[40px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-gray-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold leading-none text-primary">Krish</span>
                <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-accent uppercase">Home Appliances</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Right Header Controls */}
            <div className="flex items-center gap-3">
              {/* Hours / Pickup Tag (Desktop) */}
              <div className="hidden xl:flex items-center text-xs font-semibold text-gray-600 border-r border-gray-200 pr-4 gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>10 AM - 10 PM (Mon-Sun)</span>
              </div>

              {/* Quote Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs sm:text-sm rounded-xl transition-all border border-primary/20"
                aria-label="View quote cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Quote Cart</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-accent text-white rounded-full text-[11px] font-extrabold flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth / Account Button */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl transition-all border border-gray-200"
                aria-label="User account"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {user ? user.displayName.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Admin Panel Button (if staff or admin) */}
              {(user?.role === 'admin' || user?.role === 'staff') && (
                <Link
                  href="/admin"
                  className="px-3 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs transition-all"
                  title="Control Panel"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Panel</span>
                </Link>
              )}

              {/* Call Direct */}
              <a
                href="tel:9867392552"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all"
              >
                <PhoneCall className="w-4 h-4 mr-1.5" />
                Call Store
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-foreground focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-foreground hover:bg-gray-50 rounded-lg border-b border-gray-100"
                  >
                    {link.name}
                  </button>
                ))}

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl text-center flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> View Quote Cart ({cartCount})
                  </button>

                  <a
                    href="tel:9867392552"
                    className="w-full py-3 bg-accent text-white font-bold rounded-xl text-center flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" /> Call Store (+91 9867392552)
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals & Drawers */}
      <CustomerAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onNavigateAdmin={() => (window.location.href = '/admin')}
      />

      <QuoteCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
