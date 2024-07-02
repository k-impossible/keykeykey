import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useInView } from "react-intersection-observer";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ProductManageItem from "../item/product-item";
import { useEffect } from "react";
import useProductStore from "@/store/useProductStore";

const ProductManageList = () => {
	const queryByCreatedAt = query(
		collection(db, Collection.PRODUCT),
		orderBy("createdAt", "desc"),
		limit(10)
	);

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useProductsQuery(queryByCreatedAt);

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	if (!data || error) {
		return null;
	}

	const products = data.pages.flatMap(page => page.products);

	return (
		<>
			<Table className="text-center">
				<TableHeader className="bg-zinc-700">
					<TableRow className="hover:bg-transparent">
						<TableHead className="w-[50px] text-center text-white">#</TableHead>
						<TableHead className="text-center text-white">브랜드</TableHead>
						<TableHead className="text-center text-white">상품명</TableHead>
						<TableHead className="w-[400px] text-center text-white">
							상품 설명
						</TableHead>
						<TableHead className="text-center text-white">가격</TableHead>
						<TableHead className="text-center text-white">재고</TableHead>
						<TableHead className="text-center text-white">태그</TableHead>
						<TableHead className="text-center text-white">이미지</TableHead>
						<TableHead className="text-center text-white">등록일</TableHead>
						<TableHead className="text-center text-white">
							수정 / 삭제
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product: Product, index) => {
						return (
							<ProductManageItem
								key={product.id}
								index={index}
								product={product}
							/>
						);
					})}
				</TableBody>
			</Table>
			{isFetchingNextPage && <div>Loading ... </div>}
			<div ref={ref}></div>
		</>
	);
};

export default ProductManageList;
