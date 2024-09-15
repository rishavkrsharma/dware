import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			'serviceWorker' in navigator &&
			window.workbox !== undefined
		) {
			const wb = window.workbox
			const promptNewVersionAvailable = () => {
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
			defaultTheme='light'
			disableTransitionOnChange
		>
			<RecoilRoot>
				<Toaster />
				<Component {...pageProps} />
			</RecoilRoot>
		</ThemeProvider>
	)
}
