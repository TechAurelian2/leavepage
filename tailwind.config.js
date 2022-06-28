const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: {
    files: ['./page/**/*.{html,js}'],
  },
  theme: {
    fontFamily: {
      'sans': ['Pacifico', ...defaultTheme.fontFamily.sans],
      'serif': [...defaultTheme.fontFamily.serif],
      'mono': [...defaultTheme.fontFamily.mono]
    },
  },
}
