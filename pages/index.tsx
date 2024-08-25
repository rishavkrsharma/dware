import Page from '@/components/page'
import Section from '@/components/section'

const Index = () => (
	<Page>
		<Section>
			<h2 className='text-lg md:text-3xl sm:text-xl font-semibold bg-gradient-to-br from-red-700 to-fuchsia-600 bg-clip-text text-transparent pb-2'>
				Welcome to DWare, choose from wide range of products
			</h2>

			<div className='bg-white overflow-hidden shadow sm:rounded-lg my-12'>
				<div className='px-4 py-6 sm:p-6'>
					<div className='flex flex-col items-center justify-center'>
						<div className='p-3 mt-5 rounded-full bg-slate-200 inline-block'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-12 text-gray-600'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z'
								/>
							</svg>
						</div>
						<span className='text-3xl font-bold text-slate-800 mt-3'>
							Scan a Product
						</span>
						<span className='text-md text-slate-600 mt-3'>
							Hold your phone's camera up to a product's QR code to add it to
							your cart.
						</span>
						<button
							type='button'
							className='inline-flex items-center my-5 px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
							<span className='pl-2'>Scan QR Code</span>
						</button>
					</div>
				</div>
			</div>
		</Section>
	</Page>
)

export default Index
