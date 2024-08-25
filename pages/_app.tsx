import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='light' //dark or light or system
			disableTransitionOnChange
		>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
