import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        't-main': '#888888',
        't-main-2': '#1e1e1e',
        't-hover-1': '#c4c4c4',
        't-hover-2': '#cc67ff',
        't-hover-3': '#ca92ff',
        't-hover-4': '#9f9f9f',
        't-hover-5': '#71C2FF',
        't-hover-6': '#7fdaff',
      },
      backgroundImage: {
        'grad-1': "linear-gradient(175deg, rgba(189,113,255,1) 0%, rgba(198,94,255,1) 18%, rgba(197,93,255,1) 39%, rgba(205,96,255,1) 71%, rgba(190,116,255,1) 100%)",
        'grad-2': "linear-gradient(175deg, rgba(200,137,255,1) 0%, rgba(211,131,255,1) 18%, rgba(211,134,255,1) 39%, rgba(217,135,255,1) 71%, rgba(204,146,255,1) 100%)",
        'grad-3': 'linear-gradient(175deg, rgba(105,189,255,1) 0%, rgba(72,175,251,1) 18%, rgba(72,189,255,1) 61%, rgba(121,193,255,1) 100%)',
        'grad-4': 'linear-gradient(175deg, rgba(122,197,255,1) 0%, rgba(113,194,255,1) 18%, rgba(108,202,255,1) 61%, rgba(146,205,255,1) 100%)',
        'grad-5': 'linear-gradient(0deg, rgba(0,0,0,0.6811099439775911) 0%, rgba(0,0,0,0) 69%)',

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
    },
  },
  plugins: [],
};
export default config;
