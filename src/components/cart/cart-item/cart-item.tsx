import { Button } from "@/components/ui/button";
import { brandData } from "@/lib/productData";
import useCartStore from "@/store/useCartStore";
import {
	FaPlus,
	FaRegSquarePlus,
	FaRegSquareMinus,
	FaRegTrashCan,
	FaTrashCan,
} from "react-icons/fa6";

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
						<FaTrashCan
							size={16}
							className="text-zinc-400 cursor-pointer"
							onClick={() => updateMyCart(item.productId, "decrease")}
						/>
					) : (
						<FaRegSquareMinus
							size={19}
							className="text-zinc-500 cursor-pointer"
							onClick={() => updateMyCart(item.productId, "decrease")}
						/>
					)}

					<p className="mx-4 font-semibold">{item.productAmount}</p>
					<FaRegSquarePlus
						className="text-zinc-500 cursor-pointer"
						size={19}
						onClick={() => updateMyCart(item.productId, "increase")}
					/>
				</div>
				<p className="font-semibold">{item.productTotalPrice}원</p>
			</div>
		</div>
	);
};

export default CartItem;
