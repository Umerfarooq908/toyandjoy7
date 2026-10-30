import { useState } from 'react';
import { Mail, Gift, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setStatus(valid ? 'success' : 'error');
    if (valid) setEmail('');
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-5xl bg-gradient-to-r from-sky-500 to-sky-400 px-6 py-12 text-center shadow-float sm:px-12">
          {/* Decorative */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
          <Gift className="mx-auto mb-4 h-12 w-12 animate-float text-white" />

          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            A Little Joy in Your Inbox!
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Be the first to discover new toys, exciting collections, and special announcements.
          </p>

          {status === 'success' ? (
            <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white backdrop-blur">
              <Check className="h-5 w-5" /> Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full rounded-full border-0 bg-white py-3 pl-12 pr-4 text-sm text-navy-600 outline-none ring-2 ring-transparent transition focus:ring-sunshine-500"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-sunshine-500 px-7 py-3 font-heading font-semibold text-navy-600 transition hover:scale-105 hover:bg-sunshine-400"
              >
                Subscribe
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm font-semibold text-sunshine-500">Please enter a valid email address.</p>
          )}
        </div>
      </div>
    </section>
  );
}
