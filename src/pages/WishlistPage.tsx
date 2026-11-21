import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/data/types';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('products')
        .select('*')
        .in('id', wishlist)
        .eq('is_active', true);
      if (cancelled) return;
      setProducts((data ?? []) as Product[]);
      setLoading(false);
    }
    fetch();
    return () => {
      cancelled = true;
    };
  }, [wishlist]);

  return (
    <div className="bg-cream-50 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="flex items-center gap-2 font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
          <Heart className="h-8 w-8 fill-pink-500 text-pink-500" /> My Wishlist
        </h1>
        <p className="mt-2 text-navy-400">
          Toys you saved for later. Your wishlist is kept on this device.
        </p>

        {loading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-cream-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-cream-200 bg-white py-16 text-center shadow-soft">
            <Heart className="mb-3 h-12 w-12 text-navy-400" />
            <p className="font-heading text-lg font-bold text-navy-600">Your wishlist is empty</p>
            <p className="mt-1 text-sm text-navy-400">
              Tap the heart on any toy to save it here.
            </p>
            <Link
              to="/shop"
              className="mt-6 rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400"
            >
              Browse Toys
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div key={p.id} className="relative">
                <ProductCard product={p} />
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-pink-500 shadow-soft transition hover:bg-white"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
