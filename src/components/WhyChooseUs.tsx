import { Sparkles, Brain, MousePointerClick, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    bg: 'bg-sky-500',
    title: 'Thoughtfully Selected Toys',
    desc: 'We bring together toys designed to spark fun, curiosity, and creativity.',
  },
  {
    icon: Brain,
    bg: 'bg-grass-500',
    title: 'Fun Meets Learning',
    desc: 'Explore playful experiences that encourage discovery and imagination.',
  },
  {
    icon: MousePointerClick,
    bg: 'bg-pink-500',
    title: 'Simple Online Shopping',
    desc: 'Find wonderful toys through an easy and convenient shopping experience.',
  },
  {
    icon: HeartHandshake,
    bg: 'bg-orange-500',
    title: 'Friendly Customer Care',
    desc: "We're here to make your Toy & Joy experience easier.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-gradient-to-b from-cream-100 to-sky-400/10 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
            Why Families Love Toy &amp; Joy
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${f.bg} text-white shadow-soft`}>
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-600">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
