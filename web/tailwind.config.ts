import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundSize: {
				'xl': '300% 300%',
			},
			backgroundImage: {
				'gradient-linear': 'linear-gradient(150deg, rgba(5, 14, 44, 0.70) 0%, rgba(5, 50, 107, 1) 100%)',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
					'gradient-radial': 'radial-gradient(ellipse at 50% 50%, rgba(3, 169, 244, 1) 0%, rgba(1, 107, 166, 1) 12%, rgba(1, 1, 37, 1) 59%)',
					/* 'gradient-radial': 'radial-gradient(circle at 50% 50%, rgba(254, 254, 255, 1) 0%, rgba(243, 231, 0, 1) 5%, rgba(26, 143, 187, 0.94) 6%)', */
			},
			animation: {
				'spin-slow': 'spin 6s linear infinite',
				swell: 'swell 2s ease-in infinite',
				solar: 'solar 45s ease-in-out infinite',
			},
			keyframes: {
				solar: {
					'0%, 100%': {'background-position-x': '90%', 'background-position-y': '90%'},
					'50%': {'background-position-x': '30%', 'background-position-y': '30%'},
				},
				swell: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.15)' },
				},
			},
			scale: {
				'101': '1.01',
			},
			colors: {
				primary: '#FFAB96',
				secondary: '#8729B3',
				special: '#',
				dark: '#',
			},
		},
	},
	plugins: [],
}
export default config
