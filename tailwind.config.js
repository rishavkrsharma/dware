module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#19433C',
				primaryHover: '#112e29',
			},
		},
	},
	plugins: [require('tailwindcss-safe-area'), require('@tailwindcss/forms')],
}
