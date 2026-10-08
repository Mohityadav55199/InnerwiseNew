/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        orange:      '#FE7209',
        ink:         '#2E2E2E',
        cream:       '#FAF5F2',
        'sky-blue':  '#47A3F8',
        'ice-blue':  '#E9F5FF',
        peach:       '#F9E8DF',
        placeholder: '#C2C2C2',
        'mid-grey':  '#686868',
        plum:        '#7A5495',
        sparkle:     '#FFCC03',
      },
      maxWidth: {
        content: '1075px',
        wide:    '1280px',
      },
      borderRadius: {
        pill: '100px',
        card: '10px',
        pillar: '20px',
      },
      boxShadow: {
        card:   '0 4px 12px rgba(0,0,0,0.25)',
        bubble: '0 4px 12.6px rgba(0,0,0,0.65)',
        avatar: '0 0 14.3px rgba(145,214,255,0.41)',
      },
      letterSpacing: {
        eyebrow: '0.08em',
        tight:   '-0.02em',
      },
      screens: {
        xs: '375px',
        sm: '430px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};
