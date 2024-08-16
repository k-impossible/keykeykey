import { brandData } from "@/lib/productData";

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductList from "./list/product-list";
import allBG from "@/assets/all-bg.webp";
import MetaTag from "@/MetaTag";
type SortCriteriaType = "createdAt" | "price";
type SortSequenceType = "desc" | "asc";

const ProductListPage = () => {
	const paramId = useParams();
	const { pathname } = useLocation();
	const imgSrc = "https://www.keykeykey.store/logo-jpg.jpg";
	const findBrand = brandData.find(b => paramId.id === b.name.toLowerCase());
	const [sortCriteria, setSortCriteria] =
		useState<SortCriteriaType>("createdAt");
	const [sortSequence, setSortSequence] = useState<SortSequenceType>("desc");
	const [sortFlag, setSortFlag] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleFilter = (
		criteria: SortCriteriaType,
		sequence: SortSequenceType,
		flag: number
	) => {
		setSortCriteria(criteria);
		setSortSequence(sequence);
		setSortFlag(flag);
	};

	return (
		<div className="w-full pt-1">
			<MetaTag
				title={(findBrand == undefined ? "All" : findBrand.name) + " Products"}
				description={"상품 목록 페이지입니다."}
				imgSrc={imgSrc}
				url={pathname}
			/>
			<div
				className="category-bg"
				style={{
					backgroundImage: `url(${findBrand !== undefined ? findBrand?.imagePath : allBG})`,
				}}
			>
				<div className="bg-zinc-800 bg-opacity-80 h-full flex justify-center items-center">
					<h1 className="text-neutral-200 font-bold text-5xl">
						{findBrand !== undefined ? (
							<img
								src={findBrand.logoPath}
								alt="brand-logo"
								loading="lazy"
								style={{
									width: findBrand.id === 1 ? "100px" : "180px",
									color: "white",
									backgroundColor: findBrand.id !== 2 ? "white" : "black",
									padding: "0.5rem",
									borderRadius: "0.5rem",
								}}
							/>
						) : (
							"All Products"
						)}
					</h1>
				</div>
			</div>
			<div className="lg:container py-24 m-auto">
				<div className="flex mb-12 justify-end items-center">
					<div className="flex gap-4 text-sm text-zinc-500">
						<span
							onClick={() => handleFilter("createdAt", "desc", 0)}
							className={`sortBtn ${sortFlag === 0 ? "sortActiveBtn" : ""}`}
						>
							최신 등록순
						</span>
						<span
							onClick={() => handleFilter("price", "asc", 1)}
							className={`sortBtn ${sortFlag === 1 ? "sortActiveBtn" : ""}`}
						>
							가격 낮은순
						</span>
						<span
							onClick={() => handleFilter("price", "desc", 2)}
							className={`sortBtn ${sortFlag === 2 ? "sortActiveBtn" : ""}`}
						>
							가격 높은순
						</span>
					</div>
				</div>
				<ProductList
					allParam={paramId.id === "all"}
					brandId={findBrand !== undefined ? findBrand!.id : 0}
					sortCriteria={sortCriteria}
					sortSequence={sortSequence}
				/>
			</div>
		</div>
	);
};

export default ProductListPage;
