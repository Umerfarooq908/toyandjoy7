import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, CreditCard, Banknote, Smartphone, Wallet, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { useShop, formatPKR } from '@/context/ShopContext';
import { supabase } from '@/lib/supabase';

const PROVINCES = ['Sindh', 'Punjab', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Islamabad Capital Territory'];

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when your order arrives', available: true },
  { id: 'bank', label: 'Bank Transfer', icon: CreditCard, desc: 'Transfer to our bank account', available: true },
  { id: 'easypaisa', label: 'Easypaisa', icon: Smartphone, desc: 'Mobile wallet payment', available: false },
  { id: 'jazzcash', label: 'JazzCash', icon: Wallet, desc: 'Mobile wallet payment', available: false },
  { id: 'card', label: 'Card Payment', icon: CreditCard, desc: 'Credit / Debit card', available: false },
];

const SHIPPING_FLAT = 250;

export default function CheckoutPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useShop();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const discount = discountApplied ? Math.round(cartTotal * 0.1) : 0;
  const shipping = cartTotal > 0 ? SHIPPING_FLAT : 0;
  const finalTotal = cartTotal - discount + shipping;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!/^\+?92\d{10}$|^03\d{9}$/.test(form.mobile.replace(/[\s-]/g, ''))) e.mobile = 'Enter a valid Pakistani mobile number (e.g. 03001234567)';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.address.trim()) e.address = 'Street address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.province) e.province = 'Province is required';
    if (!form.postalCode.trim()) e.postalCode = 'Postal code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setOrderError(null);

    const { data: orderData, error: orderError2 } = await supabase
      .from('orders')
      .insert({
        customer_name: form.fullName,
        customer_mobile: form.mobile,
        customer_email: form.email || null,
        shipping_address: form.address,
        city: form.city,
        province: form.province,
        postal_code: form.postalCode,
        payment_method: paymentMethod,
        subtotal: cartTotal,
        discount,
        shipping_cost: shipping,
        total: finalTotal,
        status: 'pending',
      })
      .select('id')
      .single();

    if (orderError2 || !orderData) {
      setSubmitting(false);
      setOrderError(orderError2?.message ?? 'Could not place your order. Please try again.');
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: orderData.id,
      product_id: item.id,
      product_name: item.name,
      product_slug: item.slug,
      image: item.image,
      unit_price: item.price,
      quantity: item.quantity,
      line_total: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      setSubmitting(false);
      setOrderError('Your order was placed but the items could not be saved. Please contact support.');
      return;
    }

    setSubmitting(false);
    setOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  const applyDiscount = () => {
    // Demo discount code
    if (discountCode.toUpperCase() === 'TOYJOY10') {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-cream-50 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-grass-500 text-white shadow-float">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">Order Confirmed!</h1>
          <p className="mt-3 text-navy-400">
            Thank you for your order. This is a demo confirmation — no real payment has been processed.
            You will receive an order confirmation once the store is fully operational.
          </p>
          <div className="mt-8 rounded-2xl border border-cream-200 bg-white p-6 text-left shadow-soft">
            <h2 className="mb-4 font-heading text-lg font-bold text-navy-600">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-navy-400">Customer</span>
                <span className="font-semibold text-navy-600">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-400">Mobile</span>
                <span className="font-semibold text-navy-600">{form.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-400">Delivery to</span>
                <span className="font-semibold text-navy-600">{form.city}, {form.province}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-400">Payment Method</span>
                <span className="font-semibold text-navy-600">
                  {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                </span>
              </div>
              <div className="border-t border-cream-200 pt-2 flex justify-between">
                <span className="font-heading font-bold text-navy-600">Total</span>
                <span className="font-heading font-bold text-navy-600">{formatPKR(finalTotal)}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/shop" className="rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400">
              Continue Shopping
            </Link>
            <Link to="/" className="rounded-full border border-cream-200 bg-white px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-cream-100">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
          <ShoppingBag className="h-9 w-9 text-navy-400" />
        </div>
        <p className="font-heading text-2xl font-bold text-navy-600">Your cart is empty</p>
        <p className="mt-2 text-navy-400">Add some toys before heading to checkout!</p>
        <Link to="/shop" className="mt-6 rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400">
          Browse Toys
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: 'Checkout' }]} />
        <h1 className="mt-4 font-heading text-3xl font-bold text-navy-600 sm:text-4xl">Checkout</h1>

        {orderError && (
        <div className="mx-auto mb-4 max-w-3xl rounded-xl border border-pink-500/40 bg-pink-500/10 px-4 py-3 text-sm font-semibold text-pink-600">
          {orderError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left — form fields */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact info */}
            <section className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy-600">Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-pink-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Mobile Number *</label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="03001234567"
                  />
                  {errors.mobile && <p className="mt-1 text-xs text-pink-500">{errors.mobile}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Email (optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-pink-500">{errors.email}</p>}
                </div>
              </div>
            </section>

            {/* Shipping address */}
            <section className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy-600">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Street Address *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="House #, Street, Area"
                  />
                  {errors.address && <p className="mt-1 text-xs text-pink-500">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy-600">City *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="Karachi"
                  />
                  {errors.city && <p className="mt-1 text-xs text-pink-500">{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Province *</label>
                  <div className="relative">
                    <select
                      value={form.province}
                      onChange={(e) => setForm({ ...form, province: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="">Select province</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  </div>
                  {errors.province && <p className="mt-1 text-xs text-pink-500">{errors.province}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Postal Code *</label>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="74000"
                  />
                  {errors.postalCode && <p className="mt-1 text-xs text-pink-500">{errors.postalCode}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-navy-600">Order Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </div>
            </section>

            {/* Payment method */}
            <section className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy-600">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${
                      paymentMethod === method.id
                        ? 'border-sky-500 bg-sky-500/5'
                        : 'border-cream-200 hover:border-cream-200'
                    } ${!method.available ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => method.available && setPaymentMethod(method.id)}
                      disabled={!method.available}
                      className="h-5 w-5 text-sky-500 focus:ring-sky-500"
                    />
                    <method.icon className="h-6 w-6 text-navy-600" />
                    <div className="flex-1">
                      <p className="font-heading text-sm font-bold text-navy-600">
                        {method.label}
                        {!method.available && <span className="ml-2 text-xs font-normal text-navy-400">Coming soon</span>}
                      </p>
                      <p className="text-xs text-navy-400">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right — Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy-600">Order Summary</h2>

              {/* Cart items */}
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy-600 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link to={`/product/${item.slug}`} className="text-sm font-semibold text-navy-600 hover:text-sky-500">{item.name}</Link>
                      <span className="text-xs text-sky-500">{formatPKR(item.price)}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-xs text-navy-400 hover:text-navy-600">–</button>
                        <span className="text-xs font-semibold text-navy-600">Qty {item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-xs text-navy-400 hover:text-navy-600">+</button>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="ml-2 text-xs text-pink-500 hover:text-pink-600">Remove</button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-navy-600">{formatPKR(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              {/* Discount code */}
              <div className="mt-5 border-t border-cream-200 pt-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 rounded-xl border border-cream-200 px-4 py-2 text-sm outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={applyDiscount}
                    className="rounded-xl bg-navy-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-500"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-grass-500">
                    <Check className="h-3.5 w-3.5" /> Code applied! 10% discount
                  </p>
                )}
                {discountCode && !discountApplied && (
                  <p className="mt-2 text-xs text-navy-400">Try code: TOYJOY10</p>
                )}
              </div>

              {/* Totals */}
              <div className="mt-5 space-y-2 border-t border-cream-200 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-400">Subtotal</span>
                  <span className="font-semibold text-navy-600">{formatPKR(cartTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-navy-400">Discount (10%)</span>
                    <span className="font-semibold text-grass-500">-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-navy-400">Shipping</span>
                  <span className="font-semibold text-navy-600">{formatPKR(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-cream-200 pt-3">
                  <span className="font-heading text-base font-bold text-navy-600">Total</span>
                  <span className="font-heading text-xl font-bold text-navy-600">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-full bg-sunshine-500 py-3.5 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400 hover:shadow-soft disabled:opacity-60"
              >
                {submitting ? 'Placing Order…' : 'Place Order'}
              </button>
              <p className="mt-3 text-center text-xs text-navy-400">
                Demo checkout — no real payment will be processed.
              </p>
              <Link to="/shop" className="mt-3 block text-center text-sm font-semibold text-sky-500 transition hover:text-sky-400">
                Continue Shopping
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
