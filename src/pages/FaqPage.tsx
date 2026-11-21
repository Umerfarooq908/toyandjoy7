const faqs = [
  {
    q: 'How do I order a toy?',
    a: 'Browse the shop, add toys to your cart, and place your order at checkout. Toy & Joy will contact you on WhatsApp or by phone to confirm your order and share the payment details before anything is sent.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Cash on Delivery, Bank Transfer, Easypaisa, JazzCash, and Card (manual — we share the payment details when we contact you to confirm your order; no card payment is taken on this website).',
  },
  {
    q: 'How long does delivery take?',
    a: 'Delivery takes 1–2 days in Karachi and 3–7 days in other cities, after your order is confirmed.',
  },
  {
    q: 'Is delivery free?',
    a: 'Yes, delivery is free on orders over Rs 3,000. For smaller orders, the delivery charge is confirmed when we contact you to confirm your order.',
  },
  {
    q: 'What does "Order now — we get it for you" mean?',
    a: 'Some toys are not kept in stock. When you order one, Toy & Joy buys it for you after your order is confirmed, so it may take a little longer to arrive. We will tell you the full delivery time when we confirm your order.',
  },
  {
    q: 'Can I return or exchange a toy?',
    a: 'Yes — returns and exchanges are accepted within 7 days of delivery, as long as the item is unused and in its original packaging. If an item arrives damaged, defective, or incorrect, contact us within 7 days with photos.',
  },
  {
    q: 'What ages are the toys for?',
    a: 'Our toys are for kids aged 1–15. You can shop by age on the homepage or filter by age in the shop.',
  },
  {
    q: 'How can I contact Toy & Joy?',
    a: 'Email toyandjoy007@gmail.com, WhatsApp 0340 2320338, or message us on Facebook, Instagram (@toyandjoy007) or TikTok (@toyjoy007).',
  },
];

export default function FaqPage() {
  return (
    <div className="bg-cream-50 py-12">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-navy-500">
          Quick answers about ordering, delivery, payments, and returns.
        </p>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <h2 className="font-heading text-base font-bold text-navy-600">{f.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
