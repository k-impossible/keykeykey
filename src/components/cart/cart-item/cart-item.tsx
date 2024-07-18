import { brandData } from "@/lib/productData";
import useCartStore from "@/store/useCartStore";
import { FaRegSquarePlus, FaRegSquareMinus, FaTrashCan } from "react-icons/fa6";
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
import { Button } from "@/components/ui/button";
import useProductQuery from "@/queries/useProductQuery";
import { toast } from "sonner";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type CartItemProps = {
	item: CartItem;
};
const CartItem = ({ item }: CartItemProps) => {
	const { updateMyCart } = useCartStore();
	const { data, error } = useProductQuery(item.productId, item.productId);

	useEffect(() => {
		if (data?.amount === 0) {
			updateMyCart(item.productId, "soldOut");
		} else {
			updateMyCart(item.productId, "sync", data?.amount);
		}
	}, [data]);

	if (!data || error) {
		return null;
	}
	return (
		<div className=" mx-6 border-b pb-3 last:border-b-0">
			<div className="flex justify-between">
				<div className="w-[150px]">
					<img src={item.productImage} alt="cartItem" />
				</div>
				<div className="text-right">
					<h1 className="text-xs">{brandData[item.brandId].korName}</h1>
					<Link
						title="상품 상세 페이지로 이동"
						className={`font-semibold my-4 block hover:underline w-[150px]  text-ellipsis overflow-hidden whitespace-nowrap ${data.amount === 0 ? "line-through text-gray-500" : ""}`}
						to={`/product/${brandData[item.brandId].name}/${item.productId}`}
					>
						{item.productName}
					</Link>
					<p
						className={`text-xs ${data.amount < 5 ? "text-red-500" : "text-gray-500"}`}
					>
						{data.amount}개 남음
					</p>
				</div>
			</div>
			<div className="flex justify-between items-center mt-3">
				<div className="flex items-center">
					{item.productAmount <= 1 ? (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant={"ghost"}>
									<FaTrashCan
										size={16}
										className="text-zinc-400 cursor-pointer"
									/>
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>장바구니 상품 삭제</AlertDialogTitle>
									<AlertDialogDescription>
										상품을 장바구니에서 삭제하시겠습니까?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>취소</AlertDialogCancel>
									<AlertDialogAction
										className="bg-red-600"
										onClick={() => updateMyCart(item.productId, "decrease")}
									>
										삭제
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					) : (
						<Button variant={"ghost"}>
							<FaRegSquareMinus
								size={19}
								className="text-zinc-500 cursor-pointer"
								onClick={() => updateMyCart(item.productId, "decrease")}
							/>
						</Button>
					)}

					<p className="mx-4 text-sm">{item.productAmount}개</p>
					<Button variant={"ghost"}>
						<FaRegSquarePlus
							className="text-zinc-500 cursor-pointer"
							size={19}
							onClick={() => {
								if (item.productAmount < data.amount) {
									updateMyCart(item.productId, "increase");
								} else {
									toast.error("상품의 남은 재고보다 더 담을 수 없습니다.");
								}
							}}
						/>
					</Button>
				</div>

				<p
					className={`font-semibold ${data.amount === 0 ? "line-through text-gray-500" : ""}`}
				>
					{item.productTotalPrice.toLocaleString()}원
				</p>
			</div>
		</div>
	);
};

export default CartItem;
