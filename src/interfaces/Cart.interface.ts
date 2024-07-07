interface Cart {
	userId: string;
	totalAmount: number;
	totalPrice: number;
	products: CartItem[];
}

interface CartItem {
	productId: string;
	brandId: number;
	productName: string;
	productPrice: number;
	productAmount: number;
	productImage: string;
}
