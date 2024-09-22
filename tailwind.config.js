/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      },
      dropShadow: {
        'card-hover': '0px 4px 8px rgba(59, 130, 246, 1)'
      }
    }
  },
  variants: {
    extend: {
      dropShadow: ['hover']
    }
  },
  plugins: []
}
