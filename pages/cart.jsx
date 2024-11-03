import React, { useState } from 'react'
import Page from '@/components/page'
import toast from 'react-hot-toast'
import { cartState, cartTotalState } from '@/recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { generateUniqueOrderId, orderMessage } from '../utils'
import { authState } from '../recoil/atoms'
import { BASE_URL } from '../constants/index.js'

function Cart() {
	const [cart, setCart] = useRecoilState(cartState)
	const total = useRecoilValue(cartTotalState)
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [formData, setFormData] = useState({
		customerName: '',
		customerPhone: '',
		customerAddress: '',
	})
	const auth = useRecoilValue(authState)

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

	const placeOrder = async () => {
		if (!validateForm()) {
			return
		}
		setLoading(true)
		const orderId = generateUniqueOrderId()
		const createdOn = new Date().toLocaleString()
		const message = orderMessage(
			orderId,
			'createdBy',
			formData.customerName,
			formData.customerPhone,
			formData.customerAddress,
			cart,
			'in-progress',
			createdOn,
		)

		const formattedItems = cart
			.map(
				(item) =>
					`- ${item.productCode} ${item.itemDescription}\n Quantity: ${item.quantity} @ ₹${item.price}/unit Available Stock: ${item.availableItems}\n Image: ${item.imageUrl}`,
			)
			.join('\n\n')

		const sheetMessage = [
			orderId,
			`${auth?.user?.name} - ${auth?.user?.contact}`,
			`${`Name: ${formData.customerName}\nPhone: ${formData.customerPhone}\nAddress: ${formData.customerAddress}`}`,
			formattedItems,
			'in-progress',
			createdOn,
		]

		try {
			const [messageResult, fetchResponse] = await Promise.all([
				sendMessage(message),
				fetch(`${BASE_URL}`, {
					method: 'POST',
					body: JSON.stringify(sheetMessage),
				}),
			])

			setOpen(false)
			toast.success(
				`Order created successfully with orderId - ${orderId}. Save orderId for further assistance`,
				{
					duration: 10000,
				},
			)
			setLoading(false)
		} catch (error) {
			toast.error('Failed to create order.')
			setLoading(false)
		}
	}

	async function sendMessage(message) {
		const url =
			'https://api.maytapi.com/api/00840f2c-fd8b-4845-9512-c3eca7643058/34225/sendMessage'

		const headers = {
			'Content-Type': 'application/json',
			'x-maytapi-key': 'c129c4f5-b81b-4a7a-b969-2018a6df5655',
		}

		const body = JSON.stringify({
			to_number: '905301234567@c.us',
			type: 'text',
			message: message,
			reply_to: '50d8b950-a67f-11eb-91cc-d97af631df95',
		})

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: headers,
				body: body,
			})

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`)
			}

			const result = await response.json()
			return result
		} catch (error) {
			console.error('Error sending message:', error)
			throw error
		}
	}

	const validateForm = () => {
		let tempErrors = {}
		if (!formData.customerName)
			tempErrors.customerName = 'Customer name is required'
		if (!formData.customerPhone)
			tempErrors.customerPhone = 'Customer phone is required'
		else if (formData.customerPhone.length !== 10)
			tempErrors.customerPhone = 'Phone number must be 10 digits'

		setErrors(tempErrors)
		return Object.keys(tempErrors).length === 0
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	// {
	// 	"imageUrl": "https://www.jaquar.com/images/thumbs/0013983_single-lever-wall-mixer-chrome.jpeg",
	// 	"price": 10800,
	// 	"itemDescription": "SINGLE LEVER WALL MIXER WITH PROVISION F",
	// 	"availableItems": "",
	// 	"productCode": "KUP-CHR-35117PM",
	// 	"features": ""
	// }

	return (
		<Page>
			<div className='flex flex-col h-screen bg-white shadow-xl'>
				<div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
					<div className='flex items-start justify-between'>
						<h1 className='text-xl font-medium text-gray-900'>Shopping cart</h1>
					</div>

					<div className='my-10'>
						{cart.length === 0 ? (
							<div className='flex flex-col h-full items-center justify-center'>
								<p>Your cart is empty</p>

								<svg
									fill='#000000'
									version='1.1'
									id='Capa_1'
									className='w-48 h-auto mt-20'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 231.523 231.523'
								>
									<g>
										<path d='M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231 l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z' />
										<path d='M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468 c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468 C147.235,148.377,150.23,152.062,154.351,152.488z' />
										<path d='M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523 c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215 C104.494,212.835,100.808,216.523,96.278,216.523z' />
										<path d='M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221 c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523 c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215 C181.937,212.835,178.251,216.523,173.719,216.523z' />
										<path d='M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046 c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z' />
										<path d='M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607 L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z' />
										<path d='M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606 c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607 C155.338,54.314,157.256,55.045,159.174,55.045z' />
										<path d='M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502 c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z' />
									</g>
								</svg>
							</div>
						) : (
							<div className='flow-root mb-16'>
								<ul role='list' className='-my-6 divide-y divide-gray-200'>
									{cart.map((item, index) => (
										<li key={index} className='flex py-3'>
											<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
												<img
													src={item?.imageUrl}
													alt={item?.productCode}
													className='h-full w-full object-cover object-center'
												/>
											</div>

											<div className='ml-4 flex flex-1 flex-col'>
												<div className='flex mb-1 justify-between text-base font-medium text-gray-900'>
													<h3>{item.productCode}</h3>
													<p className='ml-4'>₹{item.price.toFixed(2)}</p>
												</div>
												<p className='text-sm'>{item?.itemDescription}</p>
												<p className='text-sm text-slate-500 mb-1'>
													Available units -{' '}
													{item?.availableItems != ''
														? item?.availableItems
														: 'NA'}
												</p>
												<div className='flex flex-1 items-end justify-between text-sm'>
													<div className='flex flex-row gap-2'>
														<p className='text-gray-500'>
															Qty: {item.quantity}
														</p>
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
																	className='size-3'
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
																	className='size-3'
																>
																	<path
																		stroke-linecap='round'
																		stroke-linejoin='round'
																		d='M12 4.5v15m7.5-7.5h-15'
																	/>
																</svg>
															</button>
														</div>
													</div>

													<div className='flex'>
														<button
															type='button'
															onClick={() => removeFromCart(index)}
															className='font-medium text-red-600 hover:text-red-500'
														>
															Remove
														</button>
													</div>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>

				<div className='sticky bottom-14 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] border-t bg-green-50 border-gray-200 px-4 py-4 sm:px-6'>
					<div className='flex justify-between text-base font-medium text-gray-900'>
						<p>Total</p>
						<p>₹ {total.toFixed(2)}</p>
					</div>
					<p className='mt-0.5 text-sm text-gray-500'>
						Shipping and taxes calculated at checkout in store.
					</p>
					<div className='mt-2'>
						<button
							onClick={() => setOpen(true)}
							disabled={cart.length === 0}
							className='flex w-full items-center disabled:bg-slate-400  justify-center rounded-md border border-transparent bg-green-600 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 '
						>
							Checkout
						</button>
					</div>
				</div>
			</div>

			<Dialog open={open} onClose={setOpen} className='relative z-10'>
				<DialogBackdrop
					transition
					className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
				/>

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<DialogPanel
							transition
							className='relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
						>
							<div className='bg-white px-4 pb-1 pt-2'>
								<form>
									<div className='border-b border-gray-900/10'>
										<h2 className='text-base font-semibold leading-7 text-gray-900'>
											Info
										</h2>
										<p className='mt-1 text-sm leading-6 text-gray-600'>
											This information will used while delivering order
										</p>

										<div className='mt-4'>
											<div className=''>
												<label
													htmlFor='first-name'
													className='block text-sm font-medium text-gray-900'
												>
													Customer name
												</label>
												<div className='mt-2'>
													<input
														id='customerName'
														name='customerName'
														type='text'
														value={formData.customerName}
														onChange={handleChange}
														className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
															errors.customerName
																? 'border-red-500 ring-red-500'
																: ''
														}`}
													/>
													{errors.customerName && (
														<p className='text-red-500 text-sm mt-1'>
															{errors.customerName}
														</p>
													)}
												</div>
											</div>

											<div className='mt-3'>
												<label
													htmlFor='first-name'
													className='block text-sm font-medium text-gray-900'
												>
													Customer phone no.
												</label>
												<div className='mt-2'>
													<input
														id='customerPhone'
														name='customerPhone'
														type='text'
														maxLength={10}
														value={formData.customerPhone}
														onChange={handleChange}
														autoComplete='phone'
														className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
															errors.customerPhone
																? 'border-red-500 ring-red-500'
																: ''
														}`}
													/>
													{errors.customerPhone && (
														<p className='text-red-500 text-sm mt-1'>
															{errors.customerPhone}
														</p>
													)}
												</div>
											</div>

											<div className='col-span-full mt-3'>
												<label
													htmlFor='about'
													className='block text-sm font-medium text-gray-900'
												>
													Customer address
												</label>
												<div className='mt-2'>
													<textarea
														id='about'
														name='customerAddress'
														rows={3}
														value={formData.customerAddress}
														onChange={handleChange}
														className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
														defaultValue={''}
													/>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div className='bg-gray-50 px-4 py-3'>
								<button
									type='button'
									onClick={placeOrder}
									className='flex-1 w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
								>
									{loading ? (
										<div className='flex flex-row items-center justify-center'>
											<svg
												class='animate-spin h-5 w-5 mr-3 ...'
												viewBox='0 0 24 24'
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
														d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
													/>
												</svg>
											</svg>
											Processing...
										</div>
									) : (
										<p>Place order</p>
									)}
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</Page>
	)
}

export default Cart
