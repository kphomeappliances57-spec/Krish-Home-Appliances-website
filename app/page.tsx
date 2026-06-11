'use client';

import React, { useState } from 'react';
import FAQAndDetails from '@/components/FAQAndDetails';
import SparePartsCatalog from '@/components/SparePartsCatalog';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, MapPin, Clock, Wrench, IndianRupee, Store, 
  Wind, Droplets, Snowflake, Zap, MessageSquare, Search, Receipt, 
  Star, PhoneCall, CheckCircle2, ShieldCheck, ChevronRight, FileCheck, Cable
} from 'lucide-react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function KrishHomeAppliances() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Spare Parts', id: 'parts' },
    { name: 'Services', id: 'services' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Contact', id: 'contact' },
  ];

  const brands = ["Voltas", "Daikin", "Godrej", "Onida", "Whirlpool", "Blue Star", "Hitachi", "Mitsubishi Electric"];
  const tickerItems = [...brands, ...brands, ...brands];

  return (
    <main className="min-h-screen flex flex-col pt-[116px]">
      
      {/* 1. Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium tracking-wide">
        <span className="inline-block animate-pulse mr-2">🚀</span> Nalasopara’s Only Fully-Stocked Home Appliance Spare Parts Store – Launching July 1, 2026!
      </div>

      {/* 2. Header / Navigation */}
      <header className="fixed top-[40px] sm:top-[40px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo area */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold leading-none text-primary">Krish</span>
                <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-accent uppercase">Home Appliances</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex items-center text-sm font-medium text-gray-600 border-l border-gray-300 pl-6">
                <Clock className="w-4 h-4 mr-1.5 text-accent" />
                Walk-In Store Hours: 10:00 AM - 10:00 PM
              </div>
              <a 
                href="tel:9867392552"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
               <a href="tel:9867392552" className="flex items-center justify-center p-2.5 bg-accent text-white rounded-lg active:scale-95 transition-transform" aria-label="Call Now">
                 <PhoneCall className="w-5 h-5" />
               </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-foreground focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
              className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left px-3 py-4 text-base font-medium text-foreground hover:bg-gray-50 rounded-md border-b border-gray-100"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="px-3 py-4 flex items-center text-sm font-medium text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-accent" />
                  Walk-In Store Hours: 10:00 AM - 10:00 PM
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 overflow-hidden flex flex-col items-center xl:flex-row xl:justify-between max-w-7xl mx-auto w-full">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        
        <motion.div 
          className="relative z-10 w-full xl:w-7/12 text-center xl:text-left pt-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* SEO Optimized H1 block */}
          <motion.h1 className="flex flex-col gap-4 mb-6" variants={fadeIn}>
            <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Genuine Spare Parts. <br className="hidden sm:block"/> All In One Place.
            </span>
            <span className="font-sans text-lg sm:text-xl md:text-2xl font-normal text-gray-600 leading-relaxed max-w-2xl mx-auto xl:mx-0 mt-2">
              Stop waiting for orders. Walk into Nalasopara&apos;s premier multi-brand appliance parts shop at Kanti Avenue for <strong className="text-primary font-bold">instant inventory</strong>—backed by expert on-demand doorstep repair technicians.
            </span>
          </motion.h1>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start mt-10">
            <a 
              href="https://wa.me/919867392552?text=I%20want%20to%20check%20parts%20availability"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[56px] px-8 bg-success hover:bg-[#20ba56] text-white font-semibold rounded-xl shadow-lg shadow-success/20 transition-all hover:-translate-y-1 text-lg group"
            >
              <WhatsappIcon className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Check Parts Availability
            </a>
            <a 
              href="tel:9867392552"
              className="inline-flex items-center justify-center min-h-[56px] px-8 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2 text-lg group"
            >
              <PhoneCall className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              Call Store
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative z-10 w-full xl:w-5/12 mt-16 xl:mt-0 px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Abstract Image Replacement - We use a composed stylistic element instead of next/image requiring external hosting */}
          <div className="relative aspect-auto sm:aspect-square min-h-[300px] max-w-md mx-auto w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex items-center justify-center p-5 sm:p-8 xl:ml-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full h-full relative z-10 content-center">
              <div className="bg-primary/[0.03] rounded-2xl border border-primary/10 flex flex-col items-center justify-center p-4 sm:p-6 shadow-inner text-center">
                <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-2 sm:mb-3" />
                <span className="font-semibold text-xs sm:text-sm text-foreground">Spare Parts</span>
              </div>
              <div className="bg-accent/[0.03] rounded-2xl border border-accent/10 flex flex-col items-center justify-center p-4 sm:p-6 shadow-inner text-center">
                <Store className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-2 sm:mb-3" />
                <span className="font-semibold text-xs sm:text-sm text-foreground">Service Centre</span>
              </div>
              <div className="bg-purple-500/[0.02] rounded-2xl border border-purple-500/10 flex flex-col items-center justify-center p-5 sm:p-6 shadow-inner col-span-2 text-center">
                <div className="flex items-center justify-center mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />)}
                </div>
                <span className="font-semibold text-sm sm:text-base text-foreground">Top Rated Local Experts</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Animated Brands Ticker */}
      <section className="py-6 bg-white border-y border-gray-100 overflow-hidden flex flex-col relative z-10">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Trusted Multi-Brand Repair Operations</p>
        </div>
        <div className="flex overflow-hidden relative w-full group">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-ticker whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
            {tickerItems.map((brand, idx) => (
              <div key={idx} className="mx-8 text-xl md:text-2xl font-serif font-medium text-gray-400 hover:text-primary transition-colors cursor-default">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Spare Parts Inventory */}
      <SparePartsCatalog />

      {/* 6. Doorstep Servicing Grid */}
      <section id="services" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Need It Fixed?</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Expert Doorstep Technicians Available.</h2>
            </div>
            <p className="text-gray-600 font-medium">Serving Nalasopara, Vasai & Virar regions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: AC */}
            <div className="flex flex-col p-6 rounded-2xl bg-background border border-gray-100 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Wind className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 whitespace-pre-line">AC repair{"\n"}Nalasopara</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow">Expert cooling fixes, gas refilling, installation, and regular deep servicing for split & window units.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
                <span className="font-semibold text-primary">Visits from ₹299</span>
                <a href="https://wa.me/919867392552?text=I%20need%20AC%20repair%20services" target="_blank" rel="noopener noreferrer" className="p-2 bg-success text-white rounded-full hover:scale-110 transition-transform" aria-label="Book AC Repair">
                   <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Service 2: Washing Machine */}
            <div className="flex flex-col p-6 rounded-2xl bg-background border border-gray-100 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Droplets className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 lg:text-lg xl:text-xl">Washing machine repair Nalasopara East</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow">Complete repairs for top-load, front-load and semi-automatic machines. Drum cleaning & motor checks.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
                <span className="font-semibold text-primary">Visits from ₹299</span>
                <a href="https://wa.me/919867392552?text=I%20need%20washing%20machine%20repair" target="_blank" rel="noopener noreferrer" className="p-2 bg-success text-white rounded-full hover:scale-110 transition-transform" aria-label="Book Washing Machine Repair">
                   <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Service 3: Refrigerator */}
            <div className="flex flex-col p-6 rounded-2xl bg-background border border-gray-100 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Snowflake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Refrigerator repair Palghar</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow">Fixing cooling issues, compressor replacements, and thermostat repairs for all fridge models.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
                <span className="font-semibold text-primary">Visits from ₹299</span>
                <a href="https://wa.me/919867392552?text=I%20need%20refrigerator%20repair" target="_blank" rel="noopener noreferrer" className="p-2 bg-success text-white rounded-full hover:scale-110 transition-transform" aria-label="Book Refrigerator Repair">
                   <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Service 4: Home Appliance general */}
            <div className="flex flex-col p-6 rounded-2xl bg-background border border-gray-100 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 bg-orange-50 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Home appliance repair Vasai</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow">Microwaves, water purifiers, and other core household electronics serviced promptly.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
                <span className="font-semibold text-primary">Visits from ₹299</span>
                <a href="https://wa.me/919867392552?text=I%20need%20microwave%20or%20general%20repair" target="_blank" rel="noopener noreferrer" className="p-2 bg-success text-white rounded-full hover:scale-110 transition-transform" aria-label="Book General Repair">
                   <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section id="why-us" className="py-20 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">The Nalasopara Advantage</h2>
            <p className="text-lg text-gray-600">Stop trusting your expensive appliances to uncertified agents. We provide structural transparency you won&apos;t find on local directories.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
               <Store className="w-10 h-10 text-primary mb-6 relative z-10" />
               <h3 className="text-xl font-bold mb-3 relative z-10">Genuine In-Store Spare Parts</h3>
               <p className="text-gray-600 leading-relaxed relative z-10">No waiting days for ordered parts. We stock components locally in our Palghar district warehouse, ensuring same-day fixes for 90% of issues.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-accent/20 hover:border-accent hover:shadow-xl transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
               <Receipt className="w-10 h-10 text-accent mb-6 relative z-10" />
               <h3 className="text-xl font-bold mb-3 relative z-10">100% Transparent Pricing</h3>
               <p className="text-gray-600 leading-relaxed relative z-10">Starting visit rates displayed upfront. We provide exact quotes before opening your appliance. No hidden diagnostic shocks.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
               <ShieldCheck className="w-10 h-10 text-success mb-6 relative z-10" />
               <h3 className="text-xl font-bold mb-3 relative z-10">Certified Multi-Brand Experts</h3>
               <p className="text-gray-600 leading-relaxed relative z-10">Trained on all major brands from Voltas to Whirlpool. We are a recognized entity with GST Registered status (27HTEPP7991H2ZT) for proper invoicing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. How It Works */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Effortless Issue Resolution</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />
              
              <div className="flex flex-col items-center text-center relative z-10 bg-white pt-4">
                 <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center mb-6 text-xl font-bold text-primary">1</div>
                 <Search className="w-8 h-8 text-primary mb-4" />
                 <h4 className="font-bold text-lg mb-2">Find Your Part</h4>
                 <p className="text-sm text-gray-500">Message us the model number or bring the old part directly to our store.</p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 bg-white pt-4">
                 <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center mb-6 text-xl font-bold text-primary">2</div>
                 <Store className="w-8 h-8 text-primary mb-4" />
                 <h4 className="font-bold text-lg mb-2">Walk-in or Request Delivery</h4>
                 <p className="text-sm text-gray-500">Pick it up instantly at our Kanti Avenue shop or have an expert technician bring it to you.</p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 bg-white pt-4">
                 <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center mb-6 text-xl font-bold text-primary">3</div>
                 <FileCheck className="w-8 h-8 text-accent mb-4" />
                 <h4 className="font-bold text-lg mb-2">GST Invoicing</h4>
                 <p className="text-sm text-gray-500">Walk out with genuine components backed by a 100% proper business bill.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 8.5 FAQs and Details */}
      <FAQAndDetails />

      {/* 9. Reviews Placeholder */}
      <section className="py-20 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center space-x-1 mb-8 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-2 font-semibold text-sm">Awaiting Reviews (Launching July 2026)</span>
            </div>
            <h2 className="font-serif text-3xl font-bold max-w-2xl mx-auto leading-tight text-foreground">Setting the new standard for local home appliance service in Palghar district.</h2>
         </div>
      </section>

      {/* 10. Contact & Interactive Map */}
      <section id="contact" className="py-24 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                 <h2 className="font-serif text-3xl font-bold mb-8">Visit The Store</h2>
                 
                 <div className="space-y-6">
                   <div className="flex items-start">
                     <MapPin className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
                     <div>
                       <h4 className="font-bold text-lg text-foreground">Krish Home Appliances</h4>
                       <p className="text-gray-600 mt-1 leading-relaxed">Shop No 1, D Wing, Kanti Avenue,<br/>Next to Capital Mall,<br/>Nalasopara East, Maharashtra 401208</p>
                     </div>
                   </div>
                   
                   <div className="flex items-start">
                     <Clock className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
                     <div>
                       <h4 className="font-bold text-lg text-foreground">Store Hours</h4>
                       <p className="text-gray-600 mt-1">Monday - Sunday<br/>10:00 AM - 10:00 PM</p>
                     </div>
                   </div>

                   <div className="flex items-start">
                     <PhoneCall className="w-6 h-6 text-accent mt-1 mr-4 shrink-0" />
                     <div>
                       <h4 className="font-bold text-lg text-foreground">Contact</h4>
                       <a href="tel:9867392552" className="text-primary hover:underline hover:text-accent font-semibold text-lg block mt-1">+91 9867392552</a>
                       <a href="mailto:Kphomeappliances57@gmail.com" className="text-gray-600 hover:text-primary">Kphomeappliances57@gmail.com</a>
                     </div>
                   </div>
                 </div>

                 <div className="mt-10 pt-8 border-t border-gray-100">
                   <a 
                     href="https://wa.me/919867392552"
                     target="_blank" rel="noopener noreferrer"
                     className="w-full flex items-center justify-center px-6 py-4 bg-success hover:bg-[#20ba56] text-white font-bold rounded-xl shadow-lg transition-all"
                   >
                     <WhatsappIcon className="w-6 h-6 mr-3" />
                     Message us on WhatsApp
                   </a>
                 </div>
              </div>

              <div className="h-[400px] lg:h-auto w-full bg-gray-100 relative">
                 <iframe 
                   title="Krish Home Appliances Location Map"
                   src="https://maps.google.com/maps?q=19.405945,72.822227&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   style={{border:0}} 
                   allowFullScreen 
                   aria-hidden="false" 
                   tabIndex={0}
                   loading="lazy"
                   referrerPolicy="no-referrer-when-downgrade"
                   className="absolute inset-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                 ></iframe>
              </div>
           </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-[#1a1814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             
             <div className="lg:col-span-1">
               <div className="font-serif text-2xl font-bold text-white mb-4">Krish Home Appliances</div>
               <p className="text-gray-400 text-sm leading-relaxed mb-6">Multi-brand home appliance repair service and genuine spare parts shop situated in Nalasopara East.</p>
               <div className="text-xs text-gray-500 bg-white/5 py-2 px-3 rounded-md border border-white/10 inline-block font-mono">
                 GSTIN: 27HTEPP7991H2ZT
               </div>
             </div>

             <div>
               <h4 className="font-bold text-lg mb-6">Quick Links</h4>
               <ul className="space-y-3">
                 {navLinks.map(link => (
                   <li key={link.id}>
                     <button onClick={() => scrollTo(link.id)} className="text-gray-400 hover:text-accent transition-colors text-sm">{link.name}</button>
                   </li>
                 ))}
               </ul>
             </div>

             <div>
               <h4 className="font-bold text-lg mb-6">Our Services</h4>
               <ul className="space-y-3 text-sm text-gray-400">
                 <li>AC Service & Repair</li>
                 <li>Washing Machine Repair</li>
                 <li>Refrigerator Fixes</li>
                 <li>Microwave Servicing</li>
                 <li className="text-accent font-medium mt-2">Genuine Spare Parts Sales</li>
               </ul>
             </div>

             <div>
               <h4 className="font-bold text-lg mb-6">Service Areas</h4>
               <div className="flex flex-wrap gap-2">
                 {["Nalasopara", "Vasai", "Virar", "Mira Road", "Bhayandar", "Dahisar", "Andheri", "Palghar"].map(area => (
                   <span key={area} className="text-xs px-2.5 py-1 rounded bg-white/10 text-gray-300">{area}</span>
                 ))}
               </div>
             </div>
           </div>

           <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
             <p>&copy; {new Date().getFullYear()} Krish Home Appliances. All rights reserved.</p>
             <p className="mt-2 md:mt-0">Designed for Nalasopara East, Maharashtra.</p>
           </div>
        </div>
      </footer>

    </main>
  );
}
