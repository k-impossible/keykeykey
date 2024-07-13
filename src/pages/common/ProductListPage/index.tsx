import { brandData } from "@/lib/productData";

import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./list/product-list";

type SortCriteriaType = "createdAt" | "price";
type SortSequenceType = "desc" | "asc";

const ProductListPage = () => {
	const paramId = useParams();
	const findBrand = brandData.find(b => paramId.id === b.name.toLowerCase());
	const [sortCriteria, setSortCriteria] =
		useState<SortCriteriaType>("createdAt");
	const [sortSequence, setSortSequence] = useState<SortSequenceType>("desc");
	const [sortFlag, setSortFlag] = useState(0);
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
		<div className="lg:container py-24">
			<div className="flex mb-6 justify-between items-center">
				<h1 className="text-2xl font-semibold">
					{findBrand !== undefined ? findBrand.name : "전체상품"}
				</h1>
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
	);
};

export default ProductListPage;
