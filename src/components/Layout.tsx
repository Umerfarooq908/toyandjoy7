import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-body">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-600 focus:px-5 focus:py-2.5 focus:font-heading focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
