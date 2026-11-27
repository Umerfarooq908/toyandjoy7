// Temporary Coming Soon mode — to restore the full site, remove the Coming Soon
// routes below and uncomment the original Layout routes.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from '@/context/ShopContext';
import { AuthProvider } from '@/context/AuthContext';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminPage from '@/pages/AdminPage';
import ComingSoonBanner from '@/components/ComingSoonBanner';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import PoliciesPage from '@/pages/PoliciesPage';
import FaqPage from '@/pages/FaqPage';
import WishlistPage from '@/pages/WishlistPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Original site imports — kept (unused while in Coming Soon mode) so the
// full site can be restored by uncommenting the Layout routes below.

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ShopProvider>
          <Routes>
            {/* Temporary Coming Soon mode: every public URL shows only the
                Coming Soon page — no header, navigation, footer, cart, or
                other page content. Admin routes below are unchanged. */}
            <Route path="/" element={<ComingSoonBanner />} />
            <Route path="/shop" element={<ComingSoonBanner />} />
            <Route path="/product/:slug" element={<ComingSoonBanner />} />
            <Route path="/checkout" element={<ComingSoonBanner />} />
            <Route path="/about" element={<ComingSoonBanner />} />
            <Route path="/contact" element={<ComingSoonBanner />} />
            <Route path="/privacy" element={<ComingSoonBanner />} />
            <Route path="/policies" element={<ComingSoonBanner />} />
            <Route path="/faq" element={<ComingSoonBanner />} />
            <Route path="/wishlist" element={<ComingSoonBanner />} />
            <Route path="*" element={<ComingSoonBanner />} />

            {/* Original Layout routes — commented out for Coming Soon mode.
                To restore the full site, uncomment this block and remove the
                Coming Soon routes above.
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="product/:slug" element={<ProductDetailPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="policies" element={<PoliciesPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            */}

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
