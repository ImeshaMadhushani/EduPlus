// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Add any other paths where Tailwind classes are used
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        secondary: '#F1F3F4',
        background: '#FFFFFF',
        text: '#202124',
        accent: '#F9AB00',
      },
    },
  },
  plugins: [],
};
