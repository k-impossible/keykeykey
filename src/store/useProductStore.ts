import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Action = {
	setProductState: (data: Product) => void;
	initProductState: () => void;
};

const initialState: Product = {
	id: "",
	brandId: 0,
	name: "",
	description: "",
	price: 0,
	amount: 0,
	tagIds: [],
	images: [],
	createdAt: Date.now(),
	updatedAt: Date.now(),
	match: "",
};

const useProductStore = create<Product & Action>()(
	devtools(set => ({
		...initialState,
		setProductState: data => set(() => data),
		initProductState: () => set(() => initialState),
	}))
);

export default useProductStore;
