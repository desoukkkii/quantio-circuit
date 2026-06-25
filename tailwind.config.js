/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0d12',
        'bg-elevated': '#0f1218',
        panel: '#11141c',
        'panel-2': '#161a24',
        card: '#1b2030',
        'card-hover': '#222a3d',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'hint-in': 'hint-in 600ms ease-out 200ms forwards',
        'overlay-in': 'overlay-in 200ms ease-out',
        'modal-in': 'modal-in 260ms cubic-bezier(0.16,1,0.3,1)',
        'pin-pulse': 'pin-pulse 0.8s ease-in-out infinite',
        'clock-blink': 'clock-blink 0.6s ease-in-out infinite',
      },
      keyframes: {
        'hint-in': {
          from: { opacity: '0', transform: 'translate(-50%, 8px)' },
          to: { opacity: '1', transform: 'translate(-50%, 0)' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'modal-in': {
          from: { opacity: '0', transform: 'scale(0.96) translateY(12px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'pin-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(96,165,250,0.6)' },
          '50%': { transform: 'scale(1.5)', boxShadow: '0 0 0 8px rgba(96,165,250,0)' },
        },
        'clock-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
    },
  },
  plugins: [],
}
