import Page from '@/components/page'
import Section from '@/components/section'
import { cartState, cartTotalState } from '@/recoil/atoms'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

function Cart() {
	const [cart, setCart] = useRecoilState(cartState)
	const total = useRecoilValue(cartTotalState)

	const updateQuantity = (index, change) => {
		setCart((prevCart) => {
			const newCart = prevCart.map((item, i) =>
				i === index
					? { ...item, quantity: Math.max(0, item.quantity + change) }
					: item,
			)
			return newCart.filter((item) => item.quantity > 0)
		})
	}

	const removeFromCart = (index) => {
		setCart((prevCart) => prevCart.filter((_, i) => i !== index))
	}

	return (
		<Page>
			<Section>
				<h2 className='text-xl font-semibold'>Cart Items</h2>

				<div className='mt-2'>
					<p className='text-zinc-600 dark:text-zinc-400'>
						Like any product, contact store for any discount.
					</p>
				</div>
			</Section>

			<Section>
				<h3 className='font-medium'>Selected Plan</h3>
				<span className='bg-gradient-to-br from-slate-800 to-yellow-500 text-3xl font-semibold bg-clip-text text-transparent'>
					Gold Package
				</span>
			</Section>

			<Section>
				<div className='bg-gray-100 p-4 rounded-lg'>
					{cart.length === 0 ? (
						<p>Your cart is empty</p>
					) : (
						<div>
							{cart.map((item, index) => (
								<div
									key={index}
									className='flex justify-between items-center mb-2'
								>
									<span>
										{item.itemDescription} - ₹{item.price.toFixed(2)} x{' '}
										{item.quantity}
									</span>
									<div className='flex items-center'>
										<button
											onClick={() => updateQuantity(index, -1)}
											className='bg-red-500 text-white p-1 rounded-lg mr-1'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='size-5'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M5 12h14'
												/>
											</svg>
										</button>
										<button
											onClick={() => updateQuantity(index, 1)}
											className='bg-green-500 text-white p-1 rounded-lg mr-1'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='size-5'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M12 4.5v15m7.5-7.5h-15'
												/>
											</svg>
										</button>
										<button
											onClick={() => removeFromCart(index)}
											className='bg-gray-500 text-white p-1 rounded-lg'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='size-5'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
							<p className='font-bold mt-2'>Total: ₹{total.toFixed(2)}</p>
						</div>
					)}
				</div>
			</Section>

			<div className='absolute bottom-20 isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1'>
				<div
					aria-hidden='true'
					className='absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl'
				>
					<div
						style={{
							clipPath:
								'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
						}}
						className='aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30'
					/>
				</div>
				<div
					aria-hidden='true'
					className='absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl'
				>
					<div
						style={{
							clipPath:
								'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
						}}
						className='aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30'
					/>
				</div>
				<div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
					<p className='text-sm leading-6 text-gray-900'>
						<strong className='font-semibold'>GeneriCon 2023</strong>
						<svg
							viewBox='0 0 2 2'
							aria-hidden='true'
							className='mx-2 inline h-0.5 w-0.5 fill-current'
						>
							<circle r={1} cx={1} cy={1} />
						</svg>
						Join us in Denver from June 7 – 9 to see what’s coming next.
					</p>
					<a
						href='#'
						className='flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'
					>
						Register now <span aria-hidden='true'>&rarr;</span>
					</a>
				</div>
				<div className='flex flex-1 justify-end'>
					<button
						type='button'
						className='-m-3 p-3 focus-visible:outline-offset-[-4px]'
					>
						<span className='sr-only'>Dismiss</span>X
					</button>
				</div>
			</div>
		</Page>
	)
}

export default Cart
