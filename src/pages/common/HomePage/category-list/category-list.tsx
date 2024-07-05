import { brandData } from "@/data/productData";
import CategoryItem from "../category-item/category-item";

const CategoryList = () => {
	return (
		<div className="flex flex-col gap-20">
			{brandData.map(brand => (
				<div key={brand.id}>
					<h1 className="text-2xl">{brand.name}</h1>
					<CategoryItem brand={brand} />
				</div>
			))}
		</div>
	);
};

export default CategoryList;
