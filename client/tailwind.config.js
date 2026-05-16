/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#FFFFFF',
        'secondary-bg': '#F8F8F8',
        'card-bg': '#FFFFFF',
        'contrast-bg': '#111111',
        'soft-black': '#1A1A1A',
        'border-light': '#E5E5E5',
        'text-primary': '#111111',
        'text-secondary': '#666666',
        'text-light': '#999999',
        'gold-accent': '#C9A227',
        'gold-hover': '#D4AF37',
        'success': '#2E7D32',
        'error': '#C62828',
      },
      boxShadow: {
        luxury: '0 4px 20px rgba(0, 0, 0, 0.06)',
        'luxury-hover': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-down': 'fadeDown 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
