import { Link, useSearchParams } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useCartStore from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import useAddCollection from "@/hooks/useAddCollection";
import { Collection } from "@/enum/Collection";
import { Order } from "@/interfaces/Order.interface";
import { OrderStatus } from "@/enum/OrderStatus";
import useUserStore from "@/store/useUserStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect } from "react";

const SuccessPage = () => {
	const [searchParams] = useSearchParams();
	const { myCart, clearMyCart } = useCartStore();
	const { email } = useUserStore();

	useEffect(() => {
		(async () => {
			try {
				const filterProducts = myCart.products.filter(
					item => 0 < item.productAmount
				);
				const date = Date.now();
				const newOrder: Order = {
					id: searchParams.get("orderId") as string,
					userId: myCart.userId,
					userEmail: email,
					products: filterProducts,
					totalAmount: myCart.totalAmount,
					totalPrice: myCart.totalPrice,
					status: OrderStatus.DONE,
					createdAt: date,
					updatedAt: date,
				};

				await useAddCollection(Collection.ORDER, newOrder);

				for (let product of filterProducts) {
					await updateDoc(doc(db, Collection.PRODUCT, product.productId), {
						amount: Number(product.originalAmount - product.productAmount),
					});
				}

				clearMyCart();
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div className="lg:container py-10">
			<Card className="max-w-[700px] mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">결제 완료</CardTitle>
					<CardDescription className="text-emerald-600">
						<FaRegCircleCheck size={60} className="mx-auto my-6" />
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col w-full justify-end items-center">
					<div className="font-bold text-xl mb-6">
						결제 금액 : {Number(searchParams.get("amount")).toLocaleString()}원
					</div>
					<Link to="/orders" title="주문내역 페이지로 이동">
						<Button variant={"outline"}>주문 내역 확인</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};

export default SuccessPage;
