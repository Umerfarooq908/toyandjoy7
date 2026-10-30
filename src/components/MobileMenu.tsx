import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { navLinks, categoryDropdown, ageDropdown } from '@/data/catalog';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-navy-600/40 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-float transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
          <Link to="/" onClick={onClose}>
            <Logo />
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="rounded-full p-1.5 transition hover:bg-cream-100">
            <X className="h-5 w-5 text-navy-600" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-navy-600 transition hover:bg-cream-100 hover:text-sky-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-2 mt-6 px-4 font-heading text-xs font-bold uppercase tracking-wider text-navy-400">Categories</p>
          <ul className="space-y-1">
            {categoryDropdown.map((c) => (
              <li key={c.slug}>
                <Link to={`/shop?category=${c.slug}`} onClick={onClose} className="block rounded-xl px-4 py-2 text-sm text-navy-500 transition hover:bg-cream-50">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-2 mt-6 px-4 font-heading text-xs font-bold uppercase tracking-wider text-navy-400">Shop by Age</p>
          <ul className="space-y-1">
            {ageDropdown.map((a) => (
              <li key={a.value}>
                <Link to={`/shop?age=${a.value}`} onClick={onClose} className="block rounded-xl px-4 py-2 text-sm text-navy-500 transition hover:bg-cream-50">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
