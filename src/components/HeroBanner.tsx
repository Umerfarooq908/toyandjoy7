import { ShoppingBag, Compass, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-sky-500 to-sky-400">
      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[18%] h-20 w-20 rounded-full bg-white/10 animate-float-slow" />
        <div className="absolute right-[42%] top-[60%] h-12 w-12 rounded-full bg-white/10 animate-float" />
        <div className="absolute left-[35%] top-[12%] h-3 w-3 rotate-45 bg-sunshine-500/60 animate-float-slow" />
        <div className="absolute right-[12%] top-[22%] h-4 w-4 rotate-45 bg-white/40 animate-float" />
        <Star className="absolute right-[30%] top-[15%] h-5 w-5 fill-white/30 text-white/30 animate-float-slow" />
        <Star className="absolute left-[18%] bottom-[20%] h-4 w-4 fill-sunshine-500/50 text-sunshine-500/50 animate-float" />
        {/* Clouds */}
        <svg className="absolute left-[5%] bottom-[10%] h-16 w-24 text-white/15 animate-float" viewBox="0 0 64 40" fill="currentColor">
          <ellipse cx="20" cy="24" rx="18" ry="12" />
          <ellipse cx="40" cy="20" rx="20" ry="16" />
        </svg>
        <svg className="absolute right-[8%] bottom-[8%] h-20 w-28 text-white/10 animate-float-slow" viewBox="0 0 64 40" fill="currentColor">
          <ellipse cx="20" cy="24" rx="18" ry="12" />
          <ellipse cx="40" cy="20" rx="20" ry="16" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Left — Text */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            <Star className="h-4 w-4 fill-sunshine-500 text-sunshine-500" />
            Pakistan's Happy Place for Toys &amp; Play
          </span>
          <h1 className="animate-fade-up mt-5 font-heading text-5xl font-bold leading-[1.1] text-white text-balance sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.1s' }}>
            Little Toys,<br />Big Joys!
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/90 lg:mx-0" style={{ animationDelay: '0.2s' }}>
            Discover exciting toys, creative games, and wonderful little surprises that inspire imagination, encourage learning, and fill childhood with happiness.
          </p>
          <div className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/shop"
              className="group flex items-center gap-2 rounded-full bg-sunshine-500 px-7 py-3.5 font-heading font-semibold text-navy-600 shadow-float transition hover:scale-105 hover:bg-sunshine-400"
            >
              <ShoppingBag className="h-5 w-5 transition group-hover:rotate-12" />
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading font-semibold text-navy-600 shadow-soft transition hover:scale-105"
            >
              <Compass className="h-5 w-5" />
              Explore Collections
            </Link>
          </div>
        </div>

        {/* Right — Toy arrangement */}
        <div className="order-1 lg:order-2">
          <div className="animate-slide-right relative mx-auto max-w-lg">
            {/* Main teddy */}
            <div className="relative z-10 mx-auto w-64 overflow-hidden rounded-[2.5rem] bg-white/20 shadow-float backdrop-blur sm:w-72 lg:w-80">
              <img
                src="https://images.pexels.com/photos/15130371/pexels-photo-15130371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Adorable brown teddy bear with a red scarf"
                className="h-80 w-full object-cover sm:h-96"
                loading="eager"
              />
            </div>
            {/* Floating toy cards */}
            <div className="absolute -left-4 top-6 hidden animate-float rounded-2xl bg-white p-2 shadow-card sm:block">
              <img src="https://images.pexels.com/photos/9271758/pexels-photo-9271758.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Wooden stacking rings toy" className="h-16 w-16 rounded-xl object-cover" />
            </div>
            <div className="absolute -right-2 top-12 hidden animate-float-slow rounded-2xl bg-white p-2 shadow-card sm:block" style={{ animationDelay: '1s' }}>
              <img src="https://images.pexels.com/photos/4406227/pexels-photo-4406227.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Yellow toy car" className="h-16 w-16 rounded-xl object-cover" />
            </div>
            <div className="absolute -left-2 bottom-8 hidden animate-float-slow rounded-2xl bg-white p-2 shadow-card sm:block" style={{ animationDelay: '0.5s' }}>
              <img src="https://images.pexels.com/photos/11140406/pexels-photo-11140406.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Wooden toy train" className="h-16 w-16 rounded-xl object-cover" />
            </div>
            <div className="absolute -right-4 bottom-4 hidden animate-float rounded-2xl bg-white p-2 shadow-card sm:block" style={{ animationDelay: '1.5s' }}>
              <img src="https://images.pexels.com/photos/7105805/pexels-photo-7105805.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Rocket toy" className="h-16 w-16 rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <svg className="block w-full" viewBox="0 0 1440 80" fill="#FFFFFF" preserveAspectRatio="none">
        <path d="M0 40 C 240 80 480 0 720 30 C 960 60 1200 10 1440 40 L 1440 80 L 0 80 Z" />
      </svg>
    </section>
  );
}
