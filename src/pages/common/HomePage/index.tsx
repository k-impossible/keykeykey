import { brandData } from "@/lib/productData";
import CategoryItem from "./item/category-item";
import { Link, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import MetaTag from "@/MetaTag";
const HomePage = () => {
	const { pathname } = useLocation();
	const imgSrc = `${import.meta.env.PUBLIC_URL}/logo-jpg.jpg`;
	return (
		<div className="lg:container py-24 m-auto">
			<MetaTag
				title={"Home"}
				description={
					"키키키(KEY KEY KEY)는 개발자들이 선호하는 키보드 브랜드의 제품을 취급하는 키보드 전문 스토어 입니다."
				}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<div className="flex flex-col gap-20">
				{brandData.map(brand => (
					<div key={brand.id}>
						<div className="flex justify-between items-baseline">
							<img
								src={brand.logoPath}
								alt="brand-logo"
								loading="lazy"
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
