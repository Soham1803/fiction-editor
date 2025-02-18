import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'hover-bg': 'var(--color-hover-bg)',
        'hover-text': 'var(--color-hover-text)',
        'border-color': 'var(--color-border)',
      },
      fontFamily: {
        theme: 'var(--font-family)',
      },
      borderRadius: {
        theme: 'var(--border-radius)',
      },
      spacing: {
        'theme-spacing': 'var(--spacing)',
      }
    },
  },
  plugins: [],
} satisfies Config;
