/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        sourcesans: ['var(--font-sourcesans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Обновленная цветовая палитра
        'light-bg': '#F8F9FA',
        'gray-bg': '#E9ECEF',
        'dark-text': '#212529',
        'medium-text': '#495057',
        'light-text': '#6C757D',
        'coral': '#FF7F7F',
        'turquoise': '#38CFC3',
        'purple': '#7952B3',
        'green': '#42B883',
        'blue': '#3B82F6',
        'yellow': '#F59E0B',
        'red': '#EF4444',
        'primary': '#3B82F6',    // primary blue
        'secondary': '#38CFC3',  // secondary mint
        'accent': '#F59E0B',     // accent orange
        
        // New color additions
        'turquoise': '#50E3C2',
        'neon-blue': '#4A90E2',
        'neon-pink': '#FF59F8',
        'neon-purple': '#7795FF',
        'primary-gold': '#FFD700',
        'primary-orange': '#FFA500',
        'primary-blue': '#3B82F6',
        'space-dark': '#121824',
        
        // Расширенная цветовая палитра
        'primary-100': '#DBEAFE',
        'primary-200': '#BFDBFE',
        'primary-300': '#93C5FD',
        'primary-400': '#60A5FA',
        'primary-500': '#3B82F6', // base primary
        'primary-600': '#2563EB',
        'primary-700': '#1D4ED8',
        'primary-800': '#1E40AF',
        'primary-900': '#1E3A8A',
        
        'secondary-100': '#CCFBF1',
        'secondary-200': '#99F6E4',
        'secondary-300': '#5EEAD4',
        'secondary-400': '#2DD4BF',
        'secondary-500': '#38CFC3', // base secondary
        'secondary-600': '#0D9488',
        'secondary-700': '#0F766E',
        'secondary-800': '#115E59',
        'secondary-900': '#134E4A',
        
        'accent-100': '#FEF3C7',
        'accent-200': '#FDE68A',
        'accent-300': '#FCD34D',
        'accent-400': '#FBBF24',
        'accent-500': '#F59E0B', // base accent
        'accent-600': '#D97706',
        'accent-700': '#B45309',
        'accent-800': '#92400E',
        'accent-900': '#78350F',
        
        'success-100': '#DCFCE7',
        'success-500': '#42B883',
        'success-700': '#15803D',
        
        'warning-100': '#FEF3C7',
        'warning-500': '#F59E0B',
        'warning-700': '#B45309',
        
        'error-100': '#FEE2E2',
        'error-500': '#EF4444',
        'error-700': '#B91C1C',
        
        'info-100': '#DBEAFE',
        'info-500': '#3B82F6',
        'info-700': '#1D4ED8',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'rotate': 'rotate 10s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'train-move': 'trainMove 15s linear infinite',
        'steam': 'steam 2s ease-in-out infinite',
        'gear-rotate': 'gearRotate 8s linear infinite',
        'pistons': 'pistons 1s linear infinite',
        'energy-flow': 'energyFlow 3s linear infinite',
        'hover': 'hover 2s ease-in-out infinite',
        'gauge-spin': 'gaugeSpin 4s ease-in-out infinite',
        'circuit-pulse': 'circuitPulse 2s linear infinite',
        'wheel-spin': 'wheelSpin 2s linear infinite',
        'valve-turn': 'valveTurn 3s ease-in-out infinite alternate',
        'connector-flash': 'connectorFlash 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px 0px rgba(74, 144, 226, 0.7)' },
          '50%': { boxShadow: '0 0 25px 5px rgba(80, 227, 194, 0.9)' },
        },
        trainMove: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-20px) scale(2)', opacity: '0' },
        },
        gearRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pistons: {
          '0%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(-5px)' },
        },
        energyFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        hover: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gaugeSpin: {
          '0%, 100%': { transform: 'rotate(-45deg)' },
          '50%': { transform: 'rotate(45deg)' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
        wheelSpin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        valveTurn: {
          '0%': { transform: 'rotate(-90deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        connectorFlash: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to bottom, #F5F5F5, #E8E8E8)',
        'subtle-gradient': 'linear-gradient(to right, #50E3C2, #4A90E2)',
        'warm-gradient': 'linear-gradient(to right, rgba(245, 166, 35, 0.5), rgba(208, 2, 27, 0.5))',
        'cool-gradient': 'linear-gradient(to right, rgba(74, 144, 226, 0.5), rgba(80, 227, 194, 0.5))',
        'pattern-bg': 'url("/images/subtle-pattern.png")',
        'space-bg': 'linear-gradient(to bottom, #121824, #0A0E15)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'card': '0 5px 15px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 5px rgba(0, 0, 0, 0.08)',
        'button-hover': '0 4px 10px rgba(0, 0, 0, 0.12)',
        'input-focus': '0 0 0 3px rgba(59, 130, 246, 0.15)',
        'glow': '0 0 15px rgba(80, 227, 194, 0.5)',
        'neon': '0 0 20px rgba(255, 89, 248, 0.7)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.3' }],
        'sm': ['0.875rem', { lineHeight: '1.45' }],
        'base': ['1rem', { lineHeight: '1.65', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'pill': '9999px',
      },
    },
  },
  plugins: [],
} 