import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-cream-50 px-4 py-20 text-center">
      <p className="font-heading text-7xl font-bold text-sky-500">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold text-navy-600">Page Not Found</h1>
      <p className="mt-3 max-w-md text-navy-400">
        Sorry, the page you are looking for does not exist or has moved. Let&rsquo;s get you
        back to the toys!
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-full bg-sunshine-500 px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-sunshine-400"
        >
          Back to Home
        </Link>
        <Link
          to="/shop"
          className="rounded-full border border-cream-200 bg-white px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-cream-100"
        >
          Browse Toys
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-cream-200 bg-white px-6 py-3 font-heading font-semibold text-navy-600 transition hover:bg-cream-100"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
