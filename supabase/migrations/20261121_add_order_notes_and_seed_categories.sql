/*
# Add order notes + seed categories (run in the Supabase dashboard SQL Editor)

## Why
1. Checkout collects "Order Notes" but the orders table has no notes column,
   so the note was silently dropped. This adds `orders.notes` (text, nullable)
   and the checkout now saves the note there.
2. The categories table was empty, and the admin product form can only pick
   a category from that table — so no product could be added at all. This
   seeds the 11 categories from src/data/catalog.ts (name + slug), including
   ride-on-toys. No products are added here.
3. Postal code is optional at checkout now, so the orders.postal_code
   column is made nullable (checkout sends an empty string when blank,
   which works either way).

## How to apply
Run this file in the Supabase dashboard SQL Editor for project
aptqijjljzifiebcyanh (it cannot be applied through the REST API).
It is safe to run more than once — the category insert skips slugs that
already exist.
*/

-- Order notes
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes text;

-- Postal code optional
ALTER TABLE orders ALTER COLUMN postal_code DROP NOT NULL;

-- Seed categories (image uses the Toy & Joy logo; bg_class/sort_order match the site)
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
