import { atom, selector } from 'recoil'

const localStorageEffect =
	(key) =>
	({ setSelf, onSet }) => {
		if (typeof window !== 'undefined') {
			const savedValue = localStorage.getItem(key)
			if (savedValue != null) {
				setSelf(JSON.parse(savedValue))
			}

			onSet((newValue, _, isReset) => {
				isReset
					? localStorage.removeItem(key)
					: localStorage.setItem(key, JSON.stringify(newValue))
			})
		}
	}

export const cartState = atom({
	key: 'cartState',
	default: [],
	effects_UNSTABLE: [localStorageEffect('cart')],
})

export const cartTotalState = selector({
	key: 'cartTotalState',
	get: ({ get }) => {
		const cart = get(cartState)
		return cart.reduce((total, item) => total + item.price * item.quantity, 0)
	},
})

export const authState = atom({
	key: 'authState',
	default: {
		isAuthenticated: false,
		user: null,
	},
})
