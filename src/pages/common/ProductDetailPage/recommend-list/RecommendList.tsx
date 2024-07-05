import ProductItem from "@/components/product/ProductItem";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, query, where } from "firebase/firestore";
import React from "react";

type RecommendProps = {
	id: number;
	brand: string;
};
const RecommendList = ({ brand, id }: RecommendProps) => {
	const queryCategory = query(
		collection(db, Collection.PRODUCT),
		where("brandId", "==", id),
		limit(4)
	);
	const { data, error } = useProductsQuery(queryCategory, id);

	if (!data || error) {
		return null;
	}

	console.log(data);

	const products = data.pages.flatMap(page => page.products);

	return (
		<div className="mt-24">
			<h1 className="text-2xl font-semibold mb-8">
				{brand}의 다른 상품은 어떠세요?
			</h1>
			<div className="flex justify-between">
				{products.map(product => (
					<ProductItem
						key={product.id}
						product={product}
						auto={true}
						nav={false}
						pag={false}
					/>
				))}
			</div>
		</div>
	);
};

export default RecommendList;
