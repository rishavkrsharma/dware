import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '../recoil/atoms'
import toast from 'react-hot-toast'
import { BASE_URL } from '../constants'

function Login() {
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const setAuth = useSetRecoilState(authState)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (phoneNumber && password) {
			setLoading(true)
			try {
				const response = await fetch(
					`${BASE_URL}?action=login&contact=${phoneNumber}&password=${password}`,
				)

				const user = await response.json()
				if (user?.success) {
					toast.success('Sign in successful!')
					setLoading(false)
					localStorage.setItem('authToken', 'dummy-token')
					setAuth({
						isAuthenticated: true,
						user: {
							contact: user.contact,
							name: user.name,
							address: user.address,
						},
					})
				} else {
					toast.error('User not found, contact Admin!')
				}
			} catch (error) {
				console.error('Error fetching user details:', error)
				toast.error('User not found!')
				setLoading(false)
			}
		} else {
			setError('Invalid phone number or password')
		}
	}

	return (
		<div className='bg-green-50 h-screen'>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-6'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						alt='DWARE'
						src='/images/icon-maskable-512.png'
						className='mx-auto h-20 w-auto'
					/>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Welcome to Dware
					</h2>
					<h2 className='text-center text-lg  tracking-tight text-gray-500'>
						Sign in to your account
					</h2>
				</div>

				<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
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
									maxLength={10}
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
								{loading ? (
									<div className='item-center'>
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
									'Sign in'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
