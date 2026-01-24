/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Colors
        "primary": "#F2593D",
        "primary-dark": "#D14026",
        "primary-hover": "#D14026",
        "primary-light": "#FF7E66",
        
        // Background Colors
        "background-light": "#ffffff",
        "background-alt": "#f9fafb",
        "background-subtle": "#F9FAFB",
        "background-dark": "#121212",
        
        // Surface Colors
        "surface-light": "#ffffff",
        "surface-dark": "#1c1c1c",
        "surface-highlight": "#2a2a2a",
        
        // Border Colors
        "border-light": "#e2e8f0",
        "border-dark": "#333333",
        
        // Text Colors
        "text-main": "#0e151b",
        "text-sub": "#4e7597",
        "text-secondary": "#94a3b8",
        "text-muted": "#6B7280",
        
        // Input Colors
        "input-bg": "#F3F4F6",
        "input-bg-dark": "#18181b",
        
        // Error Colors
        "error": "#ef4444",
      },
      fontFamily: {
        "display": ["Cairo", "sans-serif"],
        "sans": ["Cairo", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "full": "9999px"
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
