import { Facebook, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/shop' },
  { label: 'Best Sellers', to: '/#best-sellers' },
  { label: 'New Arrivals', to: '/#new-arrivals' },
  { label: 'About Us', to: '/#why-us' },
  { label: 'Contact Us', to: '/#footer' },
];

const supportLinks = [
  { label: 'FAQs', to: '/#footer' },
  { label: 'Shipping Information', to: '/#footer' },
  { label: 'Returns & Refunds', to: '/#footer' },
  { label: 'Privacy Policy', to: '/#footer' },
  { label: 'Terms & Conditions', to: '/#footer' },
  { label: 'Order Tracking', to: '/#footer' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy-700 text-navy-400">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block rounded-2xl bg-white px-4 py-3 shadow-soft">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Toy &amp; Joy brings together wonderful toys, creative games, and playful discoveries to make childhood moments more memorable.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#footer"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-600 text-white transition hover:bg-sky-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm transition hover:text-sky-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-base font-bold text-white">Customer Support</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm transition hover:text-sky-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-base font-bold text-white">Get in Touch</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>[Business Email]</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-sky-400" />
                <span>WhatsApp: [Business Number]</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-600 py-5">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:px-4">
          <p className="text-center text-sm">© 2026 Toy &amp; Joy. All Rights Reserved.</p>
          <Link to="/admin" className="text-xs text-navy-400 transition hover:text-sky-400">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
