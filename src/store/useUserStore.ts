import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
const STORAGE_KEY = "3keyStore";

type Action = {
	setUserState: (data: UserState) => void;
	initUserState: () => void;
};

const initialState: UserState = {
	id: "",
	email: "",
	displayName: "",
	isLoggedIn: false,
	isSeller: false,
};

const useUserStore = create<UserState & Action>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				setUserState: (data) => set(() => data),
				initUserState: () => set(() => initialState),
			}),
			{ name: STORAGE_KEY, storage: createJSONStorage(() => sessionStorage) }
		)
	)
);

export default useUserStore;
