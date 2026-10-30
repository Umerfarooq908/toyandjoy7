import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navLinks, categoryDropdown, ageDropdown } from '@/data/catalog';

export default function NavigationMenu() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="hidden border-t border-cream-200 bg-white lg:block">
      <ul className="mx-auto flex max-w-7xl items-center gap-1 px-8">
        {navLinks.map((link) => (
          <li
            key={link.label}
            className="relative"
            onMouseEnter={() => link.dropdown && setOpen(link.dropdown)}
            onMouseLeave={() => setOpen(null)}
          >
            <Link
              to={link.href}
              className="flex items-center gap-1 px-3 py-3 text-sm font-semibold text-navy-600 transition hover:text-sky-500"
            >
              {link.label}
              {link.dropdown && <ChevronDown className="h-4 w-4" />}
            </Link>
            {link.dropdown && open === link.dropdown && (
              <div className="absolute left-0 top-full z-50 w-56 overflow-hidden rounded-2xl border border-cream-200 bg-white py-2 shadow-card">
                {(link.dropdown === 'category' ? categoryDropdown : ageDropdown).map((item) => {
                  const href = link.dropdown === 'category'
                    ? `/shop?category=${(item as { slug: string }).slug}`
                    : `/shop?age=${(item as { value: string }).value}`;
                  return (
                    <Link
                      key={item.label}
                      to={href}
                      className="block px-4 py-2 text-sm font-medium text-navy-500 transition hover:bg-cream-50 hover:text-sky-500"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
