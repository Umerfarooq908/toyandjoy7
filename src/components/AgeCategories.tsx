import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ageGroups } from '@/data/catalog';

const ageImages: Record<string, string> = {
  '0-2': 'https://images.pexels.com/photos/31152754/pexels-photo-31152754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '3-5': 'https://images.pexels.com/photos/7491112/pexels-photo-7491112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '6-8': 'https://images.pexels.com/photos/3661452/pexels-photo-3661452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '9-12': 'https://images.pexels.com/photos/15250000/pexels-photo-15250000.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '13+': 'https://images.pexels.com/photos/3697812/pexels-photo-3697812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const ageBgs: Record<string, string> = {
  '0-2': 'bg-pink-400/15',
  '3-5': 'bg-sunshine-500/15',
  '6-8': 'bg-sky-400/15',
  '9-12': 'bg-grass-500/15',
  '13+': 'bg-lavender-300/40',
};

const ageSubs: Record<string, string> = {
  '0-2': 'Baby Toys',
  '3-5': 'Early Learning',
  '6-8': 'Creative Play',
  '9-12': 'Games & Adventures',
  '13+': 'Hobbies & Challenges',
};

export default function AgeCategories() {
  return (
    <section id="age" className="bg-cream-100 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">
            Perfect Toys for Every Age!
          </h2>
          <p className="mt-3 text-navy-400">Find age-appropriate toys for every stage of childhood.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {ageGroups.map((age) => (
            <Link
              key={age.value}
              to={`/shop?age=${age.value}`}
              className={`group overflow-hidden rounded-3xl ${ageBgs[age.value]} p-4 text-center transition hover:-translate-y-1 hover:shadow-card`}
            >
              <div className="mx-auto mb-3 h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-soft transition group-hover:scale-105">
                <img src={ageImages[age.value]} alt={age.label} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="font-heading text-lg font-bold text-navy-600">{age.label}</p>
              <p className="text-xs text-navy-400">{ageSubs[age.value]}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-navy-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-500">
                Shop This Age <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
