/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // ------------------------------------------------------------
      // PALETTE — “quiet luxury” scheme from color research: jewel
      // darks + muted bronze + warm sand (per 2025-26 luxury-travel
      // brand practice). Token names kept stable across the codebase;
      // only values changed. Contrast: ink/white 18.2:1, bronze/ink
      // 5.9:1, ink/sand 16.1:1, eyebrow 5.0:1 — all AA or better.
      // ------------------------------------------------------------
      colors: {
        navy: {
          DEFAULT: '#121711',
          800: '#1A231A',
          700: '#243024',
          600: '#33422F',
        },
        gold: {
          DEFAULT: '#B08D57',
          light: '#D9C3A0',
          dark: '#7E6238',
        },
        cream: {
          DEFAULT: '#F5F1E8',
          dark: '#EAE3D3',
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
