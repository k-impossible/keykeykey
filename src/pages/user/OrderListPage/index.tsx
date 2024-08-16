import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useOrdersQuery from "@/queries/useOrdersQuery";
import useUserStore from "@/store/useUserStore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OrderListItem from "./item/order-list-item";
import { Link, useLocation } from "react-router-dom";
import Loading from "@/components/loading/Loading";
import MetaTag from "@/MetaTag";

const OrderListPage = () => {
	const { pathname } = useLocation();
	const imgSrc = `${import.meta.env.PUBLIC_URL}/logo-jpg.jpg`;
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
			<MetaTag
				title={"주문 목록"}
				description={"주문 목록 페이지입니다."}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<h1 className="text-3xl font-bold mb-10">내 주문내역</h1>
			{orders.length === 0 ? (
				<div className="text-center pt-10">
					<h1>상품을 주문한 내역이 아직 없습니다.</h1>
					<Link
						to="/"
						className="text-sky-600 underline mt-5 block"
						title="메인페이지로 이동"
					>
						메인페이지로
					</Link>
				</div>
			) : (
				<div className="gap-10 flex-col flex">
					{orders.map(order => (
						<OrderListItem order={order} key={order.id} />
					))}
				</div>
			)}
			{isFetchingNextPage && <Loading />}
			<div ref={ref}></div>
		</div>
	);
};

export default OrderListPage;
