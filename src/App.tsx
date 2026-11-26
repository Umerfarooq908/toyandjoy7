import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from '@/context/ShopContext';
import { AuthProvider } from '@/context/AuthContext';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminPage from '@/pages/AdminPage';
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

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ShopProvider>
          <Routes>
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

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
