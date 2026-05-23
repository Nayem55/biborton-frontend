/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Pages_old/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#b82332",
          gold: "#c79a2b",
          ivory: "#f8f3eb",

          secondary: "#1f1f1f",

          // accent: "#ffffff",

          neutral: "#191D24",

          "base-100": "#f8f3eb",
          "base-content": "#1f1f1f",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#f62e36",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-Figtree)', 'Playfair Display', 'serif'],
      },
      // fontFamily: {
      //   serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      //   sans: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      // },
    },
  },
  plugins: [require("daisyui")],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
};
