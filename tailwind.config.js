/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}',
   "./public/index.html"
  ],
   
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Default sans-serif font
        bengali: ['Noto Sans Bengali', 'sans-serif'],
      },
      colors: {
        'brotecs-gray': '#f8f9fa',
        'brotecs-yellow': '#FFCB3B',
        'brotecs-green': '#29CF99',
        'brotecs-red': '#F45C5C',
        'brotecs-black': '#2C3E50',
        'brotecs-black-1': '#566573',
        'brotecs-black-2': '#808B9F',
        'brotecs-black-3': '#F7F7FACC',
        'brotecs-black-4': '#EAECEE',
        'brotecs-blue': '#3498DB',
        'brotecs-light-blue': '#B9E0FB',
        'brotecs-nion': '#E8F5FE',
        'brotecs-light-red': '#ff4a4a1a',
        'brotecs-rose': '#FF4A4A',
        'brotecs-white': '#f3f4f6',
        'brotecs-default': '#CED3D9',
        'brotecs-outline': '#f9fcfe',
        'brotecs-luna': '#FBFBFB99',
        'brotecs-snow': '#FBFBFB',
        scrollbarTrack: '#f3f4f6',
        scrollbarThumb: '#d1d5db',
        scrollbarDarkTrack: '#374151',
        scrollbarDarkThumb: '#6b7280',
       
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

