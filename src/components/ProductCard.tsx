import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { useShop, formatPKR } from '@/context/ShopContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-cream-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-sky-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-soft">
              {product.badge}
            </span>
          )}
          {product.is_new && (
            <span className="rounded-full bg-grass-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-soft">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-pink-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-soft">
              -{discount}%
            </span>
          )}
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy-600 shadow-soft transition hover:scale-110 hover:bg-white"
      >
        <Heart className={`h-5 w-5 transition ${wished ? 'fill-pink-500 text-pink-500' : ''}`} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-500">{product.category_name}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 font-heading text-sm font-bold leading-snug text-navy-600 transition hover:text-sky-500">{product.name}</h3>
        </Link>

        {product.rating && (
          <div className="mt-1.5 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-sunshine-500 text-sunshine-500" />
            <span className="text-xs font-semibold text-navy-600">{product.rating}</span>
            <span className="text-xs text-navy-400">({product.reviews})</span>
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold text-navy-600">{formatPKR(product.price)}</span>
          {product.original_price && (
            <span className="text-xs text-navy-400 line-through">{formatPKR(product.original_price)}</span>
          )}
        </div>

        <div className={`mt-1 flex items-center gap-1 text-xs font-semibold ${product.stock > 0 ? 'text-grass-500' : 'text-pink-500'}`}>
          {product.stock > 0 ? (
            <><Check className="h-3.5 w-3.5" /> In Stock</>
          ) : (
            'Out of Stock'
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className="mt-3 flex items-center justify-center gap-2 rounded-full bg-sunshine-500 py-2.5 font-heading text-sm font-semibold text-navy-600 transition hover:bg-sunshine-400 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
