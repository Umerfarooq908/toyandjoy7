// Temporary Coming Soon banner — remove when Toy & Joy goes live.
export default function ComingSoonBanner() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-500 to-sky-400 px-4 py-16 text-center">
      <h1 className="font-heading text-7xl font-bold leading-none tracking-tight text-white sm:text-8xl lg:text-9xl">
        COMING SOON
      </h1>
      <p className="mt-8 font-heading text-3xl font-semibold text-sunshine-500 sm:text-4xl lg:text-5xl">
        We Will Be Live Soon!
      </p>
    </section>
  );
}
