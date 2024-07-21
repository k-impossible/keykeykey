import { Order } from "@/interfaces/Order.interface";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFormatDate } from "@/hooks/useFormatDate";
import { brandData } from "@/lib/productData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/queries/useOrdersQuery";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { orderStatusChange, orderStatusRender } from "@/hooks/useOrderStatus";
import { toast } from "sonner";
type OrderProps = {
	order: Order;
};

const OrderListItem = ({ order }: OrderProps) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (status: number) => {
			return orderStatusChange(order, status);
		},
		onSuccess: () => {
			toast.success("주문이 취소되었습니다.");
			return queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
		},
		onError: error => {
			toast.error("주문취소가 실패했습니다.");
			console.log(error);
		},
	});

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between">
				<div>
					<CardDescription>
						{useFormatDate(order.createdAt)} 결제
					</CardDescription>
					<CardTitle
						className={`text-2xl mt-2 ${order.status === 3 && "text-gray-400"}`}
					>
						{orderStatusRender(order.status)}
					</CardTitle>
				</div>
				<div className="text-right">
					<h1 className="text-lg font-semibold">
						결제 금액 {order.totalPrice.toLocaleString()}원
					</h1>
					<p className="my-3">수량 {order.totalAmount}개</p>
					{order.status === 0 && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant={"outline"}>주문취소</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>주문 취소 안내</AlertDialogTitle>
									<AlertDialogDescription>
										판매자가 상품을 발송하기 전에는 주문을 취소할 수 있습니다.
										<br />
										주문을 취소하시겠습니까?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>닫기</AlertDialogCancel>
									<AlertDialogAction onClick={() => mutation.mutate(3)}>
										주문취소
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</div>
			</CardHeader>
			<CardContent className="border-t border-dashed pt-6">
				<ul>
					{order.products.map(item => (
						<li
							className="mb-2 flex items-center justify-between"
							key={item.productId}
						>
							<div className="w-[100px]">
								<img src={item.productImage} alt="product image" />
							</div>
							<Link
								title="상품 상세페이지로 이동"
								className="hover:underline text-zinc-600 mr-5"
								to={`/product/${brandData[item.brandId].name}/${item.productId}`}
							>
								[{brandData[item.brandId].korName}] {item.productName}
							</Link>

							<p className="text-gray-500 ">
								{item.productAmount}개&nbsp;&nbsp;
								{(item.productAmount * item.productPrice).toLocaleString()}원
							</p>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default OrderListItem;
