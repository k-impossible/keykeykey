import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { brandData, tagData } from "@/lib/productData";
import { useFormatDate } from "@/hooks/useFormatDate";
import { FaRegTrashCan } from "react-icons/fa6";
import useSheetStore from "@/store/useSheetStore";
import { FaRegEdit } from "react-icons/fa";
import useProductStore from "@/store/useProductStore";
import useDeleteStorage from "@/hooks/useDeleteStorage";
import useDeleteCollection from "@/hooks/useDeleteCollection";
import { Collection } from "@/enum/Collection";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/queries/useProductsQuery";

type ProductProps = {
	index: number;
	product: Product;
};
const ProductManageItem = ({ product, index }: ProductProps) => {
	const useHandleDeleteProduct = async () => {
		try {
			useDeleteCollection(Collection.PRODUCT, product.id as string);
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useDeleteStorage(product.createdAt, product.images);
		} catch (error) {
			console.log(error);
		}
	};
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: useHandleDeleteProduct,
		onSuccess: () => {
			toast.success("상품 삭제가 완료되었습니다.");
			return queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "manage"] });
		},
		onError: error => {
			toast.error("상품 삭제가 실패하였습니다.");
			console.log(error);
		},
	});

	const { setSheetState } = useSheetStore();
	const { setProductState } = useProductStore();
	const fetchedProduct: Product = {
		id: product.id,
		brandId: product.brandId,
		name: product.name,
		description: product.description,
		price: product.price,
		amount: product.amount,
		tagIds: product.tagIds,
		images: product.images,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
		match: product.match,
	};

	return (
		<TableRow className="hover:bg-zinc-200">
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell>{brandData[product.brandId].korName}</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell className="text-xs">{product.description}</TableCell>
			<TableCell>{product.price.toLocaleString()}원</TableCell>
			<TableCell>{product.amount}개</TableCell>
			<TableCell className="text-xs">
				{product.tagIds.map(tag => `#${tagData[tag].name} `)}
			</TableCell>
			<TableCell>{product.images.length}장</TableCell>
			<TableCell>{useFormatDate(product.createdAt)}</TableCell>
			<TableCell>
				<Button
					variant="ghost"
					onClick={() => {
						setProductState(fetchedProduct);
						setSheetState(true);
					}}
				>
					<FaRegEdit className="text-zinc-600" size={19} />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="ghost">
							<FaRegTrashCan className="text-red-600" size={19} />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>상품 삭제</AlertDialogTitle>
							<AlertDialogDescription>
								상품을 정말 삭제하시겠습니까?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>취소</AlertDialogCancel>
							<AlertDialogAction
								className="bg-red-600"
								onClick={() => mutation.mutate()}
							>
								삭제
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</TableCell>
		</TableRow>
	);
};

export default ProductManageItem;
