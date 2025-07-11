// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgb(239, 246, 255)',
          100: 'rgb(219, 234, 254)',
          200: 'rgb(191, 219, 254)',
          300: 'rgb(147, 197, 253)',
          400: 'rgb(96, 165, 250)',
          500: 'rgb(59, 130, 246)',
          600: 'rgb(37, 99, 235)',
          700: 'rgb(29, 78, 216)',
          800: 'rgb(30, 64, 175)',
          900: 'rgb(30, 58, 138)',
        },
        neutral: {
          0: 'rgb(255, 255, 255)',
          50: 'rgb(250, 250, 250)',
          100: 'rgb(245, 245, 245)',
          200: 'rgb(229, 229, 229)',
          300: 'rgb(212, 212, 212)',
          400: 'rgb(163, 163, 163)',
          500: 'rgb(115, 115, 115)',
          600: 'rgb(82, 82, 82)',
          700: 'rgb(64, 64, 64)',
          800: 'rgb(38, 38, 38)',
          900: 'rgb(23, 23, 23)',
          950: 'rgb(10, 10, 10)',
        },
        error: {
          50: 'rgb(254, 242, 242)',
          100: 'rgb(254, 226, 226)',
          200: 'rgb(254, 202, 202)',
          300: 'rgb(252, 165, 165)',
          400: 'rgb(248, 113, 113)',
          500: 'rgb(239, 68, 68)',
          600: 'rgb(220, 38, 38)',
          700: 'rgb(185, 28, 28)',
          800: 'rgb(153, 27, 27)',
          900: 'rgb(127, 29, 29)',
        },
        warning: {
          50: 'rgb(254, 252, 232)',
          100: 'rgb(254, 249, 195)',
          200: 'rgb(254, 240, 138)',
          300: 'rgb(253, 224, 71)',
          400: 'rgb(250, 204, 21)',
          500: 'rgb(234, 179, 8)',
          600: 'rgb(202, 138, 4)',
          700: 'rgb(161, 98, 7)',
          800: 'rgb(133, 77, 14)',
          900: 'rgb(113, 63, 18)',
        },
        success: {
          50: 'rgb(240, 253, 244)',
          100: 'rgb(220, 252, 231)',
          200: 'rgb(187, 247, 208)',
          300: 'rgb(134, 239, 172)',
          400: 'rgb(74, 222, 128)',
          500: 'rgb(34, 197, 94)',
          600: 'rgb(22, 163, 74)',
          700: 'rgb(21, 128, 61)',
          800: 'rgb(22, 101, 52)',
          900: 'rgb(20, 83, 45)',
        },
        'brand-primary': 'rgb(37, 99, 235)',
        'default-font': 'rgb(23, 23, 23)',
        'subtext-color': 'rgb(115, 115, 115)',
        'neutral-border': 'rgb(229, 229, 229)',
        white: 'rgb(255, 255, 255)',
        'default-background': 'rgb(255, 255, 255)',
      },
      fontSize: {
        caption: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '400',
            letterSpacing: '0em',
          },
        ],
        'caption-bold': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '500',
            letterSpacing: '0em',
          },
        ],
        body: [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '400',
            letterSpacing: '0em',
          },
        ],
        'body-bold': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '500',
            letterSpacing: '0em',
          },
        ],
        'heading-3': [
          '16px',
          {
            lineHeight: '20px',
            fontWeight: '600',
            letterSpacing: '0em',
          },
        ],
        'heading-2': [
          '20px',
          {
            lineHeight: '24px',
            fontWeight: '600',
            letterSpacing: '0em',
          },
        ],
        'heading-1': [
          '30px',
          {
            lineHeight: '36px',
            fontWeight: '500',
            letterSpacing: '0em',
          },
        ],
        'monospace-body': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '400',
            letterSpacing: '0em',
          },
        ],
      },
      fontFamily: {
        caption: 'Inter',
        'caption-bold': 'Inter',
        body: 'Inter',
        'body-bold': 'Inter',
        'heading-3': 'Inter',
        'heading-2': 'Inter',
        'heading-1': 'Inter',
        'monospace-body': 'monospace',
      },
      boxShadow: {
        sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        default: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        md: '0px 4px 16px -2px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.08)',
        lg: '0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)',
        overlay:
          '0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        DEFAULT: '4px',
        lg: '8px',
        full: '9999px',
      },
      container: {
        padding: {
          DEFAULT: '16px',
          sm: 'calc((100vw + 16px - 640px) / 2)',
          md: 'calc((100vw + 16px - 768px) / 2)',
          lg: 'calc((100vw + 16px - 1024px) / 2)',
          xl: 'calc((100vw + 16px - 1280px) / 2)',
          '2xl': 'calc((100vw + 16px - 1536px) / 2)',
        },
      },
      spacing: {
        112: '28rem',
        144: '36rem',
        192: '48rem',
        256: '64rem',
        320: '80rem',
      },
      screens: {
        mobile: {
          max: '767px',
        },
      },
    },
  },
  plugins: [],
};
