export function generateUniqueOrderId() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let randomPart = ''

	for (let i = 0; i < 5; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length)
		randomPart += chars[randomIndex]
	}

	const timestampPart = Date.now().toString().slice(-4)
	return randomPart + timestampPart
}

export const orderMessage = (
	orderId,
	createdBy,
	userName,
	userContact,
	userAddress,
	items,
	status,
	createdOn,
) => {
	const formattedItems = items
		.map(
			(item) =>
				`- ${item.productCode} ${item.itemDescription}\n Quantity: ${item.quantity} @ ₹${item.price}/unit Available Stock: ${item.availableItems}\n Image: ${item.imageUrl}`,
		)
		.join('\n\n')

	return (
		`New Order Received! 🚀\n\n` +
		`Order ID: ${orderId}\n` +
		`Placed by: ${createdBy}\n` +
		`Customer Name: ${userName}\n` +
		`Contact: ${userContact}\n` +
		`Address: ${userAddress}\n\n` +
		`Items:\n${formattedItems}\n\n` +
		`Status: ${status}\n` +
		`Order Date: ${createdOn}\n\n` +
		`Please process the order promptly.`
	)
}
