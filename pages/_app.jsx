import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			'serviceWorker' in navigator &&
			window.workbox !== undefined
		) {
			const wb = window.workbox
			const promptNewVersionAvailable = () => {
				// Implement your own prompt notification here
				if (confirm('A new version is available. Reload to update?')) {
					wb.addEventListener('controlling', () => {
						window.location.reload()
					})
					wb.messageSkipWaiting()
				}
			}

			wb.addEventListener('waiting', promptNewVersionAvailable)
			wb.register()
		}
	}, [])

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='light' //dark or light or system
			disableTransitionOnChange
		>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</ThemeProvider>
	)
}
