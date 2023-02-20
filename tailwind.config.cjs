/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				"float-up": {
					'0%': { transform: 'translateY(1rem)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1'}
				}
			},
			animation: {
				"float-up": 'float-up 2s'
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
