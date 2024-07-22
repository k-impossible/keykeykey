import { create } from "zustand";

type Action = {
	setLoadingState: (flag: boolean) => void;
};
type LoadingState = {
	isLoading: boolean;
};

const useLoadingStore = create<LoadingState & Action>()(set => ({
	isLoading: false,
	setLoadingState: flag => set(() => ({ isLoading: flag })),
}));

export default useLoadingStore;
