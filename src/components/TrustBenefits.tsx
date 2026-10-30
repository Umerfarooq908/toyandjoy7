import { Truck, Gift, Wallet, Headset } from 'lucide-react';

const benefits = [
  { icon: Truck, bg: 'bg-sky-500', title: 'Nationwide Delivery', desc: 'Bringing happiness across Pakistan.' },
  { icon: Gift, bg: 'bg-pink-500', title: 'Carefully Packed', desc: 'Packed with care for every order.' },
  { icon: Wallet, bg: 'bg-grass-500', title: 'Convenient Payments', desc: 'Simple and convenient checkout.' },
  { icon: Headset, bg: 'bg-orange-500', title: 'Friendly Support', desc: 'Here to help with your questions.' },
];

export default function TrustBenefits() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`flex items-center gap-4 ${
                i !== benefits.length - 1 ? 'lg:border-r lg:border-cream-200' : ''
              } ${i % 2 === 0 ? 'border-r border-cream-200 lg:border-r' : ''} pr-4`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${b.bg} text-white shadow-soft`}>
                <b.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-navy-600">{b.title}</p>
                <p className="text-xs text-navy-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
