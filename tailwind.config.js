/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        // Add your custom background colors here
        'custom-bg': ' #D9D9D9', 
      },
      textColor: {
        // Add your custom text colors here
        'primary-text': 'black',
        'secondary-text':'#708090',
       
      },
    },
  },
  plugins: [],
}

