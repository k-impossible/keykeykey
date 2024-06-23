import { auth } from "@/firebase";
import useUserStore from "@/store/useUserStore";
import { signOut } from "firebase/auth";

export const useAuthCheck = (role?: string): boolean => {
	const { isLoggedIn, id } = useUserStore((state) => state);

	console.log(isLoggedIn);
	if (!isLoggedIn) return isLoggedIn;

	if (role === "seller") {
		if (id === import.meta.env.VITE_SELLER_ID) return isLoggedIn;
		return false;
	}

	return isLoggedIn;
};

export const useLogOut = async () => await signOut(auth);
