import { brandData } from "@/lib/productData";
import CategoryItem from "./item/category-item";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
const HomePage = () => {
	return (
		<div className="lg:container py-24 m-auto">
			<div className="flex flex-col gap-20">
				{brandData.map(brand => (
					<div key={brand.id}>
						<div className="flex justify-between items-baseline">
							<img
								src={brand.logoPath}
								alt="brand-logo"
								style={{
									width: brand.id === 1 ? "100px" : "150px",
									marginBottom: "1rem",
									marginRight: "1rem",
									backgroundColor: brand.id === 2 ? "black" : "",
									padding: brand.id === 2 ? "0.25rem" : "",
								}}
							/>
							<Link
								to={`/products/${brand.name.toLowerCase()}`}
								title="브랜드 페이지로 이동"
								className="text-gray-600 flex items-center hover:underline text-sm"
							>
								{brand.korName} 제품 더보기
								<FaAngleRight size={12} className="text-gray-500" />
							</Link>
						</div>
						<CategoryItem brand={brand} />
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
