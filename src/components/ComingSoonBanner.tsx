// Temporary Coming Soon page — remove when Toy & Joy goes live.
import { Facebook, Instagram, Mail, MessageCircle, Music2 } from 'lucide-react';
import Logo from './Logo';

const links = [
  { label: 'WhatsApp: 0340 2320338', href: 'https://wa.me/923402320338', Icon: MessageCircle },
  { label: 'toyandjoy007@gmail.com', href: 'mailto:toyandjoy007@gmail.com', Icon: Mail },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61596080008458', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/toyandjoy007', Icon: Instagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@toyjoy007', Icon: Music2 },
];

export default function ComingSoonBanner() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-500 to-sky-400 px-4 py-16 text-center">
      <div className="rounded-2xl bg-white px-5 py-3 shadow-card">
        <Logo />
      </div>
      <h1 className="mt-8 font-heading text-7xl font-bold leading-none tracking-tight text-white sm:text-8xl lg:text-9xl">
        COMING SOON
      </h1>
      <p className="mt-8 font-heading text-3xl font-semibold text-sunshine-500 sm:text-4xl lg:text-5xl">
        We Will Be Live Soon!
      </p>
      <p className="mt-6 max-w-md text-white/90">
        Toy &amp; Joy — toys for kids aged 1–15, in Karachi, Pakistan.
        Little Toys, Big Joys!
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-600 shadow-soft transition hover:bg-cream-100"
          >
            <Icon className="h-4 w-4" /> {label}
          </a>
        ))}
      </div>
    </section>
  );
}
