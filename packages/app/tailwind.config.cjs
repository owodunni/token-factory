const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
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
