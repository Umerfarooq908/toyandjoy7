import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Heart, Mail, MessageCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-cream-50 py-12">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">About Toy &amp; Joy</h1>
        <p className="mt-4 leading-relaxed text-navy-500">
          Toy &amp; Joy is an online toy store based in Karachi, Pakistan. We bring together
          wonderful toys, creative games, and playful discoveries to make childhood moments
          more memorable — from soft teddy bears and dolls to toy cars, building blocks,
          puzzles, and educational toys for every age.
        </p>
        <p className="mt-4 leading-relaxed text-navy-500">
          We deliver across Pakistan, with delivery in 1–2 days in Karachi and 3–7 days in
          other cities. Every order is confirmed personally with you, and we are always happy
          to help you pick the right toy for your child.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
            <Truck className="h-7 w-7 text-sky-500" />
            <h2 className="mt-3 font-heading text-base font-bold text-navy-600">Delivery Across Pakistan</h2>
            <p className="mt-1 text-sm text-navy-400">Karachi 1–2 days, other cities 3–7 days.</p>
          </div>
          <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
            <ShieldCheck className="h-7 w-7 text-grass-500" />
            <h2 className="mt-3 font-heading text-base font-bold text-navy-600">Easy Returns</h2>
            <p className="mt-1 text-sm text-navy-400">Returns and exchanges within 7 days of delivery, with refunds available.</p>
          </div>
          <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
            <Heart className="h-7 w-7 text-pink-500" />
            <h2 className="mt-3 font-heading text-base font-bold text-navy-600">Picked With Care</h2>
            <p className="mt-1 text-sm text-navy-400">Toys for every age, chosen to inspire imagination and learning.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
          <h2 className="font-heading text-lg font-bold text-navy-600">Get in Touch</h2>
          <p className="mt-2 text-sm text-navy-500">
            Questions about a toy, an order, or delivery? We would love to hear from you.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:toyandjoy007@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400"
            >
              <Mail className="h-5 w-5" /> toyandjoy007@gmail.com
            </a>
            <a
              href="https://wa.me/923402320338"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-grass-500 px-6 py-3 font-heading font-semibold text-white transition hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp: 0340 2320338
            </a>
          </div>
          <Link to="/contact" className="mt-4 inline-block text-sm font-semibold text-sky-500 transition hover:text-sky-400">
            Visit our Contact page →
          </Link>
        </div>
      </div>
    </div>
  );
}
