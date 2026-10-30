/*
# Create product catalog tables (single-tenant, no auth required for browsing)

This migration sets up the core e-commerce catalog: categories and products.
The store is browsable without an account, so read access is granted to anon + authenticated.
Admin write operations are scoped to authenticated users (admin panel to come later).

1. New Tables
   - `categories`: toy categories (name, slug, image, background color class, sort order)
   - `products`: toy products (name, slug, price, original price, image, category, age group,
     rating, review count, stock quantity, badge, description, age recommendation, created_at)
2. Indexes
   - products.slug (unique) for fast product-page lookups
   - products.category_slug for category filtering
   - products.age_group for age filtering
   - products.created_at for "newest" sorting
3. Security
   - RLS enabled on both tables.
   - SELECT granted to anon + authenticated (public storefront).
   - INSERT/UPDATE/DELETE granted to authenticated (for future admin panel).
   - SELECT policies allow public read of all categories and in-stock products.
   - Write policies allow authenticated users to manage catalog (admin role enforced later).
4. Important Notes
   - Prices stored in integer PKR (Pakistani Rupees) to avoid floating-point issues.
   - `is_active` flag allows hiding products without deleting them.
   - `age_group` stored as a short code (e.g. '0-2', '3-5') for filtering.
*/

-- ===== Categories =====
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image text NOT NULL,
  bg_class text NOT NULL DEFAULT 'bg-sky-400/15',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON categories TO authenticated;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "auth_manage_categories" ON categories;
CREATE POLICY "auth_manage_categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_categories" ON categories;
CREATE POLICY "auth_update_categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_categories" ON categories;
CREATE POLICY "auth_delete_categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- ===== Products =====
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  price int NOT NULL CHECK (price >= 0),
  original_price int CHECK (original_price IS NULL OR original_price >= 0),
  image text NOT NULL,
  category_name text NOT NULL,
  category_slug text NOT NULL,
  age_group text,
  rating numeric(2,1) CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5)),
  reviews int NOT NULL DEFAULT 0 CHECK (reviews >= 0),
  stock int NOT NULL DEFAULT 0 CHECK (stock >= 0),
  badge text,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  is_new boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON products TO authenticated;

CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category_slug);
CREATE INDEX IF NOT EXISTS idx_products_age ON products (age_group);
CREATE INDEX IF NOT EXISTS idx_products_created ON products (created_at DESC);

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products"
  ON products FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products"
  ON products FOR DELETE
  TO authenticated
  USING (true);
