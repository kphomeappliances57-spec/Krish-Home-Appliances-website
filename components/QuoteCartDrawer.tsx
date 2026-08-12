'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storeContext';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, Send, 
  Store, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteCartDrawer({ isOpen, onClose }: QuoteCartDrawerProps) {
  const { cart, removeFromCart, updateCartQuantity, clearCart, submitQuoteRequest, user } = useStore();
  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and WhatsApp phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitQuoteRequest({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        notes: notes.trim(),
      });

      setSubmittedRef(res.requestId);
      // Open WhatsApp in new tab
      window.open(res.whatsappUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert('Failed to submit quote request. Please try calling us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground">Quotation Cart</h3>
                  <p className="text-xs text-gray-500">{cart.length} item(s) selected</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Store Pickup Notice Banner */}
            <div className="bg-amber-50 border-b border-amber-100 px-5 py-2.5 flex items-center gap-2.5 text-xs text-amber-800 font-medium">
              <Store className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong className="font-bold">Store Pickup Only</strong> (Kanti Avenue, Nalasopara East). Delivery coming soon! 🚚
              </span>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {submittedRef ? (
                /* Success View */
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-foreground mb-2">Quote Request Sent!</h4>
                  <p className="text-sm text-gray-600 mb-4 max-w-xs">
                    Your quote reference <strong className="text-primary font-bold">#{submittedRef}</strong> has been generated and WhatsApp is opening.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left w-full text-xs text-gray-600 mb-6 space-y-1">
                    <div className="font-bold text-foreground mb-1">Pickup Location:</div>
                    <p>Krish Home Appliances, Shop No 1, D Wing, Kanti Avenue, Next to Capital Mall, Nalasopara East.</p>
                    <p className="text-primary font-semibold">Store Hours: 10:00 AM – 10:00 PM (Mon-Sun)</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Done & Close
                  </button>
                </div>
              ) : cart.length === 0 ? (
                /* Empty View */
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Your quote cart is empty</h4>
                  <p className="text-sm text-gray-500 max-w-xs mb-6">
                    Browse our genuine spare parts catalog and click &quot;Add to Quote Cart&quot; or &quot;Request Quote&quot;.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Browse Spare Parts
                  </button>
                </div>
              ) : (
                /* Items List + Customer Form */
                <>
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      <span>Requested Parts ({cart.length})</span>
                      <button
                        onClick={clearCart}
                        className="text-red-500 hover:underline text-[11px]"
                      >
                        Clear All
                      </button>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedVariant || ''}`}
                        className="flex items-center justify-between p-3 bg-background border border-gray-200/80 rounded-xl gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-foreground truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {item.product.brand !== 'Multiple / Not specified' && `${item.product.brand} • `}
                            {item.selectedVariant || item.product.variant || item.product.type}
                          </p>
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-bold rounded-full">
                            In Stock • {item.product.unit || 'Piece'}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-foreground hover:bg-gray-100 rounded"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-foreground hover:bg-gray-100 rounded"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Form */}
                  <form id="quote-form" onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-200">
                    <h4 className="font-serif font-bold text-lg text-foreground">Your Contact Details</h4>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9867392552"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Appliance Model / Specific Requirements (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Need 35 MFD capacitor for 1.5T Voltas AC outdoor unit..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && !submittedRef && (
              <div className="p-5 border-t border-gray-200 bg-background space-y-3">
                <button
                  type="submit"
                  form="quote-form"
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] bg-success hover:bg-[#20ba56] text-white font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <WhatsappIcon className="w-6 h-6" />
                  <span>Request Price Quote on WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-gray-500 leading-tight">
                  ⚡ Pre-fills a formatted WhatsApp message to store owner for immediate price quote &amp; pickup booking.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
