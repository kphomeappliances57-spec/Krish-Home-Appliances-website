export interface Product {
  id: string;
  productId?: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  type: string;
  application: string;
  variant: string;
  hasVariants: boolean;
  inStock: boolean;
  unit: string;
  imageUrl?: string;
  price?: number;
  modelNumbers?: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  notes?: string;
}

export type OrderStatus = 'pending' | 'contacted' | 'fulfilled' | 'cancelled';

export interface QuoteRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    category: string;
    brand: string;
    quantity: number;
    unit: string;
    variant?: string;
  }[];
  pickupType: 'store_pickup';
  status: OrderStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string;
}

export type UserRole = 'admin' | 'staff' | 'customer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  createdAt?: string;
}
