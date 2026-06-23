/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Soft Gold
          light: '#E2C76A',
          dark: '#B08D2A',
        },
        secondary: {
          DEFAULT: '#FAFAFA', // Soft Ivory Background
          dark: '#F0F0F0',
        },
        accent: {
          DEFAULT: '#DDA7A5', // Dusty Rose
        },
        text: {
          DEFAULT: '#1A1A1A', // Deep Charcoal
          light: '#4A4A4A',
        }
      },
      fontFamily: {
        playfair: ['"Cormorant Garamond"', 'serif'],
        poppins: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
