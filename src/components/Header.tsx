import { useState, useRef, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import { useShop } from '@/context/ShopContext';
import { useProducts } from '@/hooks/useCatalog';
import type { Product } from '@/data/types';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { cartCount, setCartOpen, wishlist } = useShop();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();

  const { products } = useProducts({ limit: 50 });
  const suggestions: Product[] = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => () => clearTimeout(blurTimer.current), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-navy-600 transition hover:bg-cream-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <form onSubmit={handleSearch} className="relative mx-2 hidden flex-1 md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setFocused(false), 150);
              }}
              placeholder="Search toys, cars, dolls, puzzles & more..."
              className="w-full rounded-full border border-cream-200 bg-cream-50 py-2.5 pl-12 pr-4 text-sm text-navy-600 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          {focused && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-card">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery('');
                    setFocused(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-cream-50"
                >
                  <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="text-sm font-semibold text-navy-600">{p.name}</span>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button className="hidden rounded-full p-2.5 text-navy-600 transition hover:bg-cream-100 sm:block" aria-label="My Account">
            <User className="h-5 w-5" />
          </button>
          <Link to="/shop" className="relative rounded-full p-2.5 text-navy-600 transition hover:bg-cream-100" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full p-2.5 text-navy-600 transition hover:bg-cream-100"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 animate-pop items-center justify-center rounded-full bg-sunshine-500 text-[11px] font-bold text-navy-600">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <NavigationMenu />
    </header>
  );
}
