/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#00D4FF', // Cyan - technological sophistication
        'primary-50': '#E6F9FF', // Very light cyan
        'primary-100': '#CCF3FF', // Light cyan
        'primary-200': '#99E7FF', // Medium light cyan
        'primary-300': '#66DBFF', // Medium cyan
        'primary-400': '#33CFFF', // Medium dark cyan
        'primary-500': '#00D4FF', // Base cyan
        'primary-600': '#00A7CC', // Dark cyan
        'primary-700': '#007A99', // Darker cyan
        'primary-800': '#004D66', // Very dark cyan
        'primary-900': '#002033', // Darkest cyan

        // Secondary Colors
        'secondary': '#8B5CF6', // Purple - violet-500
        'secondary-50': '#F3F0FF', // Very light purple - violet-50
        'secondary-100': '#E9E2FF', // Light purple - violet-100
        'secondary-200': '#D4C5FF', // Medium light purple - violet-200
        'secondary-300': '#BFA8FF', // Medium purple - violet-300
        'secondary-400': '#A98BFF', // Medium dark purple - violet-400
        'secondary-500': '#8B5CF6', // Base purple - violet-500
        'secondary-600': '#7C3AED', // Dark purple - violet-600
        'secondary-700': '#6D28D9', // Darker purple - violet-700
        'secondary-800': '#5B21B6', // Very dark purple - violet-800
        'secondary-900': '#4C1D95', // Darkest purple - violet-900

        // Accent Colors
        'accent': '#10B981', // Emerald - emerald-500
        'accent-50': '#ECFDF5', // Very light emerald - emerald-50
        'accent-100': '#D1FAE5', // Light emerald - emerald-100
        'accent-200': '#A7F3D0', // Medium light emerald - emerald-200
        'accent-300': '#6EE7B7', // Medium emerald - emerald-300
        'accent-400': '#34D399', // Medium dark emerald - emerald-400
        'accent-500': '#10B981', // Base emerald - emerald-500
        'accent-600': '#059669', // Dark emerald - emerald-600
        'accent-700': '#047857', // Darker emerald - emerald-700
        'accent-800': '#065F46', // Very dark emerald - emerald-800
        'accent-900': '#064E3B', // Darkest emerald - emerald-900

        // Background Colors
        'background': '#0A0A0B', // Near-black - gray-950
        'surface': '#1A1A1D', // Elevated dark surface - gray-900
        'surface-light': '#2A2A2D', // Lighter surface - gray-800
        'surface-lighter': '#3A3A3D', // Even lighter surface - gray-700

        // Text Colors
        'text-primary': '#F8FAFC', // High-contrast white - slate-50
        'text-secondary': '#94A3B8', // Muted slate - slate-400
        'text-tertiary': '#64748B', // More muted slate - slate-500
        'text-quaternary': '#475569', // Most muted slate - slate-600

        // Status Colors
        'success': '#22C55E', // Vibrant green - green-500
        'success-50': '#F0FDF4', // Very light green - green-50
        'success-100': '#DCFCE7', // Light green - green-100
        'success-200': '#BBF7D0', // Medium light green - green-200
        'success-600': '#16A34A', // Dark green - green-600
        'success-700': '#15803D', // Darker green - green-700

        'warning': '#F59E0B', // Amber - amber-500
        'warning-50': '#FFFBEB', // Very light amber - amber-50
        'warning-100': '#FEF3C7', // Light amber - amber-100
        'warning-200': '#FDE68A', // Medium light amber - amber-200
        'warning-600': '#D97706', // Dark amber - amber-600
        'warning-700': '#B45309', // Darker amber - amber-700

        'error': '#EF4444', // Red - red-500
        'error-50': '#FEF2F2', // Very light red - red-50
        'error-100': '#FEE2E2', // Light red - red-100
        'error-200': '#FECACA', // Medium light red - red-200
        'error-600': '#DC2626', // Dark red - red-600
        'error-700': '#B91C1C', // Darker red - red-700
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem', // 4px
        'md': '0.5rem', // 8px
        'lg': '0.75rem', // 12px
        'xl': '1rem', // 16px
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 212, 255, 0.15)',
        'glow-secondary': '0 0 20px rgba(139, 92, 246, 0.15)',
        'elevation-1': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 3px rgba(0, 0, 0, 0.5)',
        'elevation-2': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 6px rgba(0, 0, 0, 0.5)',
        'elevation-3': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 15px rgba(0, 0, 0, 0.5)',
        'elevation-4': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 25px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.25)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      backdropBlur: {
        'glass': '12px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}