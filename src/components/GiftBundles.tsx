import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';

// Gift ideas by budget, at the price points from the Pakistan
// toy market report (Rs 1,500 / Rs 3,000 / Rs 5,000). Each card links
// to the shop filtered to toys up to that price — these are not bundle
// products, just a way to shop gifts by budget.
const bundles = [
  {
    amount: 1500,
    title: 'Rs 1,500 Gifts',
    desc: 'Shop toys up to Rs 1,500 — perfect for Eid and small birthday surprises.',
    bg: 'bg-sky-400/15',
  },
  {
    amount: 3000,
    title: 'Rs 3,000 Gifts',
    desc: 'Shop toys up to Rs 3,000 — the Eid sweet spot for birthdays and Eidi.',
    bg: 'bg-sunshine-500/15',
  },
  {
    amount: 5000,
    title: 'Rs 5,000 Gifts',
    desc: 'Shop toys up to Rs 5,000 — a bigger Eid or birthday gift to remember.',
    bg: 'bg-pink-400/15',
  },
];

export default function GiftBundles() {
  return (
    <section id="gift-bundles" className="bg-cream-100 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
            Gift Ideas for Eid &amp; Birthdays
          </h2>
          <p className="mt-3 text-navy-400">
            Pick a price, and shop toys up to that amount.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {bundles.map((bundle) => (
            <Link
              key={bundle.amount}
              to={`/shop?price_max=${bundle.amount}`}
              className={`group rounded-3xl ${bundle.bg} p-6 text-center transition hover:-translate-y-1 hover:shadow-card`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-600 text-white shadow-soft">
                <Gift className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy-600">{bundle.title}</h3>
              <p className="mt-2 text-sm text-navy-400">{bundle.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-navy-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-navy-500">
                Shop Toys up to Rs {bundle.amount.toLocaleString('en-PK')} <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
