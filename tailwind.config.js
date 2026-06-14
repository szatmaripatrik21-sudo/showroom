/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── lux-* primitives (keep for backwards compat with existing components) ──
        'lux-black':      '#0a0908',
        'lux-dark':       '#110d09',
        'lux-brown':      '#1e1610',
        'lux-brown-mid':  '#2a1f16',
        'lux-gold':       '#c9a84c',
        'lux-gold-light': '#e8c96a',
        'lux-gold-dim':   '#956f28',
        'lux-cream':      '#f0ebe0',
        'lux-cream-dim':  '#c8bfb0',
        'lux-orange':     '#d06a32',
        'lux-muted':      '#9c8f7d',
        'lux-muted-soft': '#857a6b',
        // ── sp-* semantic token layer ────────────────────────────────────────────
        // New components consume these; old ones keep lux-* until the polish phase.
        // Color roles:
        'sp-bg':          '#0a0908',  // page background
        'sp-surface':     '#110d09',  // card / raised section
        'sp-surface-hi':  '#1e1610',  // 3rd-level elevation
        'sp-text':        '#f0ebe0',  // primary body text
        'sp-text-muted':  '#9c8f7d',  // secondary / caption text
        'sp-text-dim':    '#c8bfb0',  // dimmed / placeholder
        // Gold = hierarchy & decision signal ONLY — not decoration
        'sp-gold':        '#c9a84c',  // primary gold (CTAs, key labels)
        'sp-gold-hi':     '#e8c96a',  // hover / active
        'sp-gold-lo':     '#956f28',  // subtle / background hints
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'fade-in-down': 'fadeInDown 0.8s ease-out both',
        'fade-in': 'fadeIn 1s ease-out both',
        gradient: 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
