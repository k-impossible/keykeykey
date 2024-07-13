import { Order } from "@/interfaces/Order.interface";
import { TableCell, TableRow } from "@/components/ui/table";
import { brandData } from "@/lib/productData";
import { useFormatDate } from "@/hooks/useFormatDate";
import {
	orderStatusChange,
	orderStatusRender,
} from "@/pages/user/OrderListPage/item/order-list-item";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/queries/useOrdersQuery";
type OrderProps = {
	index: number;
	order: Order;
};
const OrderManageItem = ({ order, index }: OrderProps) => {
	const orderStatusManageRender = (status: number) => {
		switch (status) {
			case 0:
				return "발송준비";
			case 1:
				return "발송";
		}
	};

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (status: number) => {
			return orderStatusChange(order, status);
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
		},
		onError: error => {
			console.log(error);
		},
	});

	return (
		<TableRow className="hover:bg-zinc-200">
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell>{order.id}</TableCell>
			<TableCell>{order.userEmail}</TableCell>
			<TableCell>{order.totalPrice.toLocaleString()}원</TableCell>
			<TableCell>{order.totalAmount}개</TableCell>
			<TableCell>
				<ul>
					{order.products.map(item => (
						<li className="text-xs mb-2" key={item.productId}>
							[{brandData[item.brandId].korName}] {item.productName}&nbsp;
							{item.productAmount}개
						</li>
					))}
				</ul>{" "}
			</TableCell>
			<TableCell>{useFormatDate(order.createdAt)}</TableCell>
			<TableCell
				className={`${order.status === 3 ? "text-red-500" : ""} text-sm font-semibold`}
			>
				<div>{orderStatusRender(order.status)}</div>
				{order.status < 2 && (
					<div>
						<Button
							className="mt-3 text-xs h-7"
							onClick={() => mutation.mutate(order.status + 1)}
						>
							{orderStatusManageRender(order.status)}
						</Button>
					</div>
				)}
			</TableCell>
		</TableRow>
	);
};

export default OrderManageItem;
