import { OrderStatus } from "@/enum/OrderStatus";

export interface Order {
	docId?: string;
	id: string;
	userId: string;
	userEmail: string;
	products: CartItem[];
	totalAmount: number;
	totalPrice: number;
	status: OrderStatus;
	createdAt: number;
	updatedAt: number;
}
