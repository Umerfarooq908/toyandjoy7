import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923402320338"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Toy & Joy on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-grass-500 text-white shadow-float transition hover:scale-110 hover:bg-grass-400"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
