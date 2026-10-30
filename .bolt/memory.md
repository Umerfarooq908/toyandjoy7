# Project memory

## Product intent & audience

- E-commerce storefront selling physical products (e.g., "Soft Teddy Bear")
- Products organized by categories; supports badges like "New" and "Sale"
- Owner/operator manages product catalog via private admin panel (add, edit, remove, pricing, stock, visibility)

## Brand personality & voice

- Helpful, practical, conversational tone in UI copy and interactions
- Clear, plain-language explanations for non-technical users

## Visual design & UX direction

- Vite + React + Tailwind CSS + Lucide React icons (per `.bolt/prompt`)
- `@/` path alias maps to `src/`
- Production-quality, polished aesthetic — not cookie-cutter
- Product catalog displayed as card/grid layout (e-commerce convention)
- Admin panel matches storefront design language (shared Tailwind theme)
- Discreet "Admin" link in footer for admin access

## Decisions, constraints & rationale

- **Database**: Supabase (confirmed during admin build)
- **Auth**: Supabase Auth — admin signs in with email/password; first-time signup via "Create one" link
- **Admin panel built** with dashboard, product CRUD, stock quick-edit, visibility toggle, search/filter
- **RLS policies**: Public SELECT limited to active/visible products; authenticated users can SELECT all products (including hidden/inactive)
- Product form fields: name, price, original price (sale), image, category, age group, stock, badge, description, visibility toggle, new-arrival toggle; slug auto-generated from name
- Stock quick-edit via +/− buttons or direct input; saves on blur
- Delete requires double confirmation (permanent)
- Search by product name/category; filter by visible/hidden/low-stock
- Dashboard stats: product count, visible vs. hidden, low-stock and out-of-stock alerts
- No additional UI packages (per `.bolt/prompt`)
- AuthProvider wired in App.tsx; admin routes protected

## Open questions & assumptions

- Product data model confirmed during build: name, price, original_price, image, category, age_group, stock, badge, description, is_active/visible, is_new, slug
- RLS policies for INSERT/UPDATE/DELETE on products by authenticated users assumed set (may need verification)
- No explicit role-based auth — any authenticated user has admin access; single-admin assumption
- Image upload not yet implemented (image is a URL field)