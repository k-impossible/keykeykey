import ProductItem from "@/components/product/ProductItem";
import { brandData } from "@/data/productData";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

type SortCriteriaType = "createAt" | "price";
type SortSequenceType = "desc" | "asc";

const ProductListPage = () => {
	const paramId = useParams();
	const findBrand = brandData.find(b => paramId.id === b.name.toLowerCase());
	const { ref, inView } = useInView();
	const [sortCriteria, setSortCriteria] =
		useState<SortCriteriaType>("createAt");
	const [sortSequence, setSortSequence] = useState<SortSequenceType>("desc");

	let basicQuery = query(
		collection(db, Collection.PRODUCT),
		limit(10)
		// orderBy(sortCriteria, sortSequence)
	);

	const whereQuery =
		paramId.id === "all"
			? where("brandId", ">=", 0)
			: where("brandId", "==", findBrand?.id);

	const finalQuery = query(basicQuery, whereQuery);

	const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useProductsQuery(finalQuery, findBrand?.id, "category");

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
		<div className="lg:container py-24 flex flex-wrap gap-16">
			{products.map(product => (
				<ProductItem
					key={product.id}
					product={product}
					auto={true}
					nav={false}
					pag={false}
				/>
			))}
			{isFetchingNextPage && <div>Loading ... </div>}
			<div ref={ref}></div>
		</div>
	);
};

export default ProductListPage;
