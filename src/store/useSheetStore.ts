import { create } from "zustand";

type Action = {
	setSheetState: (flag: boolean) => void;
};
type SheetState = {
	isOpened: boolean;
};

const useSheetStore = create<SheetState & Action>()(set => ({
	isOpened: false,
	setSheetState: flag => set(() => ({ isOpened: flag })),
}));

export default useSheetStore;

type CartAction = {
	setCartSheetState: (flag: boolean) => void;
};
type CartSheetState = {
	isCartSheetOpened: boolean;
};

export const useCartSheetStore = create<CartSheetState & CartAction>()(set => ({
	isCartSheetOpened: false,
	setCartSheetState: flag => set(() => ({ isCartSheetOpened: flag })),
}));
