module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        palet:{
          azultur:"#57adde",
          fucsia:"#c2175b",
          morado:"#9c27b0",
          azul:"#5627ae",
          limon:"#62c688",
        },
    },
  },
},
  daisyui: {
    themes: false,
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};

