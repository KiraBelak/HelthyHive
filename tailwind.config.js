module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salud: {
          primary: "#5D9F6B",
          secondary: "#E5B54B",
          secondary2: "#87868A",
          tercary: "#F097D1",
          accent: "#3B7DE5",
          accent2: "#80DEE4",
          white: "#F0F0F0",
          black: "#201919",
        },
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
