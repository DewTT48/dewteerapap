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
        lift: 'var(--shadow-lift)'
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans-thai)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
}

export default config
