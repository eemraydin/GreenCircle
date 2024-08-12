/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#005435",
        primaryLight: "#D3DBD8",
        primaryStrong: "#007E4C",
        primaryDark: "#003B22",

        accent: "#5940c1",
        accentStrong: "#49379c",
        accentDark: "#3f337c",
        error: "#c70e0e",
        black: "#131313",
        black2: "#121212",

        //Grays:
        gray100: "#6D6D6D",
        gray200: "#5D5D5D",
        gray300: "#4F4F4F",
        gray400: "#454545",
        gray500: "#3D3D3D",
        gray600: "#757575",
        gray700: "#616161",

        //Whites:

        white: "#FFFFFF",
        white100: "#F7F8FB",
        white200: "#BDBDBD",
        white300: "#989898",
        white400: "#7C7C7C",
      },
      fontFamily: {
        redhat: ["Red Hat Display", "sans-serif"],
        redhatSemi: ["Red Hat Display SemiBold", "sans-serif"], // font weight 600
        redhatBold: ["Red Hat Display Bold", "sans-serif"], // font weight 700
        redhatExtra: ["Red Hat Display ExtraBold", "sans-serif"], // font weight 800
        redhatText: ["Red Hat Text", "sans-serif"],
        redhatTextBold: ["Red Hat Text Bold", "sans-serif"],
        redhatTextSemi: ["Red Hat Text SemiBold", "sans-serif"],
        redhatTextLight: ["Red Hat Text Light", "sans-serif"],
      },
      borderRadius: {
        m: "10",
      },
      height: {
        10: ".9375rem",
      },
      fontSize: {
        10: "10px",
        14: "14px",
        28: "28px",
        32: "32px",
        40: "40px",
      },
    },
  },
  plugins: [],
};
