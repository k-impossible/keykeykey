import { lazy, useEffect } from "react";
import Loading from "@/components/loading/Loading";
const ProductItem = lazy(() => import("@/components/product/ProductItem"));
// import ProductItem from "@/components/product/ProductItem";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import {
	collection,
	limit,
	orderBy,
	OrderByDirection,
	query,
	where,
} from "firebase/firestore";
import { useInView } from "react-intersection-observer";

type ProductListProps = {
	allParam: boolean;
	brandId: number;
	sortCriteria: string;
	sortSequence: OrderByDirection;
};
const ProductList = ({
	allParam,
	brandId,
	sortCriteria,
	sortSequence,
}: ProductListProps) => {
	const { ref, inView } = useInView();

	const whereQuery = allParam
		? where("brandId", ">", -1)
		: where("brandId", "==", brandId);

	const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useProductsQuery(
			query(
				collection(db, Collection.PRODUCT),
				orderBy(sortCriteria, sortSequence),
				limit(10),
				whereQuery
			),
			allParam ? -1 : brandId,
			sortCriteria,
			sortSequence
		);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	if (!data || error) {
		return null;
	}
	const products = data.pages.flatMap(page => page.products);
	return (
		<div className=" flex flex-wrap gap-10 justify-between">
			{products.map(product => (
				<ProductItem
					key={product.id}
					product={product}
					auto={true}
					nav={false}
					pag={false}
				/>
			))}
			{isFetchingNextPage && <Loading />}
			<div ref={ref}></div>
		</div>
	);
};

export default ProductList;
