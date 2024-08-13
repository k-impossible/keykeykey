import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import {
	DocumentData,
	Query,
	QueryDocumentSnapshot,
	getDocs,
	query,
	startAfter,
} from "firebase/firestore";

export const QUERY_KEY = "products";
export type QueryResponse = {
	products: Product[];
	nextList: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
const getDocsInProducts = async (
	productQuery: Query<DocumentData, DocumentData>,
	pageParam: any
): Promise<QueryResponse> => {
	if (pageParam) {
		productQuery = query(productQuery, startAfter(pageParam));
	}

	const getDocsResult = await getDocs(productQuery);
	const productList: Product[] = getDocsResult.docs.map(
		doc =>
			({
				id: doc.id,
				...doc.data(),
			}) as Product
	);

	const lastProduct = getDocsResult.docs[getDocsResult.docs.length - 1];

	return {
		products: productList,
		nextList: lastProduct,
	};
};

const useProductsQuery = (
	productQuery: Query<DocumentData, DocumentData>,
	...keys: any
) => {
	return useSuspenseInfiniteQuery<QueryResponse>({
		queryKey: [QUERY_KEY, ...keys],
		queryFn: ({ pageParam }) => getDocsInProducts(productQuery, pageParam),
		initialPageParam: undefined,
		getNextPageParam: lastPage => lastPage.nextList ?? undefined,
	});
};

export default useProductsQuery;
