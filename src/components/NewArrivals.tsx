import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '@/hooks/useCatalog';
import ProductCard from './ProductCard';

export default function NewArrivals() {
  const { products, loading } = useProducts({ isNew: true, limit: 8 });
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="new-arrivals" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
              Fresh Fun Has Arrived!
            </h2>
            <p className="mt-3 text-navy-400">Discover the latest additions to our toy collection.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scroll('left')} aria-label="Scroll left" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-navy-600 transition hover:bg-cream-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} aria-label="Scroll right" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-navy-600 transition hover:bg-cream-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 w-56 shrink-0 animate-pulse rounded-3xl bg-cream-100 sm:w-64" />
            ))}
          </div>
        ) : (
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          >
            {products.map((p) => (
              <div key={p.id} className="w-56 shrink-0 snap-start sm:w-64">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
