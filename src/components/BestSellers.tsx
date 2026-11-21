import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useCatalog';
import ProductCard from './ProductCard';

// Top-selling categories from the Pakistan toy market report —
// RC cars, dolls, building blocks and ride-ons. These link to the
// shop filtered by category; no specific products, prices or sales
// figures are claimed here.
const bestSellerCategories = [
  {
    label: 'Remote Control Cars',
    slug: 'remote-control-cars',
    desc: 'Fast, fun RC cars for every age.',
    bg: 'bg-sky-400/15',
  },
  {
    label: 'Dolls & Dollhouses',
    slug: 'dolls-dollhouses',
    desc: 'Dolls, dollhouses and pretend play.',
    bg: 'bg-pink-400/15',
  },
  {
    label: 'Building Blocks',
    slug: 'building-blocks',
    desc: 'Blocks and construction sets to build and create.',
    bg: 'bg-sunshine-500/15',
  },
  {
    label: 'Ride-On Toys',
    slug: 'ride-on-toys',
    desc: 'Ride-on cars and bikes — available on pre-order.',
    bg: 'bg-grass-500/15',
  },
];

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
            Best Sellers
          </h2>
          <p className="mt-3 text-navy-400">RC cars, dolls, building blocks and ride-ons — the toys families ask for most.</p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bestSellerCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className={`group rounded-3xl ${cat.bg} p-5 text-center transition hover:-translate-y-1 hover:shadow-card`}
            >
              <h3 className="font-heading text-base font-bold text-navy-600 sm:text-lg">{cat.label}</h3>
              <p className="mt-1 text-xs text-navy-400 sm:text-sm">{cat.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-navy-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-500">
                Shop Now <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
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
