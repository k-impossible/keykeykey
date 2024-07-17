import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useCartStore from "@/store/useCartStore";
import OrderItem from "./item/order-item";

import CheckoutPage from "./checkout";
const OrderPage = () => {
	const { myCart } = useCartStore();
	return (
		<div className="lg:container py-10">
			<Card className="max-w-[700px] mx-auto">
				<CardHeader className="mb-6">
					<CardTitle>주문하기</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					{myCart.products
						.filter(item => 0 < item.productAmount)
						.map(item => (
							<OrderItem key={item.productId} item={item} />
						))}
				</CardContent>
				<CardFooter className="flex flex-col w-full">
					<CheckoutPage />
				</CardFooter>
			</Card>
		</div>
	);
};

export default OrderPage;
