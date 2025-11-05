/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Alentejo earthy green (nature, cork oak, environmental theme)
        primary: {
          DEFAULT: '#2d5016',
          50: '#f3f7f0',
          100: '#e4eddc',
          200: '#ccdcbd',
          300: '#a9c494',
          400: '#86a96e',
          500: '#688d4f',
          600: '#517139',
          700: '#3f5a2d',
          800: '#354827',
          900: '#2d5016',
        },
        // Secondary: Sado River blue/green (water, nature reserve)
        secondary: {
          DEFAULT: '#0d7377',
          50: '#f0fafb',
          100: '#d9f2f4',
          200: '#b7e7eb',
          300: '#85d5dc',
          400: '#4dbbc6',
          500: '#32a0ab',
          600: '#2b8490',
          700: '#286b76',
          800: '#275861',
          900: '#0d7377',
        },
        // Accent: Warm cork/terracotta (traditional Alentejo, authenticity)
        accent: {
          DEFAULT: '#d4a574',
          50: '#faf7f3',
          100: '#f4ede3',
          200: '#e8d9c5',
          300: '#dbc0a1',
          400: '#d4a574',
          500: '#c88d59',
          600: '#ba7549',
          700: '#9b5f3d',
          800: '#7d4f37',
          900: '#66422f',
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
