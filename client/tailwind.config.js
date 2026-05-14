/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        'neon-blue': '#00D9FF',
        'neon-purple': '#C000FF',
        'dark-bg': '#060814',
        'dark-card': '#12182a',
        'luxury-gray': '#2D3142',
        champagne: '#c9a962',
        'champagne-muted': 'rgba(201, 169, 98, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-shine':
          'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
      },
      boxShadow: {
        luxury: '0 25px 80px -20px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(201, 169, 98, 0.08)',
        'luxury-glow': '0 0 60px rgba(0, 217, 255, 0.12), 0 0 100px rgba(201, 169, 98, 0.06)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'slow-pan': 'slow-pan 22s ease-in-out infinite',
        'orb-drift': 'orb-drift 18s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slow-pan': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(3%, -2%) scale(1.05)' },
        },
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(8%, -6%)' },
          '66%': { transform: 'translate(-5%, 4%)' },
        },
      },
    },
  },
  plugins: [],
}
