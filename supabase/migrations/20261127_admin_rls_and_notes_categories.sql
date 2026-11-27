/*
# Admin-only writes + order notes + seed categories (run in the Supabase dashboard SQL Editor)

## Why
1. The admin allowlist in the website code (AuthContext) is client-side only.
   Supabase RLS still granted INSERT/UPDATE/DELETE on categories, products,
   orders and order_items to ANY authenticated user, so anyone who signed up
   could write to the catalogue or orders through the API. This migration
   restricts all writes (except public checkout inserts) to the store admin
   only: auth user 6c91020e-ddd7-4732-83e1-ed736d2c77ea (toyandjoy007@gmail.com).
2. Checkout collects "Order Notes" but the orders table has no notes column,
   so the note was silently dropped. This adds `orders.notes` (text, nullable).
3. The categories table was empty, and the admin product form can only pick
   a category from that table — so no product could be added at all. This
   seeds the 11 categories from src/data/catalog.ts (name + slug), including
   ride-on-toys. No products are added here.
4. Postal code is optional at checkout now, so orders.postal_code is made
   nullable (checkout sends an empty string when blank, which works either way).

## What stays public (needed for the shop to work)
- Anyone (anon) can READ active products and all categories.
- Anyone (anon) can INSERT an order + its order_items at checkout — that is
  how a customer places an order without an account. Customers can NEVER
  read, update or delete orders or order_items; only the admin can.
- Signed-in non-admin users can no longer read inactive products, orders,
  or order_items, and can no longer write anything.

## How to apply
Run this file in the Supabase dashboard SQL Editor for project
aptqijjljzifiebcyanh (it cannot be applied through the REST API).
It is safe to run more than once.
*/

-- ===== Order notes + postal code (from 20261121 migration, kept here so one run fixes it) =====
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE orders ALTER COLUMN postal_code DROP NOT NULL;

-- ===== Seed categories (safe to re-run: slugs that already exist are skipped) =====
INSERT INTO categories (name, slug, image, bg_class, sort_order) VALUES
  ('Remote Control Cars', 'remote-control-cars', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-sky-400/15', 1),
  ('Ride-On Toys', 'ride-on-toys', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-grass-500/15', 2),
  ('Toy Cars & Vehicles', 'toy-cars-vehicles', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-sky-400/15', 3),
  ('Dolls & Dollhouses', 'dolls-dollhouses', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-pink-400/15', 4),
  ('Teddy Bears & Plush Toys', 'teddy-bears-plush', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-pink-400/15', 5),
  ('Educational Toys', 'educational-toys', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-sunshine-500/15', 6),
  ('Building Blocks', 'building-blocks', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-sunshine-500/15', 7),
  ('Puzzles & Games', 'puzzles-games', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-lavender-300/40', 8),
  ('Baby Toys', 'baby-toddler-toys', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-pink-400/15', 9),
  ('Outdoor Toys', 'outdoor-toys', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-grass-500/15', 10),
  ('Arts & Crafts', 'arts-crafts', 'https://umerfarooq908.github.io/toyandjoy7/image.png', 'bg-sunshine-500/15', 11)
ON CONFLICT (slug) DO NOTHING;

-- ===== Admin-only writes =====
-- The admin is the Supabase Auth user for toyandjoy007@gmail.com.
-- auth.uid() is the signed-in user's id; only that one id may write.

-- Categories: drop the "any authenticated user may manage" policies, replace with admin-only.
DROP POLICY IF EXISTS "auth_manage_categories" ON categories;
DROP POLICY IF EXISTS "auth_update_categories" ON categories;
DROP POLICY IF EXISTS "auth_delete_categories" ON categories;
DROP POLICY IF EXISTS "admin_manage_categories" ON categories;
CREATE POLICY "admin_manage_categories"
  ON categories FOR ALL
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea')
  WITH CHECK (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');

-- Products: same — only the admin may insert, update or delete.
DROP POLICY IF EXISTS "auth_insert_products" ON products;
DROP POLICY IF EXISTS "auth_update_products" ON products;
DROP POLICY IF EXISTS "auth_delete_products" ON products;
DROP POLICY IF EXISTS "admin_manage_products" ON products;
CREATE POLICY "admin_manage_products"
  ON products FOR ALL
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea')
  WITH CHECK (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');

-- Products: only the admin may read inactive products (public storefront still sees active ones only).
DROP POLICY IF EXISTS "admin_read_all_products" ON products;
CREATE POLICY "admin_read_all_products"
  ON products FOR SELECT
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');

-- Orders: checkout insert stays open to everyone (anon + authenticated).
-- Reading, updating or deleting orders is admin-only.
DROP POLICY IF EXISTS "admin_read_orders" ON orders;
DROP POLICY IF EXISTS "admin_update_orders" ON orders;
DROP POLICY IF EXISTS "admin_delete_orders" ON orders;
CREATE POLICY "admin_read_orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');
CREATE POLICY "admin_update_orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea')
  WITH CHECK (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');
CREATE POLICY "admin_delete_orders"
  ON orders FOR DELETE
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');

-- Order items: checkout insert stays open to everyone.
-- Reading, updating or deleting order items is admin-only.
DROP POLICY IF EXISTS "admin_read_order_items" ON order_items;
DROP POLICY IF EXISTS "admin_update_order_items" ON order_items;
DROP POLICY IF EXISTS "admin_delete_order_items" ON order_items;
CREATE POLICY "admin_read_order_items"
  ON order_items FOR SELECT
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');
CREATE POLICY "admin_update_order_items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea')
  WITH CHECK (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');
CREATE POLICY "admin_delete_order_items"
  ON order_items FOR DELETE
  TO authenticated
  USING (auth.uid() = '6c91020e-ddd7-4732-83e1-ed736d2c77ea');
