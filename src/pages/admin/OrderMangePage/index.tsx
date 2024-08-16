import { collection, limit, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useOrdersQuery from "@/queries/useOrdersQuery";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Order } from "@/interfaces/Order.interface";
import OrderManageItem from "./item/order-item";
import Loading from "@/components/loading/Loading";
import MetaTag from "@/MetaTag";
import { useLocation } from "react-router-dom";

const OrderManagePage = () => {
	const { pathname } = useLocation();
	const imgSrc = `${import.meta.env.PUBLIC_URL}/logo-jpg.jpg`;
	const queryByCreatedAt = query(
		collection(db, Collection.ORDER),
		orderBy("createdAt", "desc"),
		limit(10)
	);

	const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useOrdersQuery(queryByCreatedAt);

	const { ref, inView } = useInView();
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	if (!data || error) {
		return null;
	}
	const orders = data.pages.flatMap(page => page.orders);

	return (
		<div className="lg:container py-10 mt-6">
			<MetaTag
				title={"주문 관리"}
				description={"주문 관리 페이지입니다."}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<Table className="text-center">
				<TableHeader className="bg-zinc-700">
					<TableRow className="hover:bg-transparent">
						<TableHead className="w-[30px] text-center text-white">#</TableHead>
						<TableHead className="w-[100px] text-center text-white">
							주문 ID
						</TableHead>
						<TableHead className="w-[100px] text-center text-white">
							구매자 ID
						</TableHead>
						<TableHead className="w-[90px] text-center text-white">
							결제 금액
						</TableHead>
						<TableHead className="w-[90px] text-center text-white">
							주문 수량
						</TableHead>
						<TableHead className="w-[300px] text-center text-white">
							주문 상품
						</TableHead>
						<TableHead className="w-[100px] text-center text-white">
							주문일
						</TableHead>
						<TableHead className="w-[120px] text-center text-white">
							주문상태
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="text-xs">
					{orders.map((order: Order, index) => {
						return (
							<OrderManageItem key={order.id} index={index} order={order} />
						);
					})}
				</TableBody>
			</Table>
			{isFetchingNextPage && <Loading />}
			<div ref={ref}></div>
		</div>
	);
};

export default OrderManagePage;
