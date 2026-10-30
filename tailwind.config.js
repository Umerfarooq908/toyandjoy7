/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          400: '#65CEFF',
          500: '#29B6F6',
        },
        sunshine: {
          400: '#FFE15C',
          500: '#FFD32A',
          600: '#E8B800',
        },
        navy: {
          400: '#3D5A85',
          500: '#1E3A66',
          600: '#132B50',
          700: '#0E2240',
          800: '#0A1A33',
        },
        pink: {
          400: '#FF8FB8',
          500: '#FF6B9A',
          600: '#F0187A',
        },
        grass: {
          500: '#70C95B',
        },
        orange: {
          500: '#FF974D',
        },
        lavender: {
          200: '#F3ECFF',
          300: '#E9DCFF',
        },
        cream: {
          50: '#FFFDF7',
          100: '#FFF9EE',
          200: '#FFF3DB',
        },
      },
      fontFamily: {
        heading: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(19, 43, 80, 0.12)',
        card: '0 10px 30px -12px rgba(19, 43, 80, 0.18)',
        float: '0 20px 50px -20px rgba(19, 43, 80, 0.30)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(6deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pop': {
          '0%': { transform: 'scale(0)' },
          '70%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'slide-right': 'slide-right 0.8s ease-out both',
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        pop: 'pop 0.35s ease-out',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
