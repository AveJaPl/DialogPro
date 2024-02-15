/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Dodaj tę linię
  ],
  theme: {
    extend: {
      fontSize: {
        '7xl': '5rem',
        '2xs': '.625rem',
        '3xs': '.5rem',
      },
      height: {
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '200': '50rem',
      },
      bgColor: {
        'primary': '#FFA500',
        'secondary': '#FFD700',
        'user': '#FFD700',
        'bot': '#FFA500',
        'send-button': '#FFA500',
        'toggle-button': '#FFA500',
      },
    },
  },
  plugins: [],
}