module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // presets: [
  //   require('@acmecorp/base-tailwind-config')
  // ],
  theme: {
    extend: {
      colors: {
        sky: {
          500: '#16ABF8'
        },
        slate: {
          100: '#F4F4F4'
        }
      },
      fontSize: {
        '3xl': '36px',
        '2xl': '24px',
        'lg': '18px'
      },
    },
  },
  plugins: [],
}
