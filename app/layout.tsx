import type { Metadata } from 'next';
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import MobileActionBar from '@/components/MobileActionBar';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'Krish Home Appliances | Genuine Spare Parts Shop & Multi-Brand Service | Nalasopara East',
  description: 'Nalasopara\'s ultimate hub for genuine home appliance spare parts. In-stock compressors, capacitors, fan motors, gas cylinders, and wiring for all major brands. Walk-in today or book doorstep service.',
  keywords: [
    'AC spare parts Nalasopara', 
    'AC capacitor near me Nalasopara', 
    'R22 gas refill Nalasopara', 
    'Washing machine repair Nalasopara East', 
    'Home appliance repair Vasai',
    'Polycab wire shop Nalasopara',
    'Heavy appliance copper wire Nalasopara East',
    'Finolex wire distributors Palghar',
    'refrigerator repair Palghar',
    'AC repair Nalasopara',
    'genuine spare parts Nalasopara East',
    'home appliance service Virar',
    'compressor dealer Nalasopara',
    'Krish Home Appliances'
  ],
  openGraph: {
    title: 'Krish Home Appliances | Genuine Spare Parts Shop & Multi-Brand Service',
    description: 'Nalasopara\'s ultimate hub for genuine home appliance spare parts. In-stock compressors, capacitors, fan motors, gas cylinders, and wiring for all major brands.',
    url: 'https://krishhomeappliances.com',
    siteName: 'Krish Home Appliances',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krish Home Appliances | Genuine Spare Parts & Multi-Brand Repair',
    description: 'Walk-in spare parts store & expert doorstep repair in Nalasopara East. AC, Fridge, Washing Machine — all major brands serviced.',
  },
  alternates: {
    canonical: 'https://krishhomeappliances.com',
  },
  metadataBase: new URL('https://krishhomeappliances.com'),
  // TODO: Uncomment after registering on Google Search Console
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  // },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Nalasopara East',
    'geo.position': '19.405945;72.822227',
    'ICBM': '19.405945, 72.822227',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Krish Home Appliances",
  "description": "Nalasopara's ultimate hub for genuine home appliance spare parts and multi-brand service centre.",
  "url": "https://krishhomeappliances.com",
  "image": "https://krishhomeappliances.com/opengraph-image",
  "telephone": "+919867392552",
  "email": "Kphomeappliances57@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop No 1, D Wing, Kanti Avenue, Next to Capital Mall",
    "addressLocality": "Nalasopara East",
    "addressRegion": "Maharashtra",
    "postalCode": "401208",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.405945,
    "longitude": 72.822227    
  },
  "hasMap": "https://maps.google.com/?q=19.405945,72.822227",
  "openingHours": "Mo-Su 10:00-22:00",
  "priceRange": "₹₹",
  "paymentAccepted": ["Cash", "UPI", "Bank Transfer"],
  "currenciesAccepted": "INR",
  "areaServed": [
    { "@type": "City", "name": "Nalasopara" },
    { "@type": "City", "name": "Vasai" },
    { "@type": "City", "name": "Virar" },
    { "@type": "City", "name": "Mira Road" },
    { "@type": "City", "name": "Bhayandar" },
    { "@type": "City", "name": "Dahisar" },
    { "@type": "City", "name": "Andheri" }
  ],
  "sameAs": [
    // TODO: Add Google Business Profile URL
    // TODO: Add any social media profile URLs
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "AC Repair & Servicing Nalasopara",
        "description": "Expert AC repair, gas refilling (R22/R32/R410A), installation, and deep servicing for split & window units of all brands."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Washing Machine Repair Nalasopara East",
        "description": "Complete repairs for top-load, front-load and semi-automatic washing machines including drum cleaning and motor checks."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Refrigerator Repair Palghar",
        "description": "Cooling issues, compressor replacements, and thermostat repairs for all fridge models."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Genuine Home Appliance Spare Parts",
        "description": "In-stock compressors, capacitors, copper piping, refrigerant gases, fan motors, PCB boards, and heavy-duty wiring from Polycab, Finolex, Havells."
      }
    }
  ]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-foreground bg-background" suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none">
          Skip to main content
        </a>
        <div id="main-content">
          {children}
        </div>
        <MobileActionBar />
      </body>
    </html>

  );
}
