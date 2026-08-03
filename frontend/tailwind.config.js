/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-deep': '#0a0a0a',
        'gray-dark': '#1a1a1a',
        'gray-mid': '#4a4a4a',
        'gray-light': '#f5f5f5',
        'white-pure': '#ffffff',
        'gold': '#c9a94e',
        'gold-light': '#dbb95e',
        'overlay': '#2a2a2a',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.1)',
        'card-hover': '0 20px 40px rgba(0,0,0,0.2)',
        'nav': '0 4px 30px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%': { boxShadow: '0 0 0 0 rgba(201, 169, 78, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(201, 169, 78, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(201, 169, 78, 0)' },
        },
      },
    },
  },
  plugins: [],
}