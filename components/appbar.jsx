import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const links = [
	{ name: 'Cart', href: '/cart' },
	// { name: 'Recipes', href: '/recipes' },
]

const Appbar = () => {
	const router = useRouter()
	const [deferredPrompt, setDeferredPrompt] = useState(null)

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault()
			setDeferredPrompt(e)
		})
	}, [])

	const handleInstall = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt()
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the install prompt')
				} else {
					console.log('User dismissed the install prompt')
				}
				setDeferredPrompt(null)
			})
		}
	}

	return (
		<div>
			{deferredPrompt && (
				<div className='relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-900 px-6 py-2 sm:px-3.5 sm:before:flex-1'>
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
						<p className='text-sm leading-6 text-gray-100'>
							<strong className='font-semibold text-gray-50'>Dware App</strong>
							<svg
								viewBox='0 0 2 2'
								aria-hidden='true'
								className='mx-2 inline h-0.5 w-0.5 fill-current'
							>
								<circle r={1} cx={1} cy={1} />
							</svg>
							Get app installed for seamless experience
						</p>
						<button
							onClick={handleInstall}
							className='flex-none rounded-full bg-gray-200 px-3.5 py-1 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200'
						>
							Install App <span aria-hidden='true'>&rarr;</span>
						</button>
					</div>
					<div className='flex flex-1 justify-end'>
						<button
							type='button'
							className='-m-3 p-3 focus-visible:outline-offset-[-4px]'
						>
							<span className='sr-only'>Dismiss</span>
							{/* <XIcon aria-hidden='true' className='h-5 w-5 text-gray-900' /> */}
						</button>
					</div>
				</div>
			)}
			<div className='relative bg-primary dark:bg-gray-800 pt-safe flex-1'>
				<Popover>
					<nav
						className='relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2'
						aria-label='Global'
					>
						<div className='flex items-center flex-1'>
							<div className='flex items-center justify-between w-full md:w-auto'>
								<Link href='/' className='font-medium text-2xl text-slate-50'>
									DWare
								</Link>
								<div className='-mr-2 flex items-center md:hidden'>
									<Popover.Button className='bg-slate-100 rounded-md p-2 inline-flex items-center justify-center text-red-400 hover:bg-slate-200 hover:text-red-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white'>
										<span className='sr-only'>Open main menu</span>
										<MenuIcon className='h-6 w-6' aria-hidden='true' />
									</Popover.Button>
								</div>
							</div>
							{/* <div className='hidden space-x-10 md:flex md:ml-10'>
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`text-sm ${
										router.pathname === item.href
											? 'text-indigo-500 dark:text-indigo-400'
											: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
									}`}
								>
									{item.name}
								</Link>
							))}
						</div> */}
						</div>
						<div className='hidden md:flex'>
							<Link
								href='/cart'
								className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:text-gray-800 bg-primary hover:bg-red-100'
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
										d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
									/>
								</svg>
								<span className='text-lg pl-1'>Cart</span>
							</Link>
						</div>
					</nav>

					<Transition
						as={Fragment}
						enter='duration-150 ease-out'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='duration-100 ease-in'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<Popover.Panel
							focus
							className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
						>
							<div className='rounded-lg shadow-md bg-white ring-1 ring-red-800 ring-opacity-5 overflow-hidden'>
								<div className='px-5 pt-4 flex items-center justify-between'>
									<Link href='/' className='font-medium text-2xl text-primary '>
										DWare
									</Link>
									<div className='-mr-2'>
										<Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
											<span className='sr-only'>Close menu</span>
											<XIcon className='h-6 w-6' aria-hidden='true' />
										</Popover.Button>
									</div>
								</div>
								<div className='px-2 pt-2 pb-3 space-y-1'>
									{links.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={` block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 ${
												router.pathname === item.href
													? 'text-indigo-500 dark:text-indigo-400'
													: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-500'
											}`}
										>
											{item.name}
										</Link>
									))}
								</div>

								<Link
									href='/'
									className='block w-full px-5 py-3 text-center font-medium text-primary bg-gray-50 hover:bg-red-400'
								>
									Log In
								</Link>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</div>
		</div>
	)
}

export default Appbar
