import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const messages = [
  'Welcome to Toy & Joy — Where Every Toy Brings a Smile!',
  'Discover Toys Delivered Across Pakistan!',
  'Little Toys, Big Joys!',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 5000);
    return () => clearInterval(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="relative z-50 flex items-center justify-center bg-pink-600 px-10 py-2 text-white">
      <Sparkles className="mr-2 h-4 w-4 shrink-0 animate-float" />
      <p
        key={index}
        className="animate-fade-in text-center text-sm font-semibold tracking-wide"
      >
        {messages[index]}
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-3 rounded-full p-1 transition hover:bg-white/20"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
