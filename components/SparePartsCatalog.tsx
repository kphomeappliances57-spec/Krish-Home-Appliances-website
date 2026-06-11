'use client';

import React from 'react';
import { Zap, Database, AlignJustify, Snowflake, Fan, Settings, Cpu, Cable } from 'lucide-react';

const catalogItems = [
  {
    title: "AC Capacitors",
    description: "Dual run and single capacitors (25Mfd to 60Mfd) for all major outdoor units.",
    icon: Zap
  },
  {
    title: "Compressors",
    description: "Highly reliable rotary and reciprocating compressors for split and window AC systems.",
    icon: Database
  },
  {
    title: "Copper Piping",
    description: "Multi-gauge, seamless soft copper coils and pipes for clean installation routing.",
    icon: AlignJustify
  },
  {
    title: "Refrigerant Gases",
    description: "Full inventory of virgin cylinders including R22, R32, R410A, and R404A.",
    icon: Snowflake
  },
  {
    title: "Fan & Blower Motors",
    description: "Durable replacement motors for indoor blowers and outdoor condenser fans.",
    icon: Fan
  },
  {
    title: "Washing Machine Motors",
    description: "Heavy-duty spin and wash motors compatible with top-load and front-load configurations.",
    icon: Settings
  },
  {
    title: "Electronic PCB Boards",
    description: "Universal and brand-specific control boards, relays, and display circuits.",
    icon: Cpu
  },
  {
    title: "Heavy-Duty Wiring",
    description: "Premium multi-strand FR/FRLS copper wires from Polycab, Finolex, and Havells.",
    icon: Cable
  }
];

export default function SparePartsCatalog() {
  return (
    <section id="parts" className="py-20 lg:py-24 bg-white scroll-mt-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center w-full mb-16">
          <span className="text-gray-500 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block text-center">
            Physical Walk-In Store Inventory
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1814] mb-6 tracking-tight">
            Genuine Spare Parts. Right On The Shelf.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed">
            We act as a local warehouse for immediate pickup, avoiding shipping delays. Direct sales for technicians, and immediate replacements for repair customers.
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full border border-gray-100"
              >
                <div className="flex justify-between items-start mb-6 w-full">
                  <div className="w-12 h-12 bg-[#f7f6f2] rounded-xl flex items-center justify-center border border-gray-100 transition-colors duration-300 group-hover:bg-[#1a5fb4]/5 group-hover:border-[#1a5fb4]/20">
                    <Icon className="w-6 h-6 text-[#1a1814] group-hover:text-[#1a5fb4] transition-colors duration-300" />
                  </div>
                  <span className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 py-1 px-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] mr-1.5 animate-pulse"></span>
                    In Stock
                  </span>
                </div>
                
                <div className="flex-grow flex flex-col w-full">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a1814] mb-2 leading-snug group-hover:text-[#1a5fb4] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-sans mb-6 line-clamp-2 sm:line-clamp-none min-h-[2.5rem]">
                    {item.description}
                  </p>
                </div>
                
                <a 
                  href={`https://wa.me/919867392552?text=${encodeURIComponent(`Hi Krish Home Appliances, I want to check the price and availability of ${item.title}.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-3 bg-[#f7f6f2] text-[#1a1814] font-semibold rounded-xl transition-all duration-300 hover:bg-[#25D366] hover:text-white border border-gray-200 hover:border-[#25D366] text-sm mt-auto"
                >
                  Check Stock via WhatsApp
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
