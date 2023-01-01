const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  safelist: [
    'mr-1',
    'opacity-20',
    'hover:opacity-60',
    'text-base',
    'font-bold',
    'inline-block',
    'align-middle',
    'relative',
    '-mt-1'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('daisyui'),
    plugin(function ({ addVariant }) {
      // Allows us to specify mobile-only breakpoints like 'mobile-only:!bg-green-500'
      addVariant('mobile-only', "@media screen and (max-width: theme('screens.sm'))");
    })
  ],
  daisyui: {
    themes: ['fantasy', 'night'],
    darkTheme: 'night'
  }
};
