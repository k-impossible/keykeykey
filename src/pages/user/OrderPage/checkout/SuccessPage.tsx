import { Link, useSearchParams } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import OrderItem from "../order-item/order-item";
import useCartStore from "@/store/useCartStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
	const [searchParams] = useSearchParams();
	const { myCart, clearMyCart } = useCartStore();
	// 서버로 승인 요청

	useEffect(() => {
		// order doc 생성
		// 장바구니 초기화

		console.log(searchParams.get("orderId"));
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
				<CardContent className="flex flex-col w-full justify-end items-center border-b">
					<Link to="/orders">
						<Button variant={"outline"}>주문 내역 확인</Button>
					</Link>
					<div className=" my-6">총 주문 상품: {myCart.totalAmount}개</div>
					<div className="font-bold text-xl">
						결제 금액 : {myCart.totalPrice}원
					</div>
				</CardContent>
				<CardFooter className="flex flex-col w-full">
					{myCart.products.map(item => (
						<OrderItem key={item.productId} item={item} />
					))}
				</CardFooter>
			</Card>
		</div>
	);
};

export default SuccessPage;
