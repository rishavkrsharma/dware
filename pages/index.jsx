import Page from '@/components/page'
import Section from '@/components/section'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../recoil/atoms'
import { Scanner } from '@yudiel/react-qr-scanner'
import toast from 'react-hot-toast'

function Index() {
	const [pageState, setPageState] = useState('initial')
	const [productDetails, setProductDetails] = useState(null)
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const setCart = useSetRecoilState(cartState)

	const addToCart = () => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(item) => item.itemDescription === productDetails.itemDescription,
			)
			if (existingItem) {
				return prevCart.map((item) =>
					item.itemDescription === productDetails.itemDescription
						? { ...item, quantity: item.quantity + 1 }
						: item,
				)
			} else {
				return [...prevCart, { ...productDetails, quantity: 1 }]
			}
		})
		toast.success('Item added to cart successfully!')
	}

	const handleScan = async (prodId) => {
		setLoading(true)
		if (prodId) {
			try {
				const response = await fetch(
					`https://script.google.com/macros/s/AKfycbyo-LkqKlF5fFx46UawDgxpPjdQkLGnKk_TK6cmrt9DOtmbKMiAWhXDJjKeT2WFMNNW/exec?action=getProduct&productCode=${prodId}`,
				)

				const product = await response.json()
				console.log('🚀 ~ handleScan ~ product:', product)
				toast.success('Item found!')
				setLoading(false)
				setProductDetails(product)
				setPageState('product')
			} catch (error) {
				console.error('Error fetching product details:', error)
				toast.error('Item not found!')
				setLoading(false)
				setPageState('initial')
			}
		}
	}

	const renderInitialState = () => (
		<div className='flex text-center flex-col items-center justify-center mb-40'>
			<span className='text-3xl font-bold text-slate-800 mt-3'>
				Scan or Search a Product
			</span>

			<div className='flex flex-row gap-3 my-6'>
				<div className='relative rounded-md shadow-sm'>
					<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
						<span className='text-gray-500 sm:text-sm'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='currentColor'
								class='size-6'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
								/>
							</svg>
						</span>
					</div>
					<input
						id='price'
						name='price'
						type='text'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Enter Product Code'
						className='block flex-1 w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
					/>
				</div>

				<button
					onClick={() => handleScan(search)}
					className='inline-flex items-center  px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
				>
					{loading ? (
						<div className='flex item-center'>
							<svg
								aria-hidden='true'
								role='status'
								class='inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
								viewBox='0 0 100 101'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
									fill='currentColor'
								/>
								<path
									d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
									fill='#19433C'
								/>
							</svg>{' '}
							<span>Loading...</span>
						</div>
					) : (
						'Search'
					)}
				</button>
			</div>

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
			<span className='text-md text-center text-slate-600 mt-3'>
				Hold your phone's camera up to a product's QR code to add it to your
				cart.
			</span>

			<button
				onClick={() => setPageState('scanning')}
				className='inline-flex items-center my-5 px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
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
	)

	const renderScanner = () => (
		<div className='flex flex-col items-center justify-center mb-20'>
			<span className='text-md text-slate-800 mt-2'>
				Hold your phone's camera up to a product's QR scan
			</span>
			<div className='w-full max-w-sm mt-2'>
				<Scanner
					onScan={(result) => handleScan(result[0]?.rawValue)}
					onError={(error) => console.log('🚀 ~ handleError ~ error:', error)}
				/>
			</div>
			<button
				onClick={() => setPageState('initial')}
				className='inline-flex items-center my-5 px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke-width='1.5'
					stroke='currentColor'
					class='size-6'
				>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
					/>
				</svg>

				<span className='pl-2'>Cancel Scan</span>
			</button>
		</div>
	)

	const renderProductDetails = () => (
		<div className='flex flex-col items-center mb-20 justify-center'>
			<div className='max-h-md items-center max-w-60 shadow-lg mb-5 rounded-2xl'>
				{productDetails && productDetails?.imageUrl ? (
					<img
						className='rounded-2xl'
						src={productDetails?.imageUrl}
						alt={productDetails?.productCode}
						style={{ maxWidth: '100%', height: 'auto' }}
					/>
				) : (
					<p>No image available</p>
				)}
			</div>

			<h2 className='text-xl text-center font-bold mb-2'>
				{productDetails?.productCode}
			</h2>
			<p className='text-lg text-center mb-2'>
				Description - {productDetails?.itemDescription}
			</p>

			<p className='text-md mb-2'>
				Price - ₹{productDetails?.price.toFixed(2)}
			</p>
			<p className='text-md mb-2 text-slate-500'>
				Available units -{' '}
				{productDetails?.availableItems != ''
					? productDetails?.availableItems
					: 'NA'}
			</p>

			<p className='text-md mb-6 text-center text-slate-500'>
				Features -{' '}
				{productDetails?.features != '' ? productDetails?.features : 'NA'}
			</p>

			<div className=''>
				<button
					onClick={() => setPageState('')}
					className='inline-flex items-center my-2 px-3 py-1 mr-3 border  border-primary shadow-sm text-sm leading-4 font-medium rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='currentColor'
						class='size-6'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
						/>
					</svg>
					<span className='pl-2'>Scan again</span>
				</button>
				<button
					onClick={addToCart}
					className='inline-flex items-center my-2 px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='currentColor'
						class='size-6'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
						/>
					</svg>

					<span className='pl-2'>Add to Cart</span>
				</button>
			</div>
		</div>
	)

	const renderContent = () => {
		switch (pageState) {
			case 'scanning':
				return renderScanner()
			case 'product':
				return renderProductDetails()
			default:
				return renderInitialState()
		}
	}

	return (
		<Page>
			<Section>
				<h2 className='text-lg text-center px-2 md:text-3xl sm:text-xl font-semibold text-primary pb-2'>
					Welcome to DWare, choose from wide range of products
				</h2>

				<div className='bg-white overflow-y-auto shadow sm:rounded-lg '>
					<div className='px-4 py-6 sm:p-6'>{renderContent()}</div>
				</div>
			</Section>
		</Page>
	)
}

export default Index
