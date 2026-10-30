import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  Plus, Search, Pencil, Trash2, LogOut, Package, Eye, EyeOff,
  Star, AlertTriangle, X, Store, ChevronLeft, TrendingUp,
  ShoppingBag, IndianRupee, Trophy,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import type { Product } from '@/data/types';
import { formatPKR } from '@/context/ShopContext';
import ProductFormModal from '@/components/ProductFormModal';

type ProductRow = Omit<Product, 'created_at'> & { created_at: string };

interface OrderRow {
  id: string;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  image: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

interface TopProduct {
  product_name: string;
  image: string;
  units_sold: number;
  revenue: number;
}

export default function AdminPage() {
  const { session, loading, signOut } = useAuth();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'lowstock'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItemRow[]>([]);

  const fetchProducts = useCallback(async () => {
    setFetching(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
    } else {
      setProducts((data ?? []) as ProductRow[]);
    }
    setFetching(false);
  }, []);

  const fetchOrders = useCallback(async () => {
    const { data: ordData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    setOrders((ordData ?? []) as OrderRow[]);

    const { data: itemData } = await supabase
      .from('order_items')
      .select('*');
    setOrderItems((itemData ?? []) as OrderItemRow[]);
  }, []);

  useEffect(() => {
    if (session) {
      fetchProducts();
      fetchOrders();
    }
  }, [session, fetchProducts, fetchOrders]);

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.is_active).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return { total, active, inactive: total - active, lowStock, outOfStock };
  }, [products]);

  const sales = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = validOrders.length;
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentOrders = validOrders.filter((o) => new Date(o.created_at) >= thirtyDaysAgo);
    const recentRevenue = recentOrders.reduce((sum, o) => sum + o.total, 0);

    const validItems = orderItems.filter((item) => {
      const order = orders.find((o) => o.id === item.order_id);
      return order && order.status !== 'cancelled';
    });

    const productMap = new Map<string, TopProduct>();
    for (const item of validItems) {
      const existing = productMap.get(item.product_name);
      if (existing) {
        existing.units_sold += item.quantity;
        existing.revenue += item.line_total;
      } else {
        productMap.set(item.product_name, {
          product_name: item.product_name,
          image: item.image,
          units_sold: item.quantity,
          revenue: item.line_total,
        });
      }
    }
    const topProducts = [...productMap.values()].sort((a, b) => b.units_sold - a.units_sold).slice(0, 5);

    return { totalRevenue, totalOrders, pendingOrders, recentRevenue, recentOrderCount: recentOrders.length, topProducts };
  }, [orders, orderItems]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q),
      );
    }
    switch (filter) {
      case 'active':
        result = result.filter((p) => p.is_active);
        break;
      case 'inactive':
        result = result.filter((p) => !p.is_active);
        break;
      case 'lowstock':
        result = result.filter((p) => p.stock <= 5);
        break;
    }
    return result;
  }, [products, search, filter]);

  const handleOpenAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProductRow) => {
    setEditing(p);
    setModalOpen(true);
  };

  const handleToggleActive = async (p: ProductRow) => {
    const { error: err } = await supabase
      .from('products')
      .update({ is_active: !p.is_active })
      .eq('id', p.id);
    if (err) {
      setError(err.message);
      return;
    }
    setProducts((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, is_active: !item.is_active } : item)),
    );
  };

  const handleStockChange = async (p: ProductRow, newStock: number) => {
    const clamped = Math.max(0, Math.round(newStock || 0));
    const { error: err } = await supabase
      .from('products')
      .update({ stock: clamped })
      .eq('id', p.id);
    if (err) {
      setError(err.message);
      return;
    }
    setProducts((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, stock: clamped } : item)),
    );
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    const { error: err } = await supabase
      .from('products')
      .delete()
      .eq('id', deleteTarget.id);
    setDeleting(false);
    if (err) {
      setDeleteError(err.message);
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-700">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-cream-50 font-body">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-cream-200 bg-white shadow-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="rounded-lg p-2 text-navy-400 transition hover:bg-cream-100 hover:text-navy-600" aria-label="Back to store">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-heading text-lg font-bold leading-none text-navy-600">Admin Panel</h1>
              <p className="mt-0.5 text-xs text-navy-400">Product Catalog Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full border border-cream-200 px-4 py-2 text-sm font-semibold text-navy-600 transition hover:bg-cream-100 sm:flex"
            >
              <Store className="h-4 w-4" /> View Store
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-full bg-navy-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Sales Analytics */}
        <div className="mb-8 rounded-3xl border border-cream-200 bg-gradient-to-br from-navy-700 to-navy-600 p-6 shadow-card lg:p-8">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-sky-400" />
            <h2 className="font-heading text-lg font-bold text-white">Sales Overview</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sunshine-500/20">
                <IndianRupee className="h-5 w-5 text-sunshine-400" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">{formatPKR(sales.totalRevenue)}</p>
              <p className="text-xs font-semibold text-navy-400">Total Revenue</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20">
                <ShoppingBag className="h-5 w-5 text-sky-400" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">{sales.totalOrders}</p>
              <p className="text-xs font-semibold text-navy-400">Total Orders</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-grass-500/20">
                <TrendingUp className="h-5 w-5 text-grass-500" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">{formatPKR(sales.recentRevenue)}</p>
              <p className="text-xs font-semibold text-navy-400">Revenue (30 days)</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/20">
                <Package className="h-5 w-5 text-pink-400" />
              </div>
              <p className="font-heading text-2xl font-bold text-white">{sales.pendingOrders}</p>
              <p className="text-xs font-semibold text-navy-400">Pending Orders</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mb-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-sunshine-600" />
            <h2 className="font-heading text-lg font-bold text-navy-600">Top-Selling Products</h2>
          </div>
          {sales.topProducts.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-center">
              <p className="text-sm text-navy-400">No sales yet. Once customers start ordering, your best sellers will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sales.topProducts.map((p, i) => {
                const maxUnits = sales.topProducts[0].units_sold || 1;
                const barWidth = Math.round((p.units_sold / maxUnits) * 100);
                return (
                  <div key={p.product_name} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-100 font-heading text-sm font-bold text-navy-500">
                      {i + 1}
                    </div>
                    <img src={p.image} alt={p.product_name} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-sm font-bold text-navy-600">{p.product_name}</p>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream-100">
                        <div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: `${barWidth}%` }} />
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-heading text-sm font-bold text-navy-600">{p.units_sold} sold</p>
                      <p className="text-xs text-navy-400">{formatPKR(p.revenue)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard icon={Package} label="Total Products" value={stats.total} color="sky" />
          <StatCard icon={Eye} label="Visible" value={stats.active} color="grass" />
          <StatCard icon={EyeOff} label="Hidden" value={stats.inactive} color="navy" />
          <StatCard icon={AlertTriangle} label="Low Stock" value={stats.lowStock} color="sunshine" />
          <StatCard icon={AlertTriangle} label="Out of Stock" value={stats.outOfStock} color="pink" />
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-pink-500/40 bg-pink-500/10 px-4 py-3 text-sm font-semibold text-pink-600">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-cream-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1 rounded-full border border-cream-200 bg-white p-1">
              {([
                { v: 'all', l: 'All' },
                { v: 'active', l: 'Visible' },
                { v: 'inactive', l: 'Hidden' },
                { v: 'lowstock', l: 'Low Stock' },
              ] as const).map((f) => (
                <button
                  key={f.v}
                  onClick={() => setFilter(f.v)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    filter === f.v ? 'bg-sky-500 text-white' : 'text-navy-500 hover:bg-cream-100'
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 rounded-full bg-sky-500 px-5 py-2.5 font-heading text-sm font-bold text-white transition hover:bg-sky-400"
            >
              <Plus className="h-4 w-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Product table */}
        <div className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft">
          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="mb-3 h-12 w-12 text-navy-400" />
              <p className="font-heading text-base font-semibold text-navy-600">No products found</p>
              <p className="mt-1 text-sm text-navy-400">
                {search || filter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'Add your first product to get started.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-cream-200 bg-cream-50 text-xs font-bold uppercase tracking-wide text-navy-400">
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3 text-right">Price</th>
                    <th className="px-5 py-3 text-center">Stock</th>
                    <th className="px-5 py-3 text-center">Visible</th>
                    <th className="px-5 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {filtered.map((p) => {
                    const discount = p.original_price
                      ? Math.round((1 - p.price / p.original_price) * 100)
                      : 0;
                    return (
                      <tr key={p.id} className="transition hover:bg-cream-50">
                        {/* Product */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-12 w-12 shrink-0 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                              <p className="truncate font-heading text-sm font-bold text-navy-600">{p.name}</p>
                              <div className="mt-0.5 flex items-center gap-2">
                                <span className="text-xs text-navy-400">/{p.slug}</span>
                                {p.is_new && (
                                  <span className="rounded-full bg-grass-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-grass-500">
                                    New
                                  </span>
                                )}
                                {p.badge && (
                                  <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-sky-500">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Category */}
                        <td className="px-5 py-3">
                          <span className="text-sm text-navy-500">{p.category_name}</span>
                        </td>
                        {/* Price */}
                        <td className="px-5 py-3 text-right">
                          <div>
                            <span className="font-heading text-sm font-bold text-navy-600">
                              {formatPKR(p.price)}
                            </span>
                            {p.original_price && (
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-xs text-navy-400 line-through">
                                  {formatPKR(p.original_price)}
                                </span>
                                {discount > 0 && (
                                  <span className="text-[10px] font-bold text-pink-500">-{discount}%</span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        {/* Stock — quick edit */}
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleStockChange(p, p.stock - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-lg border border-cream-200 text-navy-500 transition hover:bg-cream-100"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setProducts((prev) =>
                                  prev.map((it) =>
                                    it.id === p.id ? { ...it, stock: Math.max(0, val) } : it,
                                  ),
                                );
                              }}
                              onBlur={(e) => handleStockChange(p, Number(e.target.value))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                              }}
                              className={`w-14 rounded-lg border border-cream-200 px-2 py-1 text-center text-sm font-semibold text-navy-600 outline-none focus:border-sky-500 ${
                                p.stock === 0
                                  ? 'text-pink-500'
                                  : p.stock <= 5
                                  ? 'text-sunshine-600'
                                  : ''
                              }`}
                            />
                            <button
                              onClick={() => handleStockChange(p, p.stock + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-lg border border-cream-200 text-navy-500 transition hover:bg-cream-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        {/* Visible toggle */}
                        <td className="px-5 py-3 text-center">
                          <button
                            onClick={() => handleToggleActive(p)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                              p.is_active ? 'bg-grass-500' : 'bg-navy-400/40'
                            }`}
                            aria-label={p.is_active ? 'Hide product' : 'Show product'}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                                p.is_active ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="rounded-lg p-2 text-navy-500 transition hover:bg-sky-500/10 hover:text-sky-500"
                              aria-label="Edit product"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(p)}
                              className="rounded-lg p-2 text-navy-500 transition hover:bg-pink-500/10 hover:text-pink-500"
                              aria-label="Delete product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <ProductFormModal
        open={modalOpen}
        product={editing}
        onClose={() => setModalOpen(false)}
        onSaved={fetchProducts}
      />

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-800/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-fade-up rounded-4xl border border-cream-200 bg-cream-50 p-6 shadow-float">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/15">
                <Trash2 className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-600">Delete product?</h3>
                <p className="text-sm text-navy-400">This action cannot be undone.</p>
              </div>
            </div>
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-cream-200 bg-white p-3">
              <img src={deleteTarget.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="font-heading text-sm font-bold text-navy-600">{deleteTarget.name}</p>
                <p className="text-xs text-navy-400">{formatPKR(deleteTarget.price)}</p>
              </div>
            </div>
            {deleteError && (
              <p className="mb-4 rounded-xl border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-600">
                {deleteError}
              </p>
            )}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setDeleteError(null); }}
                className="rounded-full border border-cream-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-500 transition hover:bg-cream-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 font-heading text-sm font-bold text-white transition hover:bg-pink-600 disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Package;
  label: string;
  value: number;
  color: 'sky' | 'grass' | 'navy' | 'sunshine' | 'pink';
}) {
  const colorMap = {
    sky: 'bg-sky-500/10 text-sky-500',
    grass: 'bg-grass-500/10 text-grass-500',
    navy: 'bg-navy-500/10 text-navy-500',
    sunshine: 'bg-sunshine-500/15 text-sunshine-600',
    pink: 'bg-pink-500/10 text-pink-500',
  };
  return (
    <div className="rounded-3xl border border-cream-200 bg-white p-4 shadow-soft">
      <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${colorMap[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-heading text-2xl font-bold text-navy-600">{value}</p>
      <p className="text-xs font-semibold text-navy-400">{label}</p>
    </div>
  );
}
