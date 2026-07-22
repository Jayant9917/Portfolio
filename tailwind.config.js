/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#e5e7eb',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#3b82f6',
              },
            },
            h1: {
              color: '#f9fafb',
              fontWeight: '800',
            },
            h2: {
              color: '#f9fafb',
              fontWeight: '700',
            },
            h3: {
              color: '#f9fafb',
              fontWeight: '600',
            },
            code: {
              backgroundColor: '#1f2937',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              color: '#f97316',
            },
            pre: {
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
