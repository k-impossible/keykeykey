import ProductForm from "../form/product-form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import useSheetStore from "@/store/useSheetStore";

type Props = {
	type: string;
};

const ProductSheet = ({ type }: Props) => {
	const { isOpened, setSheetState } = useSheetStore();
	return (
		<Sheet open={isOpened} onOpenChange={setSheetState}>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					className="text-sky-600 w-40 border-sky-600 hover:text-sky-800"
				>
					상품 등록
				</Button>
			</SheetTrigger>
			<ProductForm type={type} />
		</Sheet>
	);
};

export default ProductSheet;
