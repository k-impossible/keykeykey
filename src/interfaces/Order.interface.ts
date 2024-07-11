import { OrderStatus } from "@/enum/OrderStatus";

interface Order {
	id: string;
	userId: string;
	products: CartItem[];
	totalAmount: number;
	totalPrice: number;
	status: OrderStatus;
	images: string[];
	createdAt: number;
	updatedAt: number;
}
