'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/storeContext';
import { X, CheckCircle2, Store, ShoppingBag, ShieldCheck, Tag, Wrench, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCart?: () => void;
}

export default function ProductDetailModal({ product, onClose, onOpenCart }: ProductDetailModalProps) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      if (onOpenCart) onOpenCart();
      onClose();
    }, 600);
  };

  const handleInstantWhatsApp = () => {
    const text = `Hi Krish Home Appliances, I want to check stock & get quotation for:\n\n*${product.name}*\nBrand: ${product.brand}\nSpecification: ${product.variant}\nQuantity: ${quantity} ${product.unit || 'Piece'}\n\nFulfillment: Store Pickup (Nalasopara East)`;
    window.open(`https://wa.me/919867392552?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto sm:my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-background shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              {product.inStock && (
                <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 bg-success/10 text-success border border-success/20 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  In Stock
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-foreground hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-8 space-y-6 overflow-y-auto flex-1">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Visual */}
              <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[11px] font-bold text-gray-700 px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-accent" />
                  Store Pickup Only
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-accent tracking-wider uppercase mb-1">
                    {product.brand !== 'Multiple / Not specified' ? product.brand : 'Genuine Multi-Brand Part'}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="bg-background rounded-2xl p-4 border border-gray-200/80 space-y-2.5 text-xs text-gray-700 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Part Type:</span>
                    <span className="font-bold text-foreground">{product.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Specification / Variant:</span>
                    <span className="font-bold text-foreground text-right">{product.variant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Unit:</span>
                    <span className="font-bold text-foreground">{product.unit || 'Piece'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Availability:</span>
                    <span className="font-bold text-success">Immediate Pickup at Store</span>
                  </div>
                </div>

                {/* Quantity picker */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-l-xl font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-r-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Application & Compatibility section */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 space-y-1 text-xs">
              <div className="font-bold text-primary flex items-center gap-1.5 text-sm">
                <Info className="w-4 h-4" /> Recommended Application &amp; Models
              </div>
              <p className="text-gray-700 leading-relaxed">
                {product.application}
              </p>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-background flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleAddToCart}
              className="flex-1 min-h-[50px] bg-white border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? 'Added to Cart ✓' : 'Add to Quote Cart'}
            </button>

            <button
              onClick={handleInstantWhatsApp}
              className="flex-1 min-h-[50px] bg-success hover:bg-[#20ba56] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-md"
            >
              <WhatsappIcon className="w-5 h-5" />
              Instant Quote via WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
