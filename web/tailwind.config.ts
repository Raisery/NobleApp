import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-linear': 'linear-gradient(-45deg, #12c2e9 0%, #c471ed 30%, #f64f59 70%)',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			animation: {
				'spin-slow': 'spin 6s linear infinite',
				swell: 'swell 2s ease-in infinite',
			},
			keyframes: {
				swell: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.15)' },
				},
			},
			scale: {
				'101': '1.01',
			},
		},
	},
	plugins: [],
}
export default config
