/*
# Allow authenticated admins to view all products (including inactive)

## Why
The storefront (anon role) must only see active products — that policy stays as-is.
But the admin panel is a signed-in (authenticated) experience that needs to see
ALL products, including ones toggled off (is_active = false), so the owner can
re-enable them. The current single SELECT policy (`public_read_products`) uses
`is_active = true`, which would hide inactive products from the admin too.

## Changes
- Adds a new SELECT policy `admin_read_all_products` scoped to `authenticated`
  with `USING (true)` — any signed-in user can read every product row.
- The existing anon SELECT policy (`public_read_products`) is untouched, so
  the public storefront continues to show only active products.
- No grants change (authenticated already has SELECT via the existing grant).

## Security notes
1. `USING (true)` here is intentional and safe: it only applies to the
   `authenticated` role (signed-in admin), not to the public `anon` role.
   The anon policy still enforces `is_active = true`.
2. This does not let random visitors see inactive products — only signed-in
   users. Admin write policies (insert/update/delete) were already open to
   authenticated in the original migration.
*/

DROP POLICY IF EXISTS "admin_read_all_products" ON products;
CREATE POLICY "admin_read_all_products"
  ON products FOR SELECT
  TO authenticated
  USING (true);
