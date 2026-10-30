import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/data/types';
import { useCategories } from '@/hooks/useCatalog';
import { ageGroups } from '@/data/catalog';

interface ProductFormModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function ProductFormModal({ open, product, onClose, onSaved }: ProductFormModalProps) {
  const isEdit = !!product;
  const { categories } = useCategories();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [stock, setStock] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSlugTouched(false);
    setError(null);
    if (product) {
      setName(product.name);
      setSlug(product.slug);
      setPrice(String(product.price));
      setOriginalPrice(product.original_price ? String(product.original_price) : '');
      setImage(product.image);
      setCategorySlug(product.category_slug);
      setAgeGroup(product.age_group ?? '');
      setRating(product.rating ? String(product.rating) : '');
      setReviews(String(product.reviews));
      setStock(String(product.stock));
      setBadge(product.badge ?? '');
      setDescription(product.description ?? '');
      setIsActive(product.is_active);
      setIsNew(product.is_new);
    } else {
      setName(''); setSlug(''); setPrice(''); setOriginalPrice('');
      setImage(''); setCategorySlug(''); setAgeGroup(''); setRating('');
      setReviews('0'); setStock('0'); setBadge(''); setDescription('');
      setIsActive(true); setIsNew(false);
    }
  }, [open, product]);

  // Auto-slug on name change (only for new products or when slug not manually edited)
  useEffect(() => {
    if (!open) return;
    if (!isEdit && !slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, open, isEdit, slugTouched]);

  if (!open) return null;

  const selectedCategory = categories.find((c) => c.slug === categorySlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !slug.trim() || !price || !image.trim() || !categorySlug) {
      setError('Please fill in name, slug, price, image, and category.');
      return;
    }

    const priceNum = Math.round(Number(price));
    const origNum = originalPrice ? Math.round(Number(originalPrice)) : null;
    if (priceNum < 0 || (origNum !== null && origNum < 0)) {
      setError('Prices cannot be negative.');
      return;
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      price: priceNum,
      original_price: origNum,
      image: image.trim(),
      category_name: selectedCategory?.name ?? '',
      category_slug: categorySlug,
      age_group: ageGroup || null,
      rating: rating ? Number(rating) : null,
      reviews: reviews ? Math.max(0, Math.round(Number(reviews))) : 0,
      stock: Math.max(0, Math.round(Number(stock) || 0)),
      badge: badge.trim() || null,
      description: description.trim() || null,
      is_active: isActive,
      is_new: isNew,
    };

    setBusy(true);
    let result;
    if (isEdit && product) {
      result = await supabase.from('products').update(payload).eq('id', product.id);
    } else {
      result = await supabase.from('products').insert(payload);
    }
    setBusy(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-800/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="my-8 w-full max-w-2xl animate-fade-up rounded-4xl border border-cream-200 bg-cream-50 shadow-float">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 bg-white px-6 py-4 rounded-t-4xl">
          <h2 className="font-heading text-lg font-bold text-navy-600">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-navy-400 transition hover:bg-cream-100 hover:text-navy-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 rounded-xl border border-pink-500/40 bg-pink-500/10 px-4 py-3 text-sm font-semibold text-pink-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Slug */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">URL Slug *</label>
              <input
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Price (Rs.) *</label>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Original Price (Rs.)</label>
              <input
                type="number"
                min={0}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Optional — for sale items"
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Image URL *</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
              {image && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={image} alt="Preview" className="h-16 w-16 rounded-xl object-cover" />
                  <span className="text-xs text-navy-400">Preview</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Category *</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="">Select category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Age Group */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Age Group</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="">None</option>
                {ageGroups.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Stock</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Badge */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Badge</label>
              <input
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Best Seller"
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Rating (0–5)</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Reviews count */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Reviews Count</label>
              <input
                type="number"
                min={0}
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-cream-200 bg-white px-4 py-2.5 text-sm text-navy-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Toggles */}
            <div className="sm:col-span-2 flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm font-semibold text-navy-600">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-cream-200 text-sky-500 focus:ring-sky-500"
                />
                Visible in store
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-navy-600">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="h-4 w-4 rounded border-cream-200 text-grass-500 focus:ring-grass-500"
                />
                Mark as New Arrival
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-cream-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-500 transition hover:bg-cream-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="flex items-center gap-2 rounded-full bg-sky-500 px-6 py-2.5 font-heading text-sm font-bold text-white transition hover:bg-sky-400 disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
