import { useRef } from 'react';
import { Star, BadgeCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '@/data/catalog';

export default function CustomerReviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
              Happy Families, Happy Moments!
            </h2>
            <p className="mt-3 text-navy-400">Real stories from families who shop with us.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scroll('left')} aria-label="Previous reviews" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-navy-600 transition hover:bg-cream-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} aria-label="Next reviews" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-navy-600 transition hover:bg-cream-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="w-80 shrink-0 snap-start rounded-3xl border border-cream-200 bg-cream-50 p-6 shadow-soft"
            >
              <Quote className="h-8 w-8 text-sky-400/40" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < r.rating ? 'fill-sunshine-500 text-sunshine-500' : 'text-cream-200'}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-cream-200 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-heading font-bold text-white">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-heading text-sm font-bold text-navy-600">{r.name}</p>
                    {r.verified && (
                      <BadgeCheck className="h-4 w-4 text-sky-500" />
                    )}
                  </div>
                  <p className="text-xs text-navy-400">Purchased: {r.product}</p>
                </div>
                <span className="text-xs text-navy-400">{r.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
