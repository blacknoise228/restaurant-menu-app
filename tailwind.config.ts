import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media', // или 'class' для ручной темы
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

export default config
