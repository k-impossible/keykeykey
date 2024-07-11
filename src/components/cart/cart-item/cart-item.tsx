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

type CartItemProps = {
	item: CartItem;
};
const CartItem = ({ item }: CartItemProps) => {
	const { updateMyCart } = useCartStore();
	return (
		<div className="flex justify-between mx-6 border-b pb-5">
			<div className="w-[120px]">
				<img src={item.productImage} alt="cartItem" />
			</div>
			<div className="text-right text-sm">
				<h1 className="text-xs">{brandData[item.brandId].korName}</h1>
				<h1 className="">{item.productName}</h1>
				<div className="flex items-center justify-end mt-4 mb-2">
					{item.productAmount === 1 ? (
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

					<p className="mx-4 font-semibold">{item.productAmount}개</p>
					<Button variant={"ghost"}>
						<FaRegSquarePlus
							className="text-zinc-500 cursor-pointer"
							size={19}
							onClick={() => updateMyCart(item.productId, "increase")}
						/>
					</Button>
				</div>
				<p className="font-semibold">{item.productTotalPrice}원</p>
			</div>
		</div>
	);
};

export default CartItem;
