import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { brandData } from "@/data/productData";
import { useFormatDate } from "@/hooks/useFormatDate";
import { FaRegTrashCan } from "react-icons/fa6";
import useSheetStore from "@/store/useSheetStore";
import { FaRegEdit } from "react-icons/fa";

type ProductProps = {
	index: number;
	product: Product;
};
const ProductManageItem = ({ product, index }: ProductProps) => {
	const { isOpened, setSheetState } = useSheetStore();

	return (
		<TableRow className="hover:bg-zinc-200">
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell>{brandData[product.brandId].korName}</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell>{product.description}</TableCell>
			<TableCell>{product.price}원</TableCell>
			<TableCell>{product.amount}개</TableCell>
			<TableCell>{product.price}</TableCell>
			<TableCell>{product.images.length}장</TableCell>
			<TableCell>{useFormatDate(product.createdAt)}</TableCell>
			<TableCell>
				<Button variant="ghost" onClick={() => setSheetState(true)}>
					<FaRegEdit className="text-zinc-600" size={19} />
				</Button>

				<Button variant="ghost">
					<FaRegTrashCan className="text-red-600" size={19} />
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default ProductManageItem;
