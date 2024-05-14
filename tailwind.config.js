/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],// Defines the paths to the files that Tailwind should scan for classes
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

