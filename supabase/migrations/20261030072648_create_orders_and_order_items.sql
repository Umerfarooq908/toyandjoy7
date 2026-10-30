/*
# Create orders and order_items tables for sales tracking

## Why
The admin dashboard needs real sales data (revenue, order count, top-selling
products). The checkout currently just shows a demo confirmation without
persisting anything. This migration adds the tables to store real orders and
their line items so the analytics card can display meaningful numbers.

## New Tables

### orders
- `id` (uuid, PK)
- `customer_name` (text)
- `customer_mobile` (text)
- `customer_email` (text, nullable)
- `shipping_address` (text)
- `city` (text)
- `province` (text)
- `postal_code` (text)
- `payment_method` (text)
- `subtotal` (int, in PKR)
- `discount` (int, in PKR, default 0)
- `shipping_cost` (int, in PKR, default 0)
- `total` (int, in PKR)
- `status` (text, default 'pending' — pending/confirmed/shipped/delivered/cancelled)
- `created_at` (timestamptz, default now())

### order_items
- `id` (uuid, PK)
- `order_id` (uuid, FK → orders.id ON DELETE CASCADE)
- `product_id` (uuid, FK → products.id ON DELETE SET NULL)
- `product_name` (text — snapshot in case product is later deleted)
- `product_slug` (text)
- `image` (text — snapshot for display)
- `unit_price` (int, in PKR)
- `quantity` (int, check >= 1)
- `line_total` (int, in PKR)
- `created_at` (timestamptz, default now())

## Indexes
- order_items.order_id for joining
- orders.created_at for date-range queries
- order_items.product_id for top-product aggregation

## Security
1. RLS enabled on both tables.
2. The storefront checkout runs as `anon` (no login required to buy), so
   INSERT on orders + order_items is granted to `anon, authenticated` with
   a permissive INSERT policy (anyone can place an order — this is normal
   for an e-commerce storefront).
3. SELECT/UPDATE/DELETE on orders and order_items is granted to
   `authenticated` only — only the signed-in admin can view or manage
   orders. The public cannot read order data.
4. order_items INSERT policy: anyone may insert (checkout). SELECT policy:
   authenticated only. No public UPDATE or DELETE.
*/

-- ===== Orders =====
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_mobile text NOT NULL,
  customer_email text,
  shipping_address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  payment_method text NOT NULL,
  subtotal int NOT NULL CHECK (subtotal >= 0),
  discount int NOT NULL DEFAULT 0 CHECK (discount >= 0),
  shipping_cost int NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  total int NOT NULL CHECK (total >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON orders TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON orders TO authenticated;

CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at DESC);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_orders" ON orders;
CREATE POLICY "admin_read_orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_update_orders" ON orders;
CREATE POLICY "admin_update_orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_orders" ON orders;
CREATE POLICY "admin_delete_orders"
  ON orders FOR DELETE
  TO authenticated
  USING (true);

-- ===== Order Items =====
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_slug text NOT NULL,
  image text NOT NULL,
  unit_price int NOT NULL CHECK (unit_price >= 0),
  quantity int NOT NULL CHECK (quantity >= 1),
  line_total int NOT NULL CHECK (line_total >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON order_items TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON order_items TO authenticated;

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items (product_id);

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_order_items" ON order_items;
CREATE POLICY "admin_read_order_items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_update_order_items" ON order_items;
CREATE POLICY "admin_update_order_items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_order_items" ON order_items;
CREATE POLICY "admin_delete_order_items"
  ON order_items FOR DELETE
  TO authenticated
  USING (true);
