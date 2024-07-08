import useCartStore from "@/store/useCartStore";
import {
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";
import CartItem from "./cart-item/cart-item";
import { Button } from "../ui/button";

const CartSheet = () => {
	const { myCart, clearMyCart } = useCartStore();
	return (
		<SheetContent className="max-h-screen px-0">
			<SheetHeader className="mb-10 ml-6">
				<SheetTitle>장바구니</SheetTitle>
			</SheetHeader>

			{myCart.totalAmount === 0 ? (
				<div>장바구니가 비어있습니다.</div>
			) : (
				<div style={{ height: "calc(100% - 124px)" }}>
					<div className="overflow-y-auto h-full flex flex-col gap-7">
						{myCart.products.map(item => (
							<CartItem item={item} />
						))}
					</div>
					<SheetFooter className="pr-6 py-4 flex  justify-around items-center w-full border-t border-zinc-400">
						<div className="text-right mr-4">
							<div>{myCart.totalAmount}개</div>
							<div className="font-bold text-lg">{myCart.totalPrice}원</div>
						</div>
						<Button className="py-6 w-32">주문하기</Button>
					</SheetFooter>
				</div>
			)}
		</SheetContent>
	);
};

export default CartSheet;
