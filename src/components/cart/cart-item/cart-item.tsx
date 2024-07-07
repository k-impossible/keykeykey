import useCartStore from "@/store/useCartStore";
import React from "react";

type CartItemProps = {
	item: CartItem;
};
const CartItem = ({ item }: CartItemProps) => {
	const { updateMyCart } = useCartStore();
	return <div>{item.productName}</div>;
};

export default CartItem;
