import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop, formatPKR } from '@/context/ShopContext';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal } = useShop();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-navy-600/40 transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-float transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream-200 px-6 py-4">
          <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-navy-600">
            <ShoppingBag className="h-5 w-5 text-sky-500" /> Your Cart
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="rounded-full p-1.5 transition hover:bg-cream-100">
            <X className="h-5 w-5 text-navy-600" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
              <ShoppingBag className="h-9 w-9 text-navy-400" />
            </div>
            <p className="font-heading text-lg font-semibold text-navy-600">Your cart is empty</p>
            <p className="text-sm text-navy-400">Add some toys and let the joy begin!</p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="rounded-full bg-sunshine-500 px-6 py-2.5 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-3 rounded-2xl border border-cream-200 p-3">
                    <Link to={`/product/${item.slug}`} onClick={() => setCartOpen(false)}>
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link to={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="text-sm font-semibold text-navy-600 hover:text-sky-500">
                        {item.name}
                      </Link>
                      <p className="text-sm font-bold text-sky-500">{formatPKR(item.price)}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-cream-200">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full p-1.5 transition hover:bg-cream-100" aria-label="Decrease quantity">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full p-1.5 transition hover:bg-cream-100" aria-label="Increase quantity">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="rounded-full p-1.5 text-pink-500 transition hover:bg-pink-400/10" aria-label="Remove item">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-cream-200 px-6 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-heading text-base font-semibold text-navy-600">Subtotal</span>
                <span className="font-heading text-lg font-bold text-navy-600">{formatPKR(cartTotal)}</span>
              </div>
              <p className="mb-3 text-xs text-navy-400">Demo checkout — payment methods are shown for preview only.</p>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block w-full rounded-full bg-sunshine-500 py-3 text-center font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
