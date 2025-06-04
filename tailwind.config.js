/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#f58200"
          
        },
         blue: {
          500: "#0167F7"
        },
            animation: {
              'fade-in': 'fadeIn 0.5s ease-out',
              'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              },
              slideUp: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
            },
          

          primary: {
            50: '#0167F7',
            100: '#0167F7',
            200: '#0167F7',
            300: '#0167F7',
            400: '#0167F7',
            500: '#0167F7',
            600: '#0167F7',
            700: '#0167F7',
            800: '#0167F7',
            900: '#0167F7',
            950: '#0167F7',
          },
         
          accent: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#FF9900',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
            950: '#431407',
          },

        },
        fontFamily: {
          sans: ['Inter', 'sans-serif', 'Prosto One'],
        },
        boxShadow: {
          card: '0 2px 10px rgba(0, 0, 0, 0.05)',
          dropdown: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }
      },
    },
    plugins: [],
  }