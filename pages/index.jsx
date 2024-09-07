import Page from '@/components/page'
import Section from '@/components/section'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../recoil/atoms'
import { Scanner } from '@yudiel/react-qr-scanner'

function Index() {
	const [pageState, setPageState] = useState('initial')
	const [productDetails, setProductDetails] = useState(null)
	// const [product, setProduct] = useState(null)
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
	}

	const handleScan = async (result) => {
		if (result) {
			try {
				const response = await fetch(
					`https://script.google.com/macros/s/AKfycby1zF5D6r0RR151w-J4CFST0yWFdL_ze0rXqIpcXYL6wK4PRhOn5x62w1bEoDVkDKGJ8Q/exec?action=getProduct&requestedProductId=${result}`,
				)
				const product = await response.json()
				console.log('🚀 ~ handleScan ~ product:', product)
				setProductDetails(product)
				setPageState('product')
			} catch (error) {
				console.error('Error fetching product details:', error)
				setPageState('initial')
			}
		}
	}

	const handleError = (error) => {
		console.error(error)
		// setScannerState('initial')
	}

	const renderScanner = () => (
		<div className='flex flex-col items-center justify-center'>
			<span className='text-md text-slate-800 mt-3'>
				Hold your phone's camera up to a product's QR scan
			</span>
			<div className='w-full max-w-sm '>
				<Scanner
					onScan={(result) => handleScan(result[0]?.rawValue)}
					onError={(error) => handleError(error)}
				/>
			</div>
			<button
				onClick={() => setPageState('initial')}
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
				<span className='pl-2'>Cancel Scan</span>
			</button>
		</div>
	)

	const renderProductDetails = () => (
		<div className='flex flex-col items-center justify-center'>
			<div className='max-h-md items-center max-w-md shadow-lg mb-5 rounded-2xl'>
				{productDetails && productDetails?.imageUrl ? (
					<img
						className='rounded-2xl'
						src={productDetails.imageUrl}
						alt={productDetails.name}
						style={{ maxWidth: '100%', height: 'auto' }}
					/>
				) : (
					<p>No image available</p>
				)}
			</div>

			<h2 className='text-2xl font-bold mb-2'>
				{productDetails?.itemDescription}
			</h2>
			<p className='text-xl mb-4'>Price ₹{productDetails?.price.toFixed(2)}</p>
			<button
				onClick={addToCart}
				className='inline-flex items-center my-5 px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
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
				<span className='pl-2'>Add to Cart</span>
			</button>
		</div>
	)

	const renderInitialState = () => (
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
				Hold your phone's camera up to a product's QR code to add it to your
				cart.
			</span>
			<button
				onClick={() => setPageState('scanning')}
				className='inline-flex items-center my-5 px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
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
				<h2 className='text-lg md:text-3xl sm:text-xl font-semibold bg-gradient-to-br from-primary to-fuchsia-600 bg-clip-text text-transparent pb-2'>
					Welcome to DWare, choose from wide range of products
				</h2>

				<div className='bg-white overflow-hidden shadow sm:rounded-lg my-12'>
					<div className='px-4 py-6 sm:p-6'>{renderContent()}</div>
				</div>
			</Section>
		</Page>
	)
}

export default Index
