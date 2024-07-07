import useCartStore from "@/store/useCartStore";
import {
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";
import CartItem from "./cart-item/cart-item";

const CartSheet = () => {
	const { myCart, clearMyCart } = useCartStore();
	return (
		<SheetContent className="max-h-screen pr-0">
			<SheetHeader className="mb-10">
				<SheetTitle>장바구니</SheetTitle>
			</SheetHeader>

			{myCart.totalAmount === 0 ? (
				<div>장바구니가 비어있습니다.</div>
			) : (
				<div style={{ height: "calc(100% - 76px)" }}>
					<div className="overflow-y-auto h-full ">
						{myCart.products.map(item => (
							<CartItem item={item} />
						))}
					</div>
					<SheetFooter className="pr-10">
						{myCart.totalAmount}개{myCart.totalPrice}원
					</SheetFooter>
				</div>
			)}
		</SheetContent>
	);
};

export default CartSheet;
