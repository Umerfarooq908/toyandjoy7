import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/data/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setCategories(data ?? []);
      setLoading(false);
    }
    fetch();
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}

export function useProducts(options?: {
  categorySlug?: string;
  ageGroup?: string;
  isNew?: boolean;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (options?.categorySlug) {
        query = query.eq('category_slug', options.categorySlug);
      }
      if (options?.ageGroup) {
        query = query.eq('age_group', options.ageGroup);
      }
      if (options?.isNew) {
        query = query.eq('is_new', true);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setProducts(data ?? []);
      setLoading(false);
    }
    fetch();
    return () => { cancelled = true; };
  }, [options?.categorySlug, options?.ageGroup, options?.isNew, options?.limit]);

  return { products, loading, error };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setProduct(data);
      setLoading(false);
    }
    fetch();
    return () => { cancelled = true; };
  }, [slug]);

  return { product, loading, error };
}

export function useRelatedProducts(product: Product | null, limit = 4) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function fetch() {
      if (!product) return;
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category_slug', product.category_slug)
        .neq('id', product.id)
        .limit(limit);
      if (cancelled) return;
      setRelated(data ?? []);
      setLoading(false);
    }
    fetch();
    return () => { cancelled = true; };
  }, [product, limit]);

  return { related, loading };
}
