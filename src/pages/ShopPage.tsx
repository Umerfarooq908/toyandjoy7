import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCategories } from '@/hooks/useCatalog';
import { ageGroups } from '@/data/catalog';
import type { Product } from '@/data/types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useProducts({ limit: 100 });
  const { categories } = useCategories();

  const categorySlug = searchParams.get('category') ?? '';
  const ageGroup = searchParams.get('age') ?? '';
  const query = searchParams.get('q') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';

  const [searchInput, setSearchInput] = useState(query);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setPriceMin('');
    setPriceMax('');
    setInStockOnly(false);
    setSearchInput('');
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (categorySlug) {
      result = result.filter((p) => p.category_slug === categorySlug);
    }
    if (ageGroup) {
      result = result.filter((p) => p.age_group === ageGroup);
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q)
      );
    }
    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax));
    }
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [products, categorySlug, ageGroup, query, priceMin, priceMax, inStockOnly, sort]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="bg-cream-50">
      {/* Page header */}
      <div className="border-b border-cream-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Shop' }]} />
          <h1 className="mt-3 font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
            {activeCategory ? activeCategory.name : 'Shop All Toys'}
          </h1>
          <p className="mt-1 text-navy-400">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Search bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setParam('q', searchInput);
                }
              }}
              placeholder="Search products..."
              className="w-full rounded-full border border-cream-200 bg-white py-2.5 pl-12 pr-4 text-sm text-navy-600 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center justify-center gap-2 rounded-full border border-cream-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-600 transition hover:bg-cream-100 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} w-full shrink-0 space-y-5 lg:block lg:w-64`}>
            <div className="rounded-2xl border border-cream-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-navy-600">Filters</h2>
                <button onClick={clearFilters} className="text-xs font-semibold text-sky-500 transition hover:text-sky-400">
                  Clear All
                </button>
              </div>

              {/* Category filter */}
              <div className="mb-5">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-400">Category</h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setParam('category', '')}
                    className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${!categorySlug ? 'bg-sky-500/10 font-semibold text-sky-500' : 'text-navy-500 hover:bg-cream-50'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setParam('category', cat.slug)}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${categorySlug === cat.slug ? 'bg-sky-500/10 font-semibold text-sky-500' : 'text-navy-500 hover:bg-cream-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age filter */}
              <div className="mb-5">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-400">Age Group</h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setParam('age', '')}
                    className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${!ageGroup ? 'bg-sky-500/10 font-semibold text-sky-500' : 'text-navy-500 hover:bg-cream-50'}`}
                  >
                    All Ages
                  </button>
                  {ageGroups.map((age) => (
                    <button
                      key={age.value}
                      onClick={() => setParam('age', age.value)}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${ageGroup === age.value ? 'bg-sky-500/10 font-semibold text-sky-500' : 'text-navy-500 hover:bg-cream-50'}`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div className="mb-5">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-400">Price Range (Rs.)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-lg border border-cream-200 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                  />
                  <span className="text-navy-400">–</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-lg border border-cream-200 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Availability filter */}
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-400">Availability</h3>
                <label className="flex items-center gap-2 text-sm text-navy-500">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-cream-200 text-sky-500 focus:ring-sky-500"
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-cream-200 bg-white px-5 py-3">
              <span className="text-sm font-semibold text-navy-600">Sort by</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setParam('sort', e.target.value)}
                  className="appearance-none rounded-full border border-cream-200 bg-white py-2 pl-4 pr-10 text-sm font-semibold text-navy-600 outline-none focus:border-sky-500"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-3xl bg-cream-100" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-cream-200 bg-white py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-100">
                  <Search className="h-8 w-8 text-navy-400" />
                </div>
                <p className="font-heading text-lg font-semibold text-navy-600">No products found</p>
                <p className="mt-1 text-sm text-navy-400">Try adjusting your filters or search terms.</p>
                <button onClick={clearFilters} className="mt-4 rounded-full bg-sunshine-500 px-6 py-2.5 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p: Product) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
