/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: "#1E201E",
        primary: {
          DEFAULT: "#EAB308", // Golden Yellow
          hover: "#FACC15",
        },
        secondary: {
          DEFAULT: "#2A352F", // Dark Greenish from footer
          hover: "#34423A",
        },
        text: {
          main: "#F3F4F6", // Gray 100
          muted: "#9CA3AF", // Gray 400
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'top' },
        }
      }
    },
  },
  plugins: [],
}
