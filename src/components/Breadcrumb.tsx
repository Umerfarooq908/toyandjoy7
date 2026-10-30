import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; to?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-navy-400">
      <Link to="/" className="flex items-center transition hover:text-sky-500">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-cream-200" />
          {item.to ? (
            <Link to={item.to} className="transition hover:text-sky-500">{item.label}</Link>
          ) : (
            <span className="font-semibold text-navy-600">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
