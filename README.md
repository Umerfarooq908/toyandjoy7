# Toy & Joy

Toy & Joy is an online toy store based in Karachi, Pakistan. This repository
contains the storefront website: browse toys, add them to the cart, and place
an order. Orders are confirmed personally by Toy & Joy, and delivery takes
1–2 days in Karachi and 3–7 days in other cities.

- **Live site:** https://umerfarooq908.github.io/toyandjoy7/
- **Contact:** toyandjoy007@gmail.com · WhatsApp 0340 2320338
- **Social:** [Facebook](https://www.facebook.com/profile.php?id=61596080008458) ·
  [Instagram](https://www.instagram.com/toyandjoy007) ·
  [TikTok](https://www.tiktok.com/@toyjoy007)

## Tech stack

- React 18 + TypeScript + Vite 7
- Tailwind CSS 3
- React Router 7 (with a `BrowserRouter` basename of `/toyandjoy7/`)
- Supabase (`@supabase/supabase-js`) for the product catalogue and orders

## Run locally

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Environment variables

Create a `.env` file in the project root (never commit it). The variables
actually read by `src/lib/supabase.ts` are:

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous (public) key |

Without these, the site still loads, but the shop shows no products and
checkout reports that online ordering is unavailable while the store database
is being configured.

## Supabase setup

- Products, categories, orders, and order items live in Supabase. The table
  definitions are in `supabase/migrations/`.
- There is **no seed data in this repo** — products are managed through the
  admin panel (`/admin`) and the Supabase dashboard. The catalogue is left
  as-is by design; product changes are a separate discussion with the owner.
- The GitHub Pages deploy workflow (`.github/workflows/deploy.yml`) reads the
  same two variables from the repository secrets `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY`.

## Deployment

The site is deployed to GitHub Pages from the `Main` branch by
`.github/workflows/deploy.yml`: on every push to `Main` it runs `npm ci`,
builds with `npm run build`, and publishes `dist/`. The Vite `base` is
`/toyandjoy7/`, so the site is served at
`https://umerfarooq908.github.io/toyandjoy7/`. A build-time plugin copies
`dist/index.html` to `dist/404.html` so client-side routes work as a
single-page app on GitHub Pages.

## Payments, delivery, and returns

- Payment options: Cash on Delivery, Bank Transfer, Easypaisa, JazzCash, and
  Card. For Bank Transfer, Easypaisa, JazzCash, and Card, the payment details
  are shared with the customer when Toy & Joy contacts them to confirm the
  order.
- No delivery charge is shown on the website; delivery charges are confirmed
  when the order is confirmed.
- Delivery: Karachi 1–2 days, other cities 3–7 days.
- Returns and exchanges within 7 days of delivery; refunds are also
  available. See the Store Policies page (`/policies`) on the site.

## Known limitations

- **No card payment gateway yet.** Card is offered as a payment option, but
  there is no gateway integration — payment details are shared with the
  customer when the order is confirmed.
- **No customer accounts yet.** The header account button was removed; there
  is no customer sign-in. Account data, if created, is handled through
  Supabase authentication (see the Privacy Policy page on the site).
- **Admin access is restricted in code to toyandjoy007@gmail.com** (see
  `src/context/AuthContext.tsx` — public sign-up is removed and any other
  signed-in user is signed out). The Supabase migrations still grant
  product and order INSERT/UPDATE/DELETE to any authenticated Supabase user,
  so only the store owner should be given an authenticated account until a
  proper admin role check is added in the database too.
- **No customer reviews yet.** The previous hardcoded reviews were removed;
  the reviews section on the home page was removed with them. Real customer
  reviews can be added once they exist.
- The logo in use is `public/image.png`. `public/logo.svg` is unused and is
  not referenced anywhere.
