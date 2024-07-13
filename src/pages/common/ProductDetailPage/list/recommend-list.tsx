import ProductItem from "@/components/product/ProductItem";
import { Button } from "@/components/ui/button";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

type RecommendProps = {
	id: number;
	brand: string;
	name: string;
};
const RecommendList = ({ brand, id, name }: RecommendProps) => {
	const queryCategory = query(
		collection(db, Collection.PRODUCT),
		where("brandId", "==", id),
		where("name", "!=", name),
		orderBy("createdAt", "desc"),
		limit(4)
	);
	const { data, error } = useProductsQuery(queryCategory, id, "recommend");
	if (!data || error) {
		return null;
	}

	const products = data.pages.flatMap(page => page.products);

	return (
		<div className="mt-36">
			<h1 className="text-2xl font-semibold mb-8">
				{brand}의 다른 상품은 어떠세요?
			</h1>
			<div className="flex justify-between  gap-10 items-center ">
				{products.map(product => (
					<ProductItem
						key={product.id}
						product={product}
						auto={true}
						nav={false}
						pag={false}
					/>
				))}
				<Link to={`/products/${name.toLowerCase()}`}>
					<Button className="flex items-center rounded-full">
						more
						<FaAngleRight size={16} />
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default RecommendList;
