import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PoliciesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
    }
  }, [location]);

  return (
    <div className="bg-cream-50 py-12">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">Store Policies</h1>

        <div className="mt-6 space-y-8 leading-relaxed text-navy-500">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Orders and Prices</h2>
            <p className="mt-2">
              Prices are listed in Pakistani rupees unless stated otherwise. An order is
              confirmed when Toy &amp; Joy contacts you using the details provided with your
              order. If an item is unavailable or a price is displayed incorrectly, we will
              contact you to discuss the next steps.
            </p>
          </section>

          <section id="delivery" className="scroll-mt-32">
            <h2 className="font-heading text-xl font-bold text-navy-600">Delivery</h2>
            <p className="mt-2">
              Toy &amp; Joy delivers across Pakistan. Estimated delivery time is 1–2 days in
              Karachi and 3–7 days in other cities after order confirmation. Delivery charges
              are confirmed when we contact you to confirm your order. Delivery times may
              change due to courier or other circumstances.
            </p>
            <p className="mt-2">
              We accept Cash on Delivery, Bank Transfer, Easypaisa, JazzCash, and Card payments.
              For Bank Transfer, Easypaisa, JazzCash, and Card payments, the payment details
              will be shared with you when we contact you to confirm your order.
            </p>
          </section>

          <section id="returns" className="scroll-mt-32">
            <h2 className="font-heading text-xl font-bold text-navy-600">Cancellations, Returns, and Refunds</h2>
            <p className="mt-2">
              To cancel an order, contact us as soon as possible at{' '}
              <a href="mailto:toyandjoy007@gmail.com" className="font-semibold text-sky-500 hover:text-sky-400">
                toyandjoy007@gmail.com
              </a>{' '}
              or on WhatsApp at{' '}
              <a href="https://wa.me/923402320338" target="_blank" rel="noreferrer" className="font-semibold text-sky-500 hover:text-sky-400">
                0340 2320338
              </a>
              . Return and exchange requests must be made within 7 days of delivery. Items must
              be unused and in original packaging.
            </p>
            <p className="mt-2">
              If an item arrives damaged, defective, or incorrect, contact us within 7 days
              with your order details and photos. Approved refunds, replacements, or exchanges
              will be handled via the original payment method where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Product Information and Safety</h2>
            <p className="mt-2">
              We aim to provide accurate product descriptions, prices, images, and age
              recommendations. Please read each toy&rsquo;s age guidance and safety instructions
              before use. Adult supervision may be needed.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Contact</h2>
            <ul className="mt-2 list-inside list-disc">
              <li>Toy &amp; Joy</li>
              <li>
                Email:{' '}
                <a href="mailto:toyandjoy007@gmail.com" className="font-semibold text-sky-500 hover:text-sky-400">
                  toyandjoy007@gmail.com
                </a>
              </li>
              <li>
                Phone/WhatsApp:{' '}
                <a href="https://wa.me/923402320338" target="_blank" rel="noreferrer" className="font-semibold text-sky-500 hover:text-sky-400">
                  0340 2320338
                </a>
              </li>
              <li>Address: Karachi, Pakistan</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
