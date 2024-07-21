import ProductItem from "@/components/product/ProductItem";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import { brandData } from "@/lib/productData";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
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
			<h1 className="text-2xl mb-8">
				<Link
					to={`/products/${brandData[id].name.toLowerCase()}`}
					title="브랜드 페이지로 이동"
					className="underline font-bold"
				>
					{brand}
				</Link>
				의 다른 상품은 어떠세요?
			</h1>
			<div className="flex justify-between  gap-8 items-center ">
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
