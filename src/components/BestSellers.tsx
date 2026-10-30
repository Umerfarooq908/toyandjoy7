import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useCatalog';
import ProductCard from './ProductCard';

export default function BestSellers() {
  const { products, loading } = useProducts({ limit: 8 });

  // Show best sellers (badge) first, then fill with other products
  const sorted = [...products].sort((a, b) => {
    if (a.badge && !b.badge) return -1;
    if (!a.badge && b.badge) return 1;
    return 0;
  });

  return (
    <section id="best-sellers" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
            Most Loved by Little Ones!
          </h2>
          <p className="mt-3 text-navy-400">Discover popular toys chosen by families.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-cream-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sorted.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-sunshine-500 px-8 py-3.5 font-heading font-semibold text-navy-600 shadow-soft transition hover:scale-105 hover:bg-sunshine-400"
          >
            View All Toys <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
