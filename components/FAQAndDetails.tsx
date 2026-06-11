'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "Can I walk in and buy parts directly?",
    answer: "Absolutely. We are first and foremost a fully-stocked retail and wholesale spare parts shop. You can walk into our Kanti Avenue store in Nalasopara East anytime between 10:00 AM and 10:00 PM to purchase genuine compressors, capacitors, copper pipes, gases, and more right over the counter."
  },
  {
    question: "Are you an authorized brand service centre or a multi-brand specialist?",
    answer: "We are a GST-registered, certified multi-brand repair specialist. While you might see many listed as a \"Voltas service center Nalasopara\" or \"Daikin AC service Nalasopara\", we offer transparent, specialized repairs for all major brands under one roof, including Godrej, Whirlpool, Hitachi, and Daikin. You get expert service without the premium authorized-center markup."
  },
  {
    question: "Do you have AC spare parts like compressors, capacitors, and cooling gases available in-store today?",
    answer: "Yes, absolutely! If you are searching for an \"AC capacitor near me Nalasopara\" or need an \"R22 gas refill Nalasopara\", our physical walk-in store at Kanti Avenue, Nalasopara East is fully stocked. We supply both retail customers and local technicians with compressors, fan motors, capacitors, and R22/R32 cooling gases right over the counter. We also stock premium Polycab, Finolex, and Havells multi-strand electrical wires alongside our multi-gauge copper piping for complete heavy appliance installations."
  },
  {
    question: "Which areas do your doorstep repair technicians cover?",
    answer: "Our expert technicians provide rapid doorstep service far beyond just Nalasopara. We cover a broad geographical area including Nalasopara, Vasai, Virar, Mira Road, Bhayandar, Dahisar, and Andheri."
  },
  {
    question: "What are your charges for an AC gas refill or washing machine visit?",
    answer: "We believe in 100% pricing transparency. Initial home diagnostic visits start from just ₹299. Once the issue is identified—whether it is a simple \"Washing machine repair Nalasopara East\", an AC gas recharge, or a complex part replacement—we provide a final, upfront quote before starting any work."
  }
];

export default function FAQAndDetails() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 bg-background relative" id="faq">
      {/* Injecting JSON-LD schema for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <MessageCircleQuestion className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Service Details & FAQs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Clear answers to your most common questions about our doorstep repair services, local spare parts availability, and pricing coverage.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'border-accent shadow-md' : 'border-gray-200 hover:border-primary/40'}`}
              >
                <h3>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left min-h-[64px] py-4 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-expanded={isActive}
                  >
                    <span className="font-bold text-lg text-foreground pr-8 flex-1">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-accent/10 text-accent' : 'bg-gray-50 text-gray-400'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                  </button>
                </h3>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 font-sans text-gray-600 leading-relaxed boundary-padding">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
