import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Catppuccin Mocha palette
        base: '#1e1e2e',
        mantle: '#181825',
        crust: '#11111b',
        surface0: '#313244',
        surface1: '#45475a',
        surface2: '#585b70',
        overlay: '#6c7086',
        fg: '#cdd6f4',
        muted: '#a6adc8',
        mauve: '#cba6f7',
        pink: '#f5c2e7',
        red: '#f38ba8',
        maroon: '#eba0ac',
        peach: '#fab387',
        yellow: '#f9e2af',
        green: '#a6e3a1',
        teal: '#94e2d5',
        sky: '#89dceb',
        sapphire: '#74c7ec',
        blue: '#89b4fa',
        lavender: '#b4befe',
      },
      boxShadow: {
        window: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}
export default config
