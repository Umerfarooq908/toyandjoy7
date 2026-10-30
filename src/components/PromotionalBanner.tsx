import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromotionalBanner() {
  return (
    <section id="promo" className="bg-cream-100 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-5xl bg-gradient-to-r from-sunshine-500 via-sunshine-400 to-sky-400 shadow-float">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
          <div className="pointer-events-none absolute -bottom-12 right-1/3 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-3xl font-bold leading-tight text-navy-600 sm:text-4xl lg:text-5xl">
                More Play.<br />More Smiles.<br />More Joy!
              </h2>
              <p className="mt-4 max-w-md text-navy-600/80 lg:text-lg">
                Make every playtime a new adventure with Toy &amp; Joy.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-600 px-7 py-3.5 font-heading font-semibold text-white shadow-soft transition hover:scale-105 hover:bg-navy-500"
              >
                Explore Toys <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative hidden h-48 items-center justify-center gap-3 lg:flex">
              <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-card animate-float">
                <img src="https://images.pexels.com/photos/15130371/pexels-photo-15130371.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Teddy bear" className="h-28 w-28 rounded-2xl object-cover" />
              </div>
              <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-card animate-float-slow mt-8" style={{ animationDelay: '0.5s' }}>
                <img src="https://images.pexels.com/photos/4406227/pexels-photo-4406227.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Toy car" className="h-28 w-28 rounded-2xl object-cover" />
              </div>
              <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <img src="https://images.pexels.com/photos/7105805/pexels-photo-7105805.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Rocket toy" className="h-28 w-28 rounded-2xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
