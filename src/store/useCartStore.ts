import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
const STORAGE_KEY = "cart";

type CartState = {
	carts: Cart[];
	myCart: Cart;
};

type Action = {
	setCarts: (cart: Cart) => void;
	setMyCart: (userId: string) => void;
	addMyCart: (item: CartItem) => void;
	updateMyCart: (productId: string, flag: "increase" | "decrease") => void;
	removeMyCart: () => void;
	clearMyCart: () => void;
};

const initCartState: CartState = {
	carts: [],
	myCart: {
		userId: "",
		totalAmount: 0,
		totalPrice: 0,
		products: [],
	},
};

const useCartStore = create<CartState & Action>()(
	devtools(
		persist(
			set => ({
				...initCartState,
				setCarts: cart =>
					set(state => ({ carts: handleSetCarts(state, cart) })),
				setMyCart: userId =>
					set(state => ({ myCart: handleSetMyCart(state, userId) })),
				addMyCart: item =>
					set(state => ({
						myCart: handleAddMyCart(state, item),
					})),
				removeMyCart: () => set(() => ({ myCart: initCartState.myCart })),
				clearMyCart: () => set(state => ({ myCart: handleClearMyCart(state) })),
				updateMyCart: (productId, flag) =>
					set(state => ({
						myCart: handleUpdateMyCart(state, productId, flag),
					})),
			}),

			{ name: STORAGE_KEY, storage: createJSONStorage(() => sessionStorage) }
		)
	)
);
export default useCartStore;

const handleSetCarts = (state: CartState & Action, cart: Cart) => {
	const findCart = state.carts.findIndex(c => c.userId === cart.userId);
	if (findCart < 0) return [...state.carts, cart];
	else {
		state.carts[findCart] = cart;
		return [...state.carts];
	}
};

const handleSetMyCart = (state: CartState & Action, id: string) => {
	const findCart = state.carts.find(c => c.userId === id);
	if (findCart === undefined) {
		const initCart = { ...initCartState.myCart, userId: id };
		state.setCarts(initCart);
		return initCart;
	} else return findCart;
};

const handleAddMyCart = (state: CartState & Action, item: CartItem) => {
	const myCart = state.myCart;
	myCart.products = [...myCart.products, item];
	myCart.totalAmount += 1;
	myCart.totalPrice += item.productPrice;

	state.setCarts(myCart);
	return myCart;
};

const handleClearMyCart = (state: CartState & Action) => {
	const myCart = state.myCart;
	myCart.products = [];
	myCart.totalAmount = 0;
	myCart.totalPrice = 0;

	state.setCarts(myCart);
	return myCart;
};

const handleUpdateMyCart = (
	state: CartState & Action,
	productId: string,
	flag: "increase" | "decrease"
) => {
	const myCart = state.myCart;

	myCart.products = [];
	myCart.totalAmount = 0;
	myCart.totalPrice = 0;

	state.setCarts(myCart);
	return myCart;
};
