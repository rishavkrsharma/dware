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
				<h2 className='text-xl font-semibold'>Ingredients</h2>

				<div className='mt-2'>
					<p className='text-zinc-600 dark:text-zinc-400'>
						Like any good recipe, we appreciate community offerings to cultivate
						a delicous dish.
					</p>
				</div>
			</Section>

			<Section>
				<h3 className='font-medium'>Thanks to</h3>
				<span className='bg-gradient-to-br from-red-400 via-blue-500 to-fuchsia-600 bg-clip-text text-transparent'>
					Gold Package
				</span>

				<ul className='list-disc space-y-2 px-6 py-2'>
					<li className='text-sm text-zinc-600 dark:text-zinc-400'>
						<a href='https://unsplash.com' className='underline'>
							Unsplash
						</a>{' '}
						for high quality images
					</li>

					<li className='text-sm text-zinc-600 dark:text-zinc-400'>
						<a href='https://teenyicons.com' className='underline'>
							Teenyicons
						</a>{' '}
						for lovely icons
					</li>
				</ul>
			</Section>

			<Section>
				<div className='bg-gray-100 p-4 rounded-lg'>
					<h2 className='text-xl font-semibold mb-2'>Cart</h2>
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
										{item.name} - ${item.price.toFixed(2)} x {item.quantity}
									</span>
									<div className='flex items-center'>
										<button
											onClick={() => updateQuantity(index, -1)}
											className='bg-red-500 text-white p-1 rounded mr-1'
										>
											Minus
										</button>
										<button
											onClick={() => updateQuantity(index, 1)}
											className='bg-green-500 text-white p-1 rounded mr-1'
										>
											Plus
										</button>
										<button
											onClick={() => removeFromCart(index)}
											className='bg-gray-500 text-white p-1 rounded'
										>
											Remove
										</button>
									</div>
								</div>
							))}
							<p className='font-bold mt-2'>Total: ${total.toFixed(2)}</p>
						</div>
					)}
				</div>
			</Section>
		</Page>
	)
}

export default Cart
