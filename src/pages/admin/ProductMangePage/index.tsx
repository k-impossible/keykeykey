import { Button } from "@/components/ui/button";
import ProductManageList from "./list/product-list";
import { FaAnglesRight } from "react-icons/fa6";
import useSheetStore from "@/store/useSheetStore";
import { Sheet } from "@/components/ui/sheet";
import ProductForm from "./form/product-form";
import useProductStore from "@/store/useProductStore";

const ProductMangePage = () => {
	const { isOpened, setSheetState } = useSheetStore();
	const { initProductState } = useProductStore();
	return (
		<div className="container py-10">
			<div className="container flex justify-end">
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
			<main className="container mt-10">
				<ProductManageList />
			</main>
			<Sheet open={isOpened} onOpenChange={setSheetState}>
				<ProductForm />
			</Sheet>
		</div>
	);
};

export default ProductMangePage;
