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
