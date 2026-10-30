import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '@/hooks/useCatalog';

export default function CategoryGrid() {
  const { categories, loading } = useCategories();

  return (
    <section id="categories" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
            Find Their Next Favorite Toy!
          </h2>
          <p className="mt-3 text-navy-400">Explore a wonderful world of play, learning, and imagination.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-3xl bg-cream-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className={`group relative overflow-hidden rounded-3xl ${cat.bg_class} p-5 transition hover:-translate-y-1 hover:shadow-card`}
              >
                <div className="relative z-10 mx-auto mb-4 h-32 w-32 overflow-hidden rounded-2xl bg-white shadow-soft transition group-hover:scale-105">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <h3 className="relative z-10 text-center font-heading text-base font-bold text-navy-600">
                  {cat.name}
                </h3>
                <p className="relative z-10 mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-sky-500 opacity-0 transition group-hover:opacity-100">
                  Explore <ArrowRight className="h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
