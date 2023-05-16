module.exports = {
  prefix: "sp-",
  content: [],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans TC"', "sans-serif"],
      // serif: ['Georgia', 'serif'],
      cursive: ["'Sigmar'", "cursive"],
    },
    extend: {
      colors: {
        primary: "#0C0D50",
        "primary-lighten": "#DFDFFF",
        secondary: "#B7EEEE",
        purple: "#5658FB",
        "v-orange": "#FF7A50",
        "v-gray":{
          default:"#F3F3F3",
          light:"#F3F3F3",
          dark:"#717171"
        }
      },
    },
  },
  plugins: [],
};
