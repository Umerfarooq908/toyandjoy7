export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  bg_class: string;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  image: string;
  category_name: string;
  category_slug: string;
  age_group: string | null;
  rating: number | null;
  reviews: number;
  stock: number;
  badge: string | null;
  description: string | null;
  is_active: boolean;
  is_new: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
}

export interface ShopContextValue {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}
