/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1B2D',
          800: '#16263D',
          700: '#1E3350',
          600: '#2A4468',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E3C05C',
          dark: '#A5851D',
        },
        cream: {
          DEFAULT: '#FAF6EF',
          dark: '#F0E9DB',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.05) translateY(0)' },
          '100%': { transform: 'scale(1.18) translateY(-2%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        curtain: {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
      },
      animation: {
        kenburns: 'kenburns 24s ease-in-out infinite alternate',
        marquee: 'marquee 45s linear infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        curtain: 'curtain 0.7s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
