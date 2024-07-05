import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

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
	return useQuery({
		queryKey: [...keys],
		queryFn: () => getDocInProducts(id),
	});
};

export default useProductQuery;
