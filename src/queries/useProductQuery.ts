import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { useSuspenseQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export const QUERY_KEY = "product";
const getDocInProducts = async (id: string) => {
	const docRef = doc(db, Collection.PRODUCT, id);
	const docSnap = await getDoc(docRef);
	const data: Product = {
		id: docSnap.id,
		...docSnap.data(),
	} as Product;

	return data;
};

const useProductQuery = (id: string, ...keys: any) => {
	return useSuspenseQuery({
		queryKey: [QUERY_KEY, ...keys],
		queryFn: () => getDocInProducts(id),
		gcTime: 0,
		staleTime: 0,
	});
};

export default useProductQuery;
