import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Check, Minus, Plus, Shield, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { useProduct, useRelatedProducts } from '@/hooks/useCatalog';
import { useShop, formatPKR } from '@/context/ShopContext';
import { ageGroups } from '@/data/catalog';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug);
  const { related, loading: relatedLoading } = useRelatedProducts(product, 4);
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useShop();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-3xl bg-cream-100" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-xl bg-cream-100" />
            <div className="h-6 w-1/2 animate-pulse rounded-xl bg-cream-100" />
            <div className="h-24 w-full animate-pulse rounded-xl bg-cream-100" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-cream-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="font-heading text-2xl font-bold text-navy-600">Product not found</p>
        <p className="mt-2 text-navy-400">This product may have been removed or is no longer available.</p>
        <Link to="/shop" className="mt-6 rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;
  const wished = isWishlisted(product.id);
  const ageLabel = product.age_group
    ? ageGroups.find((a) => a.value === product.age_group)?.label
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="bg-cream-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <Breadcrumb items={[
          { label: 'Shop', to: '/shop' },
          { label: product.category_name, to: `/shop?category=${product.category_slug}` },
          { label: product.name },
        ]} />

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {/* Image gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-soft">
              <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1.5 text-sm font-bold text-white shadow-soft">
                  -{discount}% OFF
                </span>
              )}
              {product.is_new && (
                <span className="absolute right-4 top-4 rounded-full bg-grass-500 px-3 py-1.5 text-sm font-bold text-white shadow-soft">
                  New Arrival
                </span>
              )}
            </div>
            {/* Thumbnail placeholder gallery */}
            <div className="mt-3 flex gap-2">
              <div className="h-16 w-16 overflow-hidden rounded-xl border-2 border-sky-500 bg-white">
                <img src={product.image} alt="" className="h-full w-full object-cover" />
              </div>
              {related.slice(0, 3).map((r) => (
                <Link key={r.id} to={`/product/${r.slug}`} className="h-16 w-16 overflow-hidden rounded-xl border border-cream-200 bg-white transition hover:border-sky-400">
                  <img src={r.image} alt="" className="h-full w-full object-cover" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">{product.category_name}</p>
            <h1 className="mt-1 font-heading text-3xl font-bold text-navy-600 sm:text-4xl">{product.name}</h1>

            {product.rating && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'fill-sunshine-500 text-sunshine-500' : 'text-cream-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-navy-600">{product.rating}</span>
                <span className="text-sm text-navy-400">({product.reviews} reviews)</span>
              </div>
            )}

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold text-navy-600">{formatPKR(product.price)}</span>
              {product.original_price && (
                <span className="text-lg text-navy-400 line-through">{formatPKR(product.original_price)}</span>
              )}
            </div>

            <div className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${product.stock > 0 ? 'text-grass-500' : 'text-pink-500'}`}>
              {product.stock > 0 ? (
                <><Check className="h-4 w-4" /> In Stock ({product.stock} available)</>
              ) : (
                'Out of Stock'
              )}
            </div>

            {product.description && (
              <p className="mt-5 leading-relaxed text-navy-500">{product.description}</p>
            )}

            {/* Age recommendation */}
            {ageLabel && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-lavender-300/40 px-4 py-2 text-sm font-semibold text-navy-600">
                Recommended age: {ageLabel}
              </div>
            )}

            {/* Quantity selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-semibold text-navy-600">Quantity</span>
              <div className="flex items-center rounded-full border border-cream-200 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="rounded-full p-2.5 transition hover:bg-cream-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-heading font-bold text-navy-600">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="rounded-full p-2.5 transition hover:bg-cream-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sunshine-500 py-3.5 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400 hover:shadow-soft disabled:opacity-50"
              >
                {added ? <><Check className="h-5 w-5" /> Added!</> : <><ShoppingCart className="h-5 w-5" /> Add to Cart</>}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-navy-600 py-3.5 font-heading font-semibold text-white transition hover:bg-navy-500 disabled:opacity-50"
              >
                Buy Now <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="flex items-center justify-center gap-2 rounded-full border border-cream-200 bg-white px-5 py-3.5 font-heading font-semibold text-navy-600 transition hover:bg-cream-100"
              >
                <Heart className={`h-5 w-5 ${wished ? 'fill-pink-500 text-pink-500' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-cream-200 pt-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="h-6 w-6 text-sky-500" />
                <span className="text-xs font-semibold text-navy-500">Nationwide Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield className="h-6 w-6 text-grass-500" />
                <span className="text-xs font-semibold text-navy-500">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw className="h-6 w-6 text-orange-500" />
                <span className="text-xs font-semibold text-navy-500">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {!relatedLoading && related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold text-navy-600">You Might Also Like</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
