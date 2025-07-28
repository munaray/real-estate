/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#0061FF',
          2: 'rgba(0, 97, 255, 0.1)',
          3: 'rgba(0, 97, 255, 0.05)',
        },
        black: {
          1: '#191D31',
          2: '#666876',
          3: '#8C8E98',
        },
        gradient: {
          blue1: '#006CBD',
          blue2: '#0067B6',
          blue3: '#005AA3',
          blue4: '#004F94',
        }
      },
      fontFamily: {
        'rubik': ['Rubik-Regular', 'Rubik', 'sans-serif'],
        'rubik-medium': ['Rubik-Medium', 'Rubik', 'sans-serif'],
        'rubik-bold': ['Rubik-Bold', 'Rubik', 'sans-serif'],
        'rubik-black': ['Rubik-Black', 'Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
