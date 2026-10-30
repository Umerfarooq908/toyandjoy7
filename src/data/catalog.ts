import type { Review } from './types';

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Ayesha K.',
    verified: true,
    rating: 5,
    text: 'The teddy bear is incredibly soft and my daughter adores it. Delivery was quick and packaging was lovely!',
    product: 'Soft Teddy Bear',
    date: 'September 2026',
  },
  {
    id: 'r2',
    name: 'Bilal R.',
    verified: true,
    rating: 5,
    text: 'Great quality building blocks. My son spends hours creating new structures. Worth every rupee.',
    product: 'Magnetic Building Blocks',
    date: 'August 2026',
  },
  {
    id: 'r3',
    name: 'Fatima S.',
    verified: true,
    rating: 4,
    text: 'The toy kitchen set is adorable and well-made. My little one loves pretending to cook. Highly recommend!',
    product: 'Kids Toy Kitchen Set',
    date: 'August 2026',
  },
  {
    id: 'r4',
    name: 'Hamza A.',
    verified: true,
    rating: 5,
    text: 'Remote control car works perfectly on all surfaces. My nephew was thrilled with his birthday gift.',
    product: 'Remote Control Racing Car',
    date: 'July 2026',
  },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/shop' },
  { label: 'Shop by Category', href: '/shop', dropdown: 'category' },
  { label: 'Shop by Age', href: '/shop', dropdown: 'age' },
  { label: 'Best Sellers', href: '/#best-sellers' },
  { label: 'New Arrivals', href: '/#new-arrivals' },
  { label: 'Special Offers', href: '/#promo' },
  { label: 'About Us', href: '/#why-us' },
  { label: 'Contact Us', href: '/#footer' },
];

export const categoryDropdown = [
  { label: 'Remote Control Cars', slug: 'remote-control-cars' },
  { label: 'Toy Cars & Vehicles', slug: 'toy-cars-vehicles' },
  { label: 'Dolls & Dollhouses', slug: 'dolls-dollhouses' },
  { label: 'Teddy Bears & Plush Toys', slug: 'teddy-bears-plush' },
  { label: 'Educational Toys', slug: 'educational-toys' },
  { label: 'Building Blocks', slug: 'building-blocks' },
  { label: 'Puzzles & Games', slug: 'puzzles-games' },
  { label: 'Baby Toys', slug: 'baby-toddler-toys' },
  { label: 'Outdoor Toys', slug: 'outdoor-toys' },
  { label: 'Arts & Crafts', slug: 'arts-crafts' },
];

export const ageDropdown = [
  { label: '0–2 Years', value: '0-2' },
  { label: '3–5 Years', value: '3-5' },
  { label: '6–8 Years', value: '6-8' },
  { label: '9–12 Years', value: '9-12' },
  { label: '13+ Years', value: '13+' },
];

export const ageGroups = [
  { label: '0–2 Years', value: '0-2' },
  { label: '3–5 Years', value: '3-5' },
  { label: '6–8 Years', value: '6-8' },
  { label: '9–12 Years', value: '9-12' },
  { label: '13+ Years', value: '13+' },
];
