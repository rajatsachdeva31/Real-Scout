/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        rubikLight: ["Rubik-Light", "sans-serif"],
        rubikMedium: ["Rubik-Medium", "sans-serif"],
        rubikBold: ["Rubik-Bold", "sans-serif"],
        rubikSemiBold: ["Rubik-SemiBold", "sans-serif"],
        rubikExtraBold: ["Rubik-ExtraBold", "sans-serif"],
      },
      colors: {
        primary: {
          default: "#0284C7",
          medium: "#0284C71A",
          light: "#0284C70A",
        },
        secondary: {
          default: "#191D31",
          medium: "#666876",
          light: "#8C8E98",
        },
        accent: "#FBFBFD",
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
