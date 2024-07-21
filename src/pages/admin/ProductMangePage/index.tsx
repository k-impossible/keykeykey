import { Button } from "@/components/ui/button";
import ProductManageList from "./list/product-list";
import { FaAnglesRight } from "react-icons/fa6";
import useSheetStore from "@/store/useSheetStore";
import { Sheet } from "@/components/ui/sheet";
import ProductForm from "./form/product-form";
import useProductStore from "@/store/useProductStore";
import { Collection } from "@/enum/Collection";
import { db } from "@/firebase";
import useProductsQuery from "@/queries/useProductsQuery";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ProductMangePage = () => {
	const { isOpened, setSheetState } = useSheetStore();
	const { initProductState } = useProductStore();
	const queryByCreatedAt = query(
		collection(db, Collection.PRODUCT),
		orderBy("createdAt", "desc"),
		limit(10)
	);

	const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useProductsQuery(queryByCreatedAt, "manage");

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

	// console.log(products);
	return (
		<div className="lg:container py-10">
			<div className="flex justify-end">
				<Button
					variant="outline"
					className="text-zinc-600 w-40 border-zinc-600 hover:text-zinc-800"
					onClick={() => {
						initProductState();
						setSheetState(true);
					}}
				>
					상품 등록
					<FaAnglesRight className="ml-10" />
				</Button>
			</div>
			{/* {products.map(item => (
				<div key={item.id}>
					{item.id} <br />
					{item.amount}
				</div>
			))} */}
			<main className="mt-6">
				<ProductManageList products={products} />
			</main>
			{isFetchingNextPage && <div>Loading ... </div>}
			<div ref={ref}></div>
			<Sheet open={isOpened} onOpenChange={setSheetState}>
				<ProductForm />
			</Sheet>
		</div>
	);
};

export default ProductMangePage;
