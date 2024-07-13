import ProductItem from "@/components/product/ProductItem";
import { Button } from "@/components/ui/button";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
		<div className="flex gap-10 items-center justify-between">
			{products.map(product => (
				<ProductItem
					key={product.id}
					product={product}
					auto={true}
					nav={false}
					pag={false}
				/>
			))}
			<Link to={`/products/${brand.name.toLowerCase()}`}>
				<Button className="flex items-center rounded-full">
					more
					<FaAngleRight size={16} />
				</Button>
			</Link>
		</div>
	);
};

export default CategoryItem;
