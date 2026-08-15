# Krish Home Appliances — Web Application & Spare Parts Portal

A modern, full-stack Next.js web application and spare parts quotation portal for **Krish Home Appliances**, premier multi-brand appliance spare parts hub and certified service shop located in Nalasopara East, Maharashtra.

---

## 🌟 Overview & Key Features

Krish Home Appliances combines a physical walk-in spare parts store with on-demand doorstep repair servicing. This web application transforms the business from a static site into a dynamic e-commerce quote builder and operational control panel.

### 1. 🛍️ Interactive Product Catalog & Search
- **Instant Live Search**: Search spare parts by name, model number, MFD rating, timer duration, valve type, or brand (LG, Haier, Samsung, Totaline, Polycab, etc.).
- **Category & Brand Filtering**: Filter across *Refrigeration*, *Washing Machine*, *Refrigerator*, *Electrical*, *Tools*, and *Consumables*.
- **Stock & Store Pickup Badging**: Real-time stock status with clear **"Store Pickup Only (Kanti Avenue, Nalasopara East)"** fulfillment messaging.

### 2. 💬 Request for Quotation (Cart & Instant WhatsApp)
- **Instant Single-Item Quote**: 1-click WhatsApp quote modal with pre-formatted product specifications.
- **Quotation Cart Drawer**: Slide-over cart allowing customers to select multiple spare parts, adjust quantities, and include custom model notes.
- **WhatsApp Link Generator**: Formats a WhatsApp message to the store owner (`+91 9867392552`) with request reference `#REQ-XXXXXX`, line item details, and pickup store address.

### 3. 🛡️ Operational Control Panel (`/admin`)
- **Role-Based Access Control (RBAC)**:
  - **Store Owner (Admin)**: Full CRUD on Products & Categories, update stock status, batch seed database from Excel, manage quotation requests, assign user roles.
  - **Shop Manager (Staff)**: View live customer quote requests, update request statuses (*Pending → Contacted → Fulfilled/Picked Up*), click 1-button WhatsApp customer response.
- **Real-Time Data Sync**: Powered by Firebase Firestore live snapshot listeners.

### 4. 🔍 High-Ranking Local SEO Architecture
- Programmatically injected `LocalBusiness` and `Service` JSON-LD Structured Data Schemas.
- Automated `sitemap.xml`, `robots.txt`, OpenGraph images, Twitter Cards, and PWA `manifest.webmanifest`.
- Targeted keywords: *"AC spare parts Nalasopara"*, *"AC capacitor near me Nalasopara"*, *"R22 gas refill Nalasopara"*, *"Polycab wire shop Nalasopara East"*.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database & Auth**: [Firebase (Firestore & Firebase Auth)](https://firebase.google.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion / Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Netlify](https://www.netlify.com/)

---

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/kphomeappliances57-spec/Krish-Home-Appliances-website.git
cd Krish-Home-Appliances-website
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

### 3. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

```bash
npm run build
npm run start
```

---

## 📍 Business Information

- **Store Address**: Shop No 1, D Wing, Kanti Avenue, Next to Capital Mall, Nalasopara East, Maharashtra 401208
- **Operational Hours**: Monday – Sunday (10:00 AM – 10:00 PM)
- **Primary Phone / WhatsApp**: +91 9867392552
- **Email**: Kphomeappliances57@gmail.com
- **Service Coverage**: Nalasopara, Vasai, Virar, Mira Road, Bhayandar, Dahisar, Andheri
