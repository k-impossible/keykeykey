import ProductForm from "../form/product-form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import useSheetStore from "@/store/useSheetStore";
import { useState } from "react";

type Props = {
	type: string;
};

type ProductProps = {
	brandId: number;
	productName: string;
	description: string;
	price: number;
	amount: number;
	tagIds: number[];
	images: File[];
};

const ProductSheet = ({ type }: Props) => {
	const { isOpened, setSheetState } = useSheetStore();
	return (
		<Sheet open={isOpened} onOpenChange={setSheetState}>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<ProductForm type={type} />
		</Sheet>
	);
};

export default ProductSheet;
