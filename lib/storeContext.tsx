'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, QuoteItem, QuoteRequest, UserProfile, OrderStatus } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './initialData';
import { isFirebaseConfigured, db, auth } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  setDoc, 
  getDoc,
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

const STORE_PHONE_NUMBER = '919867392552';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: QuoteItem[];
  quoteRequests: QuoteRequest[];
  user: UserProfile | null;
  loading: boolean;
  isFirebaseActive: boolean;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  
  // Quote Actions
  submitQuoteRequest: (data: { customerName: string; customerPhone: string; notes?: string }) => Promise<{ success: boolean; whatsappUrl: string; requestId: string }>;
  updateQuoteStatus: (requestId: string, status: OrderStatus, adminNotes?: string) => Promise<void>;
  
  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  seedDatabase: () => Promise<number>;
  
  // Auth Actions
  logout: () => Promise<void>;
  setDemoUser: (role: 'admin' | 'staff' | 'customer') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<QuoteItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedCart = localStorage.getItem('krish_quote_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFirebaseActive] = useState<boolean>(() => isFirebaseConfigured());
  const [loading, setLoading] = useState<boolean>(() => isFirebaseConfigured());

  // Real-time listener for Firebase Firestore
  useEffect(() => {
    if (!isFirebaseActive) {
      return;
    }

    // 1. Subscribe to Products in Firestore
    const prodsRef = collection(db, 'products');
    const unsubscribeProducts = onSnapshot(prodsRef, (snapshot) => {
      const loadedProducts: Product[] = [];
      snapshot.forEach((docSnap) => {
        loadedProducts.push({ id: docSnap.id, ...docSnap.data() } as Product);
      });
      // If Firestore has products, use them! Otherwise fall back to initial Excel products
      if (loadedProducts.length > 0) {
        setProducts(loadedProducts);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error listening to products:', error);
      setProducts(INITIAL_PRODUCTS);
      setLoading(false);
    });

    // 2. Subscribe to Quotation Requests in Firestore
    const quotesRef = collection(db, 'quotationRequests');
    const quotesQ = query(quotesRef, orderBy('createdAt', 'desc'));
    const unsubscribeQuotes = onSnapshot(quotesQ, (snapshot) => {
      const loadedQuotes: QuoteRequest[] = [];
      snapshot.forEach((docSnap) => {
        loadedQuotes.push({ id: docSnap.id, ...docSnap.data() } as QuoteRequest);
      });
      setQuoteRequests(loadedQuotes);
    }, (error) => {
      console.error('Error listening to quotes:', error);
    });

    // 3. Listen to Auth State
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserProfile);
          } else {
            const defaultProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              role: firebaseUser.email === 'Kphomeappliances57@gmail.com' ? 'admin' : 'customer',
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), defaultProfile);
            setUser(defaultProfile);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            role: 'customer',
          });
        }
      } else {
        const savedDemoUser = localStorage.getItem('krish_demo_user');
        if (savedDemoUser) {
          setUser(JSON.parse(savedDemoUser));
        } else {
          setUser(null);
        }
      }
    });

    return () => {
      unsubscribeProducts();
      unsubscribeQuotes();
      unsubscribeAuth();
    };
  }, [isFirebaseActive]);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('krish_quote_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Cart Functions
  const addToCart = (product: Product, quantity: number = 1, selectedVariant?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedVariant: selectedVariant || product.variant }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Quotation Submission to Firestore
  const submitQuoteRequest = async (data: { customerName: string; customerPhone: string; notes?: string }) => {
    const newRequest: QuoteRequest = {
      id: 'REQ-' + Date.now().toString().slice(-6),
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      notes: data.notes || '',
      pickupType: 'store_pickup',
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId: user?.uid || undefined,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        category: item.product.category,
        brand: item.product.brand,
        quantity: item.quantity,
        unit: item.product.unit || 'Piece',
        variant: item.selectedVariant || item.product.variant,
      })),
    };

    if (isFirebaseActive) {
      await addDoc(collection(db, 'quotationRequests'), newRequest);
    }

    // Generate pre-filled WhatsApp message
    let messageText = `*NEW QUOTATION REQUEST*\n`;
    messageText += `*Reference:* #${newRequest.id}\n`;
    messageText += `*Customer:* ${data.customerName}\n`;
    messageText += `*Phone:* ${data.customerPhone}\n`;
    messageText += `*Fulfillment:* 🏪 Store Pickup (Shop No 1, Kanti Avenue, Nalasopara East)\n\n`;
    messageText += `*ITEMS REQUESTED:*\n`;
    
    newRequest.items.forEach((item, index) => {
      messageText += `${index + 1}. *${item.productName}*\n`;
      if (item.brand && item.brand !== 'Multiple / Not specified') {
        messageText += `   Brand: ${item.brand}\n`;
      }
      if (item.variant) {
        messageText += `   Spec/Variant: ${item.variant}\n`;
      }
      messageText += `   Quantity: ${item.quantity} ${item.unit}\n\n`;
    });

    if (data.notes) {
      messageText += `*Customer Notes:* ${data.notes}\n`;
    }

    const encodedMsg = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodedMsg}`;

    clearCart();

    return {
      success: true,
      whatsappUrl,
      requestId: newRequest.id,
    };
  };

  const updateQuoteStatus = async (requestId: string, status: OrderStatus, adminNotes?: string) => {
    if (isFirebaseActive) {
      const qRef = doc(db, 'quotationRequests', requestId);
      await updateDoc(qRef, { status, adminNotes: adminNotes || '', updatedAt: new Date().toISOString() });
    }
  };

  // Product CRUD in Firestore
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newProd = {
      ...productData,
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseActive) {
      await addDoc(collection(db, 'products'), newProd);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (isFirebaseActive) {
      const prodRef = doc(db, 'products', id);
      await updateDoc(prodRef, { ...updates, updatedAt: new Date().toISOString() });
    }
  };

  const deleteProduct = async (id: string) => {
    if (isFirebaseActive) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  // Batch Seed Excel Products to Firestore
  const seedDatabase = async (): Promise<number> => {
    let count = 0;
    if (isFirebaseActive) {
      for (const prod of INITIAL_PRODUCTS) {
        try {
          await setDoc(doc(db, 'products', prod.id), prod);
          count++;
        } catch (e) {
          console.error('Seed error:', e);
        }
      }
    }
    return count;
  };

  const logout = async () => {
    if (isFirebaseActive) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    localStorage.removeItem('krish_demo_user');
  };

  const setDemoUser = (role: 'admin' | 'staff' | 'customer') => {
    const demoProfile: UserProfile = {
      uid: 'demo-' + role + '-123',
      email: role === 'admin' ? 'admin@krishappliances.com' : role === 'staff' ? 'staff@krishappliances.com' : 'customer@gmail.com',
      displayName: role === 'admin' ? 'Store Owner (Admin)' : role === 'staff' ? 'Shop Manager (Staff)' : 'Customer Demo',
      role,
    };
    setUser(demoProfile);
    localStorage.setItem('krish_demo_user', JSON.stringify(demoProfile));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        quoteRequests,
        user,
        loading,
        isFirebaseActive,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartCount,
        submitQuoteRequest,
        updateQuoteStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        seedDatabase,
        logout,
        setDemoUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
