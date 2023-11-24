const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light-blue': colors.blue,
        cyan: colors.cyan,
      },
    },
  },
  variants: {},
  plugins: [],
}

