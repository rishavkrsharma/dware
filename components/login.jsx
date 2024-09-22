import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '../recoil/atoms'

function Login() {
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const setAuth = useSetRecoilState(authState)

	console.log(phoneNumber, password)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (phoneNumber && password) {
			setLoading(true)
			if (prodId) {
				try {
					const response = await fetch(
						`https://script.google.com/macros/s/AKfycbywxqoMLTpIYIt0hGQeDzohrlhlVs9WbWWLKjx7_BJOrBvlkJttEF8IY2qrtbtisnjc7g/exec?action=getProduct&productCode=${prodId}`,
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
			localStorage.setItem('authToken', 'dummy-token')
			setAuth(true)
		} else {
			setError('Invalid phone number or password')
		}
	}

	return (
		<div className='bg-green-50 h-screen'>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						alt='Your Company'
						src='https://tailwindui.com/img/logos/mark.svg?color=green&shade=800'
						className='mx-auto h-10 w-auto'
					/>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Sign in to your account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Phone
							</label>
							<div className='mt-2'>
								<input
									id='phone'
									name='phone'
									required
									type='tel'
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									autoComplete='email'
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Password
								</label>
							</div>
							{error && <p className='text-red-500'>{error}</p>}
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete='current-password'
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
