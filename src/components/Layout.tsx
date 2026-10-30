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
      <AnnouncementBar />
      <Header onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
