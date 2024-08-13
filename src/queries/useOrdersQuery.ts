import { Order } from "@/interfaces/Order.interface";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import {
	DocumentData,
	Query,
	QueryDocumentSnapshot,
	getDocs,
	query,
	startAfter,
} from "firebase/firestore";

export const QUERY_KEY = "orders";
type QueryResponse = {
	orders: Order[];
	nextList: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
const getDocsInOrders = async (
	orderQuery: Query<DocumentData, DocumentData>,
	pageParam: any
): Promise<QueryResponse> => {
	if (pageParam) {
		orderQuery = query(orderQuery, startAfter(pageParam));
	}

	const getDocsResult = await getDocs(orderQuery);
	const orderList: Order[] = getDocsResult.docs.map(
		doc =>
			({
				docId: doc.id,
				...doc.data(),
			}) as Order
	);

	const lastOrder = getDocsResult.docs[getDocsResult.docs.length - 1];

	return {
		orders: orderList,
		nextList: lastOrder,
	};
};

const useOrdersQuery = (
	orderQuery: Query<DocumentData, DocumentData>,
	...keys: any
) => {
	return useSuspenseInfiniteQuery<QueryResponse>({
		queryKey: [QUERY_KEY, ...keys],
		queryFn: ({ pageParam }) => getDocsInOrders(orderQuery, pageParam),
		initialPageParam: undefined,
		getNextPageParam: lastPage => lastPage.nextList ?? undefined,
	});
};

export default useOrdersQuery;
