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
import { Link } from "react-router-dom";
import { useCartSheetStore } from "@/store/useSheetStore";

const CartSheet = () => {
	const { myCart } = useCartStore();
	const { setCartSheetState } = useCartSheetStore();
	return (
		<SheetContent className="max-h-screen px-0">
			<SheetHeader className="mb-10 ml-6">
				<SheetTitle>장바구니</SheetTitle>
				<SheetDescription></SheetDescription>
			</SheetHeader>

			{myCart.totalAmount === 0 ? (
				<div className="flex justify-center items-center h-full flex-col">
					<h1 className="font-bold">장바구니가 비어있습니다.</h1>
					<h1 className="text-sm">상품을 추가해주세요.</h1>
				</div>
			) : (
				<div style={{ height: "calc(100% - 140px)" }}>
					<div className="overflow-y-auto h-full flex flex-col gap-7">
						{myCart.products.map(item => (
							<CartItem key={item.productId} item={item} />
						))}
					</div>
					<SheetFooter className="pr-6 py-6 flex  justify-around items-center w-full border-t border-zinc-400">
						<div className="text-right mr-4">
							<div>{myCart.totalAmount}개</div>
							<div className="font-bold text-lg">
								{myCart.totalPrice.toLocaleString()}원
							</div>
						</div>
						<Link to="/order" title="주문하기 페이지로 이동">
							<Button
								className="py-6 w-32"
								onClick={() => setCartSheetState(false)}
							>
								주문하기
							</Button>
						</Link>
					</SheetFooter>
				</div>
			)}
		</SheetContent>
	);
};

export default CartSheet;
