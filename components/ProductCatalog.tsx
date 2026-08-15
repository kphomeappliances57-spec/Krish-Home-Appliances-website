'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/storeContext';
import { Product } from '@/lib/types';
import ProductDetailModal from './ProductDetailModal';
import { 
  Search, Filter, ShoppingBag, Store, CheckCircle2, 
  Zap, Database, AlignJustify, Snowflake, Fan, Settings, Cpu, Cable, ArrowUpRight 
} from 'lucide-react';
import { motion } from 'motion/react';

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

interface ProductCatalogProps {
  onOpenCart?: () => void;
}

export default function ProductCatalog({ onOpenCart }: ProductCatalogProps) {
  const { products, loading, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  // Extract unique category names & brands
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    products.forEach((p) => {
      let cat = p.category || 'Electrical';
      if (cat.toLowerCase().includes('hvac')) {
        cat = cat.toLowerCase().includes('tool') ? 'Service Tools' : 'Electrical';
      }
      set.add(cat);
    });
    return Array.from(set);
  }, [products]);

  const brandsList = useMemo(() => {
    const bSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand && p.brand !== 'Multiple / Not specified' && p.brand !== 'Not specified') {
        bSet.add(p.brand);
      }
    });
    return ['All', ...Array.from(bSet)];
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All') {
        let pCat = product.category || 'Electrical';
        if (pCat.toLowerCase().includes('hvac')) {
          pCat = pCat.toLowerCase().includes('tool') ? 'Service Tools' : 'Electrical';
        }
        if (pCat !== selectedCategory) {
          return false;
        }
      }
      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchVariant = product.variant.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchBrand && !matchCat && !matchVariant) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedBrand, onlyInStock, searchQuery]);

  return (
    <section id="parts" className="py-20 lg:py-24 bg-white scroll-mt-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center w-full mb-12">
          <span className="text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block text-center">
            Interactive Spare Parts Catalog &amp; Quote Builder
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Genuine Spare Parts. Ready on the Shelf.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed">
            Search 100+ multi-brand home appliance parts, add to your quote cart, or get an instant WhatsApp quote for direct store pickup.
          </p>
        </div>

        {/* Search & Filters Controls Bar */}
        <div className="bg-background rounded-3xl p-4 sm:p-6 mb-10 border border-gray-200 shadow-sm space-y-4">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search spare parts by name, model, capacitor MFD, timer, valve, or brand (e.g. LG, Haier)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-gray-400 hover:text-gray-600 font-bold bg-gray-100 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-200/80">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Brand & Stock Filters */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t border-gray-100 sm:border-t-0">
              {brandsList.length > 1 && (
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="flex-1 sm:flex-initial min-w-[120px] max-w-[160px] px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary truncate"
                >
                  <option value="All">All Brands</option>
                  {brandsList.filter((b) => b !== 'All').map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              )}

              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-xl whitespace-nowrap shrink-0">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Counter & Store Pickup Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 px-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Showing <strong className="text-foreground">{filteredProducts.length}</strong> product(s)
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          </p>

          <span className="text-xs font-semibold text-accent flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
            <Store className="w-3.5 h-3.5 shrink-0" /> Store Pickup Only (Kanti Avenue, Nalasopara East)
          </span>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-5 h-72 animate-pulse border border-gray-200" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-background rounded-3xl p-12 text-center border border-gray-200 my-8">
            <p className="text-lg font-bold text-foreground mb-2">No spare parts match your filter</p>
            <p className="text-sm text-gray-500 mb-6">
              Try searching with a different name or clear your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBrand('All');
                setOnlyInStock(false);
              }}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full border border-gray-200 relative overflow-hidden"
              >
                {/* Image & Stock Badge */}
                <div className="relative aspect-4/3 rounded-xl bg-gray-100 overflow-hidden mb-4 border border-gray-100 cursor-pointer" onClick={() => setActiveProductModal(product)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-wider shadow-xs max-w-[55%] truncate">
                    {product.category}
                  </div>

                  {product.inStock && (
                    <div className="absolute top-2 right-2 bg-success text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center shadow-xs shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mr-1 animate-pulse" />
                      In Stock
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="flex-grow flex flex-col cursor-pointer" onClick={() => setActiveProductModal(product)}>
                  <div className="text-[11px] font-bold text-accent uppercase tracking-wider mb-1 truncate">
                    {product.brand !== 'Multiple / Not specified' ? product.brand : 'Multi-Brand'}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-xs leading-relaxed font-sans mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1 mb-4">
                    <div className="truncate">
                      <span className="font-semibold text-gray-700">Spec:</span> {product.variant}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-gray-700">Unit:</span> {product.unit || 'Piece'}
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 mt-auto">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      if (onOpenCart) onOpenCart();
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-primary hover:text-white text-foreground font-semibold rounded-xl text-xs transition-all border border-gray-200"
                    title="Add to multi-product quote cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    + Cart
                  </button>

                  <button
                    onClick={() => setActiveProductModal(product)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-success hover:bg-[#20ba56] text-white font-semibold rounded-xl text-xs transition-all shadow-xs"
                    title="Request price quote for this part"
                  >
                    <WhatsappIcon className="w-3.5 h-3.5" />
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onOpenCart={onOpenCart}
        />
      )}
    </section>
  );
}
