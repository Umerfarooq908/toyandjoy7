import { useState } from 'react';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || 'a Toy & Joy customer'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:toyandjoy007@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-cream-50 py-12">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-navy-500">
          Questions about a toy, your order, delivery, or returns? Reach out — we will get back to you as soon as we can.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href="mailto:toyandjoy007@gmail.com" className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft transition hover:border-sky-500">
            <Mail className="h-7 w-7 text-sky-500" />
            <h2 className="mt-3 font-heading text-base font-bold text-navy-600">Email</h2>
            <p className="mt-1 break-all text-sm text-navy-400">toyandjoy007@gmail.com</p>
          </a>
          <a href="https://wa.me/923402320338" target="_blank" rel="noreferrer" className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft transition hover:border-sky-500">
            <MessageCircle className="h-7 w-7 text-grass-500" />
            <h2 className="mt-3 font-heading text-base font-bold text-navy-600">WhatsApp / Phone</h2>
            <p className="mt-1 text-sm text-navy-400">0340 2320338</p>
          </a>
          <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
            <MapPin className="h-7 w-7 text-pink-500" />
            <h2 className="mt-3 font-heading text-base font-bold text-navy-600">Location</h2>
            <p className="mt-1 text-sm text-navy-400">Karachi, Pakistan</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
          <h2 className="font-heading text-lg font-bold text-navy-600">Follow Us</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://www.facebook.com/toyandjoy7" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-500">
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a href="https://www.instagram.com/toyandjoy7" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-400">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a href="https://www.tiktok.com/@toyjoy007" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-500">
              TikTok @toyjoy007
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
          <h2 className="font-heading text-lg font-bold text-navy-600">Send Us a Message</h2>
          <p className="mt-1 text-sm text-navy-400">
            Fill in the form and it will open your email app addressed to us — no account needed.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-navy-600">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-navy-600">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-navy-600">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full rounded-xl border border-cream-200 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400"
            >
              <Send className="h-5 w-5" /> Send via Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
