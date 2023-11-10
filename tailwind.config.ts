import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        't-main': '#888888',
        't-main-2': '#1e1e1e',
        't-main-3': '#2c2c2c',
        't-pop-1': '#b27a62',
        't-hover-1': '#c7c7c7',
        't-hover-2': '#cc67ff',
        't-hover-3': '#d886fc',
        't-hover-4': '#9f9f9f',
        't-hover-5': '#71C2FF',
        't-hover-6': '#7fdaff',
        't-error': '#d02d1e',
      },
      backgroundImage: {
        'grad-1': "linear-gradient(175deg, rgba(189,113,255,1) 0%, rgba(198,94,255,1) 18%, rgba(197,93,255,1) 39%, rgba(205,96,255,1) 71%, rgba(190,116,255,1) 100%)",
        'grad-2': "linear-gradient(175deg, rgba(200,137,255,1) 0%, rgba(211,131,255,1) 18%, rgba(211,134,255,1) 39%, rgba(217,135,255,1) 71%, rgba(204,146,255,1) 100%)",
        'grad-3': 'linear-gradient(175deg, rgba(105,189,255,1) 0%, rgba(72,175,251,1) 18%, rgba(72,189,255,1) 61%, rgba(121,193,255,1) 100%)',
        'grad-4': 'linear-gradient(175deg, rgba(122,197,255,1) 0%, rgba(113,194,255,1) 18%, rgba(108,202,255,1) 61%, rgba(146,205,255,1) 100%)',
        'grad-5': 'linear-gradient(0deg, rgba(0,0,0,0.6811099439775911) 0%, rgba(0,0,0,0) 69%)',
        'grad-6': 'linear-gradient(103deg, rgba(74,74,74,1) 0%, rgba(62,62,62,1) 42%, rgba(69,69,69,1) 99%)',


      },
    },
    screens: {
      xl: {max: "1279px"},
      // => @media (max-width: 1279px) { ... }

      lg: {max: "1023px"},
      // => @media (max-width: 1023px) { ... }

      md: {max: "767px"},
      // => @media (max-width: 767px) { ... }

      sm: {max: "639px"},
      // => @media (max-width: 639px) { ... }

      xs: {max: "400px"},
      // => @media (max-width: 400px) { ... }
    },
  container: {
    padding: {
      DEFAULT: '1.3vw'
    },
  },
  },
  plugins: [],
};
export default config;
