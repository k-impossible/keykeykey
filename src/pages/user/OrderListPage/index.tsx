import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useOrdersQuery from "@/queries/useOrdersQuery";
import useUserStore from "@/store/useUserStore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OrderListItem from "./item/order-list-item";

const OrderListPage = () => {
	const { id } = useUserStore();
	const queryByCreatedAt = query(
		collection(db, Collection.ORDER),
		where("userId", "==", id),
		orderBy("createdAt", "desc"),
		limit(5)
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
		<div className="py-10 max-w-[600px] w-full">
			<h1 className="text-3xl font-bold mb-10">내 주문내역</h1>
			<div className="gap-10 flex-col flex">
				{orders.map(order => (
					<OrderListItem order={order} key={order.id} />
				))}
			</div>
			{isFetchingNextPage && <div>Loading ... </div>}
			<div ref={ref}></div>
		</div>
	);
};

export default OrderListPage;
