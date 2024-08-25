import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => (
	<>
		{title ? (
			<Head>
				<title>DWare | {title}</title>
			</Head>
		) : null}

		<Appbar />

		<main className='mx-auto max-w-7xl px-safe'>
			<div className='p-4'>{children}</div>
		</main>

		<BottomNav />
	</>
)

export default Page
