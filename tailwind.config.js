/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Trustworthy deep navy blue
        primary: {
          DEFAULT: '#1A237E',
          50: '#E8EAF6',
          100: '#C5CAE9',
          200: '#9FA8DA',
          300: '#7986CB',
          400: '#5C6BC0',
          500: '#3F51B5',
          600: '#3949AB',
          700: '#303F9F',
          800: '#283593',
          900: '#1A237E',
        },
        // Secondary: Natural forest green
        secondary: {
          DEFAULT: '#2E7D32',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        // Accent: Energetic "sunshine" yellow for CTAs
        accent: {
          DEFAULT: '#FFD600',
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFEB3B',
          600: '#FDD835',
          700: '#FBC02D',
          800: '#F9A825',
          900: '#FFD600',
        },
        // Neutral: Clean, modern grays
        neutral: {
          white: '#FFFFFF',
          light: '#F1F5F9',
          gray: '#64748B',
          dark: '#1E293B',
          black: '#0F172A',
        }
      },
      fontFamily: {
        // Headings & UI: Modern, clean, strong
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        // Body text: Readable, warm, established
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      fontSize: {
        // Comfortable, accessible sizing
        'body': ['18px', { lineHeight: '1.75' }],
        'body-sm': ['16px', { lineHeight: '1.6' }],
      },
      spacing: {
        // Custom spacing for camp-appropriate layouts
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
