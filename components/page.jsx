import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

const Page = ({ title, children }) => (
	<>
		{title ? (
			<Head>
				<title>DWare | {title}</title>
			</Head>
		) : null}

		<Appbar />
		<main className='mx-auto max-w-7xl px-safe '>{children}</main>
		<BottomNav />
	</>
)

export default Page
