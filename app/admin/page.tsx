'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/storeContext';
import { Product, QuoteRequest, OrderStatus } from '@/lib/types';
import { INITIAL_CATEGORIES } from '@/lib/initialData';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Plus, Edit2, 
  Trash2, Check, X, Search, Filter, RefreshCw, PhoneCall, 
  Store, ShieldCheck, ArrowLeft, Eye, MessageSquare, AlertCircle 
} from 'lucide-react';
import { motion } from 'motion/react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function AdminPage() {
  const { 
    products, quoteRequests, registeredUsers, user, isFirebaseActive, 
    addProduct, updateProduct, deleteProduct, updateQuoteStatus, 
    logout 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'quotes' | 'products' | 'customers' | 'analytics'>('quotes');
  const [customerSearch, setCustomerSearch] = useState('');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>('all');
  
  // Product Form Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'Refrigeration',
    brand: 'Multiple / Not specified',
    description: '',
    type: 'Spare Part',
    application: 'Refrigerators / AC / Washing Machine',
    variant: '',
    hasVariants: false,
    inStock: true,
    unit: 'Piece',
    imageUrl: '',
  });

  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('All');

  // Access check
  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff' || isAdmin;

  // Filtered Quote Requests
  const filteredQuotes = useMemo(() => {
    return quoteRequests.filter((req) => {
      if (quoteStatusFilter !== 'all' && req.status !== quoteStatusFilter) return false;
      if (quoteSearch.trim()) {
        const q = quoteSearch.toLowerCase();
        const matchName = req.customerName.toLowerCase().includes(q);
        const matchPhone = req.customerPhone.includes(q);
        const matchId = req.id.toLowerCase().includes(q);
        const matchItems = req.items.some((i) => i.productName.toLowerCase().includes(q));
        return matchName || matchPhone || matchId || matchItems;
      }
      return true;
    });
  }, [quoteRequests, quoteStatusFilter, quoteSearch]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (productCatFilter !== 'All' && p.category !== productCatFilter) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.variant.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, productCatFilter, productSearch]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return registeredUsers.filter((u) => {
      if (!customerSearch.trim()) return true;
      const q = customerSearch.toLowerCase();
      const matchName = (u.displayName || '').toLowerCase().includes(q);
      const matchEmail = (u.email || '').toLowerCase().includes(q);
      const matchPhone = (u.phone || '').toLowerCase().includes(q);
      const matchRole = (u.role || '').toLowerCase().includes(q);
      const matchUid = (u.uid || '').toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchRole || matchUid;
    });
  }, [registeredUsers, customerSearch]);

  // Handlers for Products
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      category: 'Refrigeration',
      brand: 'Multiple / Not specified',
      description: '',
      type: 'Spare Part',
      application: 'General Home Appliances',
      variant: 'Standard',
      hasVariants: false,
      inStock: true,
      unit: 'Piece',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      description: p.description,
      type: p.type,
      application: p.application,
      variant: p.variant,
      hasVariants: p.hasVariants,
      inStock: p.inStock,
      unit: p.unit || 'Piece',
      imageUrl: p.imageUrl || '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      alert('Product Name and Category are required');
      return;
    }

    if (editingProductId) {
      await updateProduct(editingProductId, formData);
    } else {
      await addProduct(formData);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  const replyCustomerWhatsApp = (req: QuoteRequest) => {
    let msg = `Hi ${req.customerName}, this is Krish Home Appliances regarding your Quote Request #${req.id}.\n\n`;
    msg += `We have checked our store stock for your requested items:\n`;
    req.items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.productName} (${item.quantity} ${item.unit})\n`;
    });
    msg += `\nYour order is ready for Store Pickup at Kanti Avenue, Nalasopara East. Store hours: 10 AM - 10 PM.`;
    window.open(`https://wa.me/${req.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // If not logged in as Admin or Staff, show Access Control Box
  if (!isStaff) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-background px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Control Panel Access Required</h2>
            <p className="text-xs text-gray-500 mb-4">
              This area is restricted to Krish Home Appliances authorized Admin and Staff personnel.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Sign In with Authorized Account
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-foreground gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Storefront
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Control Panel</h1>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isAdmin ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {user.role.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Logged in as <strong className="text-foreground">{user.displayName}</strong> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:text-primary text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Store className="w-3.5 h-3.5" /> View Website
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Products</p>
              <h3 className="text-2xl font-serif font-bold text-foreground mt-1">{products.length}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {products.filter((p) => p.inStock).length} In Stock
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Quotes</p>
              <h3 className="text-2xl font-serif font-bold text-foreground mt-1">{quoteRequests.length}</h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                {quoteRequests.filter((q) => q.status === 'pending').length} Pending
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fulfilled Pickup Quotes</p>
              <h3 className="text-2xl font-serif font-bold text-foreground mt-1">
                {quoteRequests.filter((q) => q.status === 'fulfilled').length}
              </h3>
              <p className="text-[11px] text-success font-semibold mt-0.5">Store Pickups Completed</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Firebase Status</p>
              <h3 className="text-sm font-bold text-foreground mt-1">
                {isFirebaseActive ? 'Live Firebase' : 'Mock LocalStorage'}
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {isFirebaseActive ? 'Syncing with Firestore' : 'Add keys to .env.local'}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isFirebaseActive ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8 bg-white px-4 pt-3 rounded-2xl border overflow-x-auto">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'quotes'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-foreground'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> Quotation Requests ({quoteRequests.length})
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'products'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-foreground'
              }`}
            >
              <Package className="w-4 h-4" /> Manage Products ({products.length})
            </button>
          )}

          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'customers'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4" /> Registered Customers ({registeredUsers.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'analytics'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-foreground'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Role &amp; System Info
          </button>
        </div>

        {/* TAB 1: QUOTATIONS LIST */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by customer, phone, quote ID..."
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 bg-background border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-500 shrink-0">Filter Status:</span>
                {['all', 'pending', 'contacted', 'fulfilled', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setQuoteStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize whitespace-nowrap ${
                      quoteStatusFilter === st
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quotations Cards / Table */}
            {filteredQuotes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500">
                No quotation requests found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuotes.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-primary/40 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary">#{req.id}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(req.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-foreground mt-0.5">
                          {req.customerName}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={req.status}
                          onChange={(e) => updateQuoteStatus(req.id, e.target.value as OrderStatus)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                            req.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : req.status === 'contacted'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : req.status === 'fulfilled'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-gray-100 text-gray-600 border-gray-300'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="fulfilled">Fulfilled / Picked Up</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => replyCustomerWhatsApp(req)}
                          className="px-3.5 py-1.5 bg-success hover:bg-[#20ba56] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                        >
                          <WhatsappIcon className="w-4 h-4" /> Reply
                        </button>
                      </div>
                    </div>

                    {/* Customer Info & Store Pickup Tag */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-accent" />
                        <span className="font-bold text-foreground">{req.customerPhone}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-bold border border-amber-200">
                        <Store className="w-3.5 h-3.5 text-amber-600" /> Store Pickup (Kanti Avenue)
                      </div>
                    </div>

                    {/* Items requested */}
                    <div className="bg-background rounded-xl p-3 text-xs space-y-2 border border-gray-200/60">
                      <div className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                        Requested Items ({req.items.length}):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {req.items.map((item, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 flex justify-between">
                            <div>
                              <div className="font-bold text-foreground">{item.productName}</div>
                              <div className="text-[10px] text-gray-500">
                                {item.brand !== 'Multiple / Not specified' && `${item.brand} • `}
                                {item.variant}
                              </div>
                            </div>
                            <span className="font-bold text-primary shrink-0 ml-2">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        ))}
                      </div>

                      {req.notes && (
                        <div className="pt-2 text-gray-600 italic">
                          <strong className="not-italic text-gray-700 font-bold">Notes:</strong> &quot;{req.notes}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT (ADMIN ONLY) */}
        {activeTab === 'products' && isAdmin && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search product inventory..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-background border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="px-3 py-2 bg-background border border-gray-300 rounded-xl text-xs font-bold text-gray-700"
                >
                  <option value="All">All Categories</option>
                  {Array.from(new Set(products.map((p) => p.category))).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" /> Add New Spare Part
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-background text-gray-700 uppercase tracking-wider font-bold border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">ID</th>
                      <th className="py-3.5 px-4">Product Name</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Brand</th>
                      <th className="py-3.5 px-4">Spec / Variant</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-gray-400">{p.productId || p.id.slice(-4)}</td>
                        <td className="py-3 px-4 font-bold text-foreground">
                          {p.name}
                        </td>
                        <td className="py-3 px-4">{p.category}</td>
                        <td className="py-3 px-4">{p.brand}</td>
                        <td className="py-3 px-4 text-gray-500">{p.variant}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              p.inStock
                                ? 'bg-success/10 text-success border border-success/20'
                                : 'bg-red-50 text-red-600 border border-red-200'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGISTERED CUSTOMERS LIST */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Top Bar / Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search customer name, email, or phone..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <Users className="w-4 h-4 text-primary" />
                <span>Showing {filteredCustomers.length} of {registeredUsers.length} Account(s)</span>
              </div>
            </div>

            {/* Customers Table Container */}
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-background border-b border-gray-200 uppercase text-[11px] font-bold text-gray-500 tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Customer Name</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Assigned Role</th>
                      <th className="px-6 py-4">Quote Requests</th>
                      <th className="px-6 py-4">Phone / WhatsApp</th>
                      <th className="px-6 py-4">Account ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                          <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                          <p className="text-sm font-bold text-gray-600">No registered customer accounts found</p>
                          <p className="text-xs text-gray-400 mt-1">Registered customer profiles will automatically appear here once users log in or submit quotes.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((cust) => {
                        const userQuoteCount = quoteRequests.filter(q => q.userId === cust.uid || q.customerEmail === cust.email).length;
                        return (
                          <tr key={cust.uid} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                                  {cust.displayName ? cust.displayName.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                  <span className="font-bold text-foreground block text-sm">{cust.displayName || 'Customer'}</span>
                                  {cust.createdAt && (
                                    <span className="text-[10px] text-gray-400">Joined {new Date(cust.createdAt).toLocaleDateString()}</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-gray-600">
                              {cust.email}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                cust.role === 'admin'
                                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                  : cust.role === 'staff'
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                  : 'bg-green-100 text-green-700 border border-green-200'
                              }`}>
                                {cust.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-foreground">
                              <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                📦 {userQuoteCount} Request(s)
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {cust.phone ? (
                                <div className="flex items-center gap-2">
                                  <a
                                    href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-success/10 text-success hover:bg-success hover:text-white rounded-lg transition-colors"
                                    title="WhatsApp Customer"
                                  >
                                    <WhatsappIcon className="w-4 h-4" />
                                  </a>
                                  <a
                                    href={`tel:${cust.phone}`}
                                    className="p-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-lg transition-colors"
                                    title="Call Customer"
                                  >
                                    <PhoneCall className="w-4 h-4" />
                                  </a>
                                  <span className="font-mono text-gray-700">{cust.phone}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400 italic">Not provided</span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-mono text-[11px] text-gray-400">
                              {cust.uid.slice(0, 12)}...
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM INFO & ROLES */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground">Control Panel Role &amp; Permission Structure</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 text-lg">👑 Store Owner (Admin Role)</span>
                  <span className="text-xs bg-purple-200 text-purple-800 font-bold px-2.5 py-0.5 rounded-full">Full Access</span>
                </div>
                <ul className="text-xs text-purple-800 space-y-1.5 list-disc pl-4">
                  <li>Full CRUD (Add, Edit, Delete) for Products and Categories</li>
                  <li>Toggle product stock availability</li>
                  <li>1-click Seed database from Excel dataset</li>
                  <li>Manage &amp; update Customer Quotation Request statuses</li>
                  <li>Assign roles to employee staff accounts</li>
                </ul>
              </div>

              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 text-lg">🛡️ Shop Manager (Staff Role)</span>
                  <span className="text-xs bg-blue-200 text-blue-800 font-bold px-2.5 py-0.5 rounded-full">Orders &amp; View Only</span>
                </div>
                <ul className="text-xs text-blue-800 space-y-1.5 list-disc pl-4">
                  <li>View live Customer Quotation Requests</li>
                  <li>Update status (Pending → Contacted → Fulfilled)</li>
                  <li>Direct WhatsApp customer response button</li>
                  <li>Browse product inventory &amp; specifications</li>
                  <li>Protected from deleting products or altering configuration</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsProductModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {editingProductId ? 'Edit Spare Part' : 'Add New Spare Part'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-2 text-gray-400 hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dual Run Capacitor 35+5 MFD"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    {INITIAL_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. LG / Haier / Polycab / Generic"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Clear description of the part..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Specification / Variant</label>
                  <input
                    type="text"
                    placeholder="e.g. 45 Minute Timer / 2.5 sq mm"
                    value={formData.variant}
                    onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. Piece / Roll / Set / Meter"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="inStockCheck" className="text-xs font-bold text-gray-700">
                  In Stock &amp; Available for Store Pickup
                </label>
              </div>

              <div className="pt-4 flex gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
