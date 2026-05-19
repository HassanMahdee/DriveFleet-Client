/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        light: {
          'primary':         '#1D4ED8',
          'primary-content': '#FFFFFF',
          'secondary':       '#F59E0B',
          'secondary-content': '#1C1917',
          'accent':          '#06B6D4',
          'neutral':         '#374151',
          'base-100':        '#F8FAFC',
          'base-200':        '#EFF2F7',
          'base-300':        '#E2E8F0',
          'base-content':    '#111827',
          'info':            '#3B82F6',
          'success':         '#10B981',
          'warning':         '#F59E0B',
          'error':           '#EF4444',
        },
        dark: {
          'primary':         '#3B82F6',
          'primary-content': '#FFFFFF',
          'secondary':       '#F59E0B',
          'secondary-content': '#1C1917',
          'accent':          '#22D3EE',
          'neutral':         '#1E1E2E',
          'base-100':        '#09090F',
          'base-200':        '#13131C',
          'base-300':        '#1E1E2E',
          'base-content':    '#E2E8F0',
          'info':            '#60A5FA',
          'success':         '#34D399',
          'warning':         '#FCD34D',
          'error':           '#F87171',
        },
      },
    ],
  },
}