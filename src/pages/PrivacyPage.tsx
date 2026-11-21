export default function PrivacyPage() {
  return (
    <div className="bg-cream-50 py-12">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-navy-600 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: 21 November 2026</p>

        <div className="mt-6 space-y-6 leading-relaxed text-navy-500">
          <p>
            Toy &amp; Joy respects your privacy. This policy explains how we collect and use
            information when you visit or shop on our website.
          </p>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Information We Collect</h2>
            <p className="mt-2">
              We may collect your name, email address, phone number, delivery address, order
              details, and messages you send us. If you create an account, your account
              information is handled through our authentication provider, Supabase. We do not
              ask you to send us your password.
            </p>
            <p className="mt-2">
              Our website hosting and service providers may also collect basic technical
              information needed to operate and secure the website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">How We Use Your Information</h2>
            <p className="mt-2">
              We use your information to manage accounts, process and deliver orders, respond
              to questions, improve our services, and protect our website from misuse. We may
              send promotional messages if you have agreed to receive them.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Sharing Your Information</h2>
            <p className="mt-2">
              We do not sell your personal information. We may share relevant information with
              service providers when needed to operate the website, process payments, deliver
              orders, or comply with legal requirements.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Keeping Your Information</h2>
            <p className="mt-2">
              We keep information only for as long as needed to provide our services, manage
              transactions, resolve issues, or meet legal obligations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Your Choices</h2>
            <p className="mt-2">
              You may contact us to request access to, correction of, or deletion of your
              personal information. Some information may need to be retained for legal or
              transaction records.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Children&rsquo;s Privacy</h2>
            <p className="mt-2">
              Toy &amp; Joy sells toys, but purchases and website accounts should be managed by
              an adult. We do not knowingly ask children to create accounts or provide personal
              information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Changes to This Policy</h2>
            <p className="mt-2">
              We may update this policy from time to time. The latest version will be available
              on our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-600">Contact Us</h2>
            <p className="mt-2">
              For privacy questions or requests, contact us at:
            </p>
            <ul className="mt-2 list-inside list-disc">
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
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
