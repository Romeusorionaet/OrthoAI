import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cl_1: '#FFF',
        cl_2: 'rgb(30, 41, 59)',
        cl_3: 'rgb(16, 185, 129)',
        cl_4: 'rgb(0, 0, 0)',
        cl_5: 'rgb(239, 68, 68)',
        cl_6: 'rgb(39, 39, 42)',
        cl_7: 'rgb(82, 82, 91)',
        cl_8: 'rgb(23, 37, 84)',
      },
    },

    fontFamily: {
      roboto: 'var(--font-roboto)',
    },
  },
  plugins: [],
}
export default config
