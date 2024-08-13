import { lazy } from "react";
const ProductItem = lazy(() => import("@/components/product/ProductItem"));
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query, where } from "firebase/firestore";

export type BrandProps = {
	brand: {
		id: number;
		name: string;
		korName: string;
		imagePath: string;
	};
};
const CategoryItem = ({ brand }: BrandProps) => {
	const queryCategory = query(
		collection(db, Collection.PRODUCT),
		where("brandId", "==", brand.id),
		orderBy("createdAt", "desc"),
		limit(4)
	);
	const { data, error } = useProductsQuery(queryCategory, brand.id);

	if (!data || error) {
		return null;
	}

	const products = data.pages.flatMap(page => page.products);

	return (
		<div className="flex gap-8 items-center justify-between">
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
	);
};

export default CategoryItem;
