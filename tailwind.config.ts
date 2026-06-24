import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-soft': 'var(--surface-soft)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        orange: 'var(--orange)',
        'orange-hover': 'var(--orange-hover)',
        olive: 'var(--olive)',
        'olive-soft': 'var(--olive-soft)',
        border: 'var(--border)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: '0 22px 65px rgba(30, 36, 48, 0.12)'
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans Thai"',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
}

export default config
