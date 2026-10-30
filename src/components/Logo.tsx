interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/image.png"
      alt="Toy & Joy for kids"
      className={`h-auto w-[132px] object-contain sm:w-[166px] lg:w-[196px] ${className}`}
    />
  );
}
