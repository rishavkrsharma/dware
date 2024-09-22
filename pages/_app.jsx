import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { authState } from '../recoil/atoms'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Login from 'components/login'

function AppContent({ Component, pageProps }) {
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

	const isAuthenticated = useRecoilValue(authState)
	const setAuth = useSetRecoilState(authState)

	if (!isAuthenticated) {
		return <Login />
	}

	return (
		<>
			<Toaster />
			<Component {...pageProps} />
		</>
	)
}

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='light'
			disableTransitionOnChange
		>
			<RecoilRoot>
				<AppContent Component={Component} pageProps={pageProps} />
			</RecoilRoot>
		</ThemeProvider>
	)
}
